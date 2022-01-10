import { AsyncTask, SimpleIntervalJob, ToadScheduler } from 'toad-scheduler';

import TelegramBot from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getUsers } from '../storage/users';
import { getCharList, login } from '../requests/realm';

export function scheduleAutoLogin(bot: TelegramBot) {
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
            if (!accessToken) {
              await bot.sendMessage(
                key,
                `Auto-Login Failed, could not authenticate`,
                {
                  parse_mode: 'HTML'
                }
              );
            }
            const chars = await getCharList(request, {
              accessToken
            });
            if (!chars) {
              await bot.sendMessage(
                key,
                `Auto-Login Failed, could not pull character data`,
                {
                  parse_mode: 'HTML'
                }
              );
            }

            const date = new Date();
            const tomorrow = new Date(date);
            tomorrow.setDate(date.getDate() + 1);
            const tomorrowDay = tomorrow.getDate();

            if (tomorrowDay === 1) {
              await bot.sendMessage(
                key,
                `Tomorrow is a new month, remember to claim your goodies today!`,
                { parse_mode: 'HTML' }
              );
            } else {
              await bot.sendMessage(
                key,
                `Auto-Login done for ${chars.Chars.Account[0].Name}`,
                { parse_mode: 'HTML', disable_notification: true }
              );
            }
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
