import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import jsPDF from 'jspdf'
import { EmpleadoService } from '../../../services/EmpleadoService';
import {NumerosALetras} from 'numero-a-letras/build/numeroaletras' 
import ObtenerMes from '../../../helpers/ObtenerMes'
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';


const GenerarCertificado = () => {

  const contextPath = getConfig().publicRuntimeConfig.contextPath;
  const serviceEmp = new EmpleadoService()
  const [infoEmp, setInfoEmp] = useState({})
  const [reload, setReload] = useState(0)
  const [stateButton, setStateButton] = useState(true)
  const [fechaUltimoCertificado, setFechaUltimoCertificado] = useState(new Date())

useEffect(() => {
    
    serviceEmp.getInfoCertificado().then(res=>{
      res.data.fecha_ingreso = res.data.fecha_ingreso.split('-')
      res.data.salarioLetras = NumerosALetras(res.data.salario.monto_salario).slice(0,-12)
      let fechaGenCertificado = new Date(res.data.fecha_gen_certificado)
      fechaGenCertificado.setDate(fechaGenCertificado.getDate() +1)
      setFechaUltimoCertificado(fechaGenCertificado)
      setInfoEmp(res.data)
      validateDate(res.data, fechaGenCertificado)
    })

}, [reload]) //eslint-disable-line

const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
})

  const validateDate = (data, fechaGenCertificado) =>{
    if(!data.fecha_gen_certificado||fechaGenCertificado.getMonth()<new Date().getMonth()||fechaGenCertificado.getFullYear()<new Date().getFullYear()){
      setStateButton(false)
    }else{
      setStateButton(true)
    }
  }

  const fechaActual = new Date()
  const GeneratePdf = () =>{
        
        let doc = new jsPDF('p','pt')
        doc.setFontSize(12)

        doc.addImage(`${contextPath}/demo/images/certificado/version_firma.png`,'png',480,10)

        doc.text("LA COORDINACIÓN DE RECURSOS HUMANOS DE LA EMPRESA", 120, 130)

        doc.text(`${infoEmp.empresa.nombre_empresa}`, 280, 200,{align:'center'})
        doc.text(`NIT ${infoEmp.empresa.nit}`, 280, 220,{align:'center'})

        doc.text("CERTIFICA QUE:", 280, 285,{align:'center'})
        doc.text(`El(la) señor(a) ${infoEmp.nombres} ${infoEmp.apellidos}, identificado(a) con ${infoEmp.tipo_identificacion.nombre_tipo_identificacion} No. ${infoEmp.numero_identificacion}, labora en nuestra empresa desde el día ${infoEmp.fecha_ingreso[2]} de ${ObtenerMes(parseInt(infoEmp.fecha_ingreso[1]))} de ${infoEmp.fecha_ingreso[0]} y vigente a la fecha, con un contrato a término ${infoEmp.tipo_contrato.nombre_tipo_contrato}, desempeñando el cargo de ${infoEmp.cargo.nombre_cargo} y devengando un salario mensual de ${infoEmp.salarioLetras} (${formatterPeso.format(infoEmp.salario.monto_salario)}).`, 80, 355,{align:'justify', maxWidth:430})
        
        
        doc.text(`La presente certificación se expide a solicitud del interesado el día (${fechaActual.getDate()}) de ${ObtenerMes(fechaActual.getMonth())} de ${fechaActual.getFullYear()} en la ciudad de Bogotá.`, 80, 460,{align:'justify', maxWidth:430})

        doc.text("Cordialmente,", 80, 525)

        doc.addImage(`${contextPath}/demo/images/certificado/firma.jpeg`,'JPEG',80,560,150,80)
        doc.text("KAREN LIZETH MORALES ALVARADO", 80, 645)
        doc.text("Directora de talento humano", 80, 660)
    
        doc.addImage(`${contextPath}/demo/images/certificado/FooterPdf.png`,'png',30,800,550,20)

      doc.save(`Certificado Laboral_${infoEmp.nombres} ${infoEmp.apellidos}.pdf`)

        setStateButton(true)
        serviceEmp.updateFechaCertificado(infoEmp.id_empleado).then(()=>{
          setTimeout(setReload(reload+1),2000)
        })
    }
  return <div className='card'  >
        <h4 className='mb-5'>Generar Certificado Laboral</h4>
        <div className="grid">
          <div className='col-12 md:col-7 card'>
            <p className='text-800 font-nomral'>En el siguiente espacio podra descargar su certificado laboral.</p>
            <p className='text-700 font-nomral'>Este certificado solo puede ser descargado 1 vez al mes. si requiere de dicho certificado más de una vez solicitelo al area de talento humano.</p>
            <p className='text-600 font-medium'>Ultimo certificado generado el día: <span className='text-800 font-medium'>{infoEmp.fecha_gen_certificado?infoEmp.fecha_gen_certificado:'No se ha generado ningun certificado hasta la fecha'}</span></p>
            {!(!infoEmp.fecha_gen_certificado||fechaUltimoCertificado.getMonth()<new Date().getMonth()||fechaUltimoCertificado.getFullYear()<new Date().getFullYear())&&<Message severity="warn" className='mb-4' text="Para generar un nuevo certificado laboral es necesario esperar hasta el otro mes" />}
            <Button onClick={GeneratePdf} loading={stateButton} label="Generar Certificado" className="p-button-outlined block mr-2 mb-2" />
          </div>
        </div>
      </div>;
};

export default GenerarCertificado;
