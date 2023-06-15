import Image from "next/image";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useSocialSignin } from "@/libs/hooks/useSocialSignin";

const basePath = process.env.BASEPATH || '';
const ssoProviders = [
  {
    icon: `${basePath}/assets/logo-google.svg`,
    type: CognitoHostedUIIdentityProvider.Google
  }
]

export function SocialSignin() {
  const { initiateSocialSignin } = useSocialSignin()
  return (
    <>
      <p className="text-sm text-[#808080] font-normal leading-5	my-4">Or signin with</p>
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
    </>
  )
}