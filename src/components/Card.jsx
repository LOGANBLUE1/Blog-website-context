import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = ({post}) => {
  return (
    <div className='mt-[50px]'>
      <NavLink to={`/blog/${post.id}`} >
        <span className='font-bold'>{post.title}</span>
      </NavLink>
      <p>
        By {" "}
        <span>{post.author}</span>
        {" "} on {" "}
        <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
            <span className='underline decoration-dashed decoration-gray-500'>{post.category}</span>
        </NavLink>
      </p>
      <p> Posted on {post.date} </p>
      <p> {post.content}</p>
      <div>
        {post.tags.map( (tag, index) => (
            <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                <span className='text-blue-600'>{` #${tag}`}</span>
            </NavLink>
        ) )}
      </div>
    </div>
  )
}

export default Card
