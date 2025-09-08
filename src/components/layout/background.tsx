import BackgroundImage from "public/Background.webp";
import Image from "next/image";

const Background = () => {
  return (
    <div className="fixed z-0">
      <div className="pointer-events-none relative h-screen w-screen scale-105 opacity-80">
        <Image
          src={BackgroundImage}
          alt="Background petals falling"
          layout="fill"
          priority
        />
      </div>
    </div>
  );
};

export default Background;
