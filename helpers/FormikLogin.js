import { useFormik } from 'formik';
import axios from 'axios';
import CredencialService from '../services/CredencialService';

const credencialservice = new CredencialService()

class FormikLogin {

    formikLog(params){     
        let formik = useFormik({
            initialValues: {
                nombre_usuario:'',
                contraseña:''
            },
            validate: data =>{
                let errors = {}
                
                if (!data.nombre_usuario) {
                    errors.nombre_usuario = 'Ingrese su usuario';
                }else if(!(data.nombre_usuario.length >= 3 && data.nombre_usuario.length <= 25)){
                    errors.nombre_usuario = 'Cantidad de caracteres de 3 a 25 .';
                }
    
                if (!data.contraseña) {
                    errors.contraseña = 'Ingrese su contraseña';
                }

                return errors

            },
            onSubmit: data =>{
                credencialservice.login(data).then(res=>{
                    if(res.status===201){
                        localStorage.setItem('token', res.data.tokenlog)
                        axios.defaults.headers.common['token-login'] = localStorage.getItem('token')
                        if(res.data.tipoUsuario==='Empleado'){
                            params.history.push('/dashboard/perfil')
                        }else{
                            params.history.push('/dashboard')
                        }
                    }else{
                        formik.resetForm()
                        params.setToastLog({ severity: 'error', summary: 'Error', detail: res.data, life: 3000 })    
                    }
                })
            }
        })
        return formik
    }
}

export default FormikLogin