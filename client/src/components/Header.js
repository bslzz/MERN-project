import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from './AuthOptions';

const Header = () => {
  return (
    <div className="mainheader">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <AuthOptions />
    </div>
  );
};

export default Header;
