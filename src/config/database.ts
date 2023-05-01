import mongoose from 'mongoose';
import 'dotenv/config';

const { DB_MONGO_USER, DB_MONGO_PASSWORD, DB_MONGO_PATH } = process.env;

export class Database {
  private connection: typeof mongoose | null = null;

  async connect() {
    this.connection = await mongoose.connect(
      `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}${DB_MONGO_PATH}`
    );
  }

  async disconnect() {
    await this.connection?.disconnect();
  }
}
