import { useState } from 'react';
import { Icon } from '../common/Icons';

export function Login({ onLogin, onRegister }) {

  const [form, setForm] = useState({
    name: '', 
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm((oldForm) => ({
      ...oldForm,
      [name]: value,
    }));

    setError("");
  }

  const submit = (e) => {

    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (name.length < 2) {
      return setError('Please Enter Your Name.');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Please Enter Valid Email.');
    }

    if (!password){
      return setError("Please Enter Valid Password.")
    }

    const users = JSON.parse(
      localStorage.getItem("focusflow-users") || "[]"
    );

    const user = users.find((item) => 
      item.name.trim().toLowerCase() === name.toLowerCase() &&
      item.email.trim().toLowerCase() === email && 
      item.password === password
    )

    if(!user) {
      return setError("Invalid User!");
    }

    onLogin({ 
      id: user.id, 
      name: user.name,
      email: user.email 
    });

  };


  return <main className="login-page">
    <section className="login-visual">
      <div className="brand brand-light">
        <span><Icon name="check" /></span> 
        FocusFlow
      </div>
      <div className="visual-copy">
        <p className="eyebrow">MAKE EVERY DAY COUNT</p>
        <h1>Plan clearly.<br/>Focus deeply.<br/>Finish proudly.</h1>
        <p>A simple workspace for your tasks, goals, and best ideas.</p>
      </div>
      <div className="floating-card card-one">
        <span>✓</span>
        <div>
            <b>Design portfolio</b>
            <small>Completed today</small>
        </div>
       </div>
      <div className="floating-card card-two">
        <span>3</span>
        <div>
            <b>Great progress!</b>
            <small>Tasks left today</small>
        </div>
      </div>
    </section>
    <section className="login-panel">
      <div className="mobile-brand brand">
        <span><Icon name="check" /></span>
        FocusFlow
      </div>
      <form className="login-form" onSubmit={submit}>
        <p className="eyebrow purple">WELCOME BACK</p>
        <h2>Sign in to your space</h2>
        <p className="muted">Enter your details to continue planning your day.</p>
        <label>Full name
            <input
                autoFocus value={form.name} 
                onChange= {(e) => 
                    setForm({...form, name:e.target.value})
                } 
                placeholder="e.g. Anurag Mishra" 
            />
        </label>
        <label>Email address
            <input
                type="email" 
                value={form.email} 
                onChange={ (e) => 
                    setForm({...form, email:e.target.value})
                } 
                placeholder="you@example.com" 
            />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </label>

        {error && <p className="form-error">{error}</p>}
        <button className="primary-btn full" type="submit">
            Enter my workspace 
            <span>→</span>
        </button>
        <div className="demo-note">
          <span> Don't have an account? </span>
          <button type="button" className='auth-link' onClick={onRegister}>
            Create Account
          </button>
        </div>
        <p>Demo login · Your information stays in this browser.</p>
      </form>
    </section>
  </main>;
}


