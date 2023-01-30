import { useState } from "react";
import bgDark from "/images/bg-desktop-dark.jpg";
import bgLight from "/images/bg-desktop-light.jpg";
import { AiOutlineClose } from "react-icons/ai";
import "./App.css";

// const Todos = [

// ];

function App() {
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(false);
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [display, setDisplay] = useState(null);
  const [dark, setDark] = useState(true);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");

  const [todos, setTodos] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title && !desc) return;
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: title,
        description: desc,
        completed: false,
      },
    ]);
    setTitle("");
    setDesc("");
    setCreate(false);
  }
  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  function handleTodoClick(index) {
    const newTodos = [...todos];
    todos[index].completed = !todos[index].completed;
    setTodos(newTodos);
  }
  function displaySingle(index) {
    let displayTodo = todos.find((el, i) => i === index);
    setDisplay(displayTodo);
    setUpdateTitle(displayTodo.title);
    setUpdateDesc(displayTodo.description);
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const index = todos.findIndex((obj) => {
      return obj.id === display.id;
    });
    todos[index].title = updateTitle;
    todos[index].description = updateDesc;
    setUpdateTitle("");
    setUpdateDesc("");
    setView(false);
  };
  let real = active || completed ? filtered : todos;
  return (
    <div className="App">
      <div
        className="top"
        style={{
          backgroundImage: `${
            dark ? "url(" + bgDark + ")" : "url(" + bgLight + ")"
          }`,
        }}
      ></div>
      <div className="bottom"></div>
      <div className="on_top">
        <div className="name">
          <div>
            <h1>TODO</h1>
          </div>
          <div>
            <img
              onClick={() => setDark(!dark)}
              src={`/images/icon-${dark ? "sun" : "moon"}.svg`}
              alt="light"
            />
          </div>
        </div>
        <div>
          <button onClick={() => setCreate(true)}>
            Click here to add a TODO
          </button>
        </div>
        <div className="list">
          <ul>
            {real.map((todo, index) => {
              const { title, id } = todo;
              return (
                <li key={id}>
                  <span onClick={() => handleTodoClick(index)}>
                    {" "}
                    <input
                      type="checkbox"
                      name="complete"
                      checked={todo.completed}
                      id="complete"
                    />{" "}
                  </span>
                  <span
                    onClick={() => {
                      setView(true);
                      displaySingle(index);
                    }}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {title}
                  </span>
                  <span onClick={() => handleRemoveTodo(index)}>
                    <AiOutlineClose />
                  </span>
                </li>
              );
            })}
          </ul>
          {todos.length > 0 ? (
            <div className="action">
              <span
                style={{
                  color: !active && !completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  // setFiltered(todos);
                  setActive(false);
                  setCompleted(false);
                }}
              >
                All
              </span>
              <span
                style={{
                  color: active && !completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  setFiltered(
                    todos.filter((todo) => {
                      return todo.completed === false;
                    })
                  );
                  setCompleted(false);
                  setActive(true);
                }}
              >
                Active
              </span>
              <span
                style={{
                  color: !active && completed ? "" : "hsl(235, 19%, 35%)",
                }}
                onClick={() => {
                  setFiltered(
                    todos.filter((todo) => {
                      return todo.completed !== false;
                    })
                  );
                  // setAll(false);
                  setCompleted(true);
                  setActive(false);
                }}
              >
                Completed
              </span>
              <span
                onClick={() => {
                  setTodos([]);
                  setActive(false);
                  setCompleted(false);
                }}
              >
                Clear all
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="addTodo" style={{ display: create ? "flex" : "none" }}>
        <span className="close" onClick={() => setCreate(false)}>
          Close
        </span>
        {/* <h1>Add todo</h1> */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter title here..."
              value={title}
              onChange={function (e) {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              placeholder="Enter description here..."
              value={desc}
              onChange={function (e) {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Add</button>
          </div>
        </form>
      </div>
      <div className="addTodo" style={{ display: view ? "flex" : "none" }}>
        <h2 className="close" onClick={() => setView(false)}>
          Close
        </h2>

        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter title here..."
              value={updateTitle}
              onChange={function (e) {
                setUpdateTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              placeholder="Enter description here..."
              value={updateDesc}
              onChange={function (e) {
                setUpdateDesc(e.target.value);
              }}
            />
          </div>
          <div>
            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
