const saveTodosToLocalStorage = (key: string, stringifyTodos: string) => {
    localStorage.setItem(key, stringifyTodos)
}

export default saveTodosToLocalStorage;