import { useFormik } from 'formik';
import EmpresaService from '../../../../services/EmpresaService';

const empresaService = new EmpresaService()

class EmpresaFormik {

    formik(options){     
        let formik = useFormik({
            initialValues: {
                nombre_empresa:'',
                nit:''
            },
            validate: data =>{
                let errors = {}
                
                if (!data.nombre_empresa) {
                    errors.nombre_empresa = 'Ingrese el nombre del centro de costo';
                }else if(!/^[A-Za-zá-ýÁ-Ý ._-]+$/.test(data.nombre_empresa)){
                    errors.nombre_empresa = 'El nombre solo permite caracteres de texto y -._';
                }else if(!(data.nombre_empresa.length >= 4 && data.nombre_empresa.length <= 50)){
                    errors.nombre_empresa = 'Cantidad de caracteres de 4 a 50 .';
                }
    
                if (!data.nit) {
                    errors.nit = 'El nit es obligatorio';
                }else if(!/^[\d-]+$/.test(data.nit)){
                    errors.nit = 'Solo acepta numeros y -';
                }else if(!(data.nit.length >= 6 && data.nit.length <= 15)){
                    errors.nit = 'Cantidad de caracteres de 6 a 15';
                }

                return errors

            },
            onSubmit: data =>{
                empresaService.createEmpresa(data).then(res=>{
                    if(res.status===201){
                        options.setShowToast({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 })
                        options.reload()
                        options.cloceOverlayNew()
                    }else{
                        options.setShowToast({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 })
                    }
                }) 
            }
        })
        return formik
    }
}

export default EmpresaFormik