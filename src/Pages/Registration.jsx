import { useState } from "react";

export function Register({ onRegister, onBackToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((oldForm) => ({
      ...oldForm,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (
      !name ||
      !email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("focusflow-users") || "[]"
    );

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: form.password,
      createdAt: Date.now(),
    };

    localStorage.setItem(
      "focusflow-users",
      JSON.stringify([...users, newUser])
    );

    onRegister();
  };

  return (
    <div className="login-page">

      {/* Keep the SAME left side as Login */}
      <section className="login-visual">

        <div className="brand brand-light">
          <span>✓</span>
          FocusFlow
        </div>

        <div className="visual-copy">
          <p className="eyebrow">GET STARTED</p>

          <h1>
            Organize your
            <br />
            work.
            <br />
            <span>Own your day.</span>
          </h1>

          <p>
            Create your account and start turning
            your tasks into meaningful progress.
          </p>
        </div>

        <div className="floating-card card-one">
          <span>✓</span>

          <div>
            <strong>Stay organized</strong>
            <small>Everything in one place</small>
          </div>
        </div>

        <div className="floating-card card-two">
          <span>✦</span>

          <div>
            <strong>Focus on what matters</strong>
            <small>Make every day productive</small>
          </div>
        </div>

      </section>


      {/* SAME RIGHT SIDE DESIGN AS LOGIN */}
      <section className="login-panel">

        <div className="login-form">

          <div className="mobile-brand brand">
            <span>✓</span>
            FocusFlow
          </div>

          <p className="eyebrow purple">
            CREATE ACCOUNT
          </p>

          <h2>Create your account</h2>

          <p className="muted">
            Create an account to start using FocusFlow.
          </p>


          <form onSubmit={handleSubmit}>

            {/* ONLY NEW FIELD */}
            <label>
              Full Name

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
            </label>


            {/* SAME EMAIL FIELD */}
            <label>
              Email

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </label>


            {/* SAME PASSWORD FIELD */}
            <label>
              Password

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
            </label>


            {/* NEW CONFIRM PASSWORD FIELD */}
            <label>
              Confirm Password

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </label>


            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            <button
              type="submit"
              className="primary-btn full"
            >
              Create Account
              <span>→</span>
            </button>

          </form>


          {/* BACK TO LOGIN */}
          <div className="demo-note">

            <span> Already have an account? </span>

            <button type="button" className="auth-link" onClick={onBackToLogin}>
               Login
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}
