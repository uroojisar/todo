import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class SQLiteScreen extends Component {
  constructor() {
    super();
    SQLite.DEBUG = true;
    this.createTable = this.CreateTable.bind(this);
    this.executeQuery = this.ExecuteQuery.bind(this);
    this.deleteByInsertTime = this.DeleteByInsertTime.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  /**
  * Execute sql queries
  * 
  * @param sql
  * @param params
  * 
  * @returns {resolve} results
  */
  ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      console.log(sql);
      trans.executeSql(sql, params, (trans, results) => {
          console.log("Success");
        resolve(results);
      },
        (error) => {
            console.log("Fail");
          reject(error);
        });
    });
  });

  // Create Table
  async CreateTable() {
      // Add column for task completed/ incomplete
    // let clean = await this.executeQuery("DROP TABLE tasks;",[]);
    let Table = await this.executeQuery("CREATE TABLE IF NOT EXISTS tasks (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(16), datetime INTEGER, inserttime INTEGER, repeat VARCHAR(64), category VARCHAR(16));",[]);
    console.log(Table);
  }

  async addTodo(action){
    let results = await new SQLiteScreen().ExecuteQuery(`Insert into tasks (task_title, datetime, inserttime, repeat, category) values ("${action.payload.task_title}", ${action.payload.datetime}, ${action.payload.inserttime}, "${action.payload.repeat}", "${action.payload.category}");`, []);
    console.log("Todo saved to DB");
    return results;

};
  async DeleteByInsertTime(todoInsertTime) {
    let deletedRow = await this.executeQuery(`DELETE FROM tasks WHERE inserttime=${todoInsertTime};`,[]);
    console.log("Row deleted", deletedRow);

  }


}