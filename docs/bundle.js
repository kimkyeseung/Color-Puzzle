/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {


var startButtonH = document.getElementById('startButtonH');
var startButtonS = document.getElementById('startButtonS');
var startButtonB = document.getElementById('startButtonB');

var submitButton = document.getElementById('submitButton');
var firstBlock = document.getElementById('firstBlock');

var board = document.getElementById('board');

var your = document.getElementById('your');
var yourHueClass = document.getElementById('yourHueClass');
var yourBrightnessClass = document.getElementById('yourBrightnessClass');
var yourSaturationClass = document.getElementById('yourSaturationClass');

var sideYou = document.getElementById('sideYou');
var sideYourClass = document.getElementById('sideYourClass');

var whatQuiz = ['Hue', 'Saturation', 'Brightness'];

var answer;

var hierarchy = [,'거지', '천민', '평민', '부자', '귀족', '영주', '장군', '왕', '황제', '마스터', '슈퍼마스터', '슈퍼그랜드마스터', '킹갓제너럴그랜드마스터', '우주의 지배자', '신'];

var submitFlag;

var win = document.getElementById('win');

if (!localStorage.colorPuzzle) {
  localStorage.setItem('colorPuzzle', JSON.stringify({hLevel: 1, sLevel: 1, bLevel: 1}));
}
var storageData = JSON.parse(localStorage.getItem('colorPuzzle'));

if ((storageData.hLevel >= 15) && (storageData.sLevel >= 15) && (storageData.bLevel >= 15)) {
  document.getElementById('title').style.display = 'none';
  document.getElementById('buttonGroup').style.display = 'none';
  your.innerHTML = '<p>당신은</p><p class="class">색채의 신</p><p>입니다.</p>'
  var regame = document.createElement('p');
  regame.textContent = '처음부터 다시하기';
  regame.id = 'regame';
  regame.addEventListener('click', function(event) {
    localStorage.setItem('colorPuzzle', JSON.stringify({hLevel: 1, sLevel: 1, bLevel: 1}));
    window.location.reload();
  });
  your.appendChild(regame);
}

yourHueClass.textContent = '색상 : ' + hierarchy[storageData.hLevel];
yourBrightnessClass.textContent = '명도 : ' + hierarchy[storageData.bLevel];
yourSaturationClass.textContent = '채도 : ' + hierarchy[storageData.sLevel];
  

//key maker
function makeKeyArray_300(number) {
  var arr = [];
  for (var i = 1; i <= number; i++) {
    arr.push(Math.floor(300*(i/number)));
  }
  return arr;
}

function makeKeyArray_100(number) {
  var arr = [];
  for (var i = number-1; i >= 0; i--) {
    arr.push(Math.floor(100*(i/number)));
  }
  return arr;
}


//shuffle
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    var x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

document.getElementById('buttonGroup').addEventListener('mouseover', function(event) {
  if (event.target.id !== submitFlag) {
    event.preventDefault();
    event.target.style.backgroundColor = 'red';
    var originText = event.target.textContent;
    event.target.textContent = '도전하기';
    event.target.style.color = 'white';
    event.target.addEventListener('mouseleave', function(event) {
      event.target.textContent = originText;
      event.target.style.backgroundColor = '';
      event.target.style.color = '';
    });
  }
});


//game
function game(event) {
  win.style.display = 'none';
  while (board.children.length > 1) {//게임판 비우기
    board.lastElementChild.remove();
  }
  console.log('start');
  
  document.getElementById('title').innerHTML = '<h4><a href="">도전! 색채의 신</a></h4>';

  your.style.display = 'none';

  this.style.cursor = 'default';
  this.style.backgroundColor = 'red';// 작동 x
  this.style.color = 'white';        // 작동 x

  this.removeEventListener('click', game);
  
  submitButton.style.display = 'block';
  board.style.display = 'block';
  sideYou.style.display = 'block';

  if (this.id === 'startButtonH') {
    submitFlag = 'startButtonH';

    sideYourClass.textContent = '색상 : 당신은 ' + hierarchy[storageData.hLevel] + '입니다.';
    startButtonS.style.color = '';
    startButtonB.style.color = '';
    startButtonS.style.backgroundColor = '';
    startButtonB.style.backgroundColor = '';
    startButtonS.addEventListener('click', game);
    startButtonB.addEventListener('click', game);

    answer = makeKeyArray_300(storageData.hLevel*4);

    if (storageData.hLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 색상의 신입니다.';
      submitButton.style.display = 'none';
    }
    
  } else if (this.id === 'startButtonS') {
    submitFlag = 'startButtonS';

    sideYourClass.textContent = '채도 : 당신은 ' + hierarchy[storageData.sLevel] + '입니다.';
    startButtonH.style.color = '';
    startButtonB.style.color = '';
    startButtonH.style.backgroundColor = '';
    startButtonB.style.backgroundColor = '';
    startButtonH.addEventListener('click', game);
    startButtonB.addEventListener('click', game);

    answer = makeKeyArray_100(storageData.sLevel*4);
  
    if (storageData.sLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 채도의 신입니다.';
      submitButton.style.display = 'none';
    }

  } else if (this.id === 'startButtonB') {
    submitFlag = 'startButtonB';

    sideYourClass.textContent = '명도 : 당신은 ' + hierarchy[storageData.bLevel] + '입니다.';
    startButtonH.style.color = '';
    startButtonS.style.color = '';
    startButtonH.style.backgroundColor = '';
    startButtonS.style.backgroundColor = '';
    startButtonH.addEventListener('click', game);
    startButtonS.addEventListener('click', game);

    answer = makeKeyArray_100(storageData.bLevel*4);

    if (storageData.bLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 명도의 신입니다.';
      submitButton.style.display = 'none';
    }
  }
  
  var quiz = shuffle(answer);

  var randomColor = Math.floor(Math.random()*359);
  for (var i = 0; i < quiz.length; i++) {
    var madeBlock = document.createElement('li');
    madeBlock.setAttribute('draggable', 'true');
    madeBlock.classList.add('block');
    madeBlock.id = 'block' + i;

    if ((this.id === 'startButtonH') && (storageData.hLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'hsl(0, 100%, 60%)';
      madeBlock.style.backgroundColor = 'hsl(' + quiz[i] + ', 100%, 60%)';

    } else if ((this.id === 'startButtonS') && (storageData.sLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'hsl(' + randomColor + ', 100%, 50%)';
      madeBlock.style.backgroundColor = 'hsl(' + randomColor + ', ' + quiz[i] + '%, 50%)';

    } else if ((this.id === 'startButtonB') && (storageData.bLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'white';
      document.querySelector('.first').style.color = 'black';
      madeBlock.style.backgroundColor = 'hsl(' + randomColor + ', 50%, ' + quiz[i] + '%)';
    }
    
    madeBlock.setAttribute('key', quiz[i]);

    if (storageData.bLevel < 15) {
      board.appendChild(madeBlock);
    }

  }

  for (var i = 0; i < board.children.length; i++) {
    board.children[i].style.width = 100 / board.children.length + '%'
  }

  var lastBlock = document.createElement('li');
  lastBlock.classList.add('block');
  board.appendChild(lastBlock);
}

startButtonH.addEventListener('click', game, false);
startButtonS.addEventListener('click', game, false);
startButtonB.addEventListener('click', game, false);


document.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('piece', event.target.id);
});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
});

document.addEventListener('dragenter', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.borderLeft = '4px solid CornFlowerBlue';
  }
});

document.addEventListener('dragleave', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.borderLeft = '';
  }
});

document.addEventListener('drop', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.borderLeft = '';
    var data = event.dataTransfer.getData('piece');
    board.insertBefore(document.getElementById(data),event.target);
  }
})


submitButton.addEventListener('click', function(event) {
  var result = [];
  for (var i = 1; i < board.children.length-1; i++) {
    result.push(Number(board.children[i].getAttribute('key')));
  }
  if (String(result) === String(answer)) {
    alert('정답입니다!');
    if (submitFlag === 'startButtonH') {
      storageData.hLevel++;
      if (storageData.hLevel >= 15) {
        window.location.reload();
      }
    } else if (submitFlag === 'startButtonS') {
      storageData.sLevel++;
      if (storageData.sLevel >= 15) {
        window.location.reload();
      }
    } else if (submitFlag === 'startButtonB') {
      storageData.bLevel++;
      if (storageData.bLevel >= 15) {
        window.location.reload();
      }
    }
    
    localStorage.setItem('colorPuzzle', JSON.stringify(storageData));
    
    game.call(document.getElementById(submitFlag));
  } else {
    alert('떙! 정답이 아닙니다! 다시 해보세요');
  }
})

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Black+Han+Sans);", ""]);

// module
exports.push([module.i, "/*\n *\n * 이곳에 CSS 작업을 해주세요!\n * 아래의 CSS 코드는 지우셔도 됩니다!\n *\n * less라는 CSS preprocessor를 사용하셔도 되고, 그냥 파일명은 유지한채 CSS로 작업하셔도 됩니다.\n * http://lesscss.org\n *\n*/\na:hover,\na:link,\na:visited,\na:active {\n  color: black;\n  text-decoration: none;\n}\nbody {\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center center;\n}\n#title h3 {\n  text-align: center;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 90px;\n  line-height: 100px;\n  margin: 70px 0 0;\n  padding: 0;\n}\n#title h2 {\n  text-align: center;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 130px;\n  line-height: 140px;\n  padding: 0;\n  margin: 0;\n}\n#title h4 {\n  text-align: center;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 60px;\n  line-height: 80px;\n  margin: 120px 0 0;\n  padding: 0;\n}\n#buttonGroup {\n  width: 600px;\n  margin: 0 auto;\n}\n#buttonGroup div {\n  width: 120px;\n  height: 30px;\n  margin: 40px;\n  box-sizing: border-box;\n  float: left;\n  text-align: center;\n  line-height: 30px;\n  background-color: #f5f5f5;\n  border: 1px solid #666;\n  border-radius: 4px;\n  cursor: pointer;\n}\n#board {\n  position: relative;\n  clear: both;\n  display: none;\n  margin-top: 20px;\n  max-width: 1600px;\n  width: 100%;\n  height: 220px;\n  margin: 0 auto;\n  padding: 10px;\n  box-sizing: border-box;\n  border-radius: 12px;\n  border: 1px solid #666;\n  background-color: #f5f5f5;\n}\n#board li {\n  font-size: 20px;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  list-style: none;\n  float: left;\n  text-align: center;\n  line-height: 200px;\n  color: white;\n}\n#board li:last-child {\n  position: absolute;\n  width: 40px;\n  height: 200px;\n  right: -28px;\n  top: 10px;\n  background: transparent;\n}\n#board .first {\n  background: #ff3333;\n}\n#board #done {\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 130px;\n  line-height: 200px;\n  text-align: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n#win {\n  display: none;\n  margin-top: 20px;\n  max-width: 1600px;\n  width: 100%;\n  height: 220px;\n  margin: 0 auto;\n  padding: 10px;\n  box-sizing: border-box;\n  border-radius: 12px;\n  border: 1px solid #666;\n  background-color: #f5f5f5;\n  position: absolute;\n  left: 50%;\n  margin-top: -220px;\n  margin-left: -800px;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 130px;\n  line-height: 200px;\n  text-align: center;\n}\n#submitButton {\n  display: none;\n  margin: 0 auto;\n  margin-top: 40px;\n}\n#your {\n  clear: both;\n  width: 1000px;\n  margin: 160px auto 0;\n  border: 10px solid black;\n}\n#your p {\n  background: white;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 60px;\n  line-height: 64px;\n  text-align: center;\n  margin: 0;\n}\n#your p:first-child {\n  width: 600px;\n  margin-top: -35px;\n  margin-left: 200px;\n}\n#your p:last-child {\n  width: 600px;\n  margin-left: 200px;\n  margin-bottom: -35px;\n}\n#your .class {\n  font-size: 100px;\n  line-height: 106px;\n}\n#your #regame {\n  position: absolute;\n  top: 50%;\n  cursor: pointer;\n}\n#your #regame:hover {\n  text-decoration: underline;\n}\n#sideYou {\n  display: none;\n  width: 1000px;\n  margin: 50px auto 0;\n  border: 10px solid black;\n  overflow: visible;\n}\n#sideYou .side {\n  background: white;\n  font-family: 'Black Han Sans', sans-serif;\n  font-weight: 400;\n  font-size: 60px;\n  line-height: 64px;\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);