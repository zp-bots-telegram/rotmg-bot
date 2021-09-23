/* eslint-disable babel/camelcase */
import TelegramBot, { Message } from 'node-telegram-bot-api';
import rp from 'request-promise';

import { addLogin } from '../storage/logins';
import { login } from "../requests/realm";

export function loginCommand(telegramBot: TelegramBot) {
  telegramBot.onText(
    /\/login (\S+) (\S+)/,
    async (msg: Message, match) => {
      const chatId = msg.chat.id;
      if (!msg.from) {
        return;
      }
      const userId = msg.from.id;
      if (match?.length !== 3) {
        console.log(match?.length);
        await telegramBot.sendMessage(
          chatId,
          'Usage is /login {username} {password}'
        );
        return;
      }
      const username = match[1];
      const password = match[2];

      const request = rp.defaults({ jar: true, followAllRedirects: true });

      if (!msg.from) {
        return;
      }

      const loginResult = await login(request, {
        username,
        password
      });

      let message = 'Login failed, incorrect details';

      if (loginResult) {
        message = 'Login succeeded, credentials saved';
        await addLogin(userId, username, password);
      }

      await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    }
  );
}
