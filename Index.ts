import Leitor from "./Leitor";
import Livro from "./Livro";
import Revista from "./Revista";
import Item from "./Item";
import Emprestimo from "./Emprestimo";
import NotificacaoSMS from "./NotificacaoSMS";
import NotificacaoEmail from "./NotificacaoEmail";
import NotificacaoApp from "./NotificacaoApp";
import NotificacaoWhatsApp from "./NotificacaoWhatsApp";
import PrazoInvalidoError from "./PrazoInvalidoError";
import LeitorSuspensoError from "./LeitorSuspensoError";
import ItemIndisponivelError from "./ItemIndisponivelError";
import LimiteEmprestimosExcedidoError from "./LimiteEmprestimosExcedidoError";

function formatar(data: Date): string {
    return data.toLocaleDateString("pt-BR");
}

function dinheiro(valor: number): string {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function tentarEmprestar(leitor: Leitor, item: Item, dias: number, data: Date): Emprestimo | null {
    console.log("\n--- " + leitor.getNome() + " tenta pegar \"" + item.getTitulo() + "\" por " + dias + " dia(s)");
    try {
        const emprestimo = leitor.emprestar(item, dias, data);
        console.log("Empréstimo realizado! Devolver até " + formatar(emprestimo.getDataPrevistaDevolucao()));
        return emprestimo;
    } catch (erro) {
        if (erro instanceof PrazoInvalidoError) {
            console.log("Erro de prazo inválido: " + erro.message);
            leitor.notificar(erro.message);
        } else if (erro instanceof LeitorSuspensoError) {
            console.log("Erro de leitor suspenso: " + erro.message);
            leitor.notificar(erro.message);
        } else if (erro instanceof ItemIndisponivelError) {
            console.log("Erro de item indisponível: " + erro.message);
            leitor.notificar(erro.message);
        } else if (erro instanceof LimiteEmprestimosExcedidoError) {
            console.log("Erro de limite de empréstimos: " + erro.message);
            leitor.notificar(erro.message);
        } else {
            throw erro; // erro inesperado não deve ser engolido
        }
        return null;
    }
}

const hoje = new Date(2026, 10, 25);

// Leitores (cada um com um canal de notificação diferente)
const ana = new Leitor("Ana", "111.111.111-11", "Rua das Flores, 10", new NotificacaoSMS());
const bruno = new Leitor("Bruno", "222.222.222-22", "Av. Central, 200", new NotificacaoEmail());
const carla = new Leitor("Carla", "333.333.333-33", "Rua do Sol, 55", new NotificacaoApp());
const diego = new Leitor("Diego", "444.444.444-44", "Praça da Matriz, 7", new NotificacaoWhatsApp());

// Itens do acervo (Livro e Revista herdam de Item)
const domCasmurro = new Livro(1, "Dom Casmurro", "Machado de Assis");
const cleanCode = new Livro(2, "Clean Code", "Robert C. Martin");
const hobbit = new Livro(3, "O Hobbit", "J. R. R. Tolkien");
const livro1984 = new Livro(4, "1984", "George Orwell");
const superinteressante = new Revista(5, "Superinteressante", 450);
const veja = new Revista(6, "Veja", 2900);

diego.setSuspenso(true);

// Polimorfismo: cada tipo de item tem seu prazo máximo
console.log(domCasmurro.getTipo() + ": prazo máximo de " + domCasmurro.getPrazoMaximoDias() + " dias");
console.log(veja.getTipo() + ": prazo máximo de " + veja.getPrazoMaximoDias() + " dias");

// Empréstimos com sucesso
const empAnaDom = tentarEmprestar(ana, domCasmurro, 14, hoje);
tentarEmprestar(ana, cleanCode, 7, hoje);
tentarEmprestar(bruno, superinteressante, 7, hoje);
const empBrunoVeja = tentarEmprestar(bruno, veja, 5, hoje);
tentarEmprestar(carla, hobbit, 10, hoje);

// Prazo inválido
tentarEmprestar(ana, livro1984, -5, hoje);
tentarEmprestar(carla, veja, 30, hoje);

// Leitor suspenso
tentarEmprestar(diego, livro1984, 10, hoje);
tentarEmprestar(diego, hobbit, 10, hoje);

// Item indisponível
tentarEmprestar(bruno, domCasmurro, 7, hoje);
tentarEmprestar(carla, domCasmurro, 7, hoje);

// Limite de empréstimos excedido
tentarEmprestar(ana, livro1984, 10, hoje);
tentarEmprestar(bruno, livro1984, 10, hoje);

// Devoluções (uma com atraso e multa, outra no prazo)
console.log("\n--- Devoluções");
if (empAnaDom && empBrunoVeja) {
    const multaAna = ana.devolver(empAnaDom, new Date(2026, 11, 12));
    console.log("Ana devolveu \"Dom Casmurro\" com atraso. Multa: " + dinheiro(multaAna));
    const multaBruno = bruno.devolver(empBrunoVeja, new Date(2026, 10, 28));
    console.log("Bruno devolveu \"Veja\" no prazo. Multa: " + dinheiro(multaBruno));
}

// Após a devolução, o item volta a ficar disponível
tentarEmprestar(carla, domCasmurro, 7, new Date(2026, 11, 12));

console.log("\nEmpréstimos ativos -> Ana: " + ana.getEmprestimosAtivos().length +
    " | Bruno: " + bruno.getEmprestimosAtivos().length +
    " | Carla: " + carla.getEmprestimosAtivos().length);
