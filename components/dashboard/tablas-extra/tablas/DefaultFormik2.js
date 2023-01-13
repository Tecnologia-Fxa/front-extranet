import { useFormik } from 'formik';

class DefaultFormik {
    formik(options){     
        const ItemService  = require(`../../../../services/DefaultService`);
        const itemService = ItemService.default(options.name)
        const service = new itemService()

        let formik = useFormik({
            initialValues: {
                monto:''
            },
            validate: data =>{
                let errors = {}
                
                if (!data.monto) {
                    errors.monto = 'El monto es obligatorio';
                }else if(!/^\d+$/.test(data.monto)){
                    errors.monto = `El monto tiene que ser un numero`;
                }else if(!(parseInt(data.monto)>=50000)){
                    errors.monto = `El monto tiene que ser mayor o igual a $50.000`;
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