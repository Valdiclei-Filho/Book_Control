document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedInUser')) {
        loadHomePageBooks();
    } else {
         window.location.href = '/Login/login.html'
    }
});

function registerUser() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (username === '' || password === '') return;

    let users = getUsersFromLocalStorage();

    if (users.find(user => user.username === username)) {
        alert('Username já existe. Por favor, escolha outro.');
        return;
    }

    const newUser = {
        id: users.length + 1,
        username: username,
        password: password
    };

    users.push(newUser);
    saveUsersToLocalStorage(users);

    alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
    clearLoginInputs();
}

function loginUser() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    let users = getUsersFromLocalStorage();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        loadHomePageBooks();
        document.getElementById('loginForm').style.display = 'none';
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('bookList').innerHTML = '';
    showLoginForm();
}

function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadHomePageBooks() {
    const books = getBooksFromLocalStorage();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        createBookElement(book, index);
    });

    document.getElementById('logoutButton').style.display = 'block';
}

function loadUserBooks() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const books = getBooksFromLocalStorage();

    const userBooks = books.filter(book => book.userId === loggedInUser.id);

    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    userBooks.forEach((book, index) => {
        createBookElement(book, index);
    });
}

function getBooksFromLocalStorage() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

function saveBooksToLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const imagem = document.getElementById('imagem').value.trim();
    const idioma = document.getElementById('idioma').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const editora = document.getElementById('editora').value.trim();
    const contato = document.getElementById('contato').value.trim();

    if (titulo === '' || autor === '' || imagem === '') return;

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const books = getBooksFromLocalStorage();

    const newBook = {
        id: books.length + 1,
        userId: loggedInUser.id,
        imagem: imagem,
        titulo: titulo,
        autor: autor,
        idioma: idioma,
        isbn: isbn,
        editora: editora,
        contato: contato
    };

    books.push(newBook);
    
    saveBooksToLocalStorage(books);
    createBookElement(newBook, books.length - 1);

    clearInputs();
}

function clearLoginInputs() {
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function createBookElement(book, index) {
    const bookList = document.getElementById('bookList');
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    
    bookItem.innerHTML = `
        <img src="${book.imagem}" alt="${book.titulo}">
        <span>${book.titulo} - ${book.autor}</span>
        <button onclick="editBook(${index})">Editar</button>
        <button onclick="deleteBook(${index})">Excluir</button>
    `;
    
    bookList.appendChild(bookItem);
}

function editBook(index) {
    const books = getBooksFromLocalStorage();
    const book = books[index];
    
    const newTitulo = prompt('Edite o Título:', book.titulo);
    const newAutor = prompt('Edite o Autor:', book.autor);
    const newImagem = prompt('Edite a URL da Imagem:', book.imagem);
    const newIdioma = prompt('Edite o Idioma:', book.idioma);
    const newIsbn = prompt('Edite o ISBN:', book.isbn);
    const newEditora = prompt('Edite a Editora:', book.editora);
    const newContato = prompt('Edite o Contato:', book.contato);
    
    if (newTitulo !== null && newTitulo.trim() !== '') book.titulo = newTitulo.trim();
    if (newAutor !== null && newAutor.trim() !== '') book.autor = newAutor.trim();
    if (newImagem !== null && newImagem.trim() !== '') book.imagem = newImagem.trim();
    if (newIdioma !== null && newIdioma.trim() !== '') book.idioma = newIdioma.trim();
    if (newIsbn !== null && newIsbn.trim() !== '') book.isbn = newIsbn.trim();
    if (newEditora !== null && newEditora.trim() !== '') book.editora = newEditora.trim();
    if (newContato !== null && newContato.trim() !== '') book.contato = newContato.trim();

    books[index] = book;
    saveBooksToLocalStorage(books);
    loadHomePageBooks();
}

function deleteBook(index) {
    const books = getBooksFromLocalStorage();
    books.splice(index, 1);
    saveBooksToLocalStorage(books);
    loadHomePageBooks();
}

function clearInputs() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('idioma').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('editora').value = '';
    document.getElementById('contato').value = '';
}

function searchBooks() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const books = getBooksFromLocalStorage();

    const filteredBooks = books.filter(book => 
        book.titulo.toLowerCase().includes(searchValue) || 
        book.autor.toLowerCase().includes(searchValue)
    );

    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        createBookElement(book, index);
    });
}
