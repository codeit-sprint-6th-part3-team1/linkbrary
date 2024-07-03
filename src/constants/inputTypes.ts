export const InputTypes = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
  };
  
  export type InputTypes = (typeof InputTypes)[keyof typeof InputTypes];