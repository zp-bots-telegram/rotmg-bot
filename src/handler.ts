import dotenv from 'dotenv';
import { SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';

import TelegramBot from 'node-telegram-bot-api';

import { loginCommand } from './commands/login';
import { charsCommand } from './commands/chars';

// eslint-disable-next-line require-await
export async function handler() {
  dotenv.config();
  if (!process.env.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

  registerCommands(bot);
  scheduleAutoLogin();
}

function registerCommands(bot: TelegramBot) {
  loginCommand(bot);
  charsCommand(bot);
}

function scheduleAutoLogin() {
  const scheduler = new ToadScheduler();
  const task = new Task(
    'auto-login',
    () => {
      console.log('task ran');
    },
    (err: Error) => {
      console.error(err);
    }
  );

  const job = new SimpleIntervalJob({ seconds: 5 }, task);

  scheduler.addSimpleIntervalJob(job);
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
