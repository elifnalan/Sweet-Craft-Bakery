import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Layout.css';

function Layout() {
    return (
        <>
            <Navbar />
            <div className='drip'>
                <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,0 L1440,0 L1440,20
                        C1380,20 1360,55 1340,55 C1320,55 1300,20 1280,20
                        C1240,20 1220,70 1200,70 C1180,70 1160,20 1140,20
                        C1100,20 1090,45 1070,45 C1050,45 1030,20 1010,20
                        C970,20 955,65 935,65 C915,65 895,20 875,20
                        C840,20 825,50 805,50 C785,50 765,20 745,20
                        C705,20 690,72 670,72 C650,72 630,20 610,20
                        C575,20 560,48 540,48 C520,48 500,20 480,20
                        C440,20 425,68 405,68 C385,68 365,20 345,20
                        C310,20 295,52 275,52 C255,52 235,20 215,20
                        C175,20 160,62 140,62 C120,62 100,20 80,20
                        C50,20 30,45 0,40 Z"
                    fill="#3D2B1F"/>
                </svg>
            </div>
            <Outlet />
        </>
    )
}

export default Layout;