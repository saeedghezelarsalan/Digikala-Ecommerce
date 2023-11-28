import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'

export default function HomePage({ mainCategory, category }) {
  const router = useRouter()

  const initialValues = {
    id: '',
    name: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const onSubmit = async (values) => {
    await axios.post('https://digikala-demo-data-q7eo.vercel.app/user', { ...values }, { headers: { 'Content-Type': 'application/json' } })
    router.push('/')
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(4, 'نام حداقل باید 4 کاراکتر داشته باشد').required("وارد کردن نام الزامیست"),
    email: Yup.string().email('فرمت ایمیل صحیح نمی باشد').required("وارد کردن ایمیل الزامیست")
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  const focus = useRef()

  useEffect(() => {
    focus.current.focus()
  }, [])
  return (
    <>
      <Navbar mainCategory={mainCategory} category={category} />
      <div className='relative w-auto h-fit flex items-center justify-center max-h-auto bg-white py-12'>
        <div className='w-full px-8 xl:px-auto h-auto  xl:mx-auto xl:w-1/4 flex flex-col bg-white xl:h-auto border border-[#e0e0e2] py-8 max-w-lg rounded-lg'>
          <Link href="/">
            <div className='w-36 h-12 self-center'>
              <Image className='w-full h-full object-contain' src="https://www.digikala.com/statics/img/svg/logo.svg" alt="" />
            </div>
          </Link>
          <h2 className='text-xl mt-2 mb-4 font-semibold text-[#424750]'>ورود | ثبت نام</h2>
          <h5 className='text-xs my-1'>سلام!</h5>
          <h5 className='text-xs my-1'>لطفا نام و ایمیل خود را وارد کنید</h5>

          {/* form */}
          <form onSubmit={formik.handleSubmit} className='flex flex-col items-center gap-y-5 my-6'>
            <input
              ref={focus}
              {...formik.getFieldProps('name')}
              className='w-full border border-[#f14d60] px-2 py-3 rounded-lg text-sm'
              type="text" name="name" placeholder='لطفا نام خود را وارد کنید' />
            {formik.errors.name && formik.touched.name && <div className="text-red-600 text-right w-full">{formik.errors.name}</div>}
            <input
              {...formik.getFieldProps('email')}
              className='w-full border border-[#f14d60] px-2 py-3 rounded-lg text-sm'
              type="email" name="email" placeholder='لطفا ایمیل خود را وارد کنید' />
            {formik.errors.email && formik.touched.email && <div className="text-red-600 text-right w-full">{formik.errors.email}</div>}
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
  let mainCategory = await axios.get("https://digikala-demo-data-q7eo.vercel.app/mainCategory");
  mainCategory = mainCategory.data;
  let category = await axios.get("https://digikala-demo-data-q7eo.vercel.app/category");
  category = category.data;

  return {
    props: {
      mainCategory,
      category
    },
  };
}