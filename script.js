(function () {

    let selectAll = document.querySelector("#checkAll");

    selectAll.addEventListener("change", () => {

        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        if (selectAll.checked) {
            for (let item of items) {
                item.querySelector("input[type='checkbox'").checked = true;
                item.querySelector("span").innerText = "✓";
                let todoText = item.querySelector("input[type='text']");
                todoText.style.color = "#D9D9D9";
                todoText.style.textDecoration = "line-through";
            }
        }
        else if (selectAll.checked == false) {
            for (let item of items) {
                item.querySelector("input[type='checkbox'").checked = false;
                item.querySelector("span").innerText = "";
                let todoText = item.querySelector("input[type='text']");
                todoText.style.color = "#545454";
                todoText.style.textDecoration = "inherit";
            }
        }

        /* Get all checboxex that shows in the UI */
        let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox'");
        let itemsLeft = document.querySelector("#left"); /* items left label text */
        let checked = 0;
        /* get how many checked */
        for (const box of checkboxes) {
            if (box.checked) {
                checked++;
            }
        }

        if (checked === checkboxes.length) {
            itemsLeft.textContent = "0 items left";
        }
        else if(checkboxes.length - checked === 1){
            itemsLeft.textContent = "1 item left";

        }
        else {
            itemsLeft.textContent = (checkboxes.length - checked) + " items left";
        }
    });

    let form = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let text = document.querySelector(".todo-entry input[type='text']").value;
        if (text !== "") {
            let todoEntryLabel = document.querySelector(".todo-entry label").style.visibility = "visible";
            let todoActionHub = document.querySelector(".todo-action").style.display = "block";
            const li = document.querySelector("#template");
            const newLi = li.cloneNode(true);
            newLi.style.display = "flex";
            newLi.id = "real";
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

            /* show how many items left */
            let checkbox = newLi.querySelector(".todo-check");
            let span = newLi.querySelector("span");
            let todoText = newLi.querySelector("input[type='text']");

            let itemsLeft = document.querySelector("#left");
            let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox'");
            let checked = 0;           
            for (const box of checkboxes) {
                if (box.checked) {
                    checked++;
                }
            }
            if (checked === checkboxes.length) {
                itemsLeft.textContent = "0 items left";
            }
            else if(checkboxes.length - checked === 1){
                itemsLeft.textContent = "1 item left";
    
            }
            else {
                itemsLeft.textContent = (checkboxes.length - checked) + " items left";
            }

            /* add event to the checkboxes created with the new Li*/
            checkbox.addEventListener("change", () => {
                let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox'");
                checkbox.parentNode.className = "checkboxchecked-label";
                span.innerText = "✓";
                todoText.style.color = "#D9D9D9";
                todoText.style.textDecoration = "line-through";

                if (checkbox.checked) {
                    let checked = 0;
                    for (const box of checkboxes) {
                        if (box.checked) {
                            checked++;
                        }
                    }

                    if (checked === checkboxes.length) {
                        selectAll.checked = true;
                        itemsLeft.innerText = "0 items left";
                    }
                    else if(checkboxes.length - checked === 1){
                        itemsLeft.textContent = "1 item left";
                        selectAll.checked = false;                        
                    }
                    else {
                        selectAll.checked = false;
                        itemsLeft.innerText = (checkboxes.length - checked) + " items left";

                    }

                }
                else if (!checkbox.checked) {

                    let checked = 0;
                    for (const box of checkboxes) {
                        if (box.checked) {
                            checked++;
                        }
                    }

                    if (checked === checkboxes.length) {
                        selectAll.checked = true;
                        itemsLeft.innerText = "0 items left";
                    }
                    else if(checkboxes.length - checked === 1){
                        itemsLeft.textContent = "1 item left";
                        selectAll.checked = false;                        
                    }
                    else {
                        selectAll.checked = false;
                        itemsLeft.innerText = (checkboxes.length - checked) + " items left";
                    }

                    checkbox.parentNode.className = "checkbox-label";
                    span.innerText = "";
                    todoText.style.color = "#545454";
                    todoText.style.textDecoration = "inherit";
                }
            })
        }

        /* clears the entry area after submiting */
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

