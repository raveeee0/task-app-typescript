"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const database_1 = require("../database");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    yield database_1.pool.query('INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)', [title, description, completed]);
    return res.status(201).json({
        message: 'Task Added Successfully',
        body: {
            task: { title, description, completed }
        }
    });
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.pool.query('SELECT * FROM tasks ORDER BY id ASC')
        .then((response) => {
        return res.status(200).json(response.rows);
    })
        .catch((error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    database_1.pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        .then((response) => {
        return res.status(200).json(response.rows);
    })
        .catch((error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
});
exports.getTaskById = getTaskById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    database_1.pool.query('UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4', [title, description, completed, id])
        .then((response) => {
        return res.status(200).json({
            message: 'Task Updated Successfully',
            body: {
                task: { title, description, completed }
            }
        });
    }).catch((error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    database_1.pool.query('DELETE FROM tasks WHERE id = $1', [id])
        .then((response) => {
        return res.status(200).json({
            message: 'Task Deleted Successfully',
            body: {
                task: { id }
            }
        });
    }).catch((error) => {
        return res.status(500).json({
            message: 'Error',
            error
        });
    });
});
exports.deleteTask = deleteTask;
