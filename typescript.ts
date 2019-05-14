(function () {
    let form: Element = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let text: string = (<HTMLInputElement>document.querySelector(".todo-entry input[type='text']")).value;
        if (text !== "") {
            const li: HTMLLIElement = document.querySelector("#template");
            const newLi: HTMLLIElement = <HTMLLIElement>li.cloneNode(true);
            newLi.style.display = "flex";
            let newText: HTMLInputElement = newLi.querySelector("li input[type='text']");
            newText.value = text;
            const list: HTMLUListElement = document.querySelector(".todo-list ul");
            list.appendChild(newLi);

            let removeButton: HTMLButtonElement = newLi.querySelector("button");
            removeButton.addEventListener("click", () => {
                list.removeChild(newLi);
            });
            removeButton.addEventListener("mousedown", () => {
                removeButton.style.outline = "none";
            });
        }
        let textbox: HTMLInputElement = document.querySelector(".todo-entry input[type='text']");
        textbox.value = "";
    })

    /* The code add click event for each link */
    let filterLinks: HTMLAnchorElement[] = [].slice.call(document.querySelectorAll<HTMLAnchorElement>(".todo-action a"));
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

