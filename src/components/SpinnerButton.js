import React, { Component } from 'react'

import './SpinnerButton.css';

export default class SpinnerButton extends Component {
  render() {

    const { children, loading } = this.props;

    return (
      <div>
        <button type="submit" disabled={loading} className="btn btn-primary relative px-5">
          {children}

          <div className={loading ? "spinner-border ms-3 spinner" : "hide"}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </button>
      </div>
    )
  }
}