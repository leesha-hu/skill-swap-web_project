const form = document.getElementById('tutionForm')
const a1 = document.getElementById("me");
a1.onclick = async (event) => {
    event.preventDefault();
    let an = confirm("you sure you want to add tution");
    if (an) {

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(form.action, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    const classResponse = await fetch('/class', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            startTime:data.startTime,
                            endTime:data.endTime,
                            date:data.date,
                            skillId:result.skillId
                        }),
                    });
                    const classResult = await classResponse.json();
                    if (classResponse.ok) {
                        if (classResult.success) {
                            window.location.href = result.redirect;
                        } else {
                            console.log(classResult.message);
                        }
                    } else {
                        console.log('class adding unsuccessful');
                    }

                }
            } else {
                console.log('unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    }
};