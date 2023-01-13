import React, { useEffect, useState,  useRef } from 'react';
import { EmpleadoService } from '../../../services/EmpleadoService';

import CredencialService from '../../../services/CredencialService';
import { Divider } from 'primereact/divider';
import DocumentosFaltantesService from '../../../services/DocumentosFaltantesService';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { OverlayPanel } from 'primereact/overlaypanel';
import UploadFilesService from '../../../services/UploadFilesService';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import DocumentosService from '../../../services/DocumentosService';
import { confirmPopup } from 'primereact/confirmpopup';
import { InputText } from 'primereact/inputtext';

import ItemService  from '../../../services/DefaultService'


import documentosUsuario from './documentosUsuario.module.css'
import Link from 'next/link';

const DocumentosUsuario = (params) => {

    const toast = useRef(null);

    const API = process.env.NEXT_PUBLIC_RUTA_API + '/img/perfil'
    const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

    const op = useRef(null);

    const [dataEmpleado, setDataEmpleado] = useState({});

    const [loading, setLoading] = useState(true);

    const documentosFaltantesService = new DocumentosFaltantesService()

    const [documentosFaltantesData, setDocumentosFaltantesData] = useState([])

    const [documentosData, setDocumentosData] = useState([])

    const [ routeFile, setRouteFile] = useState([])

    const [ reloadPage, setReloadPage] = useState(0)

    
    const documentosService = new DocumentosService()
    useEffect(() => {
        const credencialService = new CredencialService()
        const empleadoService = new EmpleadoService()

        credencialService.getDatatopbar().then(res=>{
            empleadoService.getDatosEmpDocs(res.data.id).then(resp=>{
                setDataEmpleado(resp.data)
                setLoading(false)
            })
            documentosFaltantesService.getByIdEmp(res.data.id).then(resp=>{
                setDocumentosFaltantesData(resp.data)
            })
            documentosService.getByIdEmp(res.data.id).then(resp=>{
                setDocumentosData(resp.data)
            })

        })
        empleadoService.getRouteImgPerfil().then(res=>{
            if(res.data)
                setRouteFile(`${API}/${res.data}`)
            else
                setRouteFile(`${API}/UsuarioDefault.webp`)
        })
        
    }, [reloadPage]);  // eslint-disable-line

    const [dataOption, setDataOption] = useState([])
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const dropData = () =>{
        setItemSeleccionado(null)
        setData({nombreDoc: ''})
    }

    const itemService = ItemService('tipo-documento')
    const service = new itemService()

    useEffect(()=>{
        service.getAll().then(res=>{
            setDataOption(res.data)
        })
    },[])// eslint-disable-line 

    const onItemChange = (e) =>{
        let value = e.value
        setItemSeleccionado(value);
    }

    const hideModal = () =>{
        op.current.hide()
    }

    const uploadFilesService = new UploadFilesService()

    const uploadImage = ({files}) =>{
        const formData = new FormData();
        formData.append('file', files[0])
        formData.append('nombre_documento', data.nombreDoc)
        formData.append('tipo_documento_fk', itemSeleccionado.id_tipo_documento)
    
        uploadFilesService.uploadFile(formData).then(res=>{
          toast.current.show({severity: 'success', summary: 'Todo Bien', detail: res.data});
          setReloadPage(reloadPage+1)
          hideModal()
        })
      }

    const handlerDeleteDoc = (el) =>{
        documentosService.delete({src_documento:el.src_documento,id_documento:el.id_documento}).then(res=>{
            toast.current.show({severity: 'success', summary: 'Todo Bien', detail: res.data});
            setReloadPage(reloadPage+1)
        })
    }

    const [ data, setData] = useState({
        nombreDoc: ''
    })
    const [ error, setError] = useState({
        errorDoc:'El nombre es obligatorio'
    })

    const handleChangeNombreDocumento = (e) =>{
        let i = e.target.value
        let err = {}

        if(!i)
            err.errorDoc = 'El nombre es obligatorio'
        else if(i.length<4)
            err.errorDoc = 'El nombre tiene que tener mas de 4 caracteres'
        else if(i.length>25)
            err.errorDoc = 'El nombre tiene que ser menor de 25 caracteres'
        else if (!/^[A-Za-z0-9_]+$/g.test(i))
            err.errorDoc = 'El nombre solo acepta letras, numeros y raya al piso'
        else 
            err.errorDoc = ''

        setError(err)

        setData({
            ...data,
            [e.target.name]:i
        })
    }

    const confirm1 = (e, el) => {
        confirmPopup({
            target: e.currentTarget,
            message: '¿Está seguro de eliminar el documento del sistema?',
            acceptLabel: 'Acepto!',
            icon: 'pi pi-exclamation-triangle',
            accept: ()=>handlerDeleteDoc(el)
        });
    };

  return (
    <>
        {loading &&
            <div>cargando...</div>
        }
        {!loading &&
        <div className='grid card'>
            <div className="col-12 xl:col-9 lg:col-8 md:col-8">
                <h5 className='text-center'>{dataEmpleado.nombres} {dataEmpleado.apellidos}</h5>
                <div className='w-full flex align-items-center justify-content-center block xl:hidden md:hidden lg:hidden'>
                    <img className='w-5' style={{maxWidth:'150px', borderRadius:'5px'}} src={routeFile} alt="" />
                </div>
                <div className="card">
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <b>Subidos</b>
                            <Button icon="pi pi-plus" onClick={(e) => op.current.toggle(e)} className="p-button-text p-button-rounded mb-2"></Button>
                        </div>
                    </Divider>

                    {documentosData && <>
                        {
                            documentosData.map((el,id)=>{
                                return <div className='text-600 font-medium mb-2' key={id}>
                                    <span>{el.nombre_documento}</span>
                                    <i className='pi pi-eye text-purple-600 ml-2 cursor-pointer' onClick={()=>window.open(`${APIFILE}/${el.src_documento}`)}/>
                                    <i className='pi pi-trash text-purple-600 ml-2 cursor-pointer' onClick={(e)=>confirm1(e,el)}/>
                                </div>
                            })
                        }
                        
                    </>}
                    {!documentosData[0] && <div className='text-600 font-medium mb-2'>No cuenta con documentos subidos</div>}

                    
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <b>Faltantes</b>
                        </div>
                    </Divider>
                    {!documentosFaltantesData[0] && <div className='text-600 font-medium mb-2'>No cuenta con documentos faltantes</div>}
                    {
                        documentosFaltantesData.map((el,id)=>{
                            return <div key={id}>
                                <div className='text-600 font-medium mb-2'>
                                    <i className='pi pi-exclamation-circle mr-2 text-yellow-600'/>
                                    <span>{el.tipo_documento.nombre_tipo_documento}</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="col-12 xl:col-3 lg:col-4 md:col-4">
            <div className='card hidden xl:flex md:flex lg:flex relative justify-content-center align-items-center'>
                    <img className='w-full' style={{maxWidth:'180px', maxHeight:'180px', borderRadius:'5px'}} src={routeFile} alt="" />
                </div>
               <div className="card">
                    <h5>Datos:<Link href={"/dashboard/perfil"}><i className="pi pi-arrow-right text-lg mx-3 cursor-pointer" /></Link></h5>
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
        <OverlayPanel ref={op} onHide={()=>dropData()} showCloseIcon id="overlay_panel" style={{ width: '250px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            
            <div className='w-full text-center'>
                <h5>Agregar Documento</h5>
            </div>
            
            <div className="col-12 mt-5">
                <span className="p-float-label">
                    <Dropdown className='w-full' value={itemSeleccionado} options={dataOption} onChange={e=>onItemChange(e)} optionLabel='nombre_tipo_documento' filter filterBy='nombre_tipo_documento'
                    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
                    <label>Tipo Documento:</label>
                </span>
            </div>
            {itemSeleccionado && <>
                <div className="col-12 mt-3">
                    <span className="p-float-label">
                        <InputText
                        name="nombreDoc"
                        className='w-full'
                        value={data.nombreDoc} 
                        onChange={handleChangeNombreDocumento}
                        />
                        <label>Nombre Documento:</label>
                    </span>
                </div>
                <div className='w-full text-center p-error'>{error.errorDoc}</div>
            </>}

            {!error.errorDoc && <>
            <div className={documentosUsuario["upload-file-emp"]+" col-12 justify-content-center flex"}>
                
                    <FileUpload name="demo" url="./upload" mode="basic" accept='application/pdf'
                    chooseLabel='Elija el archivo a subir' customUpload uploadHandler={uploadImage} maxFileSize={2000000}
                    invalidFileSizeMessageSummary='Archivo no valido' invalidFileSizeMessageDetail='Maximo de tamaño soportado es {0}'/>
            
            </div>
            </>}
        </OverlayPanel>
        <Toast ref={toast} position='bottom-right'></Toast>
    </>
  )
};

export default DocumentosUsuario