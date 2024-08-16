import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../adduser/add.css";
import axios from 'axios'
import toast from 'react-hot-toast'

const Edit = () => {

const users ={
   name:"",
   age:"",
   password:"",
   gender:"",
   dateOfBirth:"",
   about:""
}

const {id} = useParams();
const navigate = useNavigate();
const [user, setUser] = useState(users);

const inputChangeHandler = (e) =>{
   const {name, value} = e.target;
   setUser({...user, [name]:value});
   console.log(user);
}

useEffect(()=>{
   axios.get(`http://localhost:5000/api/getone/${id}`)
   .then((response) =>{
       setUser(response.data);
   })
   .catch((error) =>{
      console.log(error);
   })
},[id]) 



const submitForm = async(e) =>{
   e.preventDefault();
        await axios.put(`http://localhost:5000/api/updateUser/${id}`, user)
        .then((response) =>{
           toast.success(response.data.msg, {position:"top-right"})
            navigate("/");
          })
        .catch(error => console.log(error))
}

return (
<div className="addUser">
        <Link className='link'  to={"/"}>Back</Link>
        <h3 className='head-div'>USER UPDATE FORM</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor='name'>Name</label>
                <input type="text" value={user.name}  onChange={inputChangeHandler}  id="name" name="name" autoComplete='off' placeholder='Enter Your Name'/>
             </div>
             <div className='inputGroup'>
                <label htmlFor='age'>Age</label>
                <input type="text" value={user.age}  onChange={inputChangeHandler} id="age" name="age" autoComplete='off' placeholder='Enter Your Age'/>
             </div>
             <div className='inputGroup'>
                <label htmlFor='password'>Password</label>
                <input type="text" value={user.password}  onChange={inputChangeHandler} id="password" name="password" autoComplete='off' placeholder='Enter Password'/>
             </div>
             <div className='inputGroup'>
                <label htmlFor='dateOfBirth'>Date Of Birth</label>
                <input type="text"  value={user.dateOfBirth}   onChange={inputChangeHandler}  id="dateOfBirth" name="dateOfBirth" autoComplete='off' placeholder='Enter Your Date Of Birth'/>
             </div>
             <div className='inputGroup'>
                <label htmlFor='gender'>Gender</label>
                <input type="text" value={user.gender}  onChange={inputChangeHandler}  id="gender" name="gender" autoComplete='off' placeholder=''/>
             </div>
             <div className='inputGroup'>
                <label htmlFor='about'>About</label>
                <input type="text"  value={user.about} onChange={inputChangeHandler}  id="about" name="about" autoComplete='off' placeholder='Word Limits 5000'/>
             </div>
             <div className='inputGroup'>
                <button type="submit"> UPDATE SUBMIT </button>
                </div>
        </form>
    </div>
  )
}

export default Edit;


































    