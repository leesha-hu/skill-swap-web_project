let b1 = document.getElementById("bt1");
let d1 = document.getElementById("sh1");
b1.onclick = () => d1.style.display = 'flex';
d1.onclick = (event) => {
    if (event.target === d1) d1.style.display = 'none';
};

// Modals for Name, Phone, Address, Password
const openModal = (btnId, modalId) => {
    let btn = document.getElementById(btnId);
    let modal = document.getElementById(modalId);
    btn.onclick = () => modal.style.display = 'flex';
    modal.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };
};

openModal("name", "name1");
openModal("phone", "phone1");
openModal("address", "addr1");
openModal("pass", "pass1");

async function loadProfile() {
    const response = await fetch('/getUser/profile');
    if (!response.ok) {
        console.log('error getting details');
    } else {
        const profile = await response.json();
        const user = profile.details;

        const name = document.getElementById('user_name');
        const phone = document.getElementById('user_phone');
        const email = document.getElementById('user_email');
        const address = document.getElementById('user_address');

        name.innerText = `Name: ${user.name}`;
        phone.innerText = `Phone: ${user.phone}`;
        email.innerText = `Email: ${user.email}`;
        address.innerText = `Address: ${user.address}`;
    }
}

const message = document.getElementById("Message");
message.addEventListener('click', (event) => {
    if (message.style.display == 'block') {
        message.style.display = 'none';
    }
})

const nameForm = document.getElementById('nameForm');
nameForm.addEventListener("submit", async (event) => {
    event.preventDefault();



    const name = document.querySelector('input[name="inputName"]');
    const formData = new FormData(nameForm);
    const data = Object.fromEntries(formData.entries());
    if (!name) {
        console.log("Enter name");
    } else {
        try {

            const response = await fetch(nameForm.action, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('update successful');
                name1.style.display = 'none';

                loadProfile();
                message.textContent = 'Name successfully updated';
                message.classList.add('success');
                message.style.display = 'block';

            } else {
                console.log('update unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    }
})

const phoneForm = document.getElementById('phoneForm');
phoneForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const phone = document.querySelector('input[name="inputPhone"]');
    const formData = new FormData(phoneForm);
    const data = Object.fromEntries(formData.entries());
    if (!phone) {
        console.log("Enter name");
    } else {
        try {

            const response = await fetch(phoneForm.action, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('update successful');
                phone1.style.display = 'none';

                loadProfile();
                message.textContent = 'Phone number successfully updated';
                message.classList.add('success');
                message.style.display = 'block';

            } else {
                console.log('update unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    }
})

window.onload = loadProfile
