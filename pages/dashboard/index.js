import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EmpleadoService } from '../../services/EmpleadoService';
import CredencialService from '../../services/CredencialService';

import dashboardStyle from './dashboard.module.css'
import Router from 'next/router';

const Dashboard = () => {

    const [empleadosNuevos, setEmpleadosNuevos] = useState(null);
    const [porcentajeEmpleados, setPorcentajeEmpleados] = useState([{},{},{},{},{},{},{},{}]);
    const [datosCards, setDatosCards] = useState({
        card1:{
            usuarios:"",
            soporte:"",
            admin:""
        },
        card2:[{},{},{}],
        card3:[]
    });
    const [sesionData, setSesionData] = useState({})

    useEffect(() => {
        const empleadoService = new EmpleadoService()
        const credencialService = new CredencialService()
        empleadoService.getEmpleadosDash().then(items=> {
            setEmpleadosNuevos(items?items.data:"") 
        })
        empleadoService.getDatosCardsDash().then(items=>{
            setDatosCards(items?items.data:"")
        })
        empleadoService.getPorcentajeEmpleado().then(items=>{
            setPorcentajeEmpleados(items?items.data:"")
        })
        
        credencialService.getDatatopbar().then(res=>{
            setSesionData(res?res.data:"")
        })

    }, []);

    const handleRedireccionUsu = () =>{
        Router.push('/dashboard/usuarios')
    }

    const [todasCiudades, setTodasCiudades] = useState(false)

    return (
        <div className="grid">
            {empleadosNuevos && porcentajeEmpleados && datosCards && <>
                <div className="col-12 lg:col-6 xl:col-5">
                    <div className="card mb-0">
                        <span className="block text-xl font-medium mb-3">¡Bienvenido {sesionData.nombre}!</span>
                        <div className="text-600 font-medium mb-3">Para ver tus datos personales ve a la sección de perfil.</div>
                        <Button label="Ver Perfil" onClick={()=>Router.push('/dashboard/perfil')} className="p-button-link text-pink-300 font-medium"></Button>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-7">
                    <div className="card mb-0">
                        <span className="block text-xl font-medium mb-2">SIGE</span>
                        <div className="text-600 font-medium mb-2">Acceso rapido a los modulos del sistema</div>
                        <Button label='Usuarios' onClick={()=>Router.push('/dashboard/usuarios')} icon="pi pi-users" className="p-button-text text-pink-400 mr-2 mb-2"></Button>
                        <Button label='Permisos' onClick={()=>Router.push('/dashboard/permisos')} icon="pi pi-user-edit" className="p-button-text text-pink-400 mr-2 mb-2"></Button>
                        <Button label='Perfil' onClick={()=>Router.push('/dashboard/perfil')} icon="pi pi-pencil" className="p-button-text text-pink-400 mr-2 mb-2"></Button>
                        <Button label='Documentos' onClick={()=>Router.push('/dashboard/documentos')} icon="pi pi-folder" className="p-button-text text-pink-400 mr-2 mb-2"></Button>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className={dashboardStyle["cardHover"]+" card mb-0"} onClick={handleRedireccionUsu}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Usuarios</span>
                                <div className="text-900 font-medium text-xl">{datosCards.card1.usuarios}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="pi pi-user text-blue-500 text-xl"/>
                            </div>
                        </div>
                        <span className="text-pink-400 font-medium">{datosCards.card1.soporte} soporte sistema </span>
                        <div className="text-900 font-medium mt-2">{datosCards.card1.admin} admin sistema</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className={dashboardStyle["cardHover"]+" card mb-0"} onClick={handleRedireccionUsu}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">{datosCards.card2[0].nombre_ciudad}</span>
                                <div className="text-900 font-medium text-xl">{datosCards.card2[0].total_empleados_ciudad} Empleados</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className=" text-orange-500 text-xl font-medium">1°</i>
                            </div>
                        </div>
                        <span className="text-pink-400 font-medium">{datosCards.card2[0].nombre_centro_costo}</span>
                        <div className="text-900 font-medium mt-2 ">{datosCards.card2[0].total_empleados} Empleados</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className={dashboardStyle["cardHover"]+" card mb-0"} onClick={handleRedireccionUsu}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">{datosCards.card2[1].nombre_ciudad}</span>
                                <div className="text-900 font-medium text-xl">{datosCards.card2[1].total_empleados_ciudad} Empleados</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="text-cyan-500 text-xl font-medium">2°</i>
                            </div>
                        </div>
                        <span className="text-pink-400 font-medium">{datosCards.card2[1].nombre_centro_costo}</span>
                        <div className="text-900 font-medium mt-2">{datosCards.card2[1].total_empleados} Empleados</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className={dashboardStyle["cardHover"]+" card mb-0"} onClick={handleRedireccionUsu}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">{datosCards.card2[2].nombre_ciudad}</span>
                                <div className="text-900 font-medium text-xl">{datosCards.card2[2].total_empleados_ciudad} Empleados</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                <i className="text-purple-500 text-xl font-medium">3°</i>
                            </div>
                        </div>
                        <span className="text-pink-400 font-medium">{datosCards.card2[2].nombre_centro_costo}</span>
                        <div className="text-900 font-medium mt-2">{datosCards.card2[2].total_empleados} Empleados</div>
                    </div>
                </div>
                {todasCiudades &&
                    datosCards.card3.map((el,id)=>{
                        if(id>2)
                        return(
                            <div key={id} className="col-12 md:col-3 sm:col-6">
                                <div className={dashboardStyle["cardHover"]+" card mb-0"} onClick={handleRedireccionUsu}>
                                    <div className="flex justify-content-between">
                                        <div>
                                            <div className="text-700 font-medium text-xl  mb-2">{el.nombre_ciudad}</div>
                                            <span className="block text-500 font-medium">{el.total_empleados} Empleados</span>
                                        </div>
                                        <div className="flex align-items-center justify-content-center bg-pink-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                                            <i className="text-purple-600 font-medium text-xl">{id+1}°</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                        return true
                    })
                }

                <div className="col-offset-5 col-7"><Button className='p-button-text' onClick={()=>setTodasCiudades(!todasCiudades)}>{!todasCiudades?'Mostrar todas las ciudades':'Mostrar menos ciudades'}</Button></div>

                <div className="col-12 xl:col-7">
                    <div className="card">
                        <div className='flex justify-content-between alinig-items-center mb-5'>
                            <h5>Nuevos Empleados:</h5>
                            <Button label="Ver Todos" onClick={handleRedireccionUsu} className="p-button-outlined" />
                        </div>
                
                        <DataTable value={empleadosNuevos} rows={5} paginator responsiveLayout="scroll">
                            <Column field="nombres" header="Nombre" sortable/>
                            <Column field="empresa.nombre_empresa" header="Empresa" sortable/>
                            <Column field="centro_costo.nombre_centro_costo" header="Tienda" sortable  />
                            <Column field="fecha_ingreso" header="Ingreso" sortable  />
                            
                        </DataTable>
                    </div>
                    
                </div>

                <div className="col-12 xl:col-5">
                <div className="card">
                        <h5 className='mb-5'>Porcentaje De Empleados Por Empresa</h5>
                            
                        <ul className="list-none p-0 m-0">
                            {
                                porcentajeEmpleados.map((el,id)=>{
                                    return(
                                        <li key={id} className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                            <div>
                                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">{el.nombre_empresa}</span>
                                                <div className="mt-1 text-600">{el.total_empleados} empleados</div>
                                            </div>
                                            <div className="mt-2 md:mt-0 flex align-items-center">
                                                <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{height: '8px'}}>
                                                    <div className="bg-pink-500 h-full" style={{width: `${el.porcentaje}%`}}/>
                                                </div>
                                                <span className="text-pink-500 ml-3 font-medium">%{Math.trunc(el.porcentaje)}</span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>


                </div>
            </>}
        </div>
    );
}

export default Dashboard