import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import './navbar.css'
export default class Navbar extends Component {

  logout() {
    firebase.auth().signOut();
  }

  render() {

    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            toDo
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              {
                user ?
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/task-list">Task List</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-primary"
                        onClick={() => this.logout()}>
                        Logout
                      </button>
                    </li>
                  </div>
                  :
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/register">Register</Link>
                    </li>
                  </div>
              }

            </ul>
          </div>
        </div>
      </nav>
    )
  }
}