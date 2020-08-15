import { Airgram, Auth, prompt } from 'airgram';
import { config as loadEnv } from 'dotenv';
import { filterChannel } from './middleware/filterChannel';
import { recognizeType } from './helpers/recognizeType';
import textParser from './helpers/textParser';
import { prepareMessage } from './prepareMessage';
import withLocation from './helpers/with-location';
import withLink from './helpers/with-link';
import { layerPush } from './layerPush';

loadEnv();

export const airgram = new Airgram({
  apiId: process.env.APP_ID as number | undefined,
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  logVerbosityLevel: 2,
});

airgram.use(
  new Auth({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
  }),
);

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  const message = filterChannel(update.message);
  if (message === null) {
    return false;
  }

  // Check type of message and parse text
  const messageText = textParser(message);
  if (messageText === null) {
    return false;
  }

  // Check if message has hashtags & get type of message content
  const contentType = recognizeType(messageText);
  if (contentType === null) {
    return false;
  }

  const preparedMessage = prepareMessage(message, contentType);
  if (prepareMessage === null) {
    return false;
  }

  const readyMessage = await withLocation(preparedMessage).then((message) =>
    withLink(message),
  );

  console.log(readyMessage);

  await layerPush(readyMessage);
});

// On message content updated
airgram.on('updateMessageContent', async ({ update }) => {
  console.log('[update message content]', update);
});

// Called after file is downloaded
airgram.on('updateFile', async ({ update }) => {
  console.log('[Update file]', update);
});
