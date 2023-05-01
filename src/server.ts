import 'dotenv/config';
import App from '@/app';
import { validateEnv } from '@/utils/validateEnv';

validateEnv();

const app = new App();

app.listen();

const handleExit = (event: string) => {
  console.log(`Exit process in responding to ${event}`);
  process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
