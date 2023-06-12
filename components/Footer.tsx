import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='flex flex-col items-center justify-between md:flex-row mt-16 border-t group group-hover:shadow-lg gap-2'>
            <div className='flex flex-col  md:flex-row md:justify-between p-12 w-full  md:items-start gap-4'>
                <div>
                    <Link href={'/'} className='h-16 w-32' >
                        <Image src={'/icons/logo.svg'} alt='logo' width={200} height={40} className='h-full object-contain' />
                    </Link>
                    <p className='mt-4'>Carhub 2023 <br /> All Rights Reserved &copy;</p>
                </div>
                <div className='flex  items-center justify-center flex-wrap md:justify-evenly w-full flex-1 gap-3'>
                        {footerLinks.map(({ title, links }, i) => (<div key={i} className='space-y-2 flex flex-col items-center md:items-start gap-4'>
                            <p className='font-bold text-lg'>{title}</p>
                            
                            {
                                links.map(({ title, url }, i) => <Link key={i} href={url} className='text-gray-400'>{title}</Link>)
                            }
                        </div>)) }
                </div>
            </div>
            </div>


            <div className='border-t p-4 md:p-12 flex items-center md:justify-between flex-col md:flex-row gap-2'>
                <p className='text-sm text-gray-400'>&copy;2023 CarHub. All reserved</p>
                <div className='flex items-center gap-2'>
                    <Link href={'/'} className='text-gray-400 text-sm'>Privacy & Policy</Link>
                    <Link href={'/'} className='text-gray-400 text-sm'>Terms & Condition</Link>
                </div>

            </div>
        </footer>
    )
}

export default Footer