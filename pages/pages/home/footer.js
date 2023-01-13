import React, { useState } from 'react'
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';

const Footer = () => {

  const [ modalTrabajaConNosotros, setModalTrabajaConNosotros] = useState(true)

  const hideModal = () =>{
    setModalTrabajaConNosotros(false)
  }
  
  const showModal = () =>{
    setModalTrabajaConNosotros(true)
  }

  return (
    <div id='Footer' className='card surface-card' style={{borderRadius:'0'}}>
      <footer className="grid">
          <div className="col-12 xl:col-4 grid">
            <div className='mb-2 ml-2 col-12 xl:col-12 md:col-6'><span className="mr-2"><i className='pi pi-map-marker'/> Calle 79B #29-33 Santa Sofia, Bogotá, Colombia</span></div>
            <div className='mb-2 ml-2 col-12 xl:col-12 md:col-5'><span className="mr-2"><i className='pi pi-phone'/> 2100049</span></div>
            <div className='mb-2 ml-2 col-12 xl:col-12 md:col-6'><i className='pi pi-envelope'/><span className="ml-2 font-medium inline-block"> Aux RRHH</span> Auxtalentohumano@fuxiaaccesorios.com</div>
            <div className='mb-2 ml-2 col-12 xl:col-12 md:col-5'><i className='pi pi-envelope'/><span className="ml-2 font-medium inline-block"> Coordinadora RRHH</span> Kmorales@fuxiaaccesorios.com</div>
          </div>

          <Divider className='col-1 xl:flex hidden' layout='vertical'/>
          <Divider className='xl:hidden block ' layout='horizontal'/>
          <div className="col-12 xl:col-3 md:col-6">
            <div className="grid text-center align-items-center justify-content-center h-full">
              <span className='col-4'><i className='pi pi-facebook text-3xl block mb-2 cursor-pointer' onClick={()=>window.open('https://www.facebook.com/FUXIA-accesorios-1330319523802596')}/>Facebook</span>  
              <span className='col-4'><i className='pi pi-instagram text-3xl block mb-2 cursor-pointer' onClick={()=>window.open('https://www.instagram.com/fxashop')}/>Instagram</span>  
              <span className='col-4'><i className='pi pi-shopping-bag text-3xl block mb-2 cursor-pointer' onClick={()=>window.open('https://www.fxa.com.co/')}/>Tienda</span>  
            </div>
          </div>
          <Divider className='col-1 xl:flex hidden' layout='vertical'/>
          <Divider className='md:hidden block ' layout='horizontal'/>
          <div className="col-12 xl:col-2 md:col-5">
            <div className="grid text-center align-items-center justify-content-center h-full">
              <span className='col-12 font-medium'><i className='pi pi-info-circle text-3xl block mb-2 cursor-pointer' onClick={showModal}/>Trabaja Con Nosotros</span>  
            </div>
          </div>
      </footer>

      <Dialog header='Trabaja Con Nosotros' className='text-lg' draggable={false} position='bottom-right' blockScroll={true} visible={modalTrabajaConNosotros} style={{ width: '35vw', rigth:'0' }} breakpoints={{'1150px': '45vw', '960px': '65vw', '640px': '100vw'}} onHide={hideModal}>
        <div>¿Quieres hacer parte del equipo FXA?<span role="img" aria-label='emoji'>👌</span></div> 
        <div className='my-2'>Envía un correo a: <span className='mx-1 font-medium'>hojasdevida@fuxiaaccesorios.com</span> </div>
        <div>Especificando el cargo al que quieras aplicar y la ciudad donde desees aplicar.<span role="img" aria-label='emoji'>😊</span></div>
      </Dialog>

    </div>
  )
}

export default Footer