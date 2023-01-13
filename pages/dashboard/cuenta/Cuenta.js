import React from 'react'
import classNames from 'classnames'
import { Password } from 'primereact/password'
import { Divider } from 'primereact/divider'
import FormikCuenta from '../../../helpers/FormikCuenta'
import { Button } from 'primereact/button'

const Cuenta = (params) => {
    
    const formikCuenta = new FormikCuenta()
    const formik = formikCuenta.formik({toast:params.toast,hideModal:params.hideModal}) 
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const headerPass = <h6>Contraseña</h6>;
    const footerPass = (
        <React.Fragment>
        <Divider />
        <p className="p-mt-2">Condiciones de seguridad:</p>
        <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
            <li>Se necesita una letra minuscula</li>
            <li>Se necesita una letra mayuscula</li>
            <li>Se necesita un numero</li>
            <li>Minimo 8 caracteres</li>
            <li>Maximo 16 caracteres</li>
        </ul>
        </React.Fragment>
    );

  return (
    <div className='grid'>
        <Divider/>
        <div className="col-12">
            <div className="field col p-inputgroup m-0" >
                <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                </span>
                <span className="p-float-label">
                    <Password
                    value={formik.values.oldPass}
                    id="oldPass"
                    name="oldPass"
                    toggleMask
                    feedback={false}
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('oldPass') })}
                    />
                    <label htmlFor="oldPass" className={classNames({ 'p-error': isFormFieldValid('oldPass') })}>Contraseña Anterior:</label>
                </span>
            </div>
            <div>{getFormErrorMessage('oldPass')}</div>
        </div>
        <div className="col-12">
            <div className="field col p-inputgroup m-0" >
                <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                </span>
                <span className="p-float-label">
                    <Password
                    value={formik.values.newPass}
                    id="newPass"
                    name="newPass"
                    toggleMask
                    promptLabel="Ingrese la contraseña"
                    weakLabel="Poco Segura"
                    mediumLabel="Medianamente Segura"
                    strongLabel="Muy Segura"
                    onChange={formik.handleChange}
                    header={headerPass}
                    content=""
                    footer={footerPass}
                    className={classNames({ 'p-invalid': isFormFieldValid('newPass') })}
                    />
                    <label htmlFor="newPass" className={classNames({ 'p-error': isFormFieldValid('newPass') })}>Nueva Contraseña:</label>
                </span>
            </div>
            <div>{getFormErrorMessage('newPass')}</div>
        </div>
        <div className="col-12">
            <div className="field col p-inputgroup m-0" >
                <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                </span>
                <span className="p-float-label">
                    <Password
                    value={formik.values.pass2}
                    id="pass2"
                    name="pass2"
                    toggleMask
                    feedback={false}
                    onChange={formik.handleChange}
                    className={classNames({ 'p-invalid': isFormFieldValid('pass2') })}
                    />
                    <label htmlFor="pass2" className={classNames({ 'p-error': isFormFieldValid('pass2') })}>Confirmación Contraseña:</label>
                </span>
            </div>
            <div>{getFormErrorMessage('pass2')}</div>
        </div>
        <div className='flex justify-content-end w-full mt-3'>
            <Button label="Cancelar" onClick={params.hideModal} className="p-button-secondary p-button-text mr-2 mb-2"></Button>
            <Button label="Guardar" type='button' onClick={formik.handleSubmit} className="mr-2 mb-2"></Button>
        </div>
    </div>
  )
}

export default Cuenta