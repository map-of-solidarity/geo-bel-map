import { config as loadEnv } from 'dotenv';

loadEnv();

const test = [
  -1001367002378 // Test channel https://t.me/test_bot_geobel
];

const production = [
  -1001413275904, // NEXTA Live https://t.me/nexta_live
]

export const channels =
         process.env.APP_ENV === 'production' ? production : test;
