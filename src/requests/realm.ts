import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import { RequestAPI, RequiredUriUrl } from 'request';
import { parseStringPromise } from 'xml2js';

import { LoginResponse } from '../types/login';
import { CharListResponse } from '../types/chars';
import { LoginCalendarResponse } from '../types/loginCalendar';

export async function login(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    username: string;
    password: string;
  }
): Promise<string> {
  const passwordKey = args.username.startsWith('steamworks')
    ? 'secret'
    : 'password';
  const options: RequestPromiseOptions = {
    method: 'POST',
    baseUrl: 'https://www.realmofthemadgod.com/',
    form: {
      guid: args.username,
      clientToken: 0,
      [passwordKey]: args.password
    },
    qs: {
      muleDump: true,
      __source: 'jakcodex-v965'
    }
  };
  const xml = await request('/account/verify', options);
  const parsed: LoginResponse = await parseStringPromise(xml);

  return parsed?.Account?.AccessToken[0];
}

export async function getCharList(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    accessToken: string;
  }
): Promise<CharListResponse> {
  const options: RequestPromiseOptions = {
    method: 'GET',
    baseUrl: 'https://www.realmofthemadgod.com/',
    qs: {
      muleDump: true,
      __source: 'jakcodex-v965',
      accessToken: args.accessToken,
      ignore: 4430
    }
  };
  const xml = await request('/char/list', options);
  const parsed: CharListResponse = await parseStringPromise(xml);
  return parsed;
}

export async function getLoginCalendar(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    accessToken: string;
  }
): Promise<LoginCalendarResponse> {
  const options: RequestPromiseOptions = {
    method: 'GET',
    baseUrl: 'https://www.realmofthemadgod.com/',
    qs: {
      accessToken: args.accessToken,
      game_net: 'Unity_steam',
      play_platform: 'Unity_steam'
    }
  };
  const xml = await request('/dailyLogin/fetchCalendar', options);
  const parsed: LoginCalendarResponse = await parseStringPromise(xml);
  return parsed;
}
