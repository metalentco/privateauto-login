import Image from "next/image";

const basePath = process.env.BASEPATH || '';

const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4 space-x-4">
        <p className="text-[#6c757d]">Or sign in with</p>
        <Image
          width={87}
          height={16}
          src={`${basePath}/assets/coming-soon.svg`}
          alt="logo"
        />
      </div>
      <div className="bg-[url('/external-auth/assets/login-mask.svg')] bg-cover bg-no-repeat flex justify-between py-2 px-4">
        <button>
          <Image
            width={24}
            height={24}
            src={`${basePath}/assets/logo-facebook.svg`}
            alt="facebook"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src={`${basePath}/assets/logo-google.svg`}
            alt="google"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src={`${basePath}/assets/logo-apple.svg`}
            alt="apple"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src={`${basePath}/assets/logo-amazon.svg`}
            alt="amazon"
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;
