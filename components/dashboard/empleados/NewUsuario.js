import React from 'react';
import classNames from 'classnames';
import { TabPanel, TabView } from 'primereact/tabview';
import Datos from './tabMenuNew/Datos';
import Empresa from './tabMenuNew/Empresa';
import Extras from './tabMenuNew/Extras';
import Riesgos from './tabMenuNew/Riesgos';

const NewUsuario = (params) => {
  
    const isFormFieldValid = (name) => !!(params.formik.touched[name] && params.formik.errors[name]);

    const headerTab = (label, errorItem, icon) =>{
        return (
            <span className={classNames({ 'p-error font-bold': isFormFieldValid(errorItem) })}><i className={isFormFieldValid(errorItem)?"pi pi-exclamation-circle":icon}/>{label}</span>
        )
    }

    return (
    <div>
        <div className="card">
            <form onSubmit={params.formik.handleSubmit}>
            <TabView className='hidden xl:block lg:block md:block sm:block'>
                            <TabPanel header={headerTab('Datos','datos','pi pi-user')}>
                                <Datos formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Empresa','empresa','pi pi-building')}>
                                <Empresa formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Complementarios','extras','pi pi-paperclip')}>
                               <Extras formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('Afiliaciones','riesgos','pi pi-heart-fill')}>
                               <Riesgos formik={params.formik}/>
                            </TabPanel>
                        </TabView>
                        <TabView className='block xl:hidden lg:hidden md:hidden sm:hidden'>
                            <TabPanel header={headerTab('','datos','pi pi-user')}>
                                <Datos formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','empresa','pi pi-building')}>
                                <Empresa formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','extras','pi pi-paperclip')}>
                                <Extras formik={params.formik}/>
                            </TabPanel>
                            <TabPanel header={headerTab('','riesgos','pi pi-heart-fill')}>
                                <Riesgos formik={params.formik}/>
                            </TabPanel>
                        </TabView>
            </form>
        </div>
    </div>
  )
};

export default NewUsuario;
