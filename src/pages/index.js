import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const TodoItem = ({ todo }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space',
      alignItems: 'flex-start',
      padding: '10px',
      borderBottom: '1px solid #ccc',
      fontSize: '20px',
    }}
  >
    <p style={{ color: 'green' }}>
      <strong>Results</strong>
    </p>
    <p style={{ margin: '5px 0px 10px' }}>
      <strong>UserID:</strong> {todo.userId}
    </p>
    <p style={{ margin: '5px 0px 10px' }}>
      <strong>ID:</strong> {todo.id}
    </p>
    <p style={{ margin: '5px 0px 10px' }}>
      <strong>Title:</strong> {todo.title}
    </p>
    <p style={{ margin: '5px 0px 10px' }}>
      <strong>Completed:</strong> {todo.completed ? 'true' : 'false'}
    </p>
  </div>
);

const TodoList = ({ todos }) => {
  const sortedTodos = todos.slice().sort((a, b) => {
    // Sort todos with 'completed: false' first, then 'completed: true'
    if (a.completed === b.completed) {
      // If both todos have the same 'completed' value, sort alphabetically by 'title'
      return a.title.localeCompare(b.title);
    }
    // Otherwise, sort by 'completed' value ('false' comes before 'true')
    return a.completed ? 1 : -1;
  });

  if (sortedTodos.length === 0) {
    return (
      <div style={{ maxHeight: '40px', overflowY: 'auto', display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
        <p>No results found</p>
      </div>
    );
  }

  const transitions = useTransition(sortedTodos, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {transitions((style, todo) => (
        <animated.div style={{ ...style }}>
          <TodoItem key={todo.id} todo={todo} />
        </animated.div>
      ))}
    </div>
  );
};

const Home = ({ initialTodos }) => {
  const [numRequests, setNumRequests] = useState(0);
  const [todos, setTodos] = useState(initialTodos);

  const handleNumRequestsChange = (e) => {
    setNumRequests(parseInt(e.target.value));
  };

  const handleFetchTodos = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: numRequests }, (_, i) =>
          fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 100) + 1}`)
        )
      );
      const todosData = await Promise.all(responses.map((response) => response.json()));
      setTodos(todosData);
      setNumRequests(0); // Clear the input state after fetching todos and displaying the result
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'lightgray',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ECE6F0',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '400px', // Set a fixed width for the container
        }}
      >
        <input
          type="number"
          value={numRequests}
          onChange={handleNumRequestsChange}
          style={{
            width: '200px', // Set a fixed width for the input textbox
            fontSize: '18px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleFetchTodos}
          style={{ backgroundColor: 'purple', color: 'white', fontSize: '18px', padding: '12px 25px', borderRadius: '8px', width: '140px' }}
        >
          Search
        </button>
      </div>
      {todos && (
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#ECE6F0',
            padding: '20px',
            height: '',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '400px', // Set a fixed width for the result container
          }}
        >
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
};

// Implement getServerSideProps as before...

export default Home;