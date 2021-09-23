/* eslint-disable babel/camelcase */

import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { getUser } from '../storage/users';
import { getCharList, login } from '../requests/realm';

export function charsCommand(telegramBot: TelegramBot) {
  telegramBot.onText(/\/chars/, async (msg: Message) => {
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

    const charList = await getCharList(request, { accessToken });

    const message = `<b>Name</b>: ${charList.Chars.Account[0].Name[0]}`;

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
