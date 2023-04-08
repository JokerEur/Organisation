import  React, {useEffect , useState } from "react";
import '../App.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyNav from "../components/MyNav";
import { imgg } from '../mockData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Link, useParams} from 'react-router-dom';
import Modal from "../components/modal";


const slideLeft = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft - 500;
};

const slideRight = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft + 500;
};


function Protocol() {

  const params = useParams();
  // console.log(params)


  const [data, getData] = useState([])
  const URL = 'https://jsonplaceholder.typicode.com/posts/' ;

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts/'+ params.id)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getData(response);
          })

  }

  const [jsons, getJsons] = useState([])

  useEffect(() => {
    fetchJson()
  }, [])

  const fetchJson = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then((res) =>
            res.json())

        .then((response) => {
            console.log(response);
            getJsons(response);
        })

}
  
const [modalOn, setModalOn] = useState(false);
const [choice, setChoice] = useState(false)

const clicked = () => {
  setModalOn(true)
}
  
  return (
        
    <div>
       <MyNav/>
       <div className=" mt-[70px] h-[245px]">
        <div className="box1 h-[245px]">
          <div className="box h-[245px]">
            <br/>
            <b className="text-4xl">
              общая информация о повестке №{params.id}
            </b>
            
            <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
      
      >
        Скачать повестку
      </button>
                  
            <div className="h-[65%] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>name</th>
                  <th>info</th>
                  <th>status</th>
                  <th>adress</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {jsons.map((item, i) => (
                            <tr >
                                <td>{item.id}</td>
                                <td><Link to={'/object/'+ item.id} >
                                    <b > 345{item.id}</b>
                                  </Link></td>
                                <td>{item.tur}</td>
                                <td>{item.wen}</td>
                                <td>{item.th}</td>
                                <td>{item.fr}</td>
                                <td>{item.sn}</td>
                            </tr>
                        ))}
                  </tbody>
            </Table>
            </div>
          </div>
        </div>

      <div className="box2">
        <div className="boxx">
          <black className='right'>
            <b>встреча</b>
            <br/>
            дата: {data.date_of_meeting}
            <br/>
раб. группа: {data.group}  
<br/>
ссылка: {data.url}
            
          </black>
        </div>
    
      </div>
      
      </div>
      
        <div className="box3 mt-[20px]  ">
          <div className="box">
            
            
            <div className="h-[450px] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            <div className="box h-[245px]">
            <br/>
            <b className="text-4xl">
              общая информация о протоколе №{params.id}
            </b>
            <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
      
      >
        Скачать протокол
      </button>          
            <div className="h-[450px] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>name</th>
                  <th>info</th>
                  <th>status</th>
                  <th>adress</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {jsons.map((item, i) => (
                            <tr >
                                <td>{item.id}</td>
                                <td><Link to={'/protocol/'+ item.id} >
                                    <b > 345{item.id}</b>
                                  </Link></td>
                                <td>{item.tur}</td>
                                <td>{item.wen}</td>
                                <td>{item.th}</td>
                                <td>{item.fr}</td>
                                <td>{item.sn}</td>
                            </tr>
                        ))}
                  </tbody>
            </Table>
            </div>
          </div>
          
            </div>
            
          </div>
        </div>
      
      
       
  </div>

    );
};

export default Protocol;
