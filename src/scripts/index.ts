import { FetchData } from './fetchData'
// TODO: Refactor Code 

// Document load events (root event)
window.addEventListener("load", () => {

  // routine sw support check
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('service worker registered', reg))
      .catch(err => console.log('service worker not registered', err))
  }

  // sort element event
  const sortby = document.getElementById('sortby') as HTMLSelectElement
  sortby.addEventListener('change', () => {
    console.log(sortby.value)

    // sort values
    switch (sortby.value) {
      case 'LIKES':
        fetch('http://localhost:8000/blogs?_sort=likes&_order=desc')
          .then(res => res.json())
          .then((data: FetchData[]) => {
            // process data
            data.forEach(d => {

              const topic = document.createElement("a");
              const content = document.createElement("p");
              const read = document.createElement('a')
              const like = document.createElement('button')
              const category = document.createElement('span')
              const blog = document.createElement('div');
              const blogs = document.createElement("li");

              topic.textContent += d.topic
              topic.href = `/blogs/${d.id}`
              topic.className = "blog-header";

              content.textContent += d.content
              content.className = "blog-content-text";

              read.textContent = 'Read Blog'
              read.href = `/blogs/${d.id}`
              read.className = 'read-blog-btn'

              like.textContent = 'Like'
              like.className = 'like-blog-btn'

              category.textContent = `Category: ${d.category}`

              blog.className = "blog";

              topic.insertAdjacentElement("afterend", category)

              blog.appendChild(topic)
              blog.appendChild(content)
              blog.appendChild(read)
              blog.appendChild(like)

              blogs.appendChild(blog)

              parent.appendChild(blogs)

              // like button event 
              like.addEventListener('click', (e) => {
                e.preventDefault()
                console.log('Liked !')

                like.style.background = 'coral'
                like.textContent = 'Liked !'
              })
            })
          })
          .catch(err => console.log(err))

        break;
      case 'NEWEST':
        fetch('http://localhost:8000/blogs?_sort=createdAt&_order=desc')
          .then(res => res.json())
          .then((data: FetchData[]) => {
            data.forEach(d => {

              const topic = document.createElement("a");
              const content = document.createElement("p");
              const read = document.createElement('a')
              const like = document.createElement('button')
              const category = document.createElement('span')
              const blog = document.createElement('div');
              const blogs = document.createElement("li");

              topic.textContent += d.topic
              topic.href = `/blogs/${d.id}`
              topic.className = "blog-header";

              content.textContent += d.content
              content.className = "blog-content-text";

              read.textContent = 'Read Blog'
              read.href = `/blogs/${d.id}`
              read.className = 'read-blog-btn'

              like.textContent = 'Like'
              like.className = 'like-blog-btn'

              category.textContent = `Category: ${d.category}`

              blog.className = "blog";

              blog.appendChild(topic)
              blog.appendChild(content)
              blog.appendChild(read)
              blog.appendChild(like)

              topic.insertAdjacentElement("afterend", category)

              blogs.appendChild(blog)
              parent.appendChild(blogs);

              like.addEventListener('click', (e) => {
                e.preventDefault()

                console.log('Liked !')

                like.style.background = 'coral'
                like.textContent = 'Liked !'
              })
            })
          })
          .catch(err => console.log(err))

        break;
      case 'CATEGORY':
        fetch('http://localhost:8000/blogs?_sort=category')
          .then(res => res.json())
          .then((data: FetchData[]) => {
            data.forEach(d => {

              const topic = document.createElement("a");
              const content = document.createElement("p");
              const read = document.createElement('a')
              const like = document.createElement('button')
              const category = document.createElement('span')
              const blog = document.createElement('div');
              const blogs = document.createElement("li");

              topic.textContent += d.topic
              topic.href = `/blogs/${d.id}`
              topic.className = "blog-header";

              content.textContent += d.content
              content.className = "blog-content-text";

              read.textContent = 'Read Blog'
              read.href = `/blogs/${d.id}`
              read.className = 'read-blog-btn'

              like.textContent = 'Like'
              like.className = 'like-blog-btn'

              category.textContent = `Category: ${d.category}`

              blog.className = "blog";

              topic.insertAdjacentElement("afterend", category)

              blog.appendChild(topic)
              blog.appendChild(content)
              blog.appendChild(read)
              blog.appendChild(like)

              blogs.appendChild(blog)

              parent.appendChild(blogs);

              like.addEventListener('click', (e) => {
                e.preventDefault()

                console.log('Liked !')

                like.style.background = 'coral'
                like.textContent = 'Liked !'
              })
            })
          })
          .catch(err => console.log(err))

        break;

      default:
        break;
    }
  })

  const parent = document.getElementsByClassName("blogs-container")[0] as HTMLUListElement;

  fetch('http://localhost:8000/blogs?_sort=createdAt&_order=desc')
    .then(res => res.json())
    .then((data: FetchData[]) => {
      data.forEach(d => {

        const topic = document.createElement("a");
        const content = document.createElement("p");
        const read = document.createElement('a')
        const like = document.createElement('button')
        const category = document.createElement('span')
        const blog = document.createElement('div');
        const blogs = document.createElement("li");

        topic.textContent += d.topic
        topic.href = `/blogs/${d.id}`
        topic.className = "blog-header";

        content.textContent += d.content
        content.className = "blog-content-text";

        read.textContent = 'Read Blog'
        read.href = `/blogs/${d.id}`
        read.className = 'read-blog-btn'

        like.textContent = 'Like'
        like.className = 'like-blog-btn'

        category.textContent = `Category: ${d.category}`

        blog.className = "blog";

        topic.insertAdjacentElement("afterend", category)

        blog.appendChild(topic)
        blog.appendChild(content)
        blog.appendChild(read)
        blog.appendChild(like)

        blogs.appendChild(blog)

        parent.appendChild(blogs);

        like.addEventListener('click', (e) => {
          e.preventDefault()
          console.log('Liked !')

          like.style.background = 'coral'
          like.textContent = 'Liked !'
        })
      })
    })
    .catch(err => console.log(err))

  const searchResults = document.getElementsByClassName('search-results-ul')[0] as HTMLUListElement

  fetch('http://localhost:8000/blogs/')
    .then(res => res.json())
    .then((data: FetchData[]) => {
      data.forEach(d => {
        const result = document.createElement('li')

        result.className = 'result'
        result.textContent += d.topic

        searchResults.appendChild(result)
      })
    })
    .catch(err => console.log(err))

  const search = document.getElementsByClassName('search-form')[0] as HTMLFormElement
  const searchTopic = document.getElementById('search-topic') as HTMLInputElement
  const searchResultsDiv = document.getElementsByClassName('search-results')[0] as HTMLDivElement

  searchTopic.addEventListener('focus', () => searchResultsDiv.style.display = 'block')
  searchTopic.addEventListener('blur', () => searchResultsDiv.style.display = 'none')

  // search event
  search.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/blogs?topic_like=${searchTopic.value}`)
      .then(res => res.json())
      .then((data: FetchData[]) => data.forEach(d => searchResults.textContent = d.topic))
      .catch(err => console.log(err))

    search.reset()
  })

  const topBlogs = document.getElementsByClassName('top-blogs-ul')[0] as HTMLUListElement

  fetch('http://localhost:8000/blogs')
    .then(res => res.json())
    .then((data: FetchData[]) => {
      data.forEach(d => {

        const topBlogLink = document.createElement('a')
        const topBlogDiv = document.createElement('div')
        const topBlog = document.createElement('li')

        topBlogLink.href = ''
        topBlogLink.className = 'top-blog-topic'
        topBlogLink.textContent = d.topic

        topBlogDiv.className = 'top-blog'

        topBlogDiv.appendChild(topBlogLink)
        topBlog.appendChild(topBlogDiv)
        topBlogs.appendChild(topBlog)
      })
    })
    .catch(err => console.log(err))
})

// devam...