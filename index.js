// core
var fs = require('fs')
var path = require('path')

// npm
var xtend = require('xtend')
var handlebars = require('handlebars')

// --------------------------------------------------------------------------------------------------------------------

var defaults = {
  type: 'proxy',
  confDir: '/etc/nginx/sites-enabled',
  logDir: '/var/log/nginx',
}

var dir = path.join(__dirname, 'vhosts')
var types = {
  proxy: {
    template: fs.readFileSync(path.join(dir, 'proxy'), { encoding: 'utf8' }),
    defaults: {
      host: 'localhost',
      // port - should be specified
    },
  },
  mainproxy: {
    template: fs.readFileSync(path.join(dir, 'mainProxy'), { encoding: 'utf8' }),
    defaults: {
      host: 'localhost',
      // port - should be specified
    },
  },
  proxyEs: {
    template: fs.readFileSync(path.join(dir, 'proxyEs'), { encoding: 'utf8' }),
    defaults: {
      host: 'localhost',
      // port - should be specified
    },
  },
}

function generator(domain, name, type, opts, callback) {
  opts = xtend({}, defaults, types[type].defaults, opts)

  // set the domain, name and type last
  opts.domain = domain
  opts.name = name
  opts.type = type

  // let's read the config template we want, then return the config
  var source = types[opts.type].template
  var template = handlebars.compile(source)

  return template(opts)
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = generator

// --------------------------------------------------------------------------------------------------------------------
