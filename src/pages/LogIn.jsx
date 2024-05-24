import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../reusables/inputFields/Inputs';
import Container from '../reusables/container/Container';
import Modal from '../reusables/notifications/modal/Modal';

function LogIn() {
  const [modal, setModal] = useState({ isError: false, message: '', type: '' });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setModal({
        isError: true,
        message: 'Oops fields cannot be empty, please fill in all fields !',
        type: 'error',
      });
      return;
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username,
          email,
          password,
        });

        if (response.data.success) {
          // Handle successful login
          navigate('/home');
        } else {
          setModal({
            isError: true,
            message: response.data.message,
            type: 'error',
          });
        }
      } catch (error) {
        console.error(error);
        setModal({
          isError: true,
          message: 'An error occurred. Please try again later.',
          type: 'error',
        });
      }
    }
  };

  return (
    <Container>
      <div className='form-container flex flex-column'>
        <span className='flex flex-column center greeting'>
          <h2>Welcome back!</h2>
          <p>Log into your account.</p>
        </span>
        <form onSubmit={handleSubmit} className='flex flex-column'>
          <Input
            label='Username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit'>Log In</button>
          <span className='flex gap'>
            <p>Don't have an account?</p>
            <Link to='/signup' className='redirect'>
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      {modal.isError && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ isError: false, message: '', type: '' })}
        />
      )}
    </Container>
  );
}

export default LogIn;