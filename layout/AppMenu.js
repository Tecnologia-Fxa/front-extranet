
import React, { useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import MenuItems from './MenuItems';

const AppMenu = () => {

    const [userLog, setUserLog] = useState({})
    useEffect(() => {
        
        const { CredencialServiceObjet } = require('../services/CredencialService')
        CredencialServiceObjet.getDatatopbar().then(res=>{
            setUserLog(res.data)
        })
    }, []);
    const model = MenuItems.optionsMenu(userLog.Rol)
    
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
