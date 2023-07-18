import React, { useState } from 'react'

import { TabMenu } from 'primereact/tabmenu';
import ConvocatoriasFuturas from './estado/ConvocatoriasFuturas';
import ConvocatoriasPasadas from './estado/ConvocatoriasPasadas';


const ConvocatoriasGeneral = (props) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const tabMenuItems=[
        {label:'Proximas Convocatorias', icon:'pi pi-eye'},
        {label:'Convocatorias Pasadas', icon:'pi pi-eye-slash'}
    ]

    

  return (
    <div>
        <div className='flex align-items-center	justify-content-between my-4'>
            <h2>Convocatorias Inactivas <i className='pi pi-arrow-circle-left cursor-pointer' style={{fontSize:"1.5rem"}} onClick={()=>props.setVistaConvocatorias(true)}/></h2>
        </div>

        <TabMenu model={tabMenuItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />

        {activeIndex == 0 && <>
            <ConvocatoriasFuturas/>
        </>}

        {activeIndex == 1 && <>
            <ConvocatoriasPasadas/>
        </>}
    </div>
  )
}

export default ConvocatoriasGeneral