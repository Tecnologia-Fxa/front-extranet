import { useFormik } from 'formik';

class DefaultFormik {
    formik(options){     
        const ItemService  = require(`../../../../services/DefaultService`);
        const itemService = ItemService.default(options.name)
        const service = new itemService()

        let formik = useFormik({
            initialValues: {
                nombre:''
            },
            validate: data =>{
                let errors = {}
                
                if (!data.nombre) {
                    errors.nombre = 'El nombre es obligatorio';
                }else if(!/^[A-Za-zá-ýÁ-Ý ._-]+$/.test(data.nombre)){
                    errors.nombre = 'El nombre solo permite letras y -_.';
                }else if(!(data.nombre.length >= options.minMax[0] && data.nombre.length <= options.minMax[1])){
                    errors.nombre = `Cantidad de caracteres de ${options.minMax[0]} a ${options.minMax[1]}`;
                }

                return errors

            },
            onSubmit: data =>{
                service.create(data).then(res=>{
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

export default DefaultFormik