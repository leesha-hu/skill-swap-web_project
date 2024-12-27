window.onload = async function () {
    const user_name = document.getElementById("user_name");
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


    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('category');
    const header = document.getElementById("h1");
    header.innerHTML = `See your selected classes from all categories`;

    // const categories = ["lifestyle", "business", "technical", "sports", "art", "music", "dance", "drama"];
    // const container = document.getElementsByClassName("tolearn")[0];

    // const allClasses = await Promise.all(categories.map(category => getSkill(category)));

    const allClasses = await getSkill();
    const container = document.getElementById('tolearn');

    allClasses.forEach((element, index) => {

        // const categoryTitle = document.createElement('h1');
        // categoryTitle.innerText = `${categories[index]} Classes:`;
        // container.appendChild(categoryTitle);


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
        newbut.innerText = "Cancel Skill"; // Optional: set button text
        // Add the onclick event to the cancel button
        newbut.onclick = async () => {
            let ans = confirm("Are you sure you want to cancel this class?");
            if (ans) {
                // Remove the class from the DOM
                container.removeChild(newDiv);

                // Optionally, delete from backend (send DELETE request)
                await deleteClass(element.skill_name); // Assuming skill_name is unique for identification
            }
        };
        newDiv.appendChild(newbut);

        container.appendChild(newDiv);




    });
};

async function getSkill() {
    const uidResponse = await fetch('/getUser/uid');
    if (!uidResponse.ok) {
        console.error('not logged in');
        return [];
    }
    const uid = await uidResponse.json();
    const userId = uid.userId;

    const response = await fetch(`http://localhost:2000/participant/${userId}`);
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
