//1. define functions: gets all the posts from the local host and
//performs the show posts function
const getPosts = () => {
    container.innerHTML = ''
    fetch('http://localhost:3000/posts/').then(response =>{
        return response.json();
      }).then(showPosts)
}

// showPosts functions takes the information/ each posts and sticks into the
// template and then inserts into the HTML
const showPosts = (posts) => {
    console.log(posts)
    const container = document.getElementById('container')
    posts.forEach(post => {
        let template = `
              <h2>${post.name}</h2>
              <a href="${post.url}">More</a>
              <img src="${post.imageURL}" />
              <p>${post.text}</p>
              <div class="comments">
                    <h3>Comments</h3>
                    <p>TODO next week...</p>
              </div>`
        container.innerHTML += template;
    })
}
getPosts()
