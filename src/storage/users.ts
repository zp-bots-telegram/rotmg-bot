/* eslint-disable require-atomic-updates */
import { constants, promises } from 'fs';

const fs = promises;
const fsConstants = constants;

interface Login {
  username: string;
  password: string;
  autoLogin: boolean;
}

interface User {
  logins: Login[];
}

interface Users {
  [id: number]: User;
}

let userCache: Users | null = null;

async function save(): Promise<Boolean> {
  if (userCache) {
    await fs.writeFile('data.json', JSON.stringify(userCache));
    console.log('JSON file has been saved.');
  }
  return true;
}

process.on('exit', async () => {
  if (userCache) {
    await save();
  }
});

process.on('SIGTERM', async () => {
  if (userCache) {
    await save();
  }
});

async function load(): Promise<Users> {
  try {
    await fs.access('data.json', fsConstants.W_OK);
    const file = await fs.readFile('data.json');
    console.log('JSON file has been loaded.');
    return JSON.parse(file.toString()) as Users;
  } catch (error) {
    console.error('Loading file threw error', error);
    return {};
  }
}

async function getUsers(): Promise<Users> {
  if (!userCache) {
    userCache = await load();
  }
  return userCache;
}

async function setUsers(users: Users): Promise<void> {
  userCache = users;
  await save();
}

export async function getUser(userId: number): Promise<User> {
  const users = await getUsers();
  return users[userId] ?? { logins: [] };
}

export async function setUser(userId: number, user: User): Promise<void> {
  const users = await getUsers();
  users[userId] = user;
  await setUsers(users);
}

export async function setLogin(
  userId: number,
  username: string,
  password: string
): Promise<Login> {
  const user = await getUser(userId);
  console.log(user);
  user.logins[0] = { username, password, autoLogin: false };
  await setUser(userId, user);
  return user.logins[0];
}
