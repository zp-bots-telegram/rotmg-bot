import TelegramBot, { Message } from 'node-telegram-bot-api';

import { toggleDebug } from '../storage/users';

export function toggleDebugCommand(telegramBot: TelegramBot) {
  telegramBot.onText(/\/toggledebug/, async (msg: Message) => {
    const chatId = msg.chat.id;
    if (!msg.from) {
      return;
    }
    const userId = msg.from.id;

    if (!msg.from) {
      return;
    }

    const loginData = await toggleDebug(userId);

    const message = `Debug mode has been <b>${
      loginData.debugMode ? 'enabled' : 'disabled'
    }</b>!`;

    await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
}
