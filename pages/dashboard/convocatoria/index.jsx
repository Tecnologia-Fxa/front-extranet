import { Button } from 'primereact/button'
import React, { useState } from 'react'
import VacantesDisponibles from '../../../components/dashboard/ConvocatoriaFxa/VacantesDisponibles'
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import InscripcionConvocatoriaService from '../../../services/InscripcionConvocatoriaService';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import VacantesInscritas from '../../../components/dashboard/ConvocatoriaFxa/VacantesInscritas';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

const Convocatoria = () => {

  const toast = useRef(null);


  //Constante que trae la ruta donde esta el api, en este caso para listar documentos
  const APIFILE = process.env.NEXT_PUBLIC_RUTA_API + '/file/emp'

  const [visualizarVacantes, setVisualizarVacantes] = useState(true)
  const [visualizarVacantesInscritas, setVisualizarVacantesInscritas] = useState(false)

  //Ganchos para almacenar la informacion para inscribirse a una convocatoria
  const [visibilidadModalInscribirse, setVisibilidadModalInscribirse] = useState(false)
  const [dataConvocatoriaInscripcion, setDataConvocatoriaInscripcion] = useState([])

  //Ganchos para almacenar la informacion para ver detalles de una convocatoria inscrita
  const [visibilidadModalConvocatoriaInscrita, setVisibilidadModalConvocatoriaInscrita] = useState(false)
  const [dataConvocatoriaInscrita, setDataConvocatoriaInscrita] = useState([])

  //Gancho para recargar la información en vivo
  const [reloadData, setReloadData] = useState(false)

  //Funcion para cambiar el estado de la vista de vacantes, adicional cambia el estado de vacantes inscritas para que se oculte si este se esta mostrando
  const changeStateViewVacantes = () =>{
    setVisualizarVacantes(!visualizarVacantes)
    if (!visualizarVacantes && visualizarVacantesInscritas) {
      setVisualizarVacantesInscritas(!visualizarVacantesInscritas)
    }
  }

  //Misma funcion anterior funcionamiento contrario para mostrar vista de vacantes inscritas
  const changeStateViewVacantesInscritas = () =>{
    setVisualizarVacantesInscritas(!visualizarVacantesInscritas)
    if (!visualizarVacantesInscritas && visualizarVacantes) {
      setVisualizarVacantes(!visualizarVacantes)
    }
  }


  //Pie del modal para inscribirse a una convocatoria
  const FooterAplicarVacante = () =>{
    return (<>
      <Button label='Descartar' className='p-button-danger p-button-text' onClick={closeDialog}/>
      <Button label='Si, deseo aplicar a la vacante' className='p-button-text' onClick={ConfirmarInscripcion}/>

    </>)
  }

  //Pie del modal de los detalles de convocatoria inscrita
  const FooterConvocatoriaInscrita = () =>{
    return (<>
      <Button label='Cerrar' className='p-button-secondary p-button-text' onClick={closeDialog}/>
      <Button label='Deseo cancelar la inscripción' className='p-button-text p-button-danger' onClick={confirmCancelarInscripcion}/>

    </>)
  }

  //Funcion para cancelar la inscripcion
  const CancelarInscripcion = (id_empleado, id_convocatoria) =>{
    InscripcionConvocatoriaService.cancelarInscripcion(id_empleado?id_empleado:dataConvocatoriaInscrita.id_empleado_fk,id_convocatoria?id_convocatoria:dataConvocatoriaInscrita.id_convocatoria_fk).then(response=>{
      console.log(response)
      setVisibilidadModalConvocatoriaInscrita(false)
      setReloadData(!reloadData)
      toast.current.show({severity: 'warn', summary: 'Todo Bien', detail: response.data.message});
    })
  }
  
  //Funcion de confirmación
  const confirmCancelarInscripcion = (event, id_empleado, id_convocatoria) => {
    confirmPopup({
        target: event.currentTarget,
        message: '¿Está seguro de cancelar su inscripción a la convocatoria?',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        acceptLabel:"¡Seguro!",
        accept:()=>CancelarInscripcion(id_empleado, id_convocatoria)
    });
  };

  const [formDataUploadFile, setFormDataUploadFile] = useState(new FormData())
  
  const uploadFile = ({files}, id_convocatoria) =>{
    const formData = new FormData();
    formData.append('file', files[0])
    formData.append('id_convocatoria_fk', id_convocatoria)

    setFormDataUploadFile(formData)
    
}

const ConfirmarInscripcion = () =>{
  let form = formDataUploadFile.get("file")
  if(form && form !== 0){
    InscripcionConvocatoriaService.confirmarInscripcion(formDataUploadFile).then(response=>{
      console.log(response)
      setVisibilidadModalInscribirse(false)
      setReloadData(!reloadData)
      setFormDataUploadFile(new FormData())
      toast.current.show({severity: 'success', summary: 'Todo Bien', detail: response.data.message});
    })
  }else{
    toast.current.show({severity: 'error', summary: 'Error', detail: "Debe cargar la hoja de vida para poder aplicar"});
  }
}

  const closeDialog = () =>{
    setVisibilidadModalInscribirse(false);
    setVisibilidadModalConvocatoriaInscrita(false);
    setDataConvocatoriaInscripcion([])
    setDataConvocatoriaInscrita([])
    setFormDataUploadFile(new FormData())
  }

  return (
        <div className="card">
          <h1>Convocatoria FXA</h1>
          <p>En este espacio podra encontrar aquellas convocatorias a las cuales podra inscribirse, adicional podra consultar esas vacantes a las que ya se encuentra inscrito.</p>
          <div className='mt-6'>
            <Button icon={visualizarVacantes?"pi pi-fw pi-angle-down":"pi pi-fw pi-angle-left"} label='Ver Vacantes Disponibles' className='p-button-text' onClick={changeStateViewVacantes} />
            <Button icon={visualizarVacantesInscritas?"pi pi-fw pi-angle-down":"pi pi-fw pi-angle-left"} label='Ver Vacantes Inscritas' className='p-button-text' onClick={changeStateViewVacantesInscritas} />
          </div>
          <hr className='mb-4'/>
          {visualizarVacantes && <div>
            <VacantesDisponibles setDataConvocatoriaInscripcion={setDataConvocatoriaInscripcion} setVisibilidadModalInscribirse={setVisibilidadModalInscribirse} reloadData={reloadData}/>
          </div>}

          {visualizarVacantesInscritas && <div>
            <VacantesInscritas setVisibilidadModalConvocatoriaInscrita={setVisibilidadModalConvocatoriaInscrita} setDataConvocatoriaInscrita={setDataConvocatoriaInscrita} reloadData={reloadData} confirmCancelarInscripcion={confirmCancelarInscripcion}/>
          </div>}

          <Dialog header={()=><p className='text-sm'>Aplicar A Vacante</p>} visible={visibilidadModalInscribirse} onHide={closeDialog} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={FooterAplicarVacante}>
            <div className="grid w-full">
              <h5 className='xl:col-8 col-7 m-0'>{dataConvocatoriaInscripcion.titulo}</h5>
              <h6 className='xl:col-4 col-5 m-0'>Fecha Finalización: {dataConvocatoriaInscripcion.fechaF}</h6>
            </div>
            <p className="m-0 wl-full h-auto">{dataConvocatoriaInscripcion.descripcion}</p>
            <div className="grid mt-4">
              <div className='col-6'>
                <p>Ciudad: {dataConvocatoriaInscripcion.ciudad}</p>
              </div>
              <div className='col-6'>
                <p>Centro Costo: {dataConvocatoriaInscripcion.centro_costo}</p>
              </div>
            </div>
            <h6>¿Deseas aplicar a la vacante?</h6>
            <FileUpload name="demo" url="./upload" mode="basic" accept='application/pdf'
                    chooseLabel='Cargar Hoja De Vida'  onSelect={e=>uploadFile(e,dataConvocatoriaInscripcion.id_convocatoria)}  customUpload uploadHandler={e=>uploadFile(e,dataConvocatoriaInscripcion.id_convocatoria)} maxFileSize={5000}
                    invalidFileSizeMessageSummary='Archivo no valido' invalidFileSizeMessageDetail='Maximo de tamaño soportado es {0}'/>
          </Dialog>
        
          <Dialog header={()=><p className='text-sm'>Detalles Inscripción</p>} visible={visibilidadModalConvocatoriaInscrita} onHide={closeDialog} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} footer={FooterConvocatoriaInscrita}>
            <div className="grid w-full">
              <h5 className='xl:col-8 col-7 m-0'>{dataConvocatoriaInscrita.titulo}</h5>
              <h6 className='xl:col-4 col-5 m-0'>Fecha Inscripción: {dataConvocatoriaInscrita.fechaI}</h6>
            </div>
            <p className="m-0 wl-full h-auto">{dataConvocatoriaInscrita.descripcion}</p>
            <div className="grid mt-4">
              <div className='col-6'>
                <p>Ciudad: {dataConvocatoriaInscrita.ciudad}</p>
              </div>
              <div className='col-6'>
                <p>Centro Costo: {dataConvocatoriaInscrita.centro_costo}</p>
              </div>
            </div>
            <p className='cursor-pointer' onClick={()=>window.open(`${APIFILE}/${dataConvocatoriaInscrita.src_hoja_de_vida}`)}>Ver hoja de vida cargada: <i className='pi pi-file-pdf mx-2' style={{ color: 'var(--purple-700)', fontSize:'1.3rem'}} /></p>
          </Dialog>
        
          <Toast ref={toast} position='bottom-right'></Toast>
          <ConfirmPopup />
        </div>
  )
}

export default Convocatoria