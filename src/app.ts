import express from "express";
import usersRouter from "./routes/users.router";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
    console.log('res.status', res.status)
    res.status(err.status).send(err.message);
})

export default app;
