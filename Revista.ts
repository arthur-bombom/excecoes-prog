import Item from "./Item";

export default class Revista extends Item {
    private edicao: number;

    constructor(codigo: number, titulo: string, edicao: number) {
        super(codigo, titulo);
        this.edicao = edicao;
    }

    public getPrazoMaximoDias(): number {
        return 7;
    }

    public getTipo(): string {
        return "Revista";
    }

    public getEdicao(): number {
        return this.edicao;
    }

    public setEdicao(edicao: number): void {
        this.edicao = edicao;
    }
}
