import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const {theme} = useContext(ThemeContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_b1boas3", "template_ej2s3i1", e.target, "d3c4uTe81onk02BFW")
      .then(
        (result) => {
          setStatus("Feedback sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send feedback. Please try again.");
        }
      );
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-20 text-center h-[89vh]">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="mb-4">I am a professional web developer specializing in the MERN stack. I love building web applications and am always open to feedback and suggestions!</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
        />
        <textarea
          name="message"
          placeholder="Your Message or Feedback"
          value={formData.message}
          onChange={handleChange}
          required
          className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-white'}`}
        />
        <button type="submit" className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-blue-950 text-white' : 'bg-blue-400 text-zinc-100'}`}>
          Send Feedback
        </button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default ContactUs;
