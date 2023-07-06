import express from 'express';
const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = usersController;

/* GET */
usersRouter.get("/", getUsers);
usersRouter.get(`/by/:id`, getUserById);

/* POST */
usersRouter.post("/", createUser);

/* PUT */
usersRouter.put("/edit", updateUser);

/* DELETE */
usersRouter.delete("/delete", deleteUser);


export default usersRouter;