import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>صفحه مورد نظر یافت نشد</title>
      </Head>
      <div className='flex flex-col items-center justify-center mt-56'>
        <h1 >صفحه ای که دنبال آن بودید پیدا نشد!</h1>
        <div className='mt-5 decoration-none mb-16 text-[#19bfd3] flex items-center'>
          <Link href='/'>
            <span className='pl-1 cursor-pointer select-none'>صفحه اصلی </span>
          </Link>
        </div>
        <div className='relative block'>
        <Image 
        src="https://www.digikala.com/statics/img/png/page-not-found.png"
        fill={true}
        objectFit='fill'
        alt=""
        />
        </div>
      </div>
    </>
  )
}
