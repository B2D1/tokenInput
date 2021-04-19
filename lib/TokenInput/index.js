"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./index.scss");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TokenInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var tokenSeparators = _ref.tokenSeparators,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      _ref$row = _ref.row,
      row = _ref$row === void 0 ? 3 : _ref$row,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus,
      placeholder = _ref.placeholder,
      _ref$tokenLength = _ref.tokenLength,
      tokenLength = _ref$tokenLength === void 0 ? 24 : _ref$tokenLength,
      _ref$validator = _ref.validator,
      validator = _ref$validator === void 0 ? function () {
    return true;
  } : _ref$validator,
      onChange = _ref.onChange;
  var INPUT_INIT_WIDTH = 4;
  var LINE_FEED = /\n/g;
  var SPACE = "\xA0";
  var SEPARATOR_REG = tokenSeparators && new RegExp("[".concat(tokenSeparators.join(""), "]"));
  var editRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null);
  var containerRef = (0, _react.useRef)(null);
  var mirrorRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocus = _useState2[0],
      setFocus = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isComposing = _useState4[0],
      setComposing = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      val = _useState6[0],
      SetVal = _useState6[1];

  var _useState7 = (0, _react.useState)(Array.isArray(value) ? value : [value]),
      _useState8 = _slicedToArray(_useState7, 2),
      tokens = _useState8[0],
      setTokens = _useState8[1];

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      empty: function empty() {
        tokens.length = 0;
      }
    };
  }, [tokens]);

  var addTokens = function addTokens(newToken) {
    if (isComposing) return;
    SetVal("");
    var newTokens = Array.from(new Set([].concat(_toConsumableArray(tokens), _toConsumableArray((Array.isArray(newToken) ? newToken : [newToken]).map(function (token) {
      return token.replace(LINE_FEED, " ");
    }).filter(function (token) {
      return Boolean(token.trimStart().trimEnd());
    })))));
    setTokens(newTokens);

    if (newTokens.length !== tokens.length) {
      onChange === null || onChange === void 0 ? void 0 : onChange(newTokens);
    }
  };

  var removeToken = function removeToken(index) {
    if (!tokens.length) return;
    tokens.splice(index, 1);
    onChange === null || onChange === void 0 ? void 0 : onChange(tokens);
    setTokens(_toConsumableArray(tokens));
  };

  var calcInputWidth = function calcInputWidth(str) {
    mirrorRef.current.innerText = str;
    var width = getComputedStyle(mirrorRef.current)["width"];
    return parseFloat(width.substring(0, width.length - 2));
  };

  var resetInputWidth = function resetInputWidth() {
    // do not reset input width when edit area has content
    if (val) return;
    contentRef.current.style.width = "".concat(INPUT_INIT_WIDTH, "px");
    mirrorRef.current.textContent = SPACE;
  };

  var scrollToBottom = function scrollToBottom() {
    var con = containerRef.current;
    con.scrollTop = con.scrollHeight - con.clientHeight;
  };

  var handleChange = function handleChange(ev) {
    var value = ev.target.value;
    SetVal(value);
    contentRef.current.style.width = "".concat(INPUT_INIT_WIDTH + calcInputWidth(value), "px");

    if (tokenSeparators && SEPARATOR_REG.test(value)) {
      addTokens(value.split(SEPARATOR_REG));
    }
  };

  var handleKeyDown = function handleKeyDown(ev) {
    if (ev.key === "Enter") {
      addTokens(val);
    } else if (ev.key === "Backspace" && val.length === 0) {
      removeToken(tokens.length - 1);
    }
  };

  var handleCloseIconClick = function handleCloseIconClick(ev, index) {
    var _editRef$current;

    ev.nativeEvent.stopImmediatePropagation();
    ev.stopPropagation();
    removeToken(index);
    if (isFocus) (_editRef$current = editRef.current) === null || _editRef$current === void 0 ? void 0 : _editRef$current.focus();
  };

  var handleCompositionStart = function handleCompositionStart() {
    setComposing(true);
  };

  var handleCompositionEnd = function handleCompositionEnd() {
    setComposing(false);
  };

  var handleContainerBlur = function handleContainerBlur() {
    return setFocus(false);
  };

  var handleFocus = function handleFocus() {
    return setFocus(true);
  };

  var handleContainerClick = function handleContainerClick(ev) {
    var _editRef$current2;

    ev.nativeEvent.stopImmediatePropagation();
    var editEle = editRef.current;

    if (editEle) {
      editEle.selectionStart = editEle.selectionEnd = editEle.value.length;
    }

    (_editRef$current2 = editRef.current) === null || _editRef$current2 === void 0 ? void 0 : _editRef$current2.focus();
    scrollToBottom();
  };

  var handleInputClick = function handleInputClick(ev) {
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
  };

  (0, _react.useEffect)(function () {
    resetInputWidth();
    scrollToBottom();
  }, [tokens]);
  (0, _react.useEffect)(function () {
    scrollToBottom();
  }, [val]);
  (0, _react.useEffect)(function () {
    document.addEventListener("click", handleContainerBlur);
    return function () {
      return document.removeEventListener("click", handleContainerBlur);
    };
  }, [handleContainerBlur]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "root-teamGuidance",
    ref: containerRef,
    className: "tokenInput__container ".concat(isFocus ? "tokenInput__container--focus" : ""),
    style: {
      maxHeight: row * 22 + 10 + (row - 1) * 9
    },
    onClick: handleContainerClick
  }, tokens.map(function (token, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      onClick: function onClick(e) {
        return e.nativeEvent.stopImmediatePropagation();
      },
      className: "tokenInput__token ".concat(!validator(token) ? "tokenInput__token--error" : ""),
      key: token
    }, token.length > tokenLength ? /*#__PURE__*/_react["default"].createElement("span", null, token.substring(0, tokenLength) + "...") : /*#__PURE__*/_react["default"].createElement("span", null, token), /*#__PURE__*/_react["default"].createElement("svg", {
      onClick: function onClick(ev) {
        return handleCloseIconClick(ev, index);
      },
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      d: "M5.99993 5.29282L9.85868 1.43406C9.95632 1.33643 10.1146 1.33643 10.2122 1.43406L10.5658 1.78762C10.6634 1.88525 10.6634 2.04354 10.5658 2.14117L6.70703 5.99993L10.5658 9.85869C10.6634 9.95632 10.6634 10.1146 10.5658 10.2122L10.2122 10.5658C10.1146 10.6634 9.95632 10.6634 9.85868 10.5658L5.99993 6.70703L2.14117 10.5658C2.04354 10.6634 1.88525 10.6634 1.78762 10.5658L1.43406 10.2122C1.33643 10.1146 1.33643 9.95632 1.43406 9.85869L5.29282 5.99993L1.43406 2.14117C1.33643 2.04354 1.33643 1.88525 1.43406 1.78762L1.78762 1.43406C1.88525 1.33643 2.04354 1.33643 2.14117 1.43406L5.99993 5.29282Z"
    })));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "tokenInput__content",
    ref: contentRef
  }, val || tokens.length ? null : /*#__PURE__*/_react["default"].createElement("span", {
    className: "tokenInput__content__placeholder"
  }, placeholder), /*#__PURE__*/_react["default"].createElement("input", {
    autoFocus: autoFocus,
    ref: editRef,
    className: "tokenInput__content__edit",
    type: "text",
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    onFocus: handleFocus,
    onClick: handleInputClick,
    value: val
  }), /*#__PURE__*/_react["default"].createElement("span", {
    ref: mirrorRef,
    className: "tokenInput__content__mirror"
  }, "\xA0")));
});
var _default = TokenInput;
exports["default"] = _default;