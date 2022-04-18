import './GoldFit.css';
import React from 'react'
import Authenticate from './Authenticate';

class GoldFit extends React.Component {
  render() {
  return (
    <div className="GoldFit">
      <Authenticate />
    </div>
  );
  }
}

export default GoldFit;
