import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoPanel = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="user-info">
      {username ? (
        <>
          <p>Вы вошли как: <strong>{username}</strong></p>
          <button className="logout-btn" onClick={onLogout}>Выйти</button>
        </>
      ) : (
        <button className="login-btn" onClick={() => navigate('/')}>Войти</button>
      )}
    </div>
  );
};

export default UserInfoPanel;
