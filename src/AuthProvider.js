import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: 'b365dd38-cd73-41c0-9d5c-c438d4c2242f',
    redirectUri: 'https://questive.au/home',
  },
};

const authenticationParameters = {
  scopes: ['user.read']
}

const options = {
  loginType: LoginType.Redirect
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
