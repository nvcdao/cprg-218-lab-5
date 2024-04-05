// Fetch Ghibli locations asynchronously
const fetchGhibliLocations = async () => {
  try {
    const response = await fetch("https://ghibliapi.vercel.app/locations");
    if (!response.ok) throw new Error('Failed to fetch Ghibli locations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Ghibli locations:', error);
    return null;
  }
};

// Fetch location details asynchronously based on URL
const fetchLocationDetails = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch location details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching location details:', error);
    return null;
  }
};

// Render location details in the HTML
const renderLocationDetails = (data) => {
  const resultsContainer = document.getElementById('option-1-results');
  if (!resultsContainer) {
    console.error('Results container not found.');
    return;
  }
  resultsContainer.innerHTML = `
    <div class="card">
      <h1>${data.name}</h1>
      <p>Climate: ${data.climate}</p>
      <p>Terrain: ${data.terrain}</p>
    </div>`;
};

// Handle dropdown selection event
const handleDropdownSelection = async () => {
  try {
    const select = document.getElementById('dropdown');
    const url = select.options[select.selectedIndex].value;
    const locationData = await fetchLocationDetails(url);
    if (locationData) renderLocationDetails(locationData);
  } catch (error) {
    console.error('Error handling dropdown selection:', error);
  }
};

// Populate dropdown with Ghibli locations
const populateDropdown = async () => {
  try {
    const select = document.getElementById("dropdown");
    const locations = await fetchGhibliLocations();
    if (locations) {
      locations.forEach(location => {
        const option = document.createElement("option");
        option.textContent = location.name;
        option.value = location.url;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error populating dropdown:', error);
  }
};

// Attach event listener to the submit button
const submitButton = document.getElementById('submit-button');
if (submitButton) {
  submitButton.addEventListener('click', handleDropdownSelection);
} else {
  console.error('Submit button element not found.');
}

// Fetch and display movies when the page loads
populateDropdown();
