import React, {useState, useRef, useEffect} from 'react'
import { Todo } from '../model'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

interface Props{
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isEdit])
  

  const handleDone = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, isDone: !todo.isDone} : todo
    ))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault()

    setTodos(todos.map(todo => (
      todo.id === id ? {...todo, todo: editTodo} : todo
    )))

    setIsEdit(false)
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {
            isEdit ? (
              <input 
                ref={inputRef}
                type="text" 
                value={editTodo} 
                onChange={(e) => setEditTodo(e.target.value)}
                className="todo__single--text"
              />
            ) : (
              todo.isDone 
              ? <s className="todos__single--text">{todo.todo}</s>
              : <span className="todos__single--text">{todo.todo}</span>
            )
          }
          <div>
            <span className="icon" onClick={() => {
              if(!isEdit && !todo.isDone) {
                setIsEdit(true)
              }
            }}
            >
              <AiFillEdit/>
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete/>
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone/>
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo