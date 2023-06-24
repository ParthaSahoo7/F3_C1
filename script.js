// Check if the access token exists in local storage
function checkAccessToken() {
    return localStorage.getItem("accessToken");
}

// Toggle the visibility of the signup and profile sections
function toggleSections() {
    const signupPage = document.getElementById("signup-page");
    const profilePage = document.getElementById("profile-page");

    if (checkAccessToken()) {
        signupPage.style.display = "none";
        profilePage.style.display = "block";
        displayProfileDetails();
    } else {
        signupPage.style.display = "block";
        profilePage.style.display = "none";
    }
}

// Save user state and access token in local storage
function saveUserState(user) {
    const accessToken = generateAccessToken();
    user.accessToken = accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
}

// Generate a random access token
function generateAccessToken() {
    const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 16;
    let accessToken = "";
    for (let i = 0; i < tokenLength; i++) {
        accessToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return accessToken;
}

// Get the user state from local storage
function getUserState() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

// Clear the user state and access token from local storage
function clearUserState() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}

// Display the user details on the profile page
function displayProfileDetails() {
    const profileFullname = document.getElementById("profile-fullname");
    const profileEmail = document.getElementById("profile-email");
    const profilePassword = document.getElementById("profile-password");
    const user = getUserState();

    if (user) {
        profileFullname.textContent = user.fullname;
        profileEmail.textContent = user.email;
        profilePassword.textContent = user.password;
    }
}

// Signup button event listener
document.getElementById("signup-button").addEventListener("click", function () {
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorElement = document.getElementById("signup-error");
    const successElement = document.getElementById("signup-success");

  // Check if all fields are filled
    if (fullname && email && password && confirmPassword) {
        // Check if the password and confirm password match
        if (password === confirmPassword) {
            const user = {
                fullname,
                email,
                password,
            };
            saveUserState(user);
            successElement.textContent = "Successfully Signed Up!";
            errorElement.textContent = "";

      // Toggle sections after a short delay
        setTimeout(function () {
            toggleSections();
        }, 2000);
        } 
        else {
            errorElement.textContent = "Password and confirm password do not match.";
            successElement.textContent = "";
        }
    } 
    else {
        errorElement.textContent = "ERROR: All the fields are mandatory";
        successElement.textContent = "";
    }
});

// Logout button event listener
document.getElementById("logout-button").addEventListener("click", function () {
    clearUserState();
    toggleSections();
});

// Check the access token on page load
window.addEventListener("load", function () {
    toggleSections();
});