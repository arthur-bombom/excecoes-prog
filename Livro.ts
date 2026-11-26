import Item from "./Item";

export default class Livro extends Item {
    private autor: string;

    constructor(codigo: number, titulo: string, autor: string) {
        super(codigo, titulo);
        this.autor = autor;
    }

    public getPrazoMaximoDias(): number {
        return 14;
    }

    public getTipo(): string {
        return "Livro";
    }

    public getAutor(): string {
        return this.autor;
    }

    public setAutor(autor: string): void {
        this.autor = autor;
    }
}
