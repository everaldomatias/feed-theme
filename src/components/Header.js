import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';

const Header = ({ feed }) => {

    const [logoImg, setLogoImg] = useState(null);
    const appTitle = window.feed.appTitle;

    useEffect(() => {
        if (window.feed.logoId) {
            fetch(`/wp-json/wp/v2/media/${window.feed.logoId}`)
                .then(response => response.json())
                .then(logo => {
                    setLogoImg(logo.source_url);
                });
        }
    }, [window.feed.logoId]);

    return (
        <>
            <div className="app-header">
                {
                    logoImg
                        ? <img className="logo" src={logoImg} alt="logo" />
                        : <h1>{appTitle}</h1>
                }

                <div className="details">
                    <Sidebar />
                </div>
            </div>
        </>
    );
};

export default Header;
