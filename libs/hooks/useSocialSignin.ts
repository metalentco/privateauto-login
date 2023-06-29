import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { FrameEventEnum } from "@/libs/enums/frameEvent.enum";
import { Auth } from 'aws-amplify';

export function useSocialSignin() {
  async function initiateSocialSignin(provider: CognitoHostedUIIdentityProvider) {
    await Auth.signOut({ global: true })
    window.parent?.postMessage(
      { type: FrameEventEnum.SOCIAL_SIGNIN, provider },
      "*"
    );
  }

  return {
    initiateSocialSignin
  }
}