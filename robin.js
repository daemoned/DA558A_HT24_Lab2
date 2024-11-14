let user = {}

function checkQuiz(formInput) {
    let form = new FormData(formInput);
    let questions = JSON.parse(data);
    let result = 0;

    // checks if all required questions are answeared.
    questions.forEach((e, index) => {
        if (e.required === true) {
            result++;
            let answear = form.get((index+1).toString());
            if (answear != null) {
                result--;
            }
        }
    })
    
    const errorElement = document.getElementById("error");
    const btnElement = document.getElementById("btn");

    if (result === 0) {
        errorElement.innerHTML = "<div id='error'></div>";
        btnElement.value = "Turn in Quiz";
        btnElement.setAttribute("onclick","turnInQuiz(this.form)");
    } else {
        errorElement.innerHTML = "<div id='error'>You must answear all bold italic questions.</div>";
    }
   
}

function turnInQuiz(formInput) {
    let form = new FormData(formInput);
    let questions = JSON.parse(data);

    questions.forEach((e, index) => {
        //check if multiple answears
        if (Array.isArray(e.correct)) {
            let answear = form.getAll((index+1).toString());

            // sort arrays and turn into strings for matching
            if (answear.sort().join() == e.correct.sort().join()) {
                console.log("Question " + (index+1).toString() + " is correct! " + answear + " = " + e.correct)
            } else {
                console.log("Question " + (index+1).toString() + " is wrong! " + answear + " = " + e.correct)
            }

        } else {
            let answear = form.get((index+1).toString());
            if (answear === e.correct) {
                console.log("Question " + (index+1).toString() + " is correct! " + answear + " = " + e.correct)
            } else {
                console.log("Question " + (index+1).toString() + " is wrong! " + answear + " = " + e.correct)
            }
        }
    })

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
    formElement.innerHTML += "<div id='error'></div>"
    formElement.innerHTML += "<input id='btn' type='button' value='Check Quiz' onclick='checkQuiz(this.form)'>"
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

        const boxElement = document.getElementById("box");
        boxElement.innerHTML = '';
        const userElement = document.createElement("div");
        userElement.innerHTML = "<p> Best of luck " + user.firstname + " " + user.lastname + " (" + user.email + "). <b><i>Bold italic</b></i> questions must be answered.</p>"
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