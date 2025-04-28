module.exports = function(req, res, next) {

    res.json = data => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };
    res.send = data => {
      if (typeof data === 'object') return res.json(data);
      res.end(data);
    };
    res.status = code => {
      res.statusCode = code;
      return res;
    };
  
    let buf = '';
    req.on('data', chunk => buf += chunk);
    req.on('end', () => {
      if (buf) {
        try { req.body = JSON.parse(buf); }
        catch (e) { req.body = {}; }
      }
      next();
    });
  };
  