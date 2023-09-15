import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Blog } from './BlogList';
import BlogForm from './BlogForm';

const blog = {
  title: 'My blog :)',
  author: 'Me',
  url: 'myblog.com',
  likes: 4
};
const user = { username: 'Me' };
const mockHandleLike = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleCreateBlog = jest.fn();

describe('<Blog /> component', () => {
  beforeEach(() => {
    render(<Blog
      blog={ blog }
      user={ user }
      handleLike={ mockHandleLike }
      handleDelete={ mockHandleDelete }
    />);
  });

  test('renders blog content', () => {
    expect(screen.findByText(blog.title)).not.toBeNull();
    expect(screen.queryByText(blog.author)).toBeNull();
    expect(screen.queryByText(blog.url)).toBeNull();
  });

  test('renders details when button \'view\' is clicked', async () => {
    const user = userEvent.setup();
    const button = await screen.findByText('view');
    expect(button).not.toBeNull();

    await user.click(button);

    expect(screen.findByText(blog.title)).not.toBeNull();
    expect(screen.findByText(blog.author)).not.toBeNull();
    expect(screen.findByText(blog.url)).not.toBeNull();
  });

  test('\'like\' button is working', async () => {
    const user = userEvent.setup();

    const viewButton = await screen.findByText('view');
    expect(viewButton).not.toBeNull();

    await user.click(viewButton);

    const likeButton = await screen.findByText('like');
    expect(likeButton).not.toBeNull();

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});

describe('<BlogForm /> component', () => {
  beforeEach(() => {
    render(<BlogForm handleCreateBlog={ mockHandleCreateBlog } />);
  });

  test('calls parent createBlog with correct parameters', async () => {
    const user = userEvent.setup();

    const [inputTitle, inputUrl] = await screen.getAllByRole('textbox');
    await user.type(inputTitle, blog.title);
    await user.type(inputUrl, blog.url);

    const submitButton = await screen.findByText('Create');
    await user.click(submitButton);

    expect(mockHandleCreateBlog.mock.calls).toHaveLength(1);

    const callContent = mockHandleCreateBlog.mock.calls[0][0];
    console.log(callContent);
    expect(callContent.title).toBe(blog.title);
    expect(callContent.url).toBe(blog.url);
  });
});
