import React, { useContext } from "react";
import './style.css';
import { StateContext } from "../../App";


function Footer() {
  const stateContext = useContext(StateContext);
  return (
   
      <div className="Footer">
        <button className="Button" onClick={() => stateContext.GenerateChart()}> GENERATE CHART </button>
      </div>
   
  );
}



export default Footer;