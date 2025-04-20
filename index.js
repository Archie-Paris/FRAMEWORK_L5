const Framework = require("./framework/Application.js");
const Router = require("./framework/Router.js");

const server = new Framework();
const port = 5173;

server.listen(port, () => console.log(`Server started on port ${port}`));

const userRouter = new Router();

userRouter.get("/users", (req, res) => {
  res.end(JSON.stringify({ id: 1, name: "Evheniy", age: 21 }));
});

userRouter.post("/users", (req, res) => {
  res.status(201).json({ message: "Пользователь создан", data: req.body });
});

userRouter.put("/users", (req, res) => {
  res.json({ message: "Данные обновлены", data: req.body });
});

userRouter.patch("/users", (req, res) => {
  res.json({ message: "Данные частично обновлены", data: req.body });
});

userRouter.delete("/users", (req, res) => {
  res.send("Пользователь удалён");
});


server.addRouter(userRouter);
