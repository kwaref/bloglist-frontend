import { useState } from 'react'

const Blog = ({ blog, user, like, remove }) => {
  console.log('blog:', blog, 'user:', user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    confirm && remove(blog.id)
  }

  return <div style={blogStyle}>
    <p style={{ margin: '0px' }}>
      {blog.title} {blog.author} <button onClick={() => setOpen(!open)}>{open ? 'hide':'view'}</button>
    </p>
    <div style={{ display: open ? 'block' : 'none' }}>
      <p style={{ margin: '0px' }}>{blog.url}</p>
      <p style={{ margin: '0px' }}>likes {blog.likes || 0} <button onClick={() => like({ ...blog, likes: blog.likes + 1 })}>like</button></p>
      <p style={{ margin: '0px' }}>{blog.user ? blog.user.name : 'anonymous'}</p>
      {blog.user.username === user.username ? <button onClick={handleDelete}>remove</button>: null}
    </div>
  </div>
}


export default Blog