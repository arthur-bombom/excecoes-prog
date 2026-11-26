import BibliotecaError from "./BibliotecaError";

export default class LeitorSuspensoError extends BibliotecaError {
    constructor(nomeLeitor: string) {
        super("O leitor " + nomeLeitor + " está suspenso e não pode pegar itens emprestados. Procure a biblioteca para saber o motivo.");
    }
}
