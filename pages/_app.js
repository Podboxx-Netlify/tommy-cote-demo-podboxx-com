import '../styles/globals.scss'
import NProgress from 'nprogress'
import Router from 'next/router'
import Layout from "../components/layout/layout";
import React from "react";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({Component, pageProps, websiteData}) {
    return (
        <Layout website={websiteData}>
            <Component {...pageProps} website={websiteData}/>
        </Layout>
    )
}

MyApp.getInitialProps = async (Component, ctx) => {
    const websiteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.station_id}/website`)
    const websiteData = await websiteRes.json()
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps, websiteData};
}

export default MyApp

