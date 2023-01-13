import { useFormik } from 'formik';
import CredencialService from '../services/CredencialService';

const credencialService = new CredencialService()
class FormikCuenta {
    formik(options){     
        return useFormik({
            initialValues: {
                oldPass:'',
                newPass:'',
                pass2:''
            },
            validate: data =>{
                let errors = {}

                if(!data.oldPass){
                    errors.oldPass = 'Debe ingresar un valor para la contraseña anterior'
                }

                if(!data.newPass){
                    errors.newPass = 'Debe ingresar un valor para la nueva contraseña'
                }else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(data.newPass)){
                    errors.newPass = 'La contraseña no cumple con el minimo requerido'
                }

                if(!data.pass2){
                    errors.pass2 = 'Debe ingresar una Confirmación de la contraseña'
                }else if(!data.newPass ===data.pass2){
                    errors.pass2 = 'Las contraseñas no coinciden'
                }


                return errors
            },
            onSubmit: data =>{
                credencialService.changePass(data).then(res=>{
                    options.hideModal()
                    if(res.status===201)
                        options.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 });
                    else
                        options.toast.current.show({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 });
                        
                })
            }
        })
    }
}

export default FormikCuenta