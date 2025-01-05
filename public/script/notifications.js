
fetch("/getUser")
        .then(response => {
            if (!response.ok) {
                throw new Error("Not logged in");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('user-name').innerText = data.userName;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("welcome-message").innerText = "Welcome, Guest!";
        });



document.addEventListener("DOMContentLoaded", function () {
    async function gets() {
        let arr = await getnotify();
        console.log(arr)
        const teachNotify=arr.teach;
        const learnNotify=arr.learn;
        const container = document.getElementById('ma');

        if(teachNotify.length>0){
            teachNotify.forEach(element => {
                const not = document.createElement("div");
                not.classList.add('notify');
                not.innerText = `You need to teach ${element.skill_name} class at ${element.start_time} till ${element.end_time}`;
                container.appendChild(not);
            });

        }

        if(learnNotify.length>0){
            learnNotify.forEach(element => {
                const not = document.createElement("div");
                not.classList.add('notify');
                not.innerText = `You need to go to ${element.address} for a ${element.skill_name} class from ${element.start_time} to ${element.end_time}`;
                container.appendChild(not);
            });

        }
    }

    async function getnotify() {
        const response = await fetch(`http://localhost:2000/notifications`);
        if (!response.ok) {
            console.error("Couldn't fetch user notifications");
            return [];
        }
        const data = await response.json();
        return data;
    }

    gets();
});