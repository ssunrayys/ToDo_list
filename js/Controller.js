"use strict";

const Controller = {
  form: null,
  todoContainer: null,

  initListeners() {
    this.form.addEventListener("submit", this.formHandler.bind(this));
    window.addEventListener("DOMContentLoaded", this.prerenderTodos.bind(this));
    document
      .querySelector("[data-todo-items]")
      .addEventListener("click", this.removeTodoHandler.bind(this));
  },

  removeTodoHandler(event) {
    if (!event.target.classList.contains("taskRemove")) return;
    const todoEl = event.target.closest("div[data-id]");
    const id = Number(todoEl.dataset.id);
    Model.removeData(id);
    todoEl.remove();
  },

  formHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    const data = {};
    this.form
      .querySelectorAll("input, textarea, select")
      .forEach(({ name, value }) => {
        data[name] = value;
      });
    const savedTodoItem = Model.postData(data);
    View.renderItem(savedTodoItem);
  },

  prerenderTodos() {
    const savedData = Model.getData();
    savedData.forEach((item) => View.renderItem(item));
  },

  init(formSelector, blockSelector) {
    if (typeof formSelector !== "string")
      throw new Error("Form selector should be a string");
    const form = document.querySelector(formSelector);
    if (!(form instanceof HTMLElement))
      throw new Error("Form not valid HTML element");

    if (typeof blockSelector !== "string")
      throw new Error("Block selector should be a string");
    const block = document.querySelector(blockSelector);
    if (!(block instanceof HTMLElement))
      throw new Error("Block not valid HTML element");

    this.form = form;
    this.todoContainer = block;
    View.setContainer(block);

    this.initListeners();
  },
};
