import React, { useEffect, useRef, useState } from 'react';
import { EmpleadoService } from '../../../services/EmpleadoService';

import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { confirmPopup } from 'primereact/confirmpopup';
import DocumentosFaltantesService from '../../../services/DocumentosFaltantesService';
import DocumentosService from '../../../services/DocumentosService';

const Documentos = (params) => {

    const op = useRef(null);


    const [dataEmpleado, setDataEmpleado] = useState({});

    const [loading, setLoading] = useState(true);
    
    const [documentosData, setDocumentosData] = useState([])
    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

    const documentosService = new DocumentosService()
    useEffect(() => {
        const empleadoService = new EmpleadoService()

        empleadoService.getDatosEmpDocs(params.idUsuario).then(resp=>{
            setDataEmpleado(resp.data)
            setLoading(false)
        })

        documentosService.getByIdEmp(params.idUsuario).then(resp=>{
            setDocumentosData(resp.data)
        })

        
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const ItemService  = require('../../../services/DefaultService');
    const itemService = ItemService.default('tipo-documento')
    const service = new itemService()

    useEffect(()=>{
        service.getAll().then(res=>{
            setDataOption(res.data)
        })
    },[])// eslint-disable-line 
    
    const [documentosFaltantesData, setDocumentosFaltantesData] = useState([])
    const [reloadData, setReloadData] = useState(0)

    useEffect(()=>{
        documentosFaltantesService.getByIdEmp(params.idUsuario).then(res=>{
            setDocumentosFaltantesData(res.data)
        })
    },[reloadData])// eslint-disable-line 

    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [dataOption, setDataOption] = useState([])

    const onItemChange = (e) =>{
        let value = e.value
        setItemSeleccionado(value);
    }
 
    const documentosFaltantesService = new DocumentosFaltantesService()

    const handleSubmitDoc = () =>{
        if(!itemSeleccionado){
            params.toast.current.show({ severity: 'warn', summary: 'Ciudado!', detail: 'No ha seleccionado ningun valor', life: 3000 });            
        }else{
            documentosFaltantesService.create({id_empleado_fk:params.idUsuario,id_tipo_documento_fk:itemSeleccionado.id_tipo_documento}).then(res=>{
                if(res.status===201){
                    params.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 });
                    op.current.hide()
                    setReloadData(reloadData+1)
                }else{
                    params.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 });
                }
            })
        }
    }

    const DeleteDocumentoFaltante = (idDoc) =>{
        documentosFaltantesService.deleteDoc({id_empleado_fk:params.idUsuario,id_tipo_documento_fk:idDoc}).then(res=>{
            params.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 });
            setReloadData(reloadData+1)
        })
    }

    const confirmDeleteDocumento = (event,idDoc) => {
        confirmPopup({
            target: event.currentTarget,
            message: '¿Quitar documento faltante?',
            acceptLabel: 'Seguro!',
            icon: 'pi pi-exclamation-triangle',
            accept: () => DeleteDocumentoFaltante(idDoc),
        });
    }
    
    const API = process.env.NEXT_PUBLIC_RUTA_API + '/img/perfil'

  return (
    <>
        {loading &&
            <div>cargando...</div>
        }
        {!loading &&
        <div className='grid card'>
            <div className="col-12 lg:col-8 md:col-8">
                <h5 className=' text-center'>{dataEmpleado.nombres} {dataEmpleado.apellidos}</h5>
                <div className='w-full flex align-items-center justify-content-center block xl:hidden md:hidden lg:hidden'>
                <img className='w-5' style={{maxWidth:'150px', borderRadius:'5px'}} src={dataEmpleado.src_fotografia?`${API}/${dataEmpleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="" />
                </div>
                <div className="card">
                    <h5>Documentos:</h5>
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <b>Subidos</b>
                        </div>
                    </Divider>

                    {documentosData && <>
                        {
                            documentosData.map((el,id)=>{
                                return <div className='text-600 font-medium mb-2' key={id}>
                                    <span>{el.nombre_documento}</span>
                                    <i className='pi pi-eye text-purple-600 ml-2 cursor-pointer' onClick={()=>window.open(`${APIFILE}/${el.src_documento}`)}/>
                                </div>
                            })
                        }
                        
                    </>}

                    {!documentosData[0] && <div className='text-600 font-medium mb-2'>No cuenta con documentos subidos</div>}

                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <b>Faltantes</b>
                            <Button icon="pi pi-plus" onClick={(e) => op.current.toggle(e)} className="p-button-text p-button-rounded mb-2"></Button>
                        </div>
                    </Divider>
                    {!documentosFaltantesData[0] && <div className='text-600 font-medium mb-2'>El empelado no cuenta con documentos faltantes</div>}
                    {
                        documentosFaltantesData.map((el,id)=>{
                            return <div key={id}>
                                <div className='text-600 font-medium mb-1'>
                                    <i className='pi pi-exclamation-circle mr-2 text-yellow-600'/>
                                    <span>{el.tipo_documento.nombre_tipo_documento}</span>
                                    <Button icon="pi pi-check-circle" onClick={(e)=>confirmDeleteDocumento(e,el.id_tipo_documento_fk)} className="p-button-text p-button-rounded"></Button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="col-12 lg:col-4 md:col-4">
                <div className='card hidden xl:flex md:flex lg:flex align-items-center justify-content-center'>
                    <img className='w-full' style={{maxWidth:'200px', borderRadius:'5px'}} src={dataEmpleado.src_fotografia?`${API}/${dataEmpleado.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="" />
                </div>
               <div className="card">
                    <h5>Datos:<i onClick={()=>params.changeModal(1)} className="pi pi-arrow-right text-lg mx-3 cursor-pointer" /></h5>
                    <p className='text-800 mb-2 font-medium text-sm'>Nombres: <span className='text-700'>{dataEmpleado.nombres}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Apellidos: <span className='text-700'>{dataEmpleado.apellidos}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Documento: <span className='text-700'>{dataEmpleado.tipo_identificacion.nombre_tipo_identificacion} {dataEmpleado.numero_identificacion}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Correo: <span className='text-700'>{dataEmpleado.correo_electronico}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Celular: <span className='text-700'>{dataEmpleado.celular}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Empresa: <span className='text-700'>{dataEmpleado.empresa.nombre_empresa}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Centro Costo: <span className='text-700'>{dataEmpleado.centro_costo.nombre_centro_costo}</span></p>
                    <p className='text-800 mb-2 font-medium text-sm'>Cargo: <span className='text-700'>{dataEmpleado.cargo.nombre_cargo}</span></p>
                </div>
            </div>
        </div>
        }
        <OverlayPanel ref={op} onHide={()=>setItemSeleccionado(null)} showCloseIcon id="overlay_panel" style={{ width: '250px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            <div className='w-full text-center'>
                <h6>Seleccione el tipo de doc a agregar</h6>
            </div>
            <div className="col-12 mt-5">
            <span className="p-float-label">
                    <Dropdown className='w-full' value={itemSeleccionado} options={dataOption} onChange={e=>onItemChange(e)} optionLabel='nombre_tipo_documento' filter filterBy='nombre_tipo_documento'
                    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
                    <label>Tipo Documento Faltante:</label>
                </span>
            </div>
            <Button type='button' onClick={handleSubmitDoc} label='Guardar' className='mt-2 w-full'/>
        </OverlayPanel>
    </>
  )
};


export default Documentos