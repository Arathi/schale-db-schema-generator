export type Released = [boolean, boolean, boolean];

export type StarGrade = 1 | 2 | 3;

export type BattleAdaptation = 0 | 1 | 2 | 3 | 4 | 5;

export type Skills = Skill[];

export type EquipmentTypes = [
  EquipmentTypeSlot1,
  EquipmentTypeSlot2,
  EquipmentTypeSlot3,
];

export type Skill = any;

export type Weapon = any;

export type Gear = any;

export enum School {
  Gehenna = 'Gehenna',
  Millennium = 'Millennium',
  Trinity = 'Trinity',
  Abydos = 'Abydos',
  Shanhaijing = 'Shanhaijing',
  Hyakkiyako = 'Hyakkiyako',
  RedWinter = 'RedWinter',
  Valkyrie = 'Valkyrie',
  ETC = 'ETC',
  SRT = 'SRT',
  Arius = 'Arius',
  Tokiwadai = 'Tokiwadai',
  Sakugawa = 'Sakugawa',
}

export enum SquadType {
  Main = 'Main',
  Support = 'Support',
}

export enum TacticRole {
  DamageDealer = 'DamageDealer',
  Tanker = 'Tanker',
  Supporter = 'Supporter',
  Healer = 'Healer',
  Vehicle = 'Vehicle',
}

export enum Position {
  Back = 'Back',
  Front = 'Front',
  Middle = 'Middle',
}

export enum BulletType {
  Explosion = 'Explosion',
  Mystic = 'Mystic',
  Pierce = 'Pierce',
  Sonic = 'Sonic',
}

export enum ArmorType {
  LightArmor = 'LightArmor',
  HeavyArmor = 'HeavyArmor',
  Unarmed = 'Unarmed',
  ElasticArmor = 'ElasticArmor',
}

export enum WeaponType {
  SR = 'SR',
  SG = 'SG',
  AR = 'AR',
  MG = 'MG',
  SMG = 'SMG',
  HG = 'HG',
  GL = 'GL',
  MT = 'MT',
  RG = 'RG',
  RL = 'RL',
  FT = 'FT',
}

export enum EquipmentTypeSlot1 {
  Hat = 'Hat',
  Shoes = 'Shoes',
  Gloves = 'Gloves',
}

export enum EquipmentTypeSlot2 {
  Hairpin = 'Hairpin',
  Bag = 'Bag',
  Badge = 'Badge',
}

export enum EquipmentTypeSlot3 {
  Watch = 'Watch',
  Charm = 'Charm',
  Necklace = 'Necklace',
}

export interface Student {
  Id: number;
  IsReleased: Released;
  DefaultOrder: number;
  PathName: string;
  DevName: string;
  Name: string;
  School: School;
  Club: string;
  StarGrade: StarGrade;
  SquadType: SquadType;
  TacticRole: TacticRole;
  Summons: object;
  Position: Position;
  BulletType: BulletType;
  ArmorType: ArmorType;
  StreetBattleAdaptation: BattleAdaptation;
  OutdoorBattleAdaptation: BattleAdaptation;
  IndoorBattleAdaptation: BattleAdaptation;
  WeaponType: WeaponType;
  WeaponImg: string;
  Cover: boolean;
  Equipment: EquipmentTypes;
  CollectionBG: string;
  FamilyName: string;
  PersonalName: string;
  SchoolYear: string;
  CharacterAge: string;
  Birthday: string;
  CharacterSSRNew: string;
  ProfileIntroduction: string;
  Hobby: string;
  CharacterVoice: string;
  BirthDay: string;
  Illustrator: string;
  Designer: string;
  CharHeightMetric: string;
  CharHeightImperial: string | object;
  StabilityPoint: number;
  AttackPower1: number;
  AttackPower100: number;
  MaxHP1: number;
  MaxHP100: number;
  DefensePower1: number;
  DefensePower100: number;
  HealPower1: number;
  HealPower100: number;
  DodgePoint: number;
  AccuracyPoint: number;
  CriticalPoint: number;
  CriticalDamageRate: number;
  AmmoCount: number;
  AmmoCost: number;
  Range: number;
  RegenCost: number;
  Skills: Skills;
  FavorStatType: object;
  FavorStatValue: object;
  FavorAlts: object;
  MemoryLobby: object;
  MemoryLobbyBGM: string;
  FurnitureInteraction: object;
  FavorItemTags: object;
  FavorItemUniqueTags: object;
  IsLimited: number;
  Weapon: Weapon;
  Gear: Gear;
  SkillExMaterial: object;
  SkillExMaterialAmount: object;
  SkillMaterial: object;
  SkillMaterialAmount: object;
  TSAId: number | undefined;
  DefensePenetration1: number | undefined;
  DefensePenetration100: number | undefined;
}
