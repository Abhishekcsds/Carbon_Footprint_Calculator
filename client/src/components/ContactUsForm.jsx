import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("/api/contact/send", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-16">
      <div className="mx-4 flex justify-center items-center">
        <div className="bg-gray-200 p-7 md:p-10 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Send us a message
          </h1>
          <div className="space-y-4">
            <input
              className="w-full rounded-lg px-4 p-3 border"
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-lg px-4 p-3 border"
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              className="w-full rounded-lg p-4 border"
              placeholder="Enter Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button
            className="w-full mt-6 p-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 disabled:bg-gray-400 transition-colors"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactUsForm;