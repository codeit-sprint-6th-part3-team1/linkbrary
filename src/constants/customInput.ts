export enum CustomInputTypes {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export type CustomInputType = keyof typeof CustomInputTypes;
