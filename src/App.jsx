import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import authService from './services/auth'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    const response = await authService.login(accessData)
    setUser(response)
    window.localStorage.setItem(
      'loggedBloglistAppUser', JSON.stringify(user)
    )
  }

  const handleCreate = async postData => {
    const response = await blogService.create({ 'Authorization': `Bearer ${user.token}` }, postData)
    const newBlogs = [...blogs, response]
    setBlogs(newBlogs)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  return user === null ?
    <LoginForm handleLogin={handleLogin} />
    :
    <div>
      <BlogForm handleCreate={handleCreate}/>
      <h2>blogs</h2>
      <p><span>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></span></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
}

export default App