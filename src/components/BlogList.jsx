import { useState } from 'react';
import PropTypes from 'prop-types';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const deleteBlog = () => {
    if (window.confirm(`remove blog ${blog.title} ?`)) {
      handleDelete(blog);
    }
  };

  const style = {
    backgroundColor: open ? 'aliceblue' : 'whitesmoke',
    padding: 2,
    margin: 4
  };

  return (
    <div className='blog' style={ style }>
      { blog.title }
      <button onClick={ toggleOpen }>{ open ? 'hide' : 'view' }</button>
      <br />

      {
        open &&
          <>
            { blog.url }<br />

            likes { `${blog.likes}` }
            <button onClick={ () => handleLike(blog) }>like</button>
            <br />

            {
              blog.author &&
                <>{ blog.author.username } <br /></>
            }

            {
              blog.author && blog.author.username === user.username &&
              <button onClick={ deleteBlog }>delete</button>
            }
          </>
      }
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

const BlogList = ({ blogs, user, handleLogout, handleCreateBlog, handleLike, handleDelete }) => {
  blogs.sort((b1, b2) => b2.likes - b1.likes);

  return (
    <div>
      <h2>blogs</h2>
      <p>
        { user.username } logged in
        <button onClick={ handleLogout }>Logout</button>
      </p>

      <Togglable buttonLabel='Add blog'>
        <BlogForm handleCreateBlog={ handleCreateBlog } />
      </Togglable>

      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  );
};
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleCreateBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export { Blog, BlogList };