import BibliotecaError from "./BibliotecaError";

export default class LimiteEmprestimosExcedidoError extends BibliotecaError {
    constructor(limite: number) {
        super("Limite de empréstimos excedido. Você pode ter no máximo " + limite + " empréstimos ativos ao mesmo tempo.");
    }
}
