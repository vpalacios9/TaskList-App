import React, { Component } from 'react';

import firebase from '../firebase/firebase';
import SpinnerButton from './SpinnerButton';
import ErrorAlert from './ErrorAlert';


export default class Register extends Component {


  constructor(props) {
    super(props);

    this.auth = firebase.auth();

    this.state = {
      email: '',
      password: '',
      loading: false,
      error: '',
    };
  }

  async onRegister(e) {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { email, password } = this.state;
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      console.log(userCredential.user);

      this.props.history.push('/');
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }


  render() {
    const { email, password, loading, error } = this.state;

    return (
      <div className="container my-4">

        <h2>Register</h2>

        <form onSubmit={(e) => this.onRegister(e)}>

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
            <SpinnerButton loading={loading}>Register</SpinnerButton>
          </div>

          <ErrorAlert error={error} />

        </form>

      </div>
    )
  }
}