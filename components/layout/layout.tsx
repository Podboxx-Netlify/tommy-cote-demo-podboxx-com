import Header from './header'
import Footer from './footer'
import React from "react";
import Image from "next/image";

export default function Layout({...props}) {
    return (
        <div className="flex flex-col min-h-screen bg-03dp">
            <Header data={props.website}/>
            <a href='https://codeboxx.biz/' target="_blank"
               rel="noopener noreferrer"
               className="ad-left left-0 invisible 2xl:visible ml-4 pointer transform transition duration-500 hover:scale-105 absolute"
               style={{
                   backgroundImage: `url('./ad_300x250_school_A.png')`,
                   backgroundSize: 'contain',
                   backgroundRepeat: 'no-repeat',
                   marginTop: '500px'
               }}/>
            <a href='https://codeboxx.dev/' target="_blank"
               rel="noopener noreferrer"
               className="ad-right right-0 invisible 2xl:visible mr-4 pointer transform transition duration-500 hover:scale-105 absolute"
               style={{
                   backgroundImage: `url('./ad_300x250_workshop_A.png')`,
                   backgroundSize: 'contain',
                   backgroundRepeat: 'no-repeat',
                   marginTop: '500px'
               }}/>
            <div className='container mx-auto flex-grow'>
                {props.children}
            </div>
            {/*<div className="ad-mobile visible 2xl:invisible h-44 mt-5 mx-auto">*/}
            {/*<a className='h-44'*/}
            {/*     style={{*/}
            {/*         backgroundImage: `url('./ad_300x250_school_A.png')`,*/}
            {/*         backgroundSize: 'contain',*/}
            {/*         backgroundPosition: 'top',*/}
            {/*         backgroundRepeat: 'no-repeat',*/}
            {/*     }}/>*/}
            {/*<a className='h-44'*/}
            {/*     style={{*/}
            {/*         backgroundImage: `url('./ad_300x250_workshop_A.png')`,*/}
            {/*         backgroundSize: 'contain',*/}
            {/*         backgroundPosition: 'top',*/}
            {/*         backgroundRepeat: 'no-repeat',*/}
            {/*     }}/>*/}


            {/*<a href='https://codeboxx.biz/' target="_blank"*/}
            {/*   rel="noopener noreferrer"*/}
            {/*   className="h-44 visible 2xl:invisible ml-2 pointer transform transition duration-500 hover:scale-105"*/}
            {/*   style={{*/}
            {/*       backgroundImage: `url('./ad_300x250_school_A.png')`,*/}
            {/*       backgroundSize: 'contain',*/}
            {/*       backgroundRepeat: 'no-repeat',*/}
            {/*   }}/>*/}
            {/*<a href='https://codeboxx.dev/' target="_blank"*/}
            {/*   rel="noopener noreferrer"*/}
            {/*   className="h-44 mt-5 visible 2xl:invisible ml-2 pointer transform transition duration-500 hover:scale-105 sticky"*/}
            {/*   style={{*/}
            {/*       backgroundImage: `url('./ad_300x250_workshop_A.png')`,*/}
            {/*       backgroundSize: '350 250',*/}
            {/*       backgroundRepeat: 'no-repeat',*/}
            {/*   }}/>*/}
            <div className="mx-auto mt-5">
                <a href='https://codeboxx.biz/' target="_blank"
                   rel="noopener noreferrer" className='visible 2xl:invisible'>
                    <Image
                        alt="Header"
                        src="/ad_300x250_school_A.png"
                        className="pointer mx-3"
                        width={300}
                        height={250}
                        quality={100}
                        unoptimized={true}
                    />
                </a>
                <a href='https://codeboxx.dev/' target="_blank"
                   rel="noopener noreferrer" className='visible 2xl:invisible'>
                    <Image
                        alt="Header"
                        src="/ad_300x250_workshop_A.png"
                        className="pointer mx-3"
                        width={300}
                        height={250}
                        quality={100}
                        unoptimized={true}
                    />
                </a>
            </div>
            <Footer data={props.website}/>
        </div>
    );
}