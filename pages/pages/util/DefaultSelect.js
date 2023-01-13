import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';


export const DefaultSelect = (params) => {

    const [itemSeleccionado, setItemSeleccionado] = useState(params.id);
    const [items, setitems] = useState(null);


    useEffect(()=>{
      setItemSeleccionado(params.id)
    }, [params.id])

    useEffect(() => {
        const ItemService  = require(`../../../services/DefaultService`);
        const itemService = ItemService.default(params.serviceName)
        const service = new itemService()
        service.getAll().then(res=>{
            setitems(res.data)
            })
    }, [params.serviceName]); 
    
    const onChange = (e) => {
        setItemSeleccionado(e.value);
        params.onChange(e)
    }

  return (
    <Dropdown className={params.className} name={params.name} dropdownIcon={null} value={itemSeleccionado} options={items} onChange={onChange} optionLabel={params.nombre_def} optionValue={params.id_def} filter filterBy={params.nombre_def} placeholder=""
    emptyMessage="No se encontraron resultados" emptyFilterMessage="No se encontraron resultados" />
  );

};

 
export default DefaultSelect