import { Application } from 'express';
import { Server } from 'http';
import { PORT } from '../../src/config';
import { app } from '../../src/index';

export class TestServer {
  private app: Application;
  private server: Server | null = null;

  constructor() {
    this.app = app;
  }

  public getApp(): Application {
    return this.app;
  }

  public async start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(PORT, () => {
        console.log(`Test server running on http://localhost:${PORT}`);
        resolve();
      });
    });
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            this.server = null;
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}