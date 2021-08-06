import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class SQLiteScreen extends Component {
  constructor() {
    super();
    SQLite.DEBUG = true;
    this.createTable = this.CreateTable.bind(this);
    this.executeQuery = this.ExecuteQuery.bind(this);
    this.deleteById = this.DeleteById.bind(this);
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
    let Table = await this.executeQuery("CREATE TABLE IF NOT EXISTS tasks (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task_title VARCHAR(16), datetime INTEGER);",[]);
    console.log(Table);
  }

  async DeleteById(taskID) {
    let deletedRow = await this.executeQuery(`DELETE FROM tasks WHERE id=${taskID};`,[]);
    console.log("Row deleted", deletedRow);

  }

}