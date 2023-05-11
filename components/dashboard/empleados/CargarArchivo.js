import React from 'react'
import { Button } from 'primereact/button'
import { readFileXlsx } from '../../../helpers/readFileXlsx'
import { useState } from 'react'
import { EmpleadoService } from '../../../services/EmpleadoService'
const CargarArchivo = params => {

  const serviceEmpleado = new EmpleadoService()

  const cambiar =()=>{
    var pdrs = document.getElementById('file').files[0]?document.getElementById('file').files[0].name:"Seleccione un archivo...";
    setInputText(pdrs);
  }

  const sendFile = () =>{
    serviceEmpleado.cargueMasivo({empleados:data}).then(e=>{
      params.hideModal()
      params.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: e.data, life: 3000 })
    })
  }

  const [inputText, setInputText] = useState('Seleccione un archivo...');
  const [data, setData] = useState([]);
  
  return (
    <div>
      <div className="card w-10 mx-6">
        <p className='text-700 font-xl'>En el siguiente espacio podra realizar la carga de archivos para la creación y/o actualización de usuarios de manera masiva.</p>
      </div>
      <a href='/extranet-fxa/plantilla/PlantillaExtranet.xlsx' className='p-button p-button-text p-button-raised mr-2 mb-4 block'>Descargar Plantilla</a>
      <div className='w-full grid'>
        <label htmlFor="file" className="p-button p-button-outlined mr-2 mb-4 block col-5">
            <i className="pi pi-upload"></i> Cargar archivo
        </label>
        <input id="file" name='file' onChange={e=>{cambiar();setData(readFileXlsx(e))}} type="file" style={{display:'none'}}/>
        <div className='col-6'>{inputText}</div>
      </div>
      <Button label="Enviar" disabled={inputText==="Seleccione un archivo..."?true:false} onClick={sendFile}/>
    </div>
  )
}

export default CargarArchivo