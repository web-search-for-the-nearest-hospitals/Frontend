import {
  __commonJS
} from "./chunk-UXIASGQL.js";

// node_modules/arity-n/0.js
var require__ = __commonJS({
  "node_modules/arity-n/0.js"(exports, module) {
    module.exports = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/1.js
var require__2 = __commonJS({
  "node_modules/arity-n/1.js"(exports, module) {
    module.exports = function(fn) {
      return function(a) {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/2.js
var require__3 = __commonJS({
  "node_modules/arity-n/2.js"(exports, module) {
    module.exports = function(fn) {
      return function(a, b) {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/3.js
var require__4 = __commonJS({
  "node_modules/arity-n/3.js"(exports, module) {
    module.exports = function(fn) {
      return function(a, b, c) {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/4.js
var require__5 = __commonJS({
  "node_modules/arity-n/4.js"(exports, module) {
    module.exports = function(fn) {
      return function(a, b, c, d) {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/5.js
var require__6 = __commonJS({
  "node_modules/arity-n/5.js"(exports, module) {
    module.exports = function(fn) {
      return function(a, b, c, d, e) {
        return fn.apply(null, arguments);
      };
    };
  }
});

// node_modules/arity-n/N.js
var require_N = __commonJS({
  "node_modules/arity-n/N.js"(exports, module) {
    var arityFn = [
      require__(),
      require__2(),
      require__3(),
      require__4(),
      require__5(),
      require__6()
    ];
    module.exports = function(fn, n) {
      if (n && n <= 5) {
        return arityFn[n](fn);
      } else {
        return fn;
      }
    };
  }
});

// node_modules/compose-function/index.js
var require_compose_function = __commonJS({
  "node_modules/compose-function/index.js"(exports, module) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = compose;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _arityN = require_N();
    var _arityN2 = _interopRequireDefault(_arityN);
    var compose2 = function compose22(f, g) {
      return function() {
        return f(g.apply(void 0, arguments));
      };
    };
    function compose() {
      for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
        functions[_key] = arguments[_key];
      }
      var funcs = functions.filter(function(fn) {
        return typeof fn === "function";
      });
      var lastIdx = funcs.length - 1;
      var arity = 0;
      if (funcs.length <= 0) {
        throw new Error("No funcs passed");
      }
      if (lastIdx >= 0 && funcs[lastIdx]) {
        arity = funcs[lastIdx].length;
      }
      return (0, _arityN2["default"])(funcs.reduce(compose2), arity);
    }
    module.exports = exports["default"];
  }
});
export default require_compose_function();
//# sourceMappingURL=compose-function.js.map
