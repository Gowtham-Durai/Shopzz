import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate();
    const handleBack = ()=>{
            navigate("/");
    }
  return (
    <div style={style} onClick={handleBack}>
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
export default Back;