import './GoldFit.css';
import React from 'react'
import Authenticate from './components/Authenticate';

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
