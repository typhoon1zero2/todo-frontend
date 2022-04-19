import React , { useState , useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcHome } from "react-icons/fc";

const ShowPage = () => {
  const { id } =  useParams();
  const [ data, setData ] = useState({})
  /* Navigation Hook to navigate from page -to-page*/
  const navigate = useNavigate()

   /* UseEffect collect when page mount */
  // useEffect(() => {
  //   ( async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/todos/${id}`)
  //       setData(response.data.foundTodo)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [])
  
  const getData = async () => {
    try {
      const fetchData  = await axios.get(`https://mernfstodo.herokuapp.com/todos/${id}`);
       setData(fetchData.data);
       console.log("success")
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();

  },[]);

  const deletedList = async () =>{
    try {
      await axios.delete(`https://mernfstodo.herokuapp.com/todos/${id}`)
    }catch (err) {
      console.log()
    } finally {
      navigate(-1)
    }
  }

  return(
    <div className="showPage">
      <Link className='home' to="/"><FcHome /></Link>
      <div className="todoEntry"> 
        <h2>Entry: {data.entry}</h2>
        <h2>Status: {data.status}</h2>
        <button  onClick={deletedList}><RiDeleteBin6Line /> </button>
      </div>
    </div>
  )
}

export default ShowPage