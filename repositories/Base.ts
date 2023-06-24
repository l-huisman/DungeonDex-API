import { createConnection, Connection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

export class BaseRepository {
  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      insecureAuth: true,
    });
  }

  public openConnection(): void {
    this.connection.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL server: ", error);
        return;
      }
      console.log(`Connected to MySQL server (${process.env.DB_HOST}), on port ${process.env.DB_PORT}`);
    });
  }

  public async closeConnection(): Promise<void> {
    await this.connection.end();
  }

  public async executeNonQuery(query: string, params?: any[]): Promise<void> {
    try {
      this.openConnection();
      await new Promise<void>((resolve, reject) => {
        this.connection.query(query, params, (error: any, results: any) => {
          if (error) {
            console.error("Error executing query: ", error);
            reject(error);
            return;
          }
          console.log("Query executed successfully.");
          resolve();
        });
      });
    } finally {
      this.closeConnection();
    }
  }

  public async executeQuery(query: string, params?: any[]): Promise<any[]> {
    try {
      this.openConnection();
      return await new Promise<any[]>((resolve, reject) => {
        this.connection.query(query, params, (error: any, results: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    } finally {
      this.closeConnection();
    }
  }
}