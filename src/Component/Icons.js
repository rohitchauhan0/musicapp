import React from 'react'

const Icons = ({IconName}) => {
  return (
    <div>
        <div className=" p-2  rounded-full icon-bg relative z-[1000] cursor-pointer ">
              <IconName className=" text-white hover:text-orange-500 transition-all duration-200" />
              <div className=" w-full h-full rounded-full absolute -z-10 shadowWhite top-0 left-0"></div>
            </div>
    </div>
  )
}

export default Icons