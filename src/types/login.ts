export interface CampaignProgress {
  Points: string[];
}

export interface Campaign {
  CampaignProgress: CampaignProgress[];
}

export interface SecurityQuestionsKey {
  SecurityQuestionsKey: string[];
}

export interface SecurityQuestion {
  HasSecurityQuestions: string[];
  ShowSecurityQuestionsDialog: string[];
  SecurityQuestionsKeys: SecurityQuestionsKey[];
}

export interface ClassId {
  objectType: string;
}

export interface ClassStat {
  $: ClassId;
  BestLevel: string[];
  BestBaseFame: string[];
  BestTotalFame: string[];
}

export interface Stat {
  ClassStats: ClassStat[];
  BestCharFame: string[];
  TotalFame: string[];
  Fame: string[];
}

export interface GuildId {
  id: string;
}

export interface Guild {
  $: GuildId;
  Name: string[];
  Rank: string[];
}

export interface Account {
  Credits: string[];
  FortuneToken: string[];
  UnityCampaignPoints: string[];
  NextCharSlotPrice: string[];
  EarlyGameEventTracker: string[];
  AccountId: string[];
  CreationTimestamp: string[];
  DecaSignupPopup: string[];
  MaxNumChars: string[];
  HasGifts: string[];
  LastServer: string[];
  TeleportWait: string[];
  ArenaTickets: string[];
  Originating: string[];
  PetYardType: string[];
  ForgeFireEnergy: string[];
  ForgeFireBlueprints: string[];
  Campaigns: Campaign[];
  Name: string[];
  NameChosen: string[];
  PaymentProvider: string[];
  Converted: string[];
  IsAgeVerified: string[];
  SecurityQuestions: SecurityQuestion[];
  Stats: Stat[];
  Guild: Guild[];
  AccessToken: string[];
  AccessTokenTimestamp: string[];
  AccessTokenExpiration: string[];
}

export interface LoginResponse {
  Account: Account;
}
