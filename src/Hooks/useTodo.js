import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import api from '../Components/Common/axios';

export const useTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  const viewTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/v2/viewAllTodos/', {
        dispatch, // Pass the dispatch function in the config
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const addTodo = async (name, details) => {
    setLoading(true);
    const payload = {
      data: {
        name,
        details,
      },
    };
    try {
      const response = await api.post('/v2/createTodo/', payload, {
        dispatch, // Pass the dispatch function in the config
      });
      return response;
    } catch (error) {
      console.error('Error adding todo', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (todo) => {
    setLoading(true);
    try {
      const response = await api.delete(`/v2/deleteTodo/${todo._id}`, {
        dispatch, // Pass the dispatch function in the config
      });
      return response;
    } catch (error) {
      console.error('Error deleting todo', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (data) => {
    setLoading(true);
    const payload = {
      data,
    };
    try {
      const response = await api.put('/v2/updateTodo', payload, {
        dispatch, // Pass the dispatch function in the config
      });
      return response;
    } catch (error) {
      console.error('Error updating todo', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewTodos();
  }, [viewTodos]);

  return {
    loading,
    error,
    todos,
    addTodo,
    viewTodos,
    deleteTodo,
    editTodo,
  };
};
