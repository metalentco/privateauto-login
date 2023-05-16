import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex justify-center px-8 py-4">
      <Image width={134} height={24} src="/assets/logo.svg" alt="logo" />
    </div>
  );
};

export default Header;
