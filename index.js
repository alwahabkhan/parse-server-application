import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import http from 'http';
import cloud from './cloud/main.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import parseDashboard from 'parse-dashboard';

const __dirname = path.resolve();

export const config = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/test',
  cloud,
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'http://localhost:1337/parse',
  liveQuery: {
    classNames: ['Posts', 'Comments'],
  },
  allowClientClassCreation: true,
};

const dashboardConfig = {
  apps: [
    {
      serverURL: 'http://localhost:1337/parse',
      appId: 'myAppId',
      masterKey: 'myMasterKey',
      appName: 'MyApplication',
    },
  ],
  users: [
    {
      user: 'admin',
      pass: 'password',
    },
  ],
};

const dashboard = new parseDashboard(dashboardConfig, { allowInsecureHTTP: true });

export const app = express();

app.set('trust proxy', true);
app.use(express.json());

// CORS Configuration
app.use(cors());

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/dashboard', dashboard);
app.use('/api/users', userRoutes);

if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  server.start();
  app.use(mountPath, server.app);
}

app.get('/', (req, res) => {
  res.status(200).send('Parse Server is up and running!');
});

if (!process.env.TESTING) {
  const port = process.env.PORT || 1337;
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('parse-server-example running on port ' + port + '.');
  });

  ParseServer.createLiveQueryServer(httpServer);
}
