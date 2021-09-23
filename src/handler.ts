/* eslint-disable no-console */
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import { loginCommand } from './commands/login';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from "toad-scheduler";

// eslint-disable-next-line require-await
export async function handler() {
  const env = dotenv.config().parsed;
  if (!env?.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(env.BOT_TOKEN, { polling: true });

  registerCommands(bot);
  scheduleAutoLogin()
}

function registerCommands(bot: TelegramBot) {
  loginCommand(bot);
}

function scheduleAutoLogin() {
  const scheduler = new ToadScheduler()
  const task = new AsyncTask('auto-login', async () => {
    console.log("task ran")
  }, (err: Error) => {})

  const job = new SimpleIntervalJob({seconds: 5}, task)

  scheduler.addSimpleIntervalJob(job)
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
