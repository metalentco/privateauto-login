import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const UserPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID || "";
const ClientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

const poolData = {
  UserPoolId,
  ClientId,
};

const userPool = new CognitoUserPool(poolData);

const currentUser: any = userPool.getCurrentUser();

export function signUp(email: any, password: any) {
  const attributeList: any = [
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
  ];

  return new Promise((resolve: any, reject: any) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      [],
      function (error: any, result: any) {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  }).catch((err) => {
    throw err;
  });
}

export function signIn(email: any, password: any) {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve: any, reject: any) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function requestVerificationCode(email: string) {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise(function (resolve, reject) {
    cognitoUser.forgotPassword({
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function ResetPassword(email: any, password: any, code: any) {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise(function (resolve: any, reject: any) {
    if (!cognitoUser) {
      reject(`Could not find ${email}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export function signOut() {
  if (currentUser) {
    currentUser.signOut();
  }
}
