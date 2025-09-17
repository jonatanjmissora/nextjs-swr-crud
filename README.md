# Como se usa:
##### Preparacion del proyecto una vez clonado con
	git clone https://github.com/jonatanjmissora/nextjs-swr-crud.git
##### instalar dependencias: 
	bun install
##### creamos las variables de entorno en .env
  	NEXT_PUBLIC_MONGODB_URI=
    NEXT_PUBLIC_MONGODB_DB=
	NEXT_PUBLIC_DEVELOPER_API=http://localhost:3001
	NEXT_PUBLIC_PRODUCTION_API=https://merry-uncatholical-kristie.ngrok-free.app
* creamos db.json en data/db.json con el siguiente formato:
      {
        todos: [
          {userId: number, id: number, title: string, completed: boolean},
          ...
          ]
      }
    la API correra en http://localhost:3001/todos

##### instalamos concurrently:
	bun add -D concurrently
##### agregamos al package.json el script para iniciar el proyecto y la API de json-server con un solo comando
	"dev:all": "concurrently \"bun dev\" \"bun x json-server -w data/db.json -p 3001\"",
##### iniciar API de json-server con y el proyecto con un solo comando:
	bun dev:all

---

# Hacer tunel para correr app
##### instalas el chocolatey: abres una powershell como administrador y ejecutas:
	Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
##### instalas ngrok: abres una nueva powershell como administrador y ejecutas:
	choco install ngrok
##### verificas que ngrok esta instalado en windsurf, cerrar y volver a abrir windsurf
	ngrok version
* inicias secion en ngrok, vas a autenticacion, y copias el token
##### ejecutas:
	ngrok config add-authtoken 32joMyUZLlYdj0x7W2Tdp6Nsogc_5qamnCuiTNPdXJtTsNDf8
* creas un dominio aleatorio en la pagina de ngrok, y ese va a ser el que usaremos en la aplicacion
* sobre los ... que aparecen en el dominio, le das a ejecutar endpoint
* copias el script, y le modificas el puerto a 3001 (es el que usa nuestra API)
	ngrok http --url=merry-uncatholical-kristie.ngrok-free.app 3001
* pegas en navegador la url que salio en terminal para ver la aplicacion:
	https://merry-uncatholical-kristie.ngrok-free.app/todos

---      

# Teoria:
##### instalamos:
	bun add axios swr sonner mongodb
### TODOS del json-server
* seteamos para desarrollo y produccion el [_config/api.ts](#_config/apits)
* creamos los [_lib/todos-query.ts](#todos-queryts)
* creamos el [_actions/todos-mutation.ts](#todos-mutationts) :
	* [_actions/get-todos.ts](#get-todosts)
    * [_actions/create-todo.ts](#create-todots) 
    * [_actions/update-todo.ts](#update-todots) 
    * [_actions/delete-todo.ts](#delete-todots)
### NOTAS MONGODB
* creamos el [_lib/mongo-connect.ts](#mongo-connectts)
* creamos el [_lib/mongo-query.ts](#mongo-queryts)
* creamos el [_actions/mongo/mongo-mutation.ts](#mongo-mutationts) :
	* [_actions/mongo/get-mongoNotes.ts](#get-mongoNotests)
	* [_actions/mongo/create-mongoNote.ts](#create-mongoNotets)
	* [_actions/mongo/update-mongoNote.ts](#update-mongoNotets)
	* [_actions/mongo/delete-mongoNote.ts](#delete-mongoNotets)
### 2 formas para el toast
* con un [id](#sonner_id)
* con un [promise](#sonner_promise)
  
---

### api.ts
	const isProduction = process.env.NODE_ENV === "production"
	const API_URL = isProduction
		? `${process.env.NEXT_PUBLIC_PRODUCTION_API}/todos`
		: `${process.env.NEXT_PUBLIC_DEVELOPER_API}/todos`
	
	export const API_ENDPOINTS = {
		TODOS: API_URL,
		TODO_BY_ID: (id: number) => `${API_URL.replace(/\/$/, "")}/${id}`,
	}

---

### todos-query.ts
  export const useTodosProduction = () => {
    const { data, error, isLoading, isValidating } = useSWR<TodoType[]>(
      "json-todos",
      getTodosApiRoute,
      {
        revalidateOnFocus: false,
        // revalidateOnMount: false,
        refreshInterval: 10000,
        onErrorRetry: (_error, _key, _config, revalidate, { retryCount }) => {
          // Only retry up to 3 times
          if (retryCount >= 3) return
          // Retry after 5 seconds
          setTimeout(() => revalidate({ retryCount }), 5000)
        },
      }
    )

    return {
      todos: data || [],
      isLoading,
      isValidating,
      error,
      isError: !!error,
    }
  }

---

### todos-mutation.ts
  export const useCreateTodoProduction = () => {
    return useSWRMutation(
      "json-todos",
      (_url, { arg }: { arg: TodoType }) => createTodoProduction(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

  export const useUpdateTodoProduction = () => {
    return useSWRMutation(
      "json-todos",
      (_url, { arg }: { arg: TodoType }) => updateTodoProduction(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

  export const useDeleteTodoProduction = () => {
    return useSWRMutation(
      "json-todos",
      (_url, { arg }: { arg: number }) => deleteTodoProduction(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

	export const useDeleteTodo = () => {
		const queryClient = useQueryClient()
		return useMutation({
			mutationFn: deleteTodo,
			onMutate: async (todo: TodoType) => {
				if (!todo?.id) return
				await queryClient.cancelQueries({ queryKey: ["todos"] })
				const todos = queryClient.getQueryData<TodoType[]>(["todos"])
				if (!todos) return
				const newTodos = todos.filter(t => t.id !== todo.id)
				queryClient.setQueryData(["todos"], newTodos)
				return { previousTodos: todos }
			},
			onError: (_err, _variables, context) => {
				queryClient.setQueryData(["todos"], context?.previousTodos)
			},
		})
	}

---

### get-todos.ts
	"use server"

  export const getTodosApiRoute = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      const response = await axios.get(API_ENDPOINTS.TODOS)
      return response.data.sort((a: TodoType, b: TodoType) => b.id - a.id)
    } catch (error) {
      console.error("Error fetching todos:", error)
      throw error
    }
  }

---

### create-todo.ts
	"use server"
	export const createTodo = async (newTodo: TodoType) => {
		try {
			const response = await axios.post(API_ENDPOINTS.TODOS, newTodo, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			return response.data
		} catch (error) {
			console.error("Error creating todo:", error)
			if (axios.isAxiosError(error)) {
				// Si es un error de Axios, podemos acceder a más detalles
				console.error("Detalles del error:", error.response?.data)
				throw new Error(error.response?.data?.error || "Error al crear el TODO")
			}
			throw new Error("Error desconocido al crear el TODO")
		}
	}

---

### update-todo.ts
	"use server"
  export const updateTodoProduction = async (updatedTodo: TodoType) => {
    try {
      const response = await axios.put(
        API_ENDPOINTS.TODO_BY_ID(updatedTodo.id),
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response.data.todo
    } catch (error) {
      console.error("Error updating todo:", error)
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data)
        throw new Error(
          error.response?.data?.error || "Error al actualizar el TODO"
        )
      }
      throw new Error("Error desconocido al actualizar el TODO")
    }
  }

---

### delete-todo.ts
	"use server"
  export const deleteTodoProduction = async (id: number) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.TODO_BY_ID(id), {
        headers: {
          "Content-Type": "application/json",
        },
      })

      return response.status === 204 // 204 No Content es el código de éxito para DELETE
    } catch (error) {
      console.error("Error en deleteTodo:", error)
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", error.response?.data)
        throw new Error(
          error.response?.data?.error || "Error al eliminar el TODO"
        )
      }
      throw new Error("Error desconocido al eliminar el TODO")
    }
  }

---

### mongo-connect.ts
	let client: MongoClient
	let clientPromise: Promise<MongoClient>
	
	declare global {
		// eslint-disable-next-line no-var
		var _mongoClientPromise: Promise<MongoClient> | undefined
	}
	const URI = process.env.NEXT_PUBLIC_MONGODB_URI!
	const DB = process.env.NEXT_PUBLIC_MONGODB_DB!
	const options = {}
	client = new MongoClient(URI, options)
	
	if (!URI) {
		throw new Error("Please add your MongoDB URI to the .env file")
	}
	
	try {
		if (process.env.NODE_ENV === "development") {
			// In development mode, use a global variable so that the MongoClient instance is not recreated.
			if (!global._mongoClientPromise) {
				client = new MongoClient(URI, options)
				global._mongoClientPromise = client.connect()
			}
			clientPromise = global._mongoClientPromise
		} else {
			// In production mode, it's best to not use a global variable.
			clientPromise = client.connect()
		}
	} catch (error) {
		if (error instanceof Error) console.log("ERROR", error.stack)
	} finally {
		await client.close()
		console.log("CLOSE")
	}
	
	async function getDatabase() {
		const client = await clientPromise
		return client.db(DB)
	}
	
	export async function getCollection(collectionName: string) {
		const db = await getDatabase()
		return db.collection(collectionName)
	}
	
	export default getDatabase

---

### mongo-query.ts
	export const useMongo = () => {
		return useSWR<MongoNoteType[]>("mongo-notes", getMongoNotes, {
			revalidateOnFocus: false,
		// revalidateOnMount: false,
		refreshInterval: 10000,
	  })
  }

---

### mongo-mutation.ts
  export const useCreateNote = () => {
    return useSWRMutation(
      "mongo-notes",
      (_url, { arg }: { arg: MongoNoteType }) => createNote(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

  export const useUpdateNote = () => {
    return useSWRMutation(
      "mongo-notes",
      (_url, { arg }: { arg: MongoNoteType }) => updateNote(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

  export const useDeleteNote = () => {
    return useSWRMutation(
      "mongo-notes",
      (_url, { arg }: { arg: MongoNoteType }) => deleteNote(arg),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    )
  }

---

### get-mongoNotes.ts
	"use server"
	export const getMongoNotes = async (): Promise<MongoNoteType[]> => {
		await new Promise(resolve => setTimeout(resolve, 2000))
		console.log("GET new mongodb")
		const notesCollection = await getCollection("notes")
		const notes = await notesCollection.find().toArray()
	
		// Convert and validate MongoDB documents to ensure they match MongoNoteType
		const notesArray: MongoNoteType[] = notes.map(note => ({
			_id: note._id.toString(),
			title: note.title || "", // Provide default empty string if undefined
			content: note.content || "", // Provide default empty string if undefined
			author: note.author || "", // Provide default empty string if undefined
			pinned: note.pinned || false, // Provide default false if undefined
		}))
	
		return notesArray
	}

---

### create-mongoNote.ts
	"use server"
	export const createMongoNote = async (newNote: MongoNoteType) => {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const user = "kp_36204bd6138c4b029b7f77d84fe30093"
	
		const note = {
			title: newNote.title,
			content: newNote.content,
			author: user,
			pinned: false,
		}
	
		try {
			const notesCollection = await getCollection("notes")
			const res = await notesCollection.insertOne(note)
			if (!res.insertedId.toString()) {
				return { success: false, data: null }
			}
			return {
				success: true,
				data: { ...note, _id: res.insertedId.toString() },
			}
		} catch (error) {
			console.log("Error en el createNote", error)
			return { success: false, data: null }
		}
	}

---

### update-mongoNote.ts
	"use server"
	export const updateMongoNote = async (note: MongoNoteType) => {
		await new Promise(resolve => setTimeout(resolve, 2000))
		try {
			const notesCollection = await getCollection("notes")
			// db validation
			const res = await notesCollection.updateOne(
				{ _id: new ObjectId(note._id) },
				{
					$set: { pinned: !note.pinned },
				}
			)
			if (res.modifiedCount !== 1) {
				return { success: false, data: null }
			}
	
			return {
				success: true,
				data: note,
			}
		} catch (error) {
			console.log("Error en el updateNote", error)
			return { success: false, data: null }
		}
	}

---

### delete-mongoNote.ts
	"use server"
	export const deleteMongoNote = async (note: MongoNoteType) => {
		await new Promise(resolve => setTimeout(resolve, 2000))
		try {
			const notesCollection = await getCollection("notes")
			const res = await notesCollection.deleteOne({ _id: new ObjectId(note._id) })
			if (res?.deletedCount !== 1) return { success: false, data: note }
			return { success: true, data: note }
		} catch (error) {
			console.log("Error en el deleteNote", error)
			return { success: false, data: note }
		}
	}

---

### sonner_id
	 const sonnerLoading = toast.loading("creando todo...")
	 try {
	    await createTodoMutation(newTodo, {
	        optimisticData: data =>
	            data && [
	                { ...newTodo, title: `${newTodo.title} (optimistic)` },
	                ...data,
	            ],
	    })
	    setTitle("")
	    toast.success("Todo creado exitosamente", { id: sonnerLoading })
	    } catch (error) {
	    console.error("Error creating todo:", error)
	    toast.error("Error creating todo", { id: sonnerLoading })
	    }

---

### sonner_promise
	startTransition(async () => {
	    toast.promise(createTodoProduction(newTodo, options), {
	        loading: "creando todo...",
	        success: "todo creado exitosamente",
	        error: "error al crear todo",
	    })
	
	    setTitle("")
	})


