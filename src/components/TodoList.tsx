import React from 'react'
import { Todo } from '../models/model';
import SingleTodo from './SingleTodo';
import {Droppable} from 'react-beautiful-dnd'

interface Props {
    todoList:Todo[];
    setTodoList:React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodoList:Todo[];
    setCompletedTodoList:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC<Props> = ({todoList, setTodoList, completedTodoList, setCompletedTodoList}) => {
  return (
    <div className='container'>
        <Droppable droppableId="TodosList">
            {(provided, snapshot) => (
                <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps} >
                    <span className='todos_heading'>Active Tasks</span>
                    {todoList.map((todo, index) => (
                        <SingleTodo 
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todoList={todoList}
                            setTodoList={setTodoList}
                        />
                    ))}
                    {provided.placeholder}
                </div>
                )
            }    
        </Droppable>
        
        <Droppable droppableId="CompletedTodoList">
            {(provided, snapshot) => (
                <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className='todos_heading'>Completed Tasks</span>
                    {completedTodoList.map((todo, index) => (
                        <SingleTodo 
                            index={index}
                            todo={todo}
                            key={todo.id}
                            todoList={completedTodoList}
                            setTodoList={setCompletedTodoList}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        
    </div>
  )
}

export default TodoList