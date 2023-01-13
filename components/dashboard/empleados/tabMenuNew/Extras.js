import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';



const Extras = (props) => {

    const isFormFieldValid = (name) => !!(props.formik.touched[name] && props.formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{props.formik.errors[name]}</small>;
    };
    
  return (
    <div className='grid w-full'>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('salario_fk') })+' w-full'} name='salario_fk' id_def="id_salario" nombre_def="monto_salario" serviceName="salario" id={props.formik.values.salario_fk} onChange={props.formik.handleChange}/>
                <label>Salario:</label>
            </span>
            <div>{getFormErrorMessage('salario_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('aux_movilidad_fk') })+' w-full'} name='aux_movilidad_fk' id_def="id_aux_movilidad" nombre_def="monto_aux_movilidad" serviceName="aux-movilidad" id={props.formik.values.aux_movilidad_fk} onChange={props.formik.handleChange}/>
                <label>Aux. Movilidad:</label>
            </span>
            <div>{getFormErrorMessage('aux_movilidad_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
            <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('banco_fk') })+' w-full'} name='banco_fk' id_def="id_banco" nombre_def="nombre_banco" serviceName="banco" id={props.formik.values.banco_fk} onChange={props.formik.handleChange}/>
            <label>Banco:</label>
            </span>
            <div>{getFormErrorMessage('banco_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('tipo_cuenta_fk') })+' w-full'} name='tipo_cuenta_fk' id_def="id_tipo_cuenta" nombre_def="nombre_tipo_cuenta" serviceName="tipo-cuenta" id={props.formik.values.tipo_cuenta_fk} onChange={props.formik.handleChange}/>
                <label>Tipo Cuenta:</label>
            </span>
            <div>{getFormErrorMessage('tipo_cuenta_fk')}</div>
        </div> 
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='num_cuenta' type="text" className={classNames({ 'p-invalid': isFormFieldValid('num_cuenta') })+' w-full'} value={props.formik.values.num_cuenta} onChange={props.formik.handleChange}></InputText> 
                <label>Número De Cuenta:</label>
            </span>
            <div>{getFormErrorMessage('num_cuenta')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='riesgo' type="text" className={classNames({ 'p-invalid': isFormFieldValid('riesgo') })+' w-full'}  value={props.formik.values.riesgo} onChange={props.formik.handleChange}></InputText> 
                <label>Riesgo:</label>
            </span>
            <div>{getFormErrorMessage('riesgo')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('estudios_fk') })+' w-full'} name='estudios_fk' id_def="id_estudios" nombre_def="nombre_estudios" serviceName="estudios-realizados" id={props.formik.values.estudios_fk} onChange={props.formik.handleChange}/>
                <label>Estudios:</label>
            </span>
            <div>{getFormErrorMessage('estudios_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('talla_camisa_fk') })+' w-full'} name='talla_camisa_fk' id_def="id_talla_camisa" nombre_def="nombre_talla_camisa" serviceName="talla-camisa" id={props.formik.values.talla_camisa_fk} onChange={props.formik.handleChange}/>
                <label>Talla Camisa:</label>
            </span>
            <div>{getFormErrorMessage('talla_camisa_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('talla_pantalon_fk') })+' w-full'} name='talla_pantalon_fk' id_def="id_talla_pantalon" nombre_def="nombre_talla_pantalon" serviceName="talla-pantalon" id={props.formik.values.talla_pantalon_fk} onChange={props.formik.handleChange}/>
                <label>Talla Pantalon:</label>
            </span>
            <div>{getFormErrorMessage('talla_pantalon_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('talla_calzado_fk') })+' w-full'} name='talla_calzado_fk' id_def="id_talla_calzado" nombre_def="nombre_talla_calzado" serviceName="talla-calzado" id={props.formik.values.talla_calzado_fk} onChange={props.formik.handleChange}/>
                <label>Talla Calzado:</label>
            </span>
            <div>{getFormErrorMessage('talla_calzado_fk')}</div>
        </div>
    </div>
  )
};

export default Extras;
