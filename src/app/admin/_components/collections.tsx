import Image from "next/image";

export const Collection = () => {
    return (
      <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
            <Image 
              src="/images/collection.png"  // Reference from public directory
              fill
              className="object-contain"
              alt="collections"
            />
          </div>
        </div>
      </div>
    );
  };