import React, { useEffect, useState, useRef } from 'react';
import { EmpleadoService } from '../../../services/EmpleadoService';
import { TabView, TabPanel } from 'primereact/tabview';


import { Button } from 'primereact/button';
import Datos from '../../../components/dashboard/empleados/tabMenu/Datos';
import Empresa from '../../../components/dashboard/empleados/tabMenu/Empresa';
import Extras from '../../../components/dashboard/empleados/tabMenu/Extras';
import Riesgo from '../../../components/dashboard/empleados/tabMenu/Riesgo';
import classNames from 'classnames';
import DocumentosFaltantesService from '../../../services/DocumentosFaltantesService';
import DocumentosService from '../../../services/DocumentosService';

const Usuario = (params) => {

    const [empleado, setEmpleado] = useState({});

    const [loading, setLoading] = useState(true);
    


    const documentosService = new DocumentosService()

    useEffect(() => {
        const empleadoService = new EmpleadoService()
        empleadoService.getEmpleado(params.idUsuario).then(res=>{
            setEmpleado(res.data)
            params.formik.setValues({...res.data,datos:'',extras:'', riesgos:''})
            params.setEmpleadoDialog(res.data)
            setLoading(false)
        })

        documentosService.getByIdEmp(params.idUsuario).then(resp=>{
            setDocumentosData(resp.data)
        })

    }, []);  // eslint-disable-line

    useEffect(()=>{
        params.setEmpleadoDialog(empleado)
    },[params.empleadoDialog]) // eslint-disable-line

    const documentosFaltantesService = new DocumentosFaltantesService()
    const [documentosFaltantesData, setDocumentosFaltantesData] = useState([])

    useEffect(()=>{
        documentosFaltantesService.getByIdEmp(params.idUsuario).then(res=>{
            setDocumentosFaltantesData(res.data)
        })
    },[])// eslint-disable-line 


    const isFormFieldValid = (name) => !!(params.formik.touched[name] && params.formik.errors[name]);

    const headerTab = (label, errorItem, icon) =>{
        return (
            <span className={classNames({ 'p-error font-bold': isFormFieldValid(errorItem) })}><i className={isFormFieldValid(errorItem)?"pi pi-exclamation-circle":icon}/>{label}</span>
        )
    }

    const API = process.env.NEXT_PUBLIC_RUTA_API + '/img/perfil'
    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

    const [documentosData, setDocumentosData] = useState([])


    const linkRef = useRef() 
    
    async function downloadImage(e) {
      e.preventDefault()   
      const src = linkRef.current.href  
      const imageBlob = await (await fetch(src)).blob()       
      linkRef.current.href = URL.createObjectURL(imageBlob)        
      linkRef.current.download = `fotografia_${empleado.nombres}_${empleado.apellidos}`
      linkRef.current.click()
    }

  return (
    <>
        {loading &&
            <div>cargando...</div>
        }
        {!loading &&
        <div className='grid'>
            <div className="col-12 xl:col-8 lg:col-8 md:col-8 text-center">
                <h5>{empleado.nombres} {empleado.apellidos}</h5>
                <div className='w-full flex align-items-center justify-content-center block xl:hidden md:hidden lg:hidden'>
                    <a className='cursor-pointer w-full'  ref= {linkRef} href={empleado.src_fotografia?`${API}/${empleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} download="download" >
                        <img onClick={downloadImage} className='w-5' style={{maxWidth:'150px', borderRadius:'5px'}} src={empleado.src_fotografia?`${API}/${empleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="" />
                    </a>
                </div>
                <div className="card">
                    <form onSubmit={params.formik.handleSubmit}>
                        <TabView className='hidden xl:block lg:block md:block sm:block'>
                            <TabPanel header={headerTab('Datos','datos','pi pi-user')}>
                                <Datos empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Empresa','empresa','pi pi-building')}>
                                <Empresa empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Complementarios','extras','pi pi-paperclip')}>
                                <Extras empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Afiliaciones','riesgos','pi pi-heart-fill')}>
                                <Riesgo empleado={params.formik}/>
                            </TabPanel>
                        </TabView>
                        <TabView className='block xl:hidden lg:hidden md:hidden sm:hidden'>
                            <TabPanel header={headerTab('','datos','pi pi-user')}>
                                <Datos empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','empresa','pi pi-building')}>
                                <Empresa empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','extras','pi pi-paperclip')}>
                                <Extras empleado={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','riesgos','pi pi-heart-fill')}>
                                <Riesgo empleado={params.formik}/>
                            </TabPanel>
                        </TabView>
                    </form>
                </div>
            </div>
            <div className="col-12 xl:col-4 lg:col-4 md:col-4">
                <div className='card hidden xl:flex md:flex lg:flex align-items-center justify-content-center'>
                    <a className='cursor-pointer w-full relative'  ref= {linkRef} href={empleado.src_fotografia?`${API}/${empleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} download="download" >
                        <img onClick={downloadImage} className='w-full' style={{maxWidth:'200px', borderRadius:'5px'}} src={empleado.src_fotografia?`${API}/${empleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="" />
                    </a>
                </div>
                <div className="card">
                    <div className="mb-6">
                        <h5>Documentos:<i onClick={()=>params.changeModal(0)}className="pi pi-arrow-right text-lg mx-3 cursor-pointer" /></h5>
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
                    {!documentosFaltantesData[0] && <div className='text-600 font-medium text-sm mb-2'>El empelado no cuenta con documentos faltantes</div>}
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
    </>
  )
};

export default Usuario