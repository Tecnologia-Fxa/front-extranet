import classNames from 'classnames';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';
import { ToogleButton } from '../../../../pages/pages/util/ToogleButton';



const Datos = (props) => {
    let today = new Date()

    const isFormFieldValid = (name) => !!(props.formik.touched[name] && props.formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{props.formik.errors[name]}</small>;
    };
    
    const monthNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate=(e)=> {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

  return (
    <div className='grid w-full'>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='nombres' type="text" className={classNames({ 'p-invalid': isFormFieldValid('nombres') })+' w-full'} value={props.formik.values.nombres} onChange={props.formik.handleChange}></InputText> 
                <label>Nombres:</label>
            </span>
            <div>{getFormErrorMessage('nombres')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='apellidos' type="text" className={classNames({ 'p-invalid': isFormFieldValid('apellidos') })+' w-full'} value={props.formik.values.apellidos} onChange={props.formik.handleChange}></InputText> 
                <label>Apellidos:</label>
            </span>
            <div>{getFormErrorMessage('apellidos')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('tipo_identificacion_fk') })+' w-full'} name='tipo_identificacion_fk' id_def="id_tipo_identificacion" nombre_def="nombre_tipo_identificacion" serviceName="tipo-identificacion" id={props.formik.values.tipo_identificacion_fk} onChange={props.formik.handleChange}/>
                <label>Tipo Identificacion:</label>
            </span>
            <div>{getFormErrorMessage('tipo_identificacion_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='numero_identificacion' type="text" className={classNames({ 'p-invalid': isFormFieldValid('numero_identificacion') })+' w-full'} value={props.formik.values.numero_identificacion} onChange={props.formik.handleChange}></InputText> 
                <label>Número Documento:</label>
            </span>
            <div>{getFormErrorMessage('numero_identificacion')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
                <span className='text-800 font-medium'>Genero:</span> 
                <ToogleButton name='genero' id={props.formik.values.genero} onChange={props.formik.handleChange}/>
        </div> 
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label"> 
                <Calendar dateFormat="dd/mm/yy" name="fecha_nacimiento" yearRange={`${today.getFullYear()-90}:${today.getFullYear()-14}`} id="fecha_nacimiento" value={props.formik.values.fecha_nacimiento} onChange={props.formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_nacimiento') }+' w-full')}
                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
                <label>Fecha Nacimiento:</label>
            </span>
            <div>{getFormErrorMessage('fecha_nacimiento')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('lugar_nacimiento_fk') })+' w-full'} name='lugar_nacimiento_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.formik.values.lugar_nacimiento_fk} onChange={props.formik.handleChange}/>
                <label>Lugar Nacimiento:</label>
            </span>
            <div>{getFormErrorMessage('lugar_nacimiento_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('nacionalidad_fk') })+' w-full'} name='nacionalidad_fk' id_def="id_nacionalidad" nombre_def="nombre_nacionalidad" serviceName="nacionalidad" id={props.formik.values.nacionalidad_fk} onChange={props.formik.handleChange}/>
                <label>Nacionalidad:</label>
            </span>
            <div>{getFormErrorMessage('nacionalidad_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('estado_civil_fk') })+' w-full'} name='estado_civil_fk' id_def="id_estado_civil" nombre_def="nombre_estado_civil" serviceName="estado-civil" id={props.formik.values.estado_civil_fk} onChange={props.formik.handleChange}/>
                <label>Estado Civil:</label>
            </span>
            <div>{getFormErrorMessage('estado_civil_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='correo_electronico' type="text" className={classNames({ 'p-invalid': isFormFieldValid('correo_electronico') })+' w-full'} value={props.formik.values.correo_electronico} onChange={props.formik.handleChange}></InputText> 
                <label>Correo Electronico:</label>
            </span>
            <div>{getFormErrorMessage('correo_electronico')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='celular' type="text" className={classNames({ 'p-invalid': isFormFieldValid('celular') })+' w-full'} value={props.formik.values.celular} onChange={props.formik.handleChange}></InputText> 
                <label>Celular:</label>
            </span>
            <div>{getFormErrorMessage('celular')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='telefono_fijo' type="text" className={classNames({ 'p-invalid': isFormFieldValid('telefono_fijo') })+' w-full'} value={props.formik.values.telefono_fijo} onChange={props.formik.handleChange}></InputText> 
                <label>Telefono Fijo:</label>
            </span>
            <div>{getFormErrorMessage('telefono_fijo')}</div>
        </div>
        
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='contacto_emergencia' type="text" className={classNames({ 'p-invalid': isFormFieldValid('contacto_emergencia') })+' w-full'} value={props.formik.values.contacto_emergencia} onChange={props.formik.handleChange}></InputText> 
                <label>Contacto Emergencia:</label>
            </span>
            <div>{getFormErrorMessage('contacto_emergencia')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='tel_contacto_emergencia' type="text" className={classNames({ 'p-invalid': isFormFieldValid('tel_contacto_emergencia') })+' w-full'} value={props.formik.values.tel_contacto_emergencia} onChange={props.formik.handleChange}></InputText> 
                <label>Tel. Contacto Emergencia:</label>
            </span>
            <div>{getFormErrorMessage('tel_contacto_emergencia')}</div>
        </div>

    </div>
  )
};

export default Datos;
