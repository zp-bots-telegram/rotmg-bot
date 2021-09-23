export interface CharId {
  id: string;
}

export interface PetInfo {
  name: string;
  type: string;
  instanceId: string;
  rarity: string;
  maxAbilityPower: string;
  skin: string;
}

export interface AbilityAttributes {
  type: string;
  power: string;
  points: string;
}

export interface AbilityInfo {
  $: AbilityAttributes;
}

export interface Ability {
  Ability: AbilityInfo[];
}

export interface Pet {
  $: PetInfo;
  Abilities: Ability[];
}

export interface AccountName {
  Name: string[];
}

export interface CharItemType {
  type: string;
}

export interface CharItemData {
  $: CharItemType;
}

export interface CharUniqueItemInfo {
  ItemData: CharItemData[];
}

export interface Char {
  $: CharId;
  ObjectType: string[];
  Level: string[];
  Exp: string[];
  CurrentFame: string[];
  Equipment: string[];
  EquipQS: string[];
  MaxHitPoints: string[];
  HitPoints: string[];
  MaxMagicPoints: string[];
  MagicPoints: string[];
  Attack: string[];
  Defense: string[];
  Speed: string[];
  Dexterity: string[];
  HpRegen: string[];
  MpRegen: string[];
  PCStats: string[];
  HealthStackCount: string[];
  MagicStackCount: string[];
  Dead: string[];
  Pet: Pet[];
  Account: AccountName[];
  Texture: string[];
  XpBoosted: string[];
  XpTimer: string[];
  LDTimer: string[];
  LTTimer: string[];
  UniqueItemInfo: CharUniqueItemInfo[];
  HasBackpack: string[];
  Has3Quickslots: string[];
  CreationDate: string[];
  Tex1: string[];
  Tex2: string[];
}

export interface Vault {
  Chest: string[];
}

export interface AccountItemDataInfo {
  id: string;
  type: string;
}

export interface AccountItemData {
  $: AccountItemDataInfo;
  _: string;
}

export interface AccountUniqueItemInfo {
  ItemData: AccountItemData[];
}

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

export interface ClassStatType {
  objectType: string;
}

export interface ClassStat {
  $: ClassStatType;
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
  Vault: Vault[];
  Gifts: string[];
  Potions: string[];
  UniqueItemInfo: AccountUniqueItemInfo[];
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

export interface Item {
  Icon: string[];
  Title: string[];
  TagLine: string[];
  Link: string[];
  Date: string[];
}

export interface News {
  Item: Item[];
}

export interface Server2 {
  Name: string[];
  DNS: string[];
  Lat: string[];
  Long: string[];
  Usage: string[];
}

export interface Server {
  Server: Server2[];
}

export interface ClassName {
  id: string;
}

export interface ClassAvailability {
  _: string;
  $: ClassName;
}

export interface ClassAvailabilityList {
  ClassAvailability: ClassAvailability[];
}

export interface ItemCostInfo {
  type: string;
  purchasable: string;
  expires: string;
}

export interface ItemCost {
  _: string;
  $: ItemCostInfo;
}

export interface ItemCosts {
  ItemCost: ItemCost[];
}

export interface PowerUpClassName {
  class: string;
}

export interface PowerUpClassStat {
  _: string;
  $: PowerUpClassName;
}

export interface PowerUpStat {
  ClassStats: PowerUpClassStat[];
  ClaimedItem: string[];
}

export interface ClassInfo {
  classType: string;
  maxLevel: string;
}

export interface MaxClassLevel {
  $: ClassInfo;
}

export interface MaxClassLevelList {
  MaxClassLevel: MaxClassLevel[];
}

export interface CharsInfo {
  nextCharId: string;
  maxNumChars: string;
}

export interface Chars {
  $: CharsInfo;
  Char: Char[];
  Account: Account[];
  News: News[];
  Servers: Server[];
  Lat: string[];
  Long: string[];
  ClassAvailabilityList: ClassAvailabilityList[];
  OwnedSkins: string[];
  ItemCosts: ItemCosts[];
  PowerUpStats: PowerUpStat[];
  DecaSignupPopup: string[];
  MaxClassLevelList: MaxClassLevelList[];
}

export interface CharListResponse {
  Chars: Chars;
}
