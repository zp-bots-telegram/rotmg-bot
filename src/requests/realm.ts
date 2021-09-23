import { RequestPromise, RequestPromiseOptions } from 'request-promise';
import $ from 'cheerio';
import { RequestAPI, RequiredUriUrl } from 'request';
import { parseStringPromise } from "xml2js";
import { LoginResponse } from "../types/login";

export async function login(
  request: RequestAPI<RequestPromise, RequestPromiseOptions, RequiredUriUrl>,
  args: {
    username: string;
    password: string;
  }
): Promise<Boolean> {
  const passwordKey = args.username.startsWith("steamworks") ? "secret" : "password"
  const options: RequestPromiseOptions = {
    method: 'POST',
    baseUrl: 'https://www.realmofthemadgod.com/',
    form: {
      guid: args.username,
      clientToken: 0,
      [passwordKey]: args.password,
    }
  };
  const xml = await request('/account/verify?muleDump=true&__source=jakcodex-v965', options);
  const parsed: LoginResponse = await parseStringPromise(xml)
  console.log(parsed.Account.AccessToken)
  console.log(parsed.Account.Name)
  return !!parsed?.Account?.AccessToken
}