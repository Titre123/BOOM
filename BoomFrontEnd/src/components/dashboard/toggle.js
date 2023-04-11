import React, { useContext, useState } from 'react';
import { MyToggle } from '../../pages/dashboard';
import '../../styles/dashboard/toggle.css'

function ToggleButton() {
  const [isToggled, setIsToggled] = useContext(MyToggle);

  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div style={{display: 'flex', gap: '1em', alignItems: 'center'}}>
        {isToggled ? <p style={{fontSize: '0.875rem'}}>Light Mode</p> : <p style={{fontSize: '0.875rem'}}>Dark Mode</p>}
        <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={handleClick} />
        <span className="slider round"></span>
        </label>
    </div>
  );
}

export default ToggleButton;
