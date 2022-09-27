import React, {useState} from 'react';
import RegisterForm from '../component/RegisterForm';
import axios from 'axios'
import { toast } from 'react-toastify';
import { register } from '../actions/auth'
import { useNavigate } from 'react-router-dom';



function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

 

  const handleSubmit = async(e) => {
    e.preventDefault()
    //console.table({name, email, password});
    try {
    const res = await register({
      name: name,
      email: email,
      password: password,
    });
    console.log('REGISTER USER ===>', res);
    toast.success("Register success. Please login");
    navigate('/login')
    
  } catch(err){
    console.log(err);
    if(err.response.status === 400) toast(err.response.data);
  }
  };

  

  return (
    <>
    <div className='container-fluid bg-light h1 p-5 text-center'>
        Register Page
    </div>
    

    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <RegisterForm handleSubmit={handleSubmit} name={name} 
                        setName={setName} email={email} 
                        setEmail={setEmail} password={password}
                        setPassword={setPassword} />
        </div>
      </div>
    </div>
    </>
  )
 
}


export default Register