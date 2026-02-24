
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

searchInput?.addEventListener('keypress', async (event) {
    
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

// Filter books from API by their Status

async function filterBooks(status) {
    
}

async function listBooks() {
    
}