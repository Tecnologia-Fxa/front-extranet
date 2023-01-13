import getConfig from 'next/config';
import Image from 'next/image';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">
            <Image
                src={`/extranet-fxa/demo/images/logo-fxa-version-${layoutConfig.colorScheme === 'light' ? 'negra' : 'blanca'}.svg`}
                alt="Logo"
                height={20}
                width={30}
            />
            <span className="ml-2">by</span>
            <span className="font-medium ml-2">Fuxia</span>
        </div>
    );
};

export default AppFooter;
