import Image from "next/image"

const BlogPost = ({post}:any) => {

  return (
        <div key={post.id} className='flex flex-col border rounded-md '>
            <div className="h-48 w-full relative block">
            <Image
            src={post.image}
            alt=""
            layout="fill"
            objectFit="fill"
            />
            </div>
            <figcaption className='pb-6 pt-4 pr-2 text-sm text-gray-500'>
                {post.title}
             </figcaption>
    </div>
  )
}

export default BlogPost