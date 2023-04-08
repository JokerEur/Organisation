import React, { useEffect , useState, } from "react";
import { Link, useParams} from 'react-router-dom';
import '../App.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyNav from "../components/MyNav";
import { imgg } from '../mockData';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Object from "../components/modal";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


const slideLeft = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft - 500;
};

const slideRight = () => {
  var slider = document.getElementById('slider');
  slider.scrollLeft = slider.scrollLeft + 500;
};


function Home() {
  // const [data, getData] = useState([])
  // const URL = 'https://jsonplaceholder.typicode.com/posts';

  // useEffect(() => {
  //     fetchData()
  // }, [])


  // const fetchData = () => {
  //     fetch(URL)
  //         .then((res) =>
  //             res.json())

  //         .then((response) => {
  //             console.log(response);
  //             getData(response);
  //         })

  // }
  const chart = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page b', uv: 300, pv: 2400, amt: 2400}, {name: 'Page c', uv: 300, pv: 2400, amt: 2400}, {name: 'Page d', uv: 200, pv: 2400, amt: 2400},{name: 'Page e', uv: 278, pv: 2400, amt: 2400}, {name: 'Page f', uv: 189, pv: 2400, amt: 2400}]
  const dataa = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  const params = useParams();
    const path = `/odject/${params.id}`
    const [modalOn, setModalOn] = useState(false);
const [choice, setChoice] = useState(false)

const clicked = () => {
  setModalOn(true)
}
  return (
        
    <div>
       <MyNav/>

       <div className="box3 mt-[70px]">
          <div className="box">
            <b className='right'>
              реестр
            </b>  
            <div className="h-[450px] overflow-y-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
              <Table >
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID объекта</th>
                  <th>name</th>
                  <th>info</th>
                  <th>date</th>
                  
                  <th>location</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {imgg.map((item, i) => (
                             <tr >
                                <td>{item.id}</td>
                                <td>
                                  
                                  <Link to={'/object/'+ item.id} >
                                    <b > 345{item.id}</b>
                                  </Link>
                                </td>
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
        <button
        className="bg-red-100 text-black active:bg-red-200 font-bold uppercase text-sm ml-10 px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all "
        type="button"
        onClick={clicked}
      >
        Создать объект
      </button>

    {modalOn && < Object setModalOn={setModalOn} setChoice={setChoice} />}

       <div className="menu mt-[20px]">
        <div className="box1">
        <div className='relative flex items-center ml-[-45px] w-[105%]'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-full h-[330px] mx-[1%]  h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
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
        </div>

      <div className="box2"> 
          <div className="boxx mt-[10px] ml-[-10px] w-[104%]">
          <b className='right'>
            карта
          </b>
            <div className='h-[310px]'>
               <YMaps > 
              <Map height= '295px' width='100%' defaultState={{ center: [55.75, 37.57], zoom: 9}} >
              <Placemark geometry={[55.684758, 37.738521]} />
              </Map>
           </YMaps>
            </div>
           
          </div>
      </div>
      
      </div>
      <div className="menu mt-[20px]">
        <div className="box1 mt-[-150px]">
            <div className="box">
              
              <ResponsiveContainer  width="100%" height="100%" >
          <LineChart
            width={500}
            height={300}
            data={dataa}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
              </div>
              
            </div>

            <div className="box2 h-full"> 
          <div className="box mt-[-150px] ">
          
           <b className="right">info</b>
          </div>
      </div>
          </div>

        </div>
        
      
       
  

    );
};

export default Home;
