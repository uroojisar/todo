import React from 'react'; // Necessary for export app function
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import TaskListScreen from "./screens/TaskListScreen";
import NewTaskScreen from "./screens/NewTaskScreen";
import Task from "./components/Task";
import {TaskProvider} from "./context/TaskContext";
// Add this code to craete a Global variable db to connect with SQLite database.
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: '../android/app/src/main/assets/',
    // location: 'default',
    createFromLocation: '~SQLite.db',
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

const navigator = createStackNavigator(
  {
    Tasks: TaskListScreen,
    AddTask: NewTaskScreen,
    Task: Task,
  },
  {
    initialRouteName: 'Tasks',
    defaultNavigationOptions: 
    {
      title: 'Todo List',
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <TaskProvider>
    <App/>
  </TaskProvider>;
};


