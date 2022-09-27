import React from 'react'

function RegisterForm({handleSubmit,name, setName, email, setEmail, password, setPassword,}) {
  return (
        <form onSubmit={handleSubmit} className='mt-3'>
        <div className='form-group mb-3'>
          <label className='form-label'>Your name</label>
          <input
            type="text"
            className='form-control'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className='form-group mb-3'>
          <label className='form-label'>Email address</label>
          <input
            type="email"
            className='form-control'
            placeholder='Enter name'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className='form-group mb-3'>
          <label className='form-label'>Password</label>
          <input
            type="password"
            className='form-control'
            placeholder='Enter email'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button disabled={!name ||!email || !password} className='btn btn-primary'>Submit</button>
    </form>
  )
}

export default RegisterForm