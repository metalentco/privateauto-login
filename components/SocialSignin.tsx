import Image from "next/image";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useSocialSignin } from "@/libs/hooks/useSocialSignin";

const basePath = process.env.BASEPATH || '';
const ssoProviders = [
  {
    icon: `${basePath}/assets/logo-google.svg`,
    type: CognitoHostedUIIdentityProvider.Google
  },
  {
    icon: `${basePath}/assets/logo-apple.svg`,
    type: CognitoHostedUIIdentityProvider.Apple
  }
]

export function SocialSignin() {
  const { initiateSocialSignin } = useSocialSignin()
  if(process.env.NEXT_PUBLIC_ENABLE_SSO !== 'true') {
    return null
  }
  return (
    <>
      <p className="text-sm text-[#808080] font-normal leading-5	my-4">Or signin with</p>
      <div className="space-y-4">
        {ssoProviders.map(provider => (
          <button key={provider.type} onClick={() => initiateSocialSignin(provider.type)} className="w-full flex justify-center bg-[#f7f9fc] py-3 px-4 rounded cursor-pointer">
            <Image
              width={17}
              height={15}
              src={provider.icon}
              alt={`${provider.type}-signin`}
            />
          </button>
        ))}
      </div>
    </>
  )
}