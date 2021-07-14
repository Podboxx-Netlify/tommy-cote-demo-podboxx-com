import Header from './header'
import Footer from './footer'
import React from "react";
import Image from "next/image";
// import UserProvider from '../userContext/user-context'

export default function Layout({...props}) {
    return (
        // <UserProvider>
        <div className="flex flex-col min-h-screen bg-03dp">
            <Header data={props.website}/>
            {/*<div className="hero h-96 mb-5"*/}
            {/*     style={{backgroundImage: `url('./header_blog.png')`}}>*/}
            {/*    <div className="hero-overlay bg-opacity-60"/>*/}
            {/*</div>*/}
            <div className='container mx-auto flex-grow'>
                {props.children}
            </div>
            {/*<VerticalAd/>*/}
            <Footer data={props.website}/>
        </div>
        // </UserProvider>
    );
}