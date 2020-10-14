import Express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router';
import { NOT_FOUND } from 'http-status-codes';
import globalErrorHandler from './config/globalErrorHandler';

const App = Express();

App.use(compression());
App.use(cors());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded( { extended: true } ));
App.use('/api', router);

App.use('*', (req,res) => {
  res.status(404).json({
    status: NOT_FOUND,
    message: 'Not Found'
  })
});

App.use(globalErrorHandler);

export default App;
