import React, {forwardRef, useEffect, useRef, useState} from "react";

const ProductNavbar = forwardRef((props: any, ref: any) => {
  const [showSticky, setShowSticky] = useState(false);
  const [userScroll, setuserScroll] = useState(true);
  const [scrolled, setScrolled] = useState(1);
  const {scrollPos, setScrollPos} = props;
  const menu = useRef<any>(null);
  const activeLine = useRef<any>(null);
  const moarefi = useRef<any>(null);
  const moshakhasat = useRef<any>(null);
  const didgah = useRef<any>(null);
  const porsesh = useRef<any>(null);

  const {
    sectionFirst,
    sectionSecond,
    sectionThird,
    sectionFour, firstCommentsCount,
    secondCommentsCount,
    questionsCount,
    nav,
  } = ref;

  // menu move indicator

  // click menu items
  useEffect(() => {
    menu.current.childNodes.forEach((item: any, index: number) => {
      item.addEventListener(
        "click",
        () => {
          let menuArray = [moarefi, moshakhasat, didgah, porsesh]
          setScrolled(index + 1);
          if (index + 1 == index + 1) {
            activeLine.current.style.left = menuArray[index].current.offsetLeft + "px";
            activeLine.current.style.width = menuArray[index].current.offsetWidth + "px";
          }

          if (
            index + 1 == 1 &&
            window.screenTop + 80 >
            sectionFirst.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 1 &&
            window.screenTop + 80 >
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 1 &&
            window.screenTop + 100 <
            sectionFirst.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 2 &&
            window.screenTop + 80 >
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 2 &&
            window.screenTop + 80 >
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 2 &&
            window.screenTop + 100 <
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 3 &&
            window.screenTop + 80 >
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 3 &&
            window.screenTop + 80 >
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 3 &&
            window.screenTop + 100 <
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 4 &&
            window.screenTop + 80 >
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFour.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 4 &&
            window.screenTop + 100 <
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFour.current.offsetTop - 101,
              behavior: "smooth",
            });
          }


          setuserScroll(false);

          let timer: any = null;
          window.addEventListener(
            "scroll",
            function () {
              if (timer !== null) {
                clearTimeout(timer);
              }
              timer = setTimeout(function () {
                setuserScroll(true);
              }, 150);
            },
            false
          );

        },
        false
      );
    });

    firstCommentsCount.current.addEventListener("click", () => {
      setScrolled(3);
      window.scrollTo({
        top: sectionThird.current.offsetTop - 107,
        behavior: "smooth",
      });
    });

    secondCommentsCount.current.addEventListener("click", () => {
      setScrolled(3);
      window.scrollTo({
        top: sectionThird.current.offsetTop - 107,
        behavior: "smooth",
      });
    });

    questionsCount.current.addEventListener("click", () => {
      setScrolled(4);
      window.scrollTo({
        top: sectionFour.current.offsetTop - 107,
        behavior: "smooth",
      });
    });
  }, [scrolled]);


  useEffect(() => {
    function scrollHandler() {
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionFirst.current?.getBoundingClientRect().top
      ) {
        setScrolled(1);
        activeLine.current.style.left = moarefi.current.offsetLeft + "px";
        activeLine.current.style.width = moarefi.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionSecond.current?.getBoundingClientRect().top
      ) {
        setScrolled(2);
        activeLine.current.style.left = moshakhasat.current.offsetLeft + "px";
        activeLine.current.style.width = moshakhasat.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionThird.current?.getBoundingClientRect().top
      ) {
        setScrolled(3);
        activeLine.current.style.left = didgah.current.offsetLeft + "px";
        activeLine.current.style.width = didgah.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionFour.current?.getBoundingClientRect().top - 1
      ) {
        setScrolled(4);
        activeLine.current.style.left = porsesh.current.offsetLeft + "px";
        activeLine.current.style.width = porsesh.current.offsetWidth + "px";
      }


      if (
        userScroll &&
        window.screenTop <
        sectionFirst.current?.getBoundingClientRect().top
      ) {
        activeLine.current.style.left = moarefi.current.offsetLeft + "px";
        activeLine.current.style.width = moarefi.current.offsetWidth + "px";
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [userScroll]);


  useEffect(() => {
    const controllNavbar = () => {
      setShowSticky(true);
      if (window.scrollY > nav.current?.getBoundingClientRect().top) {
        setScrollPos(document.body.getBoundingClientRect().top);
        if (document.body.getBoundingClientRect().top < scrollPos) {
          setShowSticky(false);
        } else {
          setShowSticky(true);
        }
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  }, [scrollPos, showSticky]);

  return (
    <nav ref={nav}
         className={`hidden mt-6 pt-2 mr-4 ml-[32px] w-auto h-auto border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] bg-white z-[3] sticky text-white xl:block ${showSticky ? "top-[107px]" : "top-[59px]"} `}>
      <ul ref={menu} className={`hidden xl:flex text-xs font-bold  w-auto mb-1`}>
        <li ref={moarefi} className={`py-2 px-4 cursor-pointer ${scrolled == 1 ? "text-[#ef394e]" : "text-[#81858b]"}`}>
          معرفی
        </li>
        <li ref={moshakhasat} className={`py-2 px-4 cursor-pointer ${scrolled == 2 ? "text-[#ef394e]" : "text-[#81858b]"}`}>
          مشخصات
        </li>
        <li ref={didgah} className={`py-2 px-4 cursor-pointer ${scrolled == 3 ? "text-[#ef394e]" : "text-[#81858b]"}`}>
          دیدگاه ها
        </li>
        <li ref={porsesh} className={`py-2 px-4 cursor-pointer ${scrolled == 4 ? "text-[#ef394e]" : "text-[#81858b]"}`}>
          پرسش ها
        </li>
      </ul>
      <div ref={activeLine} className="h-1 bg-[#ef394e] rounded-tl-[4px] rounded-tr-[4px] absolute bottom-0 transition-all duration-[0.2]"></div>
    </nav>
  )
})

export default ProductNavbar;