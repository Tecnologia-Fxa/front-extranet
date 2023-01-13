import React from 'react'

import part2css from './part2.module.css'

const Part2 = () => {    

  return (
        <div id='Part2' className="card relative" style={{borderRadius:'0', minHeight:'100vh'}}>
            <div className="grid sm:px-6 py-4 md:px-8 lg:px-10 mb-0 ">
                <div className="col-12 lg:col-4 mt-8">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card text-center" style={{ borderRadius: '10px' }}>
                            <i className='pi pi-check-circle text-600 font-medium text-3xl mb-2 text-purple-300'/>
                            <div className="text-900 font-medium text-3xl mb-2">Nosotros</div>
                            <div className="text-700 text-lg mb-2">Somos una marca Colombiana con 14 años de experiencia en moda de Bolsos y Accesorios para mujeres y niñas con más de 60 tiendas a nivel nacional.</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-4 mt-8">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card text-center" style={{ borderRadius: '10px' }}>
                            <i className='pi pi-check-circle text-600 font-medium text-3xl mb-2 text-purple-300'/>
                            <div className="text-900 font-medium text-3xl mb-2">Misión</div>
                            <div className="text-700 text-lg mb-2">Nuestra Misión es cautivar las emociones de nuestros Fans, con una puesta en escena colorida y con una variedad sin límites en productos que están a la vanguardia de las últimas tendencias.</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-4 mt-8">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column surface-card text-center" style={{ borderRadius: '10px' }}>
                            <i className='pi pi-check-circle text-600 font-medium text-3xl mb-2 text-purple-300'/>
                            <div className="text-900 font-medium text-3xl mb-2">Visión</div>
                            <div className="text-700 text-lg mb-2">Posicionar a FXA en Colombia, Latinoamérica, y todo el estado de Florida como la marca favorita de accesorios para mujeres y niñas.</div>
                        </div>
                    </div>
                </div>

                <div className={part2css['ocean'] +" hidden lg:block"}>
                    <div className={part2css['wave']}></div>
                    <div className={part2css['wave']}></div>
                </div>
            
            </div>
            
        </div>
    
  )
}

export default Part2