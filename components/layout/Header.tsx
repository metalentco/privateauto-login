import Image from "next/image";

const Header = () => {
  const closeLoginApp = () => {
    window.parent.postMessage("close", "*");
    console.log("close event was emmitted");
  };
  return (
    <div className="w-full flex justify-between px-8 py-4">
      <Image width={134} height={24} src="/assets/logo.svg" alt="logo" />
      <Image
        width={24}
        height={24}
        className="cursor-pointer"
        src="/assets/close.svg"
        alt="close"
        onClick={() => closeLoginApp()}
      />
    </div>
  );
};

export default Header;
