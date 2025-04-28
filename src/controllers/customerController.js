const service = require('../services/customerService');

async function getAll(req, res) {
  res.json(service.getAll());
}

async function getById(req, res) {
  const item = service.getById(req.params.id);
  if (!item) return res.status(404).send('Не найдено');
  res.json(item);
}

async function create(req, res) {
  const newItem = service.create(req.body);
  res.status(201).json(newItem);
}

async function update(req, res) {
  const updated = service.update(req.params.id, req.body);
  res.json(updated);
}

async function patch(req, res) {
  const patched = service.patch(req.params.id, req.body);
  res.json(patched);
}

async function remove(req, res) {
  service.remove(req.params.id);
  res.send('Удалено');
}

module.exports = { getAll, getById, create, update, patch, remove };
