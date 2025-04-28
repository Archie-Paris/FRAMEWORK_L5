const { readData, writeData } = require('../db/db');

function getAll() {
  return readData('medications');
}

function getById(id) {
  return getAll().find(m => m.id === id);
}

function create(data) {
  const items = getAll();
  const newItem = { id: String(Date.now()), ...data };
  items.push(newItem);
  writeData('medications', items);
  return newItem;
}

function update(id, data) {
  const items = getAll().map(m => m.id === id ? { id, ...data } : m);
  writeData('medications', items);
  return getById(id);
}

function patch(id, partial) {
  const items = getAll().map(m =>
    m.id === id ? { ...m, ...partial } : m
  );
  writeData('medications', items);
  return getById(id);
}

function remove(id) {
  const items = getAll().filter(m => m.id !== id);
  writeData('medications', items);
}

module.exports = { getAll, getById, create, update, patch, remove };
