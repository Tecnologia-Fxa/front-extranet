import classNames from 'classnames';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { DefaultSelect } from '../../../../pages/pages/util/DefaultSelect';

const Riesgos = (props) => {
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
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('eps_fk') })+' w-full'} name='eps_fk' id_def="id_eps" nombre_def="nombre_eps" serviceName="eps" id={props.formik.values.eps_fk} onChange={props.formik.handleChange}/>
                <label>Eps:</label>
            </span>
            <div>{getFormErrorMessage('eps_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('arl_fk') })+' w-full'} name='arl_fk' id_def="id_arl" nombre_def="nombre_arl" serviceName="arl" id={props.formik.values.arl_fk} onChange={props.formik.handleChange}/>
                <label>Arl:</label>
            </span>
            <div>{getFormErrorMessage('arl_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('pension_fk') })+' w-full'} name='pension_fk' id_def="id_pension" nombre_def="nombre_pension" serviceName="pension" id={props.formik.values.pension_fk} onChange={props.formik.handleChange}/>
                <label>Pension:</label>
            </span>
            <div>{getFormErrorMessage('pension_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('cesantias_fk') })+' w-full'} name='cesantias_fk' id_def="id_cesantias" nombre_def="nombre_cesantias" serviceName="cesantias" id={props.formik.values.cesantias_fk} onChange={props.formik.handleChange}/>
                <label>Cesantias:</label>
            </span>
            <div>{getFormErrorMessage('cesantias_fk')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('ccf_fk') })+' w-full'} name='ccf_fk' id_def="id_caja_comp" nombre_def="nombre_caja_comp" serviceName="caja-compensacion" id={props.formik.values.ccf_fk} onChange={props.formik.handleChange}/>
                <label>Caja compensacion Familiar:</label>
            </span>
            <div>{getFormErrorMessage('ccf_fk')}</div>
        </div> 
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <InputText name='direccion' type="text" className={classNames({ 'p-invalid': isFormFieldValid('direccion') })+' w-full'} value={props.formik.values.direccion} onChange={props.formik.handleChange}></InputText> 
                <label>Direccion:</label>
            </span>
            <div>{getFormErrorMessage('direccion')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <Calendar dateFormat="dd/mm/yy" name="fecha_expedicion_doc" yearRange={`${today.getFullYear()-80}:${today.getFullYear()}`} id="fecha_expedicion_doc" value={props.formik.values.fecha_expedicion_doc} onChange={props.formik.handleChange}  monthNavigator yearNavigator className={classNames({ 'p-invalid': isFormFieldValid('fecha_expedicion_doc') }+' w-full')}
                    readOnlyInput monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}/> 
                <div>{getFormErrorMessage('fecha_expedicion_doc')}</div>
                <label>Fecha Expedicion Doc:</label>
            </span>
            <div>{getFormErrorMessage('fecha_expedicion_doc')}</div>
        </div>
        <div className="col-12 md:col-6 mt-4">
            <span className="p-float-label">
                <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('lugar_exp_doc_fk') })+' w-full'} name='lugar_exp_doc_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={props.formik.values.lugar_exp_doc_fk} onChange={props.formik.handleChange}/>
                <label>Lugar Expedicion Doc:</label>
            </span>
            <div>{getFormErrorMessage('lugar_exp_doc_fk')}</div>
        </div>
    </div>
  )
};

export default Riesgos;
