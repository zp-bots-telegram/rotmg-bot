/* eslint-disable babel/camelcase */

import TelegramBot, { Message } from 'node-telegram-bot-api';

import { toggleAutoLogin } from '../storage/users';

export function toggleAutoLoginCommand(telegramBot: TelegramBot) {
  telegramBot.onText(/\/toggleautologin/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (!msg.from) {
      return;
    }
    const userId = msg.from.id;

    if (!msg.from) {
      return;
    }

    const loginData = await toggleAutoLogin(userId);

    const message = `Auto-Login has been ${
      loginData.autoLogin ? 'enabled' : 'disabled'
    }!`;

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
