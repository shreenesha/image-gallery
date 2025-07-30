// Image data
const images = [
    { src: 'https://img.freepik.com/premium-photo/wide-angle-shot-single-tree-growing-clouded-sky-sunset-surrounded-by-grass_181624-22807.jpg', category: 'nature', caption: 'Beautiful Nature' },
    { src: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg', category: 'nature', caption: 'Mountain View' },
    { src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBmb3Jlc3R8ZW58MHx8MHx8fDA%3D', category: 'nature', caption: 'Green Forest' },
    { src: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5bGluZXxlbnwwfHwwfHx8MA%3D%3D', category: 'city', caption: 'City Skyline' },
    { src: 'https://plus.unsplash.com/premium_photo-1680806491297-80fc736333c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww', category: 'city', caption: 'Modern Architecture' },
    { src: 'https://images.unsplash.com/photo-1601654152371-0ceae53a92c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVyYmFuJTIwc3RyZWV0fGVufDB8fDB8fHww', category: 'city', caption: 'Urban Street' },
    { src: 'https://images.unsplash.com/photo-1544124094-8aea0374da93?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'people', caption: 'Portrait' },
    { src: 'https://media.istockphoto.com/id/1326417862/photo/young-woman-laughing-while-relaxing-at-home.jpg?s=612x612&w=0&k=20&c=cd8e6RBGOe4b8a8vTcKW0Jo9JONv1bKSMTKcxaCra8c=', category: 'people', caption: 'Woman Smiling' },
    { src: 'https://media.istockphoto.com/id/1388645967/photo/pensive-thoughtful-contemplating-caucasian-young-man-thinking-about-future-planning-new.jpg?s=1024x1024&w=is&k=20&c=l5DUIl05Tni3BqFvepuOlOxje_yfhnvoYXFR_vPl5Ac=', category: 'people', caption: 'Man Thinking' },
    { src: 'https://images.unsplash.com/photo-1623645481161-0d8160281cbf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpbGQlMjBhbmltYWx8ZW58MHx8MHx8fDA%3D', category: 'nature', caption: 'Wild Animal' },
    { src: 'https://images.pexels.com/photos/1815447/pexels-photo-1815447.jpeg', category: 'nature', caption: 'Sandy Beach' },
    { src: 'https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg', category: 'city', caption: 'Night City' }
];

// DOM elements
const gallery = document.querySelector('.gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Current state
let currentFilter = 'all';
let currentPage = 1;
const imagesPerPage = 6;
let currentLightboxIndex = 0;

// Initialize gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render gallery based on filter and page
function renderGallery() {
    gallery.innerHTML = '';
    
    const filteredImages = currentFilter === 'all' 
        ? images 
        : images.filter(img => img.category === currentFilter);
    
    const startIndex = (currentPage - 1) * imagesPerPage;
    const paginatedImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);
    
    if (paginatedImages.length === 0 && currentPage > 1) {
        currentPage--;
        renderGallery();
        return;
    }
    
    paginatedImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = startIndex + index;
        
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.caption}" class="gallery-img">
            <div class="gallery-caption">${image.caption}</div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(startIndex + index));
        gallery.appendChild(galleryItem);
    });
    
    // Update pagination buttons
    updatePaginationButtons(filteredImages.length);
}

// Update pagination buttons state
function updatePaginationButtons(totalImages) {
    const totalPages = Math.ceil(totalImages / imagesPerPage);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Open lightbox with selected image
function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Navigate lightbox images
function navigateLightbox(direction) {
    const filteredImages = currentFilter === 'all' 
        ? images 
        : images.filter(img => img.category === currentFilter);
    
    if (direction === 'prev') {
        currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
    } else {
        currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
    }
    
    // Ensure we stay within filtered images
    while (!filteredImages.includes(images[currentLightboxIndex])) {
        if (direction === 'prev') {
            currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
        } else {
            currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
        }
    }
    
    lightboxImg.src = images[currentLightboxIndex].src;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            currentPage = 1;
            renderGallery();
        });
    });
    
    // Pagination buttons
    prevBtn.addEventListener('click', () => {
        currentPage--;
        renderGallery();
    });
    
    nextBtn.addEventListener('click', () => {
        currentPage++;
        renderGallery();
    });
    
    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        }
    });
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);