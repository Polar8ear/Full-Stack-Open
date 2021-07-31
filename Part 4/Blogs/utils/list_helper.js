const _ = require('lodash')


const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((total,blog) => total+blog.likes, 0)
}

const favouriteBlog = blogs => {
  return blogs.reduce((favourite,blog) => {
    if(favourite===null || blog.likes>=favourite.likes){
      return { ...blog }
    }

    return { ...favourite }
  },null)
}

const mostBlogs = blogs => {
  const mostBlogsAuthor = _.chain(blogs)
    .countBy('author')
    .transform((result,blogsCount,author) => {
      result.push({ author:author, blogs:blogsCount })
    },[])
    .sortBy('blogs')
    .last()
    .value()

  return mostBlogsAuthor===undefined
    ?null
    :mostBlogsAuthor
}

const mostLikes = blogs => {
  const mostLikesAuthor = _.chain(blogs)
    .groupBy('author')
    .transform((result,value,author) => {
      const totalLikes = value.reduce((totalLikes,blog) => totalLikes+blog.likes,0)
      result.push({ author:author, likes:totalLikes })
    },[])
    .sortBy('likes')
    .last()
    .value()

  return mostLikesAuthor===undefined
    ?null
    :mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}