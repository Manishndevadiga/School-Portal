import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    additionalPhone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [showAdditionalPhone, setShowAdditionalPhone] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    const {
      name,
      email,
      phone,
      additionalPhone,
      address,
      password,
      confirmPassword,
    } = formData;

    // Name validation
    if (!validateName(name)) {
      setErrorMessage(
        "Please enter a valid name. Name should only contain alphabets and be at least 2 characters long."
      );
      return;
    }

    // Email validation
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Primary phone validation
    if (!validatePhone(phone)) {
      setErrorMessage("Please enter a valid primary phone number (10 digits).");
      return;
    }

    // Additional phone validation
    if (additionalPhone) {
      if (!validatePhone(additionalPhone)) {
        setErrorMessage(
          "Please enter a valid additional phone number (10 digits)."
        );
        return;
      }
      if (phone === additionalPhone) {
        setErrorMessage(
          "The additional phone number must be different from the primary phone number."
        );
        return;
      }
    }

    // Address validation
    if (!address.trim()) {
      setErrorMessage("Address is required.");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Successful validation
    try {
      const response = await fetch("http://localhost:10000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          additionalPhone,
          address,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          additionalPhone: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        setShowAdditionalPhone(false);
      } else {
        setErrorMessage(data.message);
      }
      navigate("/Student-Login");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // Validation functions
  const validateName = (name) => /^[A-Za-z ]{2,}$/.test(name);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  return (
    <div className="container">
      <div className="title">
        <img
          src="https://i.pinimg.com/originals/bc/a0/5a/bca05a91e1d44035cd89deb2bccbe4a3.png"
          alt="Logo"
          className="logo"
        />
        <h2>Registration Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <div className="phone-container">
          <input
            type="tel"
            id="phone"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            id="addPhoneButton"
            maxLength={10}
            onClick={() => setShowAdditionalPhone(!showAdditionalPhone)}
            disabled={showAdditionalPhone}
          >
            +
          </button>
        </div>

        {showAdditionalPhone && (
          <div className="phone-container">
            <label htmlFor="additionalPhone">Secondary Phone Number:</label>
            <input
              type="tel"
              id="additionalPhone"
              name="additionalPhone"
              value={formData.additionalPhone}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="remove-phone-button"
              onClick={() => {
                setShowAdditionalPhone(false);
                setFormData({ ...formData, additionalPhone: "" });
              }}
            >
              -
            </button>
          </div>
        )}

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setShowPasswordHint(true)}
          onBlur={() => setShowPasswordHint(false)}
          required
        />
        {showPasswordHint && (
          <small id="passwordHint" className="hint">
            Password must contain at least 8 characters, including an uppercase
            letter, a number, and a special character.
          </small>
        )}

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Register</button>
      </form>
      {errorMessage && (
        <div id="errorMessage" className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StudentRegister;
