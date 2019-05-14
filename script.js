(function () {

    let selectAll = document.querySelector("#checkAll");
    selectAll.addEventListener("change", () => {
        let todoCheckboxes = Array.from(document.querySelectorAll(".todo-list li input[type='checkbox']"));
        if (selectAll.checked)
        {
            for (let box of todoCheckboxes) {
                box.checked = true;
                
            }
        }
        else if (selectAll.checked == false)
        {
            for (let box of todoCheckboxes) {
                box.checked = false;
            }
        }
    });

    let form = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let text = document.querySelector(".todo-entry input[type='text']").value;
        if (text !== "") {
            const li = document.querySelector("#template");
            const newLi = li.cloneNode(true);
            newLi.style.display = "flex";
            newLi.id = "";
            let newText = newLi.querySelector("li input[type='text']");
            newText.value = text;
            const list = document.querySelector(".todo-list ul");
            list.appendChild(newLi);

            let removeButton = newLi.querySelector("button");
            removeButton.addEventListener("click", () => {
                list.removeChild(newLi);
            });
            removeButton.addEventListener("mousedown", () => {
                removeButton.style.outline = "none";
            });

            let checkbox = newLi.querySelector(".todo-check");
            let span = newLi.querySelector("span");

            checkbox.addEventListener("change", () => {
                
                let todoText = newLi.querySelector("input[type='text']");

                if (checkbox.checked) {

                    checkbox.parentNode.className = "checkboxchecked-label";
                    span.innerText = "✓";
                    todoText.style.color = "#D9D9D9";
                    todoText.style.textDecoration = "line-through";
                                        
                }
                else {
                    
                    checkbox.parentNode.className = "checkbox-label";
                    span.innerText = "";
                    todoText.style.color = "#545454";
                    todoText.style.textDecoration = "inherit";
                }
            })
        }
        let textbox = document.querySelector(".todo-entry input[type='text']");
        textbox.value = "";
    })

    /* The code add click event for each link */
    let filterLinks = document.querySelectorAll(".todo-action a");
    for (const link of filterLinks) {
        link.addEventListener("click", () => {
            /* every time a new link is clicked, the code make sure than no other links get the style*/
            for (const link2 of filterLinks) {
                if (link === link2) {
                    link.className = "selected-link";
                }
                else {
                    link2.className = "";
                }
            }
        })
    }

})()

