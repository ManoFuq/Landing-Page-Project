// Naming global variables
const sections = document.querySelectorAll("section"),
    fragment = document.createDocumentFragment(),
    navBar = document.getElementById("list");

/*
 *End Global Variables
 *
 * creating function to build the navigation bar
 */

function buildNav() {

    // Loopnig into sections
    sections.forEach((section) => {

        // Creating new li elements
        const item = document.createElement("li"),
        // Setting the section id in a variable
            sectionLink = `${section.id}`,
        // Setting the section data in a variable
            sectionName = `${section.dataset.nav}`;
            
        // Appenging anchor element in item by innerHTML 
        item.innerHTML = `<a class="link" data-nav="${sectionLink}">${sectionName}</a>`;

        // Appending the item in the fragment
        fragment.appendChild(item);

    });
    // Appending the fragment in the navigation menu
    navBar.appendChild(fragment);

}


// Add class 'active' to section when near top of viewport
function addActive() {

    /* Setting the IntersectionObserver function into a variable
    *  The IntersectionObserver is the function that checks if the element in viewport
    */
    const observer = new IntersectionObserver(
        (elements) => {

            // Looping into the function parameter 
            elements.forEach((element) => {

                // Connecting the section and the link together by link`s data-nav
                const link = navBar.querySelector(`[data-nav=${element.target.dataset.nav}]`);
                // Checking if the element(section) is not in viewport

                if (!element.isIntersecting) {

                    // If not it will make sure the classes are not including into sections and links
                    
                    element.target.classList.remove("active");
                    link.classList.remove("activate");

                } else{

                    // Otherwise it will add the classes to both section and it`s navigation link

                    element.target.classList.add("active");
                    link.classList.add("activate");

                }

            });

        },
        // This will happen when 60% of the element is in viewport
        {
            "threshold": 0.6
        }
    );
//  The function will return it`s value and loop it through the sections

    return sections.forEach((section) => {

        observer.observe(section);

    });

}
// Scroll to anchor ID using scrollTO event
function scrollToSection() {
// Add click event to the navigation bar 
    navBar.addEventListener(
        "click",
        (event) => {

            // PreventDefault
            event.preventDefault();
            // Locating the section by its data
           const link = document.getElementById(`${event.target.dataset.nav}`)
           link.scrollIntoView({
                // Setting the scroll behavior
                behavior: "smooth"
            });

        }
    );

}


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to sections
scrollToSection();
// Set sections as active
window.addEventListener('scroll',addActive);