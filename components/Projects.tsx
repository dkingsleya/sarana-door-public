"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import APL from "../public/Projects/APL.png";
import GoldenCity from "../public/Projects/GoldenCity.png";
import Summarecon from "../public/Projects/Summarecon.png";
import Tokyo from "../public/Projects/TokyoRiverside.png";
import Image from "next/image";
import Riverdale from "../public/Projects/Riverdale.png"
import BIN from "../public/Projects/BIN.png"

const Projects = () => {
  return (
    <>
      <div className="container mt-40 mb-20 m-auto">
        <Swiper
          rewind={true}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay, Navigation]}
          className="mt-5"
        >
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px]  px-6">
              <Image className="object-fit" src={APL} alt="Agung Podomoro Land" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px] px-6">
              <Image className="object-fit" src={GoldenCity} alt="Golden City" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px] px-6">
              <Image
                className="object-fit self-center"
                src={Summarecon}
                alt="Summarecon"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px]  px-6">
              <Image className="object-fit" src={Tokyo} alt="Tokyo Riverside" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px]  px-6">
              <Image className="object-fit" src={Riverdale} alt="Tokyo Riverdale" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex w-[250px] h-[250px]  px-6">
              <Image className="object-fit" src={BIN} alt="BIN" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="justify-center items-center flex  w-[250px] h-[250px] px-6">
              and more...
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </>
  );
};

export default Projects;
