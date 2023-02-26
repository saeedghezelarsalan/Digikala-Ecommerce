import Link from 'next/link'
import React,{useRef,useEffect,useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import Navbar from '../components/Navbar'

export default function HomePage ({mainCategory,category}) {
  const router = useRouter()

  const [userData, setUserData] = useState(
    {
      id:'',
      name: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  )

  const changeHandler = (e) => {
    // e.preventDefault()
    setUserData({...userData,  [e.target.name]: e.target.value})
    
  }
  const submitHandler = async (e) => {

    e.preventDefault()
    // setUserData([])
    await axios.post('http://localhost:3001/user', {...userData}  , {headers: {'Content-Type': 'application/json'}})
    router.push('/')
  }



  const focus = useRef()

  useEffect(() => {
    focus.current.focus()
  },[])
  return (
    <>
    <Navbar mainCategory={mainCategory} category={category}  />
    <div className='relative w-auto h-fit flex items-center justify-center max-h-auto bg-white py-12'>
      <div className='w-full px-8 xl:px-auto h-auto  xl:mx-auto xl:w-1/4 flex flex-col bg-white xl:h-auto border border-[#e0e0e2] py-8 max-w-lg rounded-lg'>
        <Link href="/">
          <div className='w-36 h-12 self-center'>
          <img className='w-full h-full object-contain'   src="https://www.digikala.com/statics/img/svg/logo.svg" alt="" />
          </div>
        </Link>
        <h2 className='text-xl mt-2 mb-4 font-semibold text-[#424750]'>ورود | ثبت نام</h2>
        <h5 className='text-xs my-1'>سلام!</h5>
        <h5 className='text-xs my-1'>لطفا نام و ایمیل خود را وارد کنید</h5>

        {/* form */}
        <form onSubmit={submitHandler} className='flex flex-col items-center gap-y-5 my-6'>
        <input 
        onChange={changeHandler} 
        ref={focus} 
        className='w-full border border-[#f14d60] px-2 py-3 rounded-lg text-sm' 
        type="text" name="name"  placeholder='لطفا نام خود را وارد کنید'  />
        <input 
        onChange={changeHandler} 
        className='w-full border border-[#f14d60] px-2 py-3 rounded-lg text-sm' 
        type="email" name="email" placeholder='لطفا ایمیل خود را وارد کنید'  />
        <button type='submit' className='w-full bg-[#ef4056] py-4 mt-4 text-white rounded-xl text-xs'>ورود</button>
        </form>
        <h5 className='text-xs my-1'>ورود شما به معنای پذیرش شرایط دیجی‌کالا و قوانین حریم‌ خصوصی است

</h5>



      </div>
    </div>
    </>
  )
}



export async function getServerSideProps({ params }) {
  let mainCategory = await axios.get("http://localhost:3001/mainCategory");
  mainCategory = mainCategory.data;
  let category = await axios.get("http://localhost:3001/category");
  category = category.data;

  return {
    props: {
      mainCategory,
      category
    },
  };
}
