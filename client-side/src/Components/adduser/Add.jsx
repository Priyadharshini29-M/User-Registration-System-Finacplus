import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './add.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Add = () => {
   const [user, setUser] = useState({
      name: "",
      age: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      about: ""
   });

   const [genders, setGenders] = useState([]);
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();

   useEffect(() => {
      axios.get('http://localhost:5000/api/genders')
        .then(response => setGenders(response.data))
        .catch(error => {
          console.error('Error fetching genders:', error);
          toast.error('Failed to fetch genders', { position: 'top-right' });
        });
    }, []);

   const inputHandler = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const validateForm = () => {
      const errors = {};
      if (user.name.length < 2) {
         errors.name = 'Name must be at least 2 characters';
     }
     if (user.age < 0 || user.age > 120) {
         errors.age = 'Age must be between 0 and 120';
     }
     if (!user.dateOfBirth) {
         errors.dateOfBirth = 'Date of Birth is required';
     }
     if (user.password.length < 10 || !/\d/.test(user.password)) {
         errors.password = 'Password must be at least 10 characters and include a digit';
     }
     if (!user.gender) {
  }
     if (user.about.length > 5000) {
         errors.about = 'About section cannot exceed 5000 characters';
     }
     
      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   const submitForm = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
         return;
      }
      console.log("Form Data:", user);

      try {  //submit this using an API call
        const response = await axios.post('http://localhost:5000/api/create', user);
        toast.success(response.data.msg, { position: "top-right" });
        navigate('/');
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to submit the form', { position: "top-right" });
    }
};

   return (
      <div className="addUser">
         <Link className='link' to={"/"}>Back</Link>
         <h3 className='head-div'>USER REGISTRATION</h3>
         <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
               <label htmlFor='name'>Name</label>
               <input type="text" onChange={inputHandler} id="name" name="name" autoComplete='off' placeholder='Enter Your Name' />
               {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className='inputGroup'>
               <label htmlFor='age'>Age</label>
               <input type="number" onChange={inputHandler} id="age" name="age" autoComplete='off' placeholder='Enter Your Age' />
               {errors.age && <p className="error">{errors.age}</p>}
            </div>
            <div className='inputGroup'>
               <label htmlFor='password'>Password</label>
               <input type="password" onChange={inputHandler} id="password" name="password" autoComplete='off' placeholder='Enter Password' />
               {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className='inputGroup'>
               <label htmlFor='dateOfBirth'>Date Of Birth</label>
               <input type="date" onChange={inputHandler} id="dateOfBirth" name="dateOfBirth" autoComplete='off' placeholder='Enter Your Date Of Birth' />
               {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
            </div>
            <div className='inputGroup'>
            <label htmlFor='gender'>Gender</label>
            <select name="gender" value={user.gender} onChange={inputHandler}>
                  <option value="">Select Gender</option>
                  {genders.map(gender => (
                     <option key={gender} value={gender}>{gender}</option>
                  ))}
                  </select>
            </div>
            <div className='inputGroup'>
               <label htmlFor='about'>About</label>
               <textarea type="text" onChange={inputHandler} id="about" name="about" autoComplete='off' placeholder='Word Limits 5000' maxLength="5000" />
               {errors.about && <p className="error">{errors.about}</p>}
            </div>
            <div className='inputGroup'>
               <button type="submit" onClick={submitForm}>SUBMIT FORM</button>
            </div>
         </form>
      </div>
   );
}

export default Add;
