import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import "./App.css"
import Form from './Components/Form';
import Header from './Components/Header';

const App = () => {
    return (
        <>
            <div className='container'>
                <div className='app-wrapper' style={{position : 'relative'}}>
                    <div>
                        <Header />
                    </div>
                </div>
                <div>
                    <Form/>
                </div>
            </div>
        </>
    );
}

export default App;