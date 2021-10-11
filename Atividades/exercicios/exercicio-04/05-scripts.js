async function carregarPosts() {
  try {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    preencherPosts(await posts.json())
    document.getElementById('post-unico-container').style.display = 'none'
    limparPostComments()
  } catch(err) {
    console.error(err)
  }
}

function limparPostCards() {
  const postsDiv = document.getElementById('posts-container')
  while(postsDiv.children.length) {
    postsDiv.removeChild(postsDiv.children[0])
  }
}

function limparPostComments() {
  const postsDiv = document.getElementById('posts-comment-container')
  let a;
  while((a = postsDiv.getElementsByClassName('post-unico-comment')).length) {
    postsDiv.removeChild(a[0])
  }
}

function preencherComentarios(comments) {
  const postsDiv = document.getElementById('posts-comment-container')
  for(post of comments) {
    const { name, email, body } = post
    const postCard = document.createElement('div')
    postCard.classList.add('card')
    postCard.classList.add('post-unico-comment')

    const postCardBody = document.createElement('div')
    postCardBody.classList.add('card-body')

    const postCardTitle = document.createElement('h5')
    postCardTitle.classList.add('card-title')
    postCardTitle.innerHTML = `${name}: ${email}`

    const postCardBodyP = document.createElement('p')
    postCardBodyP.classList.add('card-text')
    postCardBodyP.innerHTML = body

    postCardBody.appendChild(postCardTitle)
    postCardBody.appendChild(postCardBodyP)
    postCard.appendChild(postCardBody)
    postsDiv.appendChild(postCard)
  }
  document.getElementById('post-unico-container').style.display = 'inherit'
}

async function carregarPostUnico(id) {
  limparPostCards()
  try {
    const post = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)).json()
    const postComments = await (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)).json()
    document.getElementById('post-unico-title').innerHTML = post.title
    preencherComentarios(postComments)
  } catch(err) {
    console.error(err)
  }
}

function preencherPosts(posts) {
  const postsDiv = document.getElementById('posts-container')
  for(post of posts) {
    const { id, title, body } = post
    const postCard = document.createElement('div')
    postCard.classList.add('card')

    const postCardBody = document.createElement('div')
    postCardBody.classList.add('card-body')

    const postCardTitle = document.createElement('h5')
    postCardTitle.classList.add('card-title')
    postCardTitle.innerHTML = title

    const postCardBodyP = document.createElement('p')
    postCardBodyP.classList.add('card-text')
    postCardBodyP.innerHTML = body

    postCard.addEventListener('click', () => carregarPostUnico(id))

    postCardBody.appendChild(postCardTitle)
    postCardBody.appendChild(postCardBodyP)
    postCard.appendChild(postCardBody)
    postsDiv.appendChild(postCard)
  }
}