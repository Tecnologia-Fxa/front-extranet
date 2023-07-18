import React from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import DefaultSelect from '../../../pages/pages/util/DefaultSelect'
import classNames from 'classnames'

const NewConvoactoria = (params) => {

    const isFormFieldValid = (name) => !!(params.convocatoriasFormik.touched[name] && params.convocatoriasFormik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{params.convocatoriasFormik.errors[name]}</small>;
    };

    

  return (
    <div>
        <h3 className='text-center'>{params.isUpdate?"Actualizar":"Nueva"} Convocatoria</h3>
        
        <div className="col-12 mt-4">
            <span className="p-float-label">
                <InputText className={classNames({ 'p-invalid': isFormFieldValid('titulo') })+' w-full'} id="titulo" name='titulo' value={params.convocatoriasFormik.values.titulo} onChange={params.convocatoriasFormik.handleChange} />
                <label htmlFor="titulo">Titulo</label>
            </span>
            <div>{getFormErrorMessage('titulo')}</div>
        </div>

        <div className="col-12 mt-4">
            <span className="p-float-label">
                <InputTextarea className={classNames({ 'p-invalid': isFormFieldValid('descripcion') })+' w-full'} name='descripcion' id="descripcion" value={params.convocatoriasFormik.values.descripcion} onChange={params.convocatoriasFormik.handleChange} rows={5} cols={30} />
                <label htmlFor="descripcion">Descripción</label>
            </span>
            <div>{getFormErrorMessage('descripcion')}</div>
        </div>


        <div className='grid justify-content-between w-full'>

            <div className="col-12 md:col-6 mt-4">
                <span className="p-float-label">
                    <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('id_ciudad_fk') })+' w-full'} name='id_ciudad_fk' id_def="id_ciudad" nombre_def="nombre_ciudad" serviceName="ciudad" id={params.convocatoriasFormik.values.id_ciudad_fk} onChange={params.convocatoriasFormik.handleChange}/>
                    <label>Ciudad:</label>
                </span>
                <div>{getFormErrorMessage('id_ciudad_fk')}</div>
            </div>
            

            <div className="col-12 md:col-6 mt-4">
                <span className="p-float-label">
                    <DefaultSelect className={classNames({ 'p-invalid': isFormFieldValid('id_centro_costo_fk') })+' w-full'} name='id_centro_costo_fk' id_def="id_centro_costo" nombre_def="nombre_centro_costo" serviceName="centro-costo" id={params.convocatoriasFormik.values.id_centro_costo_fk} onChange={params.convocatoriasFormik.handleChange}/>
                    <label>Centro Costo:</label>
                </span>
                <div>{getFormErrorMessage('id_centro_costo_fk')}</div>
            </div>


            <div className="col-12 md:col-6">
                Fecha Inicio:
                <span className="">
                    <Calendar className={classNames({ 'p-invalid': isFormFieldValid('fecha_publicacion') })+' w-full'} name='fecha_publicacion' id='fecha_publicacion' placeholder='Selecione Fecha Inicio' inputId="birth_date1" minDate={new Date()} value={params.convocatoriasFormik.values.fecha_publicacion} onChange={params.convocatoriasFormik.handleChange} />
                </span>
                <div>{getFormErrorMessage('fecha_publicacion')}</div>
            </div>

            <div className="col-12 md:col-6">
                Fecha finalizacion:
                <span className="">
                    <Calendar className={classNames({ 'p-invalid': isFormFieldValid('fecha_finalizacion') })+' w-full'} name='fecha_finalizacion' id='fecha_finalizacion' placeholder='Selecione Fecha Finalización' inputId="birth_date2" value={params.convocatoriasFormik.values.fecha_finalizacion} minDate={params.convocatoriasFormik.values.fecha_publicacion?params.convocatoriasFormik.values.fecha_publicacion:new Date()} onChange={params.convocatoriasFormik.handleChange}  />
                </span>
                <div>{getFormErrorMessage('fecha_finalizacion')}</div>
            </div>


            
        </div>

    </div>
  )
}

export default NewConvoactoria