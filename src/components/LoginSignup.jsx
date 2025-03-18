import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, loginUser } from './api'; // Import API functions

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', address: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for Signup
    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        setMessage('Passwords do not match!');
        return;
      }
      if (!form.address.trim()) {
        setMessage('Please enter your address!');
        return;
      }
    }

    const userData = {
      email: form.email,
      pass: form.password, // 'pass' matches backend field
      address: form.address || 'Default Address', // Address from form
    };

    let res;
    if (isLogin) {
      res = await loginUser(userData);
    } else {
      res = await signupUser(userData);
    }

    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage(res.message);
      localStorage.setItem('name', form.email); // Save to local storage
      navigate('/home');
    }
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)', fontFamily: 'Arial, sans-serif' },
    box: { background: 'rgba(255, 255, 255, 0.8)', padding: '30px', borderRadius: '10px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', width: '90%', maxWidth: '400px', textAlign: 'center' },
    heading: { fontSize: '24px', fontWeight: 'bold', color: '#444', marginBottom: '20px' },
    inputGroup: { marginBottom: '15px' },
    input: { width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px', outline: 'none', transition: 'border-color 0.3s' },
    btn: { width: '100%', padding: '10px', background: '#ff6b6b', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' },
    btnHover: { background: '#ff4c4c' },
    switchContainer: { marginTop: '15px' },
    switchBtn: { color: '#ff6b6b', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' },
    message: { color: 'red', marginTop: '10px' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input type="email" name="email" value={form.email} style={styles.input} placeholder="Email Address" onChange={handleChange} required />
          </div>

          <div style={styles.inputGroup}>
            <input type="password" name="password" value={form.password} style={styles.input} placeholder="Password" onChange={handleChange} required />
          </div>

          {!isLogin && (
            <>
              <div style={styles.inputGroup}>
                <input type="password" name="confirmPassword" value={form.confirmPassword} style={styles.input} placeholder="Confirm Password" onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <input type="text" name="address" value={form.address} style={styles.input} placeholder="Address" onChange={handleChange} required />
              </div>
            </>
          )}

          <button
            type="submit"
            style={styles.btn}
            onMouseEnter={(e) => (e.target.style.background = styles.btnHover.background)}
            onMouseLeave={(e) => (e.target.style.background = styles.btn.background)}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.message}>{message}</p>

        <div style={styles.switchContainer}>
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span style={styles.switchBtn} onClick={handleSwitch}>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
