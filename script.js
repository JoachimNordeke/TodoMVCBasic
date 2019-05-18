(function () {

    let selectoinMode = "all";
    let selectAll = document.querySelector("#checkAll");
    selectAll.addEventListener("change", () => {
        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        if (selectAll.checked) {
            for (let item of items) {
                item.querySelector("input[type='checkbox'").checked = true;
                item.querySelector("span").innerText = "✓";
                let todoText = item.querySelector(".todo-text");
                todoText.id = "todo-text-checked";
            }
        }
        else if (selectAll.checked == false) {
            for (let item of items) {
                item.querySelector("input[type='checkbox'").checked = false;
                item.querySelector("span").innerText = "";
                let todoText = item.querySelector(".todo-text");
                todoText.id = "todo-text";
            }
        }

        ShowItemsLeft();
        ToggelCompletedButton();
        ToggelDisplay();

    });

    let form = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        /* give the all link selected style from begening */
        let allActionLink = document.querySelector("#all");
        allActionLink.classList.add("selected-link");

        let text = document.querySelector(".todo-entry input[type='text']").value;
        if (text !== "") {
            let selectAllLabel = document.querySelector(".todo-entry label")
            selectAllLabel.style.visibility = "visible";
            let todoActionHub = document.querySelector(".todo-action");
            todoActionHub.style.display = "block";
            const li = document.querySelector("#template");

            const newLi = li.cloneNode(true);
            newLi.style.display = "flex";
            newLi.id = "real";

            let input = newLi.querySelector("input[type='text']");
            input.value = text;
            input.style.display = "none";

            let todoText = newLi.querySelector("#todo-text");
            todoText.textContent = input.value;
            todoText.addEventListener("dblclick", () => {
                todoText.style.display = "none";
                input.style.display = "block";
                input.focus();
                removeButton.style.display = "none";
                let checboxLable = newLi.querySelector(".checkbox-label");
                checboxLable.style.visibility = "hidden";
            });

            input.addEventListener('keypress', function (e) {
                var key = e.keyCode;
                if (key === 13) {
                    todoText.style.display = "block";
                    input.style.display = "none";
                    removeButton.style.display = "block";
                    let checboxLable = newLi.querySelector(".checkbox-label");
                    checboxLable.style.visibility = "visible";
                    todoText.textContent = input.value;
                }
            });

            input.addEventListener('focus', function () {
                window.addEventListener("click", () => {
                    {
                        todoText.style.display = "block";
                        input.style.display = "none";
                        removeButton.style.display = "block";
                        let checboxLable = newLi.querySelector(".checkbox-label");
                        checboxLable.style.visibility = "visible";
                        todoText.textContent = input.value;
                    }});
            });


            const list = document.querySelector(".todo-list ul");
            list.appendChild(newLi);

            let removeButton = newLi.querySelector("button");
            removeButton.addEventListener("click", () => {
                list.removeChild(newLi);
                ShowItemsLeft();
                ToggelCompletedButton();
                ToggelActionHub();

            });
            removeButton.addEventListener("mousedown", () => {
                removeButton.style.outline = "none";
            });

            ShowItemsLeft();
            /* show how many items left */
            let checkbox = newLi.querySelector(".todo-check");
            let span = newLi.querySelector("span");

            /* add event to the checkboxes created with the new Li*/
            checkbox.addEventListener("change", () => {
                checkbox.parentNode.className = "checkboxchecked-label";
                span.innerText = "✓";
                todoText.id = "todo-text-checked";
                ToggelCompletedButton();
                ToggelDisplay();

                let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox']");
                let itemsLeft = document.querySelector("#left"); /* items left label text */
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
                    else if (checkboxes.length - checked === 1) {
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
                    else if (checkboxes.length - checked === 1) {
                        itemsLeft.textContent = "1 item left";
                        selectAll.checked = false;
                    }
                    else {
                        selectAll.checked = false;
                        itemsLeft.innerText = (checkboxes.length - checked) + " items left";
                    }

                    checkbox.parentNode.className = "checkbox-label";
                    span.innerText = "";
                    todoText.id = "todo-text";

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



    function ShowItemsLeft() {
        /* Get all checboxex that shows in the UI */
        let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox']");
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
        else if (checkboxes.length - checked === 1) {
            itemsLeft.textContent = "1 item left";

        }
        else {
            itemsLeft.textContent = (checkboxes.length - checked) + " items left";
        }
    }


    const allAction = document.querySelector("#all");
    allAction.addEventListener("click", () => {
        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        items.forEach(todo => {
            todo.style.display = "flex";

        });

        selectoinMode = "all";
    });

    const activeAction = document.querySelector("#active");
    activeAction.addEventListener("click", () => {
        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        items.forEach(todo => {
            let checkbox = todo.querySelector("input[type='checkbox']");

            if (!checkbox.checked) {
                todo.style.display = "flex";
            }
            else {
                todo.style.display = "none";
            }
        });

        selectoinMode = "active";
    });

    const completedAction = document.querySelector("#completed");
    completedAction.addEventListener("click", () => {
        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        items.forEach(todo => {
            let checkbox = todo.querySelector("input[type='checkbox']");

            if (checkbox.checked) {
                todo.style.display = "flex";
            }
            else {
                todo.style.display = "none";
            }
        });

        selectoinMode = "completed";

    });

    let completedButton = document.querySelector(".todo-action button");

    completedButton.addEventListener("mousedown", () => {
        completedButton.style.outline = "none";

    });

    completedButton.addEventListener("click", () => {
        let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        items.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            if (checkbox.checked) {
                item.remove();
            }
            ToggelActionHub();
        })
    })

    function ToggelCompletedButton() {
        let completedButton = document.querySelector(".todo-action button");
        let checkboxes = document.querySelectorAll(".todo-list li[id='real'] input[type='checkbox']");

        let countChecked = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                countChecked++;
            }
        })

        if (countChecked !== 0) {
            completedButton.style.visibility = "visible";
        }
        else {
            completedButton.style.visibility = "hidden";

        }

    }

    function ToggelActionHub() {
        let selectAllLabel = document.querySelector(".todo-entry label")
        let todoActionHub = document.querySelector(".todo-action");
        const items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
        if (items.length === 0) {
            todoActionHub.style.display = "none";
            selectAllLabel.style.visibility = "hidden";
        }
    }

    function ToggelDisplay() {
        if (selectoinMode === "active") {
            let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
            items.forEach(todo => {
                let checkbox = todo.querySelector("input[type='checkbox']");

                if (!checkbox.checked) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
            });
        }
        else if (selectoinMode === "completed") {
            let items = Array.from(document.querySelectorAll(".todo-list li[id='real']"));
            items.forEach(todo => {
                let checkbox = todo.querySelector("input[type='checkbox']");

                if (checkbox.checked) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
            });
        }
    }


})()

