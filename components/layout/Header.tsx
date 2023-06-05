import Image from "next/image";

const basePath = process.env.BASEPATH || '';

const Header = (closeLoginApp: any = () => { }) => {
  return (
    <div className="w-full flex justify-between px-8 py-4">
      <Image width={134} height={24} src={`${basePath}/assets/logo.svg`} alt="logo" />
      <Image
        width={24}
        height={24}
        className="cursor-pointer"
        src={`${basePath}/assets/close.svg`}
        alt="close"
        onClick={() => closeLoginApp()}
      />
    </div>
  );
};

export default Header;
