
document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".ski");

    skills.forEach(skill => {
        const category = skill.querySelector("h3").innerText; // Get the category name

        skill.addEventListener("click", () => {
            // Redirect to a new HTML file based on the category
            const formattedCategory = category.toLowerCase().replace(/\s+/g, "_"); // Convert to lowercase and replace spaces with underscores
            window.location.href = `classes.html?category=${formattedCategory}`; // Navigate to the corresponding HTML file
        });
    });

    const main_heading = document.getElementById("main_heading");
    const welcome_heading = document.getElementById("welcome_head");


    fetch("/getUser")
        .then(response => {
            if (!response.ok) {
                throw new Error("Not logged in");
            }
            return response.json();
        })
        .then(data => {
            main_heading.innerText = `Welcome, ${data.userName}!`;
            welcome_heading.innerText = `Hello, ${data.userName}!`;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("welcome-message").innerText = "Welcome, Guest!";
        });
});



