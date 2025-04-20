const EventEmitter = require("events");
const http = require("http");
const url = require("url");
const Router = require("./Router");

class Framework {
  constructor() {
    this.server = this._createServer();
    this.middlewares = [];
    this.routes = [];
    this._router = new Router();
  }

  listen(port, callback) {
    this.addRouter(this._router);
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  get(path, handler) {
    this._router.get(path, handler);
  }

  post(path, handler) {
    this._router.post(path, handler);
  }

  put(path, handler) {
    this._router.put(path, handler);
  }

  patch(path, handler) {
    this._router.patch(path, handler);
  }

  delete(path, handler) {
    this._router.delete(path, handler);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        const paramNames = [];
        const regexPath = path.replace(/:([^/]+)/g, (_, key) => {
          paramNames.push(key);
          return "([^/]+)";
        });
        const regexp = new RegExp(`^${regexPath}$`);

        this.routes.push({ method, regexp, handler, paramNames });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          if (body) {
            try {
              req.body = JSON.parse(body);
            } catch (e) {
              req.body = body;
            }
          } else {
            req.body = {};
          }

          const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
          req.query = Object.fromEntries(parsedUrl.searchParams);

          res.send = (data) => {
            res.writeHead(res.statusCode || 200, { "Content-Type": "text/plain" });
            res.end(data);
          };

          res.json = (data) => {
            res.writeHead(res.statusCode || 200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
          };

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };

          this._runMiddlewares(req, res, () => {
            const matchedRoute = this.routes.find((route) => {
              return (
                route.method === req.method &&
                route.regexp.test(parsedUrl.pathname)
              );
            });

            if (matchedRoute) {
              const match = parsedUrl.pathname.match(matchedRoute.regexp);
              const params = {};
              matchedRoute.paramNames.forEach((name, index) => {
                params[name] = match[index + 1];
              });
              req.params = params;
              matchedRoute.handler(req, res);
            } else {
              res.statusCode = 404;
              res.end("Not Found");
            }
          });
        } catch (e) {
          res.statusCode = 500;
          res.end(`Internal Server Error: ${e.message}`);
        }
      });
    });
  }

  _runMiddlewares(req, res, finalHandler) {
    const stack = this.middlewares.slice();

    const next = () => {
      if (stack.length === 0) {
        return finalHandler();
      }
      const middleware = stack.shift();
      middleware(req, res, next);
    };

    next();
  }
}

module.exports = Framework;
