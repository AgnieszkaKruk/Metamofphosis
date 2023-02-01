//let draggedObject = null;
function initMixedCardsDropZone() {
    const mixedCardsContainer = document.querySelector('.mixed-cards');
    mixedCardsContainer.addEventListener('drop', handleDrop);
    mixedCardsContainer.addEventListener('dragover', handleDragOver)
}

function initDragAndDrop() {
    initElements();
    shuffleCards();
    initDropzones();
    initMixedCardsDropZone();
    //initDragEvents();
}

function shuffleCards() {
    const parent = document.querySelector('.mixed-cards');
    const mixedCards = parent.children;
    for (let i = mixedCards.length; i >= 0; i--) {
        parent.appendChild(mixedCards[(Math.random() * i) | 0]);
    }

}

function toggleCardSlotsHighlight(on=true) {
    let cardSlots = document.querySelectorAll('.card-slot');
    cardSlots.forEach(function(el) {
        if (on) {
            el.classList.add("card-slot-highlighted")
        } else {
            el.classList.remove("card-slot-highlighted")
        }
    })
}

function toogleMixedCardsHighlighted(on=true) {
    let cardMixed = document.querySelector('.mixed-cards');
    if (on) {
        cardMixed.classList.add("mixed-cards-highlighted")
    } else {
        cardMixed.classList.remove("mixed-cards-highlighted")
    }
}

function handleDragStart(ev) {
    console.debug(ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.target.firstElementChild.classList.add("highlight")

    if (ev.target.parentElement.className == "card-slot") {
        toogleMixedCardsHighlighted();
    } else {
        toggleCardSlotsHighlight();
    }
}

function handleDragEnd(ev) {
    ev.target.firstElementChild.classList.remove("highlight")
    toggleCardSlotsHighlight(false);
    let superHighlighted = document.querySelector('.card-slot-highlighted-super');
    if (superHighlighted) {
        superHighlighted.classList.remove('card-slot-highlighted-super');
    }
    if (ev.target.parentElement.className == "card-slot") {
        toogleMixedCardsHighlighted(false)     
    }
    
}
function initElements() {
    let all_cards = document.querySelectorAll('.card');
    let initialId = 0;
    all_cards.forEach(function(element) {
        element.setAttribute("draggable", true)

        element.addEventListener("dragstart", handleDragStart);
        element.addEventListener("dragend", handleDragEnd);

        element.firstElementChild.setAttribute("draggable", false);
        element.id = "div_" + (initialId++);
    })
}
function handleDragEnter(ev) {

    ev.target.classList.add("card-slot-highlighted-super");
}
function handleDragLeave(ev) {
    ev.target.classList.remove("card-slot-highlighted-super");
    
}
function initDropzones() {
    all_dropZones = document.querySelectorAll('.metamorphosis-slots').forEach(function(element) {
        let all_kids = element.children;
        for (let i = 0; i < all_kids.length; i++) {
            let targetElement = all_kids[i];
            targetElement.addEventListener("drop", handleDrop);
            targetElement.addEventListener("dragover", handleDragOver);
            targetElement.addEventListener("dragenter", handleDragEnter);
            targetElement.addEventListener("dragleave", handleDragLeave);
        }

    })
}

function handleDrop(ev) {
    let parent = ev.target;
    if (ev.target.nodeName == "IMG") {
        parent = ev.target.parentElement.parentElement;
        if (parent.className != 'mixed-cards') {
            return false;
        }
    }
    if (ev.target.nodeName == "DIV" && ev.target.hasChildNodes()) {
        if (ev.target.className != "mixed-cards") {
            return false;
        }
    }
        
    const id = ev.dataTransfer.getData("text/plain");
    ev.preventDefault()
    parent.appendChild(document.getElementById(id));
    
    if (ev.target.parentElement.className == "card-slot") {
        toogleMixedCardsHighlighted(false)  }

}

function handleDragOver(ev) {
    ev.preventDefault()

}

initDragAndDrop();
