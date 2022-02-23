import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Lists from './component/Lists';
import { List, Avatar } from 'antd';
import { Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

interface Todo {
  id: number,
  text: string
}

type ActionType = | {type: "ADD"; text: string} | {type: "REMOVE"; id: number};

function App() {

  const [viewSavedList, setList] = useState (true);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {

    switch (action.type) {

      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];

      case "REMOVE":

        return state.filter(({ id }) => id !== action.id);

    }

    
  }, []);


  const newTodoRef = useRef<HTMLInputElement>(null);


  const onAddTodo = () => {

    setList(false);

    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  };

  const saveInLs = async () => {

   await localStorage.setItem("todos", JSON.stringify(todos));

    setList(true);

    window.location.reload();
  };

  const todosFromLs: any =  localStorage.getItem("todos");
  
  const savedTodos: Todo[] = JSON.parse(todosFromLs);

  return (
    <div className="App">
      {/* <Lists></Lists> */}
      <h1> Todo List </h1>
      <input placeholder="Add a new member" className="input" type="text" ref={newTodoRef} />
      
      <br />
      <Button type="primary" onClick={() => onAddTodo()}>Add</Button> 

{
  viewSavedList ?  "" :       
  
  <Button style={{marginLeft: "10px"}} type="primary" onClick={() => saveInLs()}>
  Save
</Button>
}




{
  viewSavedList ?  
  
  
  <div className="list-component">
      <h1>Saved in localStroage</h1>
      <Button type="primary" danger onClick={() => saveInLs()}>
        Remove all from localStroage
      </Button>
  <List
  itemLayout="horizontal"
  dataSource={savedTodos}
  renderItem={item => (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={<a href="https://ant.design">{item.text}</a>}
        description="Mobile: +8801799827366"
      />
    </List.Item>
  )}
/>,
</div> :

<div className="list-component">
<List
itemLayout="horizontal"
dataSource={todos}
renderItem={item => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={<a href="https://ant.design">{item.text}</a>}
      description="Mobile: +8801799827366"
    />

      <Button type="primary" danger onClick={() => dispatch({ type: "REMOVE", id: item.id })}>
        Remove
      </Button>
  </List.Item>
)}
/>,
</div>

}
    </div>
  );
}

export default App;
