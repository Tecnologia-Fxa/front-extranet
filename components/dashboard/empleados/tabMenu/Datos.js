import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';
import classNames from 'classnames';
import { ToogleButton } from '../../../../pages/pages/util/ToogleButton';
import { Dropdown } from 'primereact/dropdown';

import '../usuario.module.css'

const Datos = (props) => {
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

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Basicos</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Nombres:</span>
            <InputText name='nombres' type="text" className={classNames({ 'error-input': isFormFieldValid('nombres') })+' inputForm'} value={props.empleado.values.nombres} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('nombres')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Apellidos:</span> 
            <InputText name='apellidos' type="text" className={classNames({ 'error-input': isFormFieldValid('apellidos') })+' inputForm'} value={props.empleado.values.apellidos} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('apellidos')}</div>
        </div> 
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Documento:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('tipo_identificacion_fk') })+' inputForm'} name='tipo_identificacion_fk' id_def="id_tipo_identificacion" nombre_def="nombre_tipo_identificacion" serviceName="tipo-identificacion" id={props.empleado.values.tipo_identificacion_fk} onChange={props.empleado.handleChange}/>
            <InputText name='numero_identificacion' type="text" className={classNames({ 'error-input': isFormFieldValid('numero_identificacion') })+' inputForm'} value={props.empleado.values.numero_identificacion} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('tipo_identificacion_fk')}</div>
            <div>{getFormErrorMessage('numero_identificacion')}</div>
        </div>
        <div className='text-left mb-2' >
            <span className='text-800 font-medium'>Genero:</span> 
            <ToogleButton name='genero' id={props.empleado.values.genero} onChange={props.empleado.handleChange}/>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Fecha De Nacimiento:</span>
            <Calendar dateFormat="dd/mm/yy" name="fecha_nacimiento" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fecha_nacimiento" value={new Date(`${props.empleado.values.fecha_nacimiento} 08:00:00`)} onChange={props.empleado.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_nacimiento') }+' inputForm')}
                readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
            <div>{getFormErrorMessage('fecha_nacimiento')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Lugar De Nacimiento:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('lugar_nacimiento_fk') })+' inputForm'} name='lugar_nacimiento_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.empleado.values.lugar_nacimiento_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('lugar_nacimiento_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Nacionalidad:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('nacionalidad_fk') })+' inputForm'} name='nacionalidad_fk' id_def="id_nacionalidad" nombre_def="nombre_nacionalidad" serviceName="nacionalidad" id={props.empleado.values.nacionalidad_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('nacionalidad_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Estado Civil:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('estado_civil_fk') })+' inputForm'} name='estado_civil_fk' id_def="id_estado_civil" nombre_def="nombre_estado_civil" serviceName="estado-civil" id={props.empleado.values.estado_civil_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('estado_civil_fk')}</div>
        </div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Contacto</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Correo Electronico:</span> 
            <InputText name='correo_electronico' type="text" className={classNames({ 'error-input': isFormFieldValid('correo_electronico') })+' inputForm'} value={props.empleado.values.correo_electronico} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('correo_electronico')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Celular:</span> 
            <InputText name='celular' type="text" className={classNames({ 'error-input': isFormFieldValid('celular') })+' inputForm'} value={props.empleado.values.celular} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('celular')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Telefono Fijo:</span> 
            <InputText name='telefono_fijo' type="text" className={classNames({ 'error-input': isFormFieldValid('telefono_fijo') })+' inputForm'} value={props.empleado.values.telefono_fijo} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('telefono_fijo')}</div>
        </div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Contacto Emergencia</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Nombre:</span> 
            <InputText name='contacto_emergencia' type="text" className={classNames({ 'error-input': isFormFieldValid('contacto_emergencia') })+' inputForm'} value={props.empleado.values.contacto_emergencia} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('contacto_emergencia')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Telefono Contacto:</span> 
            <InputText name='tel_contacto_emergencia' type="text" className={classNames({ 'error-input': isFormFieldValid('tel_contacto_emergencia') })+' inputForm'} value={props.empleado.values.tel_contacto_emergencia} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('tel_contacto_emergencia')}</div>
        </div>
    </div>
  )
};

export default Datos
