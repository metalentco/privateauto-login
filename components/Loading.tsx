import Image from "next/image";

const basePath = process.env.BASEPATH || '';

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Image
        width={640}
        height={600}
        className="w-[300px]"
        src={`${basePath}/assets/loading.gif`}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
