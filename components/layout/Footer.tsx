import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4 space-x-4">
        <p className="text-[#6c757d]">Or sign in with</p>
        <Image
          width={87}
          height={16}
          src="/assets/coming-soon.svg"
          alt="logo"
        />
      </div>
      <div className="bg-[url('/assets/login-mask.svg')] bg-cover bg-no-repeat flex justify-between py-2 px-4">
        <button>
          <Image
            width={24}
            height={24}
            src="/assets/logo-facebook.svg"
            alt="facebook"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src="/assets/logo-google.svg"
            alt="google"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src="/assets/logo-apple.svg"
            alt="apple"
          />
        </button>
        <button>
          <Image
            width={24}
            height={24}
            src="/assets/logo-amazon.svg"
            alt="amazon"
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;
