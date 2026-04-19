import React, { useState } from 'react'
import { useTodo } from '../../contexts/TodoContext'
import Todo from '../../components/dashboard/Todo'
import Button from '../../components/Button'
import Input from '../../components/Input.jsx'
import filterTodo from "../../utils/filterTodo.js"
import searchTodo from '../../utils/searchTodo.js'
import LoadingSpinner from "../../components/LoadingSpinner.jsx"

function Tasks() {
    const { todos, loadingTodos } = useTodo()
    const [filter, setFilter] = useState("all")
    const [searchInput, setSearchInput] = useState("")
    const finalTodos = filterTodo(todos, filter)
    const searchedTodo = searchTodo(finalTodos, searchInput.trim())

    return (
        <div className='w-full space-y-8'>
            <div className="w-full">
                <p className="text-gray-500">
                    {">"} <span className="underline">Tasks</span>
                </p>
                <div className='flex items-center justify-between'>
                    <h2 className="text-4xl font-bold mt-2 px-3">
                        Your Tasks
                    </h2>
                    <div className="flex items-center justify-center gap-5">
                        <Input
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className2="w-[300px]! border-gray-300! focus:border-[#017ffd]!"
                        />

                        <div className='flex items-center justify-center px-4 py-2 rounded-md gap-5 bg-gray-200'>
                            <Button onClick={() => setFilter("all")} className={`hover:text-blue-500 ${filter === "all" ? "text-blue-500" : ""}`}>All</Button>
                            <Button onClick={() => setFilter("pending")} className={`hover:text-blue-500 ${filter === "pending" ? "text-blue-500" : ""}`}>Pending</Button>
                            <Button onClick={() => setFilter("completed")} className={`hover:text-blue-500 ${filter === "completed" ? "text-blue-500" : ""}`}>Completed</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-black/7 p-5 rounded-xl flex flex-col items-center justify-center gap-5">
                {loadingTodos ? (<LoadingSpinner />) : searchInput ? (
                    searchedTodo?.length < 1 ? (
                        <div className="w-full flex items-center justify-center text-gray-400">
                            No tasks available!
                        </div>
                    ) : (
                        searchedTodo.map((todo) => (
                            <Todo
                                key={todo?.id}
                                id={todo?.id}
                                title={todo?.title}
                                isCompleted={todo?.completed}
                                createdAt={todo?.createdAt}
                            />
                        ))
                    )
                ) :
                    finalTodos?.length < 1 ? (
                        <div className="w-full flex items-center justify-center text-gray-400">
                            No tasks available!
                        </div>
                    ) : (
                        finalTodos.map((todo) => (
                            <Todo
                                key={todo?.id}
                                id={todo?.id}
                                title={todo?.title}
                                isCompleted={todo?.completed}
                                createdAt={todo?.createdAt}
                            />
                        ))

                    )}

            </div>
        </div>
    )
}

export default Tasks