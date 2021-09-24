export interface NonConsecutiveInfo {
  days: string;
}

export interface ItemIdInfo {
  quantity: string;
}

export interface ItemId {
  _: string;
  $: ItemIdInfo;
}

export interface Login {
  Days: string[];
  ItemId: ItemId[];
  Gold: string[];
  Claimed: string[];
  key: string[];
}

export interface NonConsecutive {
  $: NonConsecutiveInfo;
  Login: Login[];
}

export interface ConsecutiveInfo {
  days: string;
}

export interface Consecutive {
  $: ConsecutiveInfo;
}

export interface UnlockableInfo {
  days: string;
}

export interface Unlockable {
  $: UnlockableInfo;
}

export interface LoginRewardsInfo {
  serverTime: string;
  conCurDay: string;
  nonconCurDay: string;
}

export interface LoginRewards {
  $: LoginRewardsInfo;
  NonConsecutive: NonConsecutive[];
  Consecutive: Consecutive[];
  Unlockable: Unlockable[];
}

export interface LoginCalendarResponse {
  LoginRewards: LoginRewards;
}
