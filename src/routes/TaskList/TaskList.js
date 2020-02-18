import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import './TaskList.css';

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasklist: []
    };
  }

  componentDidMount () {
    this.setState({tasklist: this.props.tasks})
  }

  getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  };

handleCategory = (e, array) => {
  e.preventDefault();
  console.log(e.target.value);
  const category = e.target.value;
  const filteredTasks = array.filter(item => item.category == category);
  this.setState({tasklist: filteredTasks});
};

    render() {
      const tasks = this.props.tasks;
      const tasklist = this.state.tasklist.map((task, i) => (<li key={i} id={task.task_id}>{task.description}</li>))
      const categoriesUnique = this.getUnique(this.props.tasks, 'category');
      const categories = categoriesUnique.map((category, i) => 
          (<button 
            id={uuid()}
            value={category.category}
            onClick={e => this.handleCategory(e, tasks)}>
            {category.category}
       </button>))

  return (
    <section className="task-section">
      <div className='category-list'>
        <ul className='category-links'>
         {categories}
        </ul>
      </div>

      <div className='task-list'>
      {tasklist}
      </div>

    
    </section>
  );
};
}

export default TaskList;