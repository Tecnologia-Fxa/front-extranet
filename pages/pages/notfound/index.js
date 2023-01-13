import getConfig from 'next/config';
import React from 'react';
import AppConfig from '../../../layout/AppConfig';
import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <Image
                    src={'/demo/images/logo-fxa-version-principal.svg'}
                    width={100}
                    height={100}
                />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(227, 29, 147, 0.4) 10%, rgba(227, 29, 147, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        <span className="text-pink-500 font-bold text-3xl">404</span>
                        <h1 className="text-900 font-bold text-5xl mb-2">Pagina No Encontrada</h1>
                        <div className="text-600 mb-5">La solicitud a este sitio no es valida</div>
                        <Link href="/">
                            <a className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-cyan-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="text-50 pi pi-fw pi-table text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Preguntas Frecuentes</span>
                                </span>
                            </a>
                        </Link>
                        <Link href="/login">
                            <a className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-orange-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="pi pi-fw pi-home text-50 text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Iniciar Sesion</span>
                                </span>
                            </a>
                        </Link>
                        <Link href="/">
                            <a className="w-full flex align-items-center mb-5 py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-indigo-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="pi pi-fw pi-arrow-circle-left text-50 text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Volver Al Inicio</span>
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
    );
};

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig />
        </React.Fragment>
    );
};

export default NotFoundPage;
