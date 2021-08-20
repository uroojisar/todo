/**
 * @format
 */

import React, { Component, useState, useEffect } from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import SQLiteScreen from './src/utils/sqlite';

class RNRedux extends Component {
  
  constructor(){
    super();
    this.state = {
      todos: [],
      preloadedTodos: {"todos": []}
    };
  }
  componentDidMount(){
    new SQLiteScreen().createTable();    
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM tasks',
            [],
            (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
            this.setState({todos: temp});
            this.setState({preloadedTodos: {...this.state.preloadedTodos, "todos": this.state.todos}});
            // console.log("Total rows: ",results.rows.length);
            }
        );
        })
  }
  render(){
    return (
      <Provider store = { configureStore(this.state.preloadedTodos) }>
        <App />
      </Provider>
    );
  }
}
AppRegistry.registerComponent(appName, () => RNRedux);
