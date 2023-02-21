import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast'
import { Password } from 'primereact/password';
import { Tooltip } from 'primereact/tooltip';
import React, { useRef, useEffect, useState } from 'react';
import FormikLogin from '../../helpers/FormikLogin';
import Router from 'next/router';


const Login = () => {
    const toast = useRef(null);

    const [toastLog, setToastLog] = useState({});

    useEffect(()=>{
        localStorage.removeItem('token')

        if(toastLog.severity){
            toast.current.show(toastLog);
        }
    },[toastLog]) //eslint-disable-line

    const formikLogin = new FormikLogin()
    const formik = formikLogin.formikLog({setToastLog:setToastLog, history:Router})
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

  return (
    <div className="flex align-items-center justify-content-center" style={{width: "100%", height: "100%", position: 'fixed'}}>
        <div className="card p-4">
            {process.env.NEXT_PUBLIC_RUTA_API + '/credencial'}
            <div className="flex align-items-center justify-content-center">
                    <form onSubmit={formik.handleSubmit} className="p-fluid relative">
                        <h5 className="text-center">Iniciar Sesión en SIGE</h5>
                        <div className="formgrid mt-5 mb-4 relative">
                            <div className="field col p-inputgroup m-0">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <span className="p-float-label">
                                    <InputText
                                    tooltip="Ingrese su nombre de usuario"
                                    tooltipOptions={{position: 'bottom'}}
                                    name="nombre_usuario"
                                    value={formik.values.nombre_usuario}
                                    onChange={formik.handleChange}
                                    autoFocus
                                    className={classNames({ 'p-invalid': isFormFieldValid('nombre_usuario') })}
                                    />
                                    <label htmlFor="nombre_usuario" className={classNames({ 'p-error': isFormFieldValid('nombre_usuario') })}>Usuario:</label>
                                </span>
                            </div>
                            <p className="mx-6 absolute" style={{top:'3rem'}}>{getFormErrorMessage('nombre_usuario')}</p>
                        </div>
                        <div className="formgrid relative mt-4 mb-5">
                            <div className="field col p-inputgroup m-0" >
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </span>
                                <span className="p-float-label">
                                    <Tooltip target=".contraseñaTooltip" position="bottom" >Ingrese su contraseña de acceso</Tooltip>
                                    <Password
                                    value={formik.values.contraseña}
                                    id="contraseña"
                                    name="contraseña"
                                    toggleMask
                                    feedback={false}
                                    onChange={formik.handleChange}
                                    className={"contraseñaTooltip "+classNames({ 'p-invalid': isFormFieldValid('contraseña') })} 
                                    />
                                    <label htmlFor="contraseña" className={classNames({ 'p-error': isFormFieldValid('contraseña') })}>Contraseña:</label>
                                </span>
                            </div>
                            <p className="mx-6 absolute" style={{top:'3rem'}}>{getFormErrorMessage('contraseña')}</p>
                        </div>
                        
                        <Button type="button" onClick={()=>Router.push('/login/recover-pass')} label="Olvidé mi contraseña" className="p-button-text absolute"  style={{bottom:"-15px"}}/>
                        {<Button type="submit" label="Ingresar" className="mb-4"/>}
                    </form>
            </div>

            <Toast ref={toast} position="bottom-right"/>

        </div>
    </div>
    )
};

Login.getLayout = function getLayout(page) {
    return page;
};

export default Login;
