import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
      const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            city: ""
      });

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  const response = await axios.post("http://127.0.0.1:5000/register", formData);
                  toast.success(response.data.message, { position: "top-right", autoClose: 3000 });
                  setFormData({ name: "", email: "", phone: "", city: "" });

            } catch (error) {
                  toast.error("Registration failed. Please try again.", { position: "top-right", autoClose: 3000 });
            }
      };

      return (
            <div className="signup-card">
                  <ToastContainer />
                  <div className="signup-header">
                        <h2 className="signup-title">Create Account</h2>
                  </div>

                  <div className="signup-body">
                        <form onSubmit={handleSubmit}>
                              <div className="input-row">
                                    <input
                                          type="text"
                                          className="input-field"
                                          name="name"
                                          placeholder="Full Name"
                                          value={formData.name}
                                          onChange={handleChange}
                                          required
                                    />
                              </div>

                              <div className="input-row">
                                    <input
                                          type="email"
                                          className="input-field"
                                          name="email"
                                          placeholder="Email Address"
                                          value={formData.email}
                                          onChange={handleChange}
                                          required
                                    />
                              </div>

                              <div className="input-row">
                                    <input
                                          type="tel"
                                          className="input-field"
                                          name="phone"
                                          placeholder="Phone Number"
                                          value={formData.phone}
                                          onChange={handleChange}
                                          required
                                    />
                              </div>

                              <div className="input-row">
                                    <input
                                          type="text"
                                          className="input-field"
                                          name="city"
                                          placeholder="City"
                                          value={formData.city}
                                          onChange={handleChange}
                                          required
                                    />
                              </div>

                              <button type="submit" className="submit-btn">
                                    Sign Up
                              </button>
                        </form>
                  </div>
            </div>
      );
}

export default Signup;
