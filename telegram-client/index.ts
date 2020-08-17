import { Airgram, Auth, prompt } from 'airgram';

import { filterChannel } from './middleware/filterChannel';
import { config as loadEnv } from 'dotenv';
import { prepareMessage } from './prepareMessage';
import { pushToLayer } from './mapLayer';
import { recognizeType } from './helpers/recognizeType';
import textParser from './helpers/textParser';
import withLink from './helpers/with-link';
import withLocation from './helpers/with-location';

loadEnv();

export const airgram = new Airgram({
  apiId: process.env.APP_ID as number | undefined,
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  logVerbosityLevel: 0,
});

airgram.use(
  new Auth({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
  }),
);

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  console.log('[New message]', update.message);

  const message = filterChannel(update.message);
  if (message === null) {
    console.log('[Message skipped. Reason: unnecessary channel]');
    return false;
  }

  // Check type of message and parse text
  const messageText = textParser(message);
  if (messageText === null) {
    console.log('[Message skipped. Reason: not supported message type]');
    return false;
  }

  // Check if message has hashtags & get type of message content
  const contentType = recognizeType(messageText);
  if (contentType === null) {
    console.log('[Message skipped. Reason: hashtag not found]');
    return false;
  }

  // Convert unix timestamp to milliseconds
  message.date = message.date * 1000;

  const preparedMessage = prepareMessage(message, contentType);
  if (prepareMessage === null) {
    console.log("[Message skipped. Reason: message can't be prepared]");
    return false;
  }

  const readyMessage = await withLocation(preparedMessage).then((message) =>
    withLink(message),
  );

  console.log('[Ready message]', readyMessage);

  await pushToLayer(readyMessage);
});

// On message content updated
airgram.on('updateMessageContent', async ({ update }) => {
  console.log('[update message content]', update);
});

// Called after file is downloaded
airgram.on('updateFile', async ({ update }) => {
  console.log('[Update file]', update);
});
