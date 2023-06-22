// Base Repository which will be extended by all other repositories
// The Base Repository will contain SQL connection
// The methods contained in the Base Repository will be:
// OpenConnection(): Opens the SQL connection
// CloseConnection(): Closes the SQL connection
// ExecuteNonQuery(): Executes a SQL query that does not return any data
// ExecuteQuery(): Executes a SQL query that returns data
// ExecuteEditQuery(): Executes a SQL query that inserts, updates or deletes data
// ExecuteSelectQuery(): Executes a SQL query that selects data

import { createConnection, Connection, Query } from "mysql";
import dotenv from "dotenv";

dotenv.config();

export class BaseRepository {
  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  public openConnection(): void {
    this.connection.connect();
  }

  public closeConnection(): void {
    this.connection.end();
  }

  public executeNonQuery(query: string, params?: any[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public executeQuery(query: string, params?: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public executeEditQuery(query: string, params?: any[]): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.connection.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  }

  public executeSelectQuery(query: string, params?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}
