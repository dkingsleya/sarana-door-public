
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WAImage from "../../public/whatsapp.svg";
import TokpedImage from "../../public/tokopedia.png";

const kontak = () => {
    return (
        <main className="overflow-hidden">
            <div className="container mt-[15%] mx-auto">
                <div className="grid grid-rows-2 grid-flow-col">
                    <div className='h-fit w-full rounded-[25px] grid items-center justify-center'>
                        <div id="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.462589954716!2d106.68613459999999!3d-6.202544399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f923cfbb8165%3A0xc3ac93dfec23f87d!2sPT%20GLOBAL%20PIPLASINDO!5e0!3m2!1sen!2sid!4v1696316056320!5m2!1sen!2sid" className="xl:w-[500px] xl:h-[500px] w-[350px] h-[350px] rounded-[20px] border-none shadow-xl"></iframe>
                        </div>
                    </div>

                    <div className='mt-5 h-fit w-full rounded-[25px] bg-slate-200 grid items-center justify-center'>
                        <ul>
                            <li>
                                <div className="pt-[15px]">
                                    <Link
                                        href=""
                                    >
                                        <Image src={WAImage} alt="Chat on WhatsApp" />
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="p-2 bg-slate-50
                                my-3 w-full rounded-md">
                                    <Link
                                        href=""
                                    >
                                        <Image src={TokpedImage} alt="Link Tokopedia" className='m-auto' />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default kontak