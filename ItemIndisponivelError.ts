import BibliotecaError from "./BibliotecaError";

export default class ItemIndisponivelError extends BibliotecaError {
    constructor(titulo: string, devolucaoPrevista: Date | null) {
        const quando = devolucaoPrevista ? devolucaoPrevista.toLocaleDateString("pt-BR") : "data não informada";
        super("\"" + titulo + "\" já está emprestado. Devolução prevista para " + quando + ".");
    }
}
