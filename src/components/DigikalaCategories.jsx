import Image from "next/image";

export default function DigikalaCategoris({ mainCategory }) {
  return (
    <div key={mainCategory.id} className="w-full h-auto gap-y-10 flex flex-wrap justify-center mt-2">
      {mainCategory.map((mainCategory) => {
        return (
          <figure
            key={mainCategory.id}
            className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center flex-col items-center"
          >
            <div className="relative w-[90px] lg:w-[170px] h-[90px] lg:h-[170px]">
              <Image
                src={mainCategory.thumbnail}
                alt=""
                width={170}
                height={170}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <figcaption className="text-center text-xs font-bold mt-3">
              {mainCategory.name}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
