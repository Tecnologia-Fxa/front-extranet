import React from 'react'
import Image from 'next/image';

const Part3 = () => {
  return (
    <div className='relative w-full hscreen'>
      <div id='Part3' className="grid grid-nogutter surface-section text-800 mt-0">
          <div className="relative h-screen col-6">
            <Image 
              src={'/extranet-fxa/demo/images/blocks/hero/hero-1.png'}
              alt="" 
              style={{ clipPath: 'circle(97% at 0 33%)'}}
              layout='fill'
            />
          </div>
          <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
              <section>
                  <span className="block text-6xl font-bold mb-1">FXA by Fuxia</span>
                  <div className="text-6xl text-primary font-bold mb-3">Desde hace 15 años</div>
                  <p className="mt-0 mb-4 text-700 line-height-3 text-2xl">"Gracias por hacer parte de esta gran familia!"</p>
              </section>
          </div>
          
      </div>
      
    </div>
  )
}

export default Part3