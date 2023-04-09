import React, { useEffect } from 'react'; 
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import MyNav from "../components/MyNav"; 
 
 
 
function About() { 
  return ( 
 
    <div className='App'> 
      <MyNav className="z-30"/> 
      <div > 
 
        <h2>описание</h2> 
        <br /> 
        Данный продукт разработан командой MISIShunters и призван облегчить рутинный процесс отслеживания посещаемости студентов на занятиях как для преподавателей, так и для самих учащихся. 
        <br /> 
       
      </div> 
      <table className="table1 ml-0"> 
        <tr> 
          <td> 
            <a href="https://t.me/NeAlyssa" target="_blank" draggable="false" display="false"> 
              <img src= "/assets/alisa.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/BurykinaA" target="_blank" draggable="false" display="false"> 
              <img src="/assets/alina.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/t0efL" target="_blank" draggable="false" display="false"> 
              <img src="/assets/vadim.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
            <a href="https://t.me/said_azizov" target="_blank" draggable="false" display="false"> 
              <img src="/assets/said.png"className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
          <td> 
 
            <a href="https://t.me/kokosikEH" target="_blank" draggable="false" display="false"> 
              <img src="/assets/liza.png" className='left' draggable="false" width="100%" float="left" /> 
            </a> 
          </td> 
        </tr> 
      </table> 
    </div> 
 
  ); 
}; 
 
export default About;