Como se usa:
==========
Preparacion del proyecto una vez clonado
1- instalar dependencias: bun install
2- creamos las variables de entorno en .env
    NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:3001/todos
    NEXT_PUBLIC_MONGODB_URI=
    NEXT_PUBLIC_MONGODB_DB=
3- creamos db.json en data/db.json con el siguiente formato:
      {
        todos: [
          {userId: number, id: number, title: string, completed: boolean},
          ...
          ]
      }
    
    la API correra en http://localhost:3001/todos

4- iniciar API de json-server con y el proyecto con un solo comando:
    bun dev:all


TEORIA
======

**0 - instalamos sonner, swr, axios

**1 - creamos el archivo data/db.json

**2- bun x json-server -w data/db.json -p 3001  (verifica que entrando en http://localhost:3001/todos se ve la lista) si los corremos con 2 terminales, sino corremos con:
bun dev:all

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

    los hooks
    =======
    todo-query.ts
    export const useTodos = () => {
      return useSWR<TodoType[]>("http://localhost:3001/todos", getTodos, {
        revalidateOnFocus: false,
        // revalidateOnMount: false,
        refreshInterval: 10000,
      })
    }

    mutation.ts
    export const useCreateTodo = () => {
      return useSWRMutation(
        "http://localhost:3001/todos",
        (url, { arg }: { arg: TodoType }) => createTodo(url, { newTodo: arg }),
        {
          rollbackOnError: true,
          revalidate: false,
        }
      )
    }

    createTodo.ts
      "use server"
      import axios from "axios"
      import { TodoType } from "../_lib/types"

      export const createTodo = async (
        url: string,
        { newTodo }: { newTodo: TodoType }
      ) => {
        const response = await axios.post(url, newTodo)
        return response.data
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

        los hooks
        ========
        mutation.ts
        export const useUpdateTodo = () => {
          return useSWRMutation(
            "http://localhost:3001/todos",
            (url, { arg }: { arg: TodoType }) => updateTodo(url, { updatedTodo: arg }),
            {
              rollbackOnError: true,
              revalidate: false,
            }
          )
        }

        export const useDeleteTodo = () => {
          return useSWRMutation(
            "http://localhost:3001/todos",
            (url, { arg }: { arg: number }) => deleteTodo(url, { id: arg }),
            {
              rollbackOnError: true,
              revalidate: false,
            }
          )
        }

        deleteTodo.ts
        "use server"
          import axios from "axios"

          export const deleteTodo = async (url: string, { id }: { id: number }) => {
          const response = await axios.delete(`${url}/${id}`)
          return response.data
        }

        updateTodo.ts
        "use server"
          import axios from "axios"

          export const updateTodo = async (url: string, { updatedTodo }: { updatedTodo: TodoType }) => {
          const response = await axios.put(`${url}/${updatedTodo.id}`, updatedTodo)
          return response.data
        }

**5 AHORA para MONGO
===================
    1 instalamos mongodb: bun add mongodb
    2 creamos archivo .env con NEXT_PUBLIC_MONGODB_URI, NEXT_PUBLIC_MONGODB_DB
    3 creamos el mongo-connect.ts
    4 creamos el mongo-query.ts
    5 creamos el getMongoNotes.ts
    6 creamos el mongo-mutation.ts
    7 creamos el createNote.ts, updateNote.ts y deleteNote.ts
    8 el MongoItem.tsx y el MongoList.tsx        
        
**6 Pasamos de tener un json-server a una API que lee de un db.json subido a versel con todo el proyecto
=========================================================================================================
    1 tenemos que pasar de un json-server a una API generada desde api/todos/route.ts
    2 del route, leemos el archivo db.json
    3 creamos el archivo api/todos/route.ts donde:
        readDb() y writeDb() me permiten leer y escribir en dicho db.json
        y un GET y POST para utilizar dichos metodos.
    4 creamos un nuevo query para dicha API, llamado todos-query-production.ts
        donde utilizamos useSWR para obtener datos de dicha API, mediante getTodosApiRoute(),
        que obtiene (GET) sus datos de "http://localhost:3000/api/todos"
    5 en TodoList.tsx creamos los siguientes hooks:
        useTodoProduction() => desde ahi invocamos el GET del punto 4
        useCreateTodoProduction() => desde ahi invocamos al archivo mutation-production.ts que utiliza el hook useSWRMutation().
        con la nueva accion create-todo-mutation.ts, que hace un POST a la ruta "http://localhost:3000/api/todos"
        