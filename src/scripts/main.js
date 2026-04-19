import { fetchAllPins } from "./api.js";

const grid = document.getElementById("gallery-grid");
const errorText = document.getElementById("error-message");
const errorContainer = document.getElementById("error-container");

const createPinCard = (pin) => {
  return `
        <div class="gallery-item">
                <div class="image-container">
                    <img src="${pin.image_link}" alt="Wallpaper" />
                </div>

                <div class="card-content">
                    <h3 class="card-title">${pin.title}</h3>

                    <div class="card-footer">
                    <span class="user-name">${pin.author}</span>
                    </div>
                </div>
        </div>`;
};

async function init() {
  grid.innerHTML = "<p>Loading...</p>";
  errorContainer.classList.replace("error-visible", "error-hidden");

  const { data, error } = await fetchAllPins();

  if (error) {
    grid.innerHTML = "";
    errorText.innerText = error;

    errorContainer.classList.remove("error-hidden");
    errorContainer.classList.add("error-visible");
    return;
  }

  if (!data || data.length === 0) {
    grid.innerHTML = "<p>No pins found.</p>";
    return;
  }

  grid.innerHTML = data.map((pin) => createPinCard(pin)).join("");
}

init();
