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
