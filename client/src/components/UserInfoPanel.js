import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoPanel = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="user-info">
      {username ? (
        <>
          <p>Ви зайшли як: <strong>{username}</strong></p>
          <button className="logout-btn" onClick={onLogout}>Вийти</button>
        </>
      ) : (
        <button className="login-btn" onClick={() => navigate('/')}>Увійти</button>
      )}
    </div>
  );
};

export default UserInfoPanel;
