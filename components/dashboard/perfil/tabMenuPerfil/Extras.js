import React from 'react';
import { Divider } from 'primereact/divider';

const Extras = (props) => {

  return (
    <div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Datos Nomina</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Salario: </span>
            {props.empleado.salario.monto_salario}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Aux. Movilidad: </span> 
            {props.empleado.aux_movilidad.monto_aux_movilidad}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Banco: </span> 
            {props.empleado.banco.nombre_banco}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Tipo Cuenta: </span> 
            {props.empleado.tipo_cuentum.nombre_tipo_cuenta}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Nuemro De Cuenta: </span>
            {props.empleado.num_cuenta}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Riesgo: </span> 
            {props.empleado.riesgo}
        </div>
        <Divider align="left">
            <div className="inline-flex align-items-center">
                <b>Otros Datos</b>
            </div>
        </Divider>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Estudios Realizados: </span> 
            {props.empleado.estudios_realizado.nombre_estudios}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Camisa: </span> 
            {props.empleado.talla_camisa.nombre_talla_camisa}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Pantalon: </span> 
            {props.empleado.talla_pantalon.nombre_talla_pantalon}
        </div>
        <div className='text-left mb-2'>
            <span className='text-800 font-medium'>Talla Calzado: </span> 
            {props.empleado.talla_calzado.nombre_talla_calzado}
        </div>
    </div>
  )
};

export default Extras