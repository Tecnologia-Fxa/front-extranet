import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router'
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import Cuenta from '../pages/dashboard/cuenta/Cuenta'
import CredencialService from '../services/CredencialService';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutState, onMenuToggle } = useContext(LayoutContext);
    const toast = useRef(null);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const [infoTopBar, setInfoTopBar] = useState({})

    useEffect(() => {
        const credencialService = new CredencialService()

        credencialService.getDatatopbar().then(res=>{
            setInfoTopBar(res.data)
        }) 

    }, [])

    const menu = useRef(null);

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

    const overlayMenuItems = [

        {

            label: infoTopBar.nombre,

            items:[
                
            {
                label:'Inicio',
                icon: 'pi pi-home',
                command:()=>redireccionar('/')
            },
            {
                label:"Seguridad",
                icon: 'pi pi-sync',
                command:()=>setDialogCuenta(true)
            },
            {
                label:"Perfil",
                icon: 'pi pi-cog',
                command:()=>redireccionar('/dashboard/perfil')
            }
        ]
        },

        {
            separator: true
        },
        {
            label: 'Cerrar Sesion',
            icon: 'pi pi-sign-out',
            command: cerrarSesion
        }
    ];

    const [ dialogCuenta, setDialogCuenta] = useState(false)

    const hideModal = () =>{
        setDialogCuenta(false)
    }

    return (
        <div className="layout-topbar">

            <Toast ref={toast} position="bottom-right"/>
            <Link href="/dashboard">
                <a className="layout-topbar-logo">
                        <Image 
                            src={`/extranet-fxa/demo/images/logo-fxa-version-principal.svg`}
                            width={50} 
                            height={55}
                        />
                        <span className='mx-2'>by</span>
                        <span className='font-semibold'>Fuxia</span>
                </a>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={toggleMenu}>
                <i className="pi pi-user" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <Menu className="mt-1" ref={menu} model={overlayMenuItems} popup />
                <button className="p-link perfil" onClick={toggleMenu}>
                    <i className="pi pi-user px-2"/>
                    <span className="pl-2 pr-3">{infoTopBar.nombre}</span>
                </button>
            </div>

            <Dialog header={<h4 className='text-center'>Cambio de contraseña</h4>} draggable={false} position='center' blockScroll={true} visible={dialogCuenta} style={{ width: '25vw' }} breakpoints={{'1150px': '30vw', '960px': '35vw', '640px': '100vw'}} onHide={hideModal}>
                <Cuenta hideModal={hideModal} toast={toast}/>
            </Dialog>
        </div>
    );
});

export default AppTopbar;
