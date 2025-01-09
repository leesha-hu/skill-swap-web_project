window.onload = async function () {
    // get div to insert name 
    const user_name = document.getElementById("user_name");
    // fetch the user name and display it 
    fetch("/getUser")
        .then(response => {
            if (!response.ok) {
                throw new Error("Not logged in");
            }
            return response.json();
        })
        .then(data => {
            user_name.innerText = `Welcome, ${data.userName}!`;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("welcome-message").innerText = "Welcome, Guest!";
        });

    // get classes user is enrolled in 
    const allClasses = await getSkill();
    // get container to display the enrolled classes 
    const container = document.getElementById('tolearn');

    allClasses.forEach((element, index) => {
        // display each class 
        const newDiv = document.createElement('div');
        newDiv.classList.add("sub");

        const newH2 = document.createElement("h2");
        newH2.innerText = element.name;
        newDiv.appendChild(newH2);

        const newP = document.createElement("p");
        newP.innerText = `Teacher: ${element.teacher}`;
        newDiv.appendChild(newP);

        const newP1 = document.createElement("p");
        newP1.innerText = `Timings: ${element.start_time} - ${element.end_time}`;
        newDiv.appendChild(newP1);

        const newP3 = document.createElement("p");
        newP3.innerText = `Date: ${element.date}`;
        newDiv.appendChild(newP3);

        const newP2 = document.createElement("p");
        newP2.innerText = `Center: ${element.address}`;
        newDiv.appendChild(newP2);

        const newbut = document.createElement("button");
        newbut.classList.add("cancel");
        newbut.innerText = "Cancel Skill";
        // Add the class ID as a data attribute to the button
        newbut.setAttribute("data-id", element.class_id);

        // Add the onclick event to the cancel button
        newbut.onclick = async () => {
            let ans = confirm("Are you sure you want to cancel this class?");
            if (ans) {
                // Get the class ID from the button's data-id attribute
                const classId = newbut.dataset.id;

                // delete from backend 
                const response = await fetch(`/participant/${classId}`, { method: 'DELETE' }); // Assuming skill_name is unique for identification
                const result = await response.json();
                if (response.ok) {
                    // Remove the class from the DOM
                    container.removeChild(newDiv);
                } else {
                    console.log("unsuccessful");
                }
            }
        };
        newDiv.appendChild(newbut);

        container.appendChild(newDiv);

    });
};

// function to get enrolled classes 
async function getSkill() {

    const response = await fetch(`http://localhost:2000/participant/`);
    if (!response.ok) {
        console.error("Can't find classes");
        return [];
    }
    const data = await response.json();
    console.log(data)
    if (!data.classes) {
        return [];
    }

    return data.classes;
}
