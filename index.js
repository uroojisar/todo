/**
 * @format
 */

import React, { Component, useState, useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

// const store = configureStore();

// const RNRedux = () => (
//     <Provider store = { store }>
//     <App />
//   </Provider>
// )
class RNRedux  extends Component {
  
  constructor(){
    super();
    this.state = {
      tasks: [],
      preloadedTodos: {}
    };
  }
  componentDidMount(){
    console.log("use Effect in RNRedux (componentDidMount)");
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM tasks',
            [],
            (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
            this.state.tasks.push(temp);
    
            console.log("Total rows: ",results.rows.length);
            }
        );
        })
        this.state.preloadedTodos = { "todos": this.state.tasks};
  }
  render(){
    console.log("this.state.tasks: ", this.state.tasks);
    console.log("Preloaded state: ", this.state.preloadedTodos);
    return (
      <Provider store = { configureStore(this.state.preloadedTodos) }>
        <App />
      </Provider>
    );
  }
}
AppRegistry.registerComponent(appName, () => RNRedux);
