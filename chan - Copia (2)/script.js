// Seleciona elementos
const postsDiv = document.getElementById("posts");
const postButton = document.getElementById("postButton");

// Carrega posts do localStorage
let posts = JSON.parse(localStorage.getItem("imageboard_posts")) || [];

// Salva posts no localStorage
function salvar() {
    localStorage.setItem("imageboard_posts", JSON.stringify(posts));
}

// Renderiza todos os posts na tela
function render() {
    postsDiv.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
            <div class="name">${post.name}</div>
            <div class="time">${post.time}</div>
            <div>${post.text}</div>
        `;

        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            div.appendChild(img);
        }

        postsDiv.appendChild(div);
    });
}

// Função de postar
function postar() {
    const nameInput = document.getElementById("name");
    const textInput = document.getElementById("text");
    const imageInput = document.getElementById("image");

    const name = nameInput.value.trim() || "Anônimo";
    const text = textInput.value.trim();
    const file = imageInput.files[0];

    if (!text && !file) return;

    const post = {
        name,
        text,
        time: new Date().toLocaleString(),
        image: null
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            post.image = reader.result;
            posts.unshift(post);
            salvar();
            render();
        }
        reader.readAsDataURL(file);
    } else {
        posts.unshift(post);
        salvar();
        render();
    }

    // Limpa inputs
    nameInput.value = "";
    textInput.value = "";
    imageInput.value = "";
}

// Evento do botão
postButton.addEventListener("click", postar);

// Renderiza ao abrir a página
render();
