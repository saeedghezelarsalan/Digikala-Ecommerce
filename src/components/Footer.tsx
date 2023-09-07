import Image from "next/image";
import React, {useEffect, useRef} from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Footer = () => {
  const scrollToTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTopRef?.current && scrollToTopRef?.current?.addEventListener("click", () => {
      window.scrollTo({top: 0, behavior: "smooth"});
    });

    return () => {
      scrollToTopRef?.current && scrollToTopRef?.current?.removeEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
      });
    }
  });

  return (
    <footer className="bg-white shadow-md flex justify-center border border-l-0 border-r-0 border-b-0  px-4 py-4 pb-20 lg:pb-0">
      <div className="max-w-screen-2xl">
        <div className="w-full flex items-center justify-between">
          <div className="h-[30px] w-28 relative">
            <Image
              src="https://www.digikala.com/statics/img/svg/digi.svg"
              alt="digikala"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            ref={scrollToTopRef}
            className="flex border border-[#e0e0e2] rounded-lg py-2 px-4 cursor-pointer items-center justify-center"
          >
            <p className="text-[#a1a3a8] ml-2 text-xs">بازگشت به بالا</p>
            <KeyboardArrowUpIcon className="fill-[#a1a3a8]"/>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col lg:flex-row  text-[#424750] mt-2 mb-4 xl:items-center">
          <div className="text-[11px]">تلفن پشتیبانی 021-61930000</div>
          <div className="text-[#a1a3a8] hidden lg:block  pl-5 pr-5">|</div>
          <div className="text-[11px] mt-2 lg:mt-0">
            7 روز هفته، 24 ساعته پاسخگوی شما هستیم
          </div>
        </div>

        <div className="hidden lg:flex justify-evenly items-center">
          <div className="flex flex-col items-center">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/express-delivery.svg"
              width={56}
              height={56}
              alt={''}
            />
            <span className="text-xs text-[#a1a3a8] mb-8">
              امکان تحویل اکسپرس
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/cash-on-delivery.svg"
              width={56}
              height={56}
              alt={''}
            />
            <span className="text-xs text-[#a1a3a8] mb-8">
              امکان تحویل در محل
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/support.svg"
              width={56}
              height={56}
              alt={''}
            />
            <span className="text-xs text-[#a1a3a8] mb-8">
              هفت روز هفته، 24 ساعته
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/days-return.svg"
              width={56}
              height={56}
              alt={''}
            />
            <span className="text-xs text-[#a1a3a8] mb-8">
              هفت روز ضمانت بازگشت کالا
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://www.digikala.com/statics/img/svg/footer/original-products.svg"
              width={56}
              height={56}
              alt={''}
            />
            <span className="text-xs text-[#a1a3a8] mb-8">
              ضمانت اصل بودن کالا
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mb-4">
          <div className="w-full lg:w-8/12 flex justify-between  flex-wrap lg:px-6 gap-x-4 mb-5 lg:mb-0">
            <div className="flex flex-col">
              <p className="text-[#424750] font-bold text-base mb-2">
                با دیجی کالا
              </p>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">
                  اتاق خبر دیجی کالا
                </p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">فروش در دیجی کالا</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">فرصت های شغلی</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">
                  گزارش تخلف در دیجی کالا
                </p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">تماس با دیجی کالا</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">درباره دیجی کالا</p>
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="text-[#424750] font-bold text-base mb-2">
                خدمات مشتریان
              </p>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">
                  پاسخ به پرسش های متداول
                </p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">
                  رویه های بازگرداندن کالا
                </p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">شرایط استفاده</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">حریم خصوصی</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">گزارش باگ</p>
              </Link>
            </div>
            <div className="hidden sm:flex flex-col">
              <p className="text-[#424750] font-bold text-base mb-2">
                راهنمایی خرید از دیجی کالا
              </p>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">نحوه ثبت سفارش</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">رویه ارسال سفارش</p>
              </Link>
              <Link href="/">
                <p className="text-[#81858b] text-sm mb-2">شیوه های پرداخت</p>
              </Link>
            </div>
          </div>

          <div className="w-auto  flex flex-col mr-0 lg:mr-auto">
            <div className="flex flex-row lg:flex-col justify-between">
              <p className="text-[#424750] font-bold text-base mb-3">
                همراه ما باشید!
              </p>
              <div className="mb-3 flex justify-between lg:ml-28">
                {/* #a1a3a8 */}
                <InstagramIcon className="fill-[#a1a3a8] w-10 h-10"/>
                <TelegramIcon className="fill-[#a1a3a8] w-10 h-10"/>
                <LinkedInIcon className="fill-[#a1a3a8] w-10 h-10"/>
                <YouTubeIcon className="fill-[#a1a3a8] w-10 h-10"/>
              </div>
            </div>

            <p className="text-[#424750] font-bold text-sm mb-3 hidden lg:block">
              با ثبت ایمیل، از جدیدترین تخفیف ها با خبر شوید
            </p>
          </div>
        </div>
        <div className="bg-[#3c4b6d] w-full h-auto flex flex-col items-center py-5 rounded-lg ">
          <div className="w-full flex flex-col items-center py-2 xl:flex-row px-4">
            <div className="w-full flex justify-center items-start lg:items-center mb-4 xl:mb-0  xl:justify-start">
              <div className="hidden xl:block">
                <Image
                  src="https://www.digikala.com/statics/img/png/footerlogo2.png"
                  alt=""
                  width={44}
                  height={44}
                />
              </div>
              <div className="block xl:hidden">
                <Image
                  src="https://www.digikala.com/statics/img/png/footerlogo2.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-white text-sm mr-2 lg:mb-2">
                دانلود اپلیکیشن دیجی کالا
              </p>
            </div>

            <div className="w-full flex justify-between xl:mr-auto">
              <Image
                src="https://www.digikala.com/statics/img/svg/appStores/google-play.svg"
                alt=""
                width={160}
                height={44}
              />

              <Image
                src="https://www.digikala.com/statics/img/svg/appStores/coffe-bazzar.svg"
                alt=""
                width={160}
                height={44}
              />

              <Image
                src="https://www.digikala.com/statics/img/svg/appStores/myket.svg"
                alt=""
                width={160}
                height={44}
              />

              <Image
                src="https://www.digikala.com/statics/img/svg/appStores/sib-app.svg"
                alt=""
                width={160}
                height={44}
              />
            </div>
          </div>
          <div className="xl:hidden flex items-center mt-4">
            <p className="text-white text-xs">اطلاعات بیشتر</p>
            <KeyboardArrowLeftIcon className="fill-white"/>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col lg:flex-row mt-6 py-8 border border-r-0 border-l-0">
          <div className="w-full lg:w-1/2">
            <p className="text-[#424750] font-bold text-sm mb-2 ">
              فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین
            </p>
            <span className="text-xs text-[#81858b] text-justify">
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و
              توانسته از این طریق مشتریان ثابت خود را داشته باشد.
            </span>
          </div>

          <div className="mr-auto flex flex-wrap">
            <div className="border border-[#e0e0e2] rounded-lg px-4 py-4">
              <Image
                src="https://www.digikala.com/statics/img/png/rezi.png"
                alt=""
                width={75}
                height={75}
              />
            </div>
            <div className="border border-[#e0e0e2] rounded-lg px-4 py-4 mr-2">
              <Image
                src="https://www.digikala.com/statics/img/png/kasbokar.png"
                alt=""
                width={75}
                height={75}
              />
            </div>
            <div className="border border-[#e0e0e2] rounded-lg px-4 py-4 mr-2">
              <Image
                src="https://www.digikala.com/statics/img/png/enamad.png"
                alt=""
                width={75}
                height={75}
              />
            </div>
          </div>
        </div>

        <div className="w-full py-6 ">
          <p className="text-xs w-full text-center">
            برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع»
            کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت نوآوران فن آوازه
            (فروشگاه آنلاین دیجی‌کالا) است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;