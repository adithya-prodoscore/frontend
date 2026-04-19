import { fetchPin, deletePin } from "./api.js";

const container = document.getElementById("pin-detail-container");
const errorText = document.getElementById("error-message");
const errorContainer = document.getElementById("error-container");

const createPinSection = (data) => {
  return `
    <div class="pin-detail-view">
        <div class="back-button-container">
            <a href="index.html" class="btn-secondary">← Back to Gallery</a>
        </div>
        
        <div class="pin-detail-card">
            <div class="pin-detail-image">
                <img src="${data.image_link}" alt="${data.title}" />
            </div>
            
            <div class="pin-detail-info">
                <h1 class="pin-title">${data.title}</h1>
                <p class="pin-author">Uploaded by <strong>${data.author}</strong></p>
                <p class="pin-description">${data.body || "No description provided."}</p>
            </div>
        </div>
    </div>
  `;
};

async function renderPinDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const pinId = urlParams.get("id");

  if (!pinId) {
    container.innerHTML = "";
    errorText.innerText = "<h2>Pin not found.</h2>";

    errorContainer.classList.remove("error-hidden");
    errorContainer.classList.add("error-visible");
    return;
  }

  container.innerHTML = "<p>Loading pin details...</p>";

  const { data, error } = await fetchPin(pinId);

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

  container.innerHTML = createPinSection(data);
}

renderPinDetail();

async function handleDelete(id) {
  const confirmDelete = confirm("Are you sure you want to delete this pin?");
  if (!confirmDelete) return;

  const { error } = await deletePin(id);

  if (error) {
    alert(error);
  } else {
    alert("Pin deleted successfully!");
    window.location.href = "index.html"; // Redirect to home
  }
}

renderPinDetail();
