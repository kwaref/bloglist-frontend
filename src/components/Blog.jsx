import { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [open, setOpen] = useState(false)

  return <div style={blogStyle}>
    <p style={{ margin: '0px' }}>
      {blog.title} {blog.author} <button onClick={() => setOpen(!open)}>{open ? 'hide':'view'}</button>
    </p>
    <div style={{ display: open ? 'block' : 'none' }}>
      <p style={{ margin: '0px' }}>{blog.url}</p>
      <p style={{ margin: '0px' }}>likes {blog.likes || 0} <button>like</button></p>
      <p style={{ margin: '0px' }}>{blog.author}</p>
    </div>
  </div>
}


export default Blog