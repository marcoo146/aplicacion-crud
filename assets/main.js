let libros = JSON.parse(localStorage.getItem('libros')) || [];

// Inicializar la lista de libros
displayBooks();

document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let descripcion = document.getElementById('descripcion').value;

    let libro = {
        titulo,
        autor,
        descripcion
    };

    libros.push(libro);
    localStorage.setItem('libros', JSON.stringify(libros));
    displayBooks();
    document.getElementById('createForm').reset();
});

function displayBooks() {
    let bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    libros.forEach((libro, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${libro.titulo}</strong> by ${libro.autor} 
                <p>${libro.descripcion}</p>
            </div>
            <div>
                <button onclick="editBook(${index})">Editar</button>
                <button onclick="deleteBook(${index})">Borrar</button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

function deleteBook(index) {
    libros.splice(index, 1);
    localStorage.setItem('libros', JSON.stringify(libros));
    displayBooks();
}

function editBook(index) {
    let libro = libros[index];
    let editModal = document.getElementById('editModal');
    let span = document.getElementsByClassName('close')[0];

    document.getElementById('editTitulo').value = libro.titulo;
    document.getElementById('editAutor').value = libro.autor;
    document.getElementById('editDescripcion').value = libro.descripcion;

    editModal.style.display = 'block';

    span.onclick = function() {
        editModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
    }

    document.getElementById('editForm').onsubmit = function(event) {
        event.preventDefault();

        libro.titulo = document.getElementById('editTitulo').value;
        libro.autor = document.getElementById('editAutor').value;
        libro.descripcion = document.getElementById('editDescripcion').value;

        libros[index] = libro;
        localStorage.setItem('libros', JSON.stringify(libros));
        displayBooks();
        editModal.style.display = 'none';
    }
}
