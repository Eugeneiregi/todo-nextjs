export const getServerSideProps = async () => {
    try {
      const numRequests = 0; // You can initialize it with a default value if needed
      const responses = await Promise.all(
        Array.from({ length: numRequests }, (_, i) =>
          fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 100) + 1}`)
        )
      );
      const todos = await Promise.all(responses.map((response) => response.json()));
  
      // Sort todos: completed:false objects at the top, followed by completed:true objects
      const sortedTodos = todos.sort((a, b) => {
        if (a.completed === b.completed) {
          return a.title.localeCompare(b.title); // Sort by title lexicographically if completed status is the same
        }
        return a.completed ? 1 : -1;
      });
  
      return {
        props: {
          todos: sortedTodos,
        },
      };
    } catch (error) {
      console.error('Error fetching todos:', error);
      return {
        props: {
          todos: [],
        },
      };
    }
  };
  