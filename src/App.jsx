import axios from 'axios'
import React, { useEffect, useState } from 'react'


const App = () => {

  const [userdata, setUserData] = useState([])

  const getData = async () => {
    const data = await axios.get('https://picsum.photos/v2/list?page=2 ')
    setUserData(data.data)
  }

  useEffect(() => {
    getData();
  }, []);



  let printUserData = <h1 className='text-bold'>No Data Available</h1>

  if (userdata.length > 0) {
    printUserData = userdata.map(function (elem, idx) {
      return <a href={elem.url}target='_blank'>
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
      
      <div className='flex flex-wrap justify-between mt-10 gap-2 space-y-3'>
        {
          printUserData
        }
      </div>
    </div>
  )
}

export default App