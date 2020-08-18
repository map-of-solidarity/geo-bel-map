import { Airgram, Auth, prompt } from 'airgram';

import { initSentry } from './services/sentry';
import { config as loadEnv } from 'dotenv';
import { onNewMessage } from './middleware/events';
import { pushToLayer } from './mapLayer';

initSentry();

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
onNewMessage((message) => pushToLayer(message))

// On message content updated
airgram.on('updateMessageContent', async ({ update }) => {
  console.log('[Update message]', update);
});

// Called after file is downloaded
airgram.on('updateFile', async ({ update }) => {
  console.log('[Update file]', update);
});