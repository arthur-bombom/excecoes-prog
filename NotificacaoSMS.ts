import CanalNotificacao from "./CanalNotificacao";
import Leitor from "./Leitor";

export default class NotificacaoSMS implements CanalNotificacao {
    public enviar(mensagem: string, leitor: Leitor): void {
        console.log("[SMS para " + leitor.getNome() + "] " + mensagem);
    }
}
