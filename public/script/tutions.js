const insName = document.getElementById("insertName"); // div to display user name
const insHey = document.getElementById("insertHey"); // display user name
const addClassForm = document.getElementById("addClassForm"); // form to add class
const addClassSubmit = document.getElementById("addClassSubmit"); // submit button of form
const addme = document.getElementById("addr1"); // container of form
const container = document.querySelector(".toteach"); // container to display tuitions
const alertPop = document.getElementById('alert') // alert div

let btn;

// function to insert name 
async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = `Hi! ${resultName.userName}`;
        insHey.innerText = `Hey ${resultName.userName}`
    }
}

// function to add tuitions to container 
async function gets() {
    const classes = await gettution(); // get tuitions

    // get timings of tuitions 
    let time = [];
    for (const element in classes) {
        const timings = await getTimings(classes[element].skill_id);
        time.push(timings);
    }

    // add classes and timings to container if present 
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
                        <button class="but cancel" classId="${timeSlot.class_id}">Cancel Tution</button>
                        <button class="but view" classId="${timeSlot.class_id}">View Students</button>                           
                    </div>
                `;
                    skillDiv.querySelector(".timings").appendChild(timingDiv);
                });


            }

            // button to add class timings 
            const addcls = document.createElement("button");
            addcls.innerText = 'Add Class';
            addcls.classList.add('but');
            skillDiv.appendChild(addcls);
            // event listener to add class button 
            addcls.addEventListener("click", (event) => {
                skillInput = document.getElementById('skillInput');
                skillInput.value = element.skill_id;
                btn = event.target;
                addme.style.display = 'flex';
                addme.onclick = (event) => {
                    if (event.target === addme) {
                        skillInput.value = 'none';
                        addme.style.display = 'none';
                    }
                };
            });
        });
    } else {
        document.getElementById("para").innerText = 'NO TUTIONS, CLICK ON ADD TUTION TO ADD YOUR CLASSES';
    }

    attachListeners();
}

// function to attach event listeners to delete tuition button and view students button
function attachListeners() {

    document.querySelectorAll(".cancel").forEach(button => {
        button.addEventListener("click", async (event) => {
            const timingDiv = event.target.closest(".times");
            if (timingDiv) {
                const ans = confirm("are you sure u want to delete tution");
                if (ans) {
                    classId = button.getAttribute('classId');
                    try {
                        const response = await fetch(`/class/${classId}`, { method: "DELETE" })
                        const result = await response.json();
                        if (response.ok) {
                            if (result.success) {
                                timingDiv.remove();
                                console.log("Tuition timing removed.");
                            } else {
                                console.log(result.message);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }

                }
            }
        });
    });

    document.querySelectorAll(".view").forEach(button => {
        button.addEventListener("click", (event) => {
            const classId = button.getAttribute("classId");
            const timingDiv = event.target.closest(".times");
            const date = timingDiv.querySelector("p:first-child").innerText.replace("Date: ", "");
            const skillDiv = event.target.closest(".sub");
            const skillName = skillDiv.querySelector("h2").innerText.replace("Skill Name: ", "");
            window.location.href = `/views/view_students.html?classId=${encodeURIComponent(classId)}&date=${encodeURIComponent(date)}&skillName=${encodeURIComponent(skillName)}`;
        });
    });
}

// function to get tuitions taken by user 
async function gettution() {
    const response = await fetch(`http://localhost:2000/skill/user`);
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    return data.skills;
}

// function to get timings of a tuition 
async function getTimings(id) {
    const response = await fetch(`http://localhost:2000/skill/timings/${id}`)
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    return data.classes;
}

// function to display alert 
function displayAlert(message, removeClass, addClass) {
    alertPop.textContent = message;
    if (alertPop.classList.contains(removeClass)) {
        alertPop.classList.remove(removeClass);
    }
    alertPop.classList.add(addClass);
    alertPop.style.display = 'block';
}

// close alert when clicked on it 
alertPop.addEventListener('click', (event) => {
    if (alertPop.style.display == 'block') {
        alertPop.style.display = 'none';
    }
})

// event listener for submit button of add class timings form 
addClassSubmit.onclick = async (event) => {
    event.preventDefault();

    const formData = new FormData(addClassForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(addClassForm.action, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            if (result.success) {
                displayAlert(result.message, 'error', 'success');

                const parent = btn.parentElement;
                const id = result.id;

                const timeSlot = data;

                const timingDiv = document.createElement('div');
                timingDiv.classList.add("times");

                timingDiv.innerHTML = `
                        <p>Date: ${timeSlot.date}</p>
                        <p>Timings: ${timeSlot.startTime} - ${timeSlot.endTime}</p>
                        <div class="button-container">
                            <button class="but cancel" classId="${id.class_id}">Cancel Tution</button>
                            <button class="but view" classId="${id.class_id}">View Students</button>                           
                        </div>
                    `;

                parent.insertBefore(timingDiv, btn);



                console.log('class adding successful');
                addme.style.display = 'none';
            } else {
                displayAlert(result.message, 'success', 'error');

                console.log('adding unsuccessful');
                console.log(result);

                addme.style.display = 'none';
            }


        } else {
            displayAlert(response.status, 'success', 'error');
            console.log('unsuccessful');
        }
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    insertName();
    gets();
});

// to prevent selection of previous dates in class date 
const dates=document.getElementById("dateInput");
const today = new Date().toISOString().split('T')[0];
dates.setAttribute("min",today);