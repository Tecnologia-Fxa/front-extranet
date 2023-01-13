import classNames from 'classnames';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const Empresa = (props = {empleado:{}}) => {
    let today = new Date()

    const isFormFieldValid = (name) => !!(props.empleado.touched[name] && props.empleado.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{props.empleado.errors[name]}</small>;
    };

    
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    const setDateValue = (date) =>{
        let fecha_ingreso = date 
        if(!date.getTime){
        const [yyyy, mm, dd] = date.split('-')
    
        fecha_ingreso = new Date(`${mm}-${dd}-${yyyy}`)

        }
        return fecha_ingreso
    }

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos De Empresa</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Empresa:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('empresa_fk') })+' inputForm'} name='empresa_fk' id_def="id_empresa" nombre_def="nombre_empresa" serviceName="empresa" id={props.empleado.values.empresa_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('empresa_fk')}</div>
        </div>
       <div className='text-left mb-2'>
            <span className='text-800 font-medium'>NIT:</span> 
            <InputText disabled type="text" className='inputForm' value={props.empleado.values.empresa.nit}></InputText> 
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Lugar De Trabajo:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('lugar_trabajo_fk') })+' inputForm'} name='lugar_trabajo_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.empleado.values.lugar_trabajo_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('lugar_trabajo_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Centro De Costo:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('centro_costo_fk') })+' inputForm'} name='centro_costo_fk' id_def="id_centro_costo" nombre_def="nombre_centro_costo" serviceName="centro-costo" id={props.empleado.values.centro_costo_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('centro_costo_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Cargo:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('cargo_fk') })+' inputForm'} name='cargo_fk' id_def="id_cargo" nombre_def="nombre_cargo" serviceName="cargo" id={props.empleado.values.cargo_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('cargo_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tipo De Contrato:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('tipo_contrato_fk') })+' inputForm'} name='tipo_contrato_fk' id_def="id_tipo_contrato" nombre_def="nombre_tipo_contrato" serviceName="tipo-contrato" id={props.empleado.values.tipo_contrato_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('tipo_contrato_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tiempo:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('tipo_tiempo_fk') })+' inputForm'} name='tipo_tiempo_fk' id_def="id_tiempo" nombre_def="nombre_tiempo" serviceName="tiempo" id={props.empleado.values.tipo_tiempo_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('tipo_tiempo_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Fecha Ingreso:</span> 
            <Calendar dateFormat="dd/mm/yy" name="fecha_ingreso" yearRange={`${today.getFullYear()-80}:${today.getFullYear()}`} id="fecha_ingreso" value={setDateValue(props.empleado.values.fecha_ingreso)} onChange={props.empleado.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_ingreso') }+' inputForm')}
                readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
            <div>{getFormErrorMessage('fecha_ingreso')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Contrato Firmado:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('estado_contrato_fk') })+' inputForm'} name='estado_contrato_fk' id_def="id_estado_contrato" nombre_def="nombre_estado_contrato" serviceName="estado-contrato" id={props.empleado.values.estado_contrato_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('estado_contrato_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Jefe Directo:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('jefe_directo_fk') })+' inputForm'} name='jefe_directo_fk' id_def="id_empleado" nombre_def="nombres" serviceName="jefe-directo" id={props.empleado.values.jefe_directo_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('jefe_directo_fk')}</div>
        </div> 
    </div>
  )
};

export default Empresa