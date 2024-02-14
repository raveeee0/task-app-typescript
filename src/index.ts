import express, { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from './controllers/index.controllers';
import exp from 'constants';

const app: express.Application = express();

const router: Router = Router();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', deleteTask);
router.delete('/tasks/:id', updateTask);

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});