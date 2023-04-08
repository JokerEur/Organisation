import React from 'react';

import '../App.css';
import {Link} from 'react-router-dom';

function MyNav() {
  return (

    <div className='back'>
      <div className="nav">
        <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" draggable="false" display="false">
        <img src="/assets/MISIShunters.svg"className='left' draggable="false" width="60%"/>
        </a>
        <br/>
        <w className='right mr-[200px] mt-[0px]'>
        <Link to='/' ><w > Главная</w></Link>
        <b>&nbsp;&nbsp;&nbsp;</b>
        <Link to='/about'><w> О разработчиках</w></Link>
        </w>
        
      </div>
      

    </div>

  );
}

export default MyNav;

