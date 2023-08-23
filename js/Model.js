"use strict";

const Model = {
  storage: null,
  dataKey: "data_key",
  currentId: 1,

  // will get data from storage
  getData() {
    return JSON.parse(this.storage.getItem(this.dataKey)) || [];
  },

  // will get data by id from storage
  getDataById(id) {
    return this.getData().find((item) => {
      return item.id === id;
    });
  },

  // will save data to storage
  postData(data) {
    const savedData = this.getData();
    const dataToSave = { ...data, id: this.currentId };
    savedData.push(dataToSave);
    this.storage.setItem(this.dataKey, JSON.stringify(savedData));
    const savedItem = this.getDataById(this.currentId);
    this.currentId += 1;
    return savedItem;
  },

  removeData(id) {
    const savedData = this.getData();
    const updatedData = savedData.filter((item) => item.id !== id);
    this.storage.setItem(this.dataKey, JSON.stringify(updatedData));
  },

  init(storage, dataKey) {
    this.storage = storage;

    if (typeof dataKey === "string") {
      this.dataKey = dataKey;
    }

    const savedData = this.getData();
    if (!savedData.length) return;
    this.currentId = savedData.at(-1).id + 1;
  },
};
