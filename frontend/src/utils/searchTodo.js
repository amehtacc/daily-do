export default function searchTodo(todos, searchInput) {
    if (!todos || todos.length < 1) return []

    if (!searchInput.trim()) return todos


    return todos.filter((todo) => todo?.title.toLowerCase().includes(searchInput.toLowerCase()))

}