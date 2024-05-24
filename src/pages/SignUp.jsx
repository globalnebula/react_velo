import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Modal from '../reusables/notifications/modal/Modal';
import Input from '../reusables/inputFields/Inputs';
import FileUpload from '../reusables/inputFields/FileUpload';
import Container from '../reusables/container/Container';

import { createUser } from '../../server/api/api.js';

function SignUp() {
  const [showModal, setShowModal] = useState({
    alert: false,
    message: '',
    type: '',
  });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password || !confirmPassword) {
      setShowModal({
        alert: true,
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    } else if (password !== confirmPassword) {
      setShowModal({
        alert: true,
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    } else if (password.length < 6) {
      setShowModal({
        alert: true,
        message: 'Password must be at least 6 characters',
        type: 'error',
      });
      return;
    } else if (username.length < 3) {
      setShowModal({
        alert: true,
        message: 'Username must be at least 3 characters',
        type: 'error',
      });
      return;
    } else if (!email.includes('@')) {
      setShowModal({
        alert: true,
        message: 'Please enter a valid email',
        type: 'error',
      });
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', file);
  
        // Log form data to check if it's being constructed correctly
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
        const response = await createUser(formData);
  
        if (response.success) {
          navigate('/');
        } else {
          console.log(response); // Log the response to understand the error
          setShowModal({
            alert: true,
            message: response.message,
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error creating user:', error);
        setShowModal({
          alert: true,
          message: 'An error occurred. Please try again later.',
          type: 'error',
        });
      }
    }
  };
  
  

  return (
    <>
      <Container>
        <div className="form-container flex flex-column">
          <form onSubmit={handleSubmit} className="flex flex-column">
            <FileUpload
              file={file}
              preview={preview}
              handleFileChange={(e) => {
                setFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            <span className="flex gap">
              <p>Already have an account?</p>
              <Link to="/" className="redirect">
                Log In
              </Link>
            </span>
          </form>
        </div>
      </Container>
      {showModal.alert && (
        <Modal
          message={showModal.message}
          type={showModal.type}
          onClose={() =>
            setShowModal({ alert: false, message: '', type: '' })
          }
        />
      )}
    </>
  );
}

export default SignUp;