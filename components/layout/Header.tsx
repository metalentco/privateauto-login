import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full flex justify-between px-8 py-8">
      <Image width={134} height={24} src="/assets/logo.svg" alt="logo" />
      <Image width={24} height={24} src="/assets/close.svg" alt="logo" />
    </div>
  );
};

export default Header;
