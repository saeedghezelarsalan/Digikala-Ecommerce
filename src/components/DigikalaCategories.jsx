import Image from "next/image";
import Link from "next/link";

export default function DigikalaCategoris({ category }) {
  return (
    <div key={category.id} className="w-full h-auto gap-y-10 flex flex-wrap justify-center mt-2">
      {category?.map((category) => {
        return (
          <figure
            key={category.id}
            className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center flex-col items-center"
          >
            <div className="relative w-[90px] lg:w-[170px] h-[90px] lg:h-[170px]">
              <Link href={`search/${category.slug}`} passHref>
              <Image
                src={category.thumbnail}
                alt=""
                layout="fill"
                objectFit="cover"
              />
              </Link>
            </div>
            <figcaption className="text-center text-xs font-bold mt-3">
            <Link href={`search/${category.slug}`} passHref>
              {category.name}
            </Link>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
