let user = {}

function checkQuiz(form) {
    console.log(form);
}

function buildQuiz() {
    const questions = JSON.parse(data);
    const boxElement = document.getElementById("box");
    const formElement = document.createElement("form");
    questions.forEach((e, index) => {
        let div = document.createElement("div");
        if (e.required) {
            div.innerHTML = "<b>" + (index +1) + ". <i>" + e.question + "</i></b></br>";
        } else {
            div.innerHTML = "<b>" + (index +1) + ". </b>" + e.question + "</br>";
        }
        
        // multiple choice, one answear
        if (!Array.isArray(e.correct) && e.answears != null) {
            console.log(e)
            console.log(Array.isArray(e.correct))
            e.answears.forEach(a => {
                div.innerHTML += "<li><input type='radio' name='" + (index+1) + "' value='" + a + "'> " + a + "</li>"
            })
        }
        // multiple choice, multiple answears
        else if (Array.isArray(e.correct) && e.answears != null) {
            e.answears.forEach(a => {
                div.innerHTML += "<li><input type='checkbox' name='" + (index+1) + "' value='" + a + "'> " + a + "</li>"
            })
        }
        // text entry
        else {
            div.innerHTML += "<li> <input type='text' name='" + (index+1) + "'> " + "</li>"
        }
        div.innerHTML += "<br><br>"
        formElement.appendChild(div);
    });
    formElement.innerHTML += "<input type='button' value='Check Quiz' onclick='checkQuiz(this.form)'>"
    boxElement.appendChild(formElement);

}

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
        userElement.innerHTML = "<p> Best of luck" + user.firstname + " " + user.lastname + " (" + user.email + "). <b><i>Bold italic</b></i> questions must be answered.</p>"
        boxElement.appendChild(userElement);
        buildQuiz();

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