import React, { Component } from 'react';

import firebase from '../firebase/firebase';
import ErrorAlert from './ErrorAlert';

import SpinnerButton from './SpinnerButton';

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.auth = firebase.auth();

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  async onLogin(e) {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { email, password } = this.state;
      await this.auth.signInWithEmailAndPassword(email, password);

      this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className="container my-4">

        <h2>Login</h2>

        <form onSubmit={(e) => this.onLogin(e)}>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              value={email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              className="form-control" />
          </div>

          <div className="d-flex justify-content-end">

            <SpinnerButton loading={loading}>Login</SpinnerButton>

          </div>

          <ErrorAlert error={error} />

        </form>

      </div>
    )
  }
}