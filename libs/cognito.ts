import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { Amplify, Auth } from 'aws-amplify';

const secret = 'EZScretJwtKey';

interface Result {
  readonly ok: boolean;
  readonly message: string;
}

function getParamterHash(userAgent: string, url: string, body = {}) {
  const payload = { body, userAgent, url };
  return Base64.stringify(hmacSHA256(JSON.stringify(payload), secret));
}

async function getConfig(windowRef: any): Promise<any> {
  const { userAgent } = windowRef.navigator;
  const base = windowRef.location?.hostname;
  const appUrl = `https://app.${base}`;

  return fetch(`/api/appconfig`, {
    headers: {
      'X-PA': getParamterHash(userAgent, '/api/appconfig', {}),
      'x-client': userAgent,
    },
  })
    .then((res) => res.json())
    .then((appConfig: any) => {
      appConfig.appUrl = appUrl;
      appConfig.appDomain = windowRef.location.hostname === 'localhost' ? 'localhost' : windowRef.location.hostname.slice(4);
      Amplify.configure({
        aws_project_region: appConfig.amplifyRegion,
        aws_cognito_identity_pool_id: appConfig.amplifyIdentityPoolId,
        aws_cognito_region: appConfig.amplifyRegion,
        aws_user_pools_id: appConfig.amplifyUserPoolId,
        aws_user_pools_web_client_id: appConfig.amplifyWebClientId,
        Auth: {
          identityPoolId: appConfig.amplifyIdentityPoolId,
          region: appConfig.amplifyRegion,
          identityPoolRegion: appConfig.amplifyRegion,
          userPoolId: appConfig.amplifyUserPoolId,
          userPoolWebClientId: appConfig.amplifyWebClientId,
          cookieStorage: {
            domain: appConfig.appDomain,
            path: '/',
            expires: 365,
            sameSite: 'lax',
            secure: appConfig.appDomain !== 'localhost',
          },
          oauth: {
            domain: appConfig.amplifyOauthDomain,
            scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: `${appConfig.appUrl}/auth/login`,
            redirectSignOut: `${appConfig.appUrl}/auth/login`,
            responseType: 'token',
          },
        },
      })
    }).then((x) => {
      console.log(x);
      return x;
    });
  ;
}

let configDone = (c: any) => { };
const config: Promise<any> = new Promise((resolve, reject) => { configDone = resolve; });

export async function initConfig(windowRef: any, e: any = undefined) {
  getConfig(windowRef).catch((e) => initConfig(e, windowRef)).then((c) => configDone(c));
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
  return await Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
      family_name,
      given_name,
    },
  });
}

export async function signIn(email: string, password: string): Promise<Result> {
  try {
    await Auth.signIn(email, password);
    return { ok: true, message: 'Ok' };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export async function forgotPassword(email: string): Promise<Result> {
  try {
    const resp = Auth.forgotPassword(email);
    return { ok: true, message: 'Ok' };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}




export async function ResetPassword(email: any, password: any, code: any) {
  try {
    const resp = Auth.forgotPasswordSubmit(email, code, password);
    return { ok: true, message: 'Ok' };
  } catch (err: any) {
    return { ok: false, message: err.message };
  }
}

export function signOut() {
  if (currentUser) {
    currentUser.signOut();
  }
}
