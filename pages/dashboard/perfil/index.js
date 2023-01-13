import React, { useEffect, useRef, useState } from 'react';
import { EmpleadoService } from '../../../services/EmpleadoService';
import { TabView, TabPanel } from 'primereact/tabview';

import { Button } from 'primereact/button';
import CredencialService from '../../../services/CredencialService';
import Datos from '../../../components/dashboard/perfil/tabMenuPerfil/Datos';
import Empresa from '../../../components/dashboard/perfil/tabMenuPerfil/Empresa';
import Extras from '../../../components/dashboard/perfil/tabMenuPerfil/Extras';
import Riesgo from '../../../components/dashboard/perfil/tabMenuPerfil/Riesgo';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import ChangeFotografia from './ChangeFotografia';
import DocumentosFaltantesService from '../../../services/DocumentosFaltantesService';
import DocumentosService from '../../../services/DocumentosService';
import Link from 'next/link';

const Perfil = () => {

    const [empleado, setEmpleado] = useState({});

    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const API = process.env.NEXT_PUBLIC_RUTA_API + '/img/perfil'

    const [ routeFile, setRouteFile] = useState(null)

    const empleadoService = new EmpleadoService()
    const documentosService = new DocumentosService()

    useEffect(() => {
        const credencialService = new CredencialService()

        credencialService.getDatatopbar().then(res=>{
            empleadoService.getInfoPerfil(res.data.id).then(resp=>{
                setEmpleado(resp.data)
                setLoading(false)
            })
            documentosFaltantesService.getByIdEmp(res.data.id).then(resp=>{
                setDocumentosFaltantesData(resp.data)
            })

            documentosService.getByIdEmp(res.data.id).then(resp=>{
                setDocumentosData(resp.data)
            })
        })
        
        
    }, []);  // eslint-disable-line

    const [ reloadPage, setReloadPage ] = useState(0)

    useEffect(()=>{
        empleadoService.getRouteImgPerfil().then(res=>{
            if(res.data)
                setRouteFile(`${API}/${res.data}`)
            else
                setRouteFile(`${API}/UsuarioDefault.webp`)
        })
    },[reloadPage]) //eslint-disable-line

    const [ showChangeIgame, setshowChangeIgame ] = useState(false)

    const [ changeFotoModal, setChangeFotoModal] = useState(false)

    const showModal = () =>{
        setChangeFotoModal(true)
    }

    const hideModal = () =>{
        setChangeFotoModal(false)
    }

    const documentosFaltantesService = new DocumentosFaltantesService()
    const [documentosFaltantesData, setDocumentosFaltantesData] = useState([])

    const [documentosData, setDocumentosData] = useState([])

    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

  return (
    <>
        {loading &&
            <div>cargando...</div>
        }
        {!loading &&
        <div className='grid card'>
            <div className="col-12 xl:col-9 lg:col-8 md:col-8 text-center">
                <h5>{empleado.nombres} {empleado.apellidos}</h5>
                <div className='relative w-full flex align-items-center justify-content-center block xl:hidden md:hidden lg:hidden'  onMouseEnter={()=>setshowChangeIgame(true)} onMouseLeave={()=>setshowChangeIgame(false)}>
                    <img className='w-full' style={{maxWidth:'120px', borderRadius:'5px'}} src={routeFile} alt="" />
                    <div onClick={showModal} className={showChangeIgame?'flex card w-full justify-content-center top-0 align-items-center right-0 h-full absolute cursor-pointer':'hidden'} style={{background:'rgba(1,1,1,0.2)'}}>
                        <i className="pi pi-undo text-4xl"></i>
                    </div>
                </div>
                <div className="card">
                        <TabView className='hidden xl:block lg:block md:block sm:block'>
                            <TabPanel header='Datos' leftIcon='pi pi-user'>
                                <Datos empleado={empleado}/> 
                            </TabPanel>
                            <TabPanel header='Empresa' leftIcon='pi pi-building'>
                                <Empresa empleado={empleado}/>
                            </TabPanel>
                            <TabPanel header='Complementarios' leftIcon='pi pi-paperclip'>
                               <Extras empleado={empleado}/>
                            </TabPanel>
                            <TabPanel header='Afiliaciones' leftIcon='pi pi-heart-fill'>
                                <Riesgo empleado={empleado}/>
                            </TabPanel>
                        </TabView>
                        <TabView className='block xl:hidden lg:hidden md:hidden sm:hidden'>
                            <TabPanel leftIcon='pi pi-user'>
                                <Datos empleado={empleado}/> 
                            </TabPanel>
                            <TabPanel leftIcon='pi pi-building'>
                                <Empresa empleado={empleado}/>
                            </TabPanel>
                            <TabPanel leftIcon='pi pi-paperclip'>
                                <Extras empleado={empleado}/>
                            </TabPanel>
                            <TabPanel leftIcon='pi pi-heart-fill'>
                                <Riesgo empleado={empleado}/>
                            </TabPanel>
                        </TabView>
                </div>
            </div>
            <div className="col-12 xl:col-3 lg:col-4 md:col-4">
                <div className='card hidden xl:flex md:flex lg:flex relative justify-content-center align-items-center' onMouseEnter={()=>setshowChangeIgame(true)} onMouseLeave={()=>setshowChangeIgame(false)}>
                    <img className='w-full' style={{maxWidth:'180px', maxHeight:'180px', borderRadius:'5px'}} src={routeFile} alt="" />
                    <div onClick={showModal} className={showChangeIgame?'flex card w-full justify-content-center top-0 align-items-center right-0 h-full absolute cursor-pointer':'hidden'} style={{background:'rgba(1,1,1,0.2)'}}>
                        <i className="pi pi-undo text-4xl"></i>
                    </div>
                </div>
               <div className="card">
                    <div className="mb-6">
                        <h5>Documentos:<Link href={'/dashboard/documentos-usuario'}><i className="pi pi-arrow-right text-lg mx-3 cursor-pointer" /></Link></h5>
                        {documentosData && <>
                            {
                                documentosData.map((el,id)=>{
                                    return <div className='text-600 font-medium mb-2' key={id}>
                                        <Button label={el.nombre_documento+'.pdf'} onClick={()=>window.open(`${APIFILE}/${el.src_documento}`)} className="p-button-link text-sm"></Button>
                                    </div>
                                })
                            }
                        
                        </>}

                        {!documentosData[0] && <div className='text-600 font-medium mb-2'>No cuenta con documentos subidos</div>}
                    </div>
                    <h6>Documentos Faltantes:</h6>
                    {!documentosFaltantesData[0] && <div className='text-600 font-medium text-sm mb-2'>No cuenta con documentos faltantes</div>}
                    {
                        documentosFaltantesData.map((el,id)=>{
                            return <div key={id}>
                                <div className='text-600 font-medium text-sm mb-1 text-yellow-600'>
                                    <i className='pi pi-exclamation-circle mr-2'/>
                                    <span>{el.tipo_documento.nombre_tipo_documento}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        }
        <Dialog header='Cambiar Fotografía' draggable={false} position='center' blockScroll={true} visible={changeFotoModal} style={{ width: '35vw' }} breakpoints={{'1150px': '45vw', '960px': '65vw', '640px': '100vw'}} onHide={hideModal}>
            <ChangeFotografia toast={toast} img={routeFile} setReloadPage={setReloadPage} reloadPage={reloadPage} hideModal={hideModal}/>
        </Dialog>
        <Toast ref={toast} position='bottom-right'></Toast>
    </>
  )
};

export default Perfil