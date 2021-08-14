import React, { Component } from 'react';
import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="header-image">
          <div className=" d-flex justify-content-center flex-column align-item-center text-white text-center">
            < div className="header">toDo</div>
            < div className="header-text">
             Organize Life and Work
            </div>
          </div>
        </div>
    );
  }
}