import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/model';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [completedTodoList, setCompletedTodoList] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id:Date.now(), title:todo, isDone: false}]);
      setTodo("");
    }
  }

  const handleDrag = (result:DropResult) => {
    const {source, destination} = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = todoList, complete = completedTodoList;
    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodoList(active);
    setCompletedTodoList(complete);
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField 
        todo={todo}
        setTodo={setTodo} 
        handleAdd={handleAdd}     
      />
      <TodoList 
        todoList={todoList}
        setTodoList={setTodoList}
        completedTodoList={completedTodoList}
        setCompletedTodoList={setCompletedTodoList}
      />
    </div>
    </DragDropContext>
  );
}

export default App;
