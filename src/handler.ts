import dotenv from 'dotenv';

import TelegramBot from 'node-telegram-bot-api';

import { loginCommand } from './commands/login';
import { charsCommand } from './commands/chars';
import { toggleAutoLoginCommand } from './commands/toggleAutoLogin';
import { loginCalendar } from './commands/loginCalendar';
import { setAutoLoginHourCommand } from './commands/setAutoLoginHour';
import { scheduleAutoLogin } from './scheduled/autoLogin';
import { toggleDebugCommand } from './commands/toggleDebug';

// eslint-disable-next-line require-await
export async function handler() {
  dotenv.config();
  if (!process.env.BOT_TOKEN) {
    throw new Error('BOT_TOKEN was undefined');
  }

  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

  registerCommands(bot);
  scheduleAutoLogin(bot);
}

function registerCommands(bot: TelegramBot) {
  loginCommand(bot);
  charsCommand(bot);
  toggleAutoLoginCommand(bot);
  loginCalendar(bot);
  setAutoLoginHourCommand(bot);
  toggleDebugCommand(bot);
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
