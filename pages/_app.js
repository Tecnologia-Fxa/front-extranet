import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import Router from 'next/router';
import { CookiesProvider } from "react-cookie"
import axiosMethod from '../services/AxiosConfig'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


axiosMethod({router:Router, test:"test"})

export default function MyApp({ Component, pageProps }) {
    if (Component.getLayout) {
        return (
            <CookiesProvider>
                <LayoutProvider>
                    {Component.getLayout(<Component {...pageProps} />)}
                </LayoutProvider>
            </CookiesProvider>
        )
    } else if (Component.getNormalPage){
        return (
            <CookiesProvider>
                <Component />
            </CookiesProvider>
        )
    }else {
        return (
            <CookiesProvider>
                <LayoutProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LayoutProvider>
            </CookiesProvider>
        );
    }
}
