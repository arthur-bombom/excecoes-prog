import CanalNotificacao from "./CanalNotificacao";
import Emprestimo from "./Emprestimo";
import Item from "./Item";
import PrazoInvalidoError from "./PrazoInvalidoError";
import LeitorSuspensoError from "./LeitorSuspensoError";
import ItemIndisponivelError from "./ItemIndisponivelError";
import LimiteEmprestimosExcedidoError from "./LimiteEmprestimosExcedidoError";

export default class Leitor {
    private static readonly LIMITE_EMPRESTIMOS = 2;

    private nome: string;
    private cpf: string;
    private endereco: string;
    private suspenso: boolean;
    private canal: CanalNotificacao;
    private emprestimos: Emprestimo[];

    constructor(nome: string, cpf: string, endereco: string, canal: CanalNotificacao) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.suspenso = false;
        this.canal = canal;
        this.emprestimos = [];
    }

    public emprestar(item: Item, dias: number, dataEmprestimo: Date): Emprestimo {
        if (!Number.isFinite(dias) || dias <= 0 || dias > item.getPrazoMaximoDias()) {
            throw new PrazoInvalidoError(dias, item.getPrazoMaximoDias(), item.getTipo());
        }
        if (this.suspenso) {
            throw new LeitorSuspensoError(this.nome);
        }
        if (!item.isDisponivel()) {
            throw new ItemIndisponivelError(item.getTitulo(), item.getDevolucaoPrevista());
        }
        if (this.getEmprestimosAtivos().length >= Leitor.LIMITE_EMPRESTIMOS) {
            throw new LimiteEmprestimosExcedidoError(Leitor.LIMITE_EMPRESTIMOS);
        }

        const emprestimo = new Emprestimo(this, item, dataEmprestimo, dias);
        item.marcarEmprestado(emprestimo.getDataPrevistaDevolucao());
        this.emprestimos.push(emprestimo);
        return emprestimo;
    }

    // Devolve o item e retorna o valor da multa (0 se estiver no prazo)
    public devolver(emprestimo: Emprestimo, dataDevolucao: Date): number {
        if (!emprestimo.estaAtivo()) {
            return 0;
        }
        const multa = emprestimo.calcularMulta(dataDevolucao);
        emprestimo.registrarDevolucao(dataDevolucao);
        emprestimo.getItem().marcarDevolvido();
        return multa;
    }

    public notificar(mensagem: string): void {
        this.canal.enviar(mensagem, this);
    }

    public getEmprestimosAtivos(): Emprestimo[] {
        return this.emprestimos.filter((e) => e.estaAtivo());
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public isSuspenso(): boolean {
        return this.suspenso;
    }

    public setSuspenso(suspenso: boolean): void {
        this.suspenso = suspenso;
    }

    public getCanal(): CanalNotificacao {
        return this.canal;
    }

    public setCanal(canal: CanalNotificacao): void {
        this.canal = canal;
    }

    public getEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }
}
