
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

    try {

        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
        const data = await response.json();

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

// Filter books from API by their Status

async function filterBooks(status) {
    
}

async function listBooks() {
    
}