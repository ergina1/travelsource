const menus = document.querySelector("nav ul");
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
    menus.classList.add("display");
});

closeBtn.addEventListener("click", () => {
    menus.classList.remove("display");
});

// scroll sticky navbar
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 500) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}); 

// static numbers


// Select all counter elements
const countersEL = document.querySelectorAll(".numbers");

// Initialize all counters to zero
countersEL.forEach((counter) => {
    counter.textContent = 0;
});

// Start incrementing each counter
countersEL.forEach((counter) => {
    incrementCounter(counter);
});

function incrementCounter(counter) {
    let currentNum = +counter.textContent;
    const dataCeil = counter.getAttribute("data-ceil");
    
    const increment = dataCeil / 25;
    
    currentNum = Math.ceil(currentNum + increment);
    
    if (currentNum < dataCeil) {
        counter.textContent = currentNum;
        setTimeout(() => incrementCounter(counter), 70);
    } else {
        counter.textContent = dataCeil;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // Get all read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    // Exit if no buttons are found
    if (!readMoreButtons.length) {
        console.log('No read more buttons found on the page');
        return;
    }
    
    readMoreButtons.forEach(button => {
        // Initialize button state if needed
        if (!button.classList.contains('initialized')) {
            const blogCard = button.closest('.blog-card');
            
            if (blogCard) {
                // Get all paragraphs inside the blog content
                const paragraphs = blogCard.querySelectorAll('.blog-content p');
                const hiddenContent = blogCard.querySelector('.blog-hidden-content');
                
                // Only hide content if there are multiple paragraphs or hidden content
                if ((paragraphs.length > 1) || hiddenContent) {
                    // Hide all paragraphs except the first one on initial load
                    paragraphs.forEach((p, index) => {
                        if (index > 0) p.style.display = 'none';
                    });
                    
                    // Hide hidden content initially
                    if (hiddenContent) hiddenContent.style.display = 'none';
                    
                    // Mark as initialized to avoid re-initializing
                    button.classList.add('initialized');
                } else {
                    // Hide the button if there's only one paragraph and no hidden content
                    button.style.display = 'none';
                }
            }
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            // Get the parent blog card
            const blogCard = this.closest('.blog-card');
            
            if (!blogCard) {
                console.error('Could not find parent blog card');
                return;
            }
            
            // Get content elements
            const paragraphs = blogCard.querySelectorAll('.blog-content p');
            const hiddenContent = blogCard.querySelector('.blog-hidden-content');
            
            // Toggle expanded state
            const isExpanded = this.classList.contains('expanded');
            
            // Use a CSS transition for smooth height animation
            blogCard.style.transition = 'height 0.3s ease';
            
            // Add a smooth transition to paragraphs and hidden content
            paragraphs.forEach(p => {
                p.style.transition = 'opacity 0.2s ease';
            });
            
            if (hiddenContent) {
                hiddenContent.style.transition = 'opacity 0.2s ease';
            }
            
            if (isExpanded) {
                // Collapse - hide content
                paragraphs.forEach((p, index) => {
                    if (index > 0) {
                        p.style.opacity = '0';
                        setTimeout(() => { p.style.display = 'none'; }, 200);
                    }
                });
                
                if (hiddenContent) {
                    hiddenContent.style.opacity = '0';
                    setTimeout(() => { hiddenContent.style.display = 'none'; }, 200);
                }
                
                this.innerHTML = 'Read More <i class="fa fa-arrow-right"></i>';
                this.setAttribute('aria-expanded', 'false');
            } else {
                // Expand - show content
                paragraphs.forEach((p, index) => {
                    if (index > 0) {
                        p.style.display = 'block';
                        // Small delay to allow the display property to take effect before fading in
                        setTimeout(() => { p.style.opacity = '1'; }, 10);
                    }
                });
                
                if (hiddenContent) {
                    hiddenContent.style.display = 'block';
                    setTimeout(() => { hiddenContent.style.opacity = '1'; }, 10);
                }
                
                this.innerHTML = 'Read Less <i class="fa fa-arrow-up"></i>';
                this.setAttribute('aria-expanded', 'true');
            }
            
            // Toggle button state
            this.classList.toggle('expanded');
            
            // Scroll into view if expanding and content would be off-screen
            if (!isExpanded) {
                const rect = blogCard.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    // Smooth scroll to ensure the expanded content is visible
                    window.scrollTo({
                        top: window.scrollY + rect.top - 20, // 20px buffer from top
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Get the subscribe form
    const subscribeForm = document.querySelector('.subscribe form');
    const emailInput = document.querySelector('.subscribe input[type="text"]');
    const subscribeButton = document.querySelector('.subscribe button');
    
    // Create a new element for the validation message
    const validationMessage = document.createElement('p');
    validationMessage.style.marginTop = '5px';
    validationMessage.style.fontSize = '16px';
    validationMessage.style.position = 'absolute';
    validationMessage.style.left = '0';
    validationMessage.style.top = '100%';
    validationMessage.style.width = '100%';
    
    // Make the parent container relative to properly position the message
    const formContainer = emailInput.parentNode;
    formContainer.style.position = 'relative';
    
    // Insert the validation message after the input
    formContainer.appendChild(validationMessage);
    
    // Function to handle the form submission
    function handleSubscription(e) {
        e.preventDefault(); // Prevent default form submission
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!email) {
            showMessage('Please enter your email address.', 'red');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'red');
            return;
        }
        
        // Here you would typically send the email to your server
        // For demonstration, we'll just show a success message
        console.log('Email submitted:', email);
        
        // Show success message
        showMessage('Thank you for subscribing!', 'white');
        
        // Clear the input field after successful submission
        emailInput.value = '';
    }
    
    // Function to display validation messages
    function showMessage(message, color) {
        validationMessage.textContent = message;
        validationMessage.style.color = color;
        
        // Auto hide the message after 5 seconds
        setTimeout(function() {
            validationMessage.textContent = '';
        }, 5000);
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add click event listener to the Send button
    if (subscribeButton) {
        subscribeButton.addEventListener('click', handleSubscription);
    }
    
    // Also handle form submit event (if user presses Enter)
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscription);
    }
});


//contact us form

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form and its elements
    const contactForm = document.querySelector('.contact-col form');
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const inquirySelect = contactForm.querySelector('select[name="inquiry_type"]');
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Create validation message elements for each input field
    function createValidationMessage(inputElement) {
        const validationMessage = document.createElement('p');
        validationMessage.className = 'validation-message';
        validationMessage.style.color = 'red';
        validationMessage.style.fontSize = '14px';
        validationMessage.style.marginTop = '5px';
        validationMessage.style.marginBottom = '10px';
        
        // Insert the validation message after the input element
        inputElement.parentNode.insertBefore(validationMessage, inputElement.nextSibling);
        
        return validationMessage;
    }
    
    const nameValidation = createValidationMessage(nameInput);
    const emailValidation = createValidationMessage(emailInput);
    const inquiryValidation = createValidationMessage(inquirySelect);
    const messageValidation = createValidationMessage(messageTextarea);
    
    // Create a success message element at the bottom of the form
    const formSuccessMessage = document.createElement('p');
    formSuccessMessage.style.color = 'green';
    formSuccessMessage.style.fontSize = '17px';
    formSuccessMessage.style.marginTop = '10px';
    formSuccessMessage.style.textAlign = 'center';
    contactForm.appendChild(formSuccessMessage);
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show validation message
    function showMessage(element, message, color) {
        element.textContent = message;
        element.style.color = color;
        
        // Clear the message after 5 seconds
        setTimeout(function() {
            element.textContent = '';
        }, 10000);
    }
    
    // Function to validate the form
    function validateForm() {
        let isValid = true;
        
        // Clear all previous validation messages
        nameValidation.textContent = '';
        emailValidation.textContent = '';
        inquiryValidation.textContent = '';
        messageValidation.textContent = '';
        
        // Validate name
        if (!nameInput.value.trim()) {
            showMessage(nameValidation, 'Please enter your name.', 'red');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showMessage(emailValidation, 'Please enter your email.', 'red');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showMessage(emailValidation, 'Please enter a valid email address.', 'red');
            isValid = false;
        }
        
        // Validate inquiry type
        if (inquirySelect.value === "" || inquirySelect.selectedIndex === 0) {
            showMessage(inquiryValidation, 'Please select an inquiry type.', 'red');
            isValid = false;
        }
        
        // Validate message
        if (!messageTextarea.value.trim()) {
            showMessage(messageValidation, 'Please enter your message.', 'red');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Here you would typically send the form data to your server
            // For demonstration, we'll just show a success message
            console.log('Form submitted successfully');
            
            // Show success message
            showMessage(formSuccessMessage, 'Thank you! Your message has been sent successfully.', 'green');
            
            // Clear form inputs
            contactForm.reset();
        }
    });
});











// Tour search functionality with results below the search box
document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const searchInput = document.querySelector('#location-search input[type="text"]');
    const destinationSelect = document.querySelector('#location-search select:first-of-type');
    const durationSelect = document.querySelector('#location-search select:last-of-type');
    const searchButton = document.querySelector('#location-search .primary-btn');
    const searchSection = document.getElementById('location-search');

    // Create results container and place it after the search section
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container';
    resultsContainer.style.display = 'none';
    resultsContainer.style.maxWidth = '1140px';
    resultsContainer.style.margin = '20px auto';
    resultsContainer.style.padding = '20px';
    resultsContainer.style.backgroundColor = '#f9f9f9';
    resultsContainer.style.borderRadius = '5px';
    resultsContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    resultsContainer.style.textAlign = 'center';

    // Position the results container
    resultsContainer.style.position = 'relative';
    resultsContainer.style.top = '-100px'; // Moves the box slightly higher

    // Insert the results container after the search section
    searchSection.parentNode.insertBefore(resultsContainer, searchSection.nextSibling);

    // Handle search button click
    searchButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Reset previous error styles
        durationSelect.style.border = '';
        destinationSelect.style.border = '';

        let isValid = true;

        // Validate destination
        if (destinationSelect.value === "Destination") {
            destinationSelect.style.border = '2px solid red';
            isValid = false;
        }

        // Validate duration
        if (durationSelect.value === "duration") {
            durationSelect.style.border = '2px solid red';
            isValid = false;
        }

        // Stop if validation fails
        if (!isValid) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Create success message with link
        resultsContainer.innerHTML = `
            <div style="animation: fadeIn 0.5s ease-in;">
                <h3 style="color: #28a745; margin-bottom: 15px; font-size: 24px;">Congratulations!</h3>
                <p style="font-size: 18px; margin-bottom: 20px; font-style:'Ubuntu';">
                    We found some tours that you would like to see in
             <strong>${searchInput.value || ''}</strong> 
                    <strong>${destinationSelect.value}</strong> for 
                    <strong>${durationSelect.value}</strong>
                </p>
                <a href="tours.html" 
                   style="display: inline-block; background-color:var(--primary-color); color: white; 
                          padding: 10px 25px; text-decoration: none; border-radius: 5px; 
                          font-weight: bold; transition: background-color 0.3s;">
                    View All Tours
                </a>
            </div>
        `;

        // Add animation style if it doesn't exist
        if (!document.getElementById('search-animation-style')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'search-animation-style';
            styleSheet.innerText = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(styleSheet);
        }

        // Show results
        resultsContainer.style.display = 'block';

        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Remove error border when user selects a valid option
    destinationSelect.addEventListener('change', function () {
        if (this.value !== "Destination") {
            this.style.border = '';
        }
    });

    durationSelect.addEventListener('change', function () {
        if (this.value !== "duration") {
            this.style.border = '';
        }
    });
});
