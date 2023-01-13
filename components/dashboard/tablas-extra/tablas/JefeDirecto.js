import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import JefeDirectoService from '../../../../services/JefeDirectoService';

const JefeDirecto = (props) => {

    const toast = useRef(null);

    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);

    const op = useRef(null);
    const [data, setData] = useState([])

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            });
        setGlobalFilterValue1('');
    }

    const jefeDirectoService = new JefeDirectoService()
    
    const [estadoPagina, setEstadoPagina] = useState(false)

    useEffect(() => {
        if(!props.jefeZona[0] || estadoPagina === true){
            jefeDirectoService.getTableData().then(res=>{
                props.setJefeZona(res.data)
                setData(res.data)
                setLoading1(false)
                setEstadoPagina(false)
            })
        }else{
            setData(props.jefeZona)
            setLoading1(false)
        }

        initFilters1();
    }, [estadoPagina]); //eslint-disable-line
    
    const [empleados, setEmpleados] = useState([])
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null)

    const openOverlay = (e) =>{
        jefeDirectoService.getEmp().then(res=>{
            setEmpleados(res.data)
            op.current.toggle(e)
        })
    }

    const header1 = () => {
        return (
            <div className="grid">
                <div className='col-12 xl:col-9 lg:col-8 md:col-8 sm:col-7'>
                    <h5 className='inline-block mx-4'>Jefes</h5>
                    <Button onClick={(e) => openOverlay(e)} tooltip='Nuevo Jefe' className="p-button-text p-button-rounded p-button-outlined mb-3 inline-block"><i className='pi pi-plus'/></Button>
                </div>
                <div className='col-12 xl:col-3 lg:col-4 md:col-4 sm:col-5'>
                    <span className="p-input-icon-left mb-2 w-full">
                        <i className="pi pi-search" />
                        <InputText className=' w-full' value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar" />
                    </span>
                </div>
            </div>
        )
    }


    const borrarJefe = (id) =>{
        jefeDirectoService.deleteJefe({id_empleado:id}).then(res=>{
            props.toast.current.show({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 4000 })
            reload()
        })
    }

    const eliminarData = (rowData) =>{
        if(rowData.empleados > 0){
            props.toast.current.show({ severity: 'error', summary: 'Error', detail: "No se puede borrar un jefe que ya tiene empleados relacionados", life: 4000 })
        }else{
            confirmDialog({
            header: '¿Está seguro de realizar esta acción?',
            accept:()=>borrarJefe(rowData.id_empleado),
            acceptLabel:'Seguro!'
            })
        }
    }

    const bodyEliminar = (rowData) =>{
        return (
            <Button onClick={()=>eliminarData(rowData)} className='p-button-secondary p-button-text p-button-rounded' icon='pi pi-trash'/>
        )
    }

    const [toatsEmpelado, setToatsEmpelado] = useState({});

    useEffect(()=>{
        if(toatsEmpelado.severity){
            toast.current.show(toatsEmpelado);
        }
    },[toatsEmpelado])

    const reload = () =>{
        setEstadoPagina(true)
    }

    

    const [selectedOptionButton, setSelectedOptionButton] = useState('nombres')

    const OptionsButton = [
        {name:'Nombres', value:'nombres'},
        {name:'Apellidos', value:'apellidos'},
        {name:'Identificación', value:'numero_identificacion'}
    ]

    const changeValueOption = (e) =>{
        setSelectedOptionButton(e.value)
    }

    const onEmpleadoChange = (e) =>{
        setEmpleadoSeleccionado(e.value)
    }

    const saveJefe = () =>{
        jefeDirectoService.newJefe({id_empleado:empleadoSeleccionado.id_empleado}).then(res=>{
            setToatsEmpelado({ severity: 'success', summary: 'Todo Bien', detail: res.data, life: 3000 })
            reload()
            op.current.hide()
        })
    }

    const API = process.env.REACT_APP_API + '/img/perfil'

    return <div>
        <Toast ref={toast} position="bottom-right"/>
       <DataTable value={data} paginator className="p-datatable-customers" rows={10}
        dataKey="id" filters={filters1} rowsPerPageOptions={[10, 25, 50, 100, 200]} size="small" filterDisplay="menu" loading={loading1} responsiveLayout="scroll" 
        globalFilterFields={['nombres','apellidos','numero_identificacion', 'empleados']} header={header1} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" emptyMessage="No se encontro información" currentPageReportTemplate="Registros {first} a {last} de un total de {totalRecords}">
            <Column field='nombres' header="Nombre" sortable/>
            <Column header="Apellidos" style={{ minWidth: '5rem' }} sortable field='apellidos'/>
            <Column header="Identificacion" style={{ minWidth: '5rem' }} sortable field='numero_identificacion'/>
            <Column header="Empleados" style={{ minWidth: '5rem' }} sortable field='empleados'/>
            <Column body={bodyEliminar} headerStyle={{ width: '10%', minWidth: '2rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>

        <OverlayPanel ref={op} onHide={()=>setEmpleadoSeleccionado(null)} showCloseIcon id="overlay_panel" style={{ width: '300px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }} breakpoints={{'640px': '90vw'}}>
            <div className='w-full text-center'>
                <h4>Nuevo Jefe</h4>
            </div>
            
            <h5>Filtrar Empleados Por:</h5>
            <SelectButton unselectable={false} value={selectedOptionButton} options={OptionsButton} optionLabel="name" onChange={(e) => changeValueOption(e)} />
            <div className="col-12 mt-5">
                <span className="p-float-label">
                    <Dropdown resetFilterOnHide className='w-full' dropdownIcon={null} value={empleadoSeleccionado} options={empleados} onChange={onEmpleadoChange} optionLabel={selectedOptionButton} filter filterBy={selectedOptionButton} placeholder=""
                    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
                    <label>Empleados:</label>
                </span>
            </div>
            { empleadoSeleccionado && <>
                <h5>Empleado Seleccionado:</h5>
                <div className="w-full flex justify-content-center my-2"><img className='border-circle' width={60} height={60} src={empleadoSeleccionado.src_fotografia?`${API}/${empleadoSeleccionado.src_fotografia}`:`${API}/UsuarioDefault.webp`} alt="Foto Empleado" /></div> 
                <div className='font-medium'>{empleadoSeleccionado.nombres} {empleadoSeleccionado.apellidos}</div>
                <div>Identificación: {empleadoSeleccionado.numero_identificacion}</div>
                <Button onClick={saveJefe} label='Guardar' className='mt-4 w-full'/>
            </>}
        </OverlayPanel>
    </div>;
};

export default JefeDirecto;
