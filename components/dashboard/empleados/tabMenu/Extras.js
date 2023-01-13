import classNames from 'classnames';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const Extras = (props) => {

    const isFormFieldValid = (name) => !!(props.empleado.touched[name] && props.empleado.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{props.empleado.errors[name]}</small>;
    };

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Nomina</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Salario:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('salario_fk') })+' inputForm'} name='salario_fk' id_def="id_salario" nombre_def="monto_salario" serviceName="salario" id={props.empleado.values.salario_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('salario_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Aux. Movilidad:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('aux_movilidad_fk') })+' inputForm'} name='aux_movilidad_fk' id_def="id_aux_movilidad" nombre_def="monto_aux_movilidad" serviceName="aux-movilidad" id={props.empleado.values.aux_movilidad_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('aux_movilidad_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Banco:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('banco_fk') })+' inputForm'} name='banco_fk' id_def="id_banco" nombre_def="nombre_banco" serviceName="banco" id={props.empleado.values.banco_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('banco_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tipo Cuenta:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('tipo_cuenta_fk') })+' inputForm'} name='tipo_cuenta_fk' id_def="id_tipo_cuenta" nombre_def="nombre_tipo_cuenta" serviceName="tipo-cuenta" id={props.empleado.values.tipo_cuenta_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('tipo_cuenta_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Nuemro De Cuenta:</span>
            <InputText name='num_cuenta' type="text" className={classNames({ 'error-input': isFormFieldValid('num_cuenta') })+' inputForm'} value={props.empleado.values.num_cuenta} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('num_cuenta')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Riesgo:</span> 
            <InputText name='riesgo' type="text" className={classNames({ 'error-input': isFormFieldValid('riesgo') })+' inputForm'}  value={props.empleado.values.riesgo} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('riesgo')}</div>
        </div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Otros Datos</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Estudios Realizados:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('estudios_fk') })+' inputForm'} name='estudios_fk' id_def="id_estudios" nombre_def="nombre_estudios" serviceName="estudios-realizados" id={props.empleado.values.estudios_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('estudios_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Camisa:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('talla_camisa_fk') })+' inputForm'} name='talla_camisa_fk' id_def="id_talla_camisa" nombre_def="nombre_talla_camisa" serviceName="talla-camisa" id={props.empleado.values.talla_camisa_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('talla_camisa_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Pantalon:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('talla_pantalon_fk') })+' inputForm'} name='talla_pantalon_fk' id_def="id_talla_pantalon" nombre_def="nombre_talla_pantalon" serviceName="talla-pantalon" id={props.empleado.values.talla_pantalon_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('talla_pantalon_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Calzado:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('talla_calzado_fk') })+' inputForm'} name='talla_calzado_fk' id_def="id_talla_calzado" nombre_def="nombre_talla_calzado" serviceName="talla-calzado" id={props.empleado.values.talla_calzado_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('talla_calzado_fk')}</div>
        </div>
    </div>
  )
};

export default Extras
