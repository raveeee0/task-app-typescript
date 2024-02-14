import {Request, Response} from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';

export const createTask = async (req: Request, res: Response): Promise<Response> => {
    const {title, description, completed} = req.body;

    await pool.query('INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)', [title, description, completed]);

    return res.status(201).json({
        message: 'Task Added Successfully',
        body: {
            task: {title, description, completed}
        }
    });
};

export const getTasks = async (req: Request, res: Response) => {
    pool.query('SELECT * FROM tasks ORDER BY id ASC')
    .then((response: QueryResult) => {
        return res.status(200).json(response.rows);
    })
    .catch((error: Error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    }); 
};


export const getTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    .then((response: QueryResult) => {
        return res.status(200).json(response.rows);
    })
    .catch((error: Error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
};


export const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const {title, description, completed} = req.body;

    pool.query('UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4', [title, description, completed, id])
    .then((response: QueryResult) => {
        return res.status(200).json({
            message: 'Task Updated Successfully',
            body: {
                task: {title, description, completed}
            }
        });
    }).catch((error: Error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
};

export const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM tasks WHERE id = $1', [id])
    .then((response: QueryResult) => {
        return res.status(200).json({
            message: 'Task Deleted Successfully',
            body: {
                task: {id}
            }
        });
    }).catch((error: Error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
}