import React, { useState } from 'react';
import menuIcon from "../images/menu.svg";
import menuClose from "../images/close.svg";

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}><img src={menuIcon} /></button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={() => setIsOpen(false)}><img src={menuClose} /></button>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </div>
    </div>
  );
};

export default AccountMenu;
