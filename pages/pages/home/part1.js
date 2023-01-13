import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Part1 = () => {


  return (
    <div id='Part1' className="h-screen w-full relative cursor-pointer">
        <Link href={'/login'}>
          <div>
            <Image 
              src={'/extranet-fxa/demo/home/Desktop.png'}
              alt="" 
              layout='fill'
              className='hidden md:block'
            />
            <Image 
              src={'/extranet-fxa/demo/home/Mobile.png'} 
              alt="" 
              layout='fill'
              className='block md:hidden'
            />
          </div>
        </Link>


    </div>
  )
}

export default Part1