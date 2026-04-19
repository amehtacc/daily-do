export default function filterTodo(todos, filter) {
    if (!todos || todos.length < 1) return todos

    if (todos && filter === "all") {
        return todos
    }

    if (todos && filter === "pending") {
        return todos.filter((todo) => todo?.completed === false)
    }

    if (todos && filter === "completed") {
        return todos.filter((todo) => todo?.completed === true)
    }

}