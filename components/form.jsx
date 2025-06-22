import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countriesWithCities = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

const Form = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.firstName.trim()) errs.firstName = 'First Name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.email || !emailRegex.test(form.email)) errs.email = 'Valid Email is required';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!phoneRegex.test(form.phoneNumber)) errs.phoneNumber = 'Enter 10 digit phone number';
    if (!form.country) errs.country = 'Select country';
    if (!form.city) errs.city = 'Select city';
    if (!panRegex.test(form.pan)) errs.pan = 'Invalid PAN format';
    if (!aadharRegex.test(form.aadhar)) errs.aadhar = 'Aadhar must be 12 digits';

    setErrors(errs);
    setIsValid(Object.keys(errs).length === 0);
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) navigate('/success', { state: form });
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {['firstName', 'lastName', 'username', 'email'].map((field) => (
          <div key={field}>
            <label>{field.replace(/^\w/, c => c.toUpperCase())}</label>
            <input type="text" name={field} value={form[field]} onChange={handleChange} />
            {errors[field] && <p className="error">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>Phone No.</label>
          <select name="phoneCode" value={form.phoneCode} onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label>Country</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countriesWithCities).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div>
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange} disabled={!form.country}>
            <option value="">Select City</option>
            {countriesWithCities[form.country]?.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div>
          <label>PAN No.</label>
          <input type="text" name="pan" value={form.pan} onChange={handleChange} />
          {errors.pan && <p className="error">{errors.pan}</p>}
        </div>

        <div>
          <label>Aadhar No.</label>
          <input type="text" name="aadhar" value={form.aadhar} onChange={handleChange} />
          {errors.aadhar && <p className="error">{errors.aadhar}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
