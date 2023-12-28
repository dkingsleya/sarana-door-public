'use client'

import React from 'react'
import NextNProgress from 'nextjs-progressbar';

const profil = () => {
    return (
        <main className="overflow-hidden">
            <NextNProgress />
            <div className="container mt-[15%] mx-auto pb-6">
                <div className="grid grid-rows-3 grid-flow-col gap-2 justify-center">
                    <div className='h-full w-full rounded-[25px] shadow-xl'>
                        <div className='container p-10'>
                            <h2 className='text-center font-bold pb-4'>OUR BUSINESS
                            </h2>
                            <div className='border'>
                                <article className='text-left p-4'>
                                    xxx
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-full rounded-[25px] shadow-xl'>
                        <div className='container p-10'>
                            <h2 className='text-center font-bold pb-4'>OUR VISION
                            </h2>
                            <div className='border'>
                                <article className='text-left p-4'>
                                    xxx
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-full rounded-[25px] shadow-xl'>
                        <div className='container p-10'>
                            <h2 className='text-center font-bold pb-4'>OUR MISION
                            </h2>
                            <div className='border'>
                                <article className='text-left p-4'>
                                    xxx
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default profil