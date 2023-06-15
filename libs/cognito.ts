import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { Amplify, Auth } from 'aws-amplify';

const secret = 'EZScretJwtKey';
let userAgent: string;
let apiUrl: string;

interface Result {
  readonly ok: boolean;
  readonly message: string;
}

function getParamterHash(userAgent: string, url: string, body = {}) {
  const payload = { body, userAgent, url };
  return Base64.stringify(hmacSHA256(JSON.stringify(payload), secret));
}

async function getConfig(windowRef: any): Promise<any> {
  userAgent = windowRef.navigator.userAgent;
  const base = windowRef.location?.hostname;
  const appDomain = windowRef.location.hostname === 'localhost' ? 'localhost' : windowRef.location.hostname.split('.').slice(1).join('.');
  const appUrl = `https://app.${base}`;

  let region = process.env.NEXT_PUBLIC_REGION;
  let amplifyUserPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID;
  let amplifyWebClientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  let amplifyIdentityPoolId = process.env.NEXT_PUBLIC_IDPOOL_ID;
  let redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;
  let authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  let appConfigUrl = process.env.NEXT_PUBLIC_CONFIG_URL;
  apiUrl = process.env.NEXT_PUBLIC_API_URL ?? appConfigUrl ?? '';

  if (appConfigUrl) {
    const appConfg = await fetch(`${appConfigUrl}/api/appconfig`, {
      headers: {
        'X-PA': getParamterHash(userAgent, '/api/appconfig', {}),
        'x-client': userAgent,
        'accept': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((appConfig: any) => {
        region = appConfig.amplifyRegion;
        amplifyIdentityPoolId = appConfig.amplifyIdentityPoolId;
        amplifyUserPoolId = appConfig.amplifyUserPoolId;
        amplifyWebClientId = appConfig.amplifyWebClientId;
        authDomain = appConfig.amplifyOauthDomain;
      });
  }

  const awsConfig = {
    aws_project_region: region,
    aws_cognito_identity_pool_id: amplifyIdentityPoolId,
    aws_cognito_region: region,
    aws_user_pools_id: amplifyUserPoolId,
    aws_user_pools_web_client_id: amplifyWebClientId,
    Auth: {
      identityPoolId: amplifyIdentityPoolId,
      region,
      identityPoolRegion: region,
      userPoolId: amplifyUserPoolId,
      userPoolWebClientId: amplifyWebClientId,
      cookieStorage: {
        domain: appDomain,
        path: '/',
        expires: 365,
        sameSite: 'lax',
        secure: appDomain !== 'localhost',
      },
      oauth: {
        domain: authDomain ?? base,
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: `${appUrl}/auth/login`,
        redirectSignOut: `${appUrl}/auth/logout`,
        responseType: 'token',
      },
    },
  }

  await Amplify.configure(awsConfig);
  console.log('login awsConfig: ', awsConfig);

  return {
    appUrl,
    appDomain,
    userAgent,
    redirectUrl: redirectUrl ?? appUrl
  };

}

let configDone = (c: any) => { };
const config: Promise<any> = new Promise((resolve, reject) => { configDone = resolve; });

export async function initConfig(windowRef: any, e: any = undefined) {
  getConfig(windowRef)
    /*.catch((e) => initConfig(e, windowRef)) */
    .then((c) => configDone(c));
  return config;
}

const currentUser: any = async () => {
  try {
    const resp = await Auth.currentAuthenticatedUser();
    return { ok: true, ...resp };
  }
  catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export async function signUp(email: string, password: string, family_name: string, given_name: string) {
  await Auth.signOut();
  await Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
      family_name,
      given_name,
    },
  });
  await Auth.signIn(email, password)
}

export async function signIn(email: string, password: string): Promise<Result> {
  try {
    const user = await Auth.signIn(email, password);

    if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      const code = ''; // from user input
      const mfaType = undefined;  // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
      const loggedUser = await Auth.confirmSignIn(user, code, mfaType);
    } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      // this is a hack to bypass the new password requirement
      const newPassword = password;
      const loggedUser = await Auth.completeNewPassword(user, newPassword);
    } else if (user.challengeName === 'MFA_SETUP') {
      // This happens when the MFA method is TOTP
      Auth.setupTOTP(user);
    } else if (user.challengeName === 'SELECT_MFA_TYPE') {
      const mfaType = undefined;  // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA from user
      user.sendMFASelectionAnswer(mfaType, {
        onFailure: (err: any) => {
          console.error(err);
        },
        mfaRequired: (challengeName: string, parameters: any) => {
          // Auth.confirmSignIn with SMS code
        },
        totpRequired: (challengeName: string, parameters: any) => {
          // Auth.confirmSignIn with TOTP code
        }
      });
    } else {
      // The user directly signs in
      console.log(user);
    }
    return { ok: true, message: 'Ok' };

  } catch (err: any) {
    if (err.code === 'UserNotConfirmedException') {
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
      // Please check the Forgot Password part.
    } else if (err.code === 'NotAuthorizedException') {
      // The error happens when the incorrect password is provided
    } else if (err.code === 'UserNotFoundException') {
      // The error happens when the supplied username/email does not exist in the Cognito user pool
    } else {
      console.log(err);
    }
    return { ok: false, message: err.message };
  }
}


async function apiCall(method: string, path: string, body: any) {
  const url = `/api${path.startsWith('/') ? '' : '/'}${path}`
  return fetch(`${apiUrl}${url}`, {
    method,
    headers: {
      'X-PA': getParamterHash(userAgent, url, body ?? {}),
      'x-client': userAgent,
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
}

export async function forgotPassword(email: string): Promise<Result> {
  try {
    // the normal Cognito approach would be:
    // const resp = await Auth.forgotPassword(email);
    const resp = await apiCall('POST', `/users/forgot-password`, { email })
    return { ok: true, message: 'Ok' };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export async function ResetPassword(email: any, password: any, code: any) {
  try {
    // the normal Cognito approach would be:
    // const resp = Auth.forgotPasswordSubmit(email, code, password);
    const resp = await apiCall('PUT', `/users/reset-password`, { email, code, password })
    return { ok: true, message: 'Ok' };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export function signOut() {
  if (currentUser && currentUser.signOut) {
    currentUser.signOut();
  }
}
