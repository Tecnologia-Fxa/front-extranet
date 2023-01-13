import React, { useState } from 'react';
export const LayoutContext = React.createContext();

import { useCookies } from "react-cookie"



export const LayoutProvider = (props) => {

    const [cookie] = useCookies(["inputStyle","ripple","menuMode"])
    

    const [layoutConfig, setLayoutConfig] = useState({
        ripple:/*  cookie.ripple==="false"?false: */true,
        inputStyle: /* cookie.inputStyle?cookie.inputStyle: */"outlined",
        menuMode:/*  cookie.menuMode?cookie.menuMode: */'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });


    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
        } else {
            setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle
    };

    return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>;
};
