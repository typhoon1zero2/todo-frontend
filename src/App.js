import "./App.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { MdPendingActions , MdOutlineCloudDone , MdOutlineWarningAmber} from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { BsPencil } from "react-icons/bs";


function App() {
  const [todo, setTodo] = useState({});
  const [submitTodo, setSubmitTodo] = useState(false);
  const [buttonTodo, setButtonTodo] = useState(false);
  const entry = useRef(null);
  const status = useRef(null);

  const getData = async () => {
    try {
      const fetchData  = await axios.get("https://mernfstodo.herokuapp.com/todos/table");
       setTodo(fetchData.data);
       //console.log(todo)
    } catch (err) {
      //console.log(err);
    }
  }
  useEffect(() => {
    getData();

  },[submitTodo, buttonTodo]);

  const handleButtons = async (todoStatus, id) => {
    try {
      const { status } = await axios.put(`https://mernfstodo.herokuapp.com/todos/${id}`, {
        status: todoStatus,
      });
      if (status === 200) {
        setButtonTodo(!buttonTodo);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await axios.post(`https://mernfstodo.herokuapp.com/todos`, {
        entry: entry.current.value,
        status: status.current.value.toUpperCase(),
      });
      setSubmitTodo(!submitTodo);
      entry.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };


  return (
    
    <div className="App">
      <div className="container">
        <div>
          <h1 className="todo">To-do <BsPencil /></h1>
          <div className="list">
            {todo["TO-DO"]
              ? todo["TO-DO"].map((item, idx) => {
                  return (
                    <div className="task" key={idx}>
                      <Link to={`./${item._id}`}>{item.entry}</Link>
                      <div>
                        <button
                          className="button"
                          onClick={() => { 
                            handleButtons("COMPLETED", item._id);
                          }}
                        >
                          <FaArrowAltCircleLeft />
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            handleButtons("PENDING", item._id);
                          }}
                        >
                          <FaArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div>
          <h1>In-Progress <MdPendingActions /></h1>
          <div className="list">
            {todo["PENDING"]
              ? todo["PENDING"].map((item, i) => {
                  return (
                    <div className="task" key={i}>
                      <Link to={`./${item._id}`}>{item.entry}</Link>
                      <div>
                        <button
                          className="button"
                          onClick={() => {
                            handleButtons("TO-DO", item._id);
                          }}
                        >
                          <FaArrowAltCircleLeft />
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            handleButtons("COMPLETED", item._id);
                          }}
                        >
                          <FaArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div>
          <h1>Done <MdOutlineCloudDone /></h1>
          <div className="list">
            {todo["COMPLETED"]
              ? todo["COMPLETED"].map((item, i) => {
                  return (
                    <div className="task" key={i}>
                      <Link to={`./${item._id}`}>{item.entry}</Link>
                      <div>
                        <button
                          className="button"
                          onClick={() => {
                            handleButtons("PENDING", item._id);
                          }}
                        >
                          <FaArrowAltCircleLeft />
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            handleButtons("TO-DO", item._id);
                          }}
                        >
                          <FaArrowAltCircleRight />
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <div className="input-entry">
        <form className="form">
          <label>
            Entry: <input ref={entry} type="text" />
          </label>
          <label>
            Status:
            <select ref={status}>
              <option value="to-do">To-Do</option>
              <option value="pending">In-Progress</option>
              <option value="completed">Done</option>
            </select>
          </label>
          <button className="submit" onClick={handleSubmit}>
           <h2> <SiAddthis /></h2>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
