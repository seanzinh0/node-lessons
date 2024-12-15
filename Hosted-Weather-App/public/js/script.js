//select elements from the index page
const form = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");


//add event listener for when form is submitted to change the search query
//use location from the text input and checks what radio button is checked
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    const units = document.querySelector('input[name="units"]:checked').value;
    message1.textContent = "Loading...";
    message2.textContent = "";
    fetch(`/weather?address=${location}&units=${units}`).then(response => response.json().then((data) => {
        if(data.error) {
            message1.textContent = data.error;
        } else {
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    }))
})