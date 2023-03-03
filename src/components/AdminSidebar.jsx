import React from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu';

export const AdminSidebar = ({showSidebar,setShowSidebar}) => {
  return (
    <div className={`w-full pb-8 absolute xl:relative xl:w-2/12 xl:block xl:max-h-full xl:h-auto  bg-[#f14d60] border-2 border-r-0 border-t-0 border-b-0 border-[#a310216e] xl:ml-2 xl:pl-4 px-6 transition-all duration-500 ${showSidebar ? '-translate-x-0 fixed w-full h-full z-[9999]' : 'translate-x-full xl:-translate-x-0 z-[9999] h-full' } `}>
      <div 
     
      className='py-5 mt-3 xl:hidden block '>
        <MenuIcon  onClick={()=>setShowSidebar(false)}
        className='w-10 h-10 cursor-pointer' />
      </div>
      <ul className='w-full h-auto flex px-2 flex-col sticky top-6 '>
          <Link href='/admin'>
            <li className='w-auto h-auto font-bold text-white cursor-pointer border-black text-center mt-5 py-4 navss px-2'>داشبورد</li>
          </Link>
          <Link href='/admin/product'>
            <li className='w-auto h-auto font-bold text-white hover:bg-gray-500 cursor-pointer mt-8 text-center border-r-0 border-l-0 border-b-0 border-black py-4 navss px-2'>محصول</li>
          </Link>
          <Link href='/admin/add-maincategory'>
            <li className='w-auto h-auto font-bold text-white hover:bg-gray-500 cursor-pointer mt-8 text-center border-r-0 border-l-0 border-b-0 border-black py-4 navss px-2'>دسته بندی اصلی</li>
          </Link>
          <Link href='/admin/add-category'>
            <li className='w-auto h-auto font-bold text-white hover:bg-gray-500 cursor-pointer mt-8 text-center border-r-0 border-l-0 border-b-0 border-black py-4 navss px-2'>دسته بندی</li>
          </Link>
          

          <Link href='/admin/add-brand'>
            <li className='w-auto h-auto font-bold text-white hover:bg-gray-500 cursor-pointer mt-8 text-center border-r-0 border-l-0 border-b-0 border-black py-4 navss px-2 mb-[1px]'>برند</li>
          </Link>

          <Link href='/admin/add-filter-product'>
            <li className='w-auto h-auto font-bold text-white hover:bg-gray-500 cursor-pointer mt-8 text-center border-r-0 border-l-0 border-b-0 border-black py-4 navss px-2 mb-[1px]'>فیلتر محصولات</li>
          </Link>
          
      </ul>     
      </div>
  )
}
