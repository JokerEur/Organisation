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


  // const [data, getData] = useState([])
  // const URL = 'https://jsonplaceholder.typicode.com/posts/' ;
  //
  // useEffect(() => {
  //     fetchData()
  // }, [])
  //
  // const fetchData = () => {
  //     fetch('https://jsonplaceholder.typicode.com/posts/'+ params.id)
  //         .then((res) =>
  //             res.json())
  //
  //         .then((response) => {
  //             console.log(response);
  //             getData(response);
  //         })
  //
  // }
    const [tab1, getTab1] = useState([])

  useEffect(() => {
      fetchTab1()
  }, [])


  const fetchTab1 = () => {
      fetch('http://127.0.0.1:8000/api/prot_table1?query='+ params.id)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getTab1(response);
          })

  }
    const [tab2, getTab2] = useState([])

  useEffect(() => {
      fetchTab2()
  }, [])


  const fetchTab2 = () => {
      fetch('http://127.0.0.1:8000/api/prot_table2?query='+ params.id)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getTab2(response);
          })

  }

    const [mit, getMit] = useState([])

  useEffect(() => {
      fetchMit()
  }, [])


  const fetchMit = () => {
      fetch('http://127.0.0.1:8000/api/prot?query='+ params.id)
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
const [choice, setChoice] = useState(false)

const clicked = () => {
  setModalOn(true)
}
const clicked1 = () => {
  setModalOn1(true)
}
  const [data, setData] = React.useState([]);

    const handleDownloadClick = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        const response = await fetch('http://127.0.0.1:8000/api/download_excel/', {
            method: 'POST',
            body: formData
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
                {tab1.map((item, i) => (
                            <tr >
                              <td><Link to={'/object/'+ item.id + '?query='+ item.id} >
                                    <b className="underline"> {item.id}</b>
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
            дата: {mit.date_of_meeting}
            <br/><br/>
            раб. группа: {mit.group}
            <br/><br/>
                <a href={mit.url} >
            <b className="text-xl underline">Ссылка</b>
                </a>
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
            onClick={handleDownloadClick}
            >
        Скачать реестр
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
                {tab2.map((item, i) => (
                            <tr >
                                <td>{item.id}</td>
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
