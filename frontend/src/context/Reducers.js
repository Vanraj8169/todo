import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

export const fetchTask = createAsyncThunk("tasks/fetchTasks", async (task) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_URL}/task/all?filter=${task.message}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.tasks;
});

export const addTask = createAsyncThunk("tasks/addTasks", async (task) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/task/create`, task, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.message;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTasks",
  async (task) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/task/update/${task.id}`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  }
);

export const deleteOneTask = createAsyncThunk(
  "tasks/deleteOneTasks",
  async (task) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/task/delete/${task._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.message;
  }
);

export const deleteTask = createAsyncThunk("tasks/deleteTasks", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/task/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.message;
});
