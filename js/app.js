"use strict";

(function () {
  function customCreateTemplate({ title, description, id }) {
    const template = document.createElement("div");
    template.className = "col-6";
    template.setAttribute("data-id", id);

    template.innerHTML = `
                        <div class="task">
                            <span class="taskRemove">x</span>
                            <div class="task__heading">${title} <sub><b>${id}</sub></b></div>
                            <div class="task__description">${description}</div>
                            <hr>
                            <i>By Anna Bondar</i>
                        </div>`;

    return template;
  }

  View.init(customCreateTemplate);
  Model.init(localStorage, "todo-list-data");
  Controller.init("#todoForm", "[data-todo-items]");
})();
