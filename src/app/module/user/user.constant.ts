export enum IsActive {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum AUTHPROVIDER {
  google='google',
  credentials='credentials',
}
export enum LANGUAGE {
  ENGLISH = 'ENGLISH',
  BANGLA = 'BANGLA',
  HINDI = 'HINDI',
  URDU = 'URDU',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  ARABIC = 'ARABIC',
  CHINESE = 'CHINESE',
  JAPANESE = 'JAPANESE',
  KOREAN = 'KOREAN',
  GERMAN = 'GERMAN',
  RUSSIAN = 'RUSSIAN',
  PORTUGUESE = 'PORTUGUESE',
  ITALIAN = 'ITALIAN',
  TURKISH = 'TURKISH',
  PERSIAN = 'PERSIAN',
  MALAY = 'MALAY',
  INDONESIAN = 'INDONESIAN',
  THAI = 'THAI',
  VIETNAMESE = 'VIETNAMESE',
  SWAHILI = 'SWAHILI',
  GREEK = 'GREEK',
  HEBREW = 'HEBREW',
  POLISH = 'POLISH',
  DUTCH = 'DUTCH',
}

export enum PRONOUN {
  'HE/HIM' = 'he/him',
  'SHE/HER' = 'she/her',
  'THEY/THEM' = 'they/them',
}

export const userSearchableFields = ['name', 'blood', 'address'];
