const { readData, writeData } = require('../db/db');

function getAll() {
  return readData('customers');
}

function getById(id) {
  return getAll().find(c => c.id === id);
}

function create(data) {
  const items = getAll();
  const newItem = { id: String(Date.now()), ...data };
  items.push(newItem);
  writeData('customers', items);
  return newItem;
}

function update(id, data) {
  const items = getAll().map(c => c.id === id ? { id, ...data } : c);
  writeData('customers', items);
  return getById(id);
}

function patch(id, partial) {
  const items = getAll().map(c =>
    c.id === id ? { ...c, ...partial } : c
  );
  writeData('customers', items);
  return getById(id);
}

function remove(id) {
  const items = getAll().filter(c => c.id !== id);
  writeData('customers', items);
}

module.exports = { getAll, getById, create, update, patch, remove };
