/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/elements/header/header.css":
/*!***************************************************!*\
  !*** ./src/components/elements/header/header.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/app.js":
/*!*******************************!*\
  !*** ./src/components/app.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _elements_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/header/header */ "./src/components/elements/header/header.js");
/* harmony import */ var _elements_main_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/main/main */ "./src/components/elements/main/main.js");



class App {
  goals;
  tasks;
  header;
  main;

  constructor() {
    this.header = new _elements_header_header__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.main = new _elements_main_main__WEBPACK_IMPORTED_MODULE_1__["default"](this.goals);
  }
}


/***/ }),

/***/ "./src/components/elements/header/header.js":
/*!**************************************************!*\
  !*** ./src/components/elements/header/header.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utiltity/createElem */ "./src/components/utiltity/createElem.js");
/* harmony import */ var _header_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.css */ "./src/components/elements/header/header.css");



class Header {
  node;
  goalBtn;
  taskBtn;
  constructor() {
    const body = document.querySelector("body");
    this.goalBtn = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "div", textContent: "GOALS" });
    console.log(this.goalBtn);
    this.taskBtn = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "div", textContent: "TASKS" });
    this.node = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      tag: "header",
      styles: ["header"],
      children: [this.goalBtn, this.taskBtn],
    });
    body.append(this.node);
  }
}


/***/ }),

/***/ "./src/components/elements/input/input.js":
/*!************************************************!*\
  !*** ./src/components/elements/input/input.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utiltity/createElem */ "./src/components/utiltity/createElem.js");


class Input {
  node;
  buttonNode;
  input;
  constructor(textContent) {
    this.input = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "input" });
    const label = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      tag: "label",
      textContent: textContent,
      children: [this.input],
    });
    this.buttonNode = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "button", textContent: "CREATE" });
    this.node = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      tag: "section",
      children: [label, this.buttonNode],
    });
  }

  addNewLine({ textContent }) {
    const body = document.querySelector("body");
    let list;
    if (document.querySelector("list")) {
      list = document.querySelector("list");
    } else {
      list = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "section" });
      body.append(list);
    }
    console.log(1);

    list.append(this.createLine({ textContent }));
  }

  createLine({ textContent }) {
    const text = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "div", textContent: textContent });
    const line = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({ tag: "p", textContent: textContent });
    return line;
  }
}


/***/ }),

/***/ "./src/components/elements/main/main.js":
/*!**********************************************!*\
  !*** ./src/components/elements/main/main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utiltity/createElem */ "./src/components/utiltity/createElem.js");
/* harmony import */ var _utiltity_goal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utiltity/goal */ "./src/components/utiltity/goal.js");
/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../input/input */ "./src/components/elements/input/input.js");




class Main {
  node;
  goalInput;
  goalsList = localStorage.getItem("goals")
    ? JSON.parse(localStorage.getItem("goals"))
    : [];

  constructor() {
    console.log(JSON.parse(localStorage.getItem("goals")));
    console.log(this.goalsList);

    this.createGoalsPage();
  }

  createGoalsPage() {
    const body = document.querySelector("body");
    this.goalInput = new _input_input__WEBPACK_IMPORTED_MODULE_2__["default"]("CREATE A GOAL");
    this.node = (0,_utiltity_createElem__WEBPACK_IMPORTED_MODULE_0__["default"])({
      tag: "main",
      children: [this.goalInput.node],
    });
    body.append(this.node);

    if (this.goalsList.length !== 0) {
      console.log(1);
      this.goalsList.forEach((elem) => {
        this.goalInput.addNewLine({ textContent: elem.description });
      });
    }

    this.goalInput.buttonNode.addEventListener("click", () => {
      this.goalsList.push(
        new _utiltity_goal__WEBPACK_IMPORTED_MODULE_1__["default"]({
          description: this.goalInput.input.value,
        })
      );
      this.goalInput.addNewLine({ textContent: this.goalInput.input.value });
      this.goalInput.input.value = "";
      localStorage.setItem("goals", JSON.stringify(this.goalsList));
    });
  }
}


/***/ }),

/***/ "./src/components/utiltity/createElem.js":
/*!***********************************************!*\
  !*** ./src/components/utiltity/createElem.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElem)
/* harmony export */ });
function createElem({ tag, styles, textContent, children }) {
  const node = document.createElement(tag);
  if (styles) {
    node.classList.add(...styles);
  }
  if (textContent) {
    node.textContent = textContent;
  }
  if (children) {
    children.forEach((elem) => {
      node.append(elem);
    });
  }

  return node;
}


/***/ }),

/***/ "./src/components/utiltity/goal.js":
/*!*****************************************!*\
  !*** ./src/components/utiltity/goal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Goal)
/* harmony export */ });
class Goal {
  description;
  deadline;
  status;
  constructor({ description, deadline, status }) {
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/app */ "./src/components/app.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



const app = new _components_app__WEBPACK_IMPORTED_MODULE_0__["default"]();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0E4QztBQUNOO0FBQ3hDO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0RBQU07QUFDNUIsb0JBQW9CLDJEQUFJO0FBQ3hCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYm1EO0FBQzdCO0FBQ3RCO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFVLEdBQUcsa0NBQWtDO0FBQ2xFO0FBQ0EsbUJBQW1CLGdFQUFVLEdBQUcsa0NBQWtDO0FBQ2xFLGdCQUFnQixnRUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJtRDtBQUNuRDtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsZ0VBQVUsR0FBRyxjQUFjO0FBQzVDLGtCQUFrQixnRUFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsc0JBQXNCLGdFQUFVLEdBQUcsc0NBQXNDO0FBQ3pFLGdCQUFnQixnRUFBVTtBQUMxQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sYUFBYSxnRUFBVSxHQUFHLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxhQUFhO0FBQy9DO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsaUJBQWlCLGdFQUFVLEdBQUcsc0NBQXNDO0FBQ3BFLGlCQUFpQixnRUFBVSxHQUFHLG9DQUFvQztBQUNsRTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDbUQ7QUFDWjtBQUNKO0FBQ25DO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQUs7QUFDOUIsZ0JBQWdCLGdFQUFVO0FBQzFCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQywrQkFBK0I7QUFDbkUsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBSTtBQUNoQjtBQUNBLFNBQVM7QUFDVDtBQUNBLGtDQUFrQyx5Q0FBeUM7QUFDM0U7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3Q2Usc0JBQXNCLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDZmU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0JBQStCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNUQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05tQztBQUNkO0FBQ3JCO0FBQ0EsZ0JBQWdCLHVEQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGFzay10cmFja2VyLy4vc3JjL2NvbXBvbmVudHMvZWxlbWVudHMvaGVhZGVyL2hlYWRlci5jc3M/MmFiYSIsIndlYnBhY2s6Ly90YXNrLXRyYWNrZXIvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vdGFzay10cmFja2VyLy4vc3JjL2NvbXBvbmVudHMvYXBwLmpzIiwid2VicGFjazovL3Rhc2stdHJhY2tlci8uL3NyYy9jb21wb25lbnRzL2VsZW1lbnRzL2hlYWRlci9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdGFzay10cmFja2VyLy4vc3JjL2NvbXBvbmVudHMvZWxlbWVudHMvaW5wdXQvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vdGFzay10cmFja2VyLy4vc3JjL2NvbXBvbmVudHMvZWxlbWVudHMvbWFpbi9tYWluLmpzIiwid2VicGFjazovL3Rhc2stdHJhY2tlci8uL3NyYy9jb21wb25lbnRzL3V0aWx0aXR5L2NyZWF0ZUVsZW0uanMiLCJ3ZWJwYWNrOi8vdGFzay10cmFja2VyLy4vc3JjL2NvbXBvbmVudHMvdXRpbHRpdHkvZ29hbC5qcyIsIndlYnBhY2s6Ly90YXNrLXRyYWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGFzay10cmFja2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90YXNrLXRyYWNrZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90YXNrLXRyYWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90YXNrLXRyYWNrZXIvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBIZWFkZXIgZnJvbSBcIi4vZWxlbWVudHMvaGVhZGVyL2hlYWRlclwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi9lbGVtZW50cy9tYWluL21haW5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XHJcbiAgZ29hbHM7XHJcbiAgdGFza3M7XHJcbiAgaGVhZGVyO1xyXG4gIG1haW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5oZWFkZXIgPSBuZXcgSGVhZGVyKCk7XHJcbiAgICB0aGlzLm1haW4gPSBuZXcgTWFpbih0aGlzLmdvYWxzKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IGNyZWF0ZUVsZW0gZnJvbSBcIi4uLy4uL3V0aWx0aXR5L2NyZWF0ZUVsZW1cIjtcclxuaW1wb3J0IFwiLi9oZWFkZXIuY3NzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xyXG4gIG5vZGU7XHJcbiAgZ29hbEJ0bjtcclxuICB0YXNrQnRuO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gICAgdGhpcy5nb2FsQnRuID0gY3JlYXRlRWxlbSh7IHRhZzogXCJkaXZcIiwgdGV4dENvbnRlbnQ6IFwiR09BTFNcIiB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZ29hbEJ0bik7XHJcbiAgICB0aGlzLnRhc2tCdG4gPSBjcmVhdGVFbGVtKHsgdGFnOiBcImRpdlwiLCB0ZXh0Q29udGVudDogXCJUQVNLU1wiIH0pO1xyXG4gICAgdGhpcy5ub2RlID0gY3JlYXRlRWxlbSh7XHJcbiAgICAgIHRhZzogXCJoZWFkZXJcIixcclxuICAgICAgc3R5bGVzOiBbXCJoZWFkZXJcIl0sXHJcbiAgICAgIGNoaWxkcmVuOiBbdGhpcy5nb2FsQnRuLCB0aGlzLnRhc2tCdG5dLFxyXG4gICAgfSk7XHJcbiAgICBib2R5LmFwcGVuZCh0aGlzLm5vZGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgY3JlYXRlRWxlbSBmcm9tIFwiLi4vLi4vdXRpbHRpdHkvY3JlYXRlRWxlbVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQge1xyXG4gIG5vZGU7XHJcbiAgYnV0dG9uTm9kZTtcclxuICBpbnB1dDtcclxuICBjb25zdHJ1Y3Rvcih0ZXh0Q29udGVudCkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGNyZWF0ZUVsZW0oeyB0YWc6IFwiaW5wdXRcIiB9KTtcclxuICAgIGNvbnN0IGxhYmVsID0gY3JlYXRlRWxlbSh7XHJcbiAgICAgIHRhZzogXCJsYWJlbFwiLFxyXG4gICAgICB0ZXh0Q29udGVudDogdGV4dENvbnRlbnQsXHJcbiAgICAgIGNoaWxkcmVuOiBbdGhpcy5pbnB1dF0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuYnV0dG9uTm9kZSA9IGNyZWF0ZUVsZW0oeyB0YWc6IFwiYnV0dG9uXCIsIHRleHRDb250ZW50OiBcIkNSRUFURVwiIH0pO1xyXG4gICAgdGhpcy5ub2RlID0gY3JlYXRlRWxlbSh7XHJcbiAgICAgIHRhZzogXCJzZWN0aW9uXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbbGFiZWwsIHRoaXMuYnV0dG9uTm9kZV0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZE5ld0xpbmUoeyB0ZXh0Q29udGVudCB9KSB7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBsZXQgbGlzdDtcclxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGlzdFwiKSkge1xyXG4gICAgICBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpc3RcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsaXN0ID0gY3JlYXRlRWxlbSh7IHRhZzogXCJzZWN0aW9uXCIgfSk7XHJcbiAgICAgIGJvZHkuYXBwZW5kKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coMSk7XHJcblxyXG4gICAgbGlzdC5hcHBlbmQodGhpcy5jcmVhdGVMaW5lKHsgdGV4dENvbnRlbnQgfSkpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTGluZSh7IHRleHRDb250ZW50IH0pIHtcclxuICAgIGNvbnN0IHRleHQgPSBjcmVhdGVFbGVtKHsgdGFnOiBcImRpdlwiLCB0ZXh0Q29udGVudDogdGV4dENvbnRlbnQgfSk7XHJcbiAgICBjb25zdCBsaW5lID0gY3JlYXRlRWxlbSh7IHRhZzogXCJwXCIsIHRleHRDb250ZW50OiB0ZXh0Q29udGVudCB9KTtcclxuICAgIHJldHVybiBsaW5lO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgY3JlYXRlRWxlbSBmcm9tIFwiLi4vLi4vdXRpbHRpdHkvY3JlYXRlRWxlbVwiO1xyXG5pbXBvcnQgR29hbCBmcm9tIFwiLi4vLi4vdXRpbHRpdHkvZ29hbFwiO1xyXG5pbXBvcnQgSW5wdXQgZnJvbSBcIi4uL2lucHV0L2lucHV0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIHtcclxuICBub2RlO1xyXG4gIGdvYWxJbnB1dDtcclxuICBnb2Fsc0xpc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdvYWxzXCIpXHJcbiAgICA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJnb2Fsc1wiKSlcclxuICAgIDogW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdvYWxzXCIpKSk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdvYWxzTGlzdCk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVHb2Fsc1BhZ2UoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdvYWxzUGFnZSgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICAgIHRoaXMuZ29hbElucHV0ID0gbmV3IElucHV0KFwiQ1JFQVRFIEEgR09BTFwiKTtcclxuICAgIHRoaXMubm9kZSA9IGNyZWF0ZUVsZW0oe1xyXG4gICAgICB0YWc6IFwibWFpblwiLFxyXG4gICAgICBjaGlsZHJlbjogW3RoaXMuZ29hbElucHV0Lm5vZGVdLFxyXG4gICAgfSk7XHJcbiAgICBib2R5LmFwcGVuZCh0aGlzLm5vZGUpO1xyXG5cclxuICAgIGlmICh0aGlzLmdvYWxzTGlzdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgY29uc29sZS5sb2coMSk7XHJcbiAgICAgIHRoaXMuZ29hbHNMaXN0LmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgICB0aGlzLmdvYWxJbnB1dC5hZGROZXdMaW5lKHsgdGV4dENvbnRlbnQ6IGVsZW0uZGVzY3JpcHRpb24gfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ29hbElucHV0LmJ1dHRvbk5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5nb2Fsc0xpc3QucHVzaChcclxuICAgICAgICBuZXcgR29hbCh7XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5nb2FsSW5wdXQuaW5wdXQudmFsdWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5nb2FsSW5wdXQuYWRkTmV3TGluZSh7IHRleHRDb250ZW50OiB0aGlzLmdvYWxJbnB1dC5pbnB1dC52YWx1ZSB9KTtcclxuICAgICAgdGhpcy5nb2FsSW5wdXQuaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImdvYWxzXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZ29hbHNMaXN0KSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbSh7IHRhZywgc3R5bGVzLCB0ZXh0Q29udGVudCwgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgaWYgKHN0eWxlcykge1xyXG4gICAgbm9kZS5jbGFzc0xpc3QuYWRkKC4uLnN0eWxlcyk7XHJcbiAgfVxyXG4gIGlmICh0ZXh0Q29udGVudCkge1xyXG4gICAgbm9kZS50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG4gIH1cclxuICBpZiAoY2hpbGRyZW4pIHtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgbm9kZS5hcHBlbmQoZWxlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub2RlO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvYWwge1xyXG4gIGRlc2NyaXB0aW9uO1xyXG4gIGRlYWRsaW5lO1xyXG4gIHN0YXR1cztcclxuICBjb25zdHJ1Y3Rvcih7IGRlc2NyaXB0aW9uLCBkZWFkbGluZSwgc3RhdHVzIH0pIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMuZGVhZGxpbmUgPSBkZWFkbGluZTtcclxuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG9uZW50cy9hcHBcIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9