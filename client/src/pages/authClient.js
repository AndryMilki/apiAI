import React, {useState} from 'react';
import axios from 'axios';
import './styles/auth.css';
import {useNavigate} from 'react-router-dom';

function AuthClient() {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = async () => {
        const { username, password, email } = form;
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password, email });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        navigate('/notePage');
        return res.data.message;
    };

    const handleRegister = async () => {
        const { username, email, password, confirmPassword } = form;
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { username, email, password, confirmPassword });
        return res.data.message;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const msg = isLogin ? await handleLogin() : await handleRegister();
            setMessage(msg);
            if (!isLogin) {
                setIsLogin(true);
                setForm({ ...form, password: '', confirmPassword: '' });
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };  
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setForm({ username: '', email: '', password: '', confirmPassword: '' });
        setMessage('');
    };

    return(
        <div className = 'auth-container auth-page'>
            <aside className="sidebar">
                <h2>Form</h2>
            </aside>
            <main className='main-content'>
                <div className="auth-panel">
                    <div className="auth-form">
                        <h2>{isLogin ? 'Login' : 'Register'}</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                            {!isLogin && <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />}
                            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                            {!isLogin && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />}
                            <button type="submit" disabled={loading}>{loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}</button>
                        </form>
                        {message && <p className="message">{message}</p>}
                        <div className = 'switch-wrapper'>
                            <button className="toggle-mode" onClick={toggleMode}>
                                {isLogin ? 'Switch to Register' : 'Switch to Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AuthClient;
