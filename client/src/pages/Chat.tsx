import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ChatProps {
  isLoggedIn: boolean
}

const Chat: React.FC<ChatProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [])

  return <h1>Chat</h1>
}

export default Chat
