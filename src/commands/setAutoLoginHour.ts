import TelegramBot, { Message } from 'node-telegram-bot-api';

import { setAutoLoginHour } from '../storage/users';

export function setAutoLoginHourCommand(telegramBot: TelegramBot) {
  telegramBot.onText(
    /\/setautologinhour (1[0-9]|2[0-3]|[0-9])/,
    async (msg: Message, match) => {
      const chatId = msg.chat.id;
      if (!msg.from) {
        return;
      }
      const userId = msg.from.id;

      if (match?.length !== 2) {
        console.log(match?.length);
        await telegramBot.sendMessage(
          chatId,
          'Usage is /setautologinhour (0-23)'
        );
        return;
      }
      const autoLoginHour = parseInt(match[1], 10);

      if (!msg.from) {
        return;
      }

      const loginData = await setAutoLoginHour(userId, autoLoginHour);

      const message = `Auto-Login hour set to ${loginData.autoLoginHour}!`;

      await telegramBot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    }
  );
}
