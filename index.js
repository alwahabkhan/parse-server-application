import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
import http from 'http';
import cloud from './cloud/main.js';
import userRoutes from './routes/userRoutes.js';

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

export const app = express();

app.set('trust proxy', true);
app.use(express.json());


app.use('/public', express.static(path.join(__dirname, '/public')));


app.use('/api/users', userRoutes);

if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  await server.start();
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

  await ParseServer.createLiveQueryServer(httpServer);
}
