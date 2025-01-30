const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//GET A SINGLE TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json(getTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server   error");
  }
});
//UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
      [description, id]
    );
    res.json("TODO WAS UPDATED ");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//DELETE A TODO
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json("TODO WAS DELETED");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
