const form = document.getElementById('tutionForm')
const a1 = document.getElementById("me");
const alertPop = document.getElementById('alert')

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
                            startTime: data.startTime,
                            endTime: data.endTime,
                            date: data.date,
                            skillId: result.skillId
                        }),
                    });
                    const classResult = await classResponse.json();
                    if (classResponse.ok) {
                        if (classResult.success) {
                            window.location.href = result.redirect;
                        } else {
                            alertPop.textContent = classResult.message;
                            if (alertPop.classList.contains('success')) {
                                alertPop.classList.remove('success');
                            }
                            alertPop.classList.add('error');
                            alertPop.style.display = 'block';

                            fetch(`/skill/${result.skillId}`, { method: "DELETE" })
                                .then(response => {
                                    if (!response.ok) {
                                        console.log('skill exists');
                                    }
                                    return response.json();
                                }
                                ).then(data => {
                                    if (data.success) {
                                        console.log('skill not added');
                                    } else {
                                        console.log('skill is present');
                                    }
                                })
                                .catch(err=>{
                                    console.log('error occured'+err);
                                })

                        }
                    } else {
                        alertPop.textContent = classResult.message;
                        if (alertPop.classList.contains('success')) {
                            alertPop.classList.remove('success');
                        }
                        alertPop.classList.add('error');
                        alertPop.style.display = 'block';

                        fetch(`/skill/${result.skillId}`, { method: "DELETE" })
                            .then(response => {
                                if (!response.ok) {
                                    console.log('skill exists');
                                }
                                return response.json();
                            }
                            ).then(data => {
                                if (data.success) {
                                    console.log('skill not added');
                                } else {
                                    console.log('skill is present');
                                }
                            })

                    }

                } else {
                    alertPop.textContent = result.message;
                    if (alertPop.classList.contains('success')) {
                        alertPop.classList.remove('success');
                    }
                    alertPop.classList.add('error');
                    alertPop.style.display = 'block';
                }
            } else {
                alertPop.textContent = result.message;
                if (alertPop.classList.contains('success')) {
                    alertPop.classList.remove('success');
                }
                alertPop.classList.add('error');
                alertPop.style.display = 'block';

            }
        } catch (error) {
            alertPop.textContent = 'Something went wrong';
            if (alertPop.classList.contains('success')) {
                alertPop.classList.remove('success');
            }
            alertPop.classList.add('error');
            alertPop.style.display = 'block';
            console.log(error);
        }
    }
};