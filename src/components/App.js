import React from 'react';
import Header from './Header';
import Content from './Content';
// import Logo from '../images/logo.png';

const App = () => {
  return (
    <>
     <div className="app">
        <Header />
        <Content />
        <h1>Hello, React in WordPress!!</h1>
     </div>
    </>
  );
};

export default App;
