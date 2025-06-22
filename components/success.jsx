import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  return (
    <div className="form-container">
      <h2>Submission Successful!</h2>
      <ul>
        {Object.entries(state).map(([key, val]) => (
          <li key={key}><strong>{key}:</strong> {val}</li>
        ))}
      </ul>
    </div>
  );
};

export default Success;
