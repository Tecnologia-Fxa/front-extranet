import React from 'react';
import { Divider } from 'primereact/divider';

const Riesgo = (props) => {

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Riesgo Basico</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>EPS: </span>
            {props.empleado.ep.nombre_eps}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>ARL: </span> 
            {props.empleado.arl.nombre_arl}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Pensión: </span> 
            {props.empleado.pension.nombre_pension}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Cesantias: </span> 
            {props.empleado.cesantia.nombre_cesantias}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Caja Compensación: </span>
            {props.empleado.caja_compensacion.nombre_caja_comp}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Direccion: </span> 
            {props.empleado.direccion}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Fecha Exp. Documento: </span> 
            {props.empleado.fecha_expedicion_doc}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Lugar Expedición Documento: </span> 
            {props.empleado.lugar_exp_doc.nombre_ciudad}
        </div>
    </div>
  )
};

export default Riesgo