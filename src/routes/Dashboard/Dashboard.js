import React from 'react';
import AppContext from '../../AppContext';
import TaskList from '../TaskList/TaskList';
import PostList from '../PostList/PostList';
import './Dashboard.css';

const Dashboard = () => {


    return (
      <div className='dashboard'>

        <section className='post-section'>
          <h2 className='post-headline'>POSTS</h2>

          <div>
              <PostList />
            </div>
        </section>

          <section className='doing-section'>
              TASK ITEM
          </section>
          

        <section className='do-task-section'>
          <h2 className='dashboard-headline'>TO DO</h2>
          <TaskList />
        </section>

        <section className='done-task-section'>
          <h2 className='dashboard-headline'>DONE</h2>
          <TaskList />
        </section>
      </div>
    );
  }

export default Dashboard;
