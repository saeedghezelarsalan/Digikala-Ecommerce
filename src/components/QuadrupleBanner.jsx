import Image from "next/image";

export default function QuadrupleBanner({ QuardrupleBanners }) {
  return (
    <div className="w-full h-58 grid lg:grid-cols-4 lg:grid-rows-1  gap-4 sm:gap-3 grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 place-items-center mb-8 mt-4">
      {QuardrupleBanners.banner.map((banner,index) => {
        return (
          <div
            key={index}
            className="relative h-52 w-full rounded-lg overflow-hidden"
          >
            <Image src={banner.image} alt="" layout="fill" objectFit="fill" />
          </div>
        );
      })}
    </div>
  );
}