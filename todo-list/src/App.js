import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks
    try {
      await axios.post('http://127.0.0.1:5000/tasks', { task: newTask });
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.description);
  };

  const updateTask = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${currentTask.id}`, { task: newTask });
      setNewTask('');
      setIsEditing(false);
      setCurrentTask({});
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTask();
    } else {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="header">Get Things Done!</h1>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="input"
          />
          <button type="submit" className="button">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.description}
              <div className="icons">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => editTask(task)}
                  className="edit-icon"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => deleteTask(task.id)}
                  className="delete-icon"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
