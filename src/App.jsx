import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    user &&
    blogService.getAll({ 'Authorization': `Bearer ${user.token}` }).then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  const handleLogin = accessData => {
    authService.login(accessData)
      .then(response => {
        setUser(response)
      })
  }

  return user === null ?
    <LoginForm handleLogin={handleLogin} />
    :
    <div>
      <h2>blogs</h2>
      <h4>{`${user.name} logged in`}</h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
}

export default App