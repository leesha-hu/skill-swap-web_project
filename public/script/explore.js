document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".ski");
    const signInModal = document.getElementById('signin-modal');

    skills.forEach(skill => {
        const category = skill.querySelector("h3").innerText; // Get the category name

        skill.addEventListener("click", () => {
            signInModal.style.display = 'flex';

        });
        signInModal.onclick = (event) => {
            if (event.target === signInModal) {
                signInModal.style.display = 'none';
            }
        };
    });
});