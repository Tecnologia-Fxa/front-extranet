import { useFormik } from 'formik';
import ConvocatoriaService from '../services/ConvocatoriaService';


class FormikConvocatorias {
    formik(options){     
        return useFormik({
            initialValues: {
                id_convocatoria:'',
                titulo:'',
                descripcion:'',
                id_ciudad_fk:'',
                id_centro_costo_fk:'',
                fecha_publicacion:'',
                fecha_finalizacion:'',
            },
            validate: data =>{
                let errors = {}

                if(!data.titulo){
                    errors.titulo = 'Debe ingresar un valor para el titulo'
                }else if(!/^[a-zA-Z0-9.\-_()#\s]+$/.test(data.titulo)){
                    errors.titulo = 'Solo se permiten caracteres alfanumericos y ".-_()#"'
                }else if(data.titulo.length < 4 ||data.titulo.length > 150){
                    errors.titulo = 'El titulo debe tener entre 4 y 150 caracteres'
                }

                if(!data.descripcion){
                    errors.descripcion = 'Debe ingresar un valor para la descripcion'
                }else if(data.descripcion.length < 4 ||data.descripcion.length > 600){
                    errors.descripcion = 'La descripcion debe tener entre 4 y 600 caracteres'
                }

                if(!data.id_ciudad_fk){
                    errors.id_ciudad_fk = 'Debe ingresar un valor para la ciudad'
                }

                if(!data.id_centro_costo_fk){
                    errors.id_centro_costo_fk = 'Debe ingresar un valor para el centro de costo'
                }

                if(!data.fecha_publicacion){
                    errors.fecha_publicacion = 'Debe ingresar un valor para la fecha de publicación'

                }

                if(!data.fecha_finalizacion){
                    errors.fecha_finalizacion = 'Debe ingresar un valor para la fecha de finalización'
                }else if(data.fecha_publicacion>=data.fecha_finalizacion){
                    errors.fecha_finalizacion = 'La fecha de finalización debe ser mayor a la de publicación'
                }


                
                return errors
            },
            onSubmit: data =>{
                console.log(options.isUpdate)
                if (!options.isUpdate) {
                    ConvocatoriaService.createConvocatoria(data).then(response=>{
                        if(response.status===201){
                            options.setToatsComponent({ severity: 'success', summary: 'Todo Bien', detail: response.data.message, life: 3000 })
                            options.hideModal()
                            options.reloadPage()
                        }else
                            options.setToatsComponent({ severity: 'error', summary: 'Error', detail: response.data, life: 3000 })
                    })
                }else{
                    ConvocatoriaService.updateConvocatoria(data).then(response=>{
                        if(response.status===201){
                            options.setToatsComponent({ severity: 'success', summary: 'Todo Bien', detail: response.data.message, life: 3000 })
                            options.hideModal()
                            options.reloadPage()
                        }else
                            options.setToatsComponent({ severity: 'error', summary: 'Error', detail: response.data, life: 3000 })
                    })
                }
            }
        })
    }
}

export default FormikConvocatorias