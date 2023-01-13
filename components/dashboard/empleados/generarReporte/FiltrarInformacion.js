import React, { useState } from 'react'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

const FiltrarInformacion = (params) => {

    const dataDropDown = [
        {label:'Tipo Identificación',serviceName:'tipo-identificacion',optionsName:'tipo_identificacion'},
        {label:'Lugar Nacimiento',serviceName:'ciudad',optionsName:'ciudad',foranea:'lugar_nacimiento'},
        {label:'Lugar Expedición Documento',serviceName:'ciudad',optionsName:'ciudad',foranea:'lugar_exp_doc'},
        {label:'Lugar Trabajo',serviceName:'ciudad',optionsName:'ciudad',foranea:'lugar_trabajo'},
        {label:'Nacionalidad',serviceName:'nacionalidad',optionsName:'nacionalidad'},
        {label:'Estado Civil',serviceName:'estado-civil',optionsName:'estado_civil'},
        {label:'Centro Costo',serviceName:'centro-costo',optionsName:'centro_costo'},
        {label:'Cargo',serviceName:'cargo',optionsName:'cargo'},
        {label:'Tipo Contrato',serviceName:'tipo-contrato',optionsName:'tipo_contrato'},
        {label:'Tiempo',serviceName:'tiempo',optionsName:'tiempo',foranea:'tipo_tiempo'},
        {label:'Estado Contrato',serviceName:'estado-contrato',optionsName:'estado_contrato'},
        {label:'Salario',serviceName:'salario',optionsName:'salario',name:'monto'},
        {label:'Aux Movilidad',serviceName:'aux-movilidad',optionsName:'aux_movilidad',name:'monto'},
        {label:'Estudios',serviceName:'estudios-realizados',optionsName:'estudios'},
        {label:'Banco',serviceName:'banco',optionsName:'banco'},
        {label:'Tipo Cuenta',serviceName:'tipo-cuenta',optionsName:'tipo_cuenta'},
        {label:'Eps',serviceName:'eps',optionsName:'eps'},
        {label:'Arl',serviceName:'arl',optionsName:'arl'},
        {label:'Pension',serviceName:'pension',optionsName:'pension'},
        {label:'Cesantias',serviceName:'cesantias',optionsName:'cesantias'},
        {label:'Caja Compensación',serviceName:'caja-compensacion',optionsName:'caja_comp', foranea:'ccf'},
        {label:'Talla Camisa',serviceName:'talla-camisa',optionsName:'talla_camisa'},
        {label:'Talla Pantalon',serviceName:'talla-pantalon',optionsName:'talla_pantalon'},
        {label:'Talla Calzado',serviceName:'talla-calzado',optionsName:'talla_calzado'},
        {label:'Empresa',serviceName:'empresa',optionsName:'empresa'},
    ]
    
    const [campoSeleccionado, setCampoSeleccionado] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState('');
    const [dataOption, setDataOption] = useState([])

    const [infoItem , setInfoItem] = useState('')

    const onCampoChange = (e) => {
        let value = e.value
        setCampoSeleccionado(value);
        //
        const ItemService  = require(`../../../../services/DefaultService`);
        const itemService = ItemService.default(value.serviceName)
        if(!value.name){
            setInfoItem(value.optionsName)
        }else{
            setInfoItem([value.optionsName,value.name])
        }
        const service = new itemService()
        service.getAll().then(res=>{
            setItemSeleccionado(null)
            setDataOption(res.data)
        })
    }

    const onItemChange = (e) =>{
        let value = e.value
        setItemSeleccionado(value);
    }

    const SaveOption = () =>{
        let arregloItem = Object.values(itemSeleccionado)
        if(campoSeleccionado && itemSeleccionado){
        params.setCondiciones([...params.condiciones,...[{campo:campoSeleccionado.foranea?campoSeleccionado.foranea:campoSeleccionado.optionsName, valor:arregloItem[0], label:campoSeleccionado.label, labelContenido:arregloItem[1]}]])
        setItemSeleccionado(null)
        setCampoSeleccionado(null)
        }else{
            params.toast.current.show({ severity: 'error', summary: 'Error', detail: 'No a seleccionado un campo y un valor para generar la opcion de filtrado', life: 3000 })
        }
    }

    const dropOption = (id) =>{
        let condiciones = [...params.condiciones]
        condiciones.splice(id,1)
        params.setCondiciones(condiciones)
    }

  return (
    <div className="card">
        <div className='grid'>
            <div className="col-12 md:col-1">
                <Button icon="pi pi-plus" onClick={SaveOption} className="mb-2"></Button>
            </div>
            <div className="col-12 md:col-4">
                <span className="p-float-label">
                    <Dropdown value={campoSeleccionado} className='w-full' options={dataDropDown} onChange={onCampoChange} optionLabel="label" filter filterBy={'label'}
                    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
                    <label>Campo:</label>
                </span>
            </div>
            <div className="col-12 md:col-2 text-center">
                <span className='text-base'>Contiene</span>
            </div>
            <div className="col-12 md:col-4">
                <span className="p-float-label">
                    <Dropdown className='w-full' value={itemSeleccionado} options={dataOption} onChange={e=>onItemChange(e)} optionLabel={Array.isArray(infoItem)?infoItem[1]+'_'+infoItem[0]:'nombre_'+infoItem} filter filterBy={Array.isArray(infoItem)?infoItem[1]+'_'+infoItem[0]:'nombre_'+infoItem}
                    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
                    <label>Contenido:</label>
                </span>
            </div>
        </div>
        {
            params.condiciones.map((el,id)=>{
                return <div className='grid' key={id}>
                <Divider/>
                <div className="col-12 md:col-1">
                    <Button icon="pi pi-minus" onClick={()=>dropOption(id)} className="mb-2"></Button>
                </div>
                <div className="col-12 md:col-4">
                    <span className="p-float-label">
                        <InputText type="text" className='w-full' value={el.label} disabled></InputText> 
                    </span>
                </div>
                <div className="col-12 md:col-2 text-center">
                    <span className='text-base'>Contiene</span>
                </div>
                <div className="col-12 md:col-4">
                    <span className="p-float-label">
                        <InputText type="text" className='w-full' value={el.labelContenido} disabled></InputText> 
                    </span>
                </div>
            </div>
            })
        }
    </div>
  )
}

export default FiltrarInformacion