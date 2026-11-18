import { useState } from 'react';
import './App.css';

function App() {
  type Todo = {
    id: number;
    text: string;
    done: boolean;
  };

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React復習', done: false },
    { id: 2, text: 'TypeScript復習', done: true },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  function addTodo() {
    if (text.trim() === '') {
      return;
    }
    setTodos((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((todo) => todo.id), 0) + 1,
        text: text,
        done: false,
      },
    ]);
    setText('');
  }

  function toggleDone(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      )
    );
  }

  function saveTodo(id: number) {
    if (editText.trim() === '') {
      return;
    }
    setTodos((prev) =>
      prev.map((todo) =>
        id === todo.id
          ? {
              ...todo,
              text: editText,
            }
          : todo
      )
    );
    setEditingId(null);
  }

  return (
    <>
      <section>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
        />
        <button onClick={addTodo} disabled={text.trim() === ''}>
          追加
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId !== null && editingId === todo.id ? (
                <>
                  <input
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText}
                  />
                  <button onClick={() => saveTodo(todo.id)}>保存</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleDone(todo.id)}>
                    {todo.done ? '✅' : '⬜'} {todo.text}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.text);
                    }}
                  >
                    編集
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
