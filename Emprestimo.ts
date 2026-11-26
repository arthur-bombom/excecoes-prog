import Item from "./Item";
import Leitor from "./Leitor";

export default class Emprestimo {
    private static readonly MULTA_POR_DIA = 1.5;

    private leitor: Leitor;
    private item: Item;
    private dataEmprestimo: Date;
    private dataPrevistaDevolucao: Date;
    private dataDevolucao: Date | null;

    constructor(leitor: Leitor, item: Item, dataEmprestimo: Date, dias: number) {
        this.leitor = leitor;
        this.item = item;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = new Date(
            dataEmprestimo.getFullYear(),
            dataEmprestimo.getMonth(),
            dataEmprestimo.getDate() + dias
        );
        this.dataDevolucao = null;
    }

    public estaAtivo(): boolean {
        return this.dataDevolucao === null;
    }

    public calcularMulta(dataDevolucao: Date): number {
        const msPorDia = 1000 * 60 * 60 * 24;
        const atraso = Math.round((dataDevolucao.getTime() - this.dataPrevistaDevolucao.getTime()) / msPorDia);
        return atraso > 0 ? atraso * Emprestimo.MULTA_POR_DIA : 0;
    }

    public registrarDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    public getLeitor(): Leitor {
        return this.leitor;
    }

    public getItem(): Item {
        return this.item;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public getDataPrevistaDevolucao(): Date {
        return this.dataPrevistaDevolucao;
    }

    public getDataDevolucao(): Date | null {
        return this.dataDevolucao;
    }
}
