import React, { Component } from 'react'

export default class ErrorAlert extends Component {
  render() {
    const { error } = this.props;

    return (
      <div>
        {
          error ?
            <div className="alert alert-danger p-3 mt-3">{error}</div>
            :
            <div></div>
        }
      </div>
    )
  }
}