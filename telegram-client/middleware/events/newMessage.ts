import { Message } from "airgram"
import PreparedPhotoMessage from "../../prepareMessage/photoMessage";
import PreparedTextMessage from "../../prepareMessage/textMessage";
import { airgram } from '../../index'
import { setupMessage } from '../../helpers/setupMessage';
import { validateMessage } from '../../helpers/validateMessage'

interface IOnNewMessage {
    (handler: (message: PreparedPhotoMessage | PreparedTextMessage) => void): void
}

export const onNewMessage: IOnNewMessage = (handler) => {
    airgram.on('updateNewMessage', async ({ update }) => {
      console.log('[New message]', update.message);

      const validatedMessage = validateMessage(update.message);
      if (!validatedMessage) return false;

      const setupedMessage = await setupMessage(
        validatedMessage.message,
        validatedMessage.eventType,
      );
      if (!setupedMessage) return false;

      console.log('[Ready message]', setupedMessage);

      handler(setupedMessage);
    });
};