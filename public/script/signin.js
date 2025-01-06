const signinForm = document.getElementById('signinForm');
const alertDiv = document.getElementById('alert');

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(signinForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(signinForm.action, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await response.json();

        if (response.ok) {
            if (result.success) {
                window.location.href = result.redirect;
            } else {
                alertDiv.innerText = result.error;
                alertDiv.classList.add('error');
                alertDiv.style.display = 'block';

                console.log(result.error);
            }

        } else {
            alertDiv.innerText = result.error;
            alertDiv.classList.add('error');
            alertDiv.style.display = 'block';
            console.log(result.error);
        }
    } catch (error) {
        console.log(error);
    }
})