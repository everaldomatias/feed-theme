import React, { useState, useEffect } from 'react'
import Posts from './Posts';

const Content = () => {
    return (
        <>
            <div className="app-content">
                <Posts />
            </div>
        </>
    )
}

export default Content