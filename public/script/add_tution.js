const form = document.getElementById('tutionForm')
const a1 = document.getElementById("me");
a1.onclick = async () => {
    let an = confirm("you sure you want to add tution");
    if (an) {
        
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
                if (result.success) {
                    window.location.href = result.redirect;
                }
            } else {
                console.log('unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    }
};