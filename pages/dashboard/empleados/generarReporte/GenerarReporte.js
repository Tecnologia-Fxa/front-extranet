import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import React, { useState } from 'react';
import { EmpleadoService } from '../../../../services/EmpleadoService';
import { Message } from 'primereact/message';
import FiltrarInformacion from '../../../../components/dashboard/empleados/generarReporte/FiltrarInformacion';
import { saveAs } from 'file-saver'

const GenerarReporte = (params) => {

    const serviceEmpleado = new EmpleadoService()


    const exportExcel = (datosExcel) => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(datosExcel);
            const workbook = { Sheets: { 'DatosFXA': worksheet }, SheetNames: ['DatosFXA'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'ReporteEmpleadosFXA');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        saveAs(data, fileName + '_' + new Date().getDate() + '-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear() + EXCEL_EXTENSION);
    }

    const [checkboxValue, setCheckboxValue] = useState([]);
    const [switchValue, setSwitchValue] = useState(false);
    const [switchValue2, setSwitchValue2] = useState(false);

    const [ loading, setLoading ] = useState(false)

    const consultarDatos = () =>{
        if(!dataCampos[0] && !dataForaneas[0] && !dataCiudad[0] && !dataMontos[0] && !dataJefeZona){
            params.toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se puede generar un reporte si no se selecciona algun campo', life: 3000 })
        }else if(switchValue2 && !condiciones[0]){
            params.toast.current.show({ severity: 'error', summary: 'Error', detail: 'No ha seleccionado parametros para filtrar', life: 3000 })
        }else{
            setLoading(true)
            serviceEmpleado.genReporte({campos:dataCampos,foraneas:dataForaneas,ciudad:dataCiudad, montos:dataMontos, jefe_zona:dataJefeZona,condiciones:condiciones}).then(res=>{
                exportExcel(res.data)
                setLoading(false)
                params.hideModal()
                params.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: 'El Reporte se genero con exito', life: 3000 })
            })
        }
    }

    const [dataCampos, setDataCampos] = useState([])
    const [dataForaneas, setDataForaneas] = useState([])
    const [dataCiudad, setCiudad] = useState([])
    const [dataMontos, setMontos] = useState([])
    const [dataJefeZona, setDataJefeZona] = useState(false)

    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked){
            selectedValue.push(e.value);
        }else{
            selectedValue.splice(selectedValue.indexOf(e.value), 1);
        }
        let campos = []
        let foraneas = []
        let ciudad = []
        let montos = []
        let jefe_zona = false
        selectedValue.forEach(el => {
            let data = el.split("-")
            switch (parseInt(data[1])) {
                case 0:
                    campos.push(data[0])
                    break;

                case 1:
                    if(data[2])
                        foraneas.push([data[0],data[2],data[3]])
                    else
                        foraneas.push(data[0])
                    break;
                
                case 2:
                    ciudad.push(data[0])
                    break;
                
                case 3:
                    montos.push(data[0])
                    break;

                case 4:
                    jefe_zona = true
                    break;
            
                default:
                    break;
            }
        });
        setDataCampos(campos)
        setDataForaneas(foraneas)
        setCiudad(ciudad)
        setMontos(montos)
        setDataJefeZona(jefe_zona)
        setCheckboxValue(selectedValue);
    };

    const onCheckboxChangeGrup = (e,options) =>{
        let selectedValue = [...checkboxValue];
        if (e.checked){
            options.forEach(el => {
                if(selectedValue.indexOf(el)===-1)
                    selectedValue.push(el);
            });
        }
        else{
            options.forEach(el => {
                selectedValue.splice(selectedValue.indexOf(el), 1);
            });
        }

        let campos = []
        let foraneas = []
        let ciudad = []
        let montos = []
        let jefe_zona = false
        selectedValue.forEach(el => {
            let data = el.split("-")
            switch (parseInt(data[1])) {
                case 0:
                    campos.push(data[0])
                    break;

                case 1:
                    if(data[2])
                        foraneas.push([data[0],data[2],data[3]])
                    else
                        foraneas.push(data[0])
                    break;
                
                case 2:
                    ciudad.push(data[0])
                    break;

                case 3:
                    montos.push(data[0])
                    break;
                
                case 4:
                    jefe_zona = true
                    break;
            
                default:
                    break;
            }
        });
        setDataCampos(campos)
        setDataForaneas(foraneas)
        setCiudad(ciudad)
        setMontos(montos)
        setDataJefeZona(jefe_zona)
        setCheckboxValue(selectedValue);
    }

    const valuesDatosBasicos = [
        {value:'nombres-0', label:'Nombres', tipo:'campo'},
        {value:'apellidos-0', label:'Apellidos', tipo:'campo'},
        {value:'tipo_identificacion-1', label:'Tipo Identificacion', tipo:'foranea'},
        {value:'numero_identificacion-0', label:'Numero Identificacion'},
        {value:'genero-0', label:'Genero'},
        {value:'fecha_nacimiento-0', label:'Fecha Nacimiento'},
        {value:'lugar_nacimiento-2', label:'Lugar Nacimiento'},
        {value:'nacionalidad-1', label:'Nacionalidad'},
        {value:'estado_civil-1', label:'Estado Civil'},
        {value:'correo_electronico-0', label:'Correo Electronico'},
        {value:'celular-0', label:'Celular'},
        {value:'telefono_fijo-0', label:'Telefono Fijo'},
    ]

    const valuesEmpresa = [
        {value:'empresa-1', label:'Empresa'},
        {value:'lugar_trabajo-2', label:'Lugar Trabajo'},
        {value:'centro_costo-1', label:'Centro Costo'},
        {value:'cargo-1', label:'Cargo'},
        {value:'tipo_contrato-1', label:'Tipo Contrato'},
        {value:'tiempo-1-tipo_tiempo-tiempo', label:'Tiempo'},
        {value:'fecha_ingreso-0', label:'Fecha Ingreso'},
        {value:'estado_contrato-1', label:'Estado Contrato'},
        {value:'jefe_zona-4', label:'Jefe Zona'},
    ]

    const valuesComplementarios = [
        {value:'salario-3', label:'Salario'},
        {value:'aux_movilidad-3', label:'Aux Movilidad'},
        {value:'banco-1', label:'Banco'},
        {value:'tipo_cuenta-1', label:'Tipo_Cuenta'},
        {value:'num_cuenta-0', label:'Num Cuenta'},
        {value:'riesgo-0', label:'Riesgo'},
        {value:'estudios_realizados-1-estudios-estudios', label:'Estudios Realizados'},
        {value:'talla_camisa-1', label:'Talla Camisa'},
        {value:'talla_pantalon-1', label:'Talla Pantalon'},
        {value:'talla_calzado-1', label:'Talla Calzado'},
    ]

    const valuesAfiliaciones = [
        {value:'eps-1', label:'Eps'},
        {value:'arl-1', label:'Arl'},
        {value:'pension-1', label:'Pension'},
        {value:'cesantias-1', label:'Cesantias'},
        {value:'caja_compensacion-1-ccf-caja_comp', label:'Caja_compensacion'},
        {value:'direccion-0', label:'Direccion'},
        {value:'fecha_expedicion_doc-0', label:'Fecha Expedicion Doc'},
        {value:'lugar_exp_doc-2', label:'Lugar Exp Doc'},
        {value:'contacto_emergencia-0', label:'Contacto Emergencia'},
        {value:'tel_contacto_emergencia-0', label:'Tel Contacto Emergencia'},
    ]

    const switchExportAll = (value) =>{
        if(value){
            setDataCampos(['nombres','apellidos','numero_identificacion','genero','fecha_nacimiento','correo_electronico','celular','telefono_fijo','fecha_ingreso','num_cuenta','riesgo','direccion','fecha_expedicion_doc','contacto_emergencia','tel_contacto_emergencia'])
            setDataForaneas(['tipo_identificacion','nacionalidad','estado_civil','empresa','centro_costo','cargo','tipo_contrato',['tiempo','tipo_tiempo','tiempo'],'estado_contrato','banco','tipo_cuenta',['estudios_realizados','estudios','estudios'],'talla_camisa','talla_pantalon','talla_calzado','eps','arl','pension','cesantias',['caja_compensacion','ccf','caja_comp']])
            setCiudad(['lugar_nacimiento','lugar_trabajo','lugar_exp_doc'])
            setMontos(['salario','aux_movilidad'])
            setDataJefeZona(true) 
        }else{
            setDataCampos([])
            setDataForaneas([])
            setCiudad([])
            setMontos([])
            setMontos([])
            setDataJefeZona(false)
        }
        setSwitchValue(value)
    }

    const [ condiciones, setCondiciones] = useState([])

  return <div className='h-30rem'>
        {loading&&<div className='fixed top-0 right-0 w-screen h-screen z-5 flex justify-content-center align-items-center' style={{background:'rgba(1,1,1,0.1)'}}>
            <div className="card">
                Cargando 
                <i className='pi pi-spin pi-spinner text-xl ml-3'/>
            </div>
        </div>}
        <div className="card w-10 mx-6">
            <p className='text-700 font-xl'>En el siguiente espacio podra generar una descarga de toda la información de los empleados que estan registrados en el sistema.</p>
        </div>
        
        <h5>Exportar todo</h5>
        <InputSwitch checked={switchValue} className="block mb-4" onChange={(e) => switchExportAll(e.value)} />
        {!switchValue &&
            <>
                <h5>Seleccione Los campos para exportar</h5>

                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <b>Datos Basicos</b>
                        <Checkbox className='mx-3' inputId="DatosBasicosCheck" name="option"  value={"datosBasicosCheck"} checked={checkboxValue.indexOf("datosBasicosCheck") !== -1} onChange={(e) => onCheckboxChangeGrup(e,['datosBasicosCheck','nombres-0','apellidos-0','tipo_identificacion-1','numero_identificacion-0','genero-0','fecha_nacimiento-0','lugar_nacimiento-2','nacionalidad-1','estado_civil-1','correo_electronico-0','celular-0','telefono_fijo-0'])} />
                    </div>
                </Divider>
                    
                    <div className="grid">
                        {
                            valuesDatosBasicos.map((el,id)=>{
                                return(
                                <div key={id} className="col-6 sm:col-4">
                                    <div className="field-checkbox">
                                        <Checkbox inputId={"checkOption"+id} name="option" value={el.value} checked={checkboxValue.indexOf(el.value) !== -1 } onChange={onCheckboxChange} />
                                        <label htmlFor={"checkOption"+id}>{el.label}</label>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <b>Empresa</b>
                        <Checkbox className='mx-3' inputId="EmpresaCheck" name="option"  value={"EmpresaCheck"} checked={checkboxValue.indexOf("empresaCheck") !== -1} onChange={(e)=>onCheckboxChangeGrup(e,['empresaCheck','empresa-1','lugar_trabajo-2','centro_costo-1','cargo-1','tipo_contrato-1','tiempo-1-tipo_tiempo-tiempo','fecha_ingreso-0','estado_contrato-1','jefe_zona-4'])} />
                    </div>
                </Divider>
                    
                    <div className="grid">
                        {
                            valuesEmpresa.map((el,id)=>{
                                return(
                                <div key={id} className="col-6 sm:col-4">
                                    <div className="field-checkbox">
                                        <Checkbox inputId={"checkOption"+id} name="option" value={el.value} checked={checkboxValue.indexOf(el.value) !== -1} onChange={onCheckboxChange} />
                                        <label htmlFor={"checkOption"+id}>{el.label}</label>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <b>Complementarios</b>
                        <Checkbox className='mx-3' inputId="ComplementariosCheck" name="option"  value={"ComplementariosCheck"} checked={checkboxValue.indexOf("complementariosCheck") !== -1} onChange={(e)=>onCheckboxChangeGrup(e,['complementariosCheck','salario-3','aux_movilidad-3','banco-1','tipo_cuenta-1','num_cuenta-0','riesgo-0','estudios_realizados-1-estudios-estudios','talla_camisa-1','talla_pantalon-1','talla_calzado-1'])} />
                    </div>
                </Divider>
                    
                    <div className="grid">
                        {
                            valuesComplementarios.map((el,id)=>{
                                return(
                                <div key={id} className="col-6 sm:col-4">
                                    <div className="field-checkbox">
                                        <Checkbox inputId={"checkOption"+id} name="option" value={el.value} checked={checkboxValue.indexOf(el.value) !== -1} onChange={onCheckboxChange} />
                                        <label htmlFor={"checkOption"+id}>{el.label}</label>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                <Divider align="left">
                    <div className="inline-flex align-items-center">
                        <b>Afiliaciones</b>
                        <Checkbox className='mx-3' inputId="AfiliacionesCheck" name="option"  value={"AfiliacionesCheck"} checked={checkboxValue.indexOf("afiliacionesCheck") !== -1} onChange={(e)=>onCheckboxChangeGrup(e,['afiliacionesCheck','eps-1','arl-1','pension-1','cesantias-1','caja_compensacion-1-ccf-caja_comp','direccion-0','fecha_expedicion_doc-0','lugar_exp_doc-2','contacto_emergencia-0','tel_contacto_emergencia-0'])} />
                    </div>
                </Divider>
                    
                    <div className="grid">
                        {
                            valuesAfiliaciones.map((el,id)=>{
                                return(
                                <div key={id} className="col-6 sm:col-4">
                                    <div className="field-checkbox">
                                        <Checkbox inputId={"checkOption"+id} name="option" value={el.value} checked={checkboxValue.indexOf(el.value) !== -1} onChange={onCheckboxChange} />
                                        <label htmlFor={"checkOption"+id}>{el.label}</label>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
            </>
            }
            <h5>Filtrar Información</h5>
            <InputSwitch checked={switchValue2} className="block mb-4" onChange={(e) => setSwitchValue2(e.value)} />
            {switchValue2&&<>
                <FiltrarInformacion condiciones={condiciones} setCondiciones={setCondiciones} toast={params.toast}/>
            </>}

            {(switchValue&&!switchValue2)&&<Message severity="info" className='w-full mb-4' text="Es recomendable filtrar la información, por tiempos de respuesta del servidor" />}

            <Button label="Generar" loading={loading} onClick={consultarDatos} className="p-button-outlined mr-2 mb-4 block" />
    </div>;
};

export default GenerarReporte;
