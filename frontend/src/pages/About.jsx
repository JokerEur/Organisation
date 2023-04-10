import React, { useEffect } from 'react'; 
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import MyNav from "../components/MyNav"; 
 
 
 
function About() { 
  return ( 
 
    <div className='App'> 
      <MyNav className="z-30"/> 
      
      <table className="table1 ml-0"> 
        <tr> 
          <td> 
            <a href="https://t.me/NeAlyssa" target="_blank" draggable="false" display="false"> 
              <img src= "/static/alisa.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/BurykinaA" target="_blank" draggable="false" display="false"> 
              <img src="/static/alina.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/servan_t" target="_blank" draggable="false" display="false"> 
              <img src="/static/ivan.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/KD_ATW" target="_blank" draggable="false" display="false"> 
              <img src="/static/kirill.png"className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
 
            <a href="https://t.me/kokosikEH" target="_blank" draggable="false" display="false"> 
              <img src="static/liza.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
        </tr> 
      </table> 
    </div> 
 
  ); 
}; 
 
export default About;