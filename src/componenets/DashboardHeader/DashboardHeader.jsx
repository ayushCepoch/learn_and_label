import React, { useState } from 'react'
import backIcon from '../Assets/Images/back_ll.png'
import dotsMenu from "../Assets/Images/dotsMenu.png"
import { useNavigate } from 'react-router-dom'


const menuOptions = [
  {
    name:'Update'
  },
  {
    name:'Email'
  },
  {
    name:'Share'
  },
  {
    name:'Preview'
  },
  {
    name:'Save'
  },
]

const DashboardHeader = ({title,otherTitle,ShowOtherTitle,onSave}) => {
  const navigate = useNavigate()
  const [showMenuOptions,setShowMenuOptions] = useState(false)
  return (
    <div className="w-full bg-white px-2 py-4 flex justify-between items-center">
      <img onClick={()=>navigate(-1)} height={15} width={20} src={backIcon} />
      <p
        style={{ fontSize: "17px", fontWeight: "500" }}
        className="text-[#000]"
      >
        {title}
      </p>
     {ShowOtherTitle ? <p
        style={{ fontSize: "17px", fontWeight: "500" }}
        className="text-[#000]"
      >
        {otherTitle}
      </p>:<img 
      onClick={()=>setShowMenuOptions(!showMenuOptions)}
       height={15} 
       width={20}
      src={dotsMenu}
      />
      }
      {
        showMenuOptions&&<>
        <div onClick={()=>setShowMenuOptions(false)} style={{
          height:'200vh',
          width:'100vw',
          left:0,
          zIndex:10,
          position:'absolute',
          background:'black',
          opacity:0.2
        }}>

        </div>
        <div style={{
          position:'absolute',
          zIndex:11,
          background:'#fff',
          top:'50px',
          right:'10px',
          width:'40%'
        }}>
          {menuOptions.map((item)=>{
            return<div onClick={()=>{
              if(item.name ==="Save"){
                onSave()
              }else{

                setShowMenuOptions(false)
              }
              }} className='py-[10px] px-[20px]'>
              <p>{item.name}</p>
            </div>

          })}
        </div>
        </>
      }
    </div>
  );
}

export default DashboardHeader