"use client";

import { ItemProps } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import { FallbackImage } from "./ImageFallback";

interface ItemDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  item: ItemProps;
  category: string;
}

const ItemDetails = ({ isOpen, closeModal, item, category }: ItemDetailsProps) => {
  const pesan = `Halo, saya mau pesan ${item.prd_name}`;
  const [mouseMove, setMouseMove] = useState({})

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setMouseMove({ 'backgroundPositionX': `${Math.round(x)}%`, 'backgroundPositionY': `${Math.round(y)}%` })
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 overflow-y-auto" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="container p-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-8 right-8 w-fit p-4 bg-primary-blue-100 rounded-full"
                    >
                      <Image
                        src="/close.svg"
                        alt="close"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </button>
                  </div>
                  <div className="container my-14">
                    <Swiper
                      style={{
                        '--swiper-navigation-color': 'rgb(148,163,184)',
                        '--swiper-pagination-color': 'rgb(148,163,184)',
                      } as React.CSSProperties}
                      zoom={true}
                      rewind={true}
                      spaceBetween={30}
                      centeredSlides={true}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={true}
                      modules={[Zoom, Navigation, Pagination]}
                      className="justify-center items-center flex max-h-[100vh]"
                    >
                      {item.prd_asset ? item.prd_asset.length > 0 && item.prd_asset.map((value: any, iter: number) => (
                        <SwiperSlide key={`swiper-${iter}`}>
                          <div key={`main-div-${iter}`} className="justify-center items-center flex swiper-zoom-container">
                            {value.substring(value.length - 3, value.length).toLowerCase() === 'mp4' ? (
                              <video key={`video-${iter}`} controls className="object-contain w-auto h-auto max-h-[500px] rounded-lg">
                                <source src={require(`../public/${item.prd_type}/${value}`)} />
                              </video>
                            ) : (
                              <figure onMouseMove={(e) => {
                                handleMouseMove(e)
                              }}>
                                <FallbackImage keyVal={`fallback-${iter}`} detail={true} styles={Object.assign(mouseMove, { 'objectFit': 'cover', 'borderRadius': '0.75rem', 'maxWidth': '500px', 'maxHeight': '500px', 'width': 'auto' })} src={`/${item.prd_type}/${value}`} alt={value} />
                              </figure>
                            )}
                          </div>
                        </SwiperSlide>
                      )) : (<Image key={`empty-${item.prd_name}`} className="object-contain w-full h-[500px]" src={require(`../public/asset/no_image.png`)} alt='' />)}
                    </Swiper>
                  </div>
                  <div className="container p-6">
                    <Dialog.Title
                      as="h3"
                      className="leading-6 text-gray-900 font-semibold text-xl capitalize"
                    >
                      {item.prd_name}
                    </Dialog.Title>
                    <div className="mt-4">
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex justify-between gap-5 w-full text-left">
                          Product Code
                          <h4 className="text-gray capitalize"><p className="text-black-100 font-semibold text-left">{item.prdcd}</p></h4>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex justify-between gap-5 w-full text-left">
                          Name
                          <h4 className="text-gray capitalize"><p className="text-black-100 font-semibold text-left">{item.prd_name}</p></h4>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex justify-between gap-5 w-full text-left">
                          Category
                          <h4 className="text-gray capitalize"><p className="text-black-100 font-semibold text-left">{item.prd_category}</p></h4>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex justify-between gap-5 w-full text-left">
                          Type
                          <h4 className="text-gray capitalize"><p className="text-black-100 font-semibold text-left">{item.prd_type}</p></h4>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex justify-between gap-5 w-full text-left">
                          Description
                          <div className="container w-full h-60 overflow-auto text-left">
                            {item.prd_desc.length > 0 && item.prd_desc.map((val: any, idx: number) => (
                              <div key={`main-container-${idx}`}>
                                <div key={`main-div-size-1${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Ukuran Kusen :' : category.toLowerCase().includes('jendela') ? 'Ukuran Luar :' : 'Ukuran 1 :'}
                                    {val.size1.length > 0 && val.size1.map((val: any, idx: number) => (
                                      <span key={`value-k-span-size1-${idx}`} className="font-extrabold pb-4">
                                        <p key={`value-k-${idx}`} className="pb-4">{idx + 1} - {val}</p>
                                      </span>
                                    ))}
                                  </span>
                                </div>
                                <div key={`main-div-size2-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Ukuran Daun :' : category.toLowerCase().includes('jendela') ? 'Ukuran Dalam :' : 'Ukuran 2 :'}
                                    {val.size2.length > 0 && val.size2.map((val: any, idx: number) => (
                                      <span key={`value-k-span-size2-${idx}`} className="font-extrabold pb-4">
                                        <p key={`value-k-${idx}`} className="pb-4">{idx + 1} - {val}</p>
                                      </span>
                                    ))}
                                  </span>
                                </div>
                                <div key={`main-div-key-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Jenis Kunci :' : 'Jenis Kunci :'}
                                    <span className="font-extrabold pb-4">
                                      <p key={`value-key_type-${idx}`} className="pb-4">{val.key_type}</p>
                                    </span>
                                  </span>
                                </div>
                                <div key={`main-div-variant-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Varian' : 'Varian :'}
                                    <span className="font-extrabold pb-4">
                                      <p key={`value-variant-${idx}`} className="pb-4">{val.variant}</p>
                                    </span>
                                  </span>
                                </div>
                                <div key={`main-div-super-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Keunggulan :' : category.toLowerCase().includes('jendela') ? 'Keunggulan :' : 'Fitur Tambahan: '}
                                    {val.superiority.length > 0 && val.superiority.map((val: any, idx: number) => (
                                      <span key={`value-k-span-superiority-${idx}`} className="font-extrabold pb-4">
                                        <p key={`value-k-${idx}`} className="pb-4">{idx + 1} - {val}</p>
                                      </span>
                                    ))}
                                  </span>
                                </div>
                                <div key={`main-div-usecase-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Baik Digunakan :' : 'Baik Digunakan : '}
                                    {val.usecase.length > 0 && val.usecase.map((val: any, idx: number) => (
                                      <span key={`value-k-span-usecase-${idx}`} className="font-extrabold pb-4">
                                        <p key={`value-k-${idx}`} className="pb-4">{idx + 1} - {val}</p>
                                      </span>
                                    ))}
                                  </span>
                                </div>
                                <div key={`main-div-note-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Note :' : 'Note :'}
                                    <span className="font-extrabold pb-4">
                                      <p key={`value-note-${idx}`} className="pb-4">{val.note}</p>
                                    </span>
                                  </span>
                                </div>
                                <div key={`main-div-type-${idx}`} className="flex justify-between gap-5 w-full text-left">
                                  <span className=" text-black-100 font-semibold text-left"> {category.toLowerCase().includes('pintu') ? 'Tipe :' : 'Tipe :'}
                                    {val.type.length > 0 && val.type.map((val: any, idx: number) => (
                                      <span key={`value-k-span-type-${idx}`} className="font-extrabold pb-4">
                                        <p key={`value-k-${idx}`} className="pb-4">{idx + 1} - {val}</p>
                                      </span>
                                    ))}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a href={"https://wa.me/6285770383639?text=" + pesan} target="_blank" onClick={closeModal} className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 w-full">Pesan via Whatsapp</a>
                      </div>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div >
        </Dialog >
      </Transition >
    </>
  );
};

export default ItemDetails;
