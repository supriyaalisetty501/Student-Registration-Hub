
// TOAST MESSAGE
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}

// POPUP MESSAGE
function showPopup(msg) {
    const popup = document.getElementById("popup");
    popup.innerText = msg;
    popup.classList.remove("hidden");

    setTimeout(() => {
        popup.classList.add("hidden");
    }, 2500);
}


// LOGIN FUNCTION
function login() {

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    if (!email || !pass) {
        showToast("Enter email & password");
        return;
    }

    if (email === "admin@gmail.com" && pass === "1234") {

        showToast("Login Successful 🎉");

        setTimeout(() => {
            document.getElementById("loginPage").classList.add("hidden");
            document.getElementById("formPage").classList.remove("hidden");
        }, 800);

    } else {
        showToast("Invalid Login ❌");
    }
}


// STUDENT SUBMIT FUNCTION (ALL VALIDATIONS INSIDE)
async function submitStudent() {

    const name = document.getElementById("name").value;
    const age = Number(document.getElementById("age").value);
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("course").value;
    const branch = document.getElementById("branch").value;

    // VALIDATIONS
    if (!name || !email || !phone || !course || !branch) {
        showPopup("❌ Please fill all required fields");
        return;
    }

    if (age <= 0 || age > 100 || isNaN(age)) {
        showPopup("❌ Age must be between 1 and 100");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        showPopup("❌ Phone must be 10 digits");
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        showPopup("❌ Email must be @gmail.com");
        return;
    }

    // SEND DATA TO SERVER
    const student = {
        name,
        age,
        email,
        phone,
        course,
        branch,
        address: document.getElementById("address").value
    };

    const res = await fetch("/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });

    const data = await res.json();

    if (data.success) {

        showToast("Saved Successfully 🎉");

        document.getElementById("formPage").classList.add("hidden");
        document.getElementById("success").classList.remove("hidden");
    }
}
