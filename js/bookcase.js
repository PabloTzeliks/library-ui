
const filterButtons = document.querySelectorAll('.filter-btn');

const searchInput = document.getElementById('search-google-input');
const searchModal = document.getElementById('search-results-modal');
const searchResultsList = document.getElementById('search-results-list');
const closeSearchBtn = document.getElementById('btn-close-search');

// Search

closeSearchBtn?.addEventListener('click', () => {

    searchModal.classList.add('hidden');
    searchInput.value = '';
})

searchInput?.addEventListener('keypress', async (event) => {
    
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();

        if (query.length > 0) {
            await doGoogleBooksSearch(query); 
        }
    }
})

// Change Status Type

filterButtons.forEach(btn => {

    btn.addEventListener('click', (event) => {
        const clickedButton = event.target;
        const status = clickedButton.getAttribute('data-status');

        updateTabStatus(clickedButton);

        filterBooks(status);
    })
})

// Update colors and border of each clicked status section

function updateTabStatus(activeButton) {
    
    filterButtons.forEach(btn => {

        btn.classList.remove('text-blue-900', 'border-blue-900');
        btn.classList.add('text-gray-500', 'border-transparent');
    })

    activeButton.classList.remove('text-gray-500', 'border-transparent')
    activeButton.classList.add('text-blue-900', 'border-blue-900')
}

// Search books from Google Books API

async function doGoogleBooksSearch(query) {

    searchModal.classList.remove('hidden');
    searchResultsList.innerHTML = '<div class="p-4 text-center text-gray-500">Buscando livros...</div>';

    const MY_API_KEY = 'AIzaSyCEEsVW63PLaAqU7BKQxGDrUsL4gw4fP8k';

    try {

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&key=${MY_API_KEY}`);
        const data = await response.json();

        if (response.status === 429) {
            searchResultsList.innerHTML = '<div class="p-4 text-center text-orange-500 font-medium">Você fez muitas buscas seguidas. O Google pediu um tempo! Aguarde um minuto e tente novamente.</div>';
             
            return;
        }

        if (!data.items || data.items.length === 0) {
            searchResultsList.innerHTML = '<div class="p-4 text-center text-red-500">Nenhum livro encontrado para essa pesquisa.</div>';
            
            return;
        }

        renderGoogleBooksResults(data.items);

    } catch (error) {
        console.error("Erro ao buscar no Google Books:", error);
        searchResultsList.innerHTML = '<div class="p-4 text-center text-red-500">Ocorreu um erro ao buscar os livros.</div>';
    }
}

function renderGoogleBooksResults(books) {

    searchResultsList.innerHTML = '';

    books.forEach(book => {

        const info = book.volumeInfo;

        const title = info.title ? String(info.title) : 'Título Desconhecido';
        const authors = info.authors ? info.authors.join(', ') : 'Autor Desconhecido';
        const thumbnail = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=Sem+Capa';

        let isbn = 'SEM_ISBN';
        if (info.industryIdentifiers) {
            const identifier = info.industryIdentifiers.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');

            if (identifier) isbn = identifier.identifier;
        }

        const safeTitle = String(title).replace(/'/g, "\\'");
        const safeAuthors = String(authors).replace(/'/g, "\\'");

        const bookHtml = `
            <div class="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors items-center">
                <img src="${thumbnail}" alt="Capa" class="w-16 h-24 object-cover rounded shadow-sm">
                
                <div class="flex-grow">
                    <h3 class="font-semibold text-blue-950 line-clamp-1">${title}</h3>
                    <p class="text-sm text-gray-500 line-clamp-1">${authors}</p>
                    <p class="text-xs text-gray-400 mt-1">ISBN: ${isbn}</p>
                </div>
                
                <button 
                    onclick="prepareToAddBook('${isbn}', '${safeTitle}', '${safeAuthors}', '${thumbnail}')" 
                    class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium whitespace-nowrap shadow-sm">
                    + Estante
                </button>
            </div>
        `;
        
        searchResultsList.insertAdjacentHTML('beforeend', bookHtml);
    })
}

// Filter books from API by their Status

async function filterBooks(status) {
    
}

async function listBooks() {
    
}