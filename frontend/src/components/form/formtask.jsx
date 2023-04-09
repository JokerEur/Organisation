
import React, { useState } from 'react'
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


export default function Examples() {
  const [agreed, setAgreed] = useState(false)
  const params = useParams();
  // console.log(params)
  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              
                <div className="isolate n-full bg-white h-full overflow-y-scroll overflow-hidden pt-3 p-1 mt-[50px] z-10">
                  <b className='text-5xl  mt-[200px]'>Создание задачи</b>
                  <form onSubmit={handleOKClick} action="#" method="post" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                          <label htmlFor="id" className="block text-sm font-semibold leading-6 text-gray-900">
                            ID
                          </label>
                          <div className="mt-2.5">
                            <input
                                value={params.id}

                              type="text"
                              name="id"
                              id="id"
                              className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                          Формулировка задачи*
                        </label>
                        <div className="mt-2.5">
                          <input
                          required = "true"
                            type="text"
                            name="description"
                            id="description"
                            className="block w-full bg-gray-200 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="deadline" className="block text-sm font-semibold leading-6 text-gray-900">              
                          Исполнитель*
                        </label>
                        <div className="mt-2.5">
                          <input
                          required = "true"
                            type="text"
                            name="group"
                            id="addrgroupess"
                            className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="group" className="block text-sm font-semibold leading-6 text-gray-900">
                          Сроки исполнения*
                        </label>
                        <div className="mt-2.5">
                          <input
                          required = "true"
                            type="date"
                            name="deadline"
                            id="deadline"
                            className="block w-full bg-gray-200  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
