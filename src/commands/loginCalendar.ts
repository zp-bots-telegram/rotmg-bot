import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getUser } from '../storage/users';
import { getLoginCalendar, login } from '../requests/realm';

export function loginCalendar(telegramBot: TelegramBot) {
  telegramBot.onText(/\/logincalendar/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (!msg.from) {
      return;
    }
    const userId = msg.from.id;

    const request = rp.defaults({ jar: true, followAllRedirects: true });

    if (!msg.from) {
      return;
    }

    const userData = await getUser(userId);
    const userLogin = userData.logins[0];

    const accessToken = await login(request, {
      username: userLogin.username,
      password: userLogin.password
    });

    const charList = await getLoginCalendar(request, { accessToken });

    let message = `<b>Consecutive Days</b>: ${charList.LoginRewards.$.conCurDay}\n`;
    message += `<b>Total Days</b>: ${charList.LoginRewards.$.nonconCurDay}\n`;

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
