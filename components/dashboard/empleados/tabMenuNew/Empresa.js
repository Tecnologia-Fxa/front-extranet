import classNames from 'classnames';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const Empresa = (props) => {
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
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('empresa_fk') })+' w-full'} name='empresa_fk' id_def="id_empresa" nombre_def="nombre_empresa" serviceName="empresa" id={props.formik.values.empresa_fk} onChange={props.formik.handleChange}/>
                <label>Empresa:</label>
            </span>
            <div>{getFormErrorMessage('empresa_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('lugar_trabajo_fk') })+' w-full'} name='lugar_trabajo_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.formik.values.lugar_trabajo_fk} onChange={props.formik.handleChange}/>
                <label>Lugar De Trabajo:</label>
            </span>
            <div>{getFormErrorMessage('lugar_trabajo_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('centro_costo_fk') })+' w-full'} name='centro_costo_fk' id_def="id_centro_costo" nombre_def="nombre_centro_costo" serviceName="centro-costo" id={props.formik.values.centro_costo_fk} onChange={props.formik.handleChange}/>
                <label>Centro Costo:</label>
            </span>
            <div>{getFormErrorMessage('centro_costo_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('cargo_fk') })+' w-full'} name='cargo_fk' id_def="id_cargo" nombre_def="nombre_cargo" serviceName="cargo" id={props.formik.values.cargo_fk} onChange={props.formik.handleChange}/>
                <label>Cargo:</label>
            </span>
            <div>{getFormErrorMessage('cargo_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('tipo_contrato_fk') })+' w-full'} name='tipo_contrato_fk' id_def="id_tipo_contrato" nombre_def="nombre_tipo_contrato" serviceName="tipo-contrato" id={props.formik.values.tipo_contrato_fk} onChange={props.formik.handleChange}/>
                <label>Tipo Contrato:</label>
            </span>
            <div>{getFormErrorMessage('tipo_contrato_fk')}</div>
        </div> 
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('tipo_tiempo_fk') })+' w-full'} name='tipo_tiempo_fk' id_def="id_tiempo" nombre_def="nombre_tiempo" serviceName="tiempo" id={props.formik.values.tipo_tiempo_fk} onChange={props.formik.handleChange}/>
                <label>Tiempo:</label>
            </span>
            <div>{getFormErrorMessage('tipo_tiempo_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <Calendar dateFormat="dd/mm/yy" name="fecha_ingreso" yearRange={`${today.getFullYear()-80}:${today.getFullYear()}`} id="fecha_ingreso" value={props.formik.values.fecha_ingreso} onChange={props.formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_ingreso') }+' w-full')}
                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
                <label>Fecha Ingreso:</label>
            </span>
            <div>{getFormErrorMessage('fecha_ingreso')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('estado_contrato_fk') })+' w-full'} name='estado_contrato_fk' id_def="id_estado_contrato" nombre_def="nombre_estado_contrato" serviceName="estado-contrato" id={props.formik.values.estado_contrato_fk} onChange={props.formik.handleChange}/>
                <label>Estado Contrato:</label>
            </span>
            <div>{getFormErrorMessage('estado_contrato_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('jefe_directo_fk') })+' w-full'} name='jefe_directo_fk' id_def="id_empleado" nombre_def="nombres" serviceName="jefe-directo" id={props.formik.values.jefe_directo_fk} onChange={props.formik.handleChange}/>
                <label>Jefe De Zona:</label>
            </span>
            <div>{getFormErrorMessage('jefe_directo_fk')}</div>
        </div>
    </div>
  )
};

export default Empresa;
