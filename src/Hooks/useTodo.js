import axios from 'axios';
import config from '../config';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const token = useSelector((state) => state.user.token);

  const viewTodos = async()=>{
    setLoading(true);
    try {
        const response = await axios.get(`${config.apiBaseUrl}/v2/viewAllTodos/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setTodos(response.data);
    } catch (error) {
        console.error('Error fetching brands', error);
        setError(error);
    } finally {
        setLoading(false);
    }
  }
  useEffect(() => {
    viewTodos();
}, []);


  return {
    loading,
    error,
    todos
  };
};
