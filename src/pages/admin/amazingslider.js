import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '../../components/AdminSidebar'
import axios from 'axios'

export default function HomePage() {
    const [mainCategory, setMainCategory] = useState(null)
    const [category, setCategory] = useState({
        id: "",
        name: "",
        slug: "",
        mainCategory: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    const changeHandler = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/category', category, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                console.log(res)
                setCategory({
                    id: "",
                    mainCategory: "",
                    color: "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }

    useEffect(() => {
        const fetchMainCategory = async () => {
            const result = await axios.get('http://localhost:3001/mainCategory')
            setMainCategory(result.data)
        }
        fetchMainCategory()
    }, [])


    return (
        <div className='flex w-full px-8 h-full min-h-screen bg-[#f14d60]'>
            {/* سایدبار */}
            <AdminSidebar />

            {/* لیست اصلی */}

            <div className=' w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-3'>
                <h1 className='naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold'>اضافه کردن دسته بندی</h1>
                <form
                    className='h-auto x-full xl:w-1/2 flex flex-col gap-y-5'
                    onSubmit={submitHandler}>
                    <label>نام دسته بندی کلی</label>
                    <select
                        onChange={changeHandler}
                        name="mainCategory" id=""
                        value={category.mainCategory}
                    >
                        <option value="">انتخاب دسته بندی کلی</option>
                        {mainCategory && mainCategory.map(mainCategory => (
                            <option key={mainCategory.id} value={mainCategory.name}>{mainCategory.name}</option>
                        ))}
                    </select>

                    <label>رنگ اسلایدر شگفت انگیز</label>
                    <input
                        onChange={changeHandler}
                        type="color" name='color' value={category.color} />
                    <div>
                        {category.color}
                    </div>

                    <button type='submit' className='w-full py-1 mt-5 bg-blue-500 rounded-lg text-white'>ایجاد دسته بندی</button>
                </form>

            </div>
        </div>
    )
}