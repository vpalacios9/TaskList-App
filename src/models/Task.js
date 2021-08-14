export default class Task {

    static fromDocument(doc) {
      const task = new Task('', '');
  
      const data = doc.data();
      task.id = doc.id;
      task.completed = data.completed;
      task.name = data.name;
      task.userId = data.userId;
  
      return task;
    }
  
    constructor(name, userId) {
      this.id = null;
      this.completed = false;
      this.name = name;
      this.userId = userId;
    }
  }