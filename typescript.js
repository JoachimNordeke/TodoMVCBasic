(function () {
    var form = document.querySelector("main form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var text = document.querySelector(".todo-entry input[type='text']").value;
        if (text !== "") {
            var li = document.querySelector("#template");
            var newLi_1 = li.cloneNode(true);
            newLi_1.style.display = "flex";
            var newText = newLi_1.querySelector("li input[type='text']");
            newText.value = text;
            var list_1 = document.querySelector(".todo-list ul");
            list_1.appendChild(newLi_1);
            var removeButton_1 = newLi_1.querySelector("button");
            removeButton_1.addEventListener("click", function () {
                list_1.removeChild(newLi_1);
            });
            removeButton_1.addEventListener("mousedown", function () {
                removeButton_1.style.outline = "none";
            });
        }
        var textbox = document.querySelector(".todo-entry input[type='text']");
        textbox.value = "";
    });
    /* The code add click event for each link */
    var filterLinks = [].slice.call(document.querySelectorAll(".todo-action a"));
    var _loop_1 = function (link) {
        link.addEventListener("click", function () {
            /* every time a new link is clicked, the code make sure than no other links get the style*/
            for (var _i = 0, filterLinks_2 = filterLinks; _i < filterLinks_2.length; _i++) {
                var link2 = filterLinks_2[_i];
                if (link === link2) {
                    link.className = "selected-link";
                }
                else {
                    link2.className = "";
                }
            }
        });
    };
    for (var _i = 0, filterLinks_1 = filterLinks; _i < filterLinks_1.length; _i++) {
        var link = filterLinks_1[_i];
        _loop_1(link);
    }
})();
