import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {

    const { loading } = this.props;

    return (
      <div>
        <div className={loading ? "spinner-border ms-3" : ""}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}