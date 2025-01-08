const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("errorMessage");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");

// Marker for selected location
let marker;

const initMap=async (lat,lng)=>{
    // Initialize the map and set a default view
    const map = L.map("map").setView([lat, lng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);

    // Handle map click to update latitude and longitude
    map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        // Update the marker position
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }

        // Update hidden input fields
        latitudeInput.value = lat;
        longitudeInput.value = lng;
    });
}



// Check if Geolocation is available
if ("geolocation" in navigator) {
    // Request location
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            // Set values in hidden fields
            latitudeInput.value = latitude;
            longitudeInput.value = longitude;

            initMap(latitude,longitude);

        },
        (error) => {
            // Handle geolocation errors
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage.innerText = "User denied the request for Geolocation.";
                    // change errorMessage class to warning
                    if (errorMessage.classList.contains("error")) {
                        errorMessage.classList.remove('error');
                    }
                    if (!errorMessage.classList.contains("warning")) {
                        errorMessage.classList.add("warning");
                    }
                    errorMessage.style.display = "block";
                    break;

                case error.POSITION_UNAVAILABLE:
                    errorMessage.innerText = "Location information is unavailable.";
                    // change errorMessage class to warning
                    if (errorMessage.classList.contains("error")) {
                        errorMessage.classList.remove('error');
                    }
                    if (!errorMessage.classList.contains("warning")) {
                        errorMessage.classList.add("warning");
                    }
                    errorMessage.style.display = "block";
                    break;

                case error.TIMEOUT:
                    errorMessage.innerText = "The request to get user location timed out.";
                    // change errorMessage class to warning
                    if (errorMessage.classList.contains("error")) {
                        errorMessage.classList.remove('error');
                    }
                    if (!errorMessage.classList.contains("warning")) {
                        errorMessage.classList.add("warning");
                    }
                    errorMessage.style.display = "block";
                    break;

                case error.UNKNOWN_ERROR:
                    errorMessage.innerText = "An unknown error occurred.";
                    // change errorMessage class to warning
                    if (errorMessage.classList.contains("error")) {
                        errorMessage.classList.remove('error');
                    }
                    if (!errorMessage.classList.contains("warning")) {
                        errorMessage.classList.add("warning");
                    }
                    errorMessage.style.display = "block";
                    break;
            }

            initMap(12.9716, 77.5946);

        }
    );
} else {
    // If geolocation is not available, display error message
    errorMessage.innerText = "Geolocation is not supported by this browser.";
    // change errorMessage class to warning
    if (errorMessage.classList.contains("error")) {
        errorMessage.classList.remove('error');
    }
    if (!errorMessage.classList.contains("warning")) {
        errorMessage.classList.add("warning");
    }
    errorMessage.style.display = "block";

    initMap(12.9716, 77.5946);
}



form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission until coordinates are captured

    // check if password and confirmPassword match 
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirm_password"]');
    if (password.value !== confirmPassword.value) {
        errorMessage.textContent = "Passwords do not match.";

        // change errorMessage class to error 
        if (errorMessage.classList.contains("warning")) {
            errorMessage.classList.remove('warning');
        }
        if (!errorMessage.classList.contains("error")) {
            errorMessage.classList.add("error");
        }
        // display error 
        errorMessage.style.display = "block";
    }


    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect on success
            if (result.success) {
                window.location.href = result.redirect;
            }
        } else {
            // Display error message
            errorMessage.textContent = result.error || "An unknown error occurred.";

            // change errorMessage class to error
            if (errorMessage.classList.contains("warning")) {
                errorMessage.classList.remove('warning');
            }
            if (!errorMessage.classList.contains("error")) {
                errorMessage.classList.add("error");
            }
            errorMessage.style.display = "block";
        }
    } catch (err) {
        console.error("Error:", err);
        errorMessage.textContent = "A network error occurred.";

        // change errorMessage class to error
        if (errorMessage.classList.contains("warning")) {
            errorMessage.classList.remove('warning');
        }
        if (!errorMessage.classList.contains("error")) {
            errorMessage.classList.add("error");
        }
        errorMessage.style.display = "block";
    }

});

