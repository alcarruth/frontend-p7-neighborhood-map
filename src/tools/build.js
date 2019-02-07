// Generated by CoffeeScript 1.10.0

/*
 * source: build
 */


/*
 *  ISC License (ISC)
 *  Copyright (c) 2016, Al Carruth <al.carruth@gmail.com>
 * 
 *  Permission to use, copy, modify, and/or distribute this software for
 *  any purpose with or without fee is hereby granted, provided that the
 *  above copyright notice and this permission notice appear in all
 *  copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
 *  WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
 *  AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
 *  CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 *  OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
 *  NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 *  CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

(function() {
  var Neighborhood_Map_App, app, bn, fs,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  fs = require('fs-extra');

  bn = require('build-nodes');

  Neighborhood_Map_App = (function() {
    function Neighborhood_Map_App() {
      this.make = bind(this.make, this);
      this.serve = bind(this.serve, this);
      this.clean = bind(this.clean, this);
      this.style = new bn.StyleSheet('style', 'css');
      this.menu_icon = new bn.SVG('hamburger_icon', 'images');
      this.search_icon = new bn.SVG('search_icon', 'images');
      this.knockout = new bn.JavaScriptLib('knockout-3.3.0', 'js');
      this.jsonp = new bn.JavaScript('jsonp', 'js');
      this.google_maps_api = new bn.JavaScript('google_maps_api', 'js');
      this.wikipedia_api = new bn.JavaScript('wikipedia_api', 'js');
      this.austin_places = new bn.JavaScript('austin_places', 'js');
      this.neighborhood_map = new bn.JavaScript('neighborhood_map', 'js');
      this.index_template = new bn.HTML_Template('index', 'templates');
      this.index_js = new bn.HTML_Page('index', this.index_template, {
        styles: [this.style.css.ref()],
        client_libs: [this.knockout.js.ref()],
        client_scripts: [this.jsonp.js.ref(), this.wikipedia_api.js.ref(), this.google_maps_api.js.ref(), this.austin_places.js.ref(), this.neighborhood_map.js.ref()],
        menu_icon: [this.menu_icon.svg.inline()],
        search_icon: [this.search_icon.svg.inline()]
      });
      this.index_inline = new bn.HTML_Page('index_inline', this.index_template, {
        styles: [this.style.css.ref()],
        client_libs: [this.knockout.js.ref()],
        client_scripts: [this.jsonp.js.inline(), this.wikipedia_api.js.inline(), this.google_maps_api.js.inline(), this.austin_places.js.inline(), this.neighborhood_map.js.inline()],
        menu_icon: [this.menu_icon.svg.inline()],
        search_icon: [this.search_icon.svg.inline()]
      });
      this.index_min = new bn.HTML_Minified_Page('index_min', this.index_template, {
        styles: [this.style.css_min.inline()],
        client_libs: [this.knockout.js.ref()],
        client_scripts: [this.jsonp.js_min.inline(), this.wikipedia_api.js_min.inline(), this.google_maps_api.js.inline(), this.austin_places.js_min.inline(), this.neighborhood_map.js_min.inline()],
        menu_icon: [this.menu_icon.svg.inline()],
        search_icon: [this.search_icon.svg.inline()]
      });
    }

    Neighborhood_Map_App.prototype.clean = function(dest) {
      if (dest == null) {
        dest = 'dist';
      }
      fs.removeSync(dest);
      fs.mkdirsSync(dest + '/js');
      fs.mkdirsSync(dest + '/css');
      return fs.mkdirsSync(dest + '/images');
    };

    Neighborhood_Map_App.prototype.serve = function(dir, port) {
      var connect, serveStatic;
      if (dir == null) {
        dir = 'dist';
      }
      if (port == null) {
        port = '8087';
      }
      connect = require('connect');
      serveStatic = require('serve-static');
      return connect().use(serveStatic(dir)).listen(port, function() {
        return console.log('Server running on ' + String(port) + '...');
      });
    };

    Neighborhood_Map_App.prototype.make = function(dest) {
      var i, len, start, task, tasks;
      if (dest == null) {
        dest = 'dist';
      }
      fs.copySync('src/images/favicon.ico', dest + '/images/favicon.ico');
      tasks = [this.jsonp, this.wikipedia_api, this.google_maps_api, this.austin_places, this.neighborhood_map, this.knockout, this.style, this.menu_icon, this.search_icon, this.index_js, this.index_inline, this.index_min];
      start = Date.now();
      for (i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        task.make('dist');
      }
      return console.log('\nBuild done in ' + String(Date.now() - start) + ' milliseconds.');
    };

    return Neighborhood_Map_App;

  })();

  app = new Neighborhood_Map_App();

  module.exports = {
    app: app
  };

  if (!module.parent) {
    app.clean();
    app.make();
  }

}).call(this);
