function showPage(page) {
    document.querySelectorAll('.container > div').forEach(div => div.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let content = document.getElementById('content').value;
    let author = document.getElementById('author').value;
    let date = new Date().toLocaleDateString();

    let post = { title, content, author, date,};
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('postForm').reset();
    showPage('home');
    displayPosts();
});

function displayPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach((post, index) => {
        let div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `<a href="#" onclick="viewPost(${index})">${post.title}</a><p>${post.content.substring(0, 50)}...</p>`;
        postsDiv.appendChild(div);
    });
}

function viewPost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let post = posts[index];
    document.getElementById('postTitle').innerText = post.title;
    document.getElementById('postContent').innerText = post.content;
    document.getElementById('postDate').innerText = `Posted by ${post.author} on ${post.date}`;
    showPage('postDetail');
}
displayPosts();
