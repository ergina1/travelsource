document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryData = [
        {
            id: 1,
            image: 'img/maldives1.jpg',
            title: 'Pristine Beaches of Maldives',
            description: 'Crystal clear waters and white sand beaches',
            category: 'beaches'
        },
        {
            id: 2,
            image: 'img/zvicer1.jpg',
            title: 'Swiss Alps',
            description: 'Majestic snow-capped mountains',
            category: 'mountains'
        },
        {
            id: 3,
            image: 'img/tokyo1.jpg',
            title: 'Tokyo Skyline',
            description: 'Urban landscape of Japan\'s capital',
            category: 'cities'
        },
        {
            id: 4,
            image: 'img/paris1.jpg',
            title: 'Eiffel Tower',
            description: 'Iconic landmark in Paris, France',
            category: 'landmarks'
        },
        {
            id: 5,
            image: 'img/santorini2.jpg',
            title: 'Santorini Coastline',
            description: 'Beautiful beaches with volcanic landscapes',
            category: 'beaches'
        },
        {
            id: 6,
            image: 'img/male.jpg',
            title: 'Rocky Mountains',
            description: 'Breathtaking views of North America\'s ranges',
            category: 'mountains'
        },
        {
            id: 7,
            image: 'img/newyork.jpg',
            title: 'New York City',
            description: 'The city that never sleeps',
            category: 'cities'
        },
        {
            id: 8,
            image: 'img/china.jpg',
            title: 'Great Wall of China',
            description: 'Ancient wonder stretching across mountains',
            category: 'landmarks'
        },
        {
            id: 9,
            image: 'img/thailand.jpg',
            title: 'Phi Phi Islands',
            description: 'Thailand\'s paradise islands',
            category: 'beaches'
        },
        {
            id: 10,
            image: 'img/male2.jpg',
            title: 'Andes Mountains',
            description: 'South America\'s spectacular mountain range',
            category: 'mountains'
        },
        {
            id: 11,
            image: 'img/singapor.jpg',
            title: 'Singapore Skyline',
            description: 'Modern architecture of Southeast Asia',
            category: 'cities'
        },
        {
            id: 12,
            image: 'img/tajmahal.jpg',
            title: 'Taj Mahal',
            description: 'India\'s magnificent mausoleum',
            category: 'landmarks'
        }
    ];

    // DOM Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-desc');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentCategory = 'all';
    let currentIndex = 0;
    let filteredItems = [...galleryData];

    // Initialize gallery
    function initGallery() {
        renderGalleryItems(galleryData);
        setupEventListeners();
    }

    // Render gallery items
    function renderGalleryItems(items) {
        galleryGrid.innerHTML = '';
        
        items.forEach((item, index) => {
            // Create gallery item with animation delay
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            galleryItem.setAttribute('data-index', index);
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter gallery items
    function filterGalleryItems(category) {
        // Do nothing if the selected category is already active
        if (category === currentCategory) return;
        
        currentCategory = category;
        
        // Fade out effect
        galleryGrid.classList.add('fade');
        
        setTimeout(() => {
            // Filter the items
            if (category === 'all') {
                filteredItems = [...galleryData];
            } else {
                filteredItems = galleryData.filter(item => item.category === category);
            }
            
            // Render the filtered items
            renderGalleryItems(filteredItems);
            
            // Fade in effect
            galleryGrid.classList.remove('fade');
        }, 300);
    }

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Update lightbox content
    function updateLightboxContent() {
        const item = filteredItems[currentIndex];
        lightboxImg.src = item.image;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.description;
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateLightboxContent();
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateLightboxContent();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery
                const category = btn.getAttribute('data-filter');
                filterGalleryItems(category);
            });
        });
        
        // Gallery item click (delegated event)
        galleryGrid.addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                const index = parseInt(galleryItem.getAttribute('data-index'));
                openLightbox(index);
            }
        });
        
        // Lightbox controls
        closeLightbox.addEventListener('click', closeLightboxFunc);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightboxFunc();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });
    }

    // Initialize the gallery
    initGallery();
});