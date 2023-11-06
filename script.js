const input = document.querySelector('.inp');
const add = document.querySelector('.add');
const list = document.querySelector('.list');

// Récupérez les données existantes dans le localStorage (s'il y en a)
const existingCards = JSON.parse(localStorage.getItem('cards')) || [];

// Mettez à jour la liste avec les données existantes
existingCards.forEach(cardData => {
  list.innerHTML += `
    <li>
      ${cardData.text}
      <div class="boxD">
        <button class="sup">X</button>
      </div>
    </li>
  `;
});

add.addEventListener('click', (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
        alert('Entrez le texte de la tâche');
        return;
    }

    // Ajoutez la nouvelle tâche à la liste
    list.innerHTML += `
      <li>
        ${input.value}
        <div class="boxD">
          <button class="sup">X</button>
        </div>
      </li>
    `;

    // Ajoutez la nouvelle tâche aux données existantes et enregistrez-les dans le localStorage
    existingCards.push({ text: input.value });
    localStorage.setItem('cards', JSON.stringify(existingCards));

    // Réinitialisez la zone de texte
    input.value = '';
});


list.addEventListener('click', (e) => {
    if (e.target.classList.contains('sup')) {
        const listItem = e.target.closest('li');
        const text = listItem.childNodes[0].textContent.trim(); // only get the text of the card

        // Supprimez l'élément du localStorage
        removeItemFromLocalStorage(text);

        // Supprimez l'élément de la liste
        listItem.remove();
    }
});

// Fonction pour supprimer un élément du localStorage
function removeItemFromLocalStorage(text) {
    const existingCards = JSON.parse(localStorage.getItem('cards')) || [];

    // Recherchez l'élément correspondant et supprimez-le du tableau
    const updatedCards = existingCards.filter(cardData => cardData.text !== text);

    // Mettez à jour le localStorage avec le tableau mis à jour
    localStorage.setItem('cards', JSON.stringify(updatedCards));
    localStorage.clear();
}