import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';




const TodoItem = ({ todo }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      justifyContent: 'space',
      alignItems: 'flex-start',
      padding: '10px',
      borderBottom: '1px solid #ccc',
      fontSize: '20px',
      // fontWeight: 'bold',
    }}
  >
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

const TodoList = ({ todos }) => (
  
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {todos.length === 0 ? (
      <p>No results found</p> // Display this message when there are no results
    ) : (
      todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
    )}
  </div>
);

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
          style={{ backgroundColor: 'purple',color: 'white', fontSize: '18px', padding: '12px 25px', borderRadius: '8px', width: '140px' }}
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