import 'dotenv/config';
import App from '@/app';

const app = new App();

app.listen();

const handleExit = (event: string) => {
  console.log(`Exit process in responding to ${event}`);
  process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
