import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { Link , useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData,setFormData]= useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

 try{
  setLoading(true);
  const res = await fetch('/api/auth/signup' , 
    {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    }
  )
  const data = await res.json();
  console.log(data);

  if(data.success===false)
  {
    setError(data.message);
    setLoading(false);
    return;
  }
  setLoading(false)
  setError(null);
  navigate('/sign-in')
 }catch(error){
    setLoading(false);
    setError(error.message)
 }
   
  };
  //console.log(formData)


  return (
    <div className='max-w-lg mx-auto p-4 '>

      <div className='text-center p-4'>
        <h1 className='text-3xl font-semibold'>Sign Up</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" name="username" id="username" placeholder='username' className='border p-3 rounded-lg' onChange={handleChange}/>
          <input type="email" name="email" id="email" placeholder='email' className='border p-3 rounded-lg' onChange={handleChange}/>
          <input type="password" name="password" id="password" placeholder='passwrod' className='border p-3 rounded-lg' onChange={handleChange}/>
          <button type='submit'  className='bg-slate-700 text-white border p-3 rounded-lg uppercase hover:opacity-95'> {loading? 'Loading...'  : 'Sign Up'}</button>

        </form>

        <div className='flex gap-2 mt-3'>
          <p>Have an account already?</p>
          <Link to='/sign-in'>
           <span className='text-blue-700'>

           Sign In
           </span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
       
      </div>

    </div>
  )
}

export default SignUp