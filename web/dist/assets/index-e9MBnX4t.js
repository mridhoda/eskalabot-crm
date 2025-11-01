function jd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n]
    if (typeof r != 'string' && !Array.isArray(r)) {
      for (const l in r)
        if (l !== 'default' && !(l in e)) {
          const s = Object.getOwnPropertyDescriptor(r, l)
          s &&
            Object.defineProperty(
              e,
              l,
              s.get ? s : { enumerable: !0, get: () => r[l] }
            )
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' })
  )
}
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l)
  new MutationObserver((l) => {
    for (const s of l)
      if (s.type === 'childList')
        for (const i of s.addedNodes)
          i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(l) {
    const s = {}
    return (
      l.integrity && (s.integrity = l.integrity),
      l.referrerPolicy && (s.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    )
  }
  function r(l) {
    if (l.ep) return
    l.ep = !0
    const s = n(l)
    fetch(l.href, s)
  }
})()
function Nd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e
}
var Ru = { exports: {} },
  ql = {},
  Tu = { exports: {} },
  M = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Or = Symbol.for('react.element'),
  Pd = Symbol.for('react.portal'),
  _d = Symbol.for('react.fragment'),
  Rd = Symbol.for('react.strict_mode'),
  Td = Symbol.for('react.profiler'),
  Ld = Symbol.for('react.provider'),
  Od = Symbol.for('react.context'),
  Id = Symbol.for('react.forward_ref'),
  Ad = Symbol.for('react.suspense'),
  zd = Symbol.for('react.memo'),
  Fd = Symbol.for('react.lazy'),
  Yo = Symbol.iterator
function Dd(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (Yo && e[Yo]) || e['@@iterator']),
      typeof e == 'function' ? e : null)
}
var Lu = {
    isMounted: function () {
      return !1
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ou = Object.assign,
  Iu = {}
function Un(e, t, n) {
  ;((this.props = e),
    (this.context = t),
    (this.refs = Iu),
    (this.updater = n || Lu))
}
Un.prototype.isReactComponent = {}
Un.prototype.setState = function (e, t) {
  if (typeof e != 'object' && typeof e != 'function' && e != null)
    throw Error(
      'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
    )
  this.updater.enqueueSetState(this, e, t, 'setState')
}
Un.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, 'forceUpdate')
}
function Au() {}
Au.prototype = Un.prototype
function Yi(e, t, n) {
  ;((this.props = e),
    (this.context = t),
    (this.refs = Iu),
    (this.updater = n || Lu))
}
var Gi = (Yi.prototype = new Au())
Gi.constructor = Yi
Ou(Gi, Un.prototype)
Gi.isPureReactComponent = !0
var Go = Array.isArray,
  zu = Object.prototype.hasOwnProperty,
  Zi = { current: null },
  Fu = { key: !0, ref: !0, __self: !0, __source: !0 }
function Du(e, t, n) {
  var r,
    l = {},
    s = null,
    i = null
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (s = '' + t.key),
    t))
      zu.call(t, r) && !Fu.hasOwnProperty(r) && (l[r] = t[r])
  var o = arguments.length - 2
  if (o === 1) l.children = n
  else if (1 < o) {
    for (var u = Array(o), c = 0; c < o; c++) u[c] = arguments[c + 2]
    l.children = u
  }
  if (e && e.defaultProps)
    for (r in ((o = e.defaultProps), o)) l[r] === void 0 && (l[r] = o[r])
  return { $$typeof: Or, type: e, key: s, ref: i, props: l, _owner: Zi.current }
}
function Ud(e, t) {
  return {
    $$typeof: Or,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  }
}
function eo(e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Or
}
function Md(e) {
  var t = { '=': '=0', ':': '=2' }
  return (
    '$' +
    e.replace(/[=:]/g, function (n) {
      return t[n]
    })
  )
}
var Zo = /\/+/g
function xs(e, t) {
  return typeof e == 'object' && e !== null && e.key != null
    ? Md('' + e.key)
    : t.toString(36)
}
function ol(e, t, n, r, l) {
  var s = typeof e
  ;(s === 'undefined' || s === 'boolean') && (e = null)
  var i = !1
  if (e === null) i = !0
  else
    switch (s) {
      case 'string':
      case 'number':
        i = !0
        break
      case 'object':
        switch (e.$$typeof) {
          case Or:
          case Pd:
            i = !0
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === '' ? '.' + xs(i, 0) : r),
      Go(l)
        ? ((n = ''),
          e != null && (n = e.replace(Zo, '$&/') + '/'),
          ol(l, t, n, '', function (c) {
            return c
          }))
        : l != null &&
          (eo(l) &&
            (l = Ud(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ''
                  : ('' + l.key).replace(Zo, '$&/') + '/') +
                e
            )),
          t.push(l)),
      1
    )
  if (((i = 0), (r = r === '' ? '.' : r + ':'), Go(e)))
    for (var o = 0; o < e.length; o++) {
      s = e[o]
      var u = r + xs(s, o)
      i += ol(s, t, n, u, l)
    }
  else if (((u = Dd(e)), typeof u == 'function'))
    for (e = u.call(e), o = 0; !(s = e.next()).done; )
      ((s = s.value), (u = r + xs(s, o++)), (i += ol(s, t, n, u, l)))
  else if (s === 'object')
    throw (
      (t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (t === '[object Object]'
            ? 'object with keys {' + Object.keys(e).join(', ') + '}'
            : t) +
          '). If you meant to render a collection of children, use an array instead.'
      )
    )
  return i
}
function Hr(e, t, n) {
  if (e == null) return e
  var r = [],
    l = 0
  return (
    ol(e, r, '', '', function (s) {
      return t.call(n, s, l++)
    }),
    r
  )
}
function Bd(e) {
  if (e._status === -1) {
    var t = e._result
    ;((t = t()),
      t.then(
        function (n) {
          ;(e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n))
        },
        function (n) {
          ;(e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n))
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)))
  }
  if (e._status === 1) return e._result.default
  throw e._result
}
var Ee = { current: null },
  al = { transition: null },
  $d = {
    ReactCurrentDispatcher: Ee,
    ReactCurrentBatchConfig: al,
    ReactCurrentOwner: Zi,
  }
function Uu() {
  throw Error('act(...) is not supported in production builds of React.')
}
M.Children = {
  map: Hr,
  forEach: function (e, t, n) {
    Hr(
      e,
      function () {
        t.apply(this, arguments)
      },
      n
    )
  },
  count: function (e) {
    var t = 0
    return (
      Hr(e, function () {
        t++
      }),
      t
    )
  },
  toArray: function (e) {
    return (
      Hr(e, function (t) {
        return t
      }) || []
    )
  },
  only: function (e) {
    if (!eo(e))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      )
    return e
  },
}
M.Component = Un
M.Fragment = _d
M.Profiler = Td
M.PureComponent = Yi
M.StrictMode = Rd
M.Suspense = Ad
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $d
M.act = Uu
M.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      'React.cloneElement(...): The argument must be a React element, but you passed ' +
        e +
        '.'
    )
  var r = Ou({}, e.props),
    l = e.key,
    s = e.ref,
    i = e._owner
  if (t != null) {
    if (
      (t.ref !== void 0 && ((s = t.ref), (i = Zi.current)),
      t.key !== void 0 && (l = '' + t.key),
      e.type && e.type.defaultProps)
    )
      var o = e.type.defaultProps
    for (u in t)
      zu.call(t, u) &&
        !Fu.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && o !== void 0 ? o[u] : t[u])
  }
  var u = arguments.length - 2
  if (u === 1) r.children = n
  else if (1 < u) {
    o = Array(u)
    for (var c = 0; c < u; c++) o[c] = arguments[c + 2]
    r.children = o
  }
  return { $$typeof: Or, type: e.type, key: l, ref: s, props: r, _owner: i }
}
M.createContext = function (e) {
  return (
    (e = {
      $$typeof: Od,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Ld, _context: e }),
    (e.Consumer = e)
  )
}
M.createElement = Du
M.createFactory = function (e) {
  var t = Du.bind(null, e)
  return ((t.type = e), t)
}
M.createRef = function () {
  return { current: null }
}
M.forwardRef = function (e) {
  return { $$typeof: Id, render: e }
}
M.isValidElement = eo
M.lazy = function (e) {
  return { $$typeof: Fd, _payload: { _status: -1, _result: e }, _init: Bd }
}
M.memo = function (e, t) {
  return { $$typeof: zd, type: e, compare: t === void 0 ? null : t }
}
M.startTransition = function (e) {
  var t = al.transition
  al.transition = {}
  try {
    e()
  } finally {
    al.transition = t
  }
}
M.unstable_act = Uu
M.useCallback = function (e, t) {
  return Ee.current.useCallback(e, t)
}
M.useContext = function (e) {
  return Ee.current.useContext(e)
}
M.useDebugValue = function () {}
M.useDeferredValue = function (e) {
  return Ee.current.useDeferredValue(e)
}
M.useEffect = function (e, t) {
  return Ee.current.useEffect(e, t)
}
M.useId = function () {
  return Ee.current.useId()
}
M.useImperativeHandle = function (e, t, n) {
  return Ee.current.useImperativeHandle(e, t, n)
}
M.useInsertionEffect = function (e, t) {
  return Ee.current.useInsertionEffect(e, t)
}
M.useLayoutEffect = function (e, t) {
  return Ee.current.useLayoutEffect(e, t)
}
M.useMemo = function (e, t) {
  return Ee.current.useMemo(e, t)
}
M.useReducer = function (e, t, n) {
  return Ee.current.useReducer(e, t, n)
}
M.useRef = function (e) {
  return Ee.current.useRef(e)
}
M.useState = function (e) {
  return Ee.current.useState(e)
}
M.useSyncExternalStore = function (e, t, n) {
  return Ee.current.useSyncExternalStore(e, t, n)
}
M.useTransition = function () {
  return Ee.current.useTransition()
}
M.version = '18.3.1'
Tu.exports = M
var S = Tu.exports
const q = Nd(S),
  Wd = jd({ __proto__: null, default: q }, [S])
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hd = S,
  Vd = Symbol.for('react.element'),
  Kd = Symbol.for('react.fragment'),
  Qd = Object.prototype.hasOwnProperty,
  bd = Hd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Jd = { key: !0, ref: !0, __self: !0, __source: !0 }
function Mu(e, t, n) {
  var r,
    l = {},
    s = null,
    i = null
  ;(n !== void 0 && (s = '' + n),
    t.key !== void 0 && (s = '' + t.key),
    t.ref !== void 0 && (i = t.ref))
  for (r in t) Qd.call(t, r) && !Jd.hasOwnProperty(r) && (l[r] = t[r])
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r])
  return { $$typeof: Vd, type: e, key: s, ref: i, props: l, _owner: bd.current }
}
ql.Fragment = Kd
ql.jsx = Mu
ql.jsxs = Mu
Ru.exports = ql
var a = Ru.exports,
  Bu = { exports: {} },
  De = {},
  $u = { exports: {} },
  Wu = {}
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ ;(function (e) {
  function t(R, F) {
    var w = R.length
    R.push(F)
    e: for (; 0 < w; ) {
      var I = (w - 1) >>> 1,
        A = R[I]
      if (0 < l(A, F)) ((R[I] = F), (R[w] = A), (w = I))
      else break e
    }
  }
  function n(R) {
    return R.length === 0 ? null : R[0]
  }
  function r(R) {
    if (R.length === 0) return null
    var F = R[0],
      w = R.pop()
    if (w !== F) {
      R[0] = w
      e: for (var I = 0, A = R.length, se = A >>> 1; I < se; ) {
        var oe = 2 * (I + 1) - 1,
          tt = R[oe],
          Wt = oe + 1,
          Wr = R[Wt]
        if (0 > l(tt, w))
          Wt < A && 0 > l(Wr, tt)
            ? ((R[I] = Wr), (R[Wt] = w), (I = Wt))
            : ((R[I] = tt), (R[oe] = w), (I = oe))
        else if (Wt < A && 0 > l(Wr, w)) ((R[I] = Wr), (R[Wt] = w), (I = Wt))
        else break e
      }
    }
    return F
  }
  function l(R, F) {
    var w = R.sortIndex - F.sortIndex
    return w !== 0 ? w : R.id - F.id
  }
  if (typeof performance == 'object' && typeof performance.now == 'function') {
    var s = performance
    e.unstable_now = function () {
      return s.now()
    }
  } else {
    var i = Date,
      o = i.now()
    e.unstable_now = function () {
      return i.now() - o
    }
  }
  var u = [],
    c = [],
    f = 1,
    d = null,
    g = 3,
    k = !1,
    m = !1,
    y = !1,
    x = typeof setTimeout == 'function' ? setTimeout : null,
    h = typeof clearTimeout == 'function' ? clearTimeout : null,
    p = typeof setImmediate < 'u' ? setImmediate : null
  typeof navigator < 'u' &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling)
  function v(R) {
    for (var F = n(c); F !== null; ) {
      if (F.callback === null) r(c)
      else if (F.startTime <= R)
        (r(c), (F.sortIndex = F.expirationTime), t(u, F))
      else break
      F = n(c)
    }
  }
  function C(R) {
    if (((y = !1), v(R), !m))
      if (n(u) !== null) ((m = !0), b(j))
      else {
        var F = n(c)
        F !== null && et(C, F.startTime - R)
      }
  }
  function j(R, F) {
    ;((m = !1), y && ((y = !1), h(T), (T = -1)), (k = !0))
    var w = g
    try {
      for (
        v(F), d = n(u);
        d !== null && (!(d.expirationTime > F) || (R && !Q()));

      ) {
        var I = d.callback
        if (typeof I == 'function') {
          ;((d.callback = null), (g = d.priorityLevel))
          var A = I(d.expirationTime <= F)
          ;((F = e.unstable_now()),
            typeof A == 'function' ? (d.callback = A) : d === n(u) && r(u),
            v(F))
        } else r(u)
        d = n(u)
      }
      if (d !== null) var se = !0
      else {
        var oe = n(c)
        ;(oe !== null && et(C, oe.startTime - F), (se = !1))
      }
      return se
    } finally {
      ;((d = null), (g = w), (k = !1))
    }
  }
  var _ = !1,
    P = null,
    T = -1,
    U = 5,
    z = -1
  function Q() {
    return !(e.unstable_now() - z < U)
  }
  function te() {
    if (P !== null) {
      var R = e.unstable_now()
      z = R
      var F = !0
      try {
        F = P(!0, R)
      } finally {
        F ? ne() : ((_ = !1), (P = null))
      }
    } else _ = !1
  }
  var ne
  if (typeof p == 'function')
    ne = function () {
      p(te)
    }
  else if (typeof MessageChannel < 'u') {
    var L = new MessageChannel(),
      de = L.port2
    ;((L.port1.onmessage = te),
      (ne = function () {
        de.postMessage(null)
      }))
  } else
    ne = function () {
      x(te, 0)
    }
  function b(R) {
    ;((P = R), _ || ((_ = !0), ne()))
  }
  function et(R, F) {
    T = x(function () {
      R(e.unstable_now())
    }, F)
  }
  ;((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (R) {
      R.callback = null
    }),
    (e.unstable_continueExecution = function () {
      m || k || ((m = !0), b(j))
    }),
    (e.unstable_forceFrameRate = function (R) {
      0 > R || 125 < R
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (U = 0 < R ? Math.floor(1e3 / R) : 5)
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u)
    }),
    (e.unstable_next = function (R) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var F = 3
          break
        default:
          F = g
      }
      var w = g
      g = F
      try {
        return R()
      } finally {
        g = w
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (R, F) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break
        default:
          R = 3
      }
      var w = g
      g = R
      try {
        return F()
      } finally {
        g = w
      }
    }),
    (e.unstable_scheduleCallback = function (R, F, w) {
      var I = e.unstable_now()
      switch (
        (typeof w == 'object' && w !== null
          ? ((w = w.delay), (w = typeof w == 'number' && 0 < w ? I + w : I))
          : (w = I),
        R)
      ) {
        case 1:
          var A = -1
          break
        case 2:
          A = 250
          break
        case 5:
          A = 1073741823
          break
        case 4:
          A = 1e4
          break
        default:
          A = 5e3
      }
      return (
        (A = w + A),
        (R = {
          id: f++,
          callback: F,
          priorityLevel: R,
          startTime: w,
          expirationTime: A,
          sortIndex: -1,
        }),
        w > I
          ? ((R.sortIndex = w),
            t(c, R),
            n(u) === null &&
              R === n(c) &&
              (y ? (h(T), (T = -1)) : (y = !0), et(C, w - I)))
          : ((R.sortIndex = A), t(u, R), m || k || ((m = !0), b(j))),
        R
      )
    }),
    (e.unstable_shouldYield = Q),
    (e.unstable_wrapCallback = function (R) {
      var F = g
      return function () {
        var w = g
        g = F
        try {
          return R.apply(this, arguments)
        } finally {
          g = w
        }
      }
    }))
})(Wu)
$u.exports = Wu
var qd = $u.exports
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xd = S,
  Fe = qd
function N(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n])
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  )
}
var Hu = new Set(),
  pr = {}
function on(e, t) {
  ;(Rn(e, t), Rn(e + 'Capture', t))
}
function Rn(e, t) {
  for (pr[e] = t, e = 0; e < t.length; e++) Hu.add(t[e])
}
var pt = !(
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
  ),
  qs = Object.prototype.hasOwnProperty,
  Yd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ea = {},
  ta = {}
function Gd(e) {
  return qs.call(ta, e)
    ? !0
    : qs.call(ea, e)
      ? !1
      : Yd.test(e)
        ? (ta[e] = !0)
        : ((ea[e] = !0), !1)
}
function Zd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1
  switch (typeof t) {
    case 'function':
    case 'symbol':
      return !0
    case 'boolean':
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
    default:
      return !1
  }
}
function ep(e, t, n, r) {
  if (t === null || typeof t > 'u' || Zd(e, t, n, r)) return !0
  if (r) return !1
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t
      case 4:
        return t === !1
      case 5:
        return isNaN(t)
      case 6:
        return isNaN(t) || 1 > t
    }
  return !1
}
function je(e, t, n, r, l, s, i) {
  ;((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = s),
    (this.removeEmptyString = i))
}
var ge = {}
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    ge[e] = new je(e, 0, !1, e, null, !1, !1)
  })
;[
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv'],
].forEach(function (e) {
  var t = e[0]
  ge[t] = new je(t, 1, !1, e[1], null, !1, !1)
})
;['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
  ge[e] = new je(e, 2, !1, e.toLowerCase(), null, !1, !1)
})
;[
  'autoReverse',
  'externalResourcesRequired',
  'focusable',
  'preserveAlpha',
].forEach(function (e) {
  ge[e] = new je(e, 2, !1, e, null, !1, !1)
})
'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
  .split(' ')
  .forEach(function (e) {
    ge[e] = new je(e, 3, !1, e.toLowerCase(), null, !1, !1)
  })
;['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
  ge[e] = new je(e, 3, !0, e, null, !1, !1)
})
;['capture', 'download'].forEach(function (e) {
  ge[e] = new je(e, 4, !1, e, null, !1, !1)
})
;['cols', 'rows', 'size', 'span'].forEach(function (e) {
  ge[e] = new je(e, 6, !1, e, null, !1, !1)
})
;['rowSpan', 'start'].forEach(function (e) {
  ge[e] = new je(e, 5, !1, e.toLowerCase(), null, !1, !1)
})
var to = /[\-:]([a-z])/g
function no(e) {
  return e[1].toUpperCase()
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(to, no)
    ge[t] = new je(t, 1, !1, e, null, !1, !1)
  })
'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(to, no)
    ge[t] = new je(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
  })
;['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
  var t = e.replace(to, no)
  ge[t] = new je(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
})
;['tabIndex', 'crossOrigin'].forEach(function (e) {
  ge[e] = new je(e, 1, !1, e.toLowerCase(), null, !1, !1)
})
ge.xlinkHref = new je(
  'xlinkHref',
  1,
  !1,
  'xlink:href',
  'http://www.w3.org/1999/xlink',
  !0,
  !1
)
;['src', 'href', 'action', 'formAction'].forEach(function (e) {
  ge[e] = new je(e, 1, !1, e.toLowerCase(), null, !0, !0)
})
function ro(e, t, n, r) {
  var l = ge.hasOwnProperty(t) ? ge[t] : null
  ;(l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== 'o' && t[0] !== 'O') ||
      (t[1] !== 'n' && t[1] !== 'N')) &&
    (ep(t, n, l, r) && (n = null),
    r || l === null
      ? Gd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var vt = Xd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Vr = Symbol.for('react.element'),
  fn = Symbol.for('react.portal'),
  dn = Symbol.for('react.fragment'),
  lo = Symbol.for('react.strict_mode'),
  Xs = Symbol.for('react.profiler'),
  Vu = Symbol.for('react.provider'),
  Ku = Symbol.for('react.context'),
  so = Symbol.for('react.forward_ref'),
  Ys = Symbol.for('react.suspense'),
  Gs = Symbol.for('react.suspense_list'),
  io = Symbol.for('react.memo'),
  St = Symbol.for('react.lazy'),
  Qu = Symbol.for('react.offscreen'),
  na = Symbol.iterator
function Kn(e) {
  return e === null || typeof e != 'object'
    ? null
    : ((e = (na && e[na]) || e['@@iterator']),
      typeof e == 'function' ? e : null)
}
var Z = Object.assign,
  ws
function er(e) {
  if (ws === void 0)
    try {
      throw Error()
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/)
      ws = (t && t[1]) || ''
    }
  return (
    `
` +
    ws +
    e
  )
}
var Ss = !1
function ks(e, t) {
  if (!e || Ss) return ''
  Ss = !0
  var n = Error.prepareStackTrace
  Error.prepareStackTrace = void 0
  try {
    if (t)
      if (
        ((t = function () {
          throw Error()
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error()
          },
        }),
        typeof Reflect == 'object' && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, [])
        } catch (c) {
          var r = c
        }
        Reflect.construct(e, [], t)
      } else {
        try {
          t.call()
        } catch (c) {
          r = c
        }
        e.call(t.prototype)
      }
    else {
      try {
        throw Error()
      } catch (c) {
        r = c
      }
      e()
    }
  } catch (c) {
    if (c && r && typeof c.stack == 'string') {
      for (
        var l = c.stack.split(`
`),
          s = r.stack.split(`
`),
          i = l.length - 1,
          o = s.length - 1;
        1 <= i && 0 <= o && l[i] !== s[o];

      )
        o--
      for (; 1 <= i && 0 <= o; i--, o--)
        if (l[i] !== s[o]) {
          if (i !== 1 || o !== 1)
            do
              if ((i--, o--, 0 > o || l[i] !== s[o])) {
                var u =
                  `
` + l[i].replace(' at new ', ' at ')
                return (
                  e.displayName &&
                    u.includes('<anonymous>') &&
                    (u = u.replace('<anonymous>', e.displayName)),
                  u
                )
              }
            while (1 <= i && 0 <= o)
          break
        }
    }
  } finally {
    ;((Ss = !1), (Error.prepareStackTrace = n))
  }
  return (e = e ? e.displayName || e.name : '') ? er(e) : ''
}
function tp(e) {
  switch (e.tag) {
    case 5:
      return er(e.type)
    case 16:
      return er('Lazy')
    case 13:
      return er('Suspense')
    case 19:
      return er('SuspenseList')
    case 0:
    case 2:
    case 15:
      return ((e = ks(e.type, !1)), e)
    case 11:
      return ((e = ks(e.type.render, !1)), e)
    case 1:
      return ((e = ks(e.type, !0)), e)
    default:
      return ''
  }
}
function Zs(e) {
  if (e == null) return null
  if (typeof e == 'function') return e.displayName || e.name || null
  if (typeof e == 'string') return e
  switch (e) {
    case dn:
      return 'Fragment'
    case fn:
      return 'Portal'
    case Xs:
      return 'Profiler'
    case lo:
      return 'StrictMode'
    case Ys:
      return 'Suspense'
    case Gs:
      return 'SuspenseList'
  }
  if (typeof e == 'object')
    switch (e.$$typeof) {
      case Ku:
        return (e.displayName || 'Context') + '.Consumer'
      case Vu:
        return (e._context.displayName || 'Context') + '.Provider'
      case so:
        var t = e.render
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ''),
            (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
          e
        )
      case io:
        return (
          (t = e.displayName || null),
          t !== null ? t : Zs(e.type) || 'Memo'
        )
      case St:
        ;((t = e._payload), (e = e._init))
        try {
          return Zs(e(t))
        } catch {}
    }
  return null
}
function np(e) {
  var t = e.type
  switch (e.tag) {
    case 24:
      return 'Cache'
    case 9:
      return (t.displayName || 'Context') + '.Consumer'
    case 10:
      return (t._context.displayName || 'Context') + '.Provider'
    case 18:
      return 'DehydratedFragment'
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ''),
        t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      )
    case 7:
      return 'Fragment'
    case 5:
      return t
    case 4:
      return 'Portal'
    case 3:
      return 'Root'
    case 6:
      return 'Text'
    case 16:
      return Zs(t)
    case 8:
      return t === lo ? 'StrictMode' : 'Mode'
    case 22:
      return 'Offscreen'
    case 12:
      return 'Profiler'
    case 21:
      return 'Scope'
    case 13:
      return 'Suspense'
    case 19:
      return 'SuspenseList'
    case 25:
      return 'TracingMarker'
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == 'function') return t.displayName || t.name || null
      if (typeof t == 'string') return t
  }
  return null
}
function Dt(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
      return e
    case 'object':
      return e
    default:
      return ''
  }
}
function bu(e) {
  var t = e.type
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === 'input' &&
    (t === 'checkbox' || t === 'radio')
  )
}
function rp(e) {
  var t = bu(e) ? 'checked' : 'value',
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = '' + e[t]
  if (
    !e.hasOwnProperty(t) &&
    typeof n < 'u' &&
    typeof n.get == 'function' &&
    typeof n.set == 'function'
  ) {
    var l = n.get,
      s = n.set
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this)
        },
        set: function (i) {
          ;((r = '' + i), s.call(this, i))
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r
        },
        setValue: function (i) {
          r = '' + i
        },
        stopTracking: function () {
          ;((e._valueTracker = null), delete e[t])
        },
      }
    )
  }
}
function Kr(e) {
  e._valueTracker || (e._valueTracker = rp(e))
}
function Ju(e) {
  if (!e) return !1
  var t = e._valueTracker
  if (!t) return !0
  var n = t.getValue(),
    r = ''
  return (
    e && (r = bu(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  )
}
function kl(e) {
  if (((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u'))
    return null
  try {
    return e.activeElement || e.body
  } catch {
    return e.body
  }
}
function ei(e, t) {
  var n = t.checked
  return Z({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  })
}
function ra(e, t) {
  var n = t.defaultValue == null ? '' : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked
  ;((n = Dt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === 'checkbox' || t.type === 'radio'
          ? t.checked != null
          : t.value != null,
    }))
}
function qu(e, t) {
  ;((t = t.checked), t != null && ro(e, 'checked', t, !1))
}
function ti(e, t) {
  qu(e, t)
  var n = Dt(t.value),
    r = t.type
  if (n != null)
    r === 'number'
      ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n)
  else if (r === 'submit' || r === 'reset') {
    e.removeAttribute('value')
    return
  }
  ;(t.hasOwnProperty('value')
    ? ni(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && ni(e, t.type, Dt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked))
}
function la(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type
    if (
      !(
        (r !== 'submit' && r !== 'reset') ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return
    ;((t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t))
  }
  ;((n = e.name),
    n !== '' && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== '' && (e.name = n))
}
function ni(e, t, n) {
  ;(t !== 'number' || kl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
}
var tr = Array.isArray
function Cn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {}
    for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0))
  } else {
    for (n = '' + Dt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ;((e[l].selected = !0), r && (e[l].defaultSelected = !0))
        return
      }
      t !== null || e[l].disabled || (t = e[l])
    }
    t !== null && (t.selected = !0)
  }
}
function ri(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91))
  return Z({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  })
}
function sa(e, t) {
  var n = t.value
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92))
      if (tr(n)) {
        if (1 < n.length) throw Error(N(93))
        n = n[0]
      }
      t = n
    }
    ;(t == null && (t = ''), (n = t))
  }
  e._wrapperState = { initialValue: Dt(n) }
}
function Xu(e, t) {
  var n = Dt(t.value),
    r = Dt(t.defaultValue)
  ;(n != null &&
    ((n = '' + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = '' + r))
}
function ia(e) {
  var t = e.textContent
  t === e._wrapperState.initialValue && t !== '' && t !== null && (e.value = t)
}
function Yu(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg'
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML'
    default:
      return 'http://www.w3.org/1999/xhtml'
  }
}
function li(e, t) {
  return e == null || e === 'http://www.w3.org/1999/xhtml'
    ? Yu(t)
    : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e
}
var Qr,
  Gu = (function (e) {
    return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l)
          })
        }
      : e
  })(function (e, t) {
    if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
      e.innerHTML = t
    else {
      for (
        Qr = Qr || document.createElement('div'),
          Qr.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
          t = Qr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild)
      for (; t.firstChild; ) e.appendChild(t.firstChild)
    }
  })
function hr(e, t) {
  if (t) {
    var n = e.firstChild
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t
      return
    }
  }
  e.textContent = t
}
var lr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  lp = ['Webkit', 'ms', 'Moz', 'O']
Object.keys(lr).forEach(function (e) {
  lp.forEach(function (t) {
    ;((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (lr[t] = lr[e]))
  })
})
function Zu(e, t, n) {
  return t == null || typeof t == 'boolean' || t === ''
    ? ''
    : n || typeof t != 'number' || t === 0 || (lr.hasOwnProperty(e) && lr[e])
      ? ('' + t).trim()
      : t + 'px'
}
function ec(e, t) {
  e = e.style
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf('--') === 0,
        l = Zu(n, t[n], r)
      ;(n === 'float' && (n = 'cssFloat'), r ? e.setProperty(n, l) : (e[n] = l))
    }
}
var sp = Z(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
)
function si(e, t) {
  if (t) {
    if (sp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e))
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60))
      if (
        typeof t.dangerouslySetInnerHTML != 'object' ||
        !('__html' in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61))
    }
    if (t.style != null && typeof t.style != 'object') throw Error(N(62))
  }
}
function ii(e, t) {
  if (e.indexOf('-') === -1) return typeof t.is == 'string'
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1
    default:
      return !0
  }
}
var oi = null
function oo(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  )
}
var ai = null,
  En = null,
  jn = null
function oa(e) {
  if ((e = zr(e))) {
    if (typeof ai != 'function') throw Error(N(280))
    var t = e.stateNode
    t && ((t = es(t)), ai(e.stateNode, e.type, t))
  }
}
function tc(e) {
  En ? (jn ? jn.push(e) : (jn = [e])) : (En = e)
}
function nc() {
  if (En) {
    var e = En,
      t = jn
    if (((jn = En = null), oa(e), t)) for (e = 0; e < t.length; e++) oa(t[e])
  }
}
function rc(e, t) {
  return e(t)
}
function lc() {}
var Cs = !1
function sc(e, t, n) {
  if (Cs) return e(t, n)
  Cs = !0
  try {
    return rc(e, t, n)
  } finally {
    ;((Cs = !1), (En !== null || jn !== null) && (lc(), nc()))
  }
}
function mr(e, t) {
  var n = e.stateNode
  if (n === null) return null
  var r = es(n)
  if (r === null) return null
  n = r[t]
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      ;((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === 'button' ||
          e === 'input' ||
          e === 'select' ||
          e === 'textarea'
        ))),
        (e = !r))
      break e
    default:
      e = !1
  }
  if (e) return null
  if (n && typeof n != 'function') throw Error(N(231, t, typeof n))
  return n
}
var ui = !1
if (pt)
  try {
    var Qn = {}
    ;(Object.defineProperty(Qn, 'passive', {
      get: function () {
        ui = !0
      },
    }),
      window.addEventListener('test', Qn, Qn),
      window.removeEventListener('test', Qn, Qn))
  } catch {
    ui = !1
  }
function ip(e, t, n, r, l, s, i, o, u) {
  var c = Array.prototype.slice.call(arguments, 3)
  try {
    t.apply(n, c)
  } catch (f) {
    this.onError(f)
  }
}
var sr = !1,
  Cl = null,
  El = !1,
  ci = null,
  op = {
    onError: function (e) {
      ;((sr = !0), (Cl = e))
    },
  }
function ap(e, t, n, r, l, s, i, o, u) {
  ;((sr = !1), (Cl = null), ip.apply(op, arguments))
}
function up(e, t, n, r, l, s, i, o, u) {
  if ((ap.apply(this, arguments), sr)) {
    if (sr) {
      var c = Cl
      ;((sr = !1), (Cl = null))
    } else throw Error(N(198))
    El || ((El = !0), (ci = c))
  }
}
function an(e) {
  var t = e,
    n = e
  if (e.alternate) for (; t.return; ) t = t.return
  else {
    e = t
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return))
    while (e)
  }
  return t.tag === 3 ? n : null
}
function ic(e) {
  if (e.tag === 13) {
    var t = e.memoizedState
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated
  }
  return null
}
function aa(e) {
  if (an(e) !== e) throw Error(N(188))
}
function cp(e) {
  var t = e.alternate
  if (!t) {
    if (((t = an(e)), t === null)) throw Error(N(188))
    return t !== e ? null : e
  }
  for (var n = e, r = t; ; ) {
    var l = n.return
    if (l === null) break
    var s = l.alternate
    if (s === null) {
      if (((r = l.return), r !== null)) {
        n = r
        continue
      }
      break
    }
    if (l.child === s.child) {
      for (s = l.child; s; ) {
        if (s === n) return (aa(l), e)
        if (s === r) return (aa(l), t)
        s = s.sibling
      }
      throw Error(N(188))
    }
    if (n.return !== r.return) ((n = l), (r = s))
    else {
      for (var i = !1, o = l.child; o; ) {
        if (o === n) {
          ;((i = !0), (n = l), (r = s))
          break
        }
        if (o === r) {
          ;((i = !0), (r = l), (n = s))
          break
        }
        o = o.sibling
      }
      if (!i) {
        for (o = s.child; o; ) {
          if (o === n) {
            ;((i = !0), (n = s), (r = l))
            break
          }
          if (o === r) {
            ;((i = !0), (r = s), (n = l))
            break
          }
          o = o.sibling
        }
        if (!i) throw Error(N(189))
      }
    }
    if (n.alternate !== r) throw Error(N(190))
  }
  if (n.tag !== 3) throw Error(N(188))
  return n.stateNode.current === n ? e : t
}
function oc(e) {
  return ((e = cp(e)), e !== null ? ac(e) : null)
}
function ac(e) {
  if (e.tag === 5 || e.tag === 6) return e
  for (e = e.child; e !== null; ) {
    var t = ac(e)
    if (t !== null) return t
    e = e.sibling
  }
  return null
}
var uc = Fe.unstable_scheduleCallback,
  ua = Fe.unstable_cancelCallback,
  fp = Fe.unstable_shouldYield,
  dp = Fe.unstable_requestPaint,
  re = Fe.unstable_now,
  pp = Fe.unstable_getCurrentPriorityLevel,
  ao = Fe.unstable_ImmediatePriority,
  cc = Fe.unstable_UserBlockingPriority,
  jl = Fe.unstable_NormalPriority,
  hp = Fe.unstable_LowPriority,
  fc = Fe.unstable_IdlePriority,
  Xl = null,
  it = null
function mp(e) {
  if (it && typeof it.onCommitFiberRoot == 'function')
    try {
      it.onCommitFiberRoot(Xl, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var qe = Math.clz32 ? Math.clz32 : yp,
  gp = Math.log,
  vp = Math.LN2
function yp(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((gp(e) / vp) | 0)) | 0)
}
var br = 64,
  Jr = 4194304
function nr(e) {
  switch (e & -e) {
    case 1:
      return 1
    case 2:
      return 2
    case 4:
      return 4
    case 8:
      return 8
    case 16:
      return 16
    case 32:
      return 32
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424
    case 134217728:
      return 134217728
    case 268435456:
      return 268435456
    case 536870912:
      return 536870912
    case 1073741824:
      return 1073741824
    default:
      return e
  }
}
function Nl(e, t) {
  var n = e.pendingLanes
  if (n === 0) return 0
  var r = 0,
    l = e.suspendedLanes,
    s = e.pingedLanes,
    i = n & 268435455
  if (i !== 0) {
    var o = i & ~l
    o !== 0 ? (r = nr(o)) : ((s &= i), s !== 0 && (r = nr(s)))
  } else ((i = n & ~l), i !== 0 ? (r = nr(i)) : s !== 0 && (r = nr(s)))
  if (r === 0) return 0
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (s = t & -t), l >= s || (l === 16 && (s & 4194240) !== 0))
  )
    return t
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - qe(t)), (l = 1 << n), (r |= e[n]), (t &= ~l))
  return r
}
function xp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1
    default:
      return -1
  }
}
function wp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      s = e.pendingLanes;
    0 < s;

  ) {
    var i = 31 - qe(s),
      o = 1 << i,
      u = l[i]
    ;(u === -1
      ? (!(o & n) || o & r) && (l[i] = xp(o, t))
      : u <= t && (e.expiredLanes |= o),
      (s &= ~o))
  }
}
function fi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  )
}
function dc() {
  var e = br
  return ((br <<= 1), !(br & 4194240) && (br = 64), e)
}
function Es(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e)
  return t
}
function Ir(e, t, n) {
  ;((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - qe(t)),
    (e[t] = n))
}
function Sp(e, t) {
  var n = e.pendingLanes & ~t
  ;((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements))
  var r = e.eventTimes
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - qe(n),
      s = 1 << l
    ;((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~s))
  }
}
function uo(e, t) {
  var n = (e.entangledLanes |= t)
  for (e = e.entanglements; n; ) {
    var r = 31 - qe(n),
      l = 1 << r
    ;((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l))
  }
}
var W = 0
function pc(e) {
  return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1)
}
var hc,
  co,
  mc,
  gc,
  vc,
  di = !1,
  qr = [],
  _t = null,
  Rt = null,
  Tt = null,
  gr = new Map(),
  vr = new Map(),
  Ct = [],
  kp =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    )
function ca(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      _t = null
      break
    case 'dragenter':
    case 'dragleave':
      Rt = null
      break
    case 'mouseover':
    case 'mouseout':
      Tt = null
      break
    case 'pointerover':
    case 'pointerout':
      gr.delete(t.pointerId)
      break
    case 'gotpointercapture':
    case 'lostpointercapture':
      vr.delete(t.pointerId)
  }
}
function bn(e, t, n, r, l, s) {
  return e === null || e.nativeEvent !== s
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [l],
      }),
      t !== null && ((t = zr(t)), t !== null && co(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e)
}
function Cp(e, t, n, r, l) {
  switch (t) {
    case 'focusin':
      return ((_t = bn(_t, e, t, n, r, l)), !0)
    case 'dragenter':
      return ((Rt = bn(Rt, e, t, n, r, l)), !0)
    case 'mouseover':
      return ((Tt = bn(Tt, e, t, n, r, l)), !0)
    case 'pointerover':
      var s = l.pointerId
      return (gr.set(s, bn(gr.get(s) || null, e, t, n, r, l)), !0)
    case 'gotpointercapture':
      return (
        (s = l.pointerId),
        vr.set(s, bn(vr.get(s) || null, e, t, n, r, l)),
        !0
      )
  }
  return !1
}
function yc(e) {
  var t = Kt(e.target)
  if (t !== null) {
    var n = an(t)
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = ic(n)), t !== null)) {
          ;((e.blockedOn = t),
            vc(e.priority, function () {
              mc(n)
            }))
          return
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
        return
      }
    }
  }
  e.blockedOn = null
}
function ul(e) {
  if (e.blockedOn !== null) return !1
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = pi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
    if (n === null) {
      n = e.nativeEvent
      var r = new n.constructor(n.type, n)
      ;((oi = r), n.target.dispatchEvent(r), (oi = null))
    } else return ((t = zr(n)), t !== null && co(t), (e.blockedOn = n), !1)
    t.shift()
  }
  return !0
}
function fa(e, t, n) {
  ul(e) && n.delete(t)
}
function Ep() {
  ;((di = !1),
    _t !== null && ul(_t) && (_t = null),
    Rt !== null && ul(Rt) && (Rt = null),
    Tt !== null && ul(Tt) && (Tt = null),
    gr.forEach(fa),
    vr.forEach(fa))
}
function Jn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    di ||
      ((di = !0), Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority, Ep)))
}
function yr(e) {
  function t(l) {
    return Jn(l, e)
  }
  if (0 < qr.length) {
    Jn(qr[0], e)
    for (var n = 1; n < qr.length; n++) {
      var r = qr[n]
      r.blockedOn === e && (r.blockedOn = null)
    }
  }
  for (
    _t !== null && Jn(_t, e),
      Rt !== null && Jn(Rt, e),
      Tt !== null && Jn(Tt, e),
      gr.forEach(t),
      vr.forEach(t),
      n = 0;
    n < Ct.length;
    n++
  )
    ((r = Ct[n]), r.blockedOn === e && (r.blockedOn = null))
  for (; 0 < Ct.length && ((n = Ct[0]), n.blockedOn === null); )
    (yc(n), n.blockedOn === null && Ct.shift())
}
var Nn = vt.ReactCurrentBatchConfig,
  Pl = !0
function jp(e, t, n, r) {
  var l = W,
    s = Nn.transition
  Nn.transition = null
  try {
    ;((W = 1), fo(e, t, n, r))
  } finally {
    ;((W = l), (Nn.transition = s))
  }
}
function Np(e, t, n, r) {
  var l = W,
    s = Nn.transition
  Nn.transition = null
  try {
    ;((W = 4), fo(e, t, n, r))
  } finally {
    ;((W = l), (Nn.transition = s))
  }
}
function fo(e, t, n, r) {
  if (Pl) {
    var l = pi(e, t, n, r)
    if (l === null) (As(e, t, r, _l, n), ca(e, r))
    else if (Cp(l, e, t, n, r)) r.stopPropagation()
    else if ((ca(e, r), t & 4 && -1 < kp.indexOf(e))) {
      for (; l !== null; ) {
        var s = zr(l)
        if (
          (s !== null && hc(s),
          (s = pi(e, t, n, r)),
          s === null && As(e, t, r, _l, n),
          s === l)
        )
          break
        l = s
      }
      l !== null && r.stopPropagation()
    } else As(e, t, r, null, n)
  }
}
var _l = null
function pi(e, t, n, r) {
  if (((_l = null), (e = oo(r)), (e = Kt(e)), e !== null))
    if (((t = an(e)), t === null)) e = null
    else if (((n = t.tag), n === 13)) {
      if (((e = ic(t)), e !== null)) return e
      e = null
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null
      e = null
    } else t !== e && (e = null)
  return ((_l = e), null)
}
function xc(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4
    case 'message':
      switch (pp()) {
        case ao:
          return 1
        case cc:
          return 4
        case jl:
        case hp:
          return 16
        case fc:
          return 536870912
        default:
          return 16
      }
    default:
      return 16
  }
}
var jt = null,
  po = null,
  cl = null
function wc() {
  if (cl) return cl
  var e,
    t = po,
    n = t.length,
    r,
    l = 'value' in jt ? jt.value : jt.textContent,
    s = l.length
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e
  for (r = 1; r <= i && t[n - r] === l[s - r]; r++);
  return (cl = l.slice(e, 1 < r ? 1 - r : void 0))
}
function fl(e) {
  var t = e.keyCode
  return (
    'charCode' in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  )
}
function Xr() {
  return !0
}
function da() {
  return !1
}
function Ue(e) {
  function t(n, r, l, s, i) {
    ;((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = s),
      (this.target = i),
      (this.currentTarget = null))
    for (var o in e)
      e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(s) : s[o]))
    return (
      (this.isDefaultPrevented = (
        s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
      )
        ? Xr
        : da),
      (this.isPropagationStopped = da),
      this
    )
  }
  return (
    Z(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0
        var n = this.nativeEvent
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
          (this.isDefaultPrevented = Xr))
      },
      stopPropagation: function () {
        var n = this.nativeEvent
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
          (this.isPropagationStopped = Xr))
      },
      persist: function () {},
      isPersistent: Xr,
    }),
    t
  )
}
var Mn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ho = Ue(Mn),
  Ar = Z({}, Mn, { view: 0, detail: 0 }),
  Pp = Ue(Ar),
  js,
  Ns,
  qn,
  Yl = Z({}, Ar, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: mo,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== qn &&
            (qn && e.type === 'mousemove'
              ? ((js = e.screenX - qn.screenX), (Ns = e.screenY - qn.screenY))
              : (Ns = js = 0),
            (qn = e)),
          js)
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : Ns
    },
  }),
  pa = Ue(Yl),
  _p = Z({}, Yl, { dataTransfer: 0 }),
  Rp = Ue(_p),
  Tp = Z({}, Ar, { relatedTarget: 0 }),
  Ps = Ue(Tp),
  Lp = Z({}, Mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Op = Ue(Lp),
  Ip = Z({}, Mn, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData
    },
  }),
  Ap = Ue(Ip),
  zp = Z({}, Mn, { data: 0 }),
  ha = Ue(zp),
  Fp = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  Dp = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Up = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' }
function Mp(e) {
  var t = this.nativeEvent
  return t.getModifierState ? t.getModifierState(e) : (e = Up[e]) ? !!t[e] : !1
}
function mo() {
  return Mp
}
var Bp = Z({}, Ar, {
    key: function (e) {
      if (e.key) {
        var t = Fp[e.key] || e.key
        if (t !== 'Unidentified') return t
      }
      return e.type === 'keypress'
        ? ((e = fl(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
        : e.type === 'keydown' || e.type === 'keyup'
          ? Dp[e.keyCode] || 'Unidentified'
          : ''
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: mo,
    charCode: function (e) {
      return e.type === 'keypress' ? fl(e) : 0
    },
    keyCode: function (e) {
      return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
    },
    which: function (e) {
      return e.type === 'keypress'
        ? fl(e)
        : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0
    },
  }),
  $p = Ue(Bp),
  Wp = Z({}, Yl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ma = Ue(Wp),
  Hp = Z({}, Ar, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: mo,
  }),
  Vp = Ue(Hp),
  Kp = Z({}, Mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Qp = Ue(Kp),
  bp = Z({}, Yl, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Jp = Ue(bp),
  qp = [9, 13, 27, 32],
  go = pt && 'CompositionEvent' in window,
  ir = null
pt && 'documentMode' in document && (ir = document.documentMode)
var Xp = pt && 'TextEvent' in window && !ir,
  Sc = pt && (!go || (ir && 8 < ir && 11 >= ir)),
  ga = ' ',
  va = !1
function kc(e, t) {
  switch (e) {
    case 'keyup':
      return qp.indexOf(t.keyCode) !== -1
    case 'keydown':
      return t.keyCode !== 229
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0
    default:
      return !1
  }
}
function Cc(e) {
  return ((e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null)
}
var pn = !1
function Yp(e, t) {
  switch (e) {
    case 'compositionend':
      return Cc(t)
    case 'keypress':
      return t.which !== 32 ? null : ((va = !0), ga)
    case 'textInput':
      return ((e = t.data), e === ga && va ? null : e)
    default:
      return null
  }
}
function Gp(e, t) {
  if (pn)
    return e === 'compositionend' || (!go && kc(e, t))
      ? ((e = wc()), (cl = po = jt = null), (pn = !1), e)
      : null
  switch (e) {
    case 'paste':
      return null
    case 'keypress':
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char
        if (t.which) return String.fromCharCode(t.which)
      }
      return null
    case 'compositionend':
      return Sc && t.locale !== 'ko' ? null : t.data
    default:
      return null
  }
}
var Zp = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
}
function ya(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return t === 'input' ? !!Zp[e.type] : t === 'textarea'
}
function Ec(e, t, n, r) {
  ;(tc(r),
    (t = Rl(t, 'onChange')),
    0 < t.length &&
      ((n = new ho('onChange', 'change', null, n, r)),
      e.push({ event: n, listeners: t })))
}
var or = null,
  xr = null
function eh(e) {
  zc(e, 0)
}
function Gl(e) {
  var t = gn(e)
  if (Ju(t)) return e
}
function th(e, t) {
  if (e === 'change') return t
}
var jc = !1
if (pt) {
  var _s
  if (pt) {
    var Rs = 'oninput' in document
    if (!Rs) {
      var xa = document.createElement('div')
      ;(xa.setAttribute('oninput', 'return;'),
        (Rs = typeof xa.oninput == 'function'))
    }
    _s = Rs
  } else _s = !1
  jc = _s && (!document.documentMode || 9 < document.documentMode)
}
function wa() {
  or && (or.detachEvent('onpropertychange', Nc), (xr = or = null))
}
function Nc(e) {
  if (e.propertyName === 'value' && Gl(xr)) {
    var t = []
    ;(Ec(t, xr, e, oo(e)), sc(eh, t))
  }
}
function nh(e, t, n) {
  e === 'focusin'
    ? (wa(), (or = t), (xr = n), or.attachEvent('onpropertychange', Nc))
    : e === 'focusout' && wa()
}
function rh(e) {
  if (e === 'selectionchange' || e === 'keyup' || e === 'keydown') return Gl(xr)
}
function lh(e, t) {
  if (e === 'click') return Gl(t)
}
function sh(e, t) {
  if (e === 'input' || e === 'change') return Gl(t)
}
function ih(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
}
var Ye = typeof Object.is == 'function' ? Object.is : ih
function wr(e, t) {
  if (Ye(e, t)) return !0
  if (typeof e != 'object' || e === null || typeof t != 'object' || t === null)
    return !1
  var n = Object.keys(e),
    r = Object.keys(t)
  if (n.length !== r.length) return !1
  for (r = 0; r < n.length; r++) {
    var l = n[r]
    if (!qs.call(t, l) || !Ye(e[l], t[l])) return !1
  }
  return !0
}
function Sa(e) {
  for (; e && e.firstChild; ) e = e.firstChild
  return e
}
function ka(e, t) {
  var n = Sa(e)
  e = 0
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e }
      e = r
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling
          break e
        }
        n = n.parentNode
      }
      n = void 0
    }
    n = Sa(n)
  }
}
function Pc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? Pc(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1
}
function _c() {
  for (var e = window, t = kl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == 'string'
    } catch {
      n = !1
    }
    if (n) e = t.contentWindow
    else break
    t = kl(e.document)
  }
  return t
}
function vo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase()
  return (
    t &&
    ((t === 'input' &&
      (e.type === 'text' ||
        e.type === 'search' ||
        e.type === 'tel' ||
        e.type === 'url' ||
        e.type === 'password')) ||
      t === 'textarea' ||
      e.contentEditable === 'true')
  )
}
function oh(e) {
  var t = _c(),
    n = e.focusedElem,
    r = e.selectionRange
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Pc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && vo(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        'selectionStart' in n)
      )
        ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)))
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection()
        var l = n.textContent.length,
          s = Math.min(r.start, l)
        ;((r = r.end === void 0 ? s : Math.min(r.end, l)),
          !e.extend && s > r && ((l = r), (r = s), (s = l)),
          (l = ka(n, s)))
        var i = ka(n, r)
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          s > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)))
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
    for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top))
  }
}
var ah = pt && 'documentMode' in document && 11 >= document.documentMode,
  hn = null,
  hi = null,
  ar = null,
  mi = !1
function Ca(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
  mi ||
    hn == null ||
    hn !== kl(r) ||
    ((r = hn),
    'selectionStart' in r && vo(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (ar && wr(ar, r)) ||
      ((ar = r),
      (r = Rl(hi, 'onSelect')),
      0 < r.length &&
        ((t = new ho('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = hn))))
}
function Yr(e, t) {
  var n = {}
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  )
}
var mn = {
    animationend: Yr('Animation', 'AnimationEnd'),
    animationiteration: Yr('Animation', 'AnimationIteration'),
    animationstart: Yr('Animation', 'AnimationStart'),
    transitionend: Yr('Transition', 'TransitionEnd'),
  },
  Ts = {},
  Rc = {}
pt &&
  ((Rc = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete mn.animationend.animation,
    delete mn.animationiteration.animation,
    delete mn.animationstart.animation),
  'TransitionEvent' in window || delete mn.transitionend.transition)
function Zl(e) {
  if (Ts[e]) return Ts[e]
  if (!mn[e]) return e
  var t = mn[e],
    n
  for (n in t) if (t.hasOwnProperty(n) && n in Rc) return (Ts[e] = t[n])
  return e
}
var Tc = Zl('animationend'),
  Lc = Zl('animationiteration'),
  Oc = Zl('animationstart'),
  Ic = Zl('transitionend'),
  Ac = new Map(),
  Ea =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    )
function Mt(e, t) {
  ;(Ac.set(e, t), on(t, [e]))
}
for (var Ls = 0; Ls < Ea.length; Ls++) {
  var Os = Ea[Ls],
    uh = Os.toLowerCase(),
    ch = Os[0].toUpperCase() + Os.slice(1)
  Mt(uh, 'on' + ch)
}
Mt(Tc, 'onAnimationEnd')
Mt(Lc, 'onAnimationIteration')
Mt(Oc, 'onAnimationStart')
Mt('dblclick', 'onDoubleClick')
Mt('focusin', 'onFocus')
Mt('focusout', 'onBlur')
Mt(Ic, 'onTransitionEnd')
Rn('onMouseEnter', ['mouseout', 'mouseover'])
Rn('onMouseLeave', ['mouseout', 'mouseover'])
Rn('onPointerEnter', ['pointerout', 'pointerover'])
Rn('onPointerLeave', ['pointerout', 'pointerover'])
on(
  'onChange',
  'change click focusin focusout input keydown keyup selectionchange'.split(' ')
)
on(
  'onSelect',
  'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
    ' '
  )
)
on('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste'])
on(
  'onCompositionEnd',
  'compositionend focusout keydown keypress keyup mousedown'.split(' ')
)
on(
  'onCompositionStart',
  'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
)
on(
  'onCompositionUpdate',
  'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
)
var rr =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  fh = new Set('cancel close invalid load scroll toggle'.split(' ').concat(rr))
function ja(e, t, n) {
  var r = e.type || 'unknown-event'
  ;((e.currentTarget = n), up(r, t, void 0, e), (e.currentTarget = null))
}
function zc(e, t) {
  t = (t & 4) !== 0
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event
    r = r.listeners
    e: {
      var s = void 0
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var o = r[i],
            u = o.instance,
            c = o.currentTarget
          if (((o = o.listener), u !== s && l.isPropagationStopped())) break e
          ;(ja(l, o, c), (s = u))
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((o = r[i]),
            (u = o.instance),
            (c = o.currentTarget),
            (o = o.listener),
            u !== s && l.isPropagationStopped())
          )
            break e
          ;(ja(l, o, c), (s = u))
        }
    }
  }
  if (El) throw ((e = ci), (El = !1), (ci = null), e)
}
function V(e, t) {
  var n = t[wi]
  n === void 0 && (n = t[wi] = new Set())
  var r = e + '__bubble'
  n.has(r) || (Fc(t, e, 2, !1), n.add(r))
}
function Is(e, t, n) {
  var r = 0
  ;(t && (r |= 4), Fc(n, e, r, t))
}
var Gr = '_reactListening' + Math.random().toString(36).slice(2)
function Sr(e) {
  if (!e[Gr]) {
    ;((e[Gr] = !0),
      Hu.forEach(function (n) {
        n !== 'selectionchange' && (fh.has(n) || Is(n, !1, e), Is(n, !0, e))
      }))
    var t = e.nodeType === 9 ? e : e.ownerDocument
    t === null || t[Gr] || ((t[Gr] = !0), Is('selectionchange', !1, t))
  }
}
function Fc(e, t, n, r) {
  switch (xc(t)) {
    case 1:
      var l = jp
      break
    case 4:
      l = Np
      break
    default:
      l = fo
  }
  ;((n = l.bind(null, t, n, e)),
    (l = void 0),
    !ui ||
      (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1))
}
function As(e, t, n, r, l) {
  var s = r
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return
      var i = r.tag
      if (i === 3 || i === 4) {
        var o = r.stateNode.containerInfo
        if (o === l || (o.nodeType === 8 && o.parentNode === l)) break
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return
            i = i.return
          }
        for (; o !== null; ) {
          if (((i = Kt(o)), i === null)) return
          if (((u = i.tag), u === 5 || u === 6)) {
            r = s = i
            continue e
          }
          o = o.parentNode
        }
      }
      r = r.return
    }
  sc(function () {
    var c = s,
      f = oo(n),
      d = []
    e: {
      var g = Ac.get(e)
      if (g !== void 0) {
        var k = ho,
          m = e
        switch (e) {
          case 'keypress':
            if (fl(n) === 0) break e
          case 'keydown':
          case 'keyup':
            k = $p
            break
          case 'focusin':
            ;((m = 'focus'), (k = Ps))
            break
          case 'focusout':
            ;((m = 'blur'), (k = Ps))
            break
          case 'beforeblur':
          case 'afterblur':
            k = Ps
            break
          case 'click':
            if (n.button === 2) break e
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            k = pa
            break
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            k = Rp
            break
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            k = Vp
            break
          case Tc:
          case Lc:
          case Oc:
            k = Op
            break
          case Ic:
            k = Qp
            break
          case 'scroll':
            k = Pp
            break
          case 'wheel':
            k = Jp
            break
          case 'copy':
          case 'cut':
          case 'paste':
            k = Ap
            break
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            k = ma
        }
        var y = (t & 4) !== 0,
          x = !y && e === 'scroll',
          h = y ? (g !== null ? g + 'Capture' : null) : g
        y = []
        for (var p = c, v; p !== null; ) {
          v = p
          var C = v.stateNode
          if (
            (v.tag === 5 &&
              C !== null &&
              ((v = C),
              h !== null && ((C = mr(p, h)), C != null && y.push(kr(p, C, v)))),
            x)
          )
            break
          p = p.return
        }
        0 < y.length &&
          ((g = new k(g, m, null, n, f)), d.push({ event: g, listeners: y }))
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === 'mouseover' || e === 'pointerover'),
          (k = e === 'mouseout' || e === 'pointerout'),
          g &&
            n !== oi &&
            (m = n.relatedTarget || n.fromElement) &&
            (Kt(m) || m[ht]))
        )
          break e
        if (
          (k || g) &&
          ((g =
            f.window === f
              ? f
              : (g = f.ownerDocument)
                ? g.defaultView || g.parentWindow
                : window),
          k
            ? ((m = n.relatedTarget || n.toElement),
              (k = c),
              (m = m ? Kt(m) : null),
              m !== null &&
                ((x = an(m)), m !== x || (m.tag !== 5 && m.tag !== 6)) &&
                (m = null))
            : ((k = null), (m = c)),
          k !== m)
        ) {
          if (
            ((y = pa),
            (C = 'onMouseLeave'),
            (h = 'onMouseEnter'),
            (p = 'mouse'),
            (e === 'pointerout' || e === 'pointerover') &&
              ((y = ma),
              (C = 'onPointerLeave'),
              (h = 'onPointerEnter'),
              (p = 'pointer')),
            (x = k == null ? g : gn(k)),
            (v = m == null ? g : gn(m)),
            (g = new y(C, p + 'leave', k, n, f)),
            (g.target = x),
            (g.relatedTarget = v),
            (C = null),
            Kt(f) === c &&
              ((y = new y(h, p + 'enter', m, n, f)),
              (y.target = v),
              (y.relatedTarget = x),
              (C = y)),
            (x = C),
            k && m)
          )
            t: {
              for (y = k, h = m, p = 0, v = y; v; v = cn(v)) p++
              for (v = 0, C = h; C; C = cn(C)) v++
              for (; 0 < p - v; ) ((y = cn(y)), p--)
              for (; 0 < v - p; ) ((h = cn(h)), v--)
              for (; p--; ) {
                if (y === h || (h !== null && y === h.alternate)) break t
                ;((y = cn(y)), (h = cn(h)))
              }
              y = null
            }
          else y = null
          ;(k !== null && Na(d, g, k, y, !1),
            m !== null && x !== null && Na(d, x, m, y, !0))
        }
      }
      e: {
        if (
          ((g = c ? gn(c) : window),
          (k = g.nodeName && g.nodeName.toLowerCase()),
          k === 'select' || (k === 'input' && g.type === 'file'))
        )
          var j = th
        else if (ya(g))
          if (jc) j = sh
          else {
            j = rh
            var _ = nh
          }
        else
          (k = g.nodeName) &&
            k.toLowerCase() === 'input' &&
            (g.type === 'checkbox' || g.type === 'radio') &&
            (j = lh)
        if (j && (j = j(e, c))) {
          Ec(d, j, n, f)
          break e
        }
        ;(_ && _(e, g, c),
          e === 'focusout' &&
            (_ = g._wrapperState) &&
            _.controlled &&
            g.type === 'number' &&
            ni(g, 'number', g.value))
      }
      switch (((_ = c ? gn(c) : window), e)) {
        case 'focusin':
          ;(ya(_) || _.contentEditable === 'true') &&
            ((hn = _), (hi = c), (ar = null))
          break
        case 'focusout':
          ar = hi = hn = null
          break
        case 'mousedown':
          mi = !0
          break
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          ;((mi = !1), Ca(d, n, f))
          break
        case 'selectionchange':
          if (ah) break
        case 'keydown':
        case 'keyup':
          Ca(d, n, f)
      }
      var P
      if (go)
        e: {
          switch (e) {
            case 'compositionstart':
              var T = 'onCompositionStart'
              break e
            case 'compositionend':
              T = 'onCompositionEnd'
              break e
            case 'compositionupdate':
              T = 'onCompositionUpdate'
              break e
          }
          T = void 0
        }
      else
        pn
          ? kc(e, n) && (T = 'onCompositionEnd')
          : e === 'keydown' && n.keyCode === 229 && (T = 'onCompositionStart')
      ;(T &&
        (Sc &&
          n.locale !== 'ko' &&
          (pn || T !== 'onCompositionStart'
            ? T === 'onCompositionEnd' && pn && (P = wc())
            : ((jt = f),
              (po = 'value' in jt ? jt.value : jt.textContent),
              (pn = !0))),
        (_ = Rl(c, T)),
        0 < _.length &&
          ((T = new ha(T, e, null, n, f)),
          d.push({ event: T, listeners: _ }),
          P ? (T.data = P) : ((P = Cc(n)), P !== null && (T.data = P)))),
        (P = Xp ? Yp(e, n) : Gp(e, n)) &&
          ((c = Rl(c, 'onBeforeInput')),
          0 < c.length &&
            ((f = new ha('onBeforeInput', 'beforeinput', null, n, f)),
            d.push({ event: f, listeners: c }),
            (f.data = P))))
    }
    zc(d, t)
  })
}
function kr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n }
}
function Rl(e, t) {
  for (var n = t + 'Capture', r = []; e !== null; ) {
    var l = e,
      s = l.stateNode
    ;(l.tag === 5 &&
      s !== null &&
      ((l = s),
      (s = mr(e, n)),
      s != null && r.unshift(kr(e, s, l)),
      (s = mr(e, t)),
      s != null && r.push(kr(e, s, l))),
      (e = e.return))
  }
  return r
}
function cn(e) {
  if (e === null) return null
  do e = e.return
  while (e && e.tag !== 5)
  return e || null
}
function Na(e, t, n, r, l) {
  for (var s = t._reactName, i = []; n !== null && n !== r; ) {
    var o = n,
      u = o.alternate,
      c = o.stateNode
    if (u !== null && u === r) break
    ;(o.tag === 5 &&
      c !== null &&
      ((o = c),
      l
        ? ((u = mr(n, s)), u != null && i.unshift(kr(n, u, o)))
        : l || ((u = mr(n, s)), u != null && i.push(kr(n, u, o)))),
      (n = n.return))
  }
  i.length !== 0 && e.push({ event: t, listeners: i })
}
var dh = /\r\n?/g,
  ph = /\u0000|\uFFFD/g
function Pa(e) {
  return (typeof e == 'string' ? e : '' + e)
    .replace(
      dh,
      `
`
    )
    .replace(ph, '')
}
function Zr(e, t, n) {
  if (((t = Pa(t)), Pa(e) !== t && n)) throw Error(N(425))
}
function Tl() {}
var gi = null,
  vi = null
function yi(e, t) {
  return (
    e === 'textarea' ||
    e === 'noscript' ||
    typeof t.children == 'string' ||
    typeof t.children == 'number' ||
    (typeof t.dangerouslySetInnerHTML == 'object' &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  )
}
var xi = typeof setTimeout == 'function' ? setTimeout : void 0,
  hh = typeof clearTimeout == 'function' ? clearTimeout : void 0,
  _a = typeof Promise == 'function' ? Promise : void 0,
  mh =
    typeof queueMicrotask == 'function'
      ? queueMicrotask
      : typeof _a < 'u'
        ? function (e) {
            return _a.resolve(null).then(e).catch(gh)
          }
        : xi
function gh(e) {
  setTimeout(function () {
    throw e
  })
}
function zs(e, t) {
  var n = t,
    r = 0
  do {
    var l = n.nextSibling
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === '/$')) {
        if (r === 0) {
          ;(e.removeChild(l), yr(t))
          return
        }
        r--
      } else (n !== '$' && n !== '$?' && n !== '$!') || r++
    n = l
  } while (n)
  yr(t)
}
function Lt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType
    if (t === 1 || t === 3) break
    if (t === 8) {
      if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break
      if (t === '/$') return null
    }
  }
  return e
}
function Ra(e) {
  e = e.previousSibling
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data
      if (n === '$' || n === '$!' || n === '$?') {
        if (t === 0) return e
        t--
      } else n === '/$' && t++
    }
    e = e.previousSibling
  }
  return null
}
var Bn = Math.random().toString(36).slice(2),
  st = '__reactFiber$' + Bn,
  Cr = '__reactProps$' + Bn,
  ht = '__reactContainer$' + Bn,
  wi = '__reactEvents$' + Bn,
  vh = '__reactListeners$' + Bn,
  yh = '__reactHandles$' + Bn
function Kt(e) {
  var t = e[st]
  if (t) return t
  for (var n = e.parentNode; n; ) {
    if ((t = n[ht] || n[st])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Ra(e); e !== null; ) {
          if ((n = e[st])) return n
          e = Ra(e)
        }
      return t
    }
    ;((e = n), (n = e.parentNode))
  }
  return null
}
function zr(e) {
  return (
    (e = e[st] || e[ht]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  )
}
function gn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode
  throw Error(N(33))
}
function es(e) {
  return e[Cr] || null
}
var Si = [],
  vn = -1
function Bt(e) {
  return { current: e }
}
function K(e) {
  0 > vn || ((e.current = Si[vn]), (Si[vn] = null), vn--)
}
function H(e, t) {
  ;(vn++, (Si[vn] = e.current), (e.current = t))
}
var Ut = {},
  Se = Bt(Ut),
  _e = Bt(!1),
  Zt = Ut
function Tn(e, t) {
  var n = e.type.contextTypes
  if (!n) return Ut
  var r = e.stateNode
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext
  var l = {},
    s
  for (s in n) l[s] = t[s]
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  )
}
function Re(e) {
  return ((e = e.childContextTypes), e != null)
}
function Ll() {
  ;(K(_e), K(Se))
}
function Ta(e, t, n) {
  if (Se.current !== Ut) throw Error(N(168))
  ;(H(Se, t), H(_e, n))
}
function Dc(e, t, n) {
  var r = e.stateNode
  if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
    return n
  r = r.getChildContext()
  for (var l in r) if (!(l in t)) throw Error(N(108, np(e) || 'Unknown', l))
  return Z({}, n, r)
}
function Ol(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ut),
    (Zt = Se.current),
    H(Se, e),
    H(_e, _e.current),
    !0
  )
}
function La(e, t, n) {
  var r = e.stateNode
  if (!r) throw Error(N(169))
  ;(n
    ? ((e = Dc(e, t, Zt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      K(_e),
      K(Se),
      H(Se, e))
    : K(_e),
    H(_e, n))
}
var ut = null,
  ts = !1,
  Fs = !1
function Uc(e) {
  ut === null ? (ut = [e]) : ut.push(e)
}
function xh(e) {
  ;((ts = !0), Uc(e))
}
function $t() {
  if (!Fs && ut !== null) {
    Fs = !0
    var e = 0,
      t = W
    try {
      var n = ut
      for (W = 1; e < n.length; e++) {
        var r = n[e]
        do r = r(!0)
        while (r !== null)
      }
      ;((ut = null), (ts = !1))
    } catch (l) {
      throw (ut !== null && (ut = ut.slice(e + 1)), uc(ao, $t), l)
    } finally {
      ;((W = t), (Fs = !1))
    }
  }
  return null
}
var yn = [],
  xn = 0,
  Il = null,
  Al = 0,
  Me = [],
  Be = 0,
  en = null,
  ct = 1,
  ft = ''
function Ht(e, t) {
  ;((yn[xn++] = Al), (yn[xn++] = Il), (Il = e), (Al = t))
}
function Mc(e, t, n) {
  ;((Me[Be++] = ct), (Me[Be++] = ft), (Me[Be++] = en), (en = e))
  var r = ct
  e = ft
  var l = 32 - qe(r) - 1
  ;((r &= ~(1 << l)), (n += 1))
  var s = 32 - qe(t) + l
  if (30 < s) {
    var i = l - (l % 5)
    ;((s = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (ct = (1 << (32 - qe(t) + l)) | (n << l) | r),
      (ft = s + e))
  } else ((ct = (1 << s) | (n << l) | r), (ft = e))
}
function yo(e) {
  e.return !== null && (Ht(e, 1), Mc(e, 1, 0))
}
function xo(e) {
  for (; e === Il; )
    ((Il = yn[--xn]), (yn[xn] = null), (Al = yn[--xn]), (yn[xn] = null))
  for (; e === en; )
    ((en = Me[--Be]),
      (Me[Be] = null),
      (ft = Me[--Be]),
      (Me[Be] = null),
      (ct = Me[--Be]),
      (Me[Be] = null))
}
var ze = null,
  Ae = null,
  J = !1,
  Je = null
function Bc(e, t) {
  var n = $e(5, null, null, 0)
  ;((n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n))
}
function Oa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ze = e), (Ae = Lt(t.firstChild)), !0)
          : !1
      )
    case 6:
      return (
        (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ze = e), (Ae = null), !0) : !1
      )
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = en !== null ? { id: ct, overflow: ft } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = $e(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ze = e),
            (Ae = null),
            !0)
          : !1
      )
    default:
      return !1
  }
}
function ki(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Ci(e) {
  if (J) {
    var t = Ae
    if (t) {
      var n = t
      if (!Oa(e, t)) {
        if (ki(e)) throw Error(N(418))
        t = Lt(n.nextSibling)
        var r = ze
        t && Oa(e, t)
          ? Bc(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (J = !1), (ze = e))
      }
    } else {
      if (ki(e)) throw Error(N(418))
      ;((e.flags = (e.flags & -4097) | 2), (J = !1), (ze = e))
    }
  }
}
function Ia(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return
  ze = e
}
function el(e) {
  if (e !== ze) return !1
  if (!J) return (Ia(e), (J = !0), !1)
  var t
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== 'head' && t !== 'body' && !yi(e.type, e.memoizedProps))),
    t && (t = Ae))
  ) {
    if (ki(e)) throw ($c(), Error(N(418)))
    for (; t; ) (Bc(e, t), (t = Lt(t.nextSibling)))
  }
  if ((Ia(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317))
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data
          if (n === '/$') {
            if (t === 0) {
              Ae = Lt(e.nextSibling)
              break e
            }
            t--
          } else (n !== '$' && n !== '$!' && n !== '$?') || t++
        }
        e = e.nextSibling
      }
      Ae = null
    }
  } else Ae = ze ? Lt(e.stateNode.nextSibling) : null
  return !0
}
function $c() {
  for (var e = Ae; e; ) e = Lt(e.nextSibling)
}
function Ln() {
  ;((Ae = ze = null), (J = !1))
}
function wo(e) {
  Je === null ? (Je = [e]) : Je.push(e)
}
var wh = vt.ReactCurrentBatchConfig
function Xn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != 'function' && typeof e != 'object')
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309))
        var r = n.stateNode
      }
      if (!r) throw Error(N(147, e))
      var l = r,
        s = '' + e
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == 'function' &&
        t.ref._stringRef === s
        ? t.ref
        : ((t = function (i) {
            var o = l.refs
            i === null ? delete o[s] : (o[s] = i)
          }),
          (t._stringRef = s),
          t)
    }
    if (typeof e != 'string') throw Error(N(284))
    if (!n._owner) throw Error(N(290, e))
  }
  return e
}
function tl(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === '[object Object]'
          ? 'object with keys {' + Object.keys(t).join(', ') + '}'
          : e
      )
    )
  )
}
function Aa(e) {
  var t = e._init
  return t(e._payload)
}
function Wc(e) {
  function t(h, p) {
    if (e) {
      var v = h.deletions
      v === null ? ((h.deletions = [p]), (h.flags |= 16)) : v.push(p)
    }
  }
  function n(h, p) {
    if (!e) return null
    for (; p !== null; ) (t(h, p), (p = p.sibling))
    return null
  }
  function r(h, p) {
    for (h = new Map(); p !== null; )
      (p.key !== null ? h.set(p.key, p) : h.set(p.index, p), (p = p.sibling))
    return h
  }
  function l(h, p) {
    return ((h = zt(h, p)), (h.index = 0), (h.sibling = null), h)
  }
  function s(h, p, v) {
    return (
      (h.index = v),
      e
        ? ((v = h.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((h.flags |= 2), p) : v)
            : ((h.flags |= 2), p))
        : ((h.flags |= 1048576), p)
    )
  }
  function i(h) {
    return (e && h.alternate === null && (h.flags |= 2), h)
  }
  function o(h, p, v, C) {
    return p === null || p.tag !== 6
      ? ((p = Hs(v, h.mode, C)), (p.return = h), p)
      : ((p = l(p, v)), (p.return = h), p)
  }
  function u(h, p, v, C) {
    var j = v.type
    return j === dn
      ? f(h, p, v.props.children, C, v.key)
      : p !== null &&
          (p.elementType === j ||
            (typeof j == 'object' &&
              j !== null &&
              j.$$typeof === St &&
              Aa(j) === p.type))
        ? ((C = l(p, v.props)), (C.ref = Xn(h, p, v)), (C.return = h), C)
        : ((C = yl(v.type, v.key, v.props, null, h.mode, C)),
          (C.ref = Xn(h, p, v)),
          (C.return = h),
          C)
  }
  function c(h, p, v, C) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = Vs(v, h.mode, C)), (p.return = h), p)
      : ((p = l(p, v.children || [])), (p.return = h), p)
  }
  function f(h, p, v, C, j) {
    return p === null || p.tag !== 7
      ? ((p = Xt(v, h.mode, C, j)), (p.return = h), p)
      : ((p = l(p, v)), (p.return = h), p)
  }
  function d(h, p, v) {
    if ((typeof p == 'string' && p !== '') || typeof p == 'number')
      return ((p = Hs('' + p, h.mode, v)), (p.return = h), p)
    if (typeof p == 'object' && p !== null) {
      switch (p.$$typeof) {
        case Vr:
          return (
            (v = yl(p.type, p.key, p.props, null, h.mode, v)),
            (v.ref = Xn(h, null, p)),
            (v.return = h),
            v
          )
        case fn:
          return ((p = Vs(p, h.mode, v)), (p.return = h), p)
        case St:
          var C = p._init
          return d(h, C(p._payload), v)
      }
      if (tr(p) || Kn(p))
        return ((p = Xt(p, h.mode, v, null)), (p.return = h), p)
      tl(h, p)
    }
    return null
  }
  function g(h, p, v, C) {
    var j = p !== null ? p.key : null
    if ((typeof v == 'string' && v !== '') || typeof v == 'number')
      return j !== null ? null : o(h, p, '' + v, C)
    if (typeof v == 'object' && v !== null) {
      switch (v.$$typeof) {
        case Vr:
          return v.key === j ? u(h, p, v, C) : null
        case fn:
          return v.key === j ? c(h, p, v, C) : null
        case St:
          return ((j = v._init), g(h, p, j(v._payload), C))
      }
      if (tr(v) || Kn(v)) return j !== null ? null : f(h, p, v, C, null)
      tl(h, v)
    }
    return null
  }
  function k(h, p, v, C, j) {
    if ((typeof C == 'string' && C !== '') || typeof C == 'number')
      return ((h = h.get(v) || null), o(p, h, '' + C, j))
    if (typeof C == 'object' && C !== null) {
      switch (C.$$typeof) {
        case Vr:
          return (
            (h = h.get(C.key === null ? v : C.key) || null),
            u(p, h, C, j)
          )
        case fn:
          return (
            (h = h.get(C.key === null ? v : C.key) || null),
            c(p, h, C, j)
          )
        case St:
          var _ = C._init
          return k(h, p, v, _(C._payload), j)
      }
      if (tr(C) || Kn(C)) return ((h = h.get(v) || null), f(p, h, C, j, null))
      tl(p, C)
    }
    return null
  }
  function m(h, p, v, C) {
    for (
      var j = null, _ = null, P = p, T = (p = 0), U = null;
      P !== null && T < v.length;
      T++
    ) {
      P.index > T ? ((U = P), (P = null)) : (U = P.sibling)
      var z = g(h, P, v[T], C)
      if (z === null) {
        P === null && (P = U)
        break
      }
      ;(e && P && z.alternate === null && t(h, P),
        (p = s(z, p, T)),
        _ === null ? (j = z) : (_.sibling = z),
        (_ = z),
        (P = U))
    }
    if (T === v.length) return (n(h, P), J && Ht(h, T), j)
    if (P === null) {
      for (; T < v.length; T++)
        ((P = d(h, v[T], C)),
          P !== null &&
            ((p = s(P, p, T)), _ === null ? (j = P) : (_.sibling = P), (_ = P)))
      return (J && Ht(h, T), j)
    }
    for (P = r(h, P); T < v.length; T++)
      ((U = k(P, h, T, v[T], C)),
        U !== null &&
          (e && U.alternate !== null && P.delete(U.key === null ? T : U.key),
          (p = s(U, p, T)),
          _ === null ? (j = U) : (_.sibling = U),
          (_ = U)))
    return (
      e &&
        P.forEach(function (Q) {
          return t(h, Q)
        }),
      J && Ht(h, T),
      j
    )
  }
  function y(h, p, v, C) {
    var j = Kn(v)
    if (typeof j != 'function') throw Error(N(150))
    if (((v = j.call(v)), v == null)) throw Error(N(151))
    for (
      var _ = (j = null), P = p, T = (p = 0), U = null, z = v.next();
      P !== null && !z.done;
      T++, z = v.next()
    ) {
      P.index > T ? ((U = P), (P = null)) : (U = P.sibling)
      var Q = g(h, P, z.value, C)
      if (Q === null) {
        P === null && (P = U)
        break
      }
      ;(e && P && Q.alternate === null && t(h, P),
        (p = s(Q, p, T)),
        _ === null ? (j = Q) : (_.sibling = Q),
        (_ = Q),
        (P = U))
    }
    if (z.done) return (n(h, P), J && Ht(h, T), j)
    if (P === null) {
      for (; !z.done; T++, z = v.next())
        ((z = d(h, z.value, C)),
          z !== null &&
            ((p = s(z, p, T)), _ === null ? (j = z) : (_.sibling = z), (_ = z)))
      return (J && Ht(h, T), j)
    }
    for (P = r(h, P); !z.done; T++, z = v.next())
      ((z = k(P, h, T, z.value, C)),
        z !== null &&
          (e && z.alternate !== null && P.delete(z.key === null ? T : z.key),
          (p = s(z, p, T)),
          _ === null ? (j = z) : (_.sibling = z),
          (_ = z)))
    return (
      e &&
        P.forEach(function (te) {
          return t(h, te)
        }),
      J && Ht(h, T),
      j
    )
  }
  function x(h, p, v, C) {
    if (
      (typeof v == 'object' &&
        v !== null &&
        v.type === dn &&
        v.key === null &&
        (v = v.props.children),
      typeof v == 'object' && v !== null)
    ) {
      switch (v.$$typeof) {
        case Vr:
          e: {
            for (var j = v.key, _ = p; _ !== null; ) {
              if (_.key === j) {
                if (((j = v.type), j === dn)) {
                  if (_.tag === 7) {
                    ;(n(h, _.sibling),
                      (p = l(_, v.props.children)),
                      (p.return = h),
                      (h = p))
                    break e
                  }
                } else if (
                  _.elementType === j ||
                  (typeof j == 'object' &&
                    j !== null &&
                    j.$$typeof === St &&
                    Aa(j) === _.type)
                ) {
                  ;(n(h, _.sibling),
                    (p = l(_, v.props)),
                    (p.ref = Xn(h, _, v)),
                    (p.return = h),
                    (h = p))
                  break e
                }
                n(h, _)
                break
              } else t(h, _)
              _ = _.sibling
            }
            v.type === dn
              ? ((p = Xt(v.props.children, h.mode, C, v.key)),
                (p.return = h),
                (h = p))
              : ((C = yl(v.type, v.key, v.props, null, h.mode, C)),
                (C.ref = Xn(h, p, v)),
                (C.return = h),
                (h = C))
          }
          return i(h)
        case fn:
          e: {
            for (_ = v.key; p !== null; ) {
              if (p.key === _)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  ;(n(h, p.sibling),
                    (p = l(p, v.children || [])),
                    (p.return = h),
                    (h = p))
                  break e
                } else {
                  n(h, p)
                  break
                }
              else t(h, p)
              p = p.sibling
            }
            ;((p = Vs(v, h.mode, C)), (p.return = h), (h = p))
          }
          return i(h)
        case St:
          return ((_ = v._init), x(h, p, _(v._payload), C))
      }
      if (tr(v)) return m(h, p, v, C)
      if (Kn(v)) return y(h, p, v, C)
      tl(h, v)
    }
    return (typeof v == 'string' && v !== '') || typeof v == 'number'
      ? ((v = '' + v),
        p !== null && p.tag === 6
          ? (n(h, p.sibling), (p = l(p, v)), (p.return = h), (h = p))
          : (n(h, p), (p = Hs(v, h.mode, C)), (p.return = h), (h = p)),
        i(h))
      : n(h, p)
  }
  return x
}
var On = Wc(!0),
  Hc = Wc(!1),
  zl = Bt(null),
  Fl = null,
  wn = null,
  So = null
function ko() {
  So = wn = Fl = null
}
function Co(e) {
  var t = zl.current
  ;(K(zl), (e._currentValue = t))
}
function Ei(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break
    e = e.return
  }
}
function Pn(e, t) {
  ;((Fl = e),
    (So = wn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Pe = !0), (e.firstContext = null)))
}
function He(e) {
  var t = e._currentValue
  if (So !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), wn === null)) {
      if (Fl === null) throw Error(N(308))
      ;((wn = e), (Fl.dependencies = { lanes: 0, firstContext: e }))
    } else wn = wn.next = e
  return t
}
var Qt = null
function Eo(e) {
  Qt === null ? (Qt = [e]) : Qt.push(e)
}
function Vc(e, t, n, r) {
  var l = t.interleaved
  return (
    l === null ? ((n.next = n), Eo(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    mt(e, r)
  )
}
function mt(e, t) {
  e.lanes |= t
  var n = e.alternate
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return))
  return n.tag === 3 ? n.stateNode : null
}
var kt = !1
function jo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  }
}
function Kc(e, t) {
  ;((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }))
}
function dt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  }
}
function Ot(e, t, n) {
  var r = e.updateQueue
  if (r === null) return null
  if (((r = r.shared), B & 2)) {
    var l = r.pending
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      mt(e, n)
    )
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Eo(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    mt(e, n)
  )
}
function dl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes
    ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), uo(e, n))
  }
}
function za(e, t) {
  var n = e.updateQueue,
    r = e.alternate
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      s = null
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        }
        ;(s === null ? (l = s = i) : (s = s.next = i), (n = n.next))
      } while (n !== null)
      s === null ? (l = s = t) : (s = s.next = t)
    } else l = s = t
    ;((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: s,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n))
    return
  }
  ;((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t))
}
function Dl(e, t, n, r) {
  var l = e.updateQueue
  kt = !1
  var s = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    o = l.shared.pending
  if (o !== null) {
    l.shared.pending = null
    var u = o,
      c = u.next
    ;((u.next = null), i === null ? (s = c) : (i.next = c), (i = u))
    var f = e.alternate
    f !== null &&
      ((f = f.updateQueue),
      (o = f.lastBaseUpdate),
      o !== i &&
        (o === null ? (f.firstBaseUpdate = c) : (o.next = c),
        (f.lastBaseUpdate = u)))
  }
  if (s !== null) {
    var d = l.baseState
    ;((i = 0), (f = c = u = null), (o = s))
    do {
      var g = o.lane,
        k = o.eventTime
      if ((r & g) === g) {
        f !== null &&
          (f = f.next =
            {
              eventTime: k,
              lane: 0,
              tag: o.tag,
              payload: o.payload,
              callback: o.callback,
              next: null,
            })
        e: {
          var m = e,
            y = o
          switch (((g = t), (k = n), y.tag)) {
            case 1:
              if (((m = y.payload), typeof m == 'function')) {
                d = m.call(k, d, g)
                break e
              }
              d = m
              break e
            case 3:
              m.flags = (m.flags & -65537) | 128
            case 0:
              if (
                ((m = y.payload),
                (g = typeof m == 'function' ? m.call(k, d, g) : m),
                g == null)
              )
                break e
              d = Z({}, d, g)
              break e
            case 2:
              kt = !0
          }
        }
        o.callback !== null &&
          o.lane !== 0 &&
          ((e.flags |= 64),
          (g = l.effects),
          g === null ? (l.effects = [o]) : g.push(o))
      } else
        ((k = {
          eventTime: k,
          lane: g,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null,
        }),
          f === null ? ((c = f = k), (u = d)) : (f = f.next = k),
          (i |= g))
      if (((o = o.next), o === null)) {
        if (((o = l.shared.pending), o === null)) break
        ;((g = o),
          (o = g.next),
          (g.next = null),
          (l.lastBaseUpdate = g),
          (l.shared.pending = null))
      }
    } while (!0)
    if (
      (f === null && (u = d),
      (l.baseState = u),
      (l.firstBaseUpdate = c),
      (l.lastBaseUpdate = f),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t
      do ((i |= l.lane), (l = l.next))
      while (l !== t)
    } else s === null && (l.shared.lanes = 0)
    ;((nn |= i), (e.lanes = i), (e.memoizedState = d))
  }
}
function Fa(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != 'function'))
          throw Error(N(191, l))
        l.call(r)
      }
    }
}
var Fr = {},
  ot = Bt(Fr),
  Er = Bt(Fr),
  jr = Bt(Fr)
function bt(e) {
  if (e === Fr) throw Error(N(174))
  return e
}
function No(e, t) {
  switch ((H(jr, t), H(Er, e), H(ot, Fr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : li(null, '')
      break
    default:
      ;((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = li(t, e)))
  }
  ;(K(ot), H(ot, t))
}
function In() {
  ;(K(ot), K(Er), K(jr))
}
function Qc(e) {
  bt(jr.current)
  var t = bt(ot.current),
    n = li(t, e.type)
  t !== n && (H(Er, e), H(ot, n))
}
function Po(e) {
  Er.current === e && (K(ot), K(Er))
}
var X = Bt(0)
function Ul(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
      )
        return t
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t
    } else if (t.child !== null) {
      ;((t.child.return = t), (t = t.child))
      continue
    }
    if (t === e) break
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null
      t = t.return
    }
    ;((t.sibling.return = t.return), (t = t.sibling))
  }
  return null
}
var Ds = []
function _o() {
  for (var e = 0; e < Ds.length; e++) Ds[e]._workInProgressVersionPrimary = null
  Ds.length = 0
}
var pl = vt.ReactCurrentDispatcher,
  Us = vt.ReactCurrentBatchConfig,
  tn = 0,
  Y = null,
  ae = null,
  ce = null,
  Ml = !1,
  ur = !1,
  Nr = 0,
  Sh = 0
function ve() {
  throw Error(N(321))
}
function Ro(e, t) {
  if (t === null) return !1
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ye(e[n], t[n])) return !1
  return !0
}
function To(e, t, n, r, l, s) {
  if (
    ((tn = s),
    (Y = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (pl.current = e === null || e.memoizedState === null ? jh : Nh),
    (e = n(r, l)),
    ur)
  ) {
    s = 0
    do {
      if (((ur = !1), (Nr = 0), 25 <= s)) throw Error(N(301))
      ;((s += 1),
        (ce = ae = null),
        (t.updateQueue = null),
        (pl.current = Ph),
        (e = n(r, l)))
    } while (ur)
  }
  if (
    ((pl.current = Bl),
    (t = ae !== null && ae.next !== null),
    (tn = 0),
    (ce = ae = Y = null),
    (Ml = !1),
    t)
  )
    throw Error(N(300))
  return e
}
function Lo() {
  var e = Nr !== 0
  return ((Nr = 0), e)
}
function lt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  }
  return (ce === null ? (Y.memoizedState = ce = e) : (ce = ce.next = e), ce)
}
function Ve() {
  if (ae === null) {
    var e = Y.alternate
    e = e !== null ? e.memoizedState : null
  } else e = ae.next
  var t = ce === null ? Y.memoizedState : ce.next
  if (t !== null) ((ce = t), (ae = e))
  else {
    if (e === null) throw Error(N(310))
    ;((ae = e),
      (e = {
        memoizedState: ae.memoizedState,
        baseState: ae.baseState,
        baseQueue: ae.baseQueue,
        queue: ae.queue,
        next: null,
      }),
      ce === null ? (Y.memoizedState = ce = e) : (ce = ce.next = e))
  }
  return ce
}
function Pr(e, t) {
  return typeof t == 'function' ? t(e) : t
}
function Ms(e) {
  var t = Ve(),
    n = t.queue
  if (n === null) throw Error(N(311))
  n.lastRenderedReducer = e
  var r = ae,
    l = r.baseQueue,
    s = n.pending
  if (s !== null) {
    if (l !== null) {
      var i = l.next
      ;((l.next = s.next), (s.next = i))
    }
    ;((r.baseQueue = l = s), (n.pending = null))
  }
  if (l !== null) {
    ;((s = l.next), (r = r.baseState))
    var o = (i = null),
      u = null,
      c = s
    do {
      var f = c.lane
      if ((tn & f) === f)
        (u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: c.action,
              hasEagerState: c.hasEagerState,
              eagerState: c.eagerState,
              next: null,
            }),
          (r = c.hasEagerState ? c.eagerState : e(r, c.action)))
      else {
        var d = {
          lane: f,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null,
        }
        ;(u === null ? ((o = u = d), (i = r)) : (u = u.next = d),
          (Y.lanes |= f),
          (nn |= f))
      }
      c = c.next
    } while (c !== null && c !== s)
    ;(u === null ? (i = r) : (u.next = o),
      Ye(r, t.memoizedState) || (Pe = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r))
  }
  if (((e = n.interleaved), e !== null)) {
    l = e
    do ((s = l.lane), (Y.lanes |= s), (nn |= s), (l = l.next))
    while (l !== e)
  } else l === null && (n.lanes = 0)
  return [t.memoizedState, n.dispatch]
}
function Bs(e) {
  var t = Ve(),
    n = t.queue
  if (n === null) throw Error(N(311))
  n.lastRenderedReducer = e
  var r = n.dispatch,
    l = n.pending,
    s = t.memoizedState
  if (l !== null) {
    n.pending = null
    var i = (l = l.next)
    do ((s = e(s, i.action)), (i = i.next))
    while (i !== l)
    ;(Ye(s, t.memoizedState) || (Pe = !0),
      (t.memoizedState = s),
      t.baseQueue === null && (t.baseState = s),
      (n.lastRenderedState = s))
  }
  return [s, r]
}
function bc() {}
function Jc(e, t) {
  var n = Y,
    r = Ve(),
    l = t(),
    s = !Ye(r.memoizedState, l)
  if (
    (s && ((r.memoizedState = l), (Pe = !0)),
    (r = r.queue),
    Oo(Yc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || (ce !== null && ce.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      _r(9, Xc.bind(null, n, r, l, t), void 0, null),
      fe === null)
    )
      throw Error(N(349))
    tn & 30 || qc(n, t, l)
  }
  return l
}
function qc(e, t, n) {
  ;((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Y.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)))
}
function Xc(e, t, n, r) {
  ;((t.value = n), (t.getSnapshot = r), Gc(t) && Zc(e))
}
function Yc(e, t, n) {
  return n(function () {
    Gc(t) && Zc(e)
  })
}
function Gc(e) {
  var t = e.getSnapshot
  e = e.value
  try {
    var n = t()
    return !Ye(e, n)
  } catch {
    return !0
  }
}
function Zc(e) {
  var t = mt(e, 1)
  t !== null && Xe(t, e, 1, -1)
}
function Da(e) {
  var t = lt()
  return (
    typeof e == 'function' && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Eh.bind(null, Y, e)),
    [t.memoizedState, e]
  )
}
function _r(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Y.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Y.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  )
}
function ef() {
  return Ve().memoizedState
}
function hl(e, t, n, r) {
  var l = lt()
  ;((Y.flags |= e),
    (l.memoizedState = _r(1 | t, n, void 0, r === void 0 ? null : r)))
}
function ns(e, t, n, r) {
  var l = Ve()
  r = r === void 0 ? null : r
  var s = void 0
  if (ae !== null) {
    var i = ae.memoizedState
    if (((s = i.destroy), r !== null && Ro(r, i.deps))) {
      l.memoizedState = _r(t, n, s, r)
      return
    }
  }
  ;((Y.flags |= e), (l.memoizedState = _r(1 | t, n, s, r)))
}
function Ua(e, t) {
  return hl(8390656, 8, e, t)
}
function Oo(e, t) {
  return ns(2048, 8, e, t)
}
function tf(e, t) {
  return ns(4, 2, e, t)
}
function nf(e, t) {
  return ns(4, 4, e, t)
}
function rf(e, t) {
  if (typeof t == 'function')
    return (
      (e = e()),
      t(e),
      function () {
        t(null)
      }
    )
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null
      }
    )
}
function lf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    ns(4, 4, rf.bind(null, t, e), n)
  )
}
function Io() {}
function sf(e, t) {
  var n = Ve()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && Ro(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e)
}
function of(e, t) {
  var n = Ve()
  t = t === void 0 ? null : t
  var r = n.memoizedState
  return r !== null && t !== null && Ro(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e)
}
function af(e, t, n) {
  return tn & 21
    ? (Ye(n, t) || ((n = dc()), (Y.lanes |= n), (nn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Pe = !0)), (e.memoizedState = n))
}
function kh(e, t) {
  var n = W
  ;((W = n !== 0 && 4 > n ? n : 4), e(!0))
  var r = Us.transition
  Us.transition = {}
  try {
    ;(e(!1), t())
  } finally {
    ;((W = n), (Us.transition = r))
  }
}
function uf() {
  return Ve().memoizedState
}
function Ch(e, t, n) {
  var r = At(e)
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    cf(e))
  )
    ff(t, n)
  else if (((n = Vc(e, t, n, r)), n !== null)) {
    var l = Ce()
    ;(Xe(n, e, r, l), df(n, t, r))
  }
}
function Eh(e, t, n) {
  var r = At(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }
  if (cf(e)) ff(t, l)
  else {
    var s = e.alternate
    if (
      e.lanes === 0 &&
      (s === null || s.lanes === 0) &&
      ((s = t.lastRenderedReducer), s !== null)
    )
      try {
        var i = t.lastRenderedState,
          o = s(i, n)
        if (((l.hasEagerState = !0), (l.eagerState = o), Ye(o, i))) {
          var u = t.interleaved
          ;(u === null
            ? ((l.next = l), Eo(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l))
          return
        }
      } catch {
      } finally {
      }
    ;((n = Vc(e, t, l, r)),
      n !== null && ((l = Ce()), Xe(n, e, r, l), df(n, t, r)))
  }
}
function cf(e) {
  var t = e.alternate
  return e === Y || (t !== null && t === Y)
}
function ff(e, t) {
  ur = Ml = !0
  var n = e.pending
  ;(n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t))
}
function df(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes
    ;((r &= e.pendingLanes), (n |= r), (t.lanes = n), uo(e, n))
  }
}
var Bl = {
    readContext: He,
    useCallback: ve,
    useContext: ve,
    useEffect: ve,
    useImperativeHandle: ve,
    useInsertionEffect: ve,
    useLayoutEffect: ve,
    useMemo: ve,
    useReducer: ve,
    useRef: ve,
    useState: ve,
    useDebugValue: ve,
    useDeferredValue: ve,
    useTransition: ve,
    useMutableSource: ve,
    useSyncExternalStore: ve,
    useId: ve,
    unstable_isNewReconciler: !1,
  },
  jh = {
    readContext: He,
    useCallback: function (e, t) {
      return ((lt().memoizedState = [e, t === void 0 ? null : t]), e)
    },
    useContext: He,
    useEffect: Ua,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        hl(4194308, 4, rf.bind(null, t, e), n)
      )
    },
    useLayoutEffect: function (e, t) {
      return hl(4194308, 4, e, t)
    },
    useInsertionEffect: function (e, t) {
      return hl(4, 2, e, t)
    },
    useMemo: function (e, t) {
      var n = lt()
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      )
    },
    useReducer: function (e, t, n) {
      var r = lt()
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Ch.bind(null, Y, e)),
        [r.memoizedState, e]
      )
    },
    useRef: function (e) {
      var t = lt()
      return ((e = { current: e }), (t.memoizedState = e))
    },
    useState: Da,
    useDebugValue: Io,
    useDeferredValue: function (e) {
      return (lt().memoizedState = e)
    },
    useTransition: function () {
      var e = Da(!1),
        t = e[0]
      return ((e = kh.bind(null, e[1])), (lt().memoizedState = e), [t, e])
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Y,
        l = lt()
      if (J) {
        if (n === void 0) throw Error(N(407))
        n = n()
      } else {
        if (((n = t()), fe === null)) throw Error(N(349))
        tn & 30 || qc(r, t, n)
      }
      l.memoizedState = n
      var s = { value: n, getSnapshot: t }
      return (
        (l.queue = s),
        Ua(Yc.bind(null, r, s, e), [e]),
        (r.flags |= 2048),
        _r(9, Xc.bind(null, r, s, n, t), void 0, null),
        n
      )
    },
    useId: function () {
      var e = lt(),
        t = fe.identifierPrefix
      if (J) {
        var n = ft,
          r = ct
        ;((n = (r & ~(1 << (32 - qe(r) - 1))).toString(32) + n),
          (t = ':' + t + 'R' + n),
          (n = Nr++),
          0 < n && (t += 'H' + n.toString(32)),
          (t += ':'))
      } else ((n = Sh++), (t = ':' + t + 'r' + n.toString(32) + ':'))
      return (e.memoizedState = t)
    },
    unstable_isNewReconciler: !1,
  },
  Nh = {
    readContext: He,
    useCallback: sf,
    useContext: He,
    useEffect: Oo,
    useImperativeHandle: lf,
    useInsertionEffect: tf,
    useLayoutEffect: nf,
    useMemo: of,
    useReducer: Ms,
    useRef: ef,
    useState: function () {
      return Ms(Pr)
    },
    useDebugValue: Io,
    useDeferredValue: function (e) {
      var t = Ve()
      return af(t, ae.memoizedState, e)
    },
    useTransition: function () {
      var e = Ms(Pr)[0],
        t = Ve().memoizedState
      return [e, t]
    },
    useMutableSource: bc,
    useSyncExternalStore: Jc,
    useId: uf,
    unstable_isNewReconciler: !1,
  },
  Ph = {
    readContext: He,
    useCallback: sf,
    useContext: He,
    useEffect: Oo,
    useImperativeHandle: lf,
    useInsertionEffect: tf,
    useLayoutEffect: nf,
    useMemo: of,
    useReducer: Bs,
    useRef: ef,
    useState: function () {
      return Bs(Pr)
    },
    useDebugValue: Io,
    useDeferredValue: function (e) {
      var t = Ve()
      return ae === null ? (t.memoizedState = e) : af(t, ae.memoizedState, e)
    },
    useTransition: function () {
      var e = Bs(Pr)[0],
        t = Ve().memoizedState
      return [e, t]
    },
    useMutableSource: bc,
    useSyncExternalStore: Jc,
    useId: uf,
    unstable_isNewReconciler: !1,
  }
function Qe(e, t) {
  if (e && e.defaultProps) {
    ;((t = Z({}, t)), (e = e.defaultProps))
    for (var n in e) t[n] === void 0 && (t[n] = e[n])
    return t
  }
  return t
}
function ji(e, t, n, r) {
  ;((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Z({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n))
}
var rs = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? an(e) === e : !1
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals
    var r = Ce(),
      l = At(e),
      s = dt(r, l)
    ;((s.payload = t),
      n != null && (s.callback = n),
      (t = Ot(e, s, l)),
      t !== null && (Xe(t, e, l, r), dl(t, e, l)))
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals
    var r = Ce(),
      l = At(e),
      s = dt(r, l)
    ;((s.tag = 1),
      (s.payload = t),
      n != null && (s.callback = n),
      (t = Ot(e, s, l)),
      t !== null && (Xe(t, e, l, r), dl(t, e, l)))
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals
    var n = Ce(),
      r = At(e),
      l = dt(n, r)
    ;((l.tag = 2),
      t != null && (l.callback = t),
      (t = Ot(e, l, r)),
      t !== null && (Xe(t, e, r, n), dl(t, e, r)))
  },
}
function Ma(e, t, n, r, l, s, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == 'function'
      ? e.shouldComponentUpdate(r, s, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !wr(n, r) || !wr(l, s)
        : !0
  )
}
function pf(e, t, n) {
  var r = !1,
    l = Ut,
    s = t.contextType
  return (
    typeof s == 'object' && s !== null
      ? (s = He(s))
      : ((l = Re(t) ? Zt : Se.current),
        (r = t.contextTypes),
        (s = (r = r != null) ? Tn(e, l) : Ut)),
    (t = new t(n, s)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = rs),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    t
  )
}
function Ba(e, t, n, r) {
  ;((e = t.state),
    typeof t.componentWillReceiveProps == 'function' &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && rs.enqueueReplaceState(t, t.state, null))
}
function Ni(e, t, n, r) {
  var l = e.stateNode
  ;((l.props = n), (l.state = e.memoizedState), (l.refs = {}), jo(e))
  var s = t.contextType
  ;(typeof s == 'object' && s !== null
    ? (l.context = He(s))
    : ((s = Re(t) ? Zt : Se.current), (l.context = Tn(e, s))),
    (l.state = e.memoizedState),
    (s = t.getDerivedStateFromProps),
    typeof s == 'function' && (ji(e, t, s, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == 'function' ||
      typeof l.getSnapshotBeforeUpdate == 'function' ||
      (typeof l.UNSAFE_componentWillMount != 'function' &&
        typeof l.componentWillMount != 'function') ||
      ((t = l.state),
      typeof l.componentWillMount == 'function' && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == 'function' &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && rs.enqueueReplaceState(l, l.state, null),
      Dl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == 'function' && (e.flags |= 4194308))
}
function An(e, t) {
  try {
    var n = '',
      r = t
    do ((n += tp(r)), (r = r.return))
    while (r)
    var l = n
  } catch (s) {
    l =
      `
Error generating stack: ` +
      s.message +
      `
` +
      s.stack
  }
  return { value: e, source: t, stack: l, digest: null }
}
function $s(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null }
}
function Pi(e, t) {
  try {
    console.error(t.value)
  } catch (n) {
    setTimeout(function () {
      throw n
    })
  }
}
var _h = typeof WeakMap == 'function' ? WeakMap : Map
function hf(e, t, n) {
  ;((n = dt(-1, n)), (n.tag = 3), (n.payload = { element: null }))
  var r = t.value
  return (
    (n.callback = function () {
      ;(Wl || ((Wl = !0), (Di = r)), Pi(e, t))
    }),
    n
  )
}
function mf(e, t, n) {
  ;((n = dt(-1, n)), (n.tag = 3))
  var r = e.type.getDerivedStateFromError
  if (typeof r == 'function') {
    var l = t.value
    ;((n.payload = function () {
      return r(l)
    }),
      (n.callback = function () {
        Pi(e, t)
      }))
  }
  var s = e.stateNode
  return (
    s !== null &&
      typeof s.componentDidCatch == 'function' &&
      (n.callback = function () {
        ;(Pi(e, t),
          typeof r != 'function' &&
            (It === null ? (It = new Set([this])) : It.add(this)))
        var i = t.stack
        this.componentDidCatch(t.value, { componentStack: i !== null ? i : '' })
      }),
    n
  )
}
function $a(e, t, n) {
  var r = e.pingCache
  if (r === null) {
    r = e.pingCache = new _h()
    var l = new Set()
    r.set(t, l)
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)))
  l.has(n) || (l.add(n), (e = Wh.bind(null, e, t, n)), t.then(e, e))
}
function Wa(e) {
  do {
    var t
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e
    e = e.return
  } while (e !== null)
  return null
}
function Ha(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = dt(-1, 1)), (t.tag = 2), Ot(n, t, 1))),
          (n.lanes |= 1)),
      e)
}
var Rh = vt.ReactCurrentOwner,
  Pe = !1
function ke(e, t, n, r) {
  t.child = e === null ? Hc(t, null, n, r) : On(t, e.child, n, r)
}
function Va(e, t, n, r, l) {
  n = n.render
  var s = t.ref
  return (
    Pn(t, l),
    (r = To(e, t, n, r, s, l)),
    (n = Lo()),
    e !== null && !Pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        gt(e, t, l))
      : (J && n && yo(t), (t.flags |= 1), ke(e, t, r, l), t.child)
  )
}
function Ka(e, t, n, r, l) {
  if (e === null) {
    var s = n.type
    return typeof s == 'function' &&
      !$o(s) &&
      s.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = s), gf(e, t, s, r, l))
      : ((e = yl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e))
  }
  if (((s = e.child), !(e.lanes & l))) {
    var i = s.memoizedProps
    if (
      ((n = n.compare), (n = n !== null ? n : wr), n(i, r) && e.ref === t.ref)
    )
      return gt(e, t, l)
  }
  return (
    (t.flags |= 1),
    (e = zt(s, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  )
}
function gf(e, t, n, r, l) {
  if (e !== null) {
    var s = e.memoizedProps
    if (wr(s, r) && e.ref === t.ref)
      if (((Pe = !1), (t.pendingProps = r = s), (e.lanes & l) !== 0))
        e.flags & 131072 && (Pe = !0)
      else return ((t.lanes = e.lanes), gt(e, t, l))
  }
  return _i(e, t, n, r, l)
}
function vf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    s = e !== null ? e.memoizedState : null
  if (r.mode === 'hidden')
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        H(kn, Ie),
        (Ie |= n))
    else {
      if (!(n & 1073741824))
        return (
          (e = s !== null ? s.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          H(kn, Ie),
          (Ie |= e),
          null
        )
      ;((t.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null,
      }),
        (r = s !== null ? s.baseLanes : n),
        H(kn, Ie),
        (Ie |= r))
    }
  else
    (s !== null ? ((r = s.baseLanes | n), (t.memoizedState = null)) : (r = n),
      H(kn, Ie),
      (Ie |= r))
  return (ke(e, t, l, n), t.child)
}
function yf(e, t) {
  var n = t.ref
  ;((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152))
}
function _i(e, t, n, r, l) {
  var s = Re(n) ? Zt : Se.current
  return (
    (s = Tn(t, s)),
    Pn(t, l),
    (n = To(e, t, n, r, s, l)),
    (r = Lo()),
    e !== null && !Pe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        gt(e, t, l))
      : (J && r && yo(t), (t.flags |= 1), ke(e, t, n, l), t.child)
  )
}
function Qa(e, t, n, r, l) {
  if (Re(n)) {
    var s = !0
    Ol(t)
  } else s = !1
  if ((Pn(t, l), t.stateNode === null))
    (ml(e, t), pf(t, n, r), Ni(t, n, r, l), (r = !0))
  else if (e === null) {
    var i = t.stateNode,
      o = t.memoizedProps
    i.props = o
    var u = i.context,
      c = n.contextType
    typeof c == 'object' && c !== null
      ? (c = He(c))
      : ((c = Re(n) ? Zt : Se.current), (c = Tn(t, c)))
    var f = n.getDerivedStateFromProps,
      d =
        typeof f == 'function' || typeof i.getSnapshotBeforeUpdate == 'function'
    ;(d ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((o !== r || u !== c) && Ba(t, i, r, c)),
      (kt = !1))
    var g = t.memoizedState
    ;((i.state = g),
      Dl(t, r, i, l),
      (u = t.memoizedState),
      o !== r || g !== u || _e.current || kt
        ? (typeof f == 'function' && (ji(t, n, f, r), (u = t.memoizedState)),
          (o = kt || Ma(t, n, o, r, g, u, c))
            ? (d ||
                (typeof i.UNSAFE_componentWillMount != 'function' &&
                  typeof i.componentWillMount != 'function') ||
                (typeof i.componentWillMount == 'function' &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == 'function' &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == 'function' && (t.flags |= 4194308))
            : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = c),
          (r = o))
        : (typeof i.componentDidMount == 'function' && (t.flags |= 4194308),
          (r = !1)))
  } else {
    ;((i = t.stateNode),
      Kc(e, t),
      (o = t.memoizedProps),
      (c = t.type === t.elementType ? o : Qe(t.type, o)),
      (i.props = c),
      (d = t.pendingProps),
      (g = i.context),
      (u = n.contextType),
      typeof u == 'object' && u !== null
        ? (u = He(u))
        : ((u = Re(n) ? Zt : Se.current), (u = Tn(t, u))))
    var k = n.getDerivedStateFromProps
    ;((f =
      typeof k == 'function' ||
      typeof i.getSnapshotBeforeUpdate == 'function') ||
      (typeof i.UNSAFE_componentWillReceiveProps != 'function' &&
        typeof i.componentWillReceiveProps != 'function') ||
      ((o !== d || g !== u) && Ba(t, i, r, u)),
      (kt = !1),
      (g = t.memoizedState),
      (i.state = g),
      Dl(t, r, i, l))
    var m = t.memoizedState
    o !== d || g !== m || _e.current || kt
      ? (typeof k == 'function' && (ji(t, n, k, r), (m = t.memoizedState)),
        (c = kt || Ma(t, n, c, r, g, m, u) || !1)
          ? (f ||
              (typeof i.UNSAFE_componentWillUpdate != 'function' &&
                typeof i.componentWillUpdate != 'function') ||
              (typeof i.componentWillUpdate == 'function' &&
                i.componentWillUpdate(r, m, u),
              typeof i.UNSAFE_componentWillUpdate == 'function' &&
                i.UNSAFE_componentWillUpdate(r, m, u)),
            typeof i.componentDidUpdate == 'function' && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == 'function' && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != 'function' ||
              (o === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != 'function' ||
              (o === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = m)),
        (i.props = r),
        (i.state = m),
        (i.context = u),
        (r = c))
      : (typeof i.componentDidUpdate != 'function' ||
          (o === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != 'function' ||
          (o === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1))
  }
  return Ri(e, t, n, r, s, l)
}
function Ri(e, t, n, r, l, s) {
  yf(e, t)
  var i = (t.flags & 128) !== 0
  if (!r && !i) return (l && La(t, n, !1), gt(e, t, s))
  ;((r = t.stateNode), (Rh.current = t))
  var o =
    i && typeof n.getDerivedStateFromError != 'function' ? null : r.render()
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = On(t, e.child, null, s)), (t.child = On(t, null, o, s)))
      : ke(e, t, o, s),
    (t.memoizedState = r.state),
    l && La(t, n, !0),
    t.child
  )
}
function xf(e) {
  var t = e.stateNode
  ;(t.pendingContext
    ? Ta(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ta(e, t.context, !1),
    No(e, t.containerInfo))
}
function ba(e, t, n, r, l) {
  return (Ln(), wo(l), (t.flags |= 256), ke(e, t, n, r), t.child)
}
var Ti = { dehydrated: null, treeContext: null, retryLane: 0 }
function Li(e) {
  return { baseLanes: e, cachePool: null, transitions: null }
}
function wf(e, t, n) {
  var r = t.pendingProps,
    l = X.current,
    s = !1,
    i = (t.flags & 128) !== 0,
    o
  if (
    ((o = i) ||
      (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    o
      ? ((s = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    H(X, l & 1),
    e === null)
  )
    return (
      Ci(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === '$!'
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          s
            ? ((r = t.mode),
              (s = t.child),
              (i = { mode: 'hidden', children: i }),
              !(r & 1) && s !== null
                ? ((s.childLanes = 0), (s.pendingProps = i))
                : (s = is(i, r, 0, null)),
              (e = Xt(e, r, n, null)),
              (s.return = t),
              (e.return = t),
              (s.sibling = e),
              (t.child = s),
              (t.child.memoizedState = Li(n)),
              (t.memoizedState = Ti),
              e)
            : Ao(t, i))
    )
  if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null)))
    return Th(e, t, i, r, o, l, n)
  if (s) {
    ;((s = r.fallback), (i = t.mode), (l = e.child), (o = l.sibling))
    var u = { mode: 'hidden', children: r.children }
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = zt(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      o !== null ? (s = zt(o, s)) : ((s = Xt(s, i, n, null)), (s.flags |= 2)),
      (s.return = t),
      (r.return = t),
      (r.sibling = s),
      (t.child = r),
      (r = s),
      (s = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Li(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (s.memoizedState = i),
      (s.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ti),
      r
    )
  }
  return (
    (s = e.child),
    (e = s.sibling),
    (r = zt(s, { mode: 'visible', children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  )
}
function Ao(e, t) {
  return (
    (t = is({ mode: 'visible', children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  )
}
function nl(e, t, n, r) {
  return (
    r !== null && wo(r),
    On(t, e.child, null, n),
    (e = Ao(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  )
}
function Th(e, t, n, r, l, s, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = $s(Error(N(422)))), nl(e, t, i, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((s = r.fallback),
          (l = t.mode),
          (r = is({ mode: 'visible', children: r.children }, l, 0, null)),
          (s = Xt(s, l, i, null)),
          (s.flags |= 2),
          (r.return = t),
          (s.return = t),
          (r.sibling = s),
          (t.child = r),
          t.mode & 1 && On(t, e.child, null, i),
          (t.child.memoizedState = Li(i)),
          (t.memoizedState = Ti),
          s)
  if (!(t.mode & 1)) return nl(e, t, i, null)
  if (l.data === '$!') {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst
    return (
      (r = o),
      (s = Error(N(419))),
      (r = $s(s, r, void 0)),
      nl(e, t, i, r)
    )
  }
  if (((o = (i & e.childLanes) !== 0), Pe || o)) {
    if (((r = fe), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2
          break
        case 16:
          l = 8
          break
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32
          break
        case 536870912:
          l = 268435456
          break
        default:
          l = 0
      }
      ;((l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== s.retryLane &&
          ((s.retryLane = l), mt(e, l), Xe(r, e, l, -1)))
    }
    return (Bo(), (r = $s(Error(N(421)))), nl(e, t, i, r))
  }
  return l.data === '$?'
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Hh.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = s.treeContext),
      (Ae = Lt(l.nextSibling)),
      (ze = t),
      (J = !0),
      (Je = null),
      e !== null &&
        ((Me[Be++] = ct),
        (Me[Be++] = ft),
        (Me[Be++] = en),
        (ct = e.id),
        (ft = e.overflow),
        (en = t)),
      (t = Ao(t, r.children)),
      (t.flags |= 4096),
      t)
}
function Ja(e, t, n) {
  e.lanes |= t
  var r = e.alternate
  ;(r !== null && (r.lanes |= t), Ei(e.return, t, n))
}
function Ws(e, t, n, r, l) {
  var s = e.memoizedState
  s === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((s.isBackwards = t),
      (s.rendering = null),
      (s.renderingStartTime = 0),
      (s.last = r),
      (s.tail = n),
      (s.tailMode = l))
}
function Sf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    s = r.tail
  if ((ke(e, t, r.children, n), (r = X.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128))
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ja(e, n, t)
        else if (e.tag === 19) Ja(e, n, t)
        else if (e.child !== null) {
          ;((e.child.return = e), (e = e.child))
          continue
        }
        if (e === t) break e
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e
          e = e.return
        }
        ;((e.sibling.return = e.return), (e = e.sibling))
      }
    r &= 1
  }
  if ((H(X, r), !(t.mode & 1))) t.memoizedState = null
  else
    switch (l) {
      case 'forwards':
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && Ul(e) === null && (l = n),
            (n = n.sibling))
        ;((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Ws(t, !1, l, n, s))
        break
      case 'backwards':
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Ul(e) === null)) {
            t.child = l
            break
          }
          ;((e = l.sibling), (l.sibling = n), (n = l), (l = e))
        }
        Ws(t, !0, n, null, s)
        break
      case 'together':
        Ws(t, !1, null, null, void 0)
        break
      default:
        t.memoizedState = null
    }
  return t.child
}
function ml(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2))
}
function gt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (nn |= t.lanes),
    !(n & t.childLanes))
  )
    return null
  if (e !== null && t.child !== e.child) throw Error(N(153))
  if (t.child !== null) {
    for (
      e = t.child, n = zt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      ((e = e.sibling), (n = n.sibling = zt(e, e.pendingProps)), (n.return = t))
    n.sibling = null
  }
  return t.child
}
function Lh(e, t, n) {
  switch (t.tag) {
    case 3:
      ;(xf(t), Ln())
      break
    case 5:
      Qc(t)
      break
    case 1:
      Re(t.type) && Ol(t)
      break
    case 4:
      No(t, t.stateNode.containerInfo)
      break
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value
      ;(H(zl, r._currentValue), (r._currentValue = l))
      break
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (H(X, X.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? wf(e, t, n)
            : (H(X, X.current & 1),
              (e = gt(e, t, n)),
              e !== null ? e.sibling : null)
      H(X, X.current & 1)
      break
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Sf(e, t, n)
        t.flags |= 128
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        H(X, X.current),
        r)
      )
        break
      return null
    case 22:
    case 23:
      return ((t.lanes = 0), vf(e, t, n))
  }
  return gt(e, t, n)
}
var kf, Oi, Cf, Ef
kf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
    else if (n.tag !== 4 && n.child !== null) {
      ;((n.child.return = n), (n = n.child))
      continue
    }
    if (n === t) break
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return
      n = n.return
    }
    ;((n.sibling.return = n.return), (n = n.sibling))
  }
}
Oi = function () {}
Cf = function (e, t, n, r) {
  var l = e.memoizedProps
  if (l !== r) {
    ;((e = t.stateNode), bt(ot.current))
    var s = null
    switch (n) {
      case 'input':
        ;((l = ei(e, l)), (r = ei(e, r)), (s = []))
        break
      case 'select':
        ;((l = Z({}, l, { value: void 0 })),
          (r = Z({}, r, { value: void 0 })),
          (s = []))
        break
      case 'textarea':
        ;((l = ri(e, l)), (r = ri(e, r)), (s = []))
        break
      default:
        typeof l.onClick != 'function' &&
          typeof r.onClick == 'function' &&
          (e.onclick = Tl)
    }
    si(n, r)
    var i
    n = null
    for (c in l)
      if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
        if (c === 'style') {
          var o = l[c]
          for (i in o) o.hasOwnProperty(i) && (n || (n = {}), (n[i] = ''))
        } else
          c !== 'dangerouslySetInnerHTML' &&
            c !== 'children' &&
            c !== 'suppressContentEditableWarning' &&
            c !== 'suppressHydrationWarning' &&
            c !== 'autoFocus' &&
            (pr.hasOwnProperty(c) ? s || (s = []) : (s = s || []).push(c, null))
    for (c in r) {
      var u = r[c]
      if (
        ((o = l != null ? l[c] : void 0),
        r.hasOwnProperty(c) && u !== o && (u != null || o != null))
      )
        if (c === 'style')
          if (o) {
            for (i in o)
              !o.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ''))
            for (i in u)
              u.hasOwnProperty(i) &&
                o[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]))
          } else (n || (s || (s = []), s.push(c, n)), (n = u))
        else
          c === 'dangerouslySetInnerHTML'
            ? ((u = u ? u.__html : void 0),
              (o = o ? o.__html : void 0),
              u != null && o !== u && (s = s || []).push(c, u))
            : c === 'children'
              ? (typeof u != 'string' && typeof u != 'number') ||
                (s = s || []).push(c, '' + u)
              : c !== 'suppressContentEditableWarning' &&
                c !== 'suppressHydrationWarning' &&
                (pr.hasOwnProperty(c)
                  ? (u != null && c === 'onScroll' && V('scroll', e),
                    s || o === u || (s = []))
                  : (s = s || []).push(c, u))
    }
    n && (s = s || []).push('style', n)
    var c = s
    ;(t.updateQueue = c) && (t.flags |= 4)
  }
}
Ef = function (e, t, n, r) {
  n !== r && (t.flags |= 4)
}
function Yn(e, t) {
  if (!J)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling))
        n === null ? (e.tail = null) : (n.sibling = null)
        break
      case 'collapsed':
        n = e.tail
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling))
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null)
    }
}
function ye(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling))
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling))
  return ((e.subtreeFlags |= r), (e.childLanes = n), t)
}
function Oh(e, t, n) {
  var r = t.pendingProps
  switch ((xo(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ye(t), null)
    case 1:
      return (Re(t.type) && Ll(), ye(t), null)
    case 3:
      return (
        (r = t.stateNode),
        In(),
        K(_e),
        K(Se),
        _o(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (el(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Je !== null && (Bi(Je), (Je = null)))),
        Oi(e, t),
        ye(t),
        null
      )
    case 5:
      Po(t)
      var l = bt(jr.current)
      if (((n = t.type), e !== null && t.stateNode != null))
        (Cf(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)))
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166))
          return (ye(t), null)
        }
        if (((e = bt(ot.current)), el(t))) {
          ;((r = t.stateNode), (n = t.type))
          var s = t.memoizedProps
          switch (((r[st] = t), (r[Cr] = s), (e = (t.mode & 1) !== 0), n)) {
            case 'dialog':
              ;(V('cancel', r), V('close', r))
              break
            case 'iframe':
            case 'object':
            case 'embed':
              V('load', r)
              break
            case 'video':
            case 'audio':
              for (l = 0; l < rr.length; l++) V(rr[l], r)
              break
            case 'source':
              V('error', r)
              break
            case 'img':
            case 'image':
            case 'link':
              ;(V('error', r), V('load', r))
              break
            case 'details':
              V('toggle', r)
              break
            case 'input':
              ;(ra(r, s), V('invalid', r))
              break
            case 'select':
              ;((r._wrapperState = { wasMultiple: !!s.multiple }),
                V('invalid', r))
              break
            case 'textarea':
              ;(sa(r, s), V('invalid', r))
          }
          ;(si(n, s), (l = null))
          for (var i in s)
            if (s.hasOwnProperty(i)) {
              var o = s[i]
              i === 'children'
                ? typeof o == 'string'
                  ? r.textContent !== o &&
                    (s.suppressHydrationWarning !== !0 &&
                      Zr(r.textContent, o, e),
                    (l = ['children', o]))
                  : typeof o == 'number' &&
                    r.textContent !== '' + o &&
                    (s.suppressHydrationWarning !== !0 &&
                      Zr(r.textContent, o, e),
                    (l = ['children', '' + o]))
                : pr.hasOwnProperty(i) &&
                  o != null &&
                  i === 'onScroll' &&
                  V('scroll', r)
            }
          switch (n) {
            case 'input':
              ;(Kr(r), la(r, s, !0))
              break
            case 'textarea':
              ;(Kr(r), ia(r))
              break
            case 'select':
            case 'option':
              break
            default:
              typeof s.onClick == 'function' && (r.onclick = Tl)
          }
          ;((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4))
        } else {
          ;((i = l.nodeType === 9 ? l : l.ownerDocument),
            e === 'http://www.w3.org/1999/xhtml' && (e = Yu(n)),
            e === 'http://www.w3.org/1999/xhtml'
              ? n === 'script'
                ? ((e = i.createElement('div')),
                  (e.innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == 'string'
                  ? (e = i.createElement(n, { is: r.is }))
                  : ((e = i.createElement(n)),
                    n === 'select' &&
                      ((i = e),
                      r.multiple
                        ? (i.multiple = !0)
                        : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[st] = t),
            (e[Cr] = r),
            kf(e, t, !1, !1),
            (t.stateNode = e))
          e: {
            switch (((i = ii(n, r)), n)) {
              case 'dialog':
                ;(V('cancel', e), V('close', e), (l = r))
                break
              case 'iframe':
              case 'object':
              case 'embed':
                ;(V('load', e), (l = r))
                break
              case 'video':
              case 'audio':
                for (l = 0; l < rr.length; l++) V(rr[l], e)
                l = r
                break
              case 'source':
                ;(V('error', e), (l = r))
                break
              case 'img':
              case 'image':
              case 'link':
                ;(V('error', e), V('load', e), (l = r))
                break
              case 'details':
                ;(V('toggle', e), (l = r))
                break
              case 'input':
                ;(ra(e, r), (l = ei(e, r)), V('invalid', e))
                break
              case 'option':
                l = r
                break
              case 'select':
                ;((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Z({}, r, { value: void 0 })),
                  V('invalid', e))
                break
              case 'textarea':
                ;(sa(e, r), (l = ri(e, r)), V('invalid', e))
                break
              default:
                l = r
            }
            ;(si(n, l), (o = l))
            for (s in o)
              if (o.hasOwnProperty(s)) {
                var u = o[s]
                s === 'style'
                  ? ec(e, u)
                  : s === 'dangerouslySetInnerHTML'
                    ? ((u = u ? u.__html : void 0), u != null && Gu(e, u))
                    : s === 'children'
                      ? typeof u == 'string'
                        ? (n !== 'textarea' || u !== '') && hr(e, u)
                        : typeof u == 'number' && hr(e, '' + u)
                      : s !== 'suppressContentEditableWarning' &&
                        s !== 'suppressHydrationWarning' &&
                        s !== 'autoFocus' &&
                        (pr.hasOwnProperty(s)
                          ? u != null && s === 'onScroll' && V('scroll', e)
                          : u != null && ro(e, s, u, i))
              }
            switch (n) {
              case 'input':
                ;(Kr(e), la(e, r, !1))
                break
              case 'textarea':
                ;(Kr(e), ia(e))
                break
              case 'option':
                r.value != null && e.setAttribute('value', '' + Dt(r.value))
                break
              case 'select':
                ;((e.multiple = !!r.multiple),
                  (s = r.value),
                  s != null
                    ? Cn(e, !!r.multiple, s, !1)
                    : r.defaultValue != null &&
                      Cn(e, !!r.multiple, r.defaultValue, !0))
                break
              default:
                typeof l.onClick == 'function' && (e.onclick = Tl)
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus
                break e
              case 'img':
                r = !0
                break e
              default:
                r = !1
            }
          }
          r && (t.flags |= 4)
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152))
      }
      return (ye(t), null)
    case 6:
      if (e && t.stateNode != null) Ef(e, t, e.memoizedProps, r)
      else {
        if (typeof r != 'string' && t.stateNode === null) throw Error(N(166))
        if (((n = bt(jr.current)), bt(ot.current), el(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[st] = t),
            (s = r.nodeValue !== n) && ((e = ze), e !== null))
          )
            switch (e.tag) {
              case 3:
                Zr(r.nodeValue, n, (e.mode & 1) !== 0)
                break
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Zr(r.nodeValue, n, (e.mode & 1) !== 0)
            }
          s && (t.flags |= 4)
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[st] = t),
            (t.stateNode = r))
      }
      return (ye(t), null)
    case 13:
      if (
        (K(X),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (J && Ae !== null && t.mode & 1 && !(t.flags & 128))
          ($c(), Ln(), (t.flags |= 98560), (s = !1))
        else if (((s = el(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!s) throw Error(N(318))
            if (
              ((s = t.memoizedState),
              (s = s !== null ? s.dehydrated : null),
              !s)
            )
              throw Error(N(317))
            s[st] = t
          } else
            (Ln(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4))
          ;(ye(t), (s = !1))
        } else (Je !== null && (Bi(Je), (Je = null)), (s = !0))
        if (!s) return t.flags & 65536 ? t : null
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || X.current & 1 ? ue === 0 && (ue = 3) : Bo())),
          t.updateQueue !== null && (t.flags |= 4),
          ye(t),
          null)
    case 4:
      return (
        In(),
        Oi(e, t),
        e === null && Sr(t.stateNode.containerInfo),
        ye(t),
        null
      )
    case 10:
      return (Co(t.type._context), ye(t), null)
    case 17:
      return (Re(t.type) && Ll(), ye(t), null)
    case 19:
      if ((K(X), (s = t.memoizedState), s === null)) return (ye(t), null)
      if (((r = (t.flags & 128) !== 0), (i = s.rendering), i === null))
        if (r) Yn(s, !1)
        else {
          if (ue !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Ul(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Yn(s, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  ((s = n),
                    (e = r),
                    (s.flags &= 14680066),
                    (i = s.alternate),
                    i === null
                      ? ((s.childLanes = 0),
                        (s.lanes = e),
                        (s.child = null),
                        (s.subtreeFlags = 0),
                        (s.memoizedProps = null),
                        (s.memoizedState = null),
                        (s.updateQueue = null),
                        (s.dependencies = null),
                        (s.stateNode = null))
                      : ((s.childLanes = i.childLanes),
                        (s.lanes = i.lanes),
                        (s.child = i.child),
                        (s.subtreeFlags = 0),
                        (s.deletions = null),
                        (s.memoizedProps = i.memoizedProps),
                        (s.memoizedState = i.memoizedState),
                        (s.updateQueue = i.updateQueue),
                        (s.type = i.type),
                        (e = i.dependencies),
                        (s.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling))
                return (H(X, (X.current & 1) | 2), t.child)
              }
              e = e.sibling
            }
          s.tail !== null &&
            re() > zn &&
            ((t.flags |= 128), (r = !0), Yn(s, !1), (t.lanes = 4194304))
        }
      else {
        if (!r)
          if (((e = Ul(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Yn(s, !0),
              s.tail === null && s.tailMode === 'hidden' && !i.alternate && !J)
            )
              return (ye(t), null)
          } else
            2 * re() - s.renderingStartTime > zn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Yn(s, !1), (t.lanes = 4194304))
        s.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = s.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (s.last = i))
      }
      return s.tail !== null
        ? ((t = s.tail),
          (s.rendering = t),
          (s.tail = t.sibling),
          (s.renderingStartTime = re()),
          (t.sibling = null),
          (n = X.current),
          H(X, r ? (n & 1) | 2 : n & 1),
          t)
        : (ye(t), null)
    case 22:
    case 23:
      return (
        Mo(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ie & 1073741824 && (ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ye(t),
        null
      )
    case 24:
      return null
    case 25:
      return null
  }
  throw Error(N(156, t.tag))
}
function Ih(e, t) {
  switch ((xo(t), t.tag)) {
    case 1:
      return (
        Re(t.type) && Ll(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 3:
      return (
        In(),
        K(_e),
        K(Se),
        _o(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 5:
      return (Po(t), null)
    case 13:
      if ((K(X), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(N(340))
        Ln()
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      )
    case 19:
      return (K(X), null)
    case 4:
      return (In(), null)
    case 10:
      return (Co(t.type._context), null)
    case 22:
    case 23:
      return (Mo(), null)
    case 24:
      return null
    default:
      return null
  }
}
var rl = !1,
  xe = !1,
  Ah = typeof WeakSet == 'function' ? WeakSet : Set,
  O = null
function Sn(e, t) {
  var n = e.ref
  if (n !== null)
    if (typeof n == 'function')
      try {
        n(null)
      } catch (r) {
        ee(e, t, r)
      }
    else n.current = null
}
function Ii(e, t, n) {
  try {
    n()
  } catch (r) {
    ee(e, t, r)
  }
}
var qa = !1
function zh(e, t) {
  if (((gi = Pl), (e = _c()), vo(e))) {
    if ('selectionStart' in e)
      var n = { start: e.selectionStart, end: e.selectionEnd }
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window
        var r = n.getSelection && n.getSelection()
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode
          var l = r.anchorOffset,
            s = r.focusNode
          r = r.focusOffset
          try {
            ;(n.nodeType, s.nodeType)
          } catch {
            n = null
            break e
          }
          var i = 0,
            o = -1,
            u = -1,
            c = 0,
            f = 0,
            d = e,
            g = null
          t: for (;;) {
            for (
              var k;
              d !== n || (l !== 0 && d.nodeType !== 3) || (o = i + l),
                d !== s || (r !== 0 && d.nodeType !== 3) || (u = i + r),
                d.nodeType === 3 && (i += d.nodeValue.length),
                (k = d.firstChild) !== null;

            )
              ((g = d), (d = k))
            for (;;) {
              if (d === e) break t
              if (
                (g === n && ++c === l && (o = i),
                g === s && ++f === r && (u = i),
                (k = d.nextSibling) !== null)
              )
                break
              ;((d = g), (g = d.parentNode))
            }
            d = k
          }
          n = o === -1 || u === -1 ? null : { start: o, end: u }
        } else n = null
      }
    n = n || { start: 0, end: 0 }
  } else n = null
  for (vi = { focusedElem: e, selectionRange: n }, Pl = !1, O = t; O !== null; )
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (O = e))
    else
      for (; O !== null; ) {
        t = O
        try {
          var m = t.alternate
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break
              case 1:
                if (m !== null) {
                  var y = m.memoizedProps,
                    x = m.memoizedState,
                    h = t.stateNode,
                    p = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : Qe(t.type, y),
                      x
                    )
                  h.__reactInternalSnapshotBeforeUpdate = p
                }
                break
              case 3:
                var v = t.stateNode.containerInfo
                v.nodeType === 1
                  ? (v.textContent = '')
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement)
                break
              case 5:
              case 6:
              case 4:
              case 17:
                break
              default:
                throw Error(N(163))
            }
        } catch (C) {
          ee(t, t.return, C)
        }
        if (((e = t.sibling), e !== null)) {
          ;((e.return = t.return), (O = e))
          break
        }
        O = t.return
      }
  return ((m = qa), (qa = !1), m)
}
function cr(e, t, n) {
  var r = t.updateQueue
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next)
    do {
      if ((l.tag & e) === e) {
        var s = l.destroy
        ;((l.destroy = void 0), s !== void 0 && Ii(t, n, s))
      }
      l = l.next
    } while (l !== r)
  }
}
function ls(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next)
    do {
      if ((n.tag & e) === e) {
        var r = n.create
        n.destroy = r()
      }
      n = n.next
    } while (n !== t)
  }
}
function Ai(e) {
  var t = e.ref
  if (t !== null) {
    var n = e.stateNode
    switch (e.tag) {
      case 5:
        e = n
        break
      default:
        e = n
    }
    typeof t == 'function' ? t(e) : (t.current = e)
  }
}
function jf(e) {
  var t = e.alternate
  ;(t !== null && ((e.alternate = null), jf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[st], delete t[Cr], delete t[wi], delete t[vh], delete t[yh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null))
}
function Nf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Xa(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Nf(e.return)) return null
      e = e.return
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e
      ;((e.child.return = e), (e = e.child))
    }
    if (!(e.flags & 2)) return e.stateNode
  }
}
function zi(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Tl)))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (zi(e, t, n), e = e.sibling; e !== null; )
      (zi(e, t, n), (e = e.sibling))
}
function Fi(e, t, n) {
  var r = e.tag
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e))
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Fi(e, t, n), e = e.sibling; e !== null; )
      (Fi(e, t, n), (e = e.sibling))
}
var pe = null,
  be = !1
function wt(e, t, n) {
  for (n = n.child; n !== null; ) (Pf(e, t, n), (n = n.sibling))
}
function Pf(e, t, n) {
  if (it && typeof it.onCommitFiberUnmount == 'function')
    try {
      it.onCommitFiberUnmount(Xl, n)
    } catch {}
  switch (n.tag) {
    case 5:
      xe || Sn(n, t)
    case 6:
      var r = pe,
        l = be
      ;((pe = null),
        wt(e, t, n),
        (pe = r),
        (be = l),
        pe !== null &&
          (be
            ? ((e = pe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : pe.removeChild(n.stateNode)))
      break
    case 18:
      pe !== null &&
        (be
          ? ((e = pe),
            (n = n.stateNode),
            e.nodeType === 8
              ? zs(e.parentNode, n)
              : e.nodeType === 1 && zs(e, n),
            yr(e))
          : zs(pe, n.stateNode))
      break
    case 4:
      ;((r = pe),
        (l = be),
        (pe = n.stateNode.containerInfo),
        (be = !0),
        wt(e, t, n),
        (pe = r),
        (be = l))
      break
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !xe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next
        do {
          var s = l,
            i = s.destroy
          ;((s = s.tag),
            i !== void 0 && (s & 2 || s & 4) && Ii(n, t, i),
            (l = l.next))
        } while (l !== r)
      }
      wt(e, t, n)
      break
    case 1:
      if (
        !xe &&
        (Sn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == 'function')
      )
        try {
          ;((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount())
        } catch (o) {
          ee(n, t, o)
        }
      wt(e, t, n)
      break
    case 21:
      wt(e, t, n)
      break
    case 22:
      n.mode & 1
        ? ((xe = (r = xe) || n.memoizedState !== null), wt(e, t, n), (xe = r))
        : wt(e, t, n)
      break
    default:
      wt(e, t, n)
  }
}
function Ya(e) {
  var t = e.updateQueue
  if (t !== null) {
    e.updateQueue = null
    var n = e.stateNode
    ;(n === null && (n = e.stateNode = new Ah()),
      t.forEach(function (r) {
        var l = Vh.bind(null, e, r)
        n.has(r) || (n.add(r), r.then(l, l))
      }))
  }
}
function Ke(e, t) {
  var n = t.deletions
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r]
      try {
        var s = e,
          i = t,
          o = i
        e: for (; o !== null; ) {
          switch (o.tag) {
            case 5:
              ;((pe = o.stateNode), (be = !1))
              break e
            case 3:
              ;((pe = o.stateNode.containerInfo), (be = !0))
              break e
            case 4:
              ;((pe = o.stateNode.containerInfo), (be = !0))
              break e
          }
          o = o.return
        }
        if (pe === null) throw Error(N(160))
        ;(Pf(s, i, l), (pe = null), (be = !1))
        var u = l.alternate
        ;(u !== null && (u.return = null), (l.return = null))
      } catch (c) {
        ee(l, t, c)
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (_f(t, e), (t = t.sibling))
}
function _f(e, t) {
  var n = e.alternate,
    r = e.flags
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ke(t, e), nt(e), r & 4)) {
        try {
          ;(cr(3, e, e.return), ls(3, e))
        } catch (y) {
          ee(e, e.return, y)
        }
        try {
          cr(5, e, e.return)
        } catch (y) {
          ee(e, e.return, y)
        }
      }
      break
    case 1:
      ;(Ke(t, e), nt(e), r & 512 && n !== null && Sn(n, n.return))
      break
    case 5:
      if (
        (Ke(t, e),
        nt(e),
        r & 512 && n !== null && Sn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode
        try {
          hr(l, '')
        } catch (y) {
          ee(e, e.return, y)
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var s = e.memoizedProps,
          i = n !== null ? n.memoizedProps : s,
          o = e.type,
          u = e.updateQueue
        if (((e.updateQueue = null), u !== null))
          try {
            ;(o === 'input' && s.type === 'radio' && s.name != null && qu(l, s),
              ii(o, i))
            var c = ii(o, s)
            for (i = 0; i < u.length; i += 2) {
              var f = u[i],
                d = u[i + 1]
              f === 'style'
                ? ec(l, d)
                : f === 'dangerouslySetInnerHTML'
                  ? Gu(l, d)
                  : f === 'children'
                    ? hr(l, d)
                    : ro(l, f, d, c)
            }
            switch (o) {
              case 'input':
                ti(l, s)
                break
              case 'textarea':
                Xu(l, s)
                break
              case 'select':
                var g = l._wrapperState.wasMultiple
                l._wrapperState.wasMultiple = !!s.multiple
                var k = s.value
                k != null
                  ? Cn(l, !!s.multiple, k, !1)
                  : g !== !!s.multiple &&
                    (s.defaultValue != null
                      ? Cn(l, !!s.multiple, s.defaultValue, !0)
                      : Cn(l, !!s.multiple, s.multiple ? [] : '', !1))
            }
            l[Cr] = s
          } catch (y) {
            ee(e, e.return, y)
          }
      }
      break
    case 6:
      if ((Ke(t, e), nt(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162))
        ;((l = e.stateNode), (s = e.memoizedProps))
        try {
          l.nodeValue = s
        } catch (y) {
          ee(e, e.return, y)
        }
      }
      break
    case 3:
      if (
        (Ke(t, e), nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          yr(t.containerInfo)
        } catch (y) {
          ee(e, e.return, y)
        }
      break
    case 4:
      ;(Ke(t, e), nt(e))
      break
    case 13:
      ;(Ke(t, e),
        nt(e),
        (l = e.child),
        l.flags & 8192 &&
          ((s = l.memoizedState !== null),
          (l.stateNode.isHidden = s),
          !s ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Do = re())),
        r & 4 && Ya(e))
      break
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((xe = (c = xe) || f), Ke(t, e), (xe = c)) : Ke(t, e),
        nt(e),
        r & 8192)
      ) {
        if (
          ((c = e.memoizedState !== null),
          (e.stateNode.isHidden = c) && !f && e.mode & 1)
        )
          for (O = e, f = e.child; f !== null; ) {
            for (d = O = f; O !== null; ) {
              switch (((g = O), (k = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  cr(4, g, g.return)
                  break
                case 1:
                  Sn(g, g.return)
                  var m = g.stateNode
                  if (typeof m.componentWillUnmount == 'function') {
                    ;((r = g), (n = g.return))
                    try {
                      ;((t = r),
                        (m.props = t.memoizedProps),
                        (m.state = t.memoizedState),
                        m.componentWillUnmount())
                    } catch (y) {
                      ee(r, n, y)
                    }
                  }
                  break
                case 5:
                  Sn(g, g.return)
                  break
                case 22:
                  if (g.memoizedState !== null) {
                    Za(d)
                    continue
                  }
              }
              k !== null ? ((k.return = g), (O = k)) : Za(d)
            }
            f = f.sibling
          }
        e: for (f = null, d = e; ; ) {
          if (d.tag === 5) {
            if (f === null) {
              f = d
              try {
                ;((l = d.stateNode),
                  c
                    ? ((s = l.style),
                      typeof s.setProperty == 'function'
                        ? s.setProperty('display', 'none', 'important')
                        : (s.display = 'none'))
                    : ((o = d.stateNode),
                      (u = d.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty('display')
                          ? u.display
                          : null),
                      (o.style.display = Zu('display', i))))
              } catch (y) {
                ee(e, e.return, y)
              }
            }
          } else if (d.tag === 6) {
            if (f === null)
              try {
                d.stateNode.nodeValue = c ? '' : d.memoizedProps
              } catch (y) {
                ee(e, e.return, y)
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            ;((d.child.return = d), (d = d.child))
            continue
          }
          if (d === e) break e
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e
            ;(f === d && (f = null), (d = d.return))
          }
          ;(f === d && (f = null),
            (d.sibling.return = d.return),
            (d = d.sibling))
        }
      }
      break
    case 19:
      ;(Ke(t, e), nt(e), r & 4 && Ya(e))
      break
    case 21:
      break
    default:
      ;(Ke(t, e), nt(e))
  }
}
function nt(e) {
  var t = e.flags
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Nf(n)) {
            var r = n
            break e
          }
          n = n.return
        }
        throw Error(N(160))
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode
          r.flags & 32 && (hr(l, ''), (r.flags &= -33))
          var s = Xa(e)
          Fi(e, s, l)
          break
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            o = Xa(e)
          zi(e, o, i)
          break
        default:
          throw Error(N(161))
      }
    } catch (u) {
      ee(e, e.return, u)
    }
    e.flags &= -3
  }
  t & 4096 && (e.flags &= -4097)
}
function Fh(e, t, n) {
  ;((O = e), Rf(e))
}
function Rf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var l = O,
      s = l.child
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || rl
      if (!i) {
        var o = l.alternate,
          u = (o !== null && o.memoizedState !== null) || xe
        o = rl
        var c = xe
        if (((rl = i), (xe = u) && !c))
          for (O = l; O !== null; )
            ((i = O),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? eu(l)
                : u !== null
                  ? ((u.return = i), (O = u))
                  : eu(l))
        for (; s !== null; ) ((O = s), Rf(s), (s = s.sibling))
        ;((O = l), (rl = o), (xe = c))
      }
      Ga(e)
    } else
      l.subtreeFlags & 8772 && s !== null ? ((s.return = l), (O = s)) : Ga(e)
  }
}
function Ga(e) {
  for (; O !== null; ) {
    var t = O
    if (t.flags & 8772) {
      var n = t.alternate
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              xe || ls(5, t)
              break
            case 1:
              var r = t.stateNode
              if (t.flags & 4 && !xe)
                if (n === null) r.componentDidMount()
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Qe(t.type, n.memoizedProps)
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  )
                }
              var s = t.updateQueue
              s !== null && Fa(t, s, r)
              break
            case 3:
              var i = t.updateQueue
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode
                      break
                    case 1:
                      n = t.child.stateNode
                  }
                Fa(t, i, n)
              }
              break
            case 5:
              var o = t.stateNode
              if (n === null && t.flags & 4) {
                n = o
                var u = t.memoizedProps
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    u.autoFocus && n.focus()
                    break
                  case 'img':
                    u.src && (n.src = u.src)
                }
              }
              break
            case 6:
              break
            case 4:
              break
            case 12:
              break
            case 13:
              if (t.memoizedState === null) {
                var c = t.alternate
                if (c !== null) {
                  var f = c.memoizedState
                  if (f !== null) {
                    var d = f.dehydrated
                    d !== null && yr(d)
                  }
                }
              }
              break
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break
            default:
              throw Error(N(163))
          }
        xe || (t.flags & 512 && Ai(t))
      } catch (g) {
        ee(t, t.return, g)
      }
    }
    if (t === e) {
      O = null
      break
    }
    if (((n = t.sibling), n !== null)) {
      ;((n.return = t.return), (O = n))
      break
    }
    O = t.return
  }
}
function Za(e) {
  for (; O !== null; ) {
    var t = O
    if (t === e) {
      O = null
      break
    }
    var n = t.sibling
    if (n !== null) {
      ;((n.return = t.return), (O = n))
      break
    }
    O = t.return
  }
}
function eu(e) {
  for (; O !== null; ) {
    var t = O
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return
          try {
            ls(4, t)
          } catch (u) {
            ee(t, n, u)
          }
          break
        case 1:
          var r = t.stateNode
          if (typeof r.componentDidMount == 'function') {
            var l = t.return
            try {
              r.componentDidMount()
            } catch (u) {
              ee(t, l, u)
            }
          }
          var s = t.return
          try {
            Ai(t)
          } catch (u) {
            ee(t, s, u)
          }
          break
        case 5:
          var i = t.return
          try {
            Ai(t)
          } catch (u) {
            ee(t, i, u)
          }
      }
    } catch (u) {
      ee(t, t.return, u)
    }
    if (t === e) {
      O = null
      break
    }
    var o = t.sibling
    if (o !== null) {
      ;((o.return = t.return), (O = o))
      break
    }
    O = t.return
  }
}
var Dh = Math.ceil,
  $l = vt.ReactCurrentDispatcher,
  zo = vt.ReactCurrentOwner,
  We = vt.ReactCurrentBatchConfig,
  B = 0,
  fe = null,
  ie = null,
  me = 0,
  Ie = 0,
  kn = Bt(0),
  ue = 0,
  Rr = null,
  nn = 0,
  ss = 0,
  Fo = 0,
  fr = null,
  Ne = null,
  Do = 0,
  zn = 1 / 0,
  at = null,
  Wl = !1,
  Di = null,
  It = null,
  ll = !1,
  Nt = null,
  Hl = 0,
  dr = 0,
  Ui = null,
  gl = -1,
  vl = 0
function Ce() {
  return B & 6 ? re() : gl !== -1 ? gl : (gl = re())
}
function At(e) {
  return e.mode & 1
    ? B & 2 && me !== 0
      ? me & -me
      : wh.transition !== null
        ? (vl === 0 && (vl = dc()), vl)
        : ((e = W),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : xc(e.type))),
          e)
    : 1
}
function Xe(e, t, n, r) {
  if (50 < dr) throw ((dr = 0), (Ui = null), Error(N(185)))
  ;(Ir(e, n, r),
    (!(B & 2) || e !== fe) &&
      (e === fe && (!(B & 2) && (ss |= n), ue === 4 && Et(e, me)),
      Te(e, r),
      n === 1 && B === 0 && !(t.mode & 1) && ((zn = re() + 500), ts && $t())))
}
function Te(e, t) {
  var n = e.callbackNode
  wp(e, t)
  var r = Nl(e, e === fe ? me : 0)
  if (r === 0)
    (n !== null && ua(n), (e.callbackNode = null), (e.callbackPriority = 0))
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ua(n), t === 1))
      (e.tag === 0 ? xh(tu.bind(null, e)) : Uc(tu.bind(null, e)),
        mh(function () {
          !(B & 6) && $t()
        }),
        (n = null))
    else {
      switch (pc(r)) {
        case 1:
          n = ao
          break
        case 4:
          n = cc
          break
        case 16:
          n = jl
          break
        case 536870912:
          n = fc
          break
        default:
          n = jl
      }
      n = Df(n, Tf.bind(null, e))
    }
    ;((e.callbackPriority = t), (e.callbackNode = n))
  }
}
function Tf(e, t) {
  if (((gl = -1), (vl = 0), B & 6)) throw Error(N(327))
  var n = e.callbackNode
  if (_n() && e.callbackNode !== n) return null
  var r = Nl(e, e === fe ? me : 0)
  if (r === 0) return null
  if (r & 30 || r & e.expiredLanes || t) t = Vl(e, r)
  else {
    t = r
    var l = B
    B |= 2
    var s = Of()
    ;(fe !== e || me !== t) && ((at = null), (zn = re() + 500), qt(e, t))
    do
      try {
        Bh()
        break
      } catch (o) {
        Lf(e, o)
      }
    while (!0)
    ;(ko(),
      ($l.current = s),
      (B = l),
      ie !== null ? (t = 0) : ((fe = null), (me = 0), (t = ue)))
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = fi(e)), l !== 0 && ((r = l), (t = Mi(e, l)))), t === 1)
    )
      throw ((n = Rr), qt(e, 0), Et(e, r), Te(e, re()), n)
    if (t === 6) Et(e, r)
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Uh(l) &&
          ((t = Vl(e, r)),
          t === 2 && ((s = fi(e)), s !== 0 && ((r = s), (t = Mi(e, s)))),
          t === 1))
      )
        throw ((n = Rr), qt(e, 0), Et(e, r), Te(e, re()), n)
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345))
        case 2:
          Vt(e, Ne, at)
          break
        case 3:
          if (
            (Et(e, r), (r & 130023424) === r && ((t = Do + 500 - re()), 10 < t))
          ) {
            if (Nl(e, 0) !== 0) break
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              ;(Ce(), (e.pingedLanes |= e.suspendedLanes & l))
              break
            }
            e.timeoutHandle = xi(Vt.bind(null, e, Ne, at), t)
            break
          }
          Vt(e, Ne, at)
          break
        case 4:
          if ((Et(e, r), (r & 4194240) === r)) break
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - qe(r)
            ;((s = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~s))
          }
          if (
            ((r = l),
            (r = re() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Dh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = xi(Vt.bind(null, e, Ne, at), r)
            break
          }
          Vt(e, Ne, at)
          break
        case 5:
          Vt(e, Ne, at)
          break
        default:
          throw Error(N(329))
      }
    }
  }
  return (Te(e, re()), e.callbackNode === n ? Tf.bind(null, e) : null)
}
function Mi(e, t) {
  var n = fr
  return (
    e.current.memoizedState.isDehydrated && (qt(e, t).flags |= 256),
    (e = Vl(e, t)),
    e !== 2 && ((t = Ne), (Ne = n), t !== null && Bi(t)),
    e
  )
}
function Bi(e) {
  Ne === null ? (Ne = e) : Ne.push.apply(Ne, e)
}
function Uh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            s = l.getSnapshot
          l = l.value
          try {
            if (!Ye(s(), l)) return !1
          } catch {
            return !1
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n))
    else {
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0
        t = t.return
      }
      ;((t.sibling.return = t.return), (t = t.sibling))
    }
  }
  return !0
}
function Et(e, t) {
  for (
    t &= ~Fo,
      t &= ~ss,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - qe(t),
      r = 1 << n
    ;((e[n] = -1), (t &= ~r))
  }
}
function tu(e) {
  if (B & 6) throw Error(N(327))
  _n()
  var t = Nl(e, 0)
  if (!(t & 1)) return (Te(e, re()), null)
  var n = Vl(e, t)
  if (e.tag !== 0 && n === 2) {
    var r = fi(e)
    r !== 0 && ((t = r), (n = Mi(e, r)))
  }
  if (n === 1) throw ((n = Rr), qt(e, 0), Et(e, t), Te(e, re()), n)
  if (n === 6) throw Error(N(345))
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Vt(e, Ne, at),
    Te(e, re()),
    null
  )
}
function Uo(e, t) {
  var n = B
  B |= 1
  try {
    return e(t)
  } finally {
    ;((B = n), B === 0 && ((zn = re() + 500), ts && $t()))
  }
}
function rn(e) {
  Nt !== null && Nt.tag === 0 && !(B & 6) && _n()
  var t = B
  B |= 1
  var n = We.transition,
    r = W
  try {
    if (((We.transition = null), (W = 1), e)) return e()
  } finally {
    ;((W = r), (We.transition = n), (B = t), !(B & 6) && $t())
  }
}
function Mo() {
  ;((Ie = kn.current), K(kn))
}
function qt(e, t) {
  ;((e.finishedWork = null), (e.finishedLanes = 0))
  var n = e.timeoutHandle
  if ((n !== -1 && ((e.timeoutHandle = -1), hh(n)), ie !== null))
    for (n = ie.return; n !== null; ) {
      var r = n
      switch ((xo(r), r.tag)) {
        case 1:
          ;((r = r.type.childContextTypes), r != null && Ll())
          break
        case 3:
          ;(In(), K(_e), K(Se), _o())
          break
        case 5:
          Po(r)
          break
        case 4:
          In()
          break
        case 13:
          K(X)
          break
        case 19:
          K(X)
          break
        case 10:
          Co(r.type._context)
          break
        case 22:
        case 23:
          Mo()
      }
      n = n.return
    }
  if (
    ((fe = e),
    (ie = e = zt(e.current, null)),
    (me = Ie = t),
    (ue = 0),
    (Rr = null),
    (Fo = ss = nn = 0),
    (Ne = fr = null),
    Qt !== null)
  ) {
    for (t = 0; t < Qt.length; t++)
      if (((n = Qt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null
        var l = r.next,
          s = n.pending
        if (s !== null) {
          var i = s.next
          ;((s.next = l), (r.next = i))
        }
        n.pending = r
      }
    Qt = null
  }
  return e
}
function Lf(e, t) {
  do {
    var n = ie
    try {
      if ((ko(), (pl.current = Bl), Ml)) {
        for (var r = Y.memoizedState; r !== null; ) {
          var l = r.queue
          ;(l !== null && (l.pending = null), (r = r.next))
        }
        Ml = !1
      }
      if (
        ((tn = 0),
        (ce = ae = Y = null),
        (ur = !1),
        (Nr = 0),
        (zo.current = null),
        n === null || n.return === null)
      ) {
        ;((ue = 1), (Rr = t), (ie = null))
        break
      }
      e: {
        var s = e,
          i = n.return,
          o = n,
          u = t
        if (
          ((t = me),
          (o.flags |= 32768),
          u !== null && typeof u == 'object' && typeof u.then == 'function')
        ) {
          var c = u,
            f = o,
            d = f.tag
          if (!(f.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var g = f.alternate
            g
              ? ((f.updateQueue = g.updateQueue),
                (f.memoizedState = g.memoizedState),
                (f.lanes = g.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null))
          }
          var k = Wa(i)
          if (k !== null) {
            ;((k.flags &= -257),
              Ha(k, i, o, s, t),
              k.mode & 1 && $a(s, c, t),
              (t = k),
              (u = c))
            var m = t.updateQueue
            if (m === null) {
              var y = new Set()
              ;(y.add(u), (t.updateQueue = y))
            } else m.add(u)
            break e
          } else {
            if (!(t & 1)) {
              ;($a(s, c, t), Bo())
              break e
            }
            u = Error(N(426))
          }
        } else if (J && o.mode & 1) {
          var x = Wa(i)
          if (x !== null) {
            ;(!(x.flags & 65536) && (x.flags |= 256),
              Ha(x, i, o, s, t),
              wo(An(u, o)))
            break e
          }
        }
        ;((s = u = An(u, o)),
          ue !== 4 && (ue = 2),
          fr === null ? (fr = [s]) : fr.push(s),
          (s = i))
        do {
          switch (s.tag) {
            case 3:
              ;((s.flags |= 65536), (t &= -t), (s.lanes |= t))
              var h = hf(s, u, t)
              za(s, h)
              break e
            case 1:
              o = u
              var p = s.type,
                v = s.stateNode
              if (
                !(s.flags & 128) &&
                (typeof p.getDerivedStateFromError == 'function' ||
                  (v !== null &&
                    typeof v.componentDidCatch == 'function' &&
                    (It === null || !It.has(v))))
              ) {
                ;((s.flags |= 65536), (t &= -t), (s.lanes |= t))
                var C = mf(s, o, t)
                za(s, C)
                break e
              }
          }
          s = s.return
        } while (s !== null)
      }
      Af(n)
    } catch (j) {
      ;((t = j), ie === n && n !== null && (ie = n = n.return))
      continue
    }
    break
  } while (!0)
}
function Of() {
  var e = $l.current
  return (($l.current = Bl), e === null ? Bl : e)
}
function Bo() {
  ;((ue === 0 || ue === 3 || ue === 2) && (ue = 4),
    fe === null || (!(nn & 268435455) && !(ss & 268435455)) || Et(fe, me))
}
function Vl(e, t) {
  var n = B
  B |= 2
  var r = Of()
  ;(fe !== e || me !== t) && ((at = null), qt(e, t))
  do
    try {
      Mh()
      break
    } catch (l) {
      Lf(e, l)
    }
  while (!0)
  if ((ko(), (B = n), ($l.current = r), ie !== null)) throw Error(N(261))
  return ((fe = null), (me = 0), ue)
}
function Mh() {
  for (; ie !== null; ) If(ie)
}
function Bh() {
  for (; ie !== null && !fp(); ) If(ie)
}
function If(e) {
  var t = Ff(e.alternate, e, Ie)
  ;((e.memoizedProps = e.pendingProps),
    t === null ? Af(e) : (ie = t),
    (zo.current = null))
}
function Af(e) {
  var t = e
  do {
    var n = t.alternate
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ih(n, t)), n !== null)) {
        ;((n.flags &= 32767), (ie = n))
        return
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null))
      else {
        ;((ue = 6), (ie = null))
        return
      }
    } else if (((n = Oh(n, t, Ie)), n !== null)) {
      ie = n
      return
    }
    if (((t = t.sibling), t !== null)) {
      ie = t
      return
    }
    ie = t = e
  } while (t !== null)
  ue === 0 && (ue = 5)
}
function Vt(e, t, n) {
  var r = W,
    l = We.transition
  try {
    ;((We.transition = null), (W = 1), $h(e, t, n, r))
  } finally {
    ;((We.transition = l), (W = r))
  }
  return null
}
function $h(e, t, n, r) {
  do _n()
  while (Nt !== null)
  if (B & 6) throw Error(N(327))
  n = e.finishedWork
  var l = e.finishedLanes
  if (n === null) return null
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177))
  ;((e.callbackNode = null), (e.callbackPriority = 0))
  var s = n.lanes | n.childLanes
  if (
    (Sp(e, s),
    e === fe && ((ie = fe = null), (me = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ll ||
      ((ll = !0),
      Df(jl, function () {
        return (_n(), null)
      })),
    (s = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || s)
  ) {
    ;((s = We.transition), (We.transition = null))
    var i = W
    W = 1
    var o = B
    ;((B |= 4),
      (zo.current = null),
      zh(e, n),
      _f(n, e),
      oh(vi),
      (Pl = !!gi),
      (vi = gi = null),
      (e.current = n),
      Fh(n),
      dp(),
      (B = o),
      (W = i),
      (We.transition = s))
  } else e.current = n
  if (
    (ll && ((ll = !1), (Nt = e), (Hl = l)),
    (s = e.pendingLanes),
    s === 0 && (It = null),
    mp(n.stateNode),
    Te(e, re()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }))
  if (Wl) throw ((Wl = !1), (e = Di), (Di = null), e)
  return (
    Hl & 1 && e.tag !== 0 && _n(),
    (s = e.pendingLanes),
    s & 1 ? (e === Ui ? dr++ : ((dr = 0), (Ui = e))) : (dr = 0),
    $t(),
    null
  )
}
function _n() {
  if (Nt !== null) {
    var e = pc(Hl),
      t = We.transition,
      n = W
    try {
      if (((We.transition = null), (W = 16 > e ? 16 : e), Nt === null))
        var r = !1
      else {
        if (((e = Nt), (Nt = null), (Hl = 0), B & 6)) throw Error(N(331))
        var l = B
        for (B |= 4, O = e.current; O !== null; ) {
          var s = O,
            i = s.child
          if (O.flags & 16) {
            var o = s.deletions
            if (o !== null) {
              for (var u = 0; u < o.length; u++) {
                var c = o[u]
                for (O = c; O !== null; ) {
                  var f = O
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      cr(8, f, s)
                  }
                  var d = f.child
                  if (d !== null) ((d.return = f), (O = d))
                  else
                    for (; O !== null; ) {
                      f = O
                      var g = f.sibling,
                        k = f.return
                      if ((jf(f), f === c)) {
                        O = null
                        break
                      }
                      if (g !== null) {
                        ;((g.return = k), (O = g))
                        break
                      }
                      O = k
                    }
                }
              }
              var m = s.alternate
              if (m !== null) {
                var y = m.child
                if (y !== null) {
                  m.child = null
                  do {
                    var x = y.sibling
                    ;((y.sibling = null), (y = x))
                  } while (y !== null)
                }
              }
              O = s
            }
          }
          if (s.subtreeFlags & 2064 && i !== null) ((i.return = s), (O = i))
          else
            e: for (; O !== null; ) {
              if (((s = O), s.flags & 2048))
                switch (s.tag) {
                  case 0:
                  case 11:
                  case 15:
                    cr(9, s, s.return)
                }
              var h = s.sibling
              if (h !== null) {
                ;((h.return = s.return), (O = h))
                break e
              }
              O = s.return
            }
        }
        var p = e.current
        for (O = p; O !== null; ) {
          i = O
          var v = i.child
          if (i.subtreeFlags & 2064 && v !== null) ((v.return = i), (O = v))
          else
            e: for (i = p; O !== null; ) {
              if (((o = O), o.flags & 2048))
                try {
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ls(9, o)
                  }
                } catch (j) {
                  ee(o, o.return, j)
                }
              if (o === i) {
                O = null
                break e
              }
              var C = o.sibling
              if (C !== null) {
                ;((C.return = o.return), (O = C))
                break e
              }
              O = o.return
            }
        }
        if (
          ((B = l), $t(), it && typeof it.onPostCommitFiberRoot == 'function')
        )
          try {
            it.onPostCommitFiberRoot(Xl, e)
          } catch {}
        r = !0
      }
      return r
    } finally {
      ;((W = n), (We.transition = t))
    }
  }
  return !1
}
function nu(e, t, n) {
  ;((t = An(n, t)),
    (t = hf(e, t, 1)),
    (e = Ot(e, t, 1)),
    (t = Ce()),
    e !== null && (Ir(e, 1, t), Te(e, t)))
}
function ee(e, t, n) {
  if (e.tag === 3) nu(e, e, n)
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        nu(t, e, n)
        break
      } else if (t.tag === 1) {
        var r = t.stateNode
        if (
          typeof t.type.getDerivedStateFromError == 'function' ||
          (typeof r.componentDidCatch == 'function' &&
            (It === null || !It.has(r)))
        ) {
          ;((e = An(n, e)),
            (e = mf(t, e, 1)),
            (t = Ot(t, e, 1)),
            (e = Ce()),
            t !== null && (Ir(t, 1, e), Te(t, e)))
          break
        }
      }
      t = t.return
    }
}
function Wh(e, t, n) {
  var r = e.pingCache
  ;(r !== null && r.delete(t),
    (t = Ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    fe === e &&
      (me & n) === n &&
      (ue === 4 || (ue === 3 && (me & 130023424) === me && 500 > re() - Do)
        ? qt(e, 0)
        : (Fo |= n)),
    Te(e, t))
}
function zf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Jr), (Jr <<= 1), !(Jr & 130023424) && (Jr = 4194304))
      : (t = 1))
  var n = Ce()
  ;((e = mt(e, t)), e !== null && (Ir(e, t, n), Te(e, n)))
}
function Hh(e) {
  var t = e.memoizedState,
    n = 0
  ;(t !== null && (n = t.retryLane), zf(e, n))
}
function Vh(e, t) {
  var n = 0
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState
      l !== null && (n = l.retryLane)
      break
    case 19:
      r = e.stateNode
      break
    default:
      throw Error(N(314))
  }
  ;(r !== null && r.delete(t), zf(e, n))
}
var Ff
Ff = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || _e.current) Pe = !0
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Pe = !1), Lh(e, t, n))
      Pe = !!(e.flags & 131072)
    }
  else ((Pe = !1), J && t.flags & 1048576 && Mc(t, Al, t.index))
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type
      ;(ml(e, t), (e = t.pendingProps))
      var l = Tn(t, Se.current)
      ;(Pn(t, n), (l = To(null, t, r, e, l, n)))
      var s = Lo()
      return (
        (t.flags |= 1),
        typeof l == 'object' &&
        l !== null &&
        typeof l.render == 'function' &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Re(r) ? ((s = !0), Ol(t)) : (s = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            jo(t),
            (l.updater = rs),
            (t.stateNode = l),
            (l._reactInternals = t),
            Ni(t, r, e, n),
            (t = Ri(null, t, r, !0, s, n)))
          : ((t.tag = 0), J && s && yo(t), ke(null, t, l, n), (t = t.child)),
        t
      )
    case 16:
      r = t.elementType
      e: {
        switch (
          (ml(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Qh(r)),
          (e = Qe(r, e)),
          l)
        ) {
          case 0:
            t = _i(null, t, r, e, n)
            break e
          case 1:
            t = Qa(null, t, r, e, n)
            break e
          case 11:
            t = Va(null, t, r, e, n)
            break e
          case 14:
            t = Ka(null, t, r, Qe(r.type, e), n)
            break e
        }
        throw Error(N(306, r, ''))
      }
      return t
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Qe(r, l)),
        _i(e, t, r, l, n)
      )
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Qe(r, l)),
        Qa(e, t, r, l, n)
      )
    case 3:
      e: {
        if ((xf(t), e === null)) throw Error(N(387))
        ;((r = t.pendingProps),
          (s = t.memoizedState),
          (l = s.element),
          Kc(e, t),
          Dl(t, r, null, n))
        var i = t.memoizedState
        if (((r = i.element), s.isDehydrated))
          if (
            ((s = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = s),
            (t.memoizedState = s),
            t.flags & 256)
          ) {
            ;((l = An(Error(N(423)), t)), (t = ba(e, t, r, n, l)))
            break e
          } else if (r !== l) {
            ;((l = An(Error(N(424)), t)), (t = ba(e, t, r, n, l)))
            break e
          } else
            for (
              Ae = Lt(t.stateNode.containerInfo.firstChild),
                ze = t,
                J = !0,
                Je = null,
                n = Hc(t, null, r, n),
                t.child = n;
              n;

            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling))
        else {
          if ((Ln(), r === l)) {
            t = gt(e, t, n)
            break e
          }
          ke(e, t, r, n)
        }
        t = t.child
      }
      return t
    case 5:
      return (
        Qc(t),
        e === null && Ci(t),
        (r = t.type),
        (l = t.pendingProps),
        (s = e !== null ? e.memoizedProps : null),
        (i = l.children),
        yi(r, l) ? (i = null) : s !== null && yi(r, s) && (t.flags |= 32),
        yf(e, t),
        ke(e, t, i, n),
        t.child
      )
    case 6:
      return (e === null && Ci(t), null)
    case 13:
      return wf(e, t, n)
    case 4:
      return (
        No(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = On(t, null, r, n)) : ke(e, t, r, n),
        t.child
      )
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Qe(r, l)),
        Va(e, t, r, l, n)
      )
    case 7:
      return (ke(e, t, t.pendingProps, n), t.child)
    case 8:
      return (ke(e, t, t.pendingProps.children, n), t.child)
    case 12:
      return (ke(e, t, t.pendingProps.children, n), t.child)
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (s = t.memoizedProps),
          (i = l.value),
          H(zl, r._currentValue),
          (r._currentValue = i),
          s !== null)
        )
          if (Ye(s.value, i)) {
            if (s.children === l.children && !_e.current) {
              t = gt(e, t, n)
              break e
            }
          } else
            for (s = t.child, s !== null && (s.return = t); s !== null; ) {
              var o = s.dependencies
              if (o !== null) {
                i = s.child
                for (var u = o.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (s.tag === 1) {
                      ;((u = dt(-1, n & -n)), (u.tag = 2))
                      var c = s.updateQueue
                      if (c !== null) {
                        c = c.shared
                        var f = c.pending
                        ;(f === null
                          ? (u.next = u)
                          : ((u.next = f.next), (f.next = u)),
                          (c.pending = u))
                      }
                    }
                    ;((s.lanes |= n),
                      (u = s.alternate),
                      u !== null && (u.lanes |= n),
                      Ei(s.return, n, t),
                      (o.lanes |= n))
                    break
                  }
                  u = u.next
                }
              } else if (s.tag === 10) i = s.type === t.type ? null : s.child
              else if (s.tag === 18) {
                if (((i = s.return), i === null)) throw Error(N(341))
                ;((i.lanes |= n),
                  (o = i.alternate),
                  o !== null && (o.lanes |= n),
                  Ei(i, n, t),
                  (i = s.sibling))
              } else i = s.child
              if (i !== null) i.return = s
              else
                for (i = s; i !== null; ) {
                  if (i === t) {
                    i = null
                    break
                  }
                  if (((s = i.sibling), s !== null)) {
                    ;((s.return = i.return), (i = s))
                    break
                  }
                  i = i.return
                }
              s = i
            }
        ;(ke(e, t, l.children, n), (t = t.child))
      }
      return t
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        Pn(t, n),
        (l = He(l)),
        (r = r(l)),
        (t.flags |= 1),
        ke(e, t, r, n),
        t.child
      )
    case 14:
      return (
        (r = t.type),
        (l = Qe(r, t.pendingProps)),
        (l = Qe(r.type, l)),
        Ka(e, t, r, l, n)
      )
    case 15:
      return gf(e, t, t.type, t.pendingProps, n)
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Qe(r, l)),
        ml(e, t),
        (t.tag = 1),
        Re(r) ? ((e = !0), Ol(t)) : (e = !1),
        Pn(t, n),
        pf(t, r, l),
        Ni(t, r, l, n),
        Ri(null, t, r, !0, e, n)
      )
    case 19:
      return Sf(e, t, n)
    case 22:
      return vf(e, t, n)
  }
  throw Error(N(156, t.tag))
}
function Df(e, t) {
  return uc(e, t)
}
function Kh(e, t, n, r) {
  ;((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null))
}
function $e(e, t, n, r) {
  return new Kh(e, t, n, r)
}
function $o(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent))
}
function Qh(e) {
  if (typeof e == 'function') return $o(e) ? 1 : 0
  if (e != null) {
    if (((e = e.$$typeof), e === so)) return 11
    if (e === io) return 14
  }
  return 2
}
function zt(e, t) {
  var n = e.alternate
  return (
    n === null
      ? ((n = $e(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  )
}
function yl(e, t, n, r, l, s) {
  var i = 2
  if (((r = e), typeof e == 'function')) $o(e) && (i = 1)
  else if (typeof e == 'string') i = 5
  else
    e: switch (e) {
      case dn:
        return Xt(n.children, l, s, t)
      case lo:
        ;((i = 8), (l |= 8))
        break
      case Xs:
        return (
          (e = $e(12, n, t, l | 2)),
          (e.elementType = Xs),
          (e.lanes = s),
          e
        )
      case Ys:
        return ((e = $e(13, n, t, l)), (e.elementType = Ys), (e.lanes = s), e)
      case Gs:
        return ((e = $e(19, n, t, l)), (e.elementType = Gs), (e.lanes = s), e)
      case Qu:
        return is(n, l, s, t)
      default:
        if (typeof e == 'object' && e !== null)
          switch (e.$$typeof) {
            case Vu:
              i = 10
              break e
            case Ku:
              i = 9
              break e
            case so:
              i = 11
              break e
            case io:
              i = 14
              break e
            case St:
              ;((i = 16), (r = null))
              break e
          }
        throw Error(N(130, e == null ? e : typeof e, ''))
    }
  return (
    (t = $e(i, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = s),
    t
  )
}
function Xt(e, t, n, r) {
  return ((e = $e(7, e, r, t)), (e.lanes = n), e)
}
function is(e, t, n, r) {
  return (
    (e = $e(22, e, r, t)),
    (e.elementType = Qu),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  )
}
function Hs(e, t, n) {
  return ((e = $e(6, e, null, t)), (e.lanes = n), e)
}
function Vs(e, t, n) {
  return (
    (t = $e(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  )
}
function bh(e, t, n, r, l) {
  ;((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Es(0)),
    (this.expirationTimes = Es(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Es(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null))
}
function Wo(e, t, n, r, l, s, i, o, u) {
  return (
    (e = new bh(e, t, n, o, u)),
    t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
    (s = $e(3, null, null, t)),
    (e.current = s),
    (s.stateNode = e),
    (s.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    jo(s),
    e
  )
}
function Jh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
  return {
    $$typeof: fn,
    key: r == null ? null : '' + r,
    children: e,
    containerInfo: t,
    implementation: n,
  }
}
function Uf(e) {
  if (!e) return Ut
  e = e._reactInternals
  e: {
    if (an(e) !== e || e.tag !== 1) throw Error(N(170))
    var t = e
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context
          break e
        case 1:
          if (Re(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext
            break e
          }
      }
      t = t.return
    } while (t !== null)
    throw Error(N(171))
  }
  if (e.tag === 1) {
    var n = e.type
    if (Re(n)) return Dc(e, n, t)
  }
  return t
}
function Mf(e, t, n, r, l, s, i, o, u) {
  return (
    (e = Wo(n, r, !0, e, l, s, i, o, u)),
    (e.context = Uf(null)),
    (n = e.current),
    (r = Ce()),
    (l = At(n)),
    (s = dt(r, l)),
    (s.callback = t ?? null),
    Ot(n, s, l),
    (e.current.lanes = l),
    Ir(e, l, r),
    Te(e, r),
    e
  )
}
function os(e, t, n, r) {
  var l = t.current,
    s = Ce(),
    i = At(l)
  return (
    (n = Uf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = dt(s, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Ot(l, t, i)),
    e !== null && (Xe(e, l, i, s), dl(e, l, i)),
    i
  )
}
function Kl(e) {
  if (((e = e.current), !e.child)) return null
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode
    default:
      return e.child.stateNode
  }
}
function ru(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane
    e.retryLane = n !== 0 && n < t ? n : t
  }
}
function Ho(e, t) {
  ;(ru(e, t), (e = e.alternate) && ru(e, t))
}
function qh() {
  return null
}
var Bf =
  typeof reportError == 'function'
    ? reportError
    : function (e) {
        console.error(e)
      }
function Vo(e) {
  this._internalRoot = e
}
as.prototype.render = Vo.prototype.render = function (e) {
  var t = this._internalRoot
  if (t === null) throw Error(N(409))
  os(e, t, null, null)
}
as.prototype.unmount = Vo.prototype.unmount = function () {
  var e = this._internalRoot
  if (e !== null) {
    this._internalRoot = null
    var t = e.containerInfo
    ;(rn(function () {
      os(null, e, null, null)
    }),
      (t[ht] = null))
  }
}
function as(e) {
  this._internalRoot = e
}
as.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = gc()
    e = { blockedOn: null, target: e, priority: t }
    for (var n = 0; n < Ct.length && t !== 0 && t < Ct[n].priority; n++);
    ;(Ct.splice(n, 0, e), n === 0 && yc(e))
  }
}
function Ko(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
}
function us(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
  )
}
function lu() {}
function Xh(e, t, n, r, l) {
  if (l) {
    if (typeof r == 'function') {
      var s = r
      r = function () {
        var c = Kl(i)
        s.call(c)
      }
    }
    var i = Mf(t, r, e, 0, null, !1, !1, '', lu)
    return (
      (e._reactRootContainer = i),
      (e[ht] = i.current),
      Sr(e.nodeType === 8 ? e.parentNode : e),
      rn(),
      i
    )
  }
  for (; (l = e.lastChild); ) e.removeChild(l)
  if (typeof r == 'function') {
    var o = r
    r = function () {
      var c = Kl(u)
      o.call(c)
    }
  }
  var u = Wo(e, 0, !1, null, null, !1, !1, '', lu)
  return (
    (e._reactRootContainer = u),
    (e[ht] = u.current),
    Sr(e.nodeType === 8 ? e.parentNode : e),
    rn(function () {
      os(t, u, n, r)
    }),
    u
  )
}
function cs(e, t, n, r, l) {
  var s = n._reactRootContainer
  if (s) {
    var i = s
    if (typeof l == 'function') {
      var o = l
      l = function () {
        var u = Kl(i)
        o.call(u)
      }
    }
    os(t, i, e, l)
  } else i = Xh(n, t, e, l, r)
  return Kl(i)
}
hc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode
      if (t.current.memoizedState.isDehydrated) {
        var n = nr(t.pendingLanes)
        n !== 0 &&
          (uo(t, n | 1), Te(t, re()), !(B & 6) && ((zn = re() + 500), $t()))
      }
      break
    case 13:
      ;(rn(function () {
        var r = mt(e, 1)
        if (r !== null) {
          var l = Ce()
          Xe(r, e, 1, l)
        }
      }),
        Ho(e, 1))
  }
}
co = function (e) {
  if (e.tag === 13) {
    var t = mt(e, 134217728)
    if (t !== null) {
      var n = Ce()
      Xe(t, e, 134217728, n)
    }
    Ho(e, 134217728)
  }
}
mc = function (e) {
  if (e.tag === 13) {
    var t = At(e),
      n = mt(e, t)
    if (n !== null) {
      var r = Ce()
      Xe(n, e, t, r)
    }
    Ho(e, t)
  }
}
gc = function () {
  return W
}
vc = function (e, t) {
  var n = W
  try {
    return ((W = e), t())
  } finally {
    W = n
  }
}
ai = function (e, t, n) {
  switch (t) {
    case 'input':
      if ((ti(e, n), (t = n.name), n.type === 'radio' && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode
        for (
          n = n.querySelectorAll(
            'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t]
          if (r !== e && r.form === e.form) {
            var l = es(r)
            if (!l) throw Error(N(90))
            ;(Ju(r), ti(r, l))
          }
        }
      }
      break
    case 'textarea':
      Xu(e, n)
      break
    case 'select':
      ;((t = n.value), t != null && Cn(e, !!n.multiple, t, !1))
  }
}
rc = Uo
lc = rn
var Yh = { usingClientEntryPoint: !1, Events: [zr, gn, es, tc, nc, Uo] },
  Gn = {
    findFiberByHostInstance: Kt,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  Gh = {
    bundleType: Gn.bundleType,
    version: Gn.version,
    rendererPackageName: Gn.rendererPackageName,
    rendererConfig: Gn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: vt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = oc(e)), e === null ? null : e.stateNode)
    },
    findFiberByHostInstance: Gn.findFiberByHostInstance || qh,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  }
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
  var sl = __REACT_DEVTOOLS_GLOBAL_HOOK__
  if (!sl.isDisabled && sl.supportsFiber)
    try {
      ;((Xl = sl.inject(Gh)), (it = sl))
    } catch {}
}
De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Yh
De.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
  if (!Ko(t)) throw Error(N(200))
  return Jh(e, t, null, n)
}
De.createRoot = function (e, t) {
  if (!Ko(e)) throw Error(N(299))
  var n = !1,
    r = '',
    l = Bf
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Wo(e, 1, !1, null, null, n, !1, r, l)),
    (e[ht] = t.current),
    Sr(e.nodeType === 8 ? e.parentNode : e),
    new Vo(t)
  )
}
De.findDOMNode = function (e) {
  if (e == null) return null
  if (e.nodeType === 1) return e
  var t = e._reactInternals
  if (t === void 0)
    throw typeof e.render == 'function'
      ? Error(N(188))
      : ((e = Object.keys(e).join(',')), Error(N(268, e)))
  return ((e = oc(t)), (e = e === null ? null : e.stateNode), e)
}
De.flushSync = function (e) {
  return rn(e)
}
De.hydrate = function (e, t, n) {
  if (!us(t)) throw Error(N(200))
  return cs(null, e, t, !0, n)
}
De.hydrateRoot = function (e, t, n) {
  if (!Ko(e)) throw Error(N(405))
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    s = '',
    i = Bf
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Mf(t, null, e, 1, n ?? null, l, !1, s, i)),
    (e[ht] = t.current),
    Sr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l))
  return new as(t)
}
De.render = function (e, t, n) {
  if (!us(t)) throw Error(N(200))
  return cs(null, e, t, !1, n)
}
De.unmountComponentAtNode = function (e) {
  if (!us(e)) throw Error(N(40))
  return e._reactRootContainer
    ? (rn(function () {
        cs(null, null, e, !1, function () {
          ;((e._reactRootContainer = null), (e[ht] = null))
        })
      }),
      !0)
    : !1
}
De.unstable_batchedUpdates = Uo
De.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!us(n)) throw Error(N(200))
  if (e == null || e._reactInternals === void 0) throw Error(N(38))
  return cs(e, t, n, !1, r)
}
De.version = '18.3.1-next-f1338f8080-20240426'
function $f() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($f)
    } catch (e) {
      console.error(e)
    }
}
;($f(), (Bu.exports = De))
var Zh = Bu.exports,
  Wf,
  su = Zh
;((Wf = su.createRoot), su.hydrateRoot)
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Tr() {
  return (
    (Tr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    Tr.apply(this, arguments)
  )
}
var Pt
;(function (e) {
  ;((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'))
})(Pt || (Pt = {}))
const iu = 'popstate'
function em(e) {
  e === void 0 && (e = {})
  function t(r, l) {
    let { pathname: s, search: i, hash: o } = r.location
    return $i(
      '',
      { pathname: s, search: i, hash: o },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || 'default'
    )
  }
  function n(r, l) {
    return typeof l == 'string' ? l : Ql(l)
  }
  return nm(t, n, null, e)
}
function G(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
function Hf(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t)
    try {
      throw new Error(t)
    } catch {}
  }
}
function tm() {
  return Math.random().toString(36).substr(2, 8)
}
function ou(e, t) {
  return { usr: e.state, key: e.key, idx: t }
}
function $i(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Tr(
      { pathname: typeof e == 'string' ? e : e.pathname, search: '', hash: '' },
      typeof t == 'string' ? $n(t) : t,
      { state: n, key: (t && t.key) || r || tm() }
    )
  )
}
function Ql(e) {
  let { pathname: t = '/', search: n = '', hash: r = '' } = e
  return (
    n && n !== '?' && (t += n.charAt(0) === '?' ? n : '?' + n),
    r && r !== '#' && (t += r.charAt(0) === '#' ? r : '#' + r),
    t
  )
}
function $n(e) {
  let t = {}
  if (e) {
    let n = e.indexOf('#')
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)))
    let r = e.indexOf('?')
    ;(r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e))
  }
  return t
}
function nm(e, t, n, r) {
  r === void 0 && (r = {})
  let { window: l = document.defaultView, v5Compat: s = !1 } = r,
    i = l.history,
    o = Pt.Pop,
    u = null,
    c = f()
  c == null && ((c = 0), i.replaceState(Tr({}, i.state, { idx: c }), ''))
  function f() {
    return (i.state || { idx: null }).idx
  }
  function d() {
    o = Pt.Pop
    let x = f(),
      h = x == null ? null : x - c
    ;((c = x), u && u({ action: o, location: y.location, delta: h }))
  }
  function g(x, h) {
    o = Pt.Push
    let p = $i(y.location, x, h)
    c = f() + 1
    let v = ou(p, c),
      C = y.createHref(p)
    try {
      i.pushState(v, '', C)
    } catch (j) {
      if (j instanceof DOMException && j.name === 'DataCloneError') throw j
      l.location.assign(C)
    }
    s && u && u({ action: o, location: y.location, delta: 1 })
  }
  function k(x, h) {
    o = Pt.Replace
    let p = $i(y.location, x, h)
    c = f()
    let v = ou(p, c),
      C = y.createHref(p)
    ;(i.replaceState(v, '', C),
      s && u && u({ action: o, location: y.location, delta: 0 }))
  }
  function m(x) {
    let h = l.location.origin !== 'null' ? l.location.origin : l.location.href,
      p = typeof x == 'string' ? x : Ql(x)
    return (
      (p = p.replace(/ $/, '%20')),
      G(
        h,
        'No window.location.(origin|href) available to create URL for href: ' +
          p
      ),
      new URL(p, h)
    )
  }
  let y = {
    get action() {
      return o
    },
    get location() {
      return e(l, i)
    },
    listen(x) {
      if (u) throw new Error('A history only accepts one active listener')
      return (
        l.addEventListener(iu, d),
        (u = x),
        () => {
          ;(l.removeEventListener(iu, d), (u = null))
        }
      )
    },
    createHref(x) {
      return t(l, x)
    },
    createURL: m,
    encodeLocation(x) {
      let h = m(x)
      return { pathname: h.pathname, search: h.search, hash: h.hash }
    },
    push: g,
    replace: k,
    go(x) {
      return i.go(x)
    },
  }
  return y
}
var au
;(function (e) {
  ;((e.data = 'data'),
    (e.deferred = 'deferred'),
    (e.redirect = 'redirect'),
    (e.error = 'error'))
})(au || (au = {}))
function rm(e, t, n) {
  return (n === void 0 && (n = '/'), lm(e, t, n))
}
function lm(e, t, n, r) {
  let l = typeof t == 'string' ? $n(t) : t,
    s = Fn(l.pathname || '/', n)
  if (s == null) return null
  let i = Vf(e)
  sm(i)
  let o = null
  for (let u = 0; o == null && u < i.length; ++u) {
    let c = gm(s)
    o = hm(i[u], c)
  }
  return o
}
function Vf(e, t, n, r) {
  ;(t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ''))
  let l = (s, i, o) => {
    let u = {
      relativePath: o === void 0 ? s.path || '' : o,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: i,
      route: s,
    }
    u.relativePath.startsWith('/') &&
      (G(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          'must start with the combined path of all its parent routes.'
      ),
      (u.relativePath = u.relativePath.slice(r.length)))
    let c = Ft([r, u.relativePath]),
      f = n.concat(u)
    ;(s.children &&
      s.children.length > 0 &&
      (G(
        s.index !== !0,
        'Index routes must not have child routes. Please remove ' +
          ('all child routes from route path "' + c + '".')
      ),
      Vf(s.children, t, f, c)),
      !(s.path == null && !s.index) &&
        t.push({ path: c, score: dm(c, s.index), routesMeta: f }))
  }
  return (
    e.forEach((s, i) => {
      var o
      if (s.path === '' || !((o = s.path) != null && o.includes('?'))) l(s, i)
      else for (let u of Kf(s.path)) l(s, i, u)
    }),
    t
  )
}
function Kf(e) {
  let t = e.split('/')
  if (t.length === 0) return []
  let [n, ...r] = t,
    l = n.endsWith('?'),
    s = n.replace(/\?$/, '')
  if (r.length === 0) return l ? [s, ''] : [s]
  let i = Kf(r.join('/')),
    o = []
  return (
    o.push(...i.map((u) => (u === '' ? s : [s, u].join('/')))),
    l && o.push(...i),
    o.map((u) => (e.startsWith('/') && u === '' ? '/' : u))
  )
}
function sm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : pm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  )
}
const im = /^:[\w-]+$/,
  om = 3,
  am = 2,
  um = 1,
  cm = 10,
  fm = -2,
  uu = (e) => e === '*'
function dm(e, t) {
  let n = e.split('/'),
    r = n.length
  return (
    n.some(uu) && (r += fm),
    t && (r += am),
    n
      .filter((l) => !uu(l))
      .reduce((l, s) => l + (im.test(s) ? om : s === '' ? um : cm), r)
  )
}
function pm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0
}
function hm(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    s = '/',
    i = []
  for (let o = 0; o < r.length; ++o) {
    let u = r[o],
      c = o === r.length - 1,
      f = s === '/' ? t : t.slice(s.length) || '/',
      d = Wi(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: c },
        f
      ),
      g = u.route
    if (!d) return null
    ;(Object.assign(l, d.params),
      i.push({
        params: l,
        pathname: Ft([s, d.pathname]),
        pathnameBase: wm(Ft([s, d.pathnameBase])),
        route: g,
      }),
      d.pathnameBase !== '/' && (s = Ft([s, d.pathnameBase])))
  }
  return i
}
function Wi(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 })
  let [n, r] = mm(e.path, e.caseSensitive, e.end),
    l = t.match(n)
  if (!l) return null
  let s = l[0],
    i = s.replace(/(.)\/+$/, '$1'),
    o = l.slice(1)
  return {
    params: r.reduce((c, f, d) => {
      let { paramName: g, isOptional: k } = f
      if (g === '*') {
        let y = o[d] || ''
        i = s.slice(0, s.length - y.length).replace(/(.)\/+$/, '$1')
      }
      const m = o[d]
      return (
        k && !m ? (c[g] = void 0) : (c[g] = (m || '').replace(/%2F/g, '/')),
        c
      )
    }, {}),
    pathname: s,
    pathnameBase: i,
    pattern: e,
  }
}
function mm(e, t, n) {
  ;(t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Hf(
      e === '*' || !e.endsWith('*') || e.endsWith('/*'),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, '/*') + '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' + e.replace(/\*$/, '/*') + '".')
    ))
  let r = [],
    l =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, o, u) => (
            r.push({ paramName: o, isOptional: u != null }),
            u ? '/?([^\\/]+)?' : '/([^\\/]+)'
          )
        )
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }),
        (l += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (l += '\\/*$')
        : e !== '' && e !== '/' && (l += '(?:(?=\\/|$))'),
    [new RegExp(l, t ? void 0 : 'i'), r]
  )
}
function gm(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/')
  } catch (t) {
    return (
      Hf(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ('encoding (' + t + ').')
      ),
      e
    )
  }
}
function Fn(e, t) {
  if (t === '/') return e
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n)
  return r && r !== '/' ? null : e.slice(n) || '/'
}
function vm(e, t) {
  t === void 0 && (t = '/')
  let {
    pathname: n,
    search: r = '',
    hash: l = '',
  } = typeof e == 'string' ? $n(e) : e
  return {
    pathname: n ? (n.startsWith('/') ? n : ym(n, t)) : t,
    search: Sm(r),
    hash: km(l),
  }
}
function ym(e, t) {
  let n = t.replace(/\/+$/, '').split('/')
  return (
    e.split('/').forEach((l) => {
      l === '..' ? n.length > 1 && n.pop() : l !== '.' && n.push(l)
    }),
    n.length > 1 ? n.join('/') : '/'
  )
}
function Ks(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ('`to.' +
      t +
      '` field [' +
      JSON.stringify(r) +
      '].  Please separate it out to the ') +
    ('`to.' + n + '` field. Alternatively you may provide the full path as ') +
    'a string in <Link to="..."> and the router will parse it for you.'
  )
}
function xm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  )
}
function Qo(e, t) {
  let n = xm(e)
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase)
}
function bo(e, t, n, r) {
  r === void 0 && (r = !1)
  let l
  typeof e == 'string'
    ? (l = $n(e))
    : ((l = Tr({}, e)),
      G(
        !l.pathname || !l.pathname.includes('?'),
        Ks('?', 'pathname', 'search', l)
      ),
      G(
        !l.pathname || !l.pathname.includes('#'),
        Ks('#', 'pathname', 'hash', l)
      ),
      G(!l.search || !l.search.includes('#'), Ks('#', 'search', 'hash', l)))
  let s = e === '' || l.pathname === '',
    i = s ? '/' : l.pathname,
    o
  if (i == null) o = n
  else {
    let d = t.length - 1
    if (!r && i.startsWith('..')) {
      let g = i.split('/')
      for (; g[0] === '..'; ) (g.shift(), (d -= 1))
      l.pathname = g.join('/')
    }
    o = d >= 0 ? t[d] : '/'
  }
  let u = vm(l, o),
    c = i && i !== '/' && i.endsWith('/'),
    f = (s || i === '.') && n.endsWith('/')
  return (!u.pathname.endsWith('/') && (c || f) && (u.pathname += '/'), u)
}
const Ft = (e) => e.join('/').replace(/\/\/+/g, '/'),
  wm = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  Sm = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  km = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e)
function Cm(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  )
}
const Qf = ['post', 'put', 'patch', 'delete']
new Set(Qf)
const Em = ['get', ...Qf]
new Set(Em)
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Lr() {
  return (
    (Lr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    Lr.apply(this, arguments)
  )
}
const fs = S.createContext(null),
  bf = S.createContext(null),
  yt = S.createContext(null),
  ds = S.createContext(null),
  xt = S.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Jf = S.createContext(null)
function jm(e, t) {
  let { relative: n } = t === void 0 ? {} : t
  Wn() || G(!1)
  let { basename: r, navigator: l } = S.useContext(yt),
    { hash: s, pathname: i, search: o } = ps(e, { relative: n }),
    u = i
  return (
    r !== '/' && (u = i === '/' ? r : Ft([r, i])),
    l.createHref({ pathname: u, search: o, hash: s })
  )
}
function Wn() {
  return S.useContext(ds) != null
}
function un() {
  return (Wn() || G(!1), S.useContext(ds).location)
}
function qf(e) {
  S.useContext(yt).static || S.useLayoutEffect(e)
}
function Ge() {
  let { isDataRoute: e } = S.useContext(xt)
  return e ? Mm() : Nm()
}
function Nm() {
  Wn() || G(!1)
  let e = S.useContext(fs),
    { basename: t, future: n, navigator: r } = S.useContext(yt),
    { matches: l } = S.useContext(xt),
    { pathname: s } = un(),
    i = JSON.stringify(Qo(l, n.v7_relativeSplatPath)),
    o = S.useRef(!1)
  return (
    qf(() => {
      o.current = !0
    }),
    S.useCallback(
      function (c, f) {
        if ((f === void 0 && (f = {}), !o.current)) return
        if (typeof c == 'number') {
          r.go(c)
          return
        }
        let d = bo(c, JSON.parse(i), s, f.relative === 'path')
        ;(e == null &&
          t !== '/' &&
          (d.pathname = d.pathname === '/' ? t : Ft([t, d.pathname])),
          (f.replace ? r.replace : r.push)(d, f.state, f))
      },
      [t, r, i, s, e]
    )
  )
}
function Pm() {
  let { matches: e } = S.useContext(xt),
    t = e[e.length - 1]
  return t ? t.params : {}
}
function ps(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = S.useContext(yt),
    { matches: l } = S.useContext(xt),
    { pathname: s } = un(),
    i = JSON.stringify(Qo(l, r.v7_relativeSplatPath))
  return S.useMemo(() => bo(e, JSON.parse(i), s, n === 'path'), [e, i, s, n])
}
function _m(e, t) {
  return Rm(e, t)
}
function Rm(e, t, n, r) {
  Wn() || G(!1)
  let { navigator: l } = S.useContext(yt),
    { matches: s } = S.useContext(xt),
    i = s[s.length - 1],
    o = i ? i.params : {}
  i && i.pathname
  let u = i ? i.pathnameBase : '/'
  i && i.route
  let c = un(),
    f
  if (t) {
    var d
    let x = typeof t == 'string' ? $n(t) : t
    ;(u === '/' || ((d = x.pathname) != null && d.startsWith(u)) || G(!1),
      (f = x))
  } else f = c
  let g = f.pathname || '/',
    k = g
  if (u !== '/') {
    let x = u.replace(/^\//, '').split('/')
    k = '/' + g.replace(/^\//, '').split('/').slice(x.length).join('/')
  }
  let m = rm(e, { pathname: k }),
    y = Am(
      m &&
        m.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, o, x.params),
            pathname: Ft([
              u,
              l.encodeLocation
                ? l.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === '/'
                ? u
                : Ft([
                    u,
                    l.encodeLocation
                      ? l.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      s,
      n,
      r
    )
  return t && y
    ? S.createElement(
        ds.Provider,
        {
          value: {
            location: Lr(
              {
                pathname: '/',
                search: '',
                hash: '',
                state: null,
                key: 'default',
              },
              f
            ),
            navigationType: Pt.Pop,
          },
        },
        y
      )
    : y
}
function Tm() {
  let e = Um(),
    t = Cm(e)
      ? e.status + ' ' + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: '0.5rem', backgroundColor: 'rgba(200,200,200, 0.5)' }
  return S.createElement(
    S.Fragment,
    null,
    S.createElement('h2', null, 'Unexpected Application Error!'),
    S.createElement('h3', { style: { fontStyle: 'italic' } }, t),
    n ? S.createElement('pre', { style: l }, n) : null,
    null
  )
}
const Lm = S.createElement(Tm, null)
class Om extends S.Component {
  constructor(t) {
    ;(super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }))
  }
  static getDerivedStateFromError(t) {
    return { error: t }
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== 'idle' && t.revalidation === 'idle')
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        }
  }
  componentDidCatch(t, n) {
    console.error('React Router caught the following error during render', t, n)
  }
  render() {
    return this.state.error !== void 0
      ? S.createElement(
          xt.Provider,
          { value: this.props.routeContext },
          S.createElement(Jf.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children
  }
}
function Im(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = S.useContext(fs)
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    S.createElement(xt.Provider, { value: t }, r)
  )
}
function Am(e, t, n, r) {
  var l
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var s
    if (!n) return null
    if (n.errors) e = n.matches
    else if (
      (s = r) != null &&
      s.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches
    else return null
  }
  let i = e,
    o = (l = n) == null ? void 0 : l.errors
  if (o != null) {
    let f = i.findIndex(
      (d) => d.route.id && (o == null ? void 0 : o[d.route.id]) !== void 0
    )
    ;(f >= 0 || G(!1), (i = i.slice(0, Math.min(i.length, f + 1))))
  }
  let u = !1,
    c = -1
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let d = i[f]
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (c = f),
        d.route.id)
      ) {
        let { loaderData: g, errors: k } = n,
          m =
            d.route.loader &&
            g[d.route.id] === void 0 &&
            (!k || k[d.route.id] === void 0)
        if (d.route.lazy || m) {
          ;((u = !0), c >= 0 ? (i = i.slice(0, c + 1)) : (i = [i[0]]))
          break
        }
      }
    }
  return i.reduceRight((f, d, g) => {
    let k,
      m = !1,
      y = null,
      x = null
    n &&
      ((k = o && d.route.id ? o[d.route.id] : void 0),
      (y = d.route.errorElement || Lm),
      u &&
        (c < 0 && g === 0
          ? (Bm('route-fallback'), (m = !0), (x = null))
          : c === g &&
            ((m = !0), (x = d.route.hydrateFallbackElement || null))))
    let h = t.concat(i.slice(0, g + 1)),
      p = () => {
        let v
        return (
          k
            ? (v = y)
            : m
              ? (v = x)
              : d.route.Component
                ? (v = S.createElement(d.route.Component, null))
                : d.route.element
                  ? (v = d.route.element)
                  : (v = f),
          S.createElement(Im, {
            match: d,
            routeContext: { outlet: f, matches: h, isDataRoute: n != null },
            children: v,
          })
        )
      }
    return n && (d.route.ErrorBoundary || d.route.errorElement || g === 0)
      ? S.createElement(Om, {
          location: n.location,
          revalidation: n.revalidation,
          component: y,
          error: k,
          children: p(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
        })
      : p()
  }, null)
}
var Xf = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      e
    )
  })(Xf || {}),
  Yf = (function (e) {
    return (
      (e.UseBlocker = 'useBlocker'),
      (e.UseLoaderData = 'useLoaderData'),
      (e.UseActionData = 'useActionData'),
      (e.UseRouteError = 'useRouteError'),
      (e.UseNavigation = 'useNavigation'),
      (e.UseRouteLoaderData = 'useRouteLoaderData'),
      (e.UseMatches = 'useMatches'),
      (e.UseRevalidator = 'useRevalidator'),
      (e.UseNavigateStable = 'useNavigate'),
      (e.UseRouteId = 'useRouteId'),
      e
    )
  })(Yf || {})
function zm(e) {
  let t = S.useContext(fs)
  return (t || G(!1), t)
}
function Fm(e) {
  let t = S.useContext(bf)
  return (t || G(!1), t)
}
function Dm(e) {
  let t = S.useContext(xt)
  return (t || G(!1), t)
}
function Gf(e) {
  let t = Dm(),
    n = t.matches[t.matches.length - 1]
  return (n.route.id || G(!1), n.route.id)
}
function Um() {
  var e
  let t = S.useContext(Jf),
    n = Fm(),
    r = Gf()
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function Mm() {
  let { router: e } = zm(Xf.UseNavigateStable),
    t = Gf(Yf.UseNavigateStable),
    n = S.useRef(!1)
  return (
    qf(() => {
      n.current = !0
    }),
    S.useCallback(
      function (l, s) {
        ;(s === void 0 && (s = {}),
          n.current &&
            (typeof l == 'number'
              ? e.navigate(l)
              : e.navigate(l, Lr({ fromRouteId: t }, s))))
      },
      [e, t]
    )
  )
}
const cu = {}
function Bm(e, t, n) {
  cu[e] || (cu[e] = !0)
}
function $m(e, t) {
  ;(e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath)
}
function Wm(e) {
  let { to: t, replace: n, state: r, relative: l } = e
  Wn() || G(!1)
  let { future: s, static: i } = S.useContext(yt),
    { matches: o } = S.useContext(xt),
    { pathname: u } = un(),
    c = Ge(),
    f = bo(t, Qo(o, s.v7_relativeSplatPath), u, l === 'path'),
    d = JSON.stringify(f)
  return (
    S.useEffect(
      () => c(JSON.parse(d), { replace: n, state: r, relative: l }),
      [c, d, l, n, r]
    ),
    null
  )
}
function he(e) {
  G(!1)
}
function Hm(e) {
  let {
    basename: t = '/',
    children: n = null,
    location: r,
    navigationType: l = Pt.Pop,
    navigator: s,
    static: i = !1,
    future: o,
  } = e
  Wn() && G(!1)
  let u = t.replace(/^\/*/, '/'),
    c = S.useMemo(
      () => ({
        basename: u,
        navigator: s,
        static: i,
        future: Lr({ v7_relativeSplatPath: !1 }, o),
      }),
      [u, o, s, i]
    )
  typeof r == 'string' && (r = $n(r))
  let {
      pathname: f = '/',
      search: d = '',
      hash: g = '',
      state: k = null,
      key: m = 'default',
    } = r,
    y = S.useMemo(() => {
      let x = Fn(f, u)
      return x == null
        ? null
        : {
            location: { pathname: x, search: d, hash: g, state: k, key: m },
            navigationType: l,
          }
    }, [u, f, d, g, k, m, l])
  return y == null
    ? null
    : S.createElement(
        yt.Provider,
        { value: c },
        S.createElement(ds.Provider, { children: n, value: y })
      )
}
function Zf(e) {
  let { children: t, location: n } = e
  return _m(Hi(t), n)
}
new Promise(() => {})
function Hi(e, t) {
  t === void 0 && (t = [])
  let n = []
  return (
    S.Children.forEach(e, (r, l) => {
      if (!S.isValidElement(r)) return
      let s = [...t, l]
      if (r.type === S.Fragment) {
        n.push.apply(n, Hi(r.props.children, s))
        return
      }
      ;(r.type !== he && G(!1), !r.props.index || !r.props.children || G(!1))
      let i = {
        id: r.props.id || s.join('-'),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      }
      ;(r.props.children && (i.children = Hi(r.props.children, s)), n.push(i))
    }),
    n
  )
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function bl() {
  return (
    (bl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    bl.apply(this, arguments)
  )
}
function ed(e, t) {
  if (e == null) return {}
  var n = {},
    r = Object.keys(e),
    l,
    s
  for (s = 0; s < r.length; s++)
    ((l = r[s]), !(t.indexOf(l) >= 0) && (n[l] = e[l]))
  return n
}
function Vm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function Km(e, t) {
  return e.button === 0 && (!t || t === '_self') && !Vm(e)
}
function Vi(e) {
  return (
    e === void 0 && (e = ''),
    new URLSearchParams(
      typeof e == 'string' || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, n) => {
            let r = e[n]
            return t.concat(Array.isArray(r) ? r.map((l) => [n, l]) : [[n, r]])
          }, [])
    )
  )
}
function Qm(e, t) {
  let n = Vi(e)
  return (
    t &&
      t.forEach((r, l) => {
        n.has(l) ||
          t.getAll(l).forEach((s) => {
            n.append(l, s)
          })
      }),
    n
  )
}
const bm = [
    'onClick',
    'relative',
    'reloadDocument',
    'replace',
    'state',
    'target',
    'to',
    'preventScrollReset',
    'viewTransition',
  ],
  Jm = [
    'aria-current',
    'caseSensitive',
    'className',
    'end',
    'style',
    'to',
    'viewTransition',
    'children',
  ],
  qm = '6'
try {
  window.__reactRouterVersion = qm
} catch {}
const Xm = S.createContext({ isTransitioning: !1 }),
  Ym = 'startTransition',
  fu = Wd[Ym]
function Gm(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    s = S.useRef()
  s.current == null && (s.current = em({ window: l, v5Compat: !0 }))
  let i = s.current,
    [o, u] = S.useState({ action: i.action, location: i.location }),
    { v7_startTransition: c } = r || {},
    f = S.useCallback(
      (d) => {
        c && fu ? fu(() => u(d)) : u(d)
      },
      [u, c]
    )
  return (
    S.useLayoutEffect(() => i.listen(f), [i, f]),
    S.useEffect(() => $m(r), [r]),
    S.createElement(Hm, {
      basename: t,
      children: n,
      location: o.location,
      navigationType: o.action,
      navigator: i,
      future: r,
    })
  )
}
const Zm =
    typeof window < 'u' &&
    typeof window.document < 'u' &&
    typeof window.document.createElement < 'u',
  eg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ln = S.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: s,
        replace: i,
        state: o,
        target: u,
        to: c,
        preventScrollReset: f,
        viewTransition: d,
      } = t,
      g = ed(t, bm),
      { basename: k } = S.useContext(yt),
      m,
      y = !1
    if (typeof c == 'string' && eg.test(c) && ((m = c), Zm))
      try {
        let v = new URL(window.location.href),
          C = c.startsWith('//') ? new URL(v.protocol + c) : new URL(c),
          j = Fn(C.pathname, k)
        C.origin === v.origin && j != null
          ? (c = j + C.search + C.hash)
          : (y = !0)
      } catch {}
    let x = jm(c, { relative: l }),
      h = rg(c, {
        replace: i,
        state: o,
        target: u,
        preventScrollReset: f,
        relative: l,
        viewTransition: d,
      })
    function p(v) {
      ;(r && r(v), v.defaultPrevented || h(v))
    }
    return S.createElement(
      'a',
      bl({}, g, { href: m || x, onClick: y || s ? r : p, ref: n, target: u })
    )
  }),
  tg = S.forwardRef(function (t, n) {
    let {
        'aria-current': r = 'page',
        caseSensitive: l = !1,
        className: s = '',
        end: i = !1,
        style: o,
        to: u,
        viewTransition: c,
        children: f,
      } = t,
      d = ed(t, Jm),
      g = ps(u, { relative: d.relative }),
      k = un(),
      m = S.useContext(bf),
      { navigator: y, basename: x } = S.useContext(yt),
      h = m != null && sg(g) && c === !0,
      p = y.encodeLocation ? y.encodeLocation(g).pathname : g.pathname,
      v = k.pathname,
      C =
        m && m.navigation && m.navigation.location
          ? m.navigation.location.pathname
          : null
    ;(l ||
      ((v = v.toLowerCase()),
      (C = C ? C.toLowerCase() : null),
      (p = p.toLowerCase())),
      C && x && (C = Fn(C, x) || C))
    const j = p !== '/' && p.endsWith('/') ? p.length - 1 : p.length
    let _ = v === p || (!i && v.startsWith(p) && v.charAt(j) === '/'),
      P =
        C != null &&
        (C === p || (!i && C.startsWith(p) && C.charAt(p.length) === '/')),
      T = { isActive: _, isPending: P, isTransitioning: h },
      U = _ ? r : void 0,
      z
    typeof s == 'function'
      ? (z = s(T))
      : (z = [
          s,
          _ ? 'active' : null,
          P ? 'pending' : null,
          h ? 'transitioning' : null,
        ]
          .filter(Boolean)
          .join(' '))
    let Q = typeof o == 'function' ? o(T) : o
    return S.createElement(
      ln,
      bl({}, d, {
        'aria-current': U,
        className: z,
        ref: n,
        style: Q,
        to: u,
        viewTransition: c,
      }),
      typeof f == 'function' ? f(T) : f
    )
  })
var Ki
;(function (e) {
  ;((e.UseScrollRestoration = 'useScrollRestoration'),
    (e.UseSubmit = 'useSubmit'),
    (e.UseSubmitFetcher = 'useSubmitFetcher'),
    (e.UseFetcher = 'useFetcher'),
    (e.useViewTransitionState = 'useViewTransitionState'))
})(Ki || (Ki = {}))
var du
;(function (e) {
  ;((e.UseFetcher = 'useFetcher'),
    (e.UseFetchers = 'useFetchers'),
    (e.UseScrollRestoration = 'useScrollRestoration'))
})(du || (du = {}))
function ng(e) {
  let t = S.useContext(fs)
  return (t || G(!1), t)
}
function rg(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: s,
      relative: i,
      viewTransition: o,
    } = t === void 0 ? {} : t,
    u = Ge(),
    c = un(),
    f = ps(e, { relative: i })
  return S.useCallback(
    (d) => {
      if (Km(d, n)) {
        d.preventDefault()
        let g = r !== void 0 ? r : Ql(c) === Ql(f)
        u(e, {
          replace: g,
          state: l,
          preventScrollReset: s,
          relative: i,
          viewTransition: o,
        })
      }
    },
    [c, u, f, r, l, n, e, s, i, o]
  )
}
function lg(e) {
  let t = S.useRef(Vi(e)),
    n = S.useRef(!1),
    r = un(),
    l = S.useMemo(() => Qm(r.search, n.current ? null : t.current), [r.search]),
    s = Ge(),
    i = S.useCallback(
      (o, u) => {
        const c = Vi(typeof o == 'function' ? o(l) : o)
        ;((n.current = !0), s('?' + c, u))
      },
      [s, l]
    )
  return [l, i]
}
function sg(e, t) {
  t === void 0 && (t = {})
  let n = S.useContext(Xm)
  n == null && G(!1)
  let { basename: r } = ng(Ki.useViewTransitionState),
    l = ps(e, { relative: t.relative })
  if (!n.isTransitioning) return !1
  let s = Fn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = Fn(n.nextLocation.pathname, r) || n.nextLocation.pathname
  return Wi(l.pathname, i) != null || Wi(l.pathname, s) != null
}
function Dr({ authed: e, user: t, plan: n }) {
  var l, s
  const r = Ge()
  return a.jsxs('div', {
    className: 'navbar',
    children: [
      a.jsxs('div', {
        className: 'logo',
        children: [
          a.jsx('div', { className: 'logo-dot' }),
          a.jsx('div', { children: 'Chatbot CRM' }),
        ],
      }),
      e
        ? a.jsxs('div', {
            className: 'row',
            style: { alignItems: 'center' },
            children: [
              a.jsxs('span', {
                className: 'badge',
                children: [
                  'Paket: ',
                  ((s =
                    (l = n == null ? void 0 : n.plan) == null
                      ? void 0
                      : l.toUpperCase) == null
                    ? void 0
                    : s.call(l)) || 'PRO',
                ],
              }),
              a.jsxs('div', {
                className: 'badge',
                children: [
                  'Sisa aktif: ',
                  n != null && n.expiry
                    ? new Date(n.expiry).toLocaleDateString()
                    : '-',
                ],
              }),
              a.jsxs('div', {
                className: 'row',
                style: { gap: 8, alignItems: 'center' },
                children: [
                  a.jsx('div', {
                    style: {
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: '#22c55e',
                    },
                  }),
                  a.jsxs('div', {
                    children: [
                      t == null ? void 0 : t.name,
                      ' ',
                      a.jsxs('span', {
                        style: { color: '#6b7280' },
                        children: ['(', t == null ? void 0 : t.email, ')'],
                      }),
                    ],
                  }),
                  a.jsx('button', {
                    className: 'btn ghost',
                    onClick: () => r('/app/profile'),
                    children: 'Profile',
                  }),
                ],
              }),
            ],
          })
        : a.jsxs('div', {
            className: 'row',
            children: [
              a.jsx(ln, {
                to: '/login',
                className: 'btn ghost',
                children: 'Login',
              }),
              a.jsx(ln, {
                to: '/register',
                className: 'btn',
                children: 'Daftar Sekarang',
              }),
            ],
          }),
    ],
  })
}
function ig() {
  return a.jsxs('div', {
    children: [
      a.jsx(Dr, {}),
      a.jsxs('div', {
        className: 'hero',
        children: [
          a.jsx('h1', { children: 'Chatbot CRM — Putih & Oranye' }),
          a.jsx('p', {
            children:
              'Kelola percakapan AI dan agen manusia, hubungkan platform (WA/IG/FB/Telegram), dan analitik sederhana.',
          }),
          a.jsxs('div', {
            style: { marginTop: 20 },
            children: [
              a.jsx(ln, {
                to: '/register',
                className: 'btn',
                children: 'Daftar Sekarang',
              }),
              a.jsx(ln, {
                to: '/login',
                className: 'btn ghost',
                style: { marginLeft: 10 },
                children: 'Login',
              }),
            ],
          }),
        ],
      }),
      a.jsxs('div', {
        style: { maxWidth: 1e3, margin: '30px auto', padding: '0 16px' },
        children: [
          a.jsx('h2', { children: 'Fitur Utama' }),
          a.jsxs('ul', {
            children: [
              a.jsx('li', {
                children: 'Login/Daftar + OTP via email (console fallback)',
              }),
              a.jsx('li', { children: 'Sidebar expand-on-hover' }),
              a.jsx('li', { children: 'Inbox + panel chat + takeover' }),
              a.jsx('li', {
                children: 'Connected Platforms & AI Agents (test UI)',
              }),
              a.jsx('li', { children: 'Human Agents (Agent/Super Agent)' }),
              a.jsx('li', { children: 'Analytics & Billing' }),
            ],
          }),
        ],
      }),
    ],
  })
}
function td(e, t) {
  return function () {
    return e.apply(t, arguments)
  }
}
const { toString: og } = Object.prototype,
  { getPrototypeOf: Jo } = Object,
  { iterator: hs, toStringTag: nd } = Symbol,
  ms = ((e) => (t) => {
    const n = og.call(t)
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
  })(Object.create(null)),
  Ze = (e) => ((e = e.toLowerCase()), (t) => ms(t) === e),
  gs = (e) => (t) => typeof t === e,
  { isArray: Hn } = Array,
  Dn = gs('undefined')
function Ur(e) {
  return (
    e !== null &&
    !Dn(e) &&
    e.constructor !== null &&
    !Dn(e.constructor) &&
    Le(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  )
}
const rd = Ze('ArrayBuffer')
function ag(e) {
  let t
  return (
    typeof ArrayBuffer < 'u' && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && rd(e.buffer)),
    t
  )
}
const ug = gs('string'),
  Le = gs('function'),
  ld = gs('number'),
  Mr = (e) => e !== null && typeof e == 'object',
  cg = (e) => e === !0 || e === !1,
  xl = (e) => {
    if (ms(e) !== 'object') return !1
    const t = Jo(e)
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(nd in e) &&
      !(hs in e)
    )
  },
  fg = (e) => {
    if (!Mr(e) || Ur(e)) return !1
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      )
    } catch {
      return !1
    }
  },
  dg = Ze('Date'),
  pg = Ze('File'),
  hg = Ze('Blob'),
  mg = Ze('FileList'),
  gg = (e) => Mr(e) && Le(e.pipe),
  vg = (e) => {
    let t
    return (
      e &&
      ((typeof FormData == 'function' && e instanceof FormData) ||
        (Le(e.append) &&
          ((t = ms(e)) === 'formdata' ||
            (t === 'object' &&
              Le(e.toString) &&
              e.toString() === '[object FormData]'))))
    )
  },
  yg = Ze('URLSearchParams'),
  [xg, wg, Sg, kg] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(
    Ze
  ),
  Cg = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
function Br(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > 'u') return
  let r, l
  if ((typeof e != 'object' && (e = [e]), Hn(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e)
  else {
    if (Ur(e)) return
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = s.length
    let o
    for (r = 0; r < i; r++) ((o = s[r]), t.call(null, e[o], o, e))
  }
}
function sd(e, t) {
  if (Ur(e)) return null
  t = t.toLowerCase()
  const n = Object.keys(e)
  let r = n.length,
    l
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l
  return null
}
const Jt =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : global,
  id = (e) => !Dn(e) && e !== Jt
function Qi() {
  const { caseless: e, skipUndefined: t } = (id(this) && this) || {},
    n = {},
    r = (l, s) => {
      const i = (e && sd(n, s)) || s
      xl(n[i]) && xl(l)
        ? (n[i] = Qi(n[i], l))
        : xl(l)
          ? (n[i] = Qi({}, l))
          : Hn(l)
            ? (n[i] = l.slice())
            : (!t || !Dn(l)) && (n[i] = l)
    }
  for (let l = 0, s = arguments.length; l < s; l++)
    arguments[l] && Br(arguments[l], r)
  return n
}
const Eg = (e, t, n, { allOwnKeys: r } = {}) => (
    Br(
      t,
      (l, s) => {
        n && Le(l) ? (e[s] = td(l, n)) : (e[s] = l)
      },
      { allOwnKeys: r }
    ),
    e
  ),
  jg = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Ng = (e, t, n, r) => {
    ;((e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, 'super', { value: t.prototype }),
      n && Object.assign(e.prototype, n))
  },
  Pg = (e, t, n, r) => {
    let l, s, i
    const o = {}
    if (((t = t || {}), e == null)) return t
    do {
      for (l = Object.getOwnPropertyNames(e), s = l.length; s-- > 0; )
        ((i = l[s]),
          (!r || r(i, e, t)) && !o[i] && ((t[i] = e[i]), (o[i] = !0)))
      e = n !== !1 && Jo(e)
    } while (e && (!n || n(e, t)) && e !== Object.prototype)
    return t
  },
  _g = (e, t, n) => {
    ;((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length))
    const r = e.indexOf(t, n)
    return r !== -1 && r === n
  },
  Rg = (e) => {
    if (!e) return null
    if (Hn(e)) return e
    let t = e.length
    if (!ld(t)) return null
    const n = new Array(t)
    for (; t-- > 0; ) n[t] = e[t]
    return n
  },
  Tg = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < 'u' && Jo(Uint8Array)),
  Lg = (e, t) => {
    const r = (e && e[hs]).call(e)
    let l
    for (; (l = r.next()) && !l.done; ) {
      const s = l.value
      t.call(e, s[0], s[1])
    }
  },
  Og = (e, t) => {
    let n
    const r = []
    for (; (n = e.exec(t)) !== null; ) r.push(n)
    return r
  },
  Ig = Ze('HTMLFormElement'),
  Ag = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l
    }),
  pu = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  zg = Ze('RegExp'),
  od = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {}
    ;(Br(n, (l, s) => {
      let i
      ;(i = t(l, s, e)) !== !1 && (r[s] = i || l)
    }),
      Object.defineProperties(e, r))
  },
  Fg = (e) => {
    od(e, (t, n) => {
      if (Le(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1)
        return !1
      const r = e[n]
      if (Le(r)) {
        if (((t.enumerable = !1), 'writable' in t)) {
          t.writable = !1
          return
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'")
          })
      }
    })
  },
  Dg = (e, t) => {
    const n = {},
      r = (l) => {
        l.forEach((s) => {
          n[s] = !0
        })
      }
    return (Hn(e) ? r(e) : r(String(e).split(t)), n)
  },
  Ug = () => {},
  Mg = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t)
function Bg(e) {
  return !!(e && Le(e.append) && e[nd] === 'FormData' && e[hs])
}
const $g = (e) => {
    const t = new Array(10),
      n = (r, l) => {
        if (Mr(r)) {
          if (t.indexOf(r) >= 0) return
          if (Ur(r)) return r
          if (!('toJSON' in r)) {
            t[l] = r
            const s = Hn(r) ? [] : {}
            return (
              Br(r, (i, o) => {
                const u = n(i, l + 1)
                !Dn(u) && (s[o] = u)
              }),
              (t[l] = void 0),
              s
            )
          }
        }
        return r
      }
    return n(e, 0)
  },
  Wg = Ze('AsyncFunction'),
  Hg = (e) => e && (Mr(e) || Le(e)) && Le(e.then) && Le(e.catch),
  ad = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            Jt.addEventListener(
              'message',
              ({ source: l, data: s }) => {
                l === Jt && s === n && r.length && r.shift()()
              },
              !1
            ),
            (l) => {
              ;(r.push(l), Jt.postMessage(n, '*'))
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == 'function',
    Le(Jt.postMessage)
  ),
  Vg =
    typeof queueMicrotask < 'u'
      ? queueMicrotask.bind(Jt)
      : (typeof process < 'u' && process.nextTick) || ad,
  Kg = (e) => e != null && Le(e[hs]),
  E = {
    isArray: Hn,
    isArrayBuffer: rd,
    isBuffer: Ur,
    isFormData: vg,
    isArrayBufferView: ag,
    isString: ug,
    isNumber: ld,
    isBoolean: cg,
    isObject: Mr,
    isPlainObject: xl,
    isEmptyObject: fg,
    isReadableStream: xg,
    isRequest: wg,
    isResponse: Sg,
    isHeaders: kg,
    isUndefined: Dn,
    isDate: dg,
    isFile: pg,
    isBlob: hg,
    isRegExp: zg,
    isFunction: Le,
    isStream: gg,
    isURLSearchParams: yg,
    isTypedArray: Tg,
    isFileList: mg,
    forEach: Br,
    merge: Qi,
    extend: Eg,
    trim: Cg,
    stripBOM: jg,
    inherits: Ng,
    toFlatObject: Pg,
    kindOf: ms,
    kindOfTest: Ze,
    endsWith: _g,
    toArray: Rg,
    forEachEntry: Lg,
    matchAll: Og,
    isHTMLForm: Ig,
    hasOwnProperty: pu,
    hasOwnProp: pu,
    reduceDescriptors: od,
    freezeMethods: Fg,
    toObjectSet: Dg,
    toCamelCase: Ag,
    noop: Ug,
    toFiniteNumber: Mg,
    findKey: sd,
    global: Jt,
    isContextDefined: id,
    isSpecCompliantForm: Bg,
    toJSONObject: $g,
    isAsyncFn: Wg,
    isThenable: Hg,
    setImmediate: ad,
    asap: Vg,
    isIterable: Kg,
  }
function D(e, t, n, r, l) {
  ;(Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    l && ((this.response = l), (this.status = l.status ? l.status : null)))
}
E.inherits(D, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: E.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    }
  },
})
const ud = D.prototype,
  cd = {}
;[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
].forEach((e) => {
  cd[e] = { value: e }
})
Object.defineProperties(D, cd)
Object.defineProperty(ud, 'isAxiosError', { value: !0 })
D.from = (e, t, n, r, l, s) => {
  const i = Object.create(ud)
  E.toFlatObject(
    e,
    i,
    function (f) {
      return f !== Error.prototype
    },
    (c) => c !== 'isAxiosError'
  )
  const o = e && e.message ? e.message : 'Error',
    u = t == null && e ? e.code : t
  return (
    D.call(i, o, u, n, r, l),
    e &&
      i.cause == null &&
      Object.defineProperty(i, 'cause', { value: e, configurable: !0 }),
    (i.name = (e && e.name) || 'Error'),
    s && Object.assign(i, s),
    i
  )
}
const Qg = null
function bi(e) {
  return E.isPlainObject(e) || E.isArray(e)
}
function fd(e) {
  return E.endsWith(e, '[]') ? e.slice(0, -2) : e
}
function hu(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, s) {
          return ((l = fd(l)), !n && s ? '[' + l + ']' : l)
        })
        .join(n ? '.' : '')
    : t
}
function bg(e) {
  return E.isArray(e) && !e.some(bi)
}
const Jg = E.toFlatObject(E, {}, null, function (t) {
  return /^is[A-Z]/.test(t)
})
function vs(e, t, n) {
  if (!E.isObject(e)) throw new TypeError('target must be an object')
  ;((t = t || new FormData()),
    (n = E.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, x) {
        return !E.isUndefined(x[y])
      }
    )))
  const r = n.metaTokens,
    l = n.visitor || f,
    s = n.dots,
    i = n.indexes,
    u = (n.Blob || (typeof Blob < 'u' && Blob)) && E.isSpecCompliantForm(t)
  if (!E.isFunction(l)) throw new TypeError('visitor must be a function')
  function c(m) {
    if (m === null) return ''
    if (E.isDate(m)) return m.toISOString()
    if (E.isBoolean(m)) return m.toString()
    if (!u && E.isBlob(m))
      throw new D('Blob is not supported. Use a Buffer instead.')
    return E.isArrayBuffer(m) || E.isTypedArray(m)
      ? u && typeof Blob == 'function'
        ? new Blob([m])
        : Buffer.from(m)
      : m
  }
  function f(m, y, x) {
    let h = m
    if (m && !x && typeof m == 'object') {
      if (E.endsWith(y, '{}'))
        ((y = r ? y : y.slice(0, -2)), (m = JSON.stringify(m)))
      else if (
        (E.isArray(m) && bg(m)) ||
        ((E.isFileList(m) || E.endsWith(y, '[]')) && (h = E.toArray(m)))
      )
        return (
          (y = fd(y)),
          h.forEach(function (v, C) {
            !(E.isUndefined(v) || v === null) &&
              t.append(
                i === !0 ? hu([y], C, s) : i === null ? y : y + '[]',
                c(v)
              )
          }),
          !1
        )
    }
    return bi(m) ? !0 : (t.append(hu(x, y, s), c(m)), !1)
  }
  const d = [],
    g = Object.assign(Jg, {
      defaultVisitor: f,
      convertValue: c,
      isVisitable: bi,
    })
  function k(m, y) {
    if (!E.isUndefined(m)) {
      if (d.indexOf(m) !== -1)
        throw Error('Circular reference detected in ' + y.join('.'))
      ;(d.push(m),
        E.forEach(m, function (h, p) {
          ;(!(E.isUndefined(h) || h === null) &&
            l.call(t, h, E.isString(p) ? p.trim() : p, y, g)) === !0 &&
            k(h, y ? y.concat(p) : [p])
        }),
        d.pop())
    }
  }
  if (!E.isObject(e)) throw new TypeError('data must be an object')
  return (k(e), t)
}
function mu(e) {
  const t = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\0',
  }
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r]
  })
}
function qo(e, t) {
  ;((this._pairs = []), e && vs(e, this, t))
}
const dd = qo.prototype
dd.append = function (t, n) {
  this._pairs.push([t, n])
}
dd.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, mu)
      }
    : mu
  return this._pairs
    .map(function (l) {
      return n(l[0]) + '=' + n(l[1])
    }, '')
    .join('&')
}
function qg(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
}
function pd(e, t, n) {
  if (!t) return e
  const r = (n && n.encode) || qg
  E.isFunction(n) && (n = { serialize: n })
  const l = n && n.serialize
  let s
  if (
    (l
      ? (s = l(t, n))
      : (s = E.isURLSearchParams(t) ? t.toString() : new qo(t, n).toString(r)),
    s)
  ) {
    const i = e.indexOf('#')
    ;(i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf('?') === -1 ? '?' : '&') + s))
  }
  return e
}
class gu {
  constructor() {
    this.handlers = []
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    )
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null)
  }
  clear() {
    this.handlers && (this.handlers = [])
  }
  forEach(t) {
    E.forEach(this.handlers, function (r) {
      r !== null && t(r)
    })
  }
}
const hd = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Xg = typeof URLSearchParams < 'u' ? URLSearchParams : qo,
  Yg = typeof FormData < 'u' ? FormData : null,
  Gg = typeof Blob < 'u' ? Blob : null,
  Zg = {
    isBrowser: !0,
    classes: { URLSearchParams: Xg, FormData: Yg, Blob: Gg },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  Xo = typeof window < 'u' && typeof document < 'u',
  Ji = (typeof navigator == 'object' && navigator) || void 0,
  ev =
    Xo &&
    (!Ji || ['ReactNative', 'NativeScript', 'NS'].indexOf(Ji.product) < 0),
  tv =
    typeof WorkerGlobalScope < 'u' &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == 'function',
  nv = (Xo && window.location.href) || 'http://localhost',
  rv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Xo,
        hasStandardBrowserEnv: ev,
        hasStandardBrowserWebWorkerEnv: tv,
        navigator: Ji,
        origin: nv,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  we = { ...rv, ...Zg }
function lv(e, t) {
  return vs(e, new we.classes.URLSearchParams(), {
    visitor: function (n, r, l, s) {
      return we.isNode && E.isBuffer(n)
        ? (this.append(r, n.toString('base64')), !1)
        : s.defaultVisitor.apply(this, arguments)
    },
    ...t,
  })
}
function sv(e) {
  return E.matchAll(/\w+|\[(\w*)]/g, e).map((t) =>
    t[0] === '[]' ? '' : t[1] || t[0]
  )
}
function iv(e) {
  const t = {},
    n = Object.keys(e)
  let r
  const l = n.length
  let s
  for (r = 0; r < l; r++) ((s = n[r]), (t[s] = e[s]))
  return t
}
function md(e) {
  function t(n, r, l, s) {
    let i = n[s++]
    if (i === '__proto__') return !0
    const o = Number.isFinite(+i),
      u = s >= n.length
    return (
      (i = !i && E.isArray(l) ? l.length : i),
      u
        ? (E.hasOwnProp(l, i) ? (l[i] = [l[i], r]) : (l[i] = r), !o)
        : ((!l[i] || !E.isObject(l[i])) && (l[i] = []),
          t(n, r, l[i], s) && E.isArray(l[i]) && (l[i] = iv(l[i])),
          !o)
    )
  }
  if (E.isFormData(e) && E.isFunction(e.entries)) {
    const n = {}
    return (
      E.forEachEntry(e, (r, l) => {
        t(sv(r), l, n, 0)
      }),
      n
    )
  }
  return null
}
function ov(e, t, n) {
  if (E.isString(e))
    try {
      return ((t || JSON.parse)(e), E.trim(e))
    } catch (r) {
      if (r.name !== 'SyntaxError') throw r
    }
  return (n || JSON.stringify)(e)
}
const $r = {
  transitional: hd,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || '',
        l = r.indexOf('application/json') > -1,
        s = E.isObject(t)
      if ((s && E.isHTMLForm(t) && (t = new FormData(t)), E.isFormData(t)))
        return l ? JSON.stringify(md(t)) : t
      if (
        E.isArrayBuffer(t) ||
        E.isBuffer(t) ||
        E.isStream(t) ||
        E.isFile(t) ||
        E.isBlob(t) ||
        E.isReadableStream(t)
      )
        return t
      if (E.isArrayBufferView(t)) return t.buffer
      if (E.isURLSearchParams(t))
        return (
          n.setContentType(
            'application/x-www-form-urlencoded;charset=utf-8',
            !1
          ),
          t.toString()
        )
      let o
      if (s) {
        if (r.indexOf('application/x-www-form-urlencoded') > -1)
          return lv(t, this.formSerializer).toString()
        if ((o = E.isFileList(t)) || r.indexOf('multipart/form-data') > -1) {
          const u = this.env && this.env.FormData
          return vs(o ? { 'files[]': t } : t, u && new u(), this.formSerializer)
        }
      }
      return s || l ? (n.setContentType('application/json', !1), ov(t)) : t
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || $r.transitional,
        r = n && n.forcedJSONParsing,
        l = this.responseType === 'json'
      if (E.isResponse(t) || E.isReadableStream(t)) return t
      if (t && E.isString(t) && ((r && !this.responseType) || l)) {
        const i = !(n && n.silentJSONParsing) && l
        try {
          return JSON.parse(t, this.parseReviver)
        } catch (o) {
          if (i)
            throw o.name === 'SyntaxError'
              ? D.from(o, D.ERR_BAD_RESPONSE, this, null, this.response)
              : o
        }
      }
      return t
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: we.classes.FormData, Blob: we.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300
  },
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': void 0,
    },
  },
}
E.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
  $r.headers[e] = {}
})
const av = E.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  uv = (e) => {
    const t = {}
    let n, r, l
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            ;((l = i.indexOf(':')),
              (n = i.substring(0, l).trim().toLowerCase()),
              (r = i.substring(l + 1).trim()),
              !(!n || (t[n] && av[n])) &&
                (n === 'set-cookie'
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ', ' + r : r)))
          }),
      t
    )
  },
  vu = Symbol('internals')
function Zn(e) {
  return e && String(e).trim().toLowerCase()
}
function wl(e) {
  return e === !1 || e == null ? e : E.isArray(e) ? e.map(wl) : String(e)
}
function cv(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
  let r
  for (; (r = n.exec(e)); ) t[r[1]] = r[2]
  return t
}
const fv = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
function Qs(e, t, n, r, l) {
  if (E.isFunction(r)) return r.call(this, t, n)
  if ((l && (t = n), !!E.isString(t))) {
    if (E.isString(r)) return t.indexOf(r) !== -1
    if (E.isRegExp(r)) return r.test(t)
  }
}
function dv(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r)
}
function pv(e, t) {
  const n = E.toCamelCase(' ' + t)
  ;['get', 'set', 'has'].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (l, s, i) {
        return this[r].call(this, t, l, s, i)
      },
      configurable: !0,
    })
  })
}
let Oe = class {
  constructor(t) {
    t && this.set(t)
  }
  set(t, n, r) {
    const l = this
    function s(o, u, c) {
      const f = Zn(u)
      if (!f) throw new Error('header name must be a non-empty string')
      const d = E.findKey(l, f)
      ;(!d || l[d] === void 0 || c === !0 || (c === void 0 && l[d] !== !1)) &&
        (l[d || u] = wl(o))
    }
    const i = (o, u) => E.forEach(o, (c, f) => s(c, f, u))
    if (E.isPlainObject(t) || t instanceof this.constructor) i(t, n)
    else if (E.isString(t) && (t = t.trim()) && !fv(t)) i(uv(t), n)
    else if (E.isObject(t) && E.isIterable(t)) {
      let o = {},
        u,
        c
      for (const f of t) {
        if (!E.isArray(f))
          throw TypeError('Object iterator must return a key-value pair')
        o[(c = f[0])] = (u = o[c])
          ? E.isArray(u)
            ? [...u, f[1]]
            : [u, f[1]]
          : f[1]
      }
      i(o, n)
    } else t != null && s(n, t, r)
    return this
  }
  get(t, n) {
    if (((t = Zn(t)), t)) {
      const r = E.findKey(this, t)
      if (r) {
        const l = this[r]
        if (!n) return l
        if (n === !0) return cv(l)
        if (E.isFunction(n)) return n.call(this, l, r)
        if (E.isRegExp(n)) return n.exec(l)
        throw new TypeError('parser must be boolean|regexp|function')
      }
    }
  }
  has(t, n) {
    if (((t = Zn(t)), t)) {
      const r = E.findKey(this, t)
      return !!(r && this[r] !== void 0 && (!n || Qs(this, this[r], r, n)))
    }
    return !1
  }
  delete(t, n) {
    const r = this
    let l = !1
    function s(i) {
      if (((i = Zn(i)), i)) {
        const o = E.findKey(r, i)
        o && (!n || Qs(r, r[o], o, n)) && (delete r[o], (l = !0))
      }
    }
    return (E.isArray(t) ? t.forEach(s) : s(t), l)
  }
  clear(t) {
    const n = Object.keys(this)
    let r = n.length,
      l = !1
    for (; r--; ) {
      const s = n[r]
      ;(!t || Qs(this, this[s], s, t, !0)) && (delete this[s], (l = !0))
    }
    return l
  }
  normalize(t) {
    const n = this,
      r = {}
    return (
      E.forEach(this, (l, s) => {
        const i = E.findKey(r, s)
        if (i) {
          ;((n[i] = wl(l)), delete n[s])
          return
        }
        const o = t ? dv(s) : String(s).trim()
        ;(o !== s && delete n[s], (n[o] = wl(l)), (r[o] = !0))
      }),
      this
    )
  }
  concat(...t) {
    return this.constructor.concat(this, ...t)
  }
  toJSON(t) {
    const n = Object.create(null)
    return (
      E.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && E.isArray(r) ? r.join(', ') : r)
      }),
      n
    )
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`)
  }
  getSetCookie() {
    return this.get('set-cookie') || []
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders'
  }
  static from(t) {
    return t instanceof this ? t : new this(t)
  }
  static concat(t, ...n) {
    const r = new this(t)
    return (n.forEach((l) => r.set(l)), r)
  }
  static accessor(t) {
    const r = (this[vu] = this[vu] = { accessors: {} }).accessors,
      l = this.prototype
    function s(i) {
      const o = Zn(i)
      r[o] || (pv(l, i), (r[o] = !0))
    }
    return (E.isArray(t) ? t.forEach(s) : s(t), this)
  }
}
Oe.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
])
E.reduceDescriptors(Oe.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1)
  return {
    get: () => e,
    set(r) {
      this[n] = r
    },
  }
})
E.freezeMethods(Oe)
function bs(e, t) {
  const n = this || $r,
    r = t || n,
    l = Oe.from(r.headers)
  let s = r.data
  return (
    E.forEach(e, function (o) {
      s = o.call(n, s, l.normalize(), t ? t.status : void 0)
    }),
    l.normalize(),
    s
  )
}
function gd(e) {
  return !!(e && e.__CANCEL__)
}
function Vn(e, t, n) {
  ;(D.call(this, e ?? 'canceled', D.ERR_CANCELED, t, n),
    (this.name = 'CanceledError'))
}
E.inherits(Vn, D, { __CANCEL__: !0 })
function vd(e, t, n) {
  const r = n.config.validateStatus
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new D(
          'Request failed with status code ' + n.status,
          [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      )
}
function hv(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e)
  return (t && t[1]) || ''
}
function mv(e, t) {
  e = e || 10
  const n = new Array(e),
    r = new Array(e)
  let l = 0,
    s = 0,
    i
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const c = Date.now(),
        f = r[s]
      ;(i || (i = c), (n[l] = u), (r[l] = c))
      let d = s,
        g = 0
      for (; d !== l; ) ((g += n[d++]), (d = d % e))
      if (((l = (l + 1) % e), l === s && (s = (s + 1) % e), c - i < t)) return
      const k = f && c - f
      return k ? Math.round((g * 1e3) / k) : void 0
    }
  )
}
function gv(e, t) {
  let n = 0,
    r = 1e3 / t,
    l,
    s
  const i = (c, f = Date.now()) => {
    ;((n = f), (l = null), s && (clearTimeout(s), (s = null)), e(...c))
  }
  return [
    (...c) => {
      const f = Date.now(),
        d = f - n
      d >= r
        ? i(c, f)
        : ((l = c),
          s ||
            (s = setTimeout(() => {
              ;((s = null), i(l))
            }, r - d)))
    },
    () => l && i(l),
  ]
}
const Jl = (e, t, n = 3) => {
    let r = 0
    const l = mv(50, 250)
    return gv((s) => {
      const i = s.loaded,
        o = s.lengthComputable ? s.total : void 0,
        u = i - r,
        c = l(u),
        f = i <= o
      r = i
      const d = {
        loaded: i,
        total: o,
        progress: o ? i / o : void 0,
        bytes: u,
        rate: c || void 0,
        estimated: c && o && f ? (o - i) / c : void 0,
        event: s,
        lengthComputable: o != null,
        [t ? 'download' : 'upload']: !0,
      }
      e(d)
    }, n)
  },
  yu = (e, t) => {
    const n = e != null
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]]
  },
  xu =
    (e) =>
    (...t) =>
      E.asap(() => e(...t)),
  vv = we.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, we.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(we.origin),
        we.navigator && /(msie|trident)/i.test(we.navigator.userAgent)
      )
    : () => !0,
  yv = we.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, l, s) {
          const i = [e + '=' + encodeURIComponent(t)]
          ;(E.isNumber(n) && i.push('expires=' + new Date(n).toGMTString()),
            E.isString(r) && i.push('path=' + r),
            E.isString(l) && i.push('domain=' + l),
            s === !0 && i.push('secure'),
            (document.cookie = i.join('; ')))
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
          )
          return t ? decodeURIComponent(t[3]) : null
        },
        remove(e) {
          this.write(e, '', Date.now() - 864e5)
        },
      }
    : {
        write() {},
        read() {
          return null
        },
        remove() {},
      }
function xv(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function wv(e, t) {
  return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e
}
function yd(e, t, n) {
  let r = !xv(t)
  return e && (r || n == !1) ? wv(e, t) : t
}
const wu = (e) => (e instanceof Oe ? { ...e } : e)
function sn(e, t) {
  t = t || {}
  const n = {}
  function r(c, f, d, g) {
    return E.isPlainObject(c) && E.isPlainObject(f)
      ? E.merge.call({ caseless: g }, c, f)
      : E.isPlainObject(f)
        ? E.merge({}, f)
        : E.isArray(f)
          ? f.slice()
          : f
  }
  function l(c, f, d, g) {
    if (E.isUndefined(f)) {
      if (!E.isUndefined(c)) return r(void 0, c, d, g)
    } else return r(c, f, d, g)
  }
  function s(c, f) {
    if (!E.isUndefined(f)) return r(void 0, f)
  }
  function i(c, f) {
    if (E.isUndefined(f)) {
      if (!E.isUndefined(c)) return r(void 0, c)
    } else return r(void 0, f)
  }
  function o(c, f, d) {
    if (d in t) return r(c, f)
    if (d in e) return r(void 0, c)
  }
  const u = {
    url: s,
    method: s,
    data: s,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: o,
    headers: (c, f, d) => l(wu(c), wu(f), d, !0),
  }
  return (
    E.forEach(Object.keys({ ...e, ...t }), function (f) {
      const d = u[f] || l,
        g = d(e[f], t[f], f)
      ;(E.isUndefined(g) && d !== o) || (n[f] = g)
    }),
    n
  )
}
const xd = (e) => {
    const t = sn({}, e)
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: l,
      xsrfCookieName: s,
      headers: i,
      auth: o,
    } = t
    if (
      ((t.headers = i = Oe.from(i)),
      (t.url = pd(
        yd(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      o &&
        i.set(
          'Authorization',
          'Basic ' +
            btoa(
              (o.username || '') +
                ':' +
                (o.password ? unescape(encodeURIComponent(o.password)) : '')
            )
        ),
      E.isFormData(n))
    ) {
      if (we.hasStandardBrowserEnv || we.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0)
      else if (E.isFunction(n.getHeaders)) {
        const u = n.getHeaders(),
          c = ['content-type', 'content-length']
        Object.entries(u).forEach(([f, d]) => {
          c.includes(f.toLowerCase()) && i.set(f, d)
        })
      }
    }
    if (
      we.hasStandardBrowserEnv &&
      (r && E.isFunction(r) && (r = r(t)), r || (r !== !1 && vv(t.url)))
    ) {
      const u = l && s && yv.read(s)
      u && i.set(l, u)
    }
    return t
  },
  Sv = typeof XMLHttpRequest < 'u',
  kv =
    Sv &&
    function (e) {
      return new Promise(function (n, r) {
        const l = xd(e)
        let s = l.data
        const i = Oe.from(l.headers).normalize()
        let { responseType: o, onUploadProgress: u, onDownloadProgress: c } = l,
          f,
          d,
          g,
          k,
          m
        function y() {
          ;(k && k(),
            m && m(),
            l.cancelToken && l.cancelToken.unsubscribe(f),
            l.signal && l.signal.removeEventListener('abort', f))
        }
        let x = new XMLHttpRequest()
        ;(x.open(l.method.toUpperCase(), l.url, !0), (x.timeout = l.timeout))
        function h() {
          if (!x) return
          const v = Oe.from(
              'getAllResponseHeaders' in x && x.getAllResponseHeaders()
            ),
            j = {
              data:
                !o || o === 'text' || o === 'json'
                  ? x.responseText
                  : x.response,
              status: x.status,
              statusText: x.statusText,
              headers: v,
              config: e,
              request: x,
            }
          ;(vd(
            function (P) {
              ;(n(P), y())
            },
            function (P) {
              ;(r(P), y())
            },
            j
          ),
            (x = null))
        }
        ;('onloadend' in x
          ? (x.onloadend = h)
          : (x.onreadystatechange = function () {
              !x ||
                x.readyState !== 4 ||
                (x.status === 0 &&
                  !(x.responseURL && x.responseURL.indexOf('file:') === 0)) ||
                setTimeout(h)
            }),
          (x.onabort = function () {
            x && (r(new D('Request aborted', D.ECONNABORTED, e, x)), (x = null))
          }),
          (x.onerror = function (C) {
            const j = C && C.message ? C.message : 'Network Error',
              _ = new D(j, D.ERR_NETWORK, e, x)
            ;((_.event = C || null), r(_), (x = null))
          }),
          (x.ontimeout = function () {
            let C = l.timeout
              ? 'timeout of ' + l.timeout + 'ms exceeded'
              : 'timeout exceeded'
            const j = l.transitional || hd
            ;(l.timeoutErrorMessage && (C = l.timeoutErrorMessage),
              r(
                new D(
                  C,
                  j.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
                  e,
                  x
                )
              ),
              (x = null))
          }),
          s === void 0 && i.setContentType(null),
          'setRequestHeader' in x &&
            E.forEach(i.toJSON(), function (C, j) {
              x.setRequestHeader(j, C)
            }),
          E.isUndefined(l.withCredentials) ||
            (x.withCredentials = !!l.withCredentials),
          o && o !== 'json' && (x.responseType = l.responseType),
          c && (([g, m] = Jl(c, !0)), x.addEventListener('progress', g)),
          u &&
            x.upload &&
            (([d, k] = Jl(u)),
            x.upload.addEventListener('progress', d),
            x.upload.addEventListener('loadend', k)),
          (l.cancelToken || l.signal) &&
            ((f = (v) => {
              x &&
                (r(!v || v.type ? new Vn(null, e, x) : v),
                x.abort(),
                (x = null))
            }),
            l.cancelToken && l.cancelToken.subscribe(f),
            l.signal &&
              (l.signal.aborted ? f() : l.signal.addEventListener('abort', f))))
        const p = hv(l.url)
        if (p && we.protocols.indexOf(p) === -1) {
          r(new D('Unsupported protocol ' + p + ':', D.ERR_BAD_REQUEST, e))
          return
        }
        x.send(s || null)
      })
    },
  Cv = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : [])
    if (t || n) {
      let r = new AbortController(),
        l
      const s = function (c) {
        if (!l) {
          ;((l = !0), o())
          const f = c instanceof Error ? c : this.reason
          r.abort(
            f instanceof D ? f : new Vn(f instanceof Error ? f.message : f)
          )
        }
      }
      let i =
        t &&
        setTimeout(() => {
          ;((i = null), s(new D(`timeout ${t} of ms exceeded`, D.ETIMEDOUT)))
        }, t)
      const o = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((c) => {
            c.unsubscribe ? c.unsubscribe(s) : c.removeEventListener('abort', s)
          }),
          (e = null))
      }
      e.forEach((c) => c.addEventListener('abort', s))
      const { signal: u } = r
      return ((u.unsubscribe = () => E.asap(o)), u)
    }
  },
  Ev = function* (e, t) {
    let n = e.byteLength
    if (n < t) {
      yield e
      return
    }
    let r = 0,
      l
    for (; r < n; ) ((l = r + t), yield e.slice(r, l), (r = l))
  },
  jv = async function* (e, t) {
    for await (const n of Nv(e)) yield* Ev(n, t)
  },
  Nv = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e
      return
    }
    const t = e.getReader()
    try {
      for (;;) {
        const { done: n, value: r } = await t.read()
        if (n) break
        yield r
      }
    } finally {
      await t.cancel()
    }
  },
  Su = (e, t, n, r) => {
    const l = jv(e, t)
    let s = 0,
      i,
      o = (u) => {
        i || ((i = !0), r && r(u))
      }
    return new ReadableStream(
      {
        async pull(u) {
          try {
            const { done: c, value: f } = await l.next()
            if (c) {
              ;(o(), u.close())
              return
            }
            let d = f.byteLength
            if (n) {
              let g = (s += d)
              n(g)
            }
            u.enqueue(new Uint8Array(f))
          } catch (c) {
            throw (o(c), c)
          }
        },
        cancel(u) {
          return (o(u), l.return())
        },
      },
      { highWaterMark: 2 }
    )
  },
  ku = 64 * 1024,
  { isFunction: il } = E,
  Pv = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
    E.global
  ),
  { ReadableStream: Cu, TextEncoder: Eu } = E.global,
  ju = (e, ...t) => {
    try {
      return !!e(...t)
    } catch {
      return !1
    }
  },
  _v = (e) => {
    e = E.merge.call({ skipUndefined: !0 }, Pv, e)
    const { fetch: t, Request: n, Response: r } = e,
      l = t ? il(t) : typeof fetch == 'function',
      s = il(n),
      i = il(r)
    if (!l) return !1
    const o = l && il(Cu),
      u =
        l &&
        (typeof Eu == 'function'
          ? (
              (m) => (y) =>
                m.encode(y)
            )(new Eu())
          : async (m) => new Uint8Array(await new n(m).arrayBuffer())),
      c =
        s &&
        o &&
        ju(() => {
          let m = !1
          const y = new n(we.origin, {
            body: new Cu(),
            method: 'POST',
            get duplex() {
              return ((m = !0), 'half')
            },
          }).headers.has('Content-Type')
          return m && !y
        }),
      f = i && o && ju(() => E.isReadableStream(new r('').body)),
      d = { stream: f && ((m) => m.body) }
    l &&
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((m) => {
        !d[m] &&
          (d[m] = (y, x) => {
            let h = y && y[m]
            if (h) return h.call(y)
            throw new D(
              `Response type '${m}' is not supported`,
              D.ERR_NOT_SUPPORT,
              x
            )
          })
      })
    const g = async (m) => {
        if (m == null) return 0
        if (E.isBlob(m)) return m.size
        if (E.isSpecCompliantForm(m))
          return (
            await new n(we.origin, { method: 'POST', body: m }).arrayBuffer()
          ).byteLength
        if (E.isArrayBufferView(m) || E.isArrayBuffer(m)) return m.byteLength
        if ((E.isURLSearchParams(m) && (m = m + ''), E.isString(m)))
          return (await u(m)).byteLength
      },
      k = async (m, y) => {
        const x = E.toFiniteNumber(m.getContentLength())
        return x ?? g(y)
      }
    return async (m) => {
      let {
          url: y,
          method: x,
          data: h,
          signal: p,
          cancelToken: v,
          timeout: C,
          onDownloadProgress: j,
          onUploadProgress: _,
          responseType: P,
          headers: T,
          withCredentials: U = 'same-origin',
          fetchOptions: z,
        } = xd(m),
        Q = t || fetch
      P = P ? (P + '').toLowerCase() : 'text'
      let te = Cv([p, v && v.toAbortSignal()], C),
        ne = null
      const L =
        te &&
        te.unsubscribe &&
        (() => {
          te.unsubscribe()
        })
      let de
      try {
        if (
          _ &&
          c &&
          x !== 'get' &&
          x !== 'head' &&
          (de = await k(T, h)) !== 0
        ) {
          let I = new n(y, { method: 'POST', body: h, duplex: 'half' }),
            A
          if (
            (E.isFormData(h) &&
              (A = I.headers.get('content-type')) &&
              T.setContentType(A),
            I.body)
          ) {
            const [se, oe] = yu(de, Jl(xu(_)))
            h = Su(I.body, ku, se, oe)
          }
        }
        E.isString(U) || (U = U ? 'include' : 'omit')
        const b = s && 'credentials' in n.prototype,
          et = {
            ...z,
            signal: te,
            method: x.toUpperCase(),
            headers: T.normalize().toJSON(),
            body: h,
            duplex: 'half',
            credentials: b ? U : void 0,
          }
        ne = s && new n(y, et)
        let R = await (s ? Q(ne, z) : Q(y, et))
        const F = f && (P === 'stream' || P === 'response')
        if (f && (j || (F && L))) {
          const I = {}
          ;['status', 'statusText', 'headers'].forEach((tt) => {
            I[tt] = R[tt]
          })
          const A = E.toFiniteNumber(R.headers.get('content-length')),
            [se, oe] = (j && yu(A, Jl(xu(j), !0))) || []
          R = new r(
            Su(R.body, ku, se, () => {
              ;(oe && oe(), L && L())
            }),
            I
          )
        }
        P = P || 'text'
        let w = await d[E.findKey(d, P) || 'text'](R, m)
        return (
          !F && L && L(),
          await new Promise((I, A) => {
            vd(I, A, {
              data: w,
              headers: Oe.from(R.headers),
              status: R.status,
              statusText: R.statusText,
              config: m,
              request: ne,
            })
          })
        )
      } catch (b) {
        throw (
          L && L(),
          b && b.name === 'TypeError' && /Load failed|fetch/i.test(b.message)
            ? Object.assign(new D('Network Error', D.ERR_NETWORK, m, ne), {
                cause: b.cause || b,
              })
            : D.from(b, b && b.code, m, ne)
        )
      }
    }
  },
  Rv = new Map(),
  wd = (e) => {
    let t = e ? e.env : {}
    const { fetch: n, Request: r, Response: l } = t,
      s = [r, l, n]
    let i = s.length,
      o = i,
      u,
      c,
      f = Rv
    for (; o--; )
      ((u = s[o]),
        (c = f.get(u)),
        c === void 0 && f.set(u, (c = o ? new Map() : _v(t))),
        (f = c))
    return c
  }
wd()
const qi = { http: Qg, xhr: kv, fetch: { get: wd } }
E.forEach(qi, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', { value: t })
    } catch {}
    Object.defineProperty(e, 'adapterName', { value: t })
  }
})
const Nu = (e) => `- ${e}`,
  Tv = (e) => E.isFunction(e) || e === null || e === !1,
  Sd = {
    getAdapter: (e, t) => {
      e = E.isArray(e) ? e : [e]
      const { length: n } = e
      let r, l
      const s = {}
      for (let i = 0; i < n; i++) {
        r = e[i]
        let o
        if (
          ((l = r),
          !Tv(r) && ((l = qi[(o = String(r)).toLowerCase()]), l === void 0))
        )
          throw new D(`Unknown adapter '${o}'`)
        if (l && (E.isFunction(l) || (l = l.get(t)))) break
        s[o || '#' + i] = l
      }
      if (!l) {
        const i = Object.entries(s).map(
          ([u, c]) =>
            `adapter ${u} ` +
            (c === !1
              ? 'is not supported by the environment'
              : 'is not available in the build')
        )
        let o = n
          ? i.length > 1
            ? `since :
` +
              i.map(Nu).join(`
`)
            : ' ' + Nu(i[0])
          : 'as no adapter specified'
        throw new D(
          'There is no suitable adapter to dispatch the request ' + o,
          'ERR_NOT_SUPPORT'
        )
      }
      return l
    },
    adapters: qi,
  }
function Js(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Vn(null, e)
}
function Pu(e) {
  return (
    Js(e),
    (e.headers = Oe.from(e.headers)),
    (e.data = bs.call(e, e.transformRequest)),
    ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1),
    Sd.getAdapter(
      e.adapter || $r.adapter,
      e
    )(e).then(
      function (r) {
        return (
          Js(e),
          (r.data = bs.call(e, e.transformResponse, r)),
          (r.headers = Oe.from(r.headers)),
          r
        )
      },
      function (r) {
        return (
          gd(r) ||
            (Js(e),
            r &&
              r.response &&
              ((r.response.data = bs.call(e, e.transformResponse, r.response)),
              (r.response.headers = Oe.from(r.response.headers)))),
          Promise.reject(r)
        )
      }
    )
  )
}
const kd = '1.12.2',
  ys = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
  (e, t) => {
    ys[e] = function (r) {
      return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e
    }
  }
)
const _u = {}
ys.transitional = function (t, n, r) {
  function l(s, i) {
    return (
      '[Axios v' +
      kd +
      "] Transitional option '" +
      s +
      "'" +
      i +
      (r ? '. ' + r : '')
    )
  }
  return (s, i, o) => {
    if (t === !1)
      throw new D(
        l(i, ' has been removed' + (n ? ' in ' + n : '')),
        D.ERR_DEPRECATED
      )
    return (
      n &&
        !_u[i] &&
        ((_u[i] = !0),
        console.warn(
          l(
            i,
            ' has been deprecated since v' +
              n +
              ' and will be removed in the near future'
          )
        )),
      t ? t(s, i, o) : !0
    )
  }
}
ys.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0)
}
function Lv(e, t, n) {
  if (typeof e != 'object')
    throw new D('options must be an object', D.ERR_BAD_OPTION_VALUE)
  const r = Object.keys(e)
  let l = r.length
  for (; l-- > 0; ) {
    const s = r[l],
      i = t[s]
    if (i) {
      const o = e[s],
        u = o === void 0 || i(o, s, e)
      if (u !== !0)
        throw new D('option ' + s + ' must be ' + u, D.ERR_BAD_OPTION_VALUE)
      continue
    }
    if (n !== !0) throw new D('Unknown option ' + s, D.ERR_BAD_OPTION)
  }
}
const Sl = { assertOptions: Lv, validators: ys },
  rt = Sl.validators
let Yt = class {
  constructor(t) {
    ;((this.defaults = t || {}),
      (this.interceptors = { request: new gu(), response: new gu() }))
  }
  async request(t, n) {
    try {
      return await this._request(t, n)
    } catch (r) {
      if (r instanceof Error) {
        let l = {}
        Error.captureStackTrace ? Error.captureStackTrace(l) : (l = new Error())
        const s = l.stack ? l.stack.replace(/^.+\n/, '') : ''
        try {
          r.stack
            ? s &&
              !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, '')) &&
              (r.stack +=
                `
` + s)
            : (r.stack = s)
        } catch {}
      }
      throw r
    }
  }
  _request(t, n) {
    ;(typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = sn(this.defaults, n)))
    const { transitional: r, paramsSerializer: l, headers: s } = n
    ;(r !== void 0 &&
      Sl.assertOptions(
        r,
        {
          silentJSONParsing: rt.transitional(rt.boolean),
          forcedJSONParsing: rt.transitional(rt.boolean),
          clarifyTimeoutError: rt.transitional(rt.boolean),
        },
        !1
      ),
      l != null &&
        (E.isFunction(l)
          ? (n.paramsSerializer = { serialize: l })
          : Sl.assertOptions(
              l,
              { encode: rt.function, serialize: rt.function },
              !0
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Sl.assertOptions(
        n,
        {
          baseUrl: rt.spelling('baseURL'),
          withXsrfToken: rt.spelling('withXSRFToken'),
        },
        !0
      ),
      (n.method = (n.method || this.defaults.method || 'get').toLowerCase()))
    let i = s && E.merge(s.common, s[n.method])
    ;(s &&
      E.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        (m) => {
          delete s[m]
        }
      ),
      (n.headers = Oe.concat(i, s)))
    const o = []
    let u = !0
    this.interceptors.request.forEach(function (y) {
      ;(typeof y.runWhen == 'function' && y.runWhen(n) === !1) ||
        ((u = u && y.synchronous), o.unshift(y.fulfilled, y.rejected))
    })
    const c = []
    this.interceptors.response.forEach(function (y) {
      c.push(y.fulfilled, y.rejected)
    })
    let f,
      d = 0,
      g
    if (!u) {
      const m = [Pu.bind(this), void 0]
      for (
        m.unshift(...o), m.push(...c), g = m.length, f = Promise.resolve(n);
        d < g;

      )
        f = f.then(m[d++], m[d++])
      return f
    }
    g = o.length
    let k = n
    for (; d < g; ) {
      const m = o[d++],
        y = o[d++]
      try {
        k = m(k)
      } catch (x) {
        y.call(this, x)
        break
      }
    }
    try {
      f = Pu.call(this, k)
    } catch (m) {
      return Promise.reject(m)
    }
    for (d = 0, g = c.length; d < g; ) f = f.then(c[d++], c[d++])
    return f
  }
  getUri(t) {
    t = sn(this.defaults, t)
    const n = yd(t.baseURL, t.url, t.allowAbsoluteUrls)
    return pd(n, t.params, t.paramsSerializer)
  }
}
E.forEach(['delete', 'get', 'head', 'options'], function (t) {
  Yt.prototype[t] = function (n, r) {
    return this.request(
      sn(r || {}, { method: t, url: n, data: (r || {}).data })
    )
  }
})
E.forEach(['post', 'put', 'patch'], function (t) {
  function n(r) {
    return function (s, i, o) {
      return this.request(
        sn(o || {}, {
          method: t,
          headers: r ? { 'Content-Type': 'multipart/form-data' } : {},
          url: s,
          data: i,
        })
      )
    }
  }
  ;((Yt.prototype[t] = n()), (Yt.prototype[t + 'Form'] = n(!0)))
})
let Ov = class Cd {
  constructor(t) {
    if (typeof t != 'function')
      throw new TypeError('executor must be a function.')
    let n
    this.promise = new Promise(function (s) {
      n = s
    })
    const r = this
    ;(this.promise.then((l) => {
      if (!r._listeners) return
      let s = r._listeners.length
      for (; s-- > 0; ) r._listeners[s](l)
      r._listeners = null
    }),
      (this.promise.then = (l) => {
        let s
        const i = new Promise((o) => {
          ;(r.subscribe(o), (s = o))
        }).then(l)
        return (
          (i.cancel = function () {
            r.unsubscribe(s)
          }),
          i
        )
      }),
      t(function (s, i, o) {
        r.reason || ((r.reason = new Vn(s, i, o)), n(r.reason))
      }))
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason)
      return
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t])
  }
  unsubscribe(t) {
    if (!this._listeners) return
    const n = this._listeners.indexOf(t)
    n !== -1 && this._listeners.splice(n, 1)
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r)
      }
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    )
  }
  static source() {
    let t
    return {
      token: new Cd(function (l) {
        t = l
      }),
      cancel: t,
    }
  }
}
function Iv(e) {
  return function (n) {
    return e.apply(null, n)
  }
}
function Av(e) {
  return E.isObject(e) && e.isAxiosError === !0
}
const Xi = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
}
Object.entries(Xi).forEach(([e, t]) => {
  Xi[t] = e
})
function Ed(e) {
  const t = new Yt(e),
    n = td(Yt.prototype.request, t)
  return (
    E.extend(n, Yt.prototype, t, { allOwnKeys: !0 }),
    E.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (l) {
      return Ed(sn(e, l))
    }),
    n
  )
}
const le = Ed($r)
le.Axios = Yt
le.CanceledError = Vn
le.CancelToken = Ov
le.isCancel = gd
le.VERSION = kd
le.toFormData = vs
le.AxiosError = D
le.Cancel = le.CanceledError
le.all = function (t) {
  return Promise.all(t)
}
le.spread = Iv
le.isAxiosError = Av
le.mergeConfig = sn
le.AxiosHeaders = Oe
le.formToJSON = (e) => md(E.isHTMLForm(e) ? new FormData(e) : e)
le.getAdapter = Sd.getAdapter
le.HttpStatusCode = Xi
le.default = le
const {
    Axios: oy,
    AxiosError: ay,
    CanceledError: uy,
    isCancel: cy,
    CancelToken: fy,
    VERSION: dy,
    all: py,
    Cancel: hy,
    isAxiosError: my,
    spread: gy,
    toFormData: vy,
    AxiosHeaders: yy,
    HttpStatusCode: xy,
    formToJSON: wy,
    getAdapter: Sy,
    mergeConfig: ky,
  } = le,
  $ = le.create({ baseURL: 'http://localhost:5000' })
function zv() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || ''
}
$.interceptors.request.use((e) => {
  const t = zv()
  return (t && (e.headers.Authorization = `Bearer ${t}`), e)
})
function Fv() {
  const [e, t] = S.useState(''),
    [n, r] = S.useState(''),
    [l, s] = S.useState(!0),
    [i, o] = S.useState(''),
    u = Ge(),
    c = async (f) => {
      var d, g
      ;(f.preventDefault(), o(''))
      try {
        const k = await $.post('/auth/login', { email: e, password: n })
        ;(sessionStorage.setItem('token', k.data.token),
          l && localStorage.setItem('token', k.data.token),
          sessionStorage.setItem('user', JSON.stringify(k.data.user)),
          u('/app'))
      } catch (k) {
        o(
          ((g = (d = k.response) == null ? void 0 : d.data) == null
            ? void 0
            : g.error) || k.message
        )
      }
    }
  return a.jsxs('div', {
    children: [
      a.jsx(Dr, {}),
      a.jsx('div', {
        className: 'center',
        style: { minHeight: 'calc(100vh - 58px)' },
        children: a.jsxs('form', {
          className: 'card col',
          style: { width: 380 },
          onSubmit: c,
          children: [
            a.jsx('h3', { children: 'Login' }),
            a.jsx('input', {
              className: 'input',
              placeholder: 'Email',
              value: e,
              onChange: (f) => t(f.target.value),
            }),
            a.jsx('input', {
              className: 'input',
              type: 'password',
              placeholder: 'Kata Sandi',
              value: n,
              onChange: (f) => r(f.target.value),
            }),
            a.jsxs('label', {
              style: { display: 'flex', alignItems: 'center', gap: 8 },
              children: [
                a.jsx('input', {
                  type: 'checkbox',
                  checked: l,
                  onChange: (f) => s(f.target.checked),
                }),
                'Remember me',
              ],
            }),
            i && a.jsx('div', { style: { color: '#ef4444' }, children: i }),
            a.jsx('button', { className: 'btn', children: 'Masuk' }),
            a.jsxs('div', {
              children: [
                'Belum punya akun? ',
                a.jsx(ln, { to: '/register', children: 'Daftar' }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
function Dv() {
  const [e, t] = S.useState(''),
    [n, r] = S.useState(''),
    [l, s] = S.useState(''),
    [i, o] = S.useState(''),
    [u, c] = S.useState(''),
    f = Ge(),
    d = async (g) => {
      var k, m
      ;(g.preventDefault(), c(''), o(''))
      try {
        ;(await $.post('/auth/register', { name: e, email: n, password: l }),
          o(
            'Registrasi berhasil. Cek email untuk OTP atau lihat console server.'
          ),
          setTimeout(() => f('/verify?email=' + encodeURIComponent(n)), 800))
      } catch (y) {
        c(
          ((m = (k = y.response) == null ? void 0 : k.data) == null
            ? void 0
            : m.error) || y.message
        )
      }
    }
  return a.jsxs('div', {
    children: [
      a.jsx(Dr, {}),
      a.jsx('div', {
        className: 'center',
        style: { minHeight: 'calc(100vh - 58px)' },
        children: a.jsxs('form', {
          className: 'card col',
          style: { width: 420 },
          onSubmit: d,
          children: [
            a.jsx('h3', { children: 'Daftar Akun' }),
            a.jsx('input', {
              className: 'input',
              placeholder: 'Nama',
              value: e,
              onChange: (g) => t(g.target.value),
            }),
            a.jsx('input', {
              className: 'input',
              placeholder: 'Email',
              value: n,
              onChange: (g) => r(g.target.value),
            }),
            a.jsx('input', {
              className: 'input',
              type: 'password',
              placeholder: 'Kata Sandi',
              value: l,
              onChange: (g) => s(g.target.value),
            }),
            i && a.jsx('div', { className: 'badge', children: i }),
            u && a.jsx('div', { style: { color: '#ef4444' }, children: u }),
            a.jsx('button', { className: 'btn', children: 'Daftar' }),
            a.jsxs('div', {
              children: [
                'Sudah punya akun? ',
                a.jsx(ln, { to: '/login', children: 'Login' }),
              ],
            }),
          ],
        }),
      }),
    ],
  })
}
function Uv() {
  const [e, t] = S.useState(''),
    [n, r] = S.useState(''),
    [l, s] = S.useState(''),
    [i, o] = S.useState(''),
    [u] = lg(),
    c = Ge()
  S.useEffect(() => {
    const d = u.get('email')
    d && t(d)
  }, [])
  const f = async (d) => {
    var g, k
    ;(d.preventDefault(), o(''), s(''))
    try {
      ;(await $.post('/auth/verify', { email: e, code: n }),
        s('Verifikasi berhasil. Silakan login.'),
        setTimeout(() => c('/login'), 800))
    } catch (m) {
      o(
        ((k = (g = m.response) == null ? void 0 : g.data) == null
          ? void 0
          : k.error) || m.message
      )
    }
  }
  return a.jsxs('div', {
    children: [
      a.jsx(Dr, {}),
      a.jsx('div', {
        className: 'center',
        style: { minHeight: 'calc(100vh - 58px)' },
        children: a.jsxs('form', {
          className: 'card col',
          style: { width: 380 },
          onSubmit: f,
          children: [
            a.jsx('h3', { children: 'Verifikasi OTP' }),
            a.jsx('input', {
              className: 'input',
              placeholder: 'Email',
              value: e,
              onChange: (d) => t(d.target.value),
            }),
            a.jsx('input', {
              className: 'input',
              placeholder: 'Kode OTP 6 digit',
              value: n,
              onChange: (d) => r(d.target.value),
            }),
            l && a.jsx('div', { className: 'badge', children: l }),
            i && a.jsx('div', { style: { color: '#ef4444' }, children: i }),
            a.jsx('button', { className: 'btn', children: 'Verifikasi' }),
          ],
        }),
      }),
    ],
  })
}
const Mv = [
  ['chat', 'Chat', '/app'],
  ['analytics', 'Analytics', '/app/analytics'],
  ['contacts', 'Contacts', '/app/contacts'],
  ['platforms', 'Connected Platforms', '/app/platforms'],
  ['agents', 'AI Agents', '/app/agents'],
  ['humans', 'Human Agents', '/app/humans'],
  ['settings', 'Settings', '/app/settings'],
  ['billing', 'Billing', '/app/billing'],
  ['profile', 'Profile', '/app/profile'],
]
function Bv() {
  return a.jsxs('div', {
    className: 'sidebar',
    children: [
      a.jsx('div', { style: { paddingTop: 64 } }),
      Mv.map(([e, t, n]) =>
        a.jsxs(
          tg,
          {
            to: n,
            className: ({ isActive: r }) => `item ${r ? 'unread' : ''}`,
            children: [
              a.jsx('div', { className: 'icon', title: t }),
              a.jsx('div', { className: 'label', children: t }),
            ],
          },
          n
        )
      ),
    ],
  })
}
function $v({ selected: e, reload: t, onChatUpdate: n }) {
  var k, m
  const [r, l] = S.useState([]),
    [s, i] = S.useState(''),
    [o, u] = S.useState(!1)
  S.useEffect(() => {
    e != null &&
      e._id &&
      $.get(`/chats/${e._id}/messages`).then((y) => l(y.data))
  }, [e])
  const c = async () => {
      if (!s) return
      ;(await $.post(`/chats/${e._id}/send`, { text: s }), i(''))
      const y = await $.get(`/chats/${e._id}/messages`)
      ;(l(y.data), t == null || t())
    },
    f = async () => {
      u(!0)
      try {
        const y = await $.post(`/chats/${e._id}/takeover`)
        n(y.data)
      } finally {
        u(!1)
      }
    },
    d = async () => {
      u(!0)
      try {
        const y = await $.post(`/chats/${e._id}/resolve`)
        n(y.data)
      } finally {
        u(!1)
      }
    }
  if (!e)
    return a.jsx('div', {
      className: 'card',
      style: { display: 'grid', placeItems: 'center', height: '100%' },
      children: 'Pilih chat di kiri…',
    })
  const g = (y = '') =>
    y
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((x) => {
        var h
        return ((h = x[0]) == null ? void 0 : h.toUpperCase()) || ''
      })
      .join('') || '?'
  return a.jsxs('div', {
    className: 'card col',
    style: { height: 'calc(100vh - 58px - 20px)', gap: 8 },
    children: [
      a.jsxs('div', {
        className: 'testhead',
        style: { paddingBottom: 8, borderBottom: '1px solid var(--border)' },
        children: [
          a.jsx('div', {
            className: 'avatar',
            children: g((k = e.contactId) == null ? void 0 : k.name),
          }),
          a.jsx('div', {
            style: { fontWeight: 700 },
            children: ((m = e.contactId) == null ? void 0 : m.name) || 'User',
          }),
          e.takeoverBy &&
            a.jsx('button', {
              className: 'btn',
              style: { marginLeft: 'auto' },
              onClick: d,
              disabled: o,
              children: o ? 'Loading...' : 'Resolve',
            }),
          a.jsx('button', {
            className: 'btn ghost',
            style: { marginLeft: e.takeoverBy ? '8px' : 'auto' },
            onClick: () =>
              $.get(`/chats/${e._id}/messages`).then((y) => l(y.data)),
            children: '↻',
          }),
        ],
      }),
      a.jsx('div', {
        style: {
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        },
        children: r.map((y) =>
          a.jsx('div', { className: `bbl ${y.from}`, children: y.text }, y._id)
        ),
      }),
      e.takeoverBy
        ? a.jsxs('div', {
            className: 'row',
            children: [
              a.jsx('input', {
                className: 'input',
                placeholder: 'Ketik pesan…',
                value: s,
                onChange: (y) => i(y.target.value),
                onKeyDown: (y) => y.key === 'Enter' && c(),
              }),
              a.jsx('button', {
                className: 'btn',
                onClick: c,
                children: 'Kirim',
              }),
            ],
          })
        : a.jsx('div', {
            className: 'row',
            style: { justifyContent: 'center' },
            children: a.jsx('button', {
              className: 'btn',
              onClick: f,
              disabled: o,
              children: o ? 'Loading...' : 'Takeover Chat',
            }),
          }),
    ],
  })
}
function Wv() {
  const e = Ge(),
    t = [
      ['Hubungkan Platform', '/app/platforms'],
      ['Buat AI Agent', '/app/agents'],
      ['Undang Agen Manusia', '/app/humans'],
      ['Tambahkan AI Agent ke Inbox', '/app/agents'],
    ]
  return a.jsx('div', {
    className: 'quick',
    children: t.map(([n, r]) =>
      a.jsxs(
        'div',
        {
          className: 'card',
          onClick: () => e(r),
          children: [
            a.jsx('div', {
              style: { fontWeight: 700, marginBottom: 6 },
              children: n,
            }),
            a.jsx('div', { className: 'badge', children: 'Quick Action' }),
          ],
        },
        r
      )
    ),
  })
}
function Gt({ type: e = 'custom', size: t = 20 }) {
  const n = { width: t, height: t, display: 'inline-block' },
    r = (s = '#f4f4f5') =>
      a.jsx('circle', { cx: '12', cy: '12', r: '12', fill: s }),
    l = {
      telegram: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Telegram',
        children: [
          r('#e5f2ff'),
          a.jsx('path', {
            d: 'M18.8 6.2L4.6 11.7c-.9.35-.88 1.66.03 2l3.25 1.23 1.26 3.6c.33.94 1.62.97 2 .04l1.52-3.78 3.25-6.77c.28-.6-.35-1.2-.93-.92z',
            fill: '#199ae0',
          }),
        ],
      }),
      whatsapp: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'WhatsApp',
        children: [
          r('#e8fff1'),
          a.jsx('path', {
            d: 'M12 3.2A8.8 8.8 0 003.2 12c0 1.55.4 3.01 1.1 4.28L3 21l4.86-1.27A8.73 8.73 0 0012 20.8 8.8 8.8 0 0012 3.2zm4.6 12.6c-.2.56-1.16 1.06-1.63 1.1-.42.04-.97.06-1.57-.1-.36-.1-.82-.26-1.41-.52a9.7 9.7 0 01-3.54-3.12 4.06 4.06 0 01-.82-2.1c0-.6.3-.92.42-.1.12-.14.28-.2.37-.2h.27c.08 0 .2 0 .3.23.12.29.42 1.02.46 1.1.04.08.06.18 0 .3-.06.12-.1.2-.2.32-.1.12-.2.26-.1.46.12.2.57.93 1.3 1.5.9.72 1.66.95 1.9 1.06.2.12.34.1.46-.06.12-.18.52-.62.66-.84.14-.2.28-.17.46-.1l1.08.51c.17.08.47.2.55.34.06.14.06.8-.12 1.16z',
            fill: '#1fa855',
          }),
        ],
      }),
      messenger: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Messenger',
        children: [
          r('#eef1ff'),
          a.jsx('path', {
            d: 'M12 3.1c-4.9 0-8.9 3.58-8.9 8 0 2.5 1.26 4.7 3.21 6.14v3.56l2.94-1.6c.84.23 1.74.35 2.73.35 4.9 0 8.9-3.58 8.9-7.98 0-4.43-4-7.99-8.9-7.99zm.9 10.66l-2.2-2.35-4.57 2.35 5.12-5.08 2.25 2.35 4.52-2.35-5.12 5.08z',
            fill: '#5964ff',
          }),
        ],
      }),
      instagram: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Instagram',
        children: [
          r('#fff0f5'),
          a.jsx('path', {
            d: 'M8 5h8a3 3 0 013 3v8a3 3 0 01-3 3H8a3 3 0 01-3-3V8a3 3 0 013-3zm8.5 1.8a.9.9 0 100 1.8.9.9 0 000-1.8zM12 8.3A3.7 3.7 0 108 12a3.7 3.7 0 004-3.7zm0 1.8A1.9 1.9 0 1110.1 12 1.9 1.9 0 0112 10.1z',
            fill: '#ff4f8b',
          }),
        ],
      }),
      livechat: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Livechat',
        children: [
          r('#f2f2f2'),
          a.jsx('path', {
            d: 'M5 6h14a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z',
            fill: '#9b9ca1',
          }),
        ],
      }),
      facebook: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Facebook',
        children: [
          r('#e9f0ff'),
          a.jsx('path', {
            d: 'M13 10h2.5l-.4 2.6H13V20h-3v-7.4H8V10h2V8.6C10 6.7 11 5 13.7 5H16v2.6h-1.6c-.7 0-1.4.4-1.4 1.2V10z',
            fill: '#3b82f6',
          }),
        ],
      }),
      custom: a.jsxs('svg', {
        viewBox: '0 0 24 24',
        style: n,
        'aria-label': 'Custom',
        children: [
          r('#f4f4f5'),
          a.jsx('path', { d: 'M7 7h10v10H7z', fill: '#a1a1aa' }),
        ],
      }),
    }
  return l[e] || l.custom
}
function Hv({ selected: e, onUpdate: t }) {
  var y
  const [n, r] = S.useState([]),
    [l, s] = S.useState(''),
    [i, o] = S.useState(''),
    [u, c] = S.useState(!1),
    f = e == null ? void 0 : e.contactId
  S.useEffect(() => {
    f ? (r(f.tags || []), s(f.notes || '')) : (r([]), s(''))
  }, [f])
  const d = async (x) => {
      try {
        ;(await navigator.clipboard.writeText(x), alert('Copied!'))
      } catch (h) {
        console.error('Failed to copy: ', h)
      }
    },
    g = () => {
      i && !n.includes(i) && (r([...n, i]), o(''))
    },
    k = (x) => {
      r(n.filter((h) => h !== x))
    },
    m = async () => {
      if (f) {
        c(!0)
        try {
          const x = await $.put(`/contacts/${f._id}`, { tags: n, notes: l })
          t == null || t(x.data)
        } catch (x) {
          ;(console.error('Failed to save contact details', x),
            alert('Failed to save.'))
        } finally {
          c(!1)
        }
      }
    }
  return !e || !f
    ? a.jsx('div', {
        className: 'card col',
        style: {
          width: 320,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        children: a.jsx('div', {
          className: 'muted',
          children: 'No Contact Selected',
        }),
      })
    : a.jsxs('div', {
        className: 'card col',
        style: { width: 320, gap: 16, height: 'fit-content' },
        children: [
          a.jsxs('div', {
            className: 'col',
            style: { gap: 4 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Client Name' }),
              a.jsx('div', { style: { fontWeight: 700 }, children: f.name }),
            ],
          }),
          a.jsxs('div', {
            className: 'col',
            style: { gap: 4 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Client ID' }),
              a.jsxs('div', {
                className: 'row',
                style: { alignItems: 'center', gap: 8 },
                children: [
                  a.jsx('div', {
                    className: 'badge',
                    children: f.platformAccountId,
                  }),
                  a.jsx('button', {
                    className: 'btn ghost',
                    onClick: () => d(f.platformAccountId),
                    children: 'Copy',
                  }),
                ],
              }),
            ],
          }),
          a.jsxs('div', {
            className: 'col',
            style: { gap: 4 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Platform' }),
              a.jsx('div', { className: 'badge', children: f.platformType }),
            ],
          }),
          a.jsxs('div', {
            className: 'col',
            style: { gap: 4 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Handled By' }),
              a.jsx('div', {
                style: { fontWeight: 700 },
                children: ((y = e.agentId) == null ? void 0 : y.name) || 'N/A',
              }),
            ],
          }),
          a.jsxs('div', {
            className: 'col',
            style: { gap: 8 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Labels' }),
              a.jsx('div', {
                className: 'row',
                style: { flexWrap: 'wrap', gap: 6 },
                children: n.map((x) =>
                  a.jsxs(
                    'div',
                    {
                      className: 'badge row',
                      style: { alignItems: 'center', gap: 4 },
                      children: [
                        a.jsx('span', { children: x }),
                        a.jsx('span', {
                          onClick: () => k(x),
                          style: { cursor: 'pointer', fontSize: 14 },
                          children: '×',
                        }),
                      ],
                    },
                    x
                  )
                ),
              }),
              a.jsxs('div', {
                className: 'row',
                children: [
                  a.jsx('input', {
                    className: 'input',
                    placeholder: 'Add a label...',
                    value: i,
                    onChange: (x) => o(x.target.value),
                    onKeyDown: (x) => x.key === 'Enter' && g(),
                  }),
                  a.jsx('button', {
                    className: 'btn',
                    onClick: g,
                    children: 'Add',
                  }),
                ],
              }),
            ],
          }),
          a.jsxs('div', {
            className: 'col',
            style: { gap: 4 },
            children: [
              a.jsx('div', { className: 'muted', children: 'Notes' }),
              a.jsx('textarea', {
                className: 'textarea',
                rows: 5,
                value: l,
                onChange: (x) => s(x.target.value),
                placeholder: 'Add notes about this client...',
              }),
            ],
          }),
          a.jsx('button', {
            className: 'btn',
            onClick: m,
            disabled: u,
            children: u ? 'Saving...' : 'Save Details',
          }),
        ],
      })
}
function Vv({ onClose: e, onApply: t, currentFilters: n }) {
  const [r, l] = S.useState(n.from || ''),
    [s, i] = S.useState(n.to || ''),
    [o, u] = S.useState(n.tags || []),
    [c, f] = S.useState(''),
    d = () => {
      c && !o.includes(c) && (u([...o, c]), f(''))
    },
    g = (m) => {
      u(o.filter((y) => y !== m))
    },
    k = () => {
      t({ from: r, to: s, tags: o })
    }
  return a.jsx('div', {
    className: 'modal',
    children: a.jsxs('div', {
      className: 'modal-card',
      children: [
        a.jsxs('div', {
          className: 'row',
          style: { justifyContent: 'space-between', alignItems: 'center' },
          children: [
            a.jsx('h3', { style: { margin: 0 }, children: 'Advanced Filters' }),
            a.jsx('button', {
              className: 'btn ghost',
              onClick: e,
              children: 'Close',
            }),
          ],
        }),
        a.jsxs('div', {
          className: 'col',
          style: { gap: 16, marginTop: 16 },
          children: [
            a.jsxs('div', {
              className: 'col',
              style: { gap: 4 },
              children: [
                a.jsx('div', { className: 'muted', children: 'Date Range' }),
                a.jsxs('div', {
                  className: 'row',
                  children: [
                    a.jsx('input', {
                      className: 'input',
                      type: 'date',
                      value: r,
                      onChange: (m) => l(m.target.value),
                    }),
                    a.jsx('input', {
                      className: 'input',
                      type: 'date',
                      value: s,
                      onChange: (m) => i(m.target.value),
                    }),
                  ],
                }),
              ],
            }),
            a.jsxs('div', {
              className: 'col',
              style: { gap: 8 },
              children: [
                a.jsx('div', { className: 'muted', children: 'Labels' }),
                a.jsx('div', {
                  className: 'row',
                  style: { flexWrap: 'wrap', gap: 6 },
                  children: o.map((m) =>
                    a.jsxs(
                      'div',
                      {
                        className: 'badge row',
                        style: { alignItems: 'center', gap: 4 },
                        children: [
                          a.jsx('span', { children: m }),
                          a.jsx('span', {
                            onClick: () => g(m),
                            style: { cursor: 'pointer', fontSize: 14 },
                            children: '×',
                          }),
                        ],
                      },
                      m
                    )
                  ),
                }),
                a.jsxs('div', {
                  className: 'row',
                  children: [
                    a.jsx('input', {
                      className: 'input',
                      placeholder: 'Add a label...',
                      value: c,
                      onChange: (m) => f(m.target.value),
                      onKeyDown: (m) => m.key === 'Enter' && d(),
                    }),
                    a.jsx('button', {
                      className: 'btn',
                      onClick: d,
                      children: 'Add',
                    }),
                  ],
                }),
              ],
            }),
            a.jsxs('div', {
              className: 'row',
              style: { justifyContent: 'flex-end', gap: 8, marginTop: 16 },
              children: [
                a.jsx('button', {
                  className: 'btn ghost',
                  onClick: e,
                  children: 'Cancel',
                }),
                a.jsx('button', {
                  className: 'btn',
                  onClick: k,
                  children: 'Apply Filters',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  })
}
function Kv() {
  const [e, t] = S.useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })
  return { user: e, setUser: t }
}
function Qv() {
  const [e, t] = S.useState([]),
    [n, r] = S.useState([]),
    [l, s] = S.useState(null),
    [i, o] = S.useState(!1),
    [u, c] = S.useState(!1),
    [f, d] = S.useState({
      agentId: '',
      search: '',
      from: '',
      to: '',
      tags: [],
      unreadOnly: !1,
    }),
    g = async () => {
      const y = await $.get('/chats', { params: f })
      t(y.data)
    }
  ;(S.useEffect(() => {
    $.get('/agents').then((y) => r(y.data))
  }, []),
    S.useEffect(() => {
      g()
    }, [f]))
  const k = (y) => {
      var h
      const x = e.map((p) => {
        var v
        return ((v = p.contactId) == null ? void 0 : v._id) === y._id
          ? { ...p, contactId: y }
          : p
      })
      ;(t(x),
        ((h = l == null ? void 0 : l.contactId) == null ? void 0 : h._id) ===
          y._id && s((p) => ({ ...p, contactId: y })))
    },
    m = (y) => {
      d((x) => ({ ...x, ...y }))
    }
  return a.jsxs(a.Fragment, {
    children: [
      a.jsxs('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '360px 1fr 320px',
          gap: 16,
          alignItems: 'start',
        },
        children: [
          a.jsx('div', {
            className: 'col',
            children: a.jsxs('div', {
              className: 'card col',
              children: [
                a.jsx('div', { style: { fontWeight: 700 }, children: 'Inbox' }),
                a.jsxs('div', {
                  className: 'row',
                  style: { justifyContent: 'space-between' },
                  children: [
                    a.jsxs('div', {
                      className: 'row',
                      children: [
                        a.jsxs('select', {
                          className: 'select',
                          style: { width: 'auto' },
                          value: f.agentId,
                          onChange: (y) => m({ agentId: y.target.value }),
                          children: [
                            a.jsx('option', {
                              value: '',
                              children: 'All Agents',
                            }),
                            n.map((y) =>
                              a.jsx(
                                'option',
                                { value: y._id, children: y.name },
                                y._id
                              )
                            ),
                          ],
                        }),
                        a.jsx('button', {
                          className: `btn ghost ${f.unreadOnly ? 'active' : ''}`,
                          onClick: () => m({ unreadOnly: !f.unreadOnly }),
                          children: 'Unread',
                        }),
                        a.jsx('button', {
                          className: 'btn ghost',
                          onClick: () => o(!0),
                          children: 'Filters',
                        }),
                      ],
                    }),
                    a.jsx('button', {
                      className: 'btn ghost',
                      onClick: () => c((y) => !y),
                      children: '🔍',
                    }),
                  ],
                }),
                u &&
                  a.jsx('div', {
                    className: 'searchbox',
                    children: a.jsx('input', {
                      className: 'input',
                      placeholder: 'Search by name...',
                      value: f.search,
                      onChange: (y) => m({ search: y.target.value }),
                    }),
                  }),
                a.jsx('div', {
                  className: 'list',
                  children: e.map((y) => {
                    var x
                    return a.jsxs(
                      'div',
                      {
                        className: `rowi ${(l == null ? void 0 : l._id) === y._id ? 'unread' : ''}`,
                        onClick: () => {
                          if ((s(y), y.unread > 0)) {
                            const h = e.map((p) =>
                              p._id === y._id ? { ...p, unread: 0 } : p
                            )
                            t(h)
                          }
                        },
                        children: [
                          a.jsx('div', {
                            children:
                              ((x = y.contactId) == null ? void 0 : x.name) ||
                              `Chat #${y._id.slice(-6)}`,
                          }),
                          a.jsxs('div', {
                            className: 'row',
                            style: { alignItems: 'center', gap: 8 },
                            children: [
                              y.unread > 0 &&
                                a.jsx('div', {
                                  className: 'badge',
                                  style: {
                                    background: 'var(--brand)',
                                    color: 'white',
                                  },
                                  children: y.unread,
                                }),
                              a.jsx('div', {
                                className: 'badge',
                                children: new Date(
                                  y.lastMessageAt
                                ).toLocaleString(),
                              }),
                            ],
                          }),
                        ],
                      },
                      y._id
                    )
                  }),
                }),
              ],
            }),
          }),
          a.jsx('div', {
            style: { flex: 1, height: 'calc(100vh - 58px - 24px)' },
            children: l
              ? a.jsx($v, { selected: l, reload: g })
              : a.jsxs('div', {
                  className: 'card',
                  style: {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  children: [
                    a.jsx('div', {
                      style: { fontWeight: 700, marginBottom: 8 },
                      children: 'Selamat datang di Chatbot AI',
                    }),
                    a.jsx(Wv, {}),
                  ],
                }),
          }),
          a.jsx('div', { children: a.jsx(Hv, { selected: l, onUpdate: k }) }),
        ],
      }),
      i &&
        a.jsx(Vv, {
          onClose: () => o(!1),
          onApply: (y) => {
            ;(m(y), o(!1))
          },
          currentFilters: f,
        }),
    ],
  })
}
function bv() {
  const [e, t] = S.useState([])
  return (
    S.useEffect(() => {
      $.get('/analytics/traffic?groupBy=day').then((n) => t(n.data))
    }, []),
    a.jsxs('div', {
      className: 'card',
      children: [
        a.jsx('div', {
          style: { fontWeight: 700, marginBottom: 10 },
          children: 'Rata-rata chat per hari',
        }),
        a.jsx('div', {
          className: 'list',
          children: e.map((n, r) =>
            a.jsxs(
              'div',
              {
                className: 'rowi',
                children: [
                  a.jsxs('div', {
                    children: [
                      n._id.y,
                      '-',
                      String(n._id.m).padStart(2, '0'),
                      '-',
                      String(n._id.d).padStart(2, '0'),
                    ],
                  }),
                  a.jsxs('div', {
                    className: 'badge',
                    children: [n.count, ' pesan'],
                  }),
                ],
              },
              r
            )
          ),
        }),
      ],
    })
  )
}
function Jv() {
  const [e, t] = S.useState([])
  return (
    S.useEffect(() => {
      $.get('/contacts').then((n) => t(n.data))
    }, []),
    a.jsxs('div', {
      className: 'card',
      children: [
        a.jsx('div', {
          style: { fontWeight: 700, marginBottom: 10 },
          children: 'Contacts',
        }),
        a.jsx('div', {
          className: 'list',
          children: e.map((n) =>
            a.jsxs(
              'div',
              {
                className: 'rowi',
                children: [
                  a.jsx('div', { children: n.name }),
                  a.jsx('div', {
                    className: 'badge',
                    children: n.platformType,
                  }),
                ],
              },
              n._id
            )
          ),
        }),
      ],
    })
  )
}
function qv() {
  const [e, t] = q.useState([]),
    [n, r] = q.useState([]),
    [l, s] = q.useState(''),
    [i, o] = q.useState(null),
    [u, c] = q.useState(!1),
    [f, d] = q.useState(!1),
    [g, k] = q.useState(null),
    [m, y] = q.useState('telegram'),
    [x, h] = q.useState(''),
    [p, v] = q.useState(''),
    [C, j] = q.useState(''),
    [_, P] = q.useState(''),
    [T, U] = q.useState(!1)
  q.useEffect(() => {
    const w = new AbortController()
    return (
      (async () => {
        try {
          const [I, A] = await Promise.all([
              $.get('/platforms', { signal: w.signal }),
              $.get('/agents', { signal: w.signal }),
            ]),
            se = I.data || []
          ;(t(se), r(A.data || []), !i && se.length && o(se[0]))
        } catch {}
      })(),
      () => w.abort()
    )
  }, [])
  const z = q.useMemo(() => {
      const w = l.toLowerCase()
      return e.filter((I) => {
        var A, se
        return (
          ((A = I.label) == null ? void 0 : A.toLowerCase().includes(w)) ||
          ((se = I.type) == null ? void 0 : se.toLowerCase().includes(w)) ||
          (I.accountId || '').toLowerCase().includes(w)
        )
      })
    }, [e, l]),
    Q = q.useMemo(() => {
      const w = {}
      for (const I of n) I.platformId && (w[I.platformId] = I)
      return w
    }, [n]),
    te = (w = '') => (w.length > 10 ? w.slice(0, 6) + '…' + w.slice(-2) : w),
    ne = (w) =>
      window.open(
        w,
        'connect_popup',
        'width=720,height=720,noopener,noreferrer'
      ),
    L = q.useCallback(() => {
      ;(d(!1), k(null), y('telegram'), h(''), v(''), j(''), P(''), c(!0))
    }, []),
    de = q.useCallback(() => {
      i &&
        (k(i),
        y(i.type),
        h(i.label || ''),
        v(i.token || ''),
        j(i.accountId || ''),
        P(i.webhookSecret || ''),
        d(!0))
    }, [i]),
    b = q.useCallback(
      async (w) => {
        var I
        if (
          ((I = w == null ? void 0 : w.preventDefault) == null || I.call(w), !x)
        )
          return alert('Label wajib diisi')
        U(!0)
        try {
          if (g) {
            const A = await $.put(`/platforms/${g._id}`, {
              type: m,
              label: x,
              token: p,
              accountId: C,
              webhookSecret: _,
            })
            ;(t((se) => se.map((oe) => (oe._id === g._id ? A.data : oe))),
              o(A.data))
          } else {
            const A = await $.post('/platforms', {
              type: m,
              label: x,
              token: p,
              accountId: C,
              webhookSecret: _,
            })
            ;(t((se) => [A.data, ...se]), o(A.data))
          }
          d(!1)
        } finally {
          U(!1)
        }
      },
      [g, m, x, p, C, _]
    ),
    et = q.useCallback(async () => {
      i &&
        confirm(`Hapus platform "${i.label}"?`) &&
        (await $.delete(`/platforms/${i._id}`),
        t((w) => w.filter((I) => I._id !== i._id)),
        o(null))
    }, [i]),
    R = q.useCallback(
      async (w) => {
        const I = e.filter((tt) => tt.type === w).length + 1,
          A = `${w.charAt(0).toUpperCase() + w.slice(1)} #${I}`,
          oe = (await $.post('/platforms', { type: w, label: A })).data
        ;(t((tt) => [oe, ...tt]),
          o(oe),
          ne(`/integrations/meta/start?platformId=${oe._id}&channel=${w}`))
      },
      [e]
    ),
    F = q.useCallback(
      async (w) => {
        if ((c(!1), w === 'instagram' || w === 'messenger')) {
          try {
            await R(w)
          } catch {
            alert('Gagal membuka OAuth')
          }
          return
        }
        ;(k(null), y(w))
        const I = e.filter((A) => A.type === w).length + 1
        ;(h(`${w.charAt(0).toUpperCase() + w.slice(1)} #${I}`),
          v(''),
          j(''),
          P(''),
          d(!0))
      },
      [e, R]
    )
  return a.jsxs('div', {
    className: 'platforms-wrap',
    children: [
      a.jsxs('div', {
        className: 'inbox-left',
        children: [
          a.jsxs('div', {
            className: 'row',
            style: { alignItems: 'center', justifyContent: 'space-between' },
            children: [
              a.jsx('div', { className: 'title', children: 'Inboxes' }),
              a.jsx('button', {
                className: 'btn ghost',
                onClick: L,
                children: '＋',
              }),
            ],
          }),
          a.jsx('div', {
            className: 'searchbox',
            style: { margin: '8px 0 12px' },
            children: a.jsx('input', {
              className: 'input',
              placeholder: 'Search by name…',
              value: l,
              onChange: (w) => s(w.target.value),
            }),
          }),
          a.jsxs('div', {
            className: 'inbox-list',
            children: [
              z.map((w) =>
                a.jsxs(
                  'div',
                  {
                    className: `inbox-item ${(i == null ? void 0 : i._id) === w._id ? 'active' : ''}`,
                    onClick: () => o(w),
                    children: [
                      a.jsx('div', {
                        className: 'inbox-ico',
                        children: a.jsx(Gt, { type: w.type, size: 18 }),
                      }),
                      a.jsxs('div', {
                        className: 'inbox-info',
                        children: [
                          a.jsx('div', {
                            className: 'inbox-name',
                            children: w.label,
                          }),
                          a.jsxs('div', {
                            className: 'inbox-sub',
                            children: [
                              w.type.toUpperCase(),
                              ' ',
                              w.accountId ? `• ${w.accountId}` : '',
                            ],
                          }),
                        ],
                      }),
                      Q[w._id] &&
                        a.jsx('div', {
                          className: 'badge',
                          children: Q[w._id].name,
                        }),
                    ],
                  },
                  w._id
                )
              ),
              !z.length &&
                a.jsx('div', {
                  className: 'muted',
                  children: 'Tidak ada platform',
                }),
              a.jsx('div', {
                className: 'connect-tip',
                onClick: L,
                children: '+ Click to Connect A Platform',
              }),
            ],
          }),
        ],
      }),
      a.jsx('div', {
        className: 'inbox-right',
        children: i
          ? a.jsxs('div', {
              className: 'card col',
              style: { gap: 12 },
              children: [
                a.jsxs('div', {
                  className: 'row',
                  style: {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                  children: [
                    a.jsxs('div', {
                      className: 'row',
                      style: { alignItems: 'center', gap: 8 },
                      children: [
                        a.jsx('div', {
                          className: 'inbox-ico',
                          children: a.jsx(Gt, { type: i.type, size: 22 }),
                        }),
                        a.jsx('div', {
                          style: { fontWeight: 700 },
                          children: i.label,
                        }),
                        a.jsx('span', { className: 'badge', children: i.type }),
                      ],
                    }),
                    a.jsxs('div', {
                      className: 'row',
                      style: { gap: 8 },
                      children: [
                        (i == null ? void 0 : i.type) === 'telegram' &&
                          a.jsx('button', {
                            className: 'btn ghost',
                            onClick: async () => {
                              try {
                                ;(await $.post(
                                  `/integrations/telegram/${i._id}/setWebhook`
                                ),
                                  alert('Webhook Telegram terset ✔'))
                              } catch {
                                alert('Gagal set webhook')
                              }
                            },
                            children: 'Auto Set Webhook',
                          }),
                        (i == null ? void 0 : i.type) === 'instagram' &&
                          a.jsx('button', {
                            className: 'btn ghost',
                            onClick: () =>
                              ne(
                                `/integrations/meta/start?platformId=${i._id}&channel=instagram`
                              ),
                            children: 'Connect via Facebook',
                          }),
                        (i == null ? void 0 : i.type) === 'facebook' &&
                          a.jsx('button', {
                            className: 'btn ghost',
                            onClick: () =>
                              ne(
                                `/integrations/meta/start?platformId=${i._id}&channel=messenger`
                              ),
                            children: 'Connect via Facebook',
                          }),
                        a.jsx('button', {
                          className: 'btn ghost',
                          onClick: de,
                          children: 'Edit',
                        }),
                        a.jsx('button', {
                          className: 'btn ghost',
                          onClick: et,
                          children: 'Delete',
                        }),
                      ],
                    }),
                  ],
                }),
                a.jsxs('div', {
                  className: 'row',
                  children: [
                    a.jsxs('div', {
                      className: 'col',
                      style: { flex: 1 },
                      children: [
                        a.jsx('div', {
                          className: 'muted',
                          children: 'Account ID',
                        }),
                        a.jsx('div', { children: i.accountId || '-' }),
                      ],
                    }),
                    a.jsxs('div', {
                      className: 'col',
                      style: { flex: 2 },
                      children: [
                        a.jsx('div', {
                          className: 'muted',
                          children: 'Token/API Key',
                        }),
                        a.jsx('div', { children: te(i.token) || '-' }),
                      ],
                    }),
                  ],
                }),
                a.jsxs('div', {
                  className: 'col',
                  children: [
                    a.jsx('div', {
                      className: 'muted',
                      children: 'Webhook URL',
                    }),
                    a.jsx('div', {
                      className: 'badge',
                      children: `<PUBLIC_BASE_URL>/webhook/${i.type === 'facebook' ? 'meta' : i.type}`,
                    }),
                    a.jsxs('div', {
                      className: 'muted',
                      style: { marginTop: 6 },
                      children: [
                        'Telegram contoh: ',
                        a.jsx('code', {
                          children:
                            'https://api.telegram.org/bot<TOKEN>/setWebhook?url=<PUBLIC_BASE_URL>/webhook/telegram',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          : a.jsx('div', {
              className: 'card center',
              style: { height: '100%' },
              children: 'No Inbox Selected',
            }),
      }),
      u && a.jsx(Xv, { onClose: () => c(!1), onPick: F }),
      f &&
        a.jsx('div', {
          className: 'modal',
          children: a.jsxs('div', {
            className: 'modal-card',
            children: [
              a.jsxs('div', {
                className: 'row',
                style: {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
                children: [
                  a.jsx('h3', {
                    style: { margin: 0 },
                    children: g ? 'Edit Platform' : 'Connect a Platform',
                  }),
                  a.jsx('button', {
                    className: 'btn ghost',
                    onClick: () => d(!1),
                    children: 'Close',
                  }),
                ],
              }),
              a.jsxs('form', {
                className: 'col',
                onSubmit: b,
                children: [
                  a.jsxs('div', {
                    className: 'row',
                    style: { gap: 8, alignItems: 'center' },
                    children: [
                      a.jsx(Gt, { type: m, size: 18 }),
                      a.jsxs('select', {
                        className: 'select',
                        value: m,
                        onChange: (w) => y(w.target.value),
                        children: [
                          a.jsx('option', {
                            value: 'whatsapp',
                            children: 'WhatsApp',
                          }),
                          a.jsx('option', {
                            value: 'facebook',
                            children: 'Messenger',
                          }),
                          a.jsx('option', {
                            value: 'instagram',
                            children: 'Instagram',
                          }),
                          a.jsx('option', {
                            value: 'livechat',
                            children: 'Web Livechat',
                          }),
                          a.jsx('option', {
                            value: 'telegram',
                            children: 'Telegram',
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsx('input', {
                    className: 'input',
                    placeholder: 'Label',
                    value: x,
                    onChange: (w) => h(w.target.value),
                  }),
                  a.jsx('input', {
                    className: 'input',
                    placeholder: 'Token/API Key',
                    value: p,
                    onChange: (w) => v(w.target.value),
                  }),
                  a.jsx('input', {
                    className: 'input',
                    placeholder: 'Account ID (opsional)',
                    value: C,
                    onChange: (w) => j(w.target.value),
                  }),
                  a.jsx('input', {
                    className: 'input',
                    placeholder: 'Webhook Secret (opsional)',
                    value: _,
                    onChange: (w) => P(w.target.value),
                  }),
                  a.jsxs('div', {
                    className: 'row',
                    style: { justifyContent: 'flex-end', gap: 8 },
                    children: [
                      a.jsx('button', {
                        type: 'button',
                        className: 'btn ghost',
                        onClick: () => d(!1),
                        children: 'Batal',
                      }),
                      a.jsx('button', {
                        className: 'btn',
                        disabled: T,
                        children: T ? 'Menyimpan…' : g ? 'Update' : 'Simpan',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  })
}
function Xv({ onClose: e, onPick: t }) {
  const n = [
    { type: 'whatsapp', label: 'Whatsapp' },
    { type: 'messenger', label: 'Messenger' },
    { type: 'instagram', label: 'Instagram' },
    { type: 'livechat', label: 'Web Livechat' },
    { type: 'telegram', label: 'Telegram' },
  ]
  return a.jsx('div', {
    className: 'modal',
    children: a.jsxs('div', {
      className: 'modal-card',
      style: { maxWidth: 760 },
      children: [
        a.jsxs('div', {
          className: 'row',
          style: { justifyContent: 'space-between', alignItems: 'center' },
          children: [
            a.jsx('h3', {
              style: { margin: 0 },
              children: 'Select your Platform',
            }),
            a.jsx('button', {
              className: 'btn ghost',
              onClick: e,
              children: 'Close',
            }),
          ],
        }),
        a.jsx('p', {
          className: 'muted',
          style: { marginTop: 8 },
          children: 'Select the platform you wish to establish your new inbox.',
        }),
        a.jsx('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 16,
            marginTop: 8,
          },
          children: n.map((r) =>
            a.jsxs(
              'button',
              {
                className: 'card',
                style: {
                  padding: 20,
                  textAlign: 'center',
                  borderRadius: 16,
                  cursor: 'pointer',
                },
                onClick: () => (t == null ? void 0 : t(r.type)),
                children: [
                  a.jsx('div', {
                    style: {
                      width: 64,
                      height: 64,
                      margin: '0 auto 14px',
                      borderRadius: 18,
                      background: '#fafafa',
                      display: 'grid',
                      placeItems: 'center',
                    },
                    children: a.jsx(Gt, { type: r.type, size: 44 }),
                  }),
                  a.jsx('div', {
                    style: { fontWeight: 600 },
                    children: r.label,
                  }),
                ],
              },
              r.type
            )
          ),
        }),
      ],
    }),
  })
}
function Yv() {
  var ne
  const [e, t] = S.useState([]),
    [n, r] = S.useState([]),
    [l, s] = S.useState(''),
    [i, o] = S.useState(!1),
    u = Ge(),
    [c, f] = S.useState(''),
    [d, g] = S.useState(''),
    [k, m] = S.useState('Kamu adalah bot yang siap membantu pelanggan.'),
    [y, x] = S.useState('You are a helpful assistant.'),
    [h, p] = S.useState('Halo! Ada yang bisa saya bantu?'),
    [v, C] = S.useState(!1),
    j = async () => {
      const L = await $.get('/platforms')
      r(L.data)
      const de = await $.get('/agents')
      t(de.data)
    }
  S.useEffect(() => {
    j()
  }, [])
  const _ = e.filter(
      (L) =>
        L.name.toLowerCase().includes(l.toLowerCase()) ||
        (L.prompt || '').toLowerCase().includes(l.toLowerCase())
    ),
    P = (L = '') =>
      L.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((de) => {
          var b
          return ((b = de[0]) == null ? void 0 : b.toUpperCase()) || ''
        })
        .join('') || 'AI',
    T = async (L) => {
      confirm('Hapus agent ini?') &&
        (await $.delete(`/agents/${L}`), t(e.filter((de) => de._id !== L)))
    },
    U = async (L) => {
      try {
        ;(await navigator.clipboard.writeText(L), alert('Copied!'))
      } catch {}
    },
    z = () => {
      ;(f(''),
        g(''),
        m('Kamu adalah bot yang siap membantu pelanggan.'),
        x('You are a helpful assistant.'),
        p('Halo! Ada yang bisa saya bantu?'),
        o(!0))
    },
    Q = async (L) => {
      var de
      if (
        ((de = L == null ? void 0 : L.preventDefault) == null || de.call(L), !c)
      )
        return alert('Nama wajib diisi')
      C(!0)
      try {
        const b = await $.post('/agents', {
          name: c,
          platformId: d || null,
          prompt: k,
          behavior: y,
          welcomeMessage: h,
          knowledge: [],
        })
        ;(o(!1), t([b.data, ...e]))
      } finally {
        C(!1)
      }
    },
    te = {}
  return (
    n.forEach((L) => (te[L._id] = L)),
    a.jsxs('div', {
      style: { maxWidth: 1150, margin: '0 auto' },
      children: [
        a.jsxs('div', {
          className: 'row',
          style: {
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          },
          children: [
            a.jsx('h2', { style: { margin: 0 }, children: 'AI Agents' }),
            a.jsxs('div', {
              className: 'searchbox',
              children: [
                a.jsx('input', {
                  className: 'input',
                  placeholder: 'Search AI agents…',
                  value: l,
                  onChange: (L) => s(L.target.value),
                }),
                a.jsx('div', { className: 'search-ico' }),
              ],
            }),
          ],
        }),
        a.jsxs('div', {
          className: 'agent-grid',
          children: [
            _.map((L) =>
              a.jsxs(
                'div',
                {
                  className: 'agent-card',
                  children: [
                    a.jsx('div', {
                      className: 'agent-avatar',
                      children: P(L.name),
                    }),
                    a.jsx('div', { className: 'agent-name', children: L.name }),
                    a.jsx('div', {
                      className: 'agent-sub',
                      children:
                        (L.prompt || L.welcomeMessage || '-').slice(0, 60) ||
                        '-',
                    }),
                    L.platformId &&
                      te[L.platformId] &&
                      a.jsxs('div', {
                        className: 'row',
                        style: { gap: 6, alignItems: 'center' },
                        children: [
                          a.jsx(Gt, { type: te[L.platformId].type, size: 16 }),
                          a.jsx('span', {
                            className: 'badge',
                            children: te[L.platformId].type,
                          }),
                        ],
                      }),
                    a.jsxs('div', {
                      className: 'agent-actions',
                      children: [
                        a.jsx('button', {
                          className: 'btn ghost',
                          onClick: () => u(`/app/agents/${L._id}`),
                          children: 'Settings',
                        }),
                        a.jsx('button', {
                          className: 'btn ghost',
                          title: 'Copy ID',
                          onClick: () => U(L._id),
                          children: '📋',
                        }),
                        a.jsx('button', {
                          className: 'btn ghost',
                          title: 'Delete',
                          onClick: () => T(L._id),
                          children: '🗑️',
                        }),
                      ],
                    }),
                  ],
                },
                L._id
              )
            ),
            a.jsxs('div', {
              className: 'agent-card create',
              onClick: z,
              children: [
                a.jsx('div', { className: 'plus', children: '＋' }),
                a.jsx('div', {
                  className: 'agent-name',
                  children: 'Create New',
                }),
              ],
            }),
          ],
        }),
        i &&
          a.jsx('div', {
            className: 'modal',
            children: a.jsxs('div', {
              className: 'modal-card',
              children: [
                a.jsxs('div', {
                  className: 'row',
                  style: {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                  children: [
                    a.jsx('h3', {
                      style: { margin: 0 },
                      children: 'Create AI Agent',
                    }),
                    a.jsx('button', {
                      className: 'btn ghost',
                      onClick: () => o(!1),
                      children: 'Close',
                    }),
                  ],
                }),
                a.jsxs('form', {
                  className: 'col',
                  onSubmit: Q,
                  children: [
                    a.jsx('input', {
                      className: 'input',
                      placeholder: 'Nama agent',
                      value: c,
                      onChange: (L) => f(L.target.value),
                    }),
                    a.jsxs('div', {
                      className: 'row',
                      style: { gap: 8, alignItems: 'center' },
                      children: [
                        a.jsx(Gt, {
                          type:
                            ((ne = te[d]) == null ? void 0 : ne.type) ||
                            'custom',
                          size: 18,
                        }),
                        a.jsxs('select', {
                          className: 'select',
                          value: d,
                          onChange: (L) => g(L.target.value),
                          children: [
                            a.jsx('option', {
                              value: '',
                              children: 'Pilih Platform (opsional)',
                            }),
                            n.map((L) =>
                              a.jsxs(
                                'option',
                                {
                                  value: L._id,
                                  children: [L.label, ' (', L.type, ')'],
                                },
                                L._id
                              )
                            ),
                          ],
                        }),
                      ],
                    }),
                    a.jsx('textarea', {
                      className: 'textarea',
                      rows: 3,
                      placeholder: 'Prompt AI',
                      value: k,
                      onChange: (L) => m(L.target.value),
                    }),
                    a.jsx('textarea', {
                      className: 'textarea',
                      rows: 3,
                      placeholder: 'Agent Behavior (system)',
                      value: y,
                      onChange: (L) => x(L.target.value),
                    }),
                    a.jsx('input', {
                      className: 'input',
                      placeholder: 'Welcome Message',
                      value: h,
                      onChange: (L) => p(L.target.value),
                    }),
                    a.jsxs('div', {
                      className: 'row',
                      style: { justifyContent: 'flex-end', gap: 8 },
                      children: [
                        a.jsx('button', {
                          type: 'button',
                          className: 'btn ghost',
                          onClick: () => o(!1),
                          children: 'Batal',
                        }),
                        a.jsx('button', {
                          className: 'btn',
                          disabled: v,
                          children: v ? 'Menyimpan…' : 'Simpan',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    })
  )
}
function Gv() {
  return a.jsx('div', {
    className: 'card',
    children: '(placeholder manajemen Human Agents)',
  })
}
function Zv() {
  return a.jsx('div', {
    className: 'card',
    children: 'Pengaturan umum (placeholder).',
  })
}
function ey() {
  var n
  const [e, t] = S.useState(null)
  return (
    S.useEffect(() => {
      $.get('/billing').then((r) => t(r.data))
    }, []),
    a.jsxs('div', {
      className: 'card',
      children: [
        a.jsx('div', { style: { fontWeight: 700 }, children: 'Info Paket' }),
        a.jsxs('div', {
          className: 'badge',
          children: ['Plan: ', e == null ? void 0 : e.plan],
        }),
        a.jsxs('div', {
          className: 'badge',
          children: [
            'Maks Agent: ',
            (n = e == null ? void 0 : e.limits) == null ? void 0 : n.maxAgents,
          ],
        }),
        a.jsxs('div', {
          className: 'badge',
          children: [
            'Berlaku sampai: ',
            e != null && e.expiry
              ? new Date(e.expiry).toLocaleDateString()
              : '-',
          ],
        }),
      ],
    })
  )
}
function ty() {
  return a.jsx('div', {
    className: 'card',
    children: 'Atur profil & Sign out.',
  })
}
function ny() {
  var F
  const { id: e } = Pm(),
    t = Ge(),
    [n, r] = S.useState('general'),
    [l, s] = S.useState(!0),
    [i, o] = S.useState(!1),
    [u, c] = S.useState([]),
    [f, d] = S.useState(null),
    [g, k] = S.useState(''),
    [m, y] = S.useState(''),
    [x, h] = S.useState(''),
    [p, v] = S.useState(''),
    [C, j] = S.useState(''),
    [_, P] = S.useState([]),
    [T, U] = S.useState([
      {
        from: 'ai',
        text: 'Halo! Selamat datang. Ada yang bisa saya bantu hari ini?',
      },
    ]),
    [z, Q] = S.useState(''),
    [te, ne] = S.useState(!1)
  S.useEffect(() => {
    ;(async () => {
      try {
        const [w, I] = await Promise.all([
          $.get(`/agents/${e}`),
          $.get('/platforms'),
        ])
        ;(d(w.data),
          k(w.data.name || ''),
          y(w.data.platformId || ''),
          h(w.data.behavior || ''),
          v(w.data.prompt || ''),
          j(w.data.welcomeMessage || ''),
          P(Array.isArray(w.data.knowledge) ? w.data.knowledge : []),
          c(I.data))
      } finally {
        s(!1)
      }
    })()
  }, [e])
  const L = async () => {
      o(!0)
      try {
        const w = {
            name: g,
            platformId: m || null,
            behavior: x,
            prompt: p,
            welcomeMessage: C,
            knowledge: _,
          },
          I = await $.put(`/agents/${e}`, w)
        d(I.data)
      } finally {
        o(!1)
      }
    },
    de = (w = { kind: 'url', value: '' }) => P([..._, w]),
    b = (w, I) => {
      const A = [..._]
      ;((A[w] = { ...A[w], ...I }), P(A))
    },
    et = (w) => P(_.filter((I, A) => A !== w)),
    R = async () => {
      if (!z) return
      ne(!0)
      const w = { from: 'user', text: z }
      ;(U([...T, w]), Q(''))
      try {
        const I = await $.post(`/agents/${e}/test`, { message: w.text })
        U((A) => [...A, { from: 'ai', text: I.data.reply }])
      } finally {
        ne(!1)
      }
    }
  return l
    ? a.jsx('div', { className: 'card', children: 'Loading…' })
    : f
      ? a.jsxs('div', {
          className: 'detail-wrap',
          children: [
            a.jsxs('div', {
              className: 'row',
              style: {
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              },
              children: [
                a.jsxs('div', {
                  className: 'row',
                  style: { alignItems: 'center', gap: 8 },
                  children: [
                    a.jsx('button', {
                      className: 'btn ghost',
                      onClick: () => t(-1),
                      children: '← Back',
                    }),
                    a.jsx('h2', {
                      style: { margin: 0 },
                      children: g || f.name,
                    }),
                  ],
                }),
                a.jsxs('div', {
                  className: 'row',
                  style: { gap: 8 },
                  children: [
                    a.jsx('button', {
                      className: 'btn ghost',
                      onClick: () => window.location.reload(),
                      children: '↻',
                    }),
                    a.jsx('button', {
                      className: 'btn',
                      disabled: i,
                      onClick: L,
                      children: i ? 'Saving…' : 'Save',
                    }),
                  ],
                }),
              ],
            }),
            a.jsx('div', {
              className: 'tabs',
              children: [
                'general',
                'knowledge',
                'integrations',
                'followups',
                'evaluation',
              ].map((w) =>
                a.jsx(
                  'div',
                  {
                    className: `tab ${n === w ? 'active' : ''}`,
                    onClick: () => r(w),
                    children: w[0].toUpperCase() + w.slice(1),
                  },
                  w
                )
              ),
            }),
            a.jsxs('div', {
              className: 'split',
              children: [
                a.jsxs('div', {
                  className: 'left col',
                  children: [
                    n === 'general' &&
                      a.jsxs('div', {
                        className: 'col',
                        children: [
                          a.jsx('div', {
                            className: 'muted',
                            children: 'AI Agent Behavior',
                          }),
                          a.jsx('textarea', {
                            className: 'textarea',
                            rows: 6,
                            value: x,
                            onChange: (w) => h(w.target.value),
                          }),
                          a.jsx('div', {
                            className: 'muted',
                            children: 'Welcome Message',
                          }),
                          a.jsx('input', {
                            className: 'input',
                            value: C,
                            onChange: (w) => j(w.target.value),
                          }),
                          a.jsx('div', {
                            className: 'muted',
                            children: 'Prompt AI',
                          }),
                          a.jsx('textarea', {
                            className: 'textarea',
                            rows: 4,
                            value: p,
                            onChange: (w) => v(w.target.value),
                          }),
                        ],
                      }),
                    n === 'knowledge' &&
                      a.jsxs('div', {
                        className: 'col',
                        children: [
                          a.jsxs('div', {
                            className: 'row',
                            style: {
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            },
                            children: [
                              a.jsx('h3', {
                                style: { margin: 0 },
                                children: 'Knowledge Sources',
                              }),
                              a.jsx('button', {
                                className: 'btn ghost',
                                onClick: () => de({ kind: 'url', value: '' }),
                                children: '+ Add',
                              }),
                            ],
                          }),
                          a.jsxs('div', {
                            className: 'list',
                            children: [
                              _.map((w, I) =>
                                a.jsxs(
                                  'div',
                                  {
                                    className: 'rowi',
                                    children: [
                                      a.jsxs('div', {
                                        className: 'row',
                                        style: {
                                          gap: 8,
                                          alignItems: 'center',
                                          flex: 1,
                                        },
                                        children: [
                                          a.jsxs('select', {
                                            className: 'select',
                                            value: w.kind,
                                            onChange: (A) =>
                                              b(I, { kind: A.target.value }),
                                            children: [
                                              a.jsx('option', {
                                                value: 'url',
                                                children: 'URL',
                                              }),
                                              a.jsx('option', {
                                                value: 'text',
                                                children: 'Text',
                                              }),
                                              a.jsx('option', {
                                                value: 'pdf',
                                                children: 'PDF',
                                              }),
                                            ],
                                          }),
                                          a.jsx('input', {
                                            className: 'input',
                                            placeholder:
                                              w.kind === 'text'
                                                ? 'Enter text…'
                                                : 'Paste URL or file path…',
                                            value: w.value,
                                            onChange: (A) =>
                                              b(I, { value: A.target.value }),
                                          }),
                                        ],
                                      }),
                                      a.jsx('button', {
                                        className: 'btn ghost',
                                        onClick: () => et(I),
                                        children: '🗑️',
                                      }),
                                    ],
                                  },
                                  I
                                )
                              ),
                              !_.length &&
                                a.jsx('div', {
                                  className: 'muted',
                                  children: 'Belum ada sumber pengetahuan.',
                                }),
                            ],
                          }),
                        ],
                      }),
                    n === 'integrations' &&
                      a.jsxs('div', {
                        className: 'col',
                        children: [
                          a.jsx('h3', { children: 'Integrations' }),
                          a.jsx('div', {
                            className: 'muted',
                            children:
                              'Hubungkan agent ke platform yang sudah terdaftar.',
                          }),
                          a.jsxs('div', {
                            className: 'row',
                            style: { gap: 8, alignItems: 'center' },
                            children: [
                              a.jsx(Gt, {
                                type:
                                  ((F = u.find((w) => w._id === m)) == null
                                    ? void 0
                                    : F.type) || 'custom',
                                size: 18,
                              }),
                              a.jsxs('select', {
                                className: 'select',
                                value: m || '',
                                onChange: (w) => y(w.target.value),
                                children: [
                                  a.jsx('option', {
                                    value: '',
                                    children: '(Tidak terhubung)',
                                  }),
                                  u.map((w) =>
                                    a.jsxs(
                                      'option',
                                      {
                                        value: w._id,
                                        children: [w.label, ' (', w.type, ')'],
                                      },
                                      w._id
                                    )
                                  ),
                                ],
                              }),
                            ],
                          }),
                          a.jsxs('div', {
                            className: 'muted',
                            style: { marginTop: 6 },
                            children: [
                              'Webhook URL umum: ',
                              a.jsx('code', {
                                children:
                                  '<PUBLIC_BASE_URL>/webhook/<platform>',
                              }),
                            ],
                          }),
                        ],
                      }),
                    n === 'followups' &&
                      a.jsxs('div', {
                        className: 'col',
                        children: [
                          a.jsx('h3', { children: 'Followups' }),
                          a.jsx('div', {
                            className: 'muted',
                            children:
                              'Placeholder (belum ada field di schema).',
                          }),
                          a.jsx('textarea', {
                            className: 'textarea',
                            rows: 6,
                            placeholder:
                              "Contoh: jika mengandung kata 'refund' → takeover human.",
                          }),
                        ],
                      }),
                    n === 'evaluation' &&
                      a.jsxs('div', {
                        className: 'col',
                        children: [
                          a.jsx('h3', { children: 'Evaluation' }),
                          a.jsx('div', {
                            className: 'muted',
                            children: 'Placeholder metrik evaluasi.',
                          }),
                        ],
                      }),
                  ],
                }),
                a.jsx('div', {
                  className: 'right',
                  children: a.jsxs('div', {
                    className: 'card testbox',
                    children: [
                      a.jsxs('div', {
                        className: 'testhead',
                        children: [
                          a.jsx('div', { className: 'avatar', children: 'AI' }),
                          a.jsx('div', {
                            style: { fontWeight: 700 },
                            children: g || f.name,
                          }),
                          a.jsx('button', {
                            className: 'btn ghost',
                            style: { marginLeft: 'auto' },
                            onClick: () =>
                              U([{ from: 'ai', text: C || 'Halo!' }]),
                            children: '↻',
                          }),
                        ],
                      }),
                      a.jsx('div', {
                        className: 'testmsgs',
                        children: T.map((w, I) =>
                          a.jsx(
                            'div',
                            { className: `bbl ${w.from}`, children: w.text },
                            I
                          )
                        ),
                      }),
                      a.jsxs('div', {
                        className: 'row',
                        children: [
                          a.jsx('input', {
                            className: 'input',
                            placeholder: 'Ketik pesan uji…',
                            value: z,
                            onChange: (w) => Q(w.target.value),
                            onKeyDown: (w) => w.key === 'Enter' && R(),
                          }),
                          a.jsx('button', {
                            className: 'btn',
                            onClick: R,
                            disabled: te,
                            children: te ? '...' : 'Kirim',
                          }),
                        ],
                      }),
                      a.jsx('div', {
                        className: 'muted',
                        style: { marginTop: 6 },
                        children:
                          'Tanpa API key, balasan akan berupa “Echo: <pesan>”.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        })
      : a.jsx('div', { className: 'card', children: 'Agent tidak ditemukan' })
}
function ry() {
  const { user: e } = Kv(),
    [t, n] = S.useState(null),
    r = Ge()
  return (
    S.useEffect(() => {
      ;(e || r('/login'),
        $.get('/billing')
          .then((l) => n(l.data))
          .catch(() => {}))
    }, []),
    a.jsxs('div', {
      children: [
        a.jsx(Dr, { authed: !0, user: e, plan: t }),
        a.jsx(Bv, {}),
        a.jsx('div', {
          className: 'main',
          style: { padding: 12 },
          children: a.jsxs(Zf, {
            children: [
              a.jsx(he, { index: !0, element: a.jsx(Qv, {}) }),
              a.jsx(he, { path: 'analytics', element: a.jsx(bv, {}) }),
              a.jsx(he, { path: 'contacts', element: a.jsx(Jv, {}) }),
              a.jsx(he, { path: 'platforms', element: a.jsx(qv, {}) }),
              a.jsx(he, { path: 'agents', element: a.jsx(Yv, {}) }),
              a.jsx(he, { path: 'agents/:id', element: a.jsx(ny, {}) }),
              a.jsx(he, { path: 'humans', element: a.jsx(Gv, {}) }),
              a.jsx(he, { path: 'settings', element: a.jsx(Zv, {}) }),
              a.jsx(he, { path: 'billing', element: a.jsx(ey, {}) }),
              a.jsx(he, { path: 'profile', element: a.jsx(ty, {}) }),
            ],
          }),
        }),
      ],
    })
  )
}
function ly() {
  return a.jsx(Gm, {
    children: a.jsxs(Zf, {
      children: [
        a.jsx(he, { path: '/', element: a.jsx(ig, {}) }),
        a.jsx(he, { path: '/login', element: a.jsx(Fv, {}) }),
        a.jsx(he, { path: '/register', element: a.jsx(Dv, {}) }),
        a.jsx(he, { path: '/verify', element: a.jsx(Uv, {}) }),
        a.jsx(he, { path: '/app/*', element: a.jsx(ry, {}) }),
        a.jsx(he, { path: '*', element: a.jsx(Wm, { to: '/' }) }),
      ],
    }),
  })
}
Wf(document.getElementById('root')).render(a.jsx(ly, {}))
