let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let initialCount = 5;
let isInitialLoad = true;

// Unsplash API
const apiKey = 'eZZUW7kqo3wP46kErjau0Pd10O442Htyp6N8ehlcE-A';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == initialCount) {
        ready = true;
        imagesLoaded = 0;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for Links & Photos, Add to DOM
function displayPhotos() {

    loader.hidden = false;
    photosArr.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: `Artist: ${photo.user.instagram_username ? photo.user.instagram_username : photo.user.last_name}`,
        });
        // check fi each photo is finished loading
        img.addEventListener('load', imageLoaded);
        // Append img inside <a>, then append them to the ImageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArr = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLWithNewCount(10);
            isInitialLoad = false;
        }
    } catch (error) {
        alert(error.message);
    }
}

// Check to see if scrolling near bottom of the page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//On Load
getPhotos();