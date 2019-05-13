(function () {
    let todo = [];
    let done = [];

    let form = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let text = document.querySelector(".todo-entry input[type='text']").value;
        if (text !== "") {
            const li = document.querySelector("#template");
            const newLi = li.cloneNode(true);
            newLi.style.display = "flex";
            let newText = newLi.querySelector("li input[type='text']");
            newText.value = text;
            const list = document.querySelector(".todo-list ul");
            list.appendChild(newLi);

            let removeButton = newLi.querySelector("button");
            removeButton.addEventListener("click", () => {
                list.removeChild(newLi);
            });
        }
        let textbox = document.querySelector(".todo-entry input[type='text']");
        textbox.value = "";
    })

    /* The code add click event for each link */
    let filterLinks = document.querySelectorAll(".todo-action a");
    for (const link of filterLinks) {
        link.addEventListener("click", () =>
        {
            /* every time a new link is clicked, the code make sure than no other links get the style*/
            for (const link2 of filterLinks) {
                if (link === link2){
                    link.className = "selected-link";
                }
                else {
                    link2.className = "";
                }
            }
        })
    }
  
})()

