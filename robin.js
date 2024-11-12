let user = {}


function validateUser (form) {
    let regexName = /^[a-zA-Z]+$/;
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let errorString = "";

    // build error string
    if (!regexName.test(form.firstname.value)) {
        errorString += "First name must only contain letters. "
    }
    if (!regexName.test(form.lastname.value)) {
        errorString += "Last name must only contain letters. "
    }
    if (!regexMail.test(form.email.value)) {
        errorString += "You must enter a valid e-mail address. "
    }

    // continue to quiz or add error to html.
    if (regexName.test(form.firstname.value) && regexName.test(form.lastname.value) && regexMail.test(form.email.value)) {
        user.firstname = form.firstname.value;
        user.lastname = form.lastname.value;
        user.email = form.email.value;
        console.log(user)

        const boxElement = document.getElementById("box");
        boxElement.innerHTML = '';
        const userElement = document.createElement("div");
        userElement.innerHTML = "<p> Best of luck" + user.firstname + " " + user.lastname + " (" + user.email + ")</p>"
        boxElement.appendChild(userElement);


    } else {
        // find error div and clear it
        const errorElement = document.getElementById("error");
        errorElement.innerHTML = '';
        
        // create p tag and add error string
        const p = document.createElement("p");
        p.appendChild(document.createTextNode(errorString))
        errorElement.appendChild(p);
    }

}