const insName = document.getElementById("insertName"); // element to display user name 
const alertPop = document.getElementById('alert'); // alert pop up
const container = document.querySelector(".toteach"); // get container to display the nearby classes

// get url parameters category name and id 
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const catId = urlParams.get('catId');

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

// function to display Hi user name 
async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = `Hi! ${resultName.userName}`;
    }
}

// function to get nearby tutions of a particular category 
async function gettution() {
    // fetch the tutions 
    const response = await fetch(`http://localhost:2000/skill/category/${catId}`);

    if (!response.ok) {
        // fetch unsuccessful return empty array 
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    if (data.success) {
        // fetch successful return the obtained tutions 
        return data.skills;

    }
    // else return empty array 
    return [];
}

// function to add event listeners to add skill buttons 
function attachListeners() {
    // get all the add skill buttons 
    document.querySelectorAll(".add").forEach(button => {
        // add event listener to button 
        button.addEventListener("click", async (event) => {

            const ans = confirm("are you sure u want to add tution");
            if (ans) {
                // get class id of the class to be added 
                classId = button.getAttribute('classId');
                try {
                    const response = await fetch(`/participant/${classId}`, { method: "POST" })
                    const result = await response.json();
                    if (result.success) {
                        displayAlert(result.message, 'error', 'success');
                        console.log("Tuition timing added.");
                    } else {
                        displayAlert(result.message, 'success', 'error');
                        console.log("unsuccessful")
                    }

                } catch (error) {
                    displayAlert('Something went wrong', 'success', 'error');
                    console.log(error);
                }


            }

        });
    });


}

// fuction to display nearby tutions 
async function gets() {
    const classes = await gettution(); // call function to get nearby classes

    // if classes array is not empty add the tutions into the container 
    if (classes.length > 0) {
        // get timings of the particular skills 
        let time = [];
        for (const element in classes) {
            const timings = await getTimings(classes[element].skill_id);
            time.push(timings);
        }

        // display each skill 
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
        // display no nearby skills of the category found 
        document.getElementById("para").innerText = `NO TUTIONS, CLICK ON ADD TUTION TO ADD YOUR CLASSES`;
    }

    attachListeners();
}

// function to get timings of a skill 
async function getTimings(id) {
    const response = await fetch(`http://localhost:2000/skill/timings/${id}`)
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    return data.classes;
}

document.addEventListener("DOMContentLoaded", function () {
    insertName(); // call function to display name

    // display category name 
    const hh = document.getElementsByClassName("h2")[0];
    hh.innerText = `SEE NEAR BY CLASSES IN ${category} CATEGORY`;

    gets(); // call function
});

