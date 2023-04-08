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
import Task from "../components/modaltask";


const slideLeft = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft - 500;
};

const slideRight = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft + 500;
};


function Object() {

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
       <div className="menu mt-[70px]">
        <div className="box1">
          <div className="box">
            <br/>
            <b className="text-4xl">
              общая информация об объекте №{params.id}
            </b>
            <br/><br/>           
            <b className= 'left text-2xl'> {data.id}, {data.title}</b>
            <br/>
            <b className='left text-base'> {data.body}</b>
          </div>
        </div>

      <div className="box2">
        <div className="boxx">
          <black className='right'>
            <b>встреча</b>
            <br/>
            дата: {data.date_of_meeting}
            <br/>
рабочая группа:  {data.group}
<br/>
повестка: {data.s}!!!поправить
            
          </black>
        </div>
        
          <div className="boxx">
          <black className='right'>
            карта
          </black>
            <div className='h-[200px]'>
               <YMaps > 
              <Map height= '205px' width='100%' defaultState={{ center: [55.75, 37.57], zoom: 9}} >
              <Placemark geometry={[55.684758, 37.738521]} />
              </Map>
           </YMaps>
            </div>
           
          </div>
      </div>
      
      </div>
      <div className='relative flex items-center'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-full h-[330px] mx-[1%] mt-[20px] h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {imgg.map((item) => (
            <img
              className='w-[300px] inline-block mt-2 p-2 cursor-pointer hover:scale-110 ease-in-out duration-300 rounded-2xl'
              src={item.url}
              alt='/'
            />
          ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
      
        <div className="box3 mt-[20px]">
          <div className="box">
            <black className='right'>
              задачи. потоколы
             
              <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
        onClick={clicked}
      >
        Создать задачу
      </button>

    {modalOn && < Task setModalOn={setModalOn} setChoice={setChoice} />}

            </black>
            
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

    );
};

export default Object;
