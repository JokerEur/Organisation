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
              <b className="text-xl font-normal">e{data.address}</b>
              
              <br/><br/>
              <b className="text-xl">Округ: </b>
              <b className="text-xl font-normal">{data.county}</b>
               
              <br/><br/>
              <b className="text-xl">Район: </b>
              <b className="text-xl font-normal">{data.district}</b>
               
              <br/><br/>
              <b className="text-xl">Координаты: </b>
              <b className="text-xl font-normal">{data.coordinates}</b>
              
              <br/><br/>
              <b className="text-xl"> Кадастровый номер:</b>
              <b className="text-xl font-normal">{data.cadastral_number}</b>
               
              <br/>
            </div>
           
            <div className='box4  h-full inline-block'>
              <div className="boxxxx w-[100%]  mt-[5px] text-left pt-[5px] pl-[1%]">
              
              <b className="text-xl">Тип: </b>
              <b className="text-xl font-normal">e{data.object_type}</b>
              <br/>
              <br/>
              <b className="text-xl">Состояние: </b>
              <b className="text-xl font-normal">{data.condition}</b>
              <br/>
              <br/>
              <b className="text-xl">Площадь: </b>
              <b className="text-xl font-normal">{data.square}</b>
               
               <br/>
                
              </div>
              <div className="boxxxx1 w-[100%]  mt-[5px] text-left pt-[5px] pl-[1%]">
              

              <b className="text-xl">Ссобственник: </b>
              <b className="text-xl font-normal">{data.owner}</b>
              
              <br/><br/>
              <b className="text-xl">Фактический пользователь: </b>
              <b className="text-xl font-normal">e{data.actual_user}</b>
              
              <br/><br/>
              <b className="text-xl ">Доп. информация: </b>
              <b className="text-xl font-normal">{data.additional_info}</b>
               
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
            <Link to={'/protocol/'+ data.id + '?query='+ data.id } >
            <b className="text-xl font-normal">{data.id}</b>
                                  </Link>
            
            <br/><br/>
            <b className="text-xl"> Дата: </b>
            <b className="text-xl font-normal">{data.date}ff</b>
          
           
            
                        
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

    {modalOn && < Task setModalOn={setModalOn} setChoice={setChoice} />}
    
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
                                <td><Link to={'/protocol/'+ item.id + '?query='+ item.id} >
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
