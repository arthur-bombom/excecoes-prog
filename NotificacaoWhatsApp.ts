import CanalNotificacao from "./CanalNotificacao";
import Leitor from "./Leitor";

export default class NotificacaoWhatsApp implements CanalNotificacao {
    public enviar(mensagem: string, leitor: Leitor): void {
        console.log("[WhatsApp para " + leitor.getNome() + "] " + mensagem);
    }
}
