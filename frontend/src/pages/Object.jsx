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
import Task from "../components/modal/modaltask";
import Report from "../components/modal/modalreport";
import Status from "../components/modal/modaltaskstate";

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


    const [tab, getTab] = useState([])
  const URL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
      fetchTab()
  }, [])


  const fetchTab = () => {
      fetch('http://127.0.0.1:8000/api/obj_table?query='+ params.id)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getTab(response);
          })

  }

    const [mit, getMit] = useState([])

  useEffect(() => {
      fetchMit()
  }, [])


  const fetchMit = () => {
      fetch('http://127.0.0.1:8000/api/obj?query='+ params.id)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getMit(response);
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
const [modalOn2, setModalOn2] = useState(false);
const [choice, setChoice] = useState(false)

const clicked = () => {
  setModalOn(true)
}
const clicked1 = () => {
  setModalOn1(true)
}
const clicked2 = () => {
  setModalOn2(true)
}
  
  return (
        
    <div>
       <MyNav className="z-30"/>
       <div className="menu mt-[70px]">
        <div className="box1   ">
          <div className="box  ">
            <br/>
            <b className="text-4xl">
              Общая информация об объекте №{params.id}
            </b>
            <br/>
            
            <div className="boxxx w-[50%]  mt-[5px]  inline-block pl-[1%] text-left">
            <br/>
            <br/>
              <b className="text-xl">Адрес: </b>
              <b className="text-xl font-normal">{mit.adress}</b>
              
              <br/><br/>
              <b className="text-xl">Округ: </b>
              <b className="text-xl font-normal">{mit.county}</b>
               
              <br/><br/>
              <b className="text-xl">Район: </b>
              <b className="text-xl font-normal">{mit.district}</b>
               
              <br/><br/>
              <b className="text-xl">Координаты: </b>
              <b className="text-xl font-normal">{mit.coordinates}</b>
              
              <br/><br/>
              <b className="text-xl"> Кадастровый номер:</b>
              <b className="text-xl font-normal">{mit.cadastral_number}</b>
               
              <br/>
            </div>
           
            <div className='box4  h-full inline-block'>
              <div className="boxxxx w-[100%]  mt-[5px] text-left pt-[5px] pl-[1%]">
              
              <b className="text-xl">Тип: </b>
              <b className="text-xl font-normal">{mit.object_type}</b>
              <br/>
              <br/>
              <b className="text-xl">Состояние: </b>
              <b className="text-xl font-normal">{mit.condition}</b>
              <br/>
              <br/>
              <b className="text-xl">Площадь: </b>
              <b className="text-xl font-normal">{mit.square}</b>
               
               <br/>
                
              </div>
              <div className="boxxxx1 w-[100%]  mt-[5px] text-left pt-[5px] pl-[1%]">
              

              <b className="text-xl">Ссобственник: </b>
              <b className="text-xl font-normal">{mit.owner}</b>
              
              <br/><br/>
              <b className="text-xl">Фактический пользователь: </b>
              <b className="text-xl font-normal">{mit.actual_user}</b>
              
              <br/><br/>
              <b className="text-xl ">Доп. информация: </b>
              <b className="text-xl font-normal">{mit.additional_info}</b>
               
              <br/><br/>
              
                
                
              </div>
            </div>
          </div>
        </div>

      <div className="box2">
        <div className="boxx">
          <black className='right'>
          <br/>
            <b>Повестка</b>
            <br/><br/>
            <Link to={'/protocol/'+ mit.agenda_id + '?query='+ mit.agenda_id } >
            <b className="text-xl underline ">ID повестки: {mit.agenda_id}</b>
                                  </Link>
            
            <br/><br/>
            <b className="text-xl"> Дата: </b>
            <b className="text-xl font-normal">{mit.agenda_date}</b>
          
           
            
                        
          </black>
        </div>
        
          <div className="boxx">
          <black className='right'>
            Карта
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
      
        <div className="box3 z-20 mt-[20px]">
          <div className="box z-20">
            <black className='text-4xl '>
              Задачи
              </black>
              <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm mt-1 ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
        onClick={clicked}
      >
        Создать задачу
      </button>
      <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm mt-1 ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
        onClick={clicked2}
      >
        Изменить статус задачи
      </button>

    {modalOn && < Task setModalOn={setModalOn} setChoice={setChoice} />}
    
    {modalOn2 && < Status setModalOn={setModalOn2} setChoice={setChoice} />}
    
    <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
        onClick={clicked1}
      >
        Добавить отчет
      </button>

    {modalOn1 && < Report setModalOn={setModalOn1} setChoice={setChoice} />}
    

            
            
            <div className="h-[450px] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>ID задачи</th>
                  <th>Дата создания</th>
                  <th>Формулировка</th>
                  <th>Срок исполнения</th>
                  <th>Ответственный</th>
                  <th>Статус</th>
                  <th>Отчет</th>
                </tr>
              </thead>
              <tbody>
                {tab.map((item, i) => (
                            <tr >
                                <td>
                                    <b >{item.id}</b></td>
                                <td>{item.time_stamp}</td>
                                <td>{item.description}</td>
                                <td>{item.deadline}</td>
                                <td>{item.wg_group}</td>
                                <td>{item.status}</td>
                                <td>{item.wg_report}</td>
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
