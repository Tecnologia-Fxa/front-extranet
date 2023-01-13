import classNames from 'classnames';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const Riesgo = (props) => {

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
        let fecha_expedicion_doc = date 
        if(!date.getTime){
        const [yyyy, mm, dd] = date.split('-')
    
        fecha_expedicion_doc = new Date(`${mm}-${dd}-${yyyy}`)

        }
        return fecha_expedicion_doc
    }

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Riesgo Basico</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>EPS:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('eps_fk') })+' inputForm'} name='eps_fk' id_def="id_eps" nombre_def="nombre_eps" serviceName="eps" id={props.empleado.values.eps_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('eps_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>ARL:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('arl_fk') })+' inputForm'} name='arl_fk' id_def="id_arl" nombre_def="nombre_arl" serviceName="arl" id={props.empleado.values.arl_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('arl_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Pensión:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('pension_fk') })+' inputForm'} name='pension_fk' id_def="id_pension" nombre_def="nombre_pension" serviceName="pension" id={props.empleado.values.pension_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('pension_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Cesantias:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('cesantias_fk') })+' inputForm'} name='cesantias_fk' id_def="id_cesantias" nombre_def="nombre_cesantias" serviceName="cesantias" id={props.empleado.values.cesantias_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('cesantias_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Caja Compensación:</span>
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('ccf_fk') })+' inputForm'} name='ccf_fk' id_def="id_caja_comp" nombre_def="nombre_caja_comp" serviceName="caja-compensacion" id={props.empleado.values.ccf_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('ccf_fk')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Direccion:</span> 
            <InputText name='direccion' type="text" className={classNames({ 'error-input': isFormFieldValid('direccion') })+' inputForm'} value={props.empleado.values.direccion} onChange={props.empleado.handleChange}></InputText> 
            <div>{getFormErrorMessage('direccion')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Fecha Exp. Documento:</span> 
            <Calendar dateFormat="dd/mm/yy" name="fecha_expedicion_doc" yearRange={`${today.getFullYear()-80}:${today.getFullYear()}`} id="fecha_expedicion_doc" value={setDateValue(props.empleado.values.fecha_expedicion_doc)} onChange={props.empleado.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_expedicion_doc') }+' inputForm')}
                readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
            <div>{getFormErrorMessage('fecha_expedicion_doc')}</div>
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Lugar Expedición Documento:</span> 
            <DefaultSelect className={classNames({ 'error-input': isFormFieldValid('lugar_exp_doc_fk') })+' inputForm'} name='lugar_exp_doc_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.empleado.values.lugar_exp_doc_fk} onChange={props.empleado.handleChange}/>
            <div>{getFormErrorMessage('lugar_exp_doc_fk')}</div>
        </div>
    </div>
  )
};

export default Riesgo