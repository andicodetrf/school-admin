import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import Register from './controllers/Register';
import Workload from './controllers/Workload';
import UpdateRecord from './controllers/UpdateRecord';
import WorkloadDum from './controllers/WorkloadDummy';
// import generateReport from './controllers/Workload';

const router = Express.Router();

router.use('/', HealthcheckController, Register, UpdateRecord, Workload, WorkloadDum);
// router.get('/reports/workload', generateReport)


export default router;
