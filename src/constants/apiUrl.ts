const apiRootUrl = process.env.NEXT_PUBLIC_API_ROOT_URL;

const endpoints = {
  // AUTH
  signUp: `${apiRootUrl}/auth/sign-up`,
  signIn: `${apiRootUrl}/auth/sign-in`,

  //FOLDER

  // LINK
  links: `${apiRootUrl}/links`,

  //OAUTH

  //USER
  user: `${apiRootUrl}/user`,
};
