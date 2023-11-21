const  accessKey = "ckN41BXykKB9Se7btsfyjoe0J66dTCZXejVRF0RkRIE";

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages() {
    inputData =  inputEl.value;
    // create dynamic url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // fetch data from url
    const response = await fetch(url);
    const data = await response.json();

    // convert json data into images
    const results = data.results;

    // initialize page number
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    // map result variable
    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page > 1) {
        showMore.style.display = 'block';
    }
}

formEl.addEventListener('submit', (event) => {
   event.preventDefault();
   page = 1;
   searchImages();
})

showMore.addEventListener('click', () => {
   searchImages();
})