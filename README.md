0 - instalamos sonner, swr 

1 - creamos el archivo data/db.json

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

2- bun x json-server -w data/db.json -p 3001  (verifica que entrando en http://localhost:3001/todos se ve la lista)

3 - creamos en app/page.tsx un componente en _components/TodoList.tsx

export default function TodoList() {
	return (
		<section className="mx-auto p-12 bg-slate-600/20 rounded-lg w-[700px] h-[700px] overflow-y-scroll">
			<h1 className="text-2xl font-bold mb-4">Todos :</h1>
			<Suspense
				fallback={
					<div className="text-2xl font-bold w-full h-full flex pt-20 justify-center">
						Loading...
					</div>
				}
			>
				<TodoListSuspense />
			</Suspense>
		</section>
	)
}

const TodoListSuspense = async () => {
	const todos = (await getTodos()) as TodoType[]

	return (
		<ul>
			{todos.map(todo => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	)
} 

4 - un client component en _components/TodoItem.tsx

"use client"
import { deleteTodo } from "../_actions/delete-todo"
import { TodoType } from "../_lib/types"
import { useState } from "react"

export const TodoItem = ({ todo }: { todo: TodoType }) => {
	const [completed, setCompleted] = useState(todo.completed)

	return (
		<li
			key={todo.id}
			className="grid grid-cols-[0.1fr_0.1fr_1fr_0.25fr] gap-4 py-2"
		>
			<span>id: {todo.id}</span>
			<input
				type="checkbox"
				defaultChecked={todo.completed}
				onChange={() => setCompleted(!completed)}
			/>
			<span>title: {todo.title}</span>
			<button
				onClick={() => deleteTodo(todo.id)}
				className="bg-red-500/20 text-white px-2 py-1 rounded"
			>
				Delete
			</button>
		</li>
	)
}

5 - una _actions/get-todos.ts

"use server"

export const getTodos = async () => {
	try {
		await new Promise(resolve => setTimeout(resolve, 2000))
		const response = await fetch("http://localhost:3000/api/todos")

		if (!response.ok) {
			throw new Error("Failed to fetch todos")
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Error fetching todos:", error)
		throw error
	}
}

6 - un endpoint en src/app/api/todos/route.ts   (tiene que estar dentro de /app)
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const response = await fetch("http://localhost:3001/todos")

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()

		return new NextResponse(JSON.stringify(data), { status: 200 })
	} catch (error) {
		console.error("Error fetching todos:", error)
		return new NextResponse(
			JSON.stringify({ error: "Failed to fetch todos" }),
			{ status: 500 }
		)
	}
}

7 - verifica que entrando a http://localhost:3000/api/todos se ve la lista

8 - 
