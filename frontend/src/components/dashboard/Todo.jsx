import React, { useState } from 'react'
import Input from '../Input.jsx'
import { Edit, Trash2, Save } from "lucide-react"
import Button from "../Button.jsx"
import { useTodo } from "../../contexts/TodoContext.jsx"
import { toast } from "react-toastify"
function Todo({
  id,
  title,
  isCompleted,
  createdAt,
  ...props
}) {
  const [editingTodo, setEditingTodo] = useState(false)
  const [newTodo, setNewTodo] = useState(title)
  const [completed, setCompleted] = useState(isCompleted)
  const { handleUpdateTodo, handleDeleteTodo } = useTodo()

  async function editTodo() {
    if (!newTodo.trim()) {
      return toast.error("Todo title required!")
    }

    try {
      const res = await handleUpdateTodo(id, newTodo, completed)

      if (res?.success) {
        toast.success(res?.message)
      }

    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    } finally {
      setEditingTodo(false)
    }
  }

  async function completeTodo(status) {
    setCompleted(status)

    try {
      const res = await handleUpdateTodo(id, newTodo, status)

      if (res?.success && status) {
        return toast.success("Todo completed!")
      } else if (res?.success && !status) {
        return toast.error("Todo not completed!")
      }

    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }

  async function deleteTodo() {
    try {
      const res = await handleDeleteTodo(id)

      if (res?.success) {
        return toast.success(res?.message)
      }
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='w-full bg-black/7 p-5 rounded-xl flex items-center justify-between'>
      <div className='w-[80%] flex items-center justify-center gap-2'>
        <Input
          id={id}
          type='checkbox'
          className1="w-fit!"
          className2="w-5! h-5! cursor-pointer"
          checked={completed}
          onChange={(e) => completeTodo(e.target.checked)}
        />

        <Input
          id={id}
          name={title}
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          disabled={!editingTodo}
          className2={`border-none ${editingTodo ? "bg-gray-200" : ""} ${completed ? "line-through text-red-500" : ""}`}
        />
      </div>

      <div className='flex items-center justify-center gap-5'>
        {editingTodo && (<Button onClick={editTodo}><Save className='text-green-500' /></Button>)}
        {!completed && (<Button onClick={() => setEditingTodo((prev) => !prev)}><Edit className='text-blue-500' /></Button>)}
        <Button onClick={deleteTodo}><Trash2 className='text-red-500' /></Button>
      </div>

    </div>
  )
}

export default Todo