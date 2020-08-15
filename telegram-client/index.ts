import { Airgram, Auth, prompt } from 'airgram';
import { config as loadEnv } from 'dotenv';

loadEnv();

const airgram = new Airgram({
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
  const { message } = update;
  console.log('[new message]', message);
});
