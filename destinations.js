document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for featured destinations
    const featuredSwiper = new Swiper('.featured-swiper', {
        slidesPerView: 1,
        effect: "creative",
        creativeEffect: {
            prev: {
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        loop: true,
        direction: "horizontal",
        autoplay: {
            delay: 5000,
        },
        speed: 400,
        spaceBetween: 100,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navMenu = document.querySelector('nav ul');

    if (menuBtn && closeBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Sample destinations data
    const destinationsData = [
        {
            id: 1,
            name: "Paris, France",
            image: "img/paris2.jpg",
            region: "europe",
            type: "city",
            rating: 4.7,
            description: "The City of Light featuring iconic landmarks, world-class museums, and exquisite cuisine."
        },
        {
            id: 2,
            name: "Kyoto, Japan",
            image: "img/kyoto1.jpg",
            region: "asia",
            type: "historic",
            rating: 4.8,
            description: "Traditional Japanese culture with beautiful temples, gardens, and authentic experiences."
        },
        {
            id: 3,
            name: "Maldives",
            image: "img/maldives3.jpg",
            region: "asia",
            type: "beach",
            rating: 4.9,
            description: "Paradise islands with crystal clear waters, white sandy beaches, and luxury overwater bungalows."
        },
        {
            id: 4,
            name: "Grand Canyon, USA",
            image: "img/usa.jpg",
            region: "north-america",
            type: "adventure",
            rating: 4.8,
            description: "One of the world's most spectacular natural wonders with breathtaking views."
        },
        {
            id: 5,
            name: "Cape Town, South Africa",
            image: "img/south1.jpg",
            region: "africa",
            type: "city",
            rating: 4.6,
            description: "Beautiful coastal city with stunning Table Mountain views and diverse cultural experiences."
        },
        {
            id: 6,
            name: "Swiss Alps",
            image: "img/zvicer1.jpg",
            region: "europe",
            type: "mountain",
            rating: 4.8,
            description: "Majestic mountain scenery with world-class skiing, hiking, and charming alpine villages."
        },
        {
            id: 7,
            name: "Rio de Janeiro, Brazil",
            image: "img/brazil1.jpg",
            region: "south-america",
            type: "beach",
            rating: 4.5,
            description: "Vibrant city known for its beautiful beaches, iconic Christ the Redeemer statue, and lively culture."
        },
        {
            id: 8,
            name: "Sydney, Australia",
            image: "img/australi1.webp",
            region: "oceania",
            type: "city",
            rating: 4.7,
            description: "Stunning harbor city with the iconic Opera House, beautiful beaches, and amazing food scene."
        },
        {
            id: 9,
            name: "Marrakech, Morocco",
            image: "img/morocco1.webp",
            region: "africa",
            type: "historic",
            rating: 4.6,
            description: "Ancient city with vibrant markets, stunning palaces, and rich cultural heritage."
        },
        {
            id: 10,
            name: "Banff National Park, Canada",
            image: "img/canada1.jpg",
            region: "north-america",
            type: "mountain",
            rating: 4.9,
            description: "Spectacular mountain scenery with turquoise lakes, abundant wildlife, and outdoor adventures."
        },
        {
            id: 11,
            name: "Bora Bora, French Polynesia",
            image: "img/borabora.jpg",
            region: "oceania",
            type: "beach",
            rating: 4.9,
            description: "Luxurious island paradise with overwater bungalows and stunning blue lagoons."
        },
        {
            id: 12,
            name: "Venice, Italy",
            image: "img/venice1.jpg",
            region: "europe",
            type: "historic",
            rating: 4.7,
            description: "Romantic city built on water, known for its canals, gondolas, and historic architecture."
        }
    ];

    // Variables for pagination
    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredDestinations = [...destinationsData];

    // Function to create destination card
    function createDestinationCard(destination) {
        return `
            <div class="destination-card" data-region="${destination.region}" data-type="${destination.type}">
                <div class="destination-img">
                    <img src="${destination.image}" alt="${destination.name}">
                    <div class="destination-tag">${destination.region.charAt(0).toUpperCase() + destination.region.slice(1)}</div>
                </div>
                <div class="destination-info">
                    <h3>${destination.name}</h3>
                    <div class="rating">
                        ${getRatingStars(destination.rating)}
                        <span>(${destination.rating})</span>
                    </div>
                    <p>${destination.description}</p>
                </div>
            </div>
        `;
    }

    // Function to generate star ratings
    function getRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Function to display destinations
    function displayDestinations(page = 1) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredDestinations.slice(start, end);
        
        const destinationsContainer = document.getElementById('destinations-container');
        
        if (page === 1) {
            destinationsContainer.innerHTML = '';
        }
        
        paginatedItems.forEach(destination => {
            destinationsContainer.innerHTML += createDestinationCard(destination);
        });
        
        // Hide/Show load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (end >= filteredDestinations.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    // Initial display
    displayDestinations();

    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            displayDestinations(currentPage);
        });
    }

    // Filter functionality
    const regionFilter = document.getElementById('region-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.getElementById('destination-search');
    const searchBtn = document.getElementById('search-btn');

    function applyFilters() {
        const regionValue = regionFilter.value;
        const typeValue = typeFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        
        filteredDestinations = destinationsData.filter(destination => {
            // Region filter
            const matchRegion = regionValue === 'all' || destination.region === regionValue;
            
            // Type filter
            const matchType = typeValue === 'all' || destination.type === typeValue;
            
            // Search filter
            const matchSearch = destination.name.toLowerCase().includes(searchValue) || 
                               destination.description.toLowerCase().includes(searchValue);
            
            return matchRegion && matchType && matchSearch;
        });
        
        currentPage = 1;
        displayDestinations();
    }

    if (regionFilter && typeFilter && searchInput && searchBtn) {
        regionFilter.addEventListener('change', applyFilters);
        typeFilter.addEventListener('change', applyFilters);
        searchBtn.addEventListener('click', applyFilters);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Animate on scroll effect (simple version)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.destination-card, .feature-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial set for animation
    document.querySelectorAll('.destination-card, .feature-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    // Call once on load
    animateOnScroll();
});