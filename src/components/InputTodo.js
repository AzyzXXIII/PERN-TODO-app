import React, { useState } from "react";

export const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mt-4 mb-3"> PERN Todo List</h1>

        <form className="input-group mb-3" onSubmit={onSubmitForm}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a task..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="btn btn-success">Add Task</button>
        </form>
      </div>
    </>
  );
};
