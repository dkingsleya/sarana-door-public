"use client";

import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import banner1 from "../public/Banner/banner1.png";
import banner2 from "../public/Banner/banner2.png";
import banner3 from "../public/Banner/banner3.png";
import banner4 from "../public/Banner/banner4.png";
import Link from "next/link";

const Header = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); //prevent the default behavior
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };


  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">GLOBAL PIPLASINDO</h1>
        <p className="hero__subtitle">
          xxx
        </p>
        <Link
          href="#produk"
          onClick={handleScroll}
          className="bg-slate-300 text-slate-950 rounded-full mt-10 flex flex-row relative justify-center items-center py-3 px-6 outline-none shadow-md font-bold hover:shadow-lg transition ease-in-out delay-150"
        >
          Lihat Produk
        </Link>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Swiper
            style={
              {
                "--swiper-navigation-color": "rgb(148,163,184)",
                "--swiper-pagination-color": "rgb(148,163,184)",
              } as React.CSSProperties
            }
            rewind={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
            className="justify-center items-center flex  rounded-3xl"
          >
            <SwiperSlide>
              <div className="justify-center items-center flex">
                <Image
                  className="object-contain w-[65%] h-[65%] rounded-3xl"
                  src={banner1}
                  alt="1"
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="justify-center items-center flex">
                <Image
                  className="object-contain w-[65%] h-[65%] rounded-3xl"
                  src={banner2}
                  alt="2"
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="justify-center items-center flex">
                <Image
                  className="object-contain w-[65%] h-[65%] rounded-3xl"
                  src={banner3}
                  alt="3"
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="justify-center items-center flex">
                <Image
                  className="object-contain w-[65%] h-[65%] rounded-3xl"
                  src={banner4}
                  alt="4"
                  priority
                />
              </div>
            </SwiperSlide>
          </Swiper>
          {/* <Image src="/hero.png" alt="hero" fill className="object-contain" /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
