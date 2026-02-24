
const filterButtons = document.querySelectorAll('.filter-btn');

// Change Status Type

filterButtons.forEach(btn => {

    btn.addEventListener('click', (event) => {
        const clickedButton = event.target;
        const status = clickedButton.getAttribute('data-status');

        updateTabStatus(clickedButton);


    })
})

function updateTabStatus(activeButton) {
    
    filterButtons.forEach(btn => {

        btn.classList.remove('text-blue-900', 'border-blue-900');
        btn.classList.add('text-gray-500', 'border-transparent');
    })

    activeButton.classList.remove('text-gray-500', 'border-transparent')
    activeButton.classList.add('text-blue-900', 'border-blue-900')
}

async function filterBooks(status) {
    
}

async function listBooks() {
    
}