import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-4 text-xl font-bold">OpenChat</h1>
      <section className="h-16 ">
        <Link to="/login" className="text-white bg-black py-1 px-4 mr-2">
          Login
        </Link>
        <Link to="/register" className="text-white bg-black py-1 px-4 ">
          Register
        </Link>
      </section>
    </section>
  )
}

export default Home
