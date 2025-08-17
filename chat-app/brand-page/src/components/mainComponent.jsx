import React from 'react'

const MainComponent = () => {
  return (
    <div>
        <div className=' grid grid-cols-1 md:grid-cols-2 mt-5 '>
            <div className='col-span-1 ml-4'>
                <div className='text-8xl font-extrabold '>
                    YOUR FEET 
                        DESERVE
                        THE BEST
                </div>
                <div className='text-2xl text-gray-600 font-medium mt-4 mb-4'>
                    YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.
                </div>
                <button className='mt-2 bg-red-600 text-white font-medium p-3 rounded-md mr-6 text-2xl cursor-pointer'>
                    Shop Now
                </button>
                <button className='text-gray-600 font-medium text-2xl border p-3 cursor-pointer'>
                    Category
                </button>
                <div className='mt-4 text-xl text-gray-500 font-medium mb-3'>Also Available On</div>
                <div className='flex'>
                <img src = "https://thumbs.dreamstime.com/z/flipcart-logo-219165303.jpg" className='w-10 h-10'></img>
                <img src='https://guiaimpresion.com/wp-content/uploads/2020/06/Logotipo-Amazon.jpg' className='w-15 h-12'></img>
                </div>
            </div>
            <div className='col-span-1'>
                <img src='https://i5.walmartimages.com/asr/71721447-1260-4ed7-a352-ff86558411a5_1.b621673c9d6c12481c111d5d10169c97.jpeg'></img>
            </div>
        </div>
    </div>
  )
}

export default MainComponent