import BibliotecaError from "./BibliotecaError";

export default class PrazoInvalidoError extends BibliotecaError {
    constructor(dias: number, maximo: number, tipoItem: string) {
        super("Prazo inválido: " + dias + " dia(s). Para " + tipoItem + ", o prazo deve ser de 1 a " + maximo + " dias.");
    }
}
