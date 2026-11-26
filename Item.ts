export default abstract class Item {
    private codigo: number;
    private titulo: string;
    private disponivel: boolean;
    private devolucaoPrevista: Date | null;

    constructor(codigo: number, titulo: string) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.disponivel = true;
        this.devolucaoPrevista = null;
    }

    // Cada tipo de item define o seu próprio prazo e o seu nome (polimorfismo)
    public abstract getPrazoMaximoDias(): number;
    public abstract getTipo(): string;

    public marcarEmprestado(devolucaoPrevista: Date): void {
        this.disponivel = false;
        this.devolucaoPrevista = devolucaoPrevista;
    }

    public marcarDevolvido(): void {
        this.disponivel = true;
        this.devolucaoPrevista = null;
    }

    public getCodigo(): number {
        return this.codigo;
    }

    public setCodigo(codigo: number): void {
        this.codigo = codigo;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public isDisponivel(): boolean {
        return this.disponivel;
    }

    public getDevolucaoPrevista(): Date | null {
        return this.devolucaoPrevista;
    }
}
