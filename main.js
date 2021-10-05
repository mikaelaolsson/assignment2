let body = document.querySelector("body");
let form = document.querySelector("form");
let main = document.querySelector("main");
let placeHolder = document.querySelector(".holder");
placeHolder.remove();

let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
let reset = document.querySelector("#reset");

const url = "https://pixabay.com/api/?";
const apiKey = "23474825-b19c59a799dccd22ee2b7f6be";
let currentPage = 0;

// så man inte kan lura sökmotorn med next och prev
let sneak = false;


if (currentPage === 0) {
    next.hidden = true;
    prev.hidden = true;
}

form.onsubmit = event => {
    event.preventDefault();
    currentPage = 1;
    removeAllChildren(main);
    sneak = false;
    getSearch(currentPage);
}

prev.onclick = event => {
    removeAllChildren(main);
    currentPage--;
    sneak = true;
    getSearch(currentPage);
}

next.onclick = event =>{
    removeAllChildren(main);
    currentPage++;
    sneak = true;
    getSearch(currentPage);
}
reset.onclick = event => {
    removeAllChildren(main);
    next.hidden = true;
    prev.hidden = true;
}

async function getSearch(currentPage) {
    let params = new URLSearchParams({
        key: apiKey,
        page: currentPage,
        per_page: 10
    });

    params.set('page', currentPage);

    if(!sneak) {
        let text = form.elements.search.value;
        let color = form.elements.color.value;
        colorCustomizer(color);
        if (text !== "") {
            params.set("q", text);
        }
        if (color !== "any") {
            params.set("colors", color)
        }
    }

    const response = await fetch(url + params);
    const results = await response.json();

    let numOfPages = Math.ceil(results.totalHits / 10)

    if (results.total === 0) {
        let container = placeHolder.cloneNode(true);
        let noHits = document.createElement("h2");
        noHits.id = "sorry";
        noHits.textContent = "Sorry, we couldn't find any matches."

        container.appendChild(noHits);
        main.appendChild(container);

        next.hidden = true;
        prev.hidden = true;
    }
    else {

        results.hits.forEach(result => {
            let container = placeHolder.cloneNode(true);

            let img = document.createElement("img");
            img.src = result.webformatURL;
            container.appendChild(img);

            let keywords = document.createElement("h2");
            keywords.textContent = result.tags;
            container.appendChild(keywords);

            let author = document.createElement("h3");
            author.textContent = "Taken by: " + result.user;
            container.appendChild(author);

            main.appendChild(container);          

        });

        next.hidden = false;
        prev.hidden = false;

        if (currentPage === 1) {
            prev.disabled = true;
        }
        else {
            prev.disabled = false;
        }

        if (currentPage === numOfPages) {
            next.disabled = true;
        }
        else {
            next.disabled = false;
        }
    }

}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function colorCustomizer(color) {   
    
    if (color === "pink") {
        body.style.background = "linear-gradient(90deg, rgba(254,202,240,1) 0%, rgba(247,72,107,1) 100%)";                
    }
    else if (color === "lilac") {
        body.style.background = "linear-gradient(90deg, rgba(104,61,111,1) 0%, rgba(209,157,205,1) 100%)";
    }
    else if (color === "blue") {
        body.style.background = "linear-gradient(90deg, rgba(94,213,230,1) 0%, rgba(26,39,99,1) 100%)";
    }
    else if (color === "turquoise") {
        body.style.background = "linear-gradient(90deg, rgba(63,128,112,1) 0%, rgba(86,214,170,1) 100%)";
    }
    else if (color === "green") {
        body.style.background = "linear-gradient(90deg, rgba(28,75,28,1) 0%, rgba(163,196,116,1) 100%)";
    }
    else if (color === "red") {
        body.style.background = "linear-gradient(90deg, rgba(227,107,80,1) 0%, rgba(113,20,20,1) 100%)";
    }
    else if (color === "orange") {
        body.style.background = "linear-gradient(90deg, rgba(230,163,47,1) 0%, rgba(230,170,96,1) 100%)";
    }
    else if (color === "yellow") {
        body.style.background = "linear-gradient(90deg, rgba(245,250,159,1) 0%, rgba(241,207,31,1) 100%)";
    }
    else if (color === "white") {
        body.style.background = "linear-gradient(90deg, rgba(235,237,204,1) 0%, rgba(251,251,251,1) 100%)";
    }
    else if (color === "gray") {
        body.style.background = "linear-gradient(90deg, rgba(65,65,65,1) 0%, rgba(134,148,147,1) 100%)";
    }
    else if (color === "black") {
        body.style.background = "linear-gradient(90deg, rgba(102,97,97,1) 0%, rgba(0,0,0,1) 100%)";
    }
    else if (color === "brown") {
        body.style.background = "linear-gradient(90deg, rgba(187,170,132,1) 0%, rgba(78,51,16,1) 100%)";
    }
    else if (color === "grayscale") {
        body.style.background = "linear-gradient(90deg, rgba(227,225,225,1) 0%, rgba(34,34,34,1) 100%)";
    }
    else {
        body.style.background ="linear-gradient(90deg, rgba(218,96,162,1) 0%, rgba(232,190,62,1) 50%, rgba(144,201,214,1) 100%)";
    }
}
