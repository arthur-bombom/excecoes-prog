// Classe-base abstrata: agrupa todos os erros de regra de negócio da biblioteca.
export default abstract class BibliotecaError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
