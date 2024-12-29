const insName = document.getElementById("insertName");
const insHey = document.getElementById("insertHey");

async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = resultName.userName;
        insHey.innerText = `Hey ${resultName.userName}`
    }
}

document.addEventListener("DOMContentLoaded", function () {
    insertName();
    const container = document.querySelector(".toteach");

    async function gets() {
        const classes = await gettution();

        let time = [];
        for (const element in classes) {
            const timings = await getTimings(classes[element].skill_id);
            time.push(timings);
        }
        console.log(time);
        if (classes.length > 0) {
            classes.forEach((element, index) => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add("sub");
                skillDiv.innerHTML = `
                    <h2>Skill Name: ${element.name}</h2>
                    <p>Description: ${element.description}</p>
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
                            <button class="but cancel">Cancel Tuition</button>
                            <button class="but view">View Students</button>
                        </div>
                    `;
                        skillDiv.querySelector(".timings").appendChild(timingDiv);
                    });
                }
            });
        } else {
            document.getElementById("para").innerText = 'NO TUTIONS, CLICK ON ADD TUTION TO ADD YOUR CLASSES';
        }

        attachListeners();
    }

    function attachListeners() {
        document.querySelectorAll(".cancel").forEach(button => {
            button.addEventListener("click", (event) => {
                const timingDiv = event.target.closest(".times");
                if (timingDiv) {
                    const ans = alert("are you sure u want to delete tution");
                    if (ans) {
                        timingDiv.remove();
                        console.log("Tuition timing removed.");
                    }
                }
            });
        });

        document.querySelectorAll(".view").forEach(button => {
            button.addEventListener("click", (event) => {
                const timingDiv = event.target.closest(".times");
                const date = timingDiv.querySelector("p:first-child").innerText.replace("Date: ", "");
                const skillDiv = event.target.closest(".sub");
                const skillName = skillDiv.querySelector("h2").innerText.replace("Skill Name: ", "");
                window.location.href = `leeproject/getstudent.html?skillname=${encodeURIComponent(skillName)}&date=${encodeURIComponent(date)}`;
            });
        });
    }

    async function gettution() {
        const response = await fetch(`http://localhost:2000/skill/user`);
        if (!response.ok) {
            console.error("Can't find classes");
            return [];
        }
        const data = await response.json();
        return data.skills;
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