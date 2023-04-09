
import React, { useState, useEffect} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
import {useParams} from "react-router-dom";

const handleOKClick = () => {
    setChoice(true)
    setModalOn(false)
}
const handleCancelClick = () => {
    setChoice(false)
    setModalOn(false)
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [agreed, setAgreed] = useState(false)

  const params = useParams();
  // console.log(params)

  return (
    <>
      <div className="relative z-10" overflow-hidden aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
               
                <div className="isolate n-full bg-white h-full overflow-hidden p-1 py-3 overflow-y-scroll scroll">
                  <b className='text-5xl '>Создание оъекта</b>
                  <form onSubmit={handleOKClick} action="#" method="post" className="mx-auto mt-16 max-w-xl sm:mt-5">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">


                          <div>
                          <label htmlFor="county" className="block text-sm font-semibold leading-6 text-gray-900">
                            Административный округ*
                          </label>
                          <div className="mt-2.5">
                            <input
                            required = "true"
                              type="text"
                              name="county"
                              id="county"
                              className="block w-full bg-gray-200 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="district" className="block text-sm font-semibold leading-6 text-gray-900">
                            Район*
                          </label>
                          <div className="mt-2.5">
                            <input
                            required = "true"
                              type="text"
                              name="district"
                              id="district"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                            Адрес*
                          </label>
                          <div className="mt-2.5">
                            <input
                            required = "true"
                              type="text"
                              name="address"
                              id="address"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      
                        <div className="sm:col-span-2">
                          <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Кадастровый номер земельного участка
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="company"
                              id="company"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                            Координаты на карте
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              name="company"
                              id="company"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="object_type" className="block text-sm font-semibold leading-6 text-gray-900">
                            Тип объекта (a/b/c/d)*
                          </label>
                          <div className="mt-2.5">
                            <input
                            required = "true"
                              type="text"
                              name="object_type"
                              id="object_type"
                              className="block w-full bg-gray-200 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="square" className="block text-sm font-semibold leading-6 text-gray-900">
                            Площадь объекта (в кв. м.)*
                          </label>
                          <div className="mt-2.5">
                            <input
                            required = "true"
                              type="number"
                              name="square"
                              id="square"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="owner" className="block text-sm font-semibold leading-6 text-gray-900">
                            Собственник*
                          </label>
                          <div className="mt-1">
                            <input
                            required = "true"
                              type="text"
                              name="owner"
                              id="owner"
                              className="block w-full bg-gray-200 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="actual_user" className="block text-sm font-semibold leading-6 text-gray-900">
                            Фактический пользователь*
                          </label>
                          <div className="mt-1">
                            <input
                            required = "true"
                              type="text"
                              name="actual_user"
                              id="actual_user"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="media" className="block text-sm font-semibold leading-6 text-gray-900">
                            Фотография (ссылкой)*
                          </label>
                          <div className="mt-1">
                            <input
                            required = "true"
                              type="url"
                              name="media"
                              id="media"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                            Дополнительная информация
                          </label>
                          <div className="mt-1">
                            <textarea
                              name="message"
                              id="message"
                              rows={4}
                              className="block w-full bg-gray-200 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={''}
                            />
                          </div>
                        </div>
                        
                      </div>

                      <div className="mt-10">
                        <button
                          type="submit"
                          className="block w-full bg-gray-200  rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          принять
                        </button>
                        <br/>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
