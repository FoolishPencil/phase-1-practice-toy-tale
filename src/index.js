document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // Toggle form visibility
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  // Fetch existing toys and display them
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => renderToy(toy));
    });

  // Handle form submission to add a new toy
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get toy details from form inputs
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    // Send POST request to add new toy
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        // Add the new toy to the DOM
        renderToy(newToy);
      });

    // Clear the form fields
    event.target.reset();
  });

  // Function to render a toy in the DOM
  function renderToy(toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    toyCollection.appendChild(toyCard);
  }
});
