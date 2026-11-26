import CanalNotificacao from "./CanalNotificacao";
import Leitor from "./Leitor";

export default class NotificacaoEmail implements CanalNotificacao {
    public enviar(mensagem: string, leitor: Leitor): void {
        console.log("[E-mail para " + leitor.getNome() + "]");
        console.log("  Assunto: Aviso da Biblioteca");
        console.log("  Olá, " + leitor.getNome() + "!");
        console.log("  " + mensagem);
        console.log("  Atenciosamente, Biblioteca Comunitária.");
    }
}
