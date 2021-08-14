import React, { Component } from 'react'

import firebase from '../firebase/firebase';

import Task from '../models/Task';

import TaskTable from './TaskTable';
import AddTask from './AddTask';
import Spinner from './Spinner';

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    this.db = firebase.firestore();

    this.state = {
      tasks: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  async fetchTasks() {
    this.setState({ loading: true });

    try {
      const { user } = this.props;

      const snapshot = await this.db.collection('tasks')
        .where('userId', '==', user.uid)
        .get();
      const tasks = snapshot.docs.map(doc => Task.fromDocument(doc));

      this.setState({ tasks: tasks });

    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  }

  async onTaskCreated(task) {
    this.setState({ loading: true });

    try {

      const docRef = this.db.collection('tasks').doc();
      await docRef.set({
        name: task.name,
        completed: task.completed,
        userId: task.userId,
      });

      task.id = docRef.id;
      this.state.tasks.push(task);
      this.setState({ tasks: this.state.tasks });

    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  }

  async onTaskUpdated(task) {
    this.setState({ loading: true });

    try {

      await this.db.collection('tasks').doc(task.id).update({
        name: task.name,
        completed: task.completed,
      });

      const updatedTaskArr = this.state.tasks.map(t => t.id === task.id ? task : t);
      this.setState({ tasks: updatedTaskArr });

    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  }

  async onTaskRemoved(taskId) {
    this.setState({ loading: true });

    try {

      await this.db.collection('tasks').doc(taskId).delete();

      const updatedTaskArr = this.state.tasks.filter(task => task.id !== taskId);
      this.setState({ tasks: updatedTaskArr });

    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { user } = this.props;

    return (
      <div className="container card mt-4 p-4">

        <div className="text-center">
          <h1>Task List</h1>
        </div>

        <hr />

        <div className="text-center">
          <h3>Our simple task list</h3>
        </div>


        <AddTask
          user={user}
          createTask={(task) => this.onTaskCreated(task)}
        />

        <TaskTable
          tasks={this.state.tasks}
          taskUpdated={(task) => this.onTaskUpdated(task)}
          taskRemoved={(taskId) => this.onTaskRemoved(taskId)}
        />

        <div className="d-flex justify-content-center mt-3">
          <Spinner loading={loading} />
        </div>
      </div>
    );
  }
}