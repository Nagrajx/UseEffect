import axios from 'axios'
import React, { useEffect, useState } from 'react'


const App = () => {

  const [userdata, setUserData] = useState([])

  const [index, setIndex] = useState(1);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true)
      const data = await axios.get(`https://picsum.photos/v2/list?page=${index} `)
      setUserData(data.data)
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    getData();
  }, [index]);





  let printUserData = <h1 className='text-bold'>Loading...</h1>

  if (userdata.length > 0) {
    printUserData = userdata.map(function (elem, idx) {
      return <a href={elem.url} target='_blank'>
        <div key={idx} className='h-50 w-60  '  >
          <div>
            <img className='h-full object-cover rounded' src={elem.download_url} />
          </div>
          <h1 className='font-bold text-lg'>{elem.author}</h1>
        </div >
      </a>
    })
  }

  return (
    <div className='bg-black h-screen p-4 overflow-auto text-white'>
      <h1 className='w-[100px] h-[50px]  flex items-center justify-center rounded text-4xl bg-red-400'>{index}</h1>
      {
        loading ? (<h1 className='text-3xl font-bold text-center  mt-20'>
          Loading...
        </h1>) : (<div className='flex flex-wrap justify-between mt-10 gap-2 space-y-3 '>
          {
            printUserData
          }
        </div>)
      }

      <div className='flex justify-center mt-5 gap-5 p-10 '>
        <button onClick={() => {
          if (index > 1) {
            setIndex(index - 1)
          }
        }} className='bg-amber-400 p-3 rounded  text-lg font-bold active:scale-90'>
          Prev
        </button>
        <h1 className='mt-4'>Page {index}</h1>
        <button
          onClick={() => {
            setIndex(index + 1);
          }}
          className='bg-amber-400 p-3 rounded text-lg font-bold active:scale-90 '>Next</button>
      </div>


    </div>
  )
}

export default App