import Header from './header'
import Footer from './footer'
import React from "react";

export default function Layout({...props}) {
    return (
        <div className="flex flex-col min-h-screen bg-03dp">
            <Header data={props.website}/>
            <div className="ad left-0 invisible 2xl:visible ml-20"
                 style={{
                     backgroundImage: `url('./codeboxx-logo.png')`,
                     backgroundSize: 'contain',
                     // backgroundPosition: 'top',
                     backgroundRepeat: 'no-repeat',
                     marginTop: '390px'
                 }}/>
            <div className='container mx-auto flex-grow'>
                {props.children}
            </div>
            <div className="ad-mobile visible 2xl:invisible h-24 mt-5"
                 style={{
                     backgroundImage: `url('./codeboxx-logo.png')`,
                     backgroundSize: 'contain',
                     // backgroundAttachment: 'scroll',
                     backgroundPosition: 'top',
                     backgroundRepeat: 'no-repeat',
                 }}/>
            <Footer data={props.website}/>
        </div>
    );
}