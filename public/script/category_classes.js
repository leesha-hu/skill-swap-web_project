const insName = document.getElementById("insertName");
const alertPop = document.getElementById('alert')

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const catId = urlParams.get('catId');

async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = resultName.userName;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    insertName();

    const hh = document.getElementsByClassName("h2")[0];
    hh.innerText = `SEE NEAR BY CLASSES IN ${category} CATEGORY`;
    const container = document.querySelector(".toteach");

    async function gets() {
        const classes = await gettution();

        if (classes.length > 0) {

            let time = [];
            for (const element in classes) {
                const timings = await getTimings(classes[element].skill_id);
                time.push(timings);
            }

            classes.forEach((element, index) => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add("sub");
                skillDiv.innerHTML = `
                    <h2>Skill Name: ${element.skill_name}</h2>
                    <p>Teacher:${element.user_name}</p>
                    <p>Tution Center: ${element.address}</p>
                    <p>Description:${element.description}</p>
                    <div class="timings"></div>
                `;
                container.appendChild(skillDiv);

                // Add tuition timings dynamically for each skill
                const classTime = time[index];
                if (classTime.length > 0) {

                    classTime.forEach(timeSlot => {
                        const timingDiv = document.createElement('div');
                        timingDiv.classList.add("times");
                        const date = new Date(timeSlot.date);
                        const onlyDate = date.toISOString().split('T')[0];

                        timingDiv.innerHTML = `
                        <p>Date: ${onlyDate}</p>
                        <p>Timings: ${timeSlot.start_time} - ${timeSlot.end_time}</p>
                        <div class="button-container">
                             <button class="but add" classId="${timeSlot.class_id}">Add class</button>
                        </div>
                        `;
                        skillDiv.querySelector(".timings").appendChild(timingDiv);
                    });
                }
            });
        } else {
            document.getElementById("para").innerText = `NO TUTIONS, CLICK ON ADD TUTION TO ADD YOUR CLASSES`;
        }

        attachListeners();
    }

    function attachListeners() {
        document.querySelectorAll(".add").forEach(button => {
            button.addEventListener("click", async (event) => {
                const timingDiv = event.target.closest(".times");
                if (timingDiv) {
                    const ans = confirm("are you sure u want to add tution");
                    if (ans) {
                        classId = button.getAttribute('classId');
                        try {
                            const response = await fetch(`/participant/${classId}`, { method: "POST" })
                            const result = await response.json();
                            if (result.success) {
                                alertPop.textContent = result.message;
                                if (alertPop.classList.contains('error')) {
                                    alertPop.classList.remove('error');
                                }
                                alertPop.classList.add('success');
                                alertPop.style.display = 'block';
                                console.log("Tuition timing added.");
                            } else {
                                alertPop.textContent = result.message;
                                if (alertPop.classList.contains('success')) {
                                    alertPop.classList.remove('success');
                                }
                                alertPop.classList.add('error');
                                alertPop.style.display = 'block';
                                console.log("unsuccessful")
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
                }
            });
        });


    }

    async function gettution() {
        const response = await fetch(`http://localhost:2000/skill/category/${catId}`);
        if (!response.ok) {
            console.error("Can't find classes");
            return [];
        }
        const data = await response.json();
        if (data.success) {
            return data.skills;

        }
        return [];
    }

    gets();
});

async function getTimings(id) {
    const response = await fetch(`http://localhost:2000/skill/timings/${id}`)
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    return data.classes;
}