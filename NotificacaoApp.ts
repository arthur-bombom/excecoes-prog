import CanalNotificacao from "./CanalNotificacao";
import Leitor from "./Leitor";

export default class NotificacaoApp implements CanalNotificacao {
    public enviar(mensagem: string, leitor: Leitor): void {
        console.log("[Notificação no app para " + leitor.getNome() + " - imediata] " + mensagem);
    }
}
