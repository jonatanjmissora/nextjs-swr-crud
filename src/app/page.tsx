import TodoList from "./_components/TodoList"

export default function Home() {
	return (
		<main className="w-full min-h-screen flex flex-col items-center pt-20 sm:items-start">
			<TodoList />
		</main>
	)
}
