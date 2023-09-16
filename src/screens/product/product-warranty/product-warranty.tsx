import React from "react";
import Image from "@/components/image";

const ProductWarranty = () => {
  return(
    <div className="hidden lg:flex justify-between py-6 text-xs px-16 text-[#a1a3a8] tex-[11px] border border-b-8 mx-4 my-5">
      <div className="flex items-center">
        <div className="ml-1">
          <Image
            src="https://www.digikala.com/statics/img/svg/infosection/express-delivery.svg"
            width={40}
            height={40}
            fill={false}
            alt={''}
          />
        </div>
        <p>امکان تحویل اکسپرس</p>
      </div>
      <div className="flex items-center">
        <div className="ml-1">
          <Image
            src="https://www.digikala.com/statics/img/svg/infosection/support.svg"
            width={40}
            height={40}
            fill={false}
            alt={''}
          />
        </div>
        <p>24 ساعته، 7 روز هفته</p>
      </div>
      <div className="flex items-center">
        <div className="ml-1">
          <Image
            src="https://www.digikala.com/statics/img/svg/infosection/cash-on-delivery.svg"
            width={40}
            height={40}
            fill={false}
            alt={''}
          />
        </div>

        <p>امکان پرداخت در محل</p>
      </div>
      <div className="flex items-center">
        <div className="ml-1">
          <Image
            src="https://www.digikala.com/statics/img/svg/infosection/days-return.svg"
            width={40}
            height={40}
            fill={false}
            alt={''}
          />
        </div>

        <p>هفت روز ضمانت بازگشت کالا</p>
      </div>
      <div className="flex items-center">
        <div className="ml-1">
          <Image
            src="https://www.digikala.com/statics/img/svg/infosection/original-products.svg"
            width={40}
            height={40}
            fill={false}
            alt={''}
          />
        </div>

        <p>ضمانت اصل بودن کالا</p>
      </div>
    </div>
  )
}

export default ProductWarranty;