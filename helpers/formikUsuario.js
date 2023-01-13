import { useFormik } from 'formik';
import { EmpleadoService } from '../services/EmpleadoService';

const serviceEmpleado = new EmpleadoService()

class FormikEmp {
    formikUsuario(options){     
        return useFormik({
            initialValues: {},
            validate: data =>{
                let errors = {}
                
                if(!data.nombres){
                    errors.nombres = 'Los nombres Son Obligatorios.'
                }else if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(data.nombres)){
                    errors.nombres = 'El nombre solo acepta letras y espacios'
                }else if(!(data.nombres.length >= 3 && data.nombres.length <=25)){
                    errors.nombres = 'Cantidad de caracteres de 3 a 25.'
                }
                
                if(!data.apellidos){
                    errors.apellidos = 'Los apellidos son obligatorios.'
                }else if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(data.apellidos)){
                    errors.apellidos = 'El apellido solo acepta letras y espacios'
                }else if(!(data.apellidos.length >= 3 && data.apellidos.length <=25)){
                    errors.apellidos = 'Cantidad de caracteres de 3 a 25.'
                }

                if(!data.tipo_identificacion_fk){
                    data.tipo_identificacion_fk = undefined
                    errors.tipo_identificacion_fk = 'El tipo de identificacion es obligatorio.'
                }

                if(!data.numero_identificacion){
                    errors.numero_identificacion = 'El número de identificación es obligatorio.'
                }else if(!(data.numero_identificacion.length >= 6 && data.numero_identificacion.length <=20)){
                    errors.numero_identificacion = 'Cantidad de caracteres de 6 a 20'
                }else if(!/^\d{0,25}$/.test(data.numero_identificacion)){
                    errors.numero_identificacion = 'El número de identificación debe ser un número'
                }

                if(!data.fecha_nacimiento){
                    errors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria'
                }

                if(!data.lugar_nacimiento_fk){
                    data.lugar_nacimiento_fk = undefined
                    errors.lugar_nacimiento_fk = 'El lugar de nacimiento es obligatorio.'
                }

                if(!data.nacionalidad_fk){
                    data.nacionalidad_fk = undefined
                    errors.nacionalidad_fk = 'La nacionalidado es obligatoria.'
                }

                if(!data.estado_civil_fk){
                    data.estado_civil_fk = undefined
                    errors.estado_civil_fk = 'El estado civil es obligatorio.'
                }

                if (!data.correo_electronico) {
                    errors.correo_electronico = 'El Correo es obligatorio.';
                }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.correo_electronico)){
                    errors.correo_electronico = 'Debe ingresar un formato de correo valido.';
                }

                if(!data.celular){
                    errors.celular = 'El celular es obligatorio.'
                }else if(!(data.celular.length >= 5 && data.celular.length <=20)){
                    errors.celular = 'Cantidad de caracteres de 5 a 20'
                }else if(!/^\d{0,25}$/.test(data.celular)){
                    errors.celular = 'El celular debe ser un número'
                }

                if(!data.telefono_fijo){
                    errors.telefono_fijo = 'El telefono es obligatorio.'
                }else if(!(data.telefono_fijo.length >= 3 && data.telefono_fijo.length <=20)){
                    errors.telefono_fijo = 'Cantidad de caracteres de 3 a 20'
                }

                if(!data.contacto_emergencia){
                    errors.contacto_emergencia = 'Los contacto_emergencia Son Obligatorios.'
                }else if(!/^[A-Za-zá-ýÁ-Ý ]+$/.test(data.contacto_emergencia)){
                    errors.contacto_emergencia = 'El nombre solo acepta letras y espacios'
                }else if(!(data.contacto_emergencia.length >= 3 && data.contacto_emergencia.length <=30)){
                    errors.contacto_emergencia = 'Cantidad de caracteres de 3 a 30.'
                }

                if(!data.tel_contacto_emergencia){
                    errors.tel_contacto_emergencia = 'El telefono es obligatorio.'
                }else if(!(data.tel_contacto_emergencia.length >= 3 && data.tel_contacto_emergencia.length <=20)){
                    errors.tel_contacto_emergencia = 'Cantidad de caracteres de 3 a 20'
                }

                if(errors.nombres || errors.apellidos || errors.tipo_identificacion_fk || errors.numero_identificacion || errors.fecha_nacimiento || errors.lugar_nacimiento_fk || errors.nacionalidad_fk || errors.estado_civil_fk || errors.correo_electronico || errors.celular || errors.telefono_fijo || errors.contacto_emergencia || errors.tel_contacto_emergencia){
                    errors.datos = 'error'
                }

                if(!data.empresa_fk){
                    data.empresa_fk = undefined
                    errors.empresa_fk = 'La empresa es obligatoria.'
                }

                if(!data.lugar_trabajo_fk){
                    data.lugar_trabajo_fk = undefined
                    errors.lugar_trabajo_fk = 'El lugar de trabajo es obligatorio.'
                }

                if(!data.centro_costo_fk){
                    data.centro_costo_fk = undefined
                    errors.centro_costo_fk = 'El centro de costo es obligatorio.'
                }

                if(!data.cargo_fk){
                    data.cargo_fk = undefined
                    errors.cargo_fk = 'El cargo es obligatorio.'
                }

                if(!data.tipo_contrato_fk){
                    data.tipo_contrato_fk = undefined
                    errors.tipo_contrato_fk = 'El tipo de contrato es obligatorio.'
                }

                if(!data.tipo_tiempo_fk){
                    data.tipo_tiempo_fk = undefined
                    errors.tipo_tiempo_fk = 'El tipo de tiempo es obligatorio.'
                }

                if(!data.fecha_ingreso){
                    errors.fecha_ingreso = 'La fecha de ingreso es obligatoria'
                }

                if(!data.estado_contrato_fk){
                    data.estado_contrato_fk = undefined
                    errors.estado_contrato_fk = 'El estado de contrato es obligatorio.'
                }
                
                if(!data.jefe_directo_fk){
                    data.jefe_directo_fk = undefined
                    errors.jefe_directo_fk = 'Definir un jefe de zona es obligatorio.'
                }
                
                if(errors.empresa_fk || errors.lugar_trabajo_fk || errors.centro_costo_fk || errors.cargo_fk || errors.tipo_contrato_fk || errors.tipo_tiempo_fk || errors.fecha_ingreso || errors.estado_contrato_fk || errors.jefe_directo_fk){
                    errors.empresa = 'error'
                }

                if(!data.salario_fk){
                    data.salario_fk = undefined
                    errors.salario_fk = 'El salario es obligatorio.'
                }

                if(!data.aux_movilidad_fk){
                    data.aux_movilidad_fk = undefined
                    errors.aux_movilidad_fk = 'El auxilio de movilidad es obligatorio.'
                }

                if(!data.banco_fk){
                    data.banco_fk = undefined
                    errors.banco_fk = 'El banco es obligatorio.'
                }

                if(!data.tipo_cuenta_fk){
                    data.tipo_cuenta_fk = undefined
                    errors.tipo_cuenta_fk = 'El banco es obligatorio.'
                }

                if(!data.num_cuenta){
                    errors.num_cuenta = 'El número de cuenta es obligatorio.'
                }else if(!(data.num_cuenta.length >= 5 && data.num_cuenta.length <=20)){
                    errors.num_cuenta = 'Cantidad de caracteres de 5 a 20'
                }else if(!/^\d{0,25}$/.test(data.num_cuenta)){
                    errors.num_cuenta = 'El número de cuenta debe ser un número'
                }

                if(!data.riesgo){
                    errors.riesgo = 'El riesgo es obligatorio'
                }else if(!/^\d*\.?\d*$/.test(data.riesgo)){
                    errors.riesgo = 'El riesgo debe ser un numero decimal'
                }

                if(!data.estudios_fk){
                    data.estudios_fk = undefined
                    errors.estudios_fk = 'Los estudios son obligatorios.'
                }

                if(!data.talla_camisa_fk){
                    data.talla_camisa_fk = undefined
                    errors.talla_camisa_fk = 'La talla de camisa es obligatoria.'
                }

                if(!data.talla_pantalon_fk){
                    data.talla_pantalon_fk = undefined
                    errors.talla_pantalon_fk = 'La talla de pantalon es obligatoria.'
                }

                if(!data.talla_calzado_fk){
                    data.talla_calzado_fk = undefined
                    errors.talla_calzado_fk = 'La talla de calzado es obligatoria.'
                }

                if(errors.salario_fk || errors.aux_movilidad_fk || errors.banco_fk || errors.tipo_cuenta_fk || errors.num_cuenta || errors.riesgo || errors.estudios_fk || errors.talla_camisa_fk || errors.talla_pantalon_fk || errors.talla_calzado_fk){
                    errors.extras = 'error'
                }

                if(!data.eps_fk){
                    data.eps_fk = undefined
                    errors.eps_fk = 'La eps es obligatoria.'
                }

                if(!data.arl_fk){
                    data.arl_fk = undefined
                    errors.arl_fk = 'La arl es obligatoria.'
                }

                if(!data.pension_fk){
                    data.pension_fk = undefined
                    errors.pension_fk = 'La pension es obligatoria.'
                }

                if(!data.cesantias_fk){
                    data.cesantias_fk = undefined
                    errors.cesantias_fk = 'Las cesantias son obligatorias.'
                }

                if(!data.ccf_fk){
                    data.ccf_fk = undefined
                    errors.ccf_fk = 'La caja de compensacion es obligatoria.'
                }

                if(!data.direccion){
                    errors.direccion = 'La dirección es obligatoria.'
                }else if(!(data.direccion.length >= 3 && data.direccion.length <=50)){
                    errors.direccion = 'Cantidad de caracteres de 3 a 50'
                }

                if(!data.fecha_expedicion_doc){
                    errors.fecha_expedicion_doc = 'La fecha de expedición es obligatoria.'
                }

                if(!data.lugar_exp_doc_fk){
                    data.lugar_exp_doc_fk = undefined
                    errors.lugar_exp_doc_fk = 'El lugar de expedición del documenton es obligatorio.'
                }

                if(errors.eps_fk || errors.arl_fk || errors.pension_fk || errors.cesantias_fk || errors.ccf_fk || errors.direccion || errors.fecha_expedicion_doc || errors.lugar_exp_doc_fk ){
                    errors.riesgos = 'error'
                }
                return errors

            },
            onSubmit: data =>{
                if(data.id_empleado){
                    serviceEmpleado.updateEmpleado(data.id_empleado, data).then(res=>{
                        if(res.status===201){
                            options.setToatsEmpelado({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 })
                            options.hideModal()
                            options.reloadPage()
                        }else
                            options.setToatsEmpelado({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 })

                    })
                }else{
                    serviceEmpleado.createEmpleado(data).then(res=>{
                        if(res.status===201){
                            options.setToatsEmpelado({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 })
                            options.hideModal()
                            options.reloadPage()
                        }else
                            options.setToatsEmpelado({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 })

                    })
                } 
            }
        })
    }
}

export default FormikEmp