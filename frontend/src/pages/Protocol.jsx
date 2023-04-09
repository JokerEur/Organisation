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
import Meet from "../components/modal/modalmeet";

import Feedback from "../components/modal/modalfeedback";



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
const [modalOn1, setModalOn1] = useState(false);
const [choice, setChoice] = useState(false)

const clicked = () => {
  setModalOn(true)
}
const clicked1 = () => {
  setModalOn1(true)
}
  
  return (
        
    <div>
       <MyNav className="z-30"/>
       <div className=" mt-[70px] h-[245px]">
        <div className="box1 h-[245px]">
          <div className="box h-[245px]">
            <br/>
            <b className="text-4xl">
            Общая информация о повестке №{params.id}
            </b>
            
            
                  
            <div className="h-[65%] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>id</th>
                  <th>Адрес</th>
                  <th>Округ</th>
                  <th>Район</th>
                  <th>Тип</th>
                  <th>Собственник</th>
                </tr>
              </thead>
              <tbody>
                {jsons.map((item, i) => (
                            <tr >
                              <td><Link to={'/object/'+ item.id + '?query='+ item.id} >
                                    <b > {item.id}</b>
                              </Link></td>
                              <td>{item.address}</td>
                              <td>{item.county}</td>
                              <td>{item.district}</td>
                              <td>{item.object_type}</td>
                              <td>{item.owner}</td>
                            </tr>
                        ))}
                  </tbody>
            </Table>
            </div>
          </div>
        </div>

      <div className="box2 ">
        <div className="boxx ">
          <black className='right '>
          <br/>
            <b>Встреча</b>
            <div className="pl-2 text-left"> <br/>
            дата: {data.date_of_meeting}
            <br/><br/>
            раб. группа: {data.group}  
            <br/><br/>
            ссылка: {data.url}
            <br/><br/>
            </div>
            
          </black>
        </div>
    
      </div>
      
      </div>
      
        <div className="box3 mt-[20px]  ">
          <div className="box h-m z-20">

          <div className="z-20 mb-3 overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
         
          <button
              className="bg-red-100  text-black active:bg-red-200 font-bold uppercase text-sm ounded mx-[2%] my-1 ease-linear transition-all "
              type="button"
              onClick={clicked}
            >
              Создать встречу
            </button>
            <button
              className="bg-red-100  text-black active:bg-red-200 font-bold uppercase text-sm ounded mx-[2%] my-1 ease-linear transition-all "
              type="button"
              onClick={clicked1}
            >
              Добавить решение
            </button>

            {modalOn && < Meet setModalOn={setModalOn} setChoice={setChoice} />}
            {modalOn1 && < Feedback setModalOn={setModalOn1} setChoice={setChoice} />}
            <button
            className="bg-red-100  text-black active:bg-red-200 font-bold uppercase text-sm ounded mx-[2%] my-1 ease-linear transition-all "
            type="button"
            >
        Скачать повестку
      </button>
            <button
        className="bg-red-100  text-black active:bg-red-200 font-bold uppercase text-sm ounded mx-[2%] my-1 ease-linear transition-all "
        type="button"
      
      >
        Скачать протокол
      </button>          
         
          
          </div></div>
            <div className="box h-[px] ">
            <div className="h-[450px] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            <div className="box h-[450px]">
            <br/>
            <b className="text-4xl">
              Общая информация о протоколе №{params.id}
            </b>
          
            <div className="h-[390px]  overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>ID задачи</th>
                  <th>Адрес</th>
                  <th>Округ</th>
                  <th>Район</th>
                  <th>Кадастровый номер</th>
                  <th>Дата рассмотрения</th>
                  <th>Решение</th>
                  <th>Дата рассмотрения</th>
                </tr>
              </thead>
              <tbody>
                {jsons.map((item, i) => (
                            <tr >
                                <td><Link to={'/protocol/'+ item.id + '?query='+ item.id} >
                                    <b > {item.id}</b>
                                  </Link></td>
                                <td>{item.address}</td>
                                <td>{item.county}</td>
                                <td>{item.district}</td>
                                <td>{item.cadastral_number}</td>
                                <td>{item.date_of_meeting}</td>
                                <td>{item.description}</td>
                                <td>{item.feedback}</td>
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
