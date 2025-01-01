const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get('classId');
const name = urlParams.get('skillName');

const insName=document.getElementById('insertName');

async function insertName() {
    const responseName = await fetch('/getUser');
    const resultName = await responseName.json();

    if (responseName.ok) {
        insName.innerText = resultName.userName;
    }
}

window.onload = async function () {
    insertName();

    const a = document.getElementById("h1");
    a.innerHTML = ` See your ${name} tution students `;

    const arr = await getParticipants();
    console.log(arr);
    const con = document.getElementsByClassName("tolearn")[0];
    if (arr != undefined) {
        if (arr.length > 0) {
            arr.forEach(element => {
                const newd1 = document.createElement('div');
                newd1.classList.add("sub");
                const newh1 = document.createElement("h2");
                newh1.innerText = element.name;
                newd1.appendChild(newh1);
                const newp1 = document.createElement("p");
                newp1.innerText = `Address : ${element.address}`;
                newd1.appendChild(newp1);
                con.appendChild(newd1);
            });

        }
        else {
            const pa = document.getElementById("list");
            pa.innerText = 'You do not have any students attending your class';
        }
    }

};

function getParticipants() {
    const fe1 = fetch(`http://localhost:2000/participant/class/${classId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("cant find please try again");
            }

            return response.json();
        }).then(data => {
            console.log(data)
            return data.participants;
        })
    return fe1;
}