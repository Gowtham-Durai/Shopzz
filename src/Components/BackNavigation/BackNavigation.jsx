import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackNavigation = () => {
    const navigate = useNavigate();
    
  return (
    <div style={style} onClick={()=>navigate("/")}>
        <i class='bx bx-chevron-left'></i>
    </div>
  )
}


const style ={
    fontSize:'50px',
    color:'gray',
    position:'absolute',
    top:'20px',
    left:'20px',
    cursor:'pointer'

};
export default BackNavigation;