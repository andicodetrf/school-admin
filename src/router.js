import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import Register from './controllers/Register';
import Workload from './controllers/Workload';
import UpdateRecord from './controllers/UpdateRecord';


const router = Express.Router();

router.use('/', HealthcheckController, Register, UpdateRecord, Workload );



export default router;
