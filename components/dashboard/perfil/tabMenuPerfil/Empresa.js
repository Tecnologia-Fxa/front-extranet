import React from 'react';
import { Divider } from 'primereact/divider';

const Empresa = (props = {empleado:{}}) => {
    
  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos De Empresa</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Empresa: </span>
            {props.empleado.empresa.nombre_empresa}
        </div>
       <div className='text-left mb-2'>
            <span className='text-800 font-medium'>NIT: </span> 
            {props.empleado.empresa.nit}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Lugar De Trabajo: </span> 
            {props.empleado.lugar_trabajo.nombre_ciudad}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Centro De Costo: </span> 
            {props.empleado.centro_costo.nombre_centro_costo}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Cargo: </span>
            {props.empleado.cargo.nombre_cargo}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tipo De Contrato: </span> 
            {props.empleado.tipo_contrato.nombre_tipo_contrato}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tiempo: </span>
            {props.empleado.tiempo.nombre_tiempo}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Fecha Ingreso: </span> 
            {props.empleado.fecha_ingreso}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Contrato Firmado: </span> 
            {props.empleado.estado_contrato.nombre_estado_contrato}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Jefe De Zona: </span> 
            <p>{props.empleado.jefe_directo.nombres} {props.empleado.jefe_directo.apellidos}</p>
        </div> 
    </div>
  )
};

export default Empresa