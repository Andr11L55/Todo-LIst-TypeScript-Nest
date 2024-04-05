import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../../../server/src/todo/entities/todo.entity';
import { TodoStatus } from './types';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get<Todo[]>('http://localhost:3005/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const updateTodoStatus = async (id: number, status: TodoStatus) => {
        try {
            await axios.patch(`http://localhost:3005/api/todos/${id}/status`, { status });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    };

    const addTodo = async () => {
        try {
            await axios.post<Todo>('http://localhost:3005/api/todos', { title: newTodo, status: TodoStatus.Pending });
            setNewTodo('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const removeTodo = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3005/api/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="mb-4">
                <input
                    type="text"
                    required
                    className="border border-gray-400 rounded px-2 py-1 mr-2"
                    placeholder="New Todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />

                <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={addTodo}
                    disabled={!newTodo.trim()}
                >
                    Add Todo
                </button>
            </div>
            <ul>
                {todos
                    .sort((a, b) => a.id - b.id)
                    .map(todo => (
                        <li key={todo.id} className="border-b py-2 flex items-center justify-between">
            <span className={todo.status === TodoStatus.Completed ? 'line-through' : (todo.status === TodoStatus.InProgress ? 'underline' : '')}>
                {todo.title}
                {/*- {todo.status}*/}
            </span>
                            <div>
                                <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                        onClick={() => updateTodoStatus(todo.id, TodoStatus.InProgress)}>Start
                                </button>
                                <button className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                                        onClick={() => updateTodoStatus(todo.id, TodoStatus.Completed)}>Finish
                                </button>
                                <button className="px-2 py-1 bg-red-500 text-white rounded"
                                        onClick={() => removeTodo(todo.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}

            </ul>
        </div>
    );
};

export default TodoList;
