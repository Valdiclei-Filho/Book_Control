function insertBooks() {
  const livros = [
    { id: 1, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 2, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 3, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 4, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 5, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 6, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 7, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
    { id: 8, imagem: "https://m.media-amazon.com/images/I/51Od9tsq7rL._SX342_SY445_.jpg", titulo: "Senna", autor: "Valdiclei Filho", idioma:"Português", isbn: "", editora: "Rede Globo", contato: ""},
  ];

  localStorage.setItem("livros", JSON.stringify(livros));
}

function loadingBooks() {
  const livrosArmazenados = JSON.parse(localStorage.getItem("livros"));

  // Selecionando a div existente com a classe .gridBooks
  const gridBooks = document.querySelector(".gridBooks");

  // Usando forEach para adicionar cada livro à grid
  livrosArmazenados.forEach((livro) => {
    const livroDiv = document.createElement("div");
    livroDiv.innerHTML = `<div><img class="imageLivro" src="${livro.imagem}"><div class="tituloAutor"><h3>${livro.titulo}</h3><p>${livro.autor}</p><div></div>`;
    gridBooks.appendChild(livroDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  insertBooks();
  loadingBooks();
});
