import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentSessionController from './app/controllers/StudentSessionController';
import StudentsController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import authMiddleware from './app/middlewares/auth';
import adminRequiredMiddleware from './app/middlewares/adminRequired';
import studentAuthMiddleware from './app/middlewares/studentAuth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/sessions/student', StudentSessionController.store);

routes.post(
    '/students/:id/checkins',
    studentAuthMiddleware,
    CheckinController.store
);
routes.get(
    '/students/:id/checkins',
    studentAuthMiddleware,
    CheckinController.index
);

routes.post(
    '/students/:id/help-orders',
    studentAuthMiddleware,
    StudentHelpOrderController.store
);
routes.get(
    '/students/:id/help-orders',
    studentAuthMiddleware,
    StudentHelpOrderController.index
);

routes.use(authMiddleware);
routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);
routes.get('/students', StudentsController.index);
routes.get('/students/:id', StudentsController.show);
routes.delete('/students/:id', StudentsController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

routes.use(adminRequiredMiddleware);
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
routes.get('/plans/:id', PlanController.show);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);
routes.get('/registrations/:id', RegistrationController.show);

export default routes;
