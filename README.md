**0 - instalamos sonner, swr 

**1 - creamos el archivo data/db.json

{
  "todos": [
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 4,
      "title": "et porro tempora",
      "completed": true
    },
    {
      "userId": 1,
      "id": 6,
      "title": "qui ullam ratione quibusdam voluptatem quia omnis",
      "completed": false
    },
  ]
}

**2- bun x json-server -w data/db.json -p 3001  (verifica que entrando en http://localhost:3001/todos se ve la lista)

**3 - creamos en app/_components/TodoList.tsx para listar y crear nuevos todos
      ========================================================================

  export default function TodosList() {

    const [title, setTitle] = useState("")
    const { data: todos, error, isLoading, isValidating } = useTodos()      <= useSWR()
    const { trigger: createTodoMutation, isMutating } = useCreateTodo()    <= useMutation()

    if (isLoading) ...
    if (error) ...

    const handleCreateTodo = async () => {
      startTransition(async () => {
			toast.promise(createTodoMutation(newTodo, options), {
				...
			})

			setTitle("")
		})
    }

    return (		
				<input onChange={e => setTitle(e.target.value)} />
				<button onClick={handleCreateTodo} > Enviar </button>

			<ul>
				{todos?.map((todo: TodoType) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
  }

  **4 - creamos en app/_components/TodoItem.tsx para mostrar todo, poder hacer update y delete
        =======================================================================================

        export default function TestTodoItem({ todo }: { todo: TodoType }) {
          const { trigger: updateTodo, isMutating } = useUpdateTodo()
          const { trigger: deleteTodo, isMutating: isDeleting } = useDeleteTodo()

          const handleCheck = async () => {
            startTransition(() => {
              toast.promise(updateTodo(updatedTodo, options), {
                ...
              })
            })
          }

          const handleDelete = async () => {
            startTransition(() => {
              toast.promise(deleteTodo(todo.id, options), {
                ...
              })
            })
          }

          return (
            <li>
              <input onChange={handleCheck} />
              {todo.title}
              <button onClick={handleDelete} >
                Delete
              </button>
            </li>
          )
        }