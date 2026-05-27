import { useState } from "react";

import API from "../api/axios";

import { useAuth }
from "../context/AuthContext";

import { useNavigate }
from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      login(data);

      navigate("/dashboard");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-xl shadow-lg space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;