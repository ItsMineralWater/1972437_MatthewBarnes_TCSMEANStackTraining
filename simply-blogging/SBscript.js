posts = [];

//-----------------------------------------POST FUNCTIONS-----------------------------------------
function retrievePosts() {
    posts = JSON.parse(localStorage.getItem("myPosts"));
    if (posts == null) {
        posts = [];
    }
}

function submitPosts() {
    localStorage.setItem("myPosts", JSON.stringify(posts));
}

function displayPosts() {
    var postsarea = document.getElementById("postsArea");
    postsarea.innerHTML = "";
    for (x in posts) {
        var div = document.createElement("div");
        div.className = "postDiv";
        
        div.innerHTML = "<h2>" + posts[x].title + "</h2>";
        if (posts[x].imageInfo != "") {
            var imageDiv = document.createElement("div");
            imageDiv.className = "imageDiv justify-content-center";
            
            var image = document.createElement("img");
            image.src = posts[x].imageInfo;

            imageDiv.appendChild(image);
            div.appendChild(imageDiv);
        }
        var article = document.createElement("p");
        article.innerText = posts[x].article;
        div.append(article);
        
        postsarea.appendChild(div);
        postsarea.appendChild(document.createElement("hr"));
    }
}

//-----------------------------------------FORM FUNCTIONS-----------------------------------------
function getFormInfo() {
    var post = {};

    post.title = document.getElementById("titleInput").value;
    post.article = document.getElementById("articleInput").value;
    var image = document.getElementById("imageInput").value; //put this into src
    if (image == undefined) {
        post.imageInfo = "";
    }
    else {
        post.imageInfo = image;
    }

    return post;
}

function resetForm() {
    document.getElementById("postForm").reset(); 
}

//-----------------------------------------BUTTON FUNCTIONS-----------------------------------------
function onPublish() {
    retrievePosts();
    post = getFormInfo();
    posts.unshift(post);
    submitPosts();
    resetForm();
    displayPosts();
}