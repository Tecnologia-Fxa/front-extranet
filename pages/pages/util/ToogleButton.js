import React, { useEffect, useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';


export const ToogleButton = (params) => {

    const [itemSeleccionado, setItemSeleccionado] = useState(params.id);

    useEffect(()=>{
      setItemSeleccionado(params.id)
    }, [params.id])
    
    const onChange = (e) => {
        setItemSeleccionado(e.value);
        params.onChange(e)
    }

  return (
      <ToggleButton className='inputForm toggleButtonStyle' iconPos='right' id={params.name} checked={itemSeleccionado} onChange={onChange} onLabel="Femenino" offLabel="Masculino" onIcon="pi pi-moon" offIcon="pi pi-sun" />
  );

};

 
export default ToggleButton