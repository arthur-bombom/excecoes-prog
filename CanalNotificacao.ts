import Leitor from "./Leitor";

// Contrato: todo canal de notificação sabe enviar uma mensagem para um leitor.
export default interface CanalNotificacao {
    enviar(mensagem: string, leitor: Leitor): void;
}
