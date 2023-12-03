import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Notification } from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, error: false })

  useEffect(() => {
    user &&
    blogService.getAll({ 'Authorization': `Bearer ${user.token}` }).then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async accessData => {
    try {
      const response = await authService.login(accessData)
      setUser(response)
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
    } catch (error) {
      setNotification({ message: error.response.data.error, error: true })
      setTimeout(() => { setNotification({ message: null, error: false }) }, 3000)
    }
  }

  const handleCreate = async postData => {
    try {
      const response = await blogService.create({ 'Authorization': `Bearer ${user.token}` }, postData)
      const newBlogs = [...blogs, response]
      setBlogs(newBlogs)
      setNotification({ message: `a new blog ${response.title} by ${response.author} added`, error: false })
      setTimeout(() => { setNotification({ message: null, error: false }) }, 3000)
    } catch (error) {
      setNotification({ message: error.response.data.error, error: true })
      setTimeout(() => { setNotification({ message: null, error: false }) }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  return user === null ?
    <div>
      <Notification message={notification.message} error={notification.error} />
      <LoginForm handleLogin={handleLogin} />
    </div>
    :
    <div>
      <BlogForm handleCreate={handleCreate}/>
      <h2>blogs</h2>
      <Notification message={notification.message} error={notification.error} />
      <p><span>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></span></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
}

export default App