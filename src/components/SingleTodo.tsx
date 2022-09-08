import React, {useEffect, useRef, useState} from 'react'
import { Todo } from '../models/model';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import {Draggable} from 'react-beautiful-dnd'
import './styles.css'

type Props = {
  index:number
  todo:Todo;
  todoList:Todo[];
  setTodoList:React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({index, todo, todoList, setTodoList}:Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState(todo.title)

  const handleDone = (id:number) => {
    setTodoList(
      todoList.map((todo) => 
        todo.id === id ? {...todo, isDone : !todo.isDone} : todo)        
    )
  }

  const handleDelete = (id:number) => {
    setTodoList(
      todoList.filter((todo) => todo.id !== id)
    )
  }

  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todo) => todo.id === id ? {...todo, title:editTodo} : todo)
    )
    setEdit(!edit);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])
  

  return (
    <Draggable draggableId={todo.id.toString()} index={index} >
      {
        (provided,snapshot) => (
        <form 
          className={`todo_single ${snapshot.isDragging ? 'drag' : ''}`} 
          onSubmit={(e) => handleEdit(e,todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          { edit ? 
          (<input 
            className='todo_single_text'
            value={editTodo} 
            onChange={(e) => setEditTodo(e.target.value)}
          />) : 
          todo.isDone ? 
          (<s className="todo_single_text">
            {todo.title}
          </s>) : 
          (<span className="todo_single_text">
            {todo.title}
          </span>)
          }
          <div>
            <span className='icon' onClick={() => !edit && !todo.isDone ? setEdit(!edit) : edit}>
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className='icon' onClick={()=> handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>)
      }
    </Draggable>
    
  )
}

export default SingleTodo;