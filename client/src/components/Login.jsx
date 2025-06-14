import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../redux/features/authSlice';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setUser(res.user))
      navigate('/projects')
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-4">
      <section
        className="bg-[var(--color-primary)] bg-opacity-10 backdrop-blur-lg rounded-2xl max-w-md w-full p-8 shadow-lg"
        aria-label="Login form"
      >
        <h1 className="text-center text-2xl font-extrabold mb-8 text-[var(--color-secondary)]">
          Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
           
            <div className="relative pt-4">
              <MdEmail className="absolute left-2 top-10 transform -translate-y-1/2 text-[var(--color-secondary)] text-xl pointer-events-none" aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 text-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-opacity-30 transition"
                aria-label="Email address"
              />
            </div>
          </div>

          <div>
           
            <div className="relative py-4">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)] text-xl pointer-events-none" aria-hidden="true" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength={8}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 text-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:bg-opacity-30 transition"
                aria-label="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[var(--color-secondary)] hover:to-indigo-700 text-white font-bold text-lg shadow-md transition transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500"
            aria-label="Log in to your account"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-[var(--color-secondary)] pt-4 text-sm">
          Not registered?{' '}
          <a
            href="register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
            tabIndex={0}
            role="link"
            aria-label="Go to registration page"
          >
            Create an account
          </a>
        </p>
      </section>
    </div>
  );
}

export default Login