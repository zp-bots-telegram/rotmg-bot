import dotenv from 'dotenv';
import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import TelegramBot from 'node-telegram-bot-api';
import rp from 'request-promise';

import { loginCommand } from './commands/login';
import { charsCommand } from './commands/chars';
import { toggleAutoLoginCommand } from './commands/toggleautologin';
import { getUsers } from './storage/users';
import { getCharList, login } from './requests/realm';
import { loginCalendar } from './commands/loginCalendar';
import { setAutoLoginHourCommand } from './commands/setAutoLoginHour';

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
}

function scheduleAutoLogin(bot: TelegramBot) {
  const scheduler = new ToadScheduler();
  const task = new AsyncTask(
    'auto-login',
    async () => {
      const users = await getUsers();
      const currentHour = new Date().getUTCHours();
      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          const user = users[key];
          if (user.logins[0].autoLogin && user.autoLoginHour === currentHour) {
            const request = rp.defaults({
              jar: true,
              followAllRedirects: true
            });
            const accessToken = await login(request, {
              username: user.logins[0].username,
              password: user.logins[0].password
            });
            const chars = await getCharList(request, {
              accessToken
            });
            await bot.sendMessage(
              key,
              `Auto-Login done for ${chars.Chars.Account[0].Name}`,
              { parse_mode: 'HTML' }
            );
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      }
    },
    (err: Error) => {
      console.error(err);
    }
  );

  const job = new SimpleIntervalJob(
    { minutes: 29, runImmediately: true },
    task
  );

  scheduler.addSimpleIntervalJob(job);
}

handler()
  .then(() => console.log('Bot Running'))
  .catch((error) => {
    console.error('Uncaught Error Thrown', error);
  });
