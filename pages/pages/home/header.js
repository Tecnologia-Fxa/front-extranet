import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState} from 'react'
import Link from 'next/link';

import headerStyles from './header.module.css'
import { classNames } from 'primereact/utils';
import { Menu } from 'primereact/menu';
import CredencialService from '../../../services/CredencialService';
import Router from 'next/router';
import { Dialog } from 'primereact/dialog';
import Cuenta from '../../dashboard/cuenta/Cuenta';

const Header = () => {

  const menu = useRef(null);

  const [overlayMenuItems, setOverlayMenuItems] = useState([])
  const [infoTopBar, setInfoTopBar] = useState({})
  const [ dialogCuenta, setDialogCuenta] = useState(false)

  useEffect(() => {
    if(token){
      const credencialService = new CredencialService()

      credencialService.getDatatopbar().then(res=>{
          setInfoTopBar(res.data)
          setOverlayMenuItems([
              {

                label: res.data.nombre,
        
                items:[
                  {
                    label:"Seguridad",
                    icon: 'pi pi-sync',
                    command:()=>setDialogCuenta(true)
                },
                {
                    label:(res.data.Rol==='Soporte' || res.data.Rol==='Admin')?"Dashboard":"Perfil",
                    icon: (res.data.Rol==='Soporte' || res.data.Rol==='Admin')?'pi pi-briefcase':'pi pi-cog',
                    command:()=>redireccionar((res.data.Rol==='Soporte' || res.data.Rol==='Admin')?'/dashboard':'/dashboard/perfil')
                }
            ]
            },
        
            {
                separator: true
            },
            {
                label: 'Salir',
                icon: 'pi pi-sign-out',
                command: cerrarSesion
            }
          ])

        }) 
      }
  }, []) //eslint-disable-line


  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const toast = useRef(null);

  const toggleMenu = (event) => {
    menu.current.toggle(event);
  };

  const cerrarSesion = () =>{
    localStorage.removeItem('token')
    Router.push("/login")
  }
  const redireccionar = (ruta) =>{
    Router.push(ruta)
  }
  const hideModal = () =>{
    setDialogCuenta(false)
  }

  return (
    
    <div className="layout-topbar">
      
      <Toast ref={toast} position="bottom-right"/>

      <div style={{background:'#E31D93'}} className='w-full absolute top-0 left-0 h-2rem align-items-center justify-content-center flex'>
          <span className='font-medium' style={{color:'#fff'}}>Recursos Humanos (SIGE)</span>
      </div>

      <div className="align-items-end justify-content-end sm:w-full grid" style={{maxWidth:'35vw'}}>
        <Link href={"/#Part1"}>
          <i className='pi pi-home text-xl mx-1 hidden sm:block mx-3 cursor-pointer' style={{marginTop:'2.4rem'}}/>
        </Link>
        <Link href={"/#Part2"}>
          <i className='pi pi-book text-xl mx-1 hidden sm:block mx-3 cursor-pointer' style={{marginTop:'2.4rem'}}/>
        </Link>
        <Link href={"/#Part3"}>
          <i className='pi pi-heart text-xl mx-1 hidden sm:block mx-3 cursor-pointer' style={{marginTop:'2.4rem'}}/>
        </Link>
        <Link href={"/#Footer"}>
          <i className='pi pi-info-circle text-xl mx-1 hidden sm:block mx-3 cursor-pointer' style={{marginTop:'2.4rem'}}/>
        </Link>
      </div>

      <div className={headerStyles["conten-menu-mountain"]}>
        <div className={headerStyles["menu-mountain"]}/>
        <div className={headerStyles["menu-mountain2"]}/>
        <div className={headerStyles["menu-mountain3"]}>
            <img src={'/demo/images/logo-fxa-version-principal.svg'} alt="logo" className={headerStyles['logo-menu-mountain']}/>
        </div>
        <div className={headerStyles["menu-mountain4"]}/>
      </div>


      {!token && <>
        <Link href={"/login"}>
          <Button label="Iniciar Sesión" className="layout-topbar-menu text-pink-500 p-button-text absolute py-3 px-4 font-medium" style={{right:'3rem', top:'1.5rem'}} />
        </Link>
        <Link href={"/login"}>
          <Button tooltip='Iniciar Sesión' tooltipOptions={{position:'left'}} className="pi pi-sign-in text-pink-500 text-xl block lg:hidden p-button-text absolute py-3 font-medium" style={{right:'0', top:'1.5rem'}} />
        </Link>
      </>}

      {token && <>
      
        <Button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={toggleMenu}>
            <i className="pi pi-user" />
        </Button>

        <div className={classNames("layout-topbar-menu align-items-end justify-content-end grid")}>

                <Menu className="mt-1" ref={menu} model={overlayMenuItems} popup />

                <button className="p-link mx-1 sm:mx-3 cursor-pointer font-bold perfil" style={{marginTop:'2rem'}} onClick={toggleMenu}>
                    <i className="pi pi-user px-2"/>
                    <span className="pl-2 pr-3">{infoTopBar.nombre}</span>
                </button>

        </div>
      </>}
      <Dialog header={<h4 className='text-center'>Cambio de contraseña</h4>} draggable={false} position='center' blockScroll={true} visible={dialogCuenta} style={{ width: '25vw' }} breakpoints={{'1150px': '30vw', '960px': '35vw', '640px': '100vw'}} onHide={hideModal}>
        <Cuenta hideModal={hideModal} toast={toast}/>
      </Dialog>

      </div>
  )
}

export default Header