const fs = require("fs");
const loaderUtils = require("loader-utils");
const validateOptions = require("schema-utils");

function loader(source) {
  this.cacheable(false);
  const options = loaderUtils.getOptions(this);
  const cb = this.async();
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
    }
  };
  validateOptions(schema, options, 'banner-loader');
  if (options.filename) {
    this.addDependency(options.filename);
    fs.readFile(options.filename, 'utf8', (err, data) => {
      cb(err, `/** \n${data}\n*/\n${source}`);
    });
  } else {
    cb(null, `/** \n${options.text}\n*/\n${source}`);
  }

}

module.exports = loader;
