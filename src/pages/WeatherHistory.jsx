import React from 'react';
import { useNavigate } from 'react-router-dom';

const WeatherHistory = ({ historyList }) => {
  const navigate = useNavigate();

  return (
    <div className="history-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
      <h3>Search History</h3>
      <div className="history-list">
        {historyList.map((city, index) => (
          <div className="history-item" key={index}>
            <span>{city}</span>
            <div className="history-actions">
              <button className="edit-button">
                <i className="fas fa-edit"></i>
              </button>
              <button className="delete-button">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherHistory;
