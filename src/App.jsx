import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <TodoHeader />
      <hr />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date()); // 1초마다 현재 시간으로 갱신
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
  }, []);

  const formatTime = (date) => {
    const y = date.getFullYear();
    const mo = String(date.getMonth() + 1).padStart(2, '0'); // 0~11 이므로 +1
    const d = String(date.getDate()).padStart(2, '0');

    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}년 ${mo}월 ${d}일 ${h}:${m}:${s}`;
  };

  return (
    <>
      <header>
        <h1>홍엽의 TodoList</h1>
        <p>현재 시각 : {formatTime(time)}</p>
      </header>
    </>
  )
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <footer>
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          onClick={() => {
            const newTodo = { id: Number(new Date()), content: inputValue };
            const newTodoList = [...todoList, newTodo];
            setTodoList(newTodoList);
            setInputValue("");
          }}
          class="insert"
        >
          추가하기
        </button>
      </footer>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <main>
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
    </main>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(prev => !prev); // 클릭 시 input 보여줌
  };
  
  return (
    <li>
      <p className={todo.id}>
        {todo.content}
      </p>

      <label>
        완료
        <input type="checkbox" />
      </label>
      
      {showInput && (
        <>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            onClick={() => {
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              )
              setInputValue("");
            }}
            class="confirm"
          >
            확인
          </button>
        </>
      )}
      
      <button 
        onClick={handleClick}
        class="update"
      >
        수정
      </button>
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
        class="delete"
      >
        삭제
      </button>
    </li>
  );
}

export default App;
