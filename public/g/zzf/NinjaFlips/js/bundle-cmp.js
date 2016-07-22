/*
(c) 2013-2014 GameMix Inc.  All rights reserved.
*/
(function() {
	var requestAnimFrame = window.requestAnimFrame = function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1e3 / 60)
		}
	}();
	var cancelAnimFrame = window.cancelAnimFrame = function() {
		return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function() {
			window.clearTimeout.apply(window, arguments)
		}
	}();
	navigator.vibrate = function() {
		return navigator.vibrate || navigator.mozVibrate || navigator.webkitVibrate || navigator.oVibrate || navigator.msVibrate || (navigator.notification ? function(l) {
			navigator.notification.vibrate(l)
		} : null) || new Function
	}();
	var console = function() {
		return window.console || {
			log: new Function,
			debug: new Function,
			warn: new Function,
			error: new Function,
			clear: new Function
		}
	}();
	var DOM = {
		get: function(el) {
			r = el == document || el == window || el instanceof HTMLElement ? el : document.getElementById(el);
			if (r == null) {
				console.log(el)
			}
			return r
		},
		attr: function(el, attr, value) {
			if (value) {
				this.get(el).setAttribute(attr, value)
			} else {
				return this.get(el).getAttribute(attr)
			}
		},
		on: function(el, evt, handler) {
			var split = evt.split(" ");
			for (var i in split) {
				this.get(el).addEventListener(split[i], handler, false)
			}
		},
		un: function(el, evt, handler) {
			var split = evt.split(" ");
			for (var i in split) {
				this.get(el).removeEventListener(split[i], handler, false)
			}
		},
		show: function(el) {
			this.get(el).style.display = "block"
		},
		hide: function(el) {
			this.get(el).style.display = "none"
		},
		offset: function(el) {
			el = this.get(el);
			return {
				x: el.clientLeft + window.scrollLeft,
				y: el.clientTop + window.scrollTop
			};
			var pos = {
				x: 0,
				y: 0
			};
			do {
				pos.x += el.offsetLeft || 0;
				pos.y += el.offsetTop || 0
			} while ((el = el.parentNode) !== null);
			return pos
		},
		query: function(query) {
			if (!document.querySelectorAll) return null;
			var q = document.querySelectorAll(query);
			return q
		},
		queryOne: function(query) {
			if (!document.querySelector) return null;
			var q = document.querySelector(query);
			return q
		},
		create: function(type) {
			return document.createElement(type)
		},
		positionRelativeTo: function(element, clientX, clientY) {
			var offset = DOM.offset(element);
			return {
				x: clientX - offset.x,
				y: clientY - offset.y
			}
		},
		fitScreen: function(element, ratio) {
			var clientRatio = window.innerWidth / window.innerHeight;
			var width, height;
			if (clientRatio <= ratio) {
				width = window.innerWidth;
				height = width / ratio
			} else {
				height = window.innerHeight;
				width = height * ratio
			}
			element = DOM.get(element);
			element.style.width = width + "px";
			element.style.height = height + "px";
			return {
				width: width,
				height: height
			}
		},
		saveCanvas: function(element) {
			var src = this.get(element);
			var can = this.create("canvas");
			can.width = src.width;
			can.height = src.height;
			var c = can.getContext("2d");
			c.drawImage(src, 0, 0);
			return can
		},
		fadeIn: function(element, duration, callback) {
			element = this.get(element);
			duration = duration || 1e3;
			this.show(element);
			element.style.opacity = 0;
			Util.interpolate(element.style, {
				opacity: 1
			}, duration, callback)
		},
		fadeOut: function(element, duration, callback) {
			element = this.get(element);
			duration = duration || 1e3;
			this.show(element);
			element.style.opacity = 1;
			Util.interpolate(element.style, {
				opacity: 0
			}, duration, function() {
				DOM.hide(element);
				if (callback) callback()
			})
		},
		notify: function(htmlMessage, duration, container) {
			container = container ? this.get(container) : document.body;
			this.notification = this.notification || function() {
				var block = DOM.create("div");
				container.appendChild(block);
				DOM.applyStyle(block, {
					zIndex: 999999,
					position: "absolute",
					bottom: "10px",
					width: "100%",
					textAlign: "center"
				});
				var message = DOM.create("span");
				block.appendChild(message);
				DOM.applyStyle(message, {
					backgroundColor: "rgba(0,0,0,0.7)",
					border: "1px solid white",
					borderRadius: "3px",
					margin: "auto",
					color: "white",
					padding: "2px",
					paddingLeft: "10px",
					paddingRight: "10px",
					width: "50%",
					fontSize: "0.7em",
					boxShadow: "0px 0px 2px black"
				});
				return {
					block: block,
					message: message,
					queue: [],
					add: function(message, duration) {
						this.queue.push({
							message: message,
							duration: duration
						});
						if (this.queue.length == 1) {
							this.applyOne()
						}
					},
					applyOne: function() {
						var notif = this.queue[0];
						this.message.innerHTML = notif.message;
						DOM.fadeIn(this.block, 500);
						setTimeout(function() {
							DOM.fadeOut(DOM.notification.block, 500, function() {
								DOM.notification.queue.shift();
								if (DOM.notification.queue.length > 0) {
									DOM.notification.applyOne()
								}
							})
						}, notif.duration + 500)
					}
				}
			}();
			duration = duration || 3e3;
			this.notification.add(htmlMessage, duration)
		},
		applyStyle: function(element, style) {
			element = this.get(element);
			for (var i in style) {
				element.style[i] = style[i]
			}
		},
		populate: function(elements) {
			var res = {};
			for (var i in elements) {
				res[i] = DOM.get(elements[i]);
				if (!res[i]) console.log("Element #" + elements[i] + " not found")
			}
			return res
		}
	};
	var Util = {
		preload: function(images, callbackProgress, callbackEnd, callbackError) {
			var loadOne = function() {
				if (remaining.length == 0) {
					end(loaded)
				} else {
					var img = new Image;
					img.onerror = function() {
						console.log("Couldn't load " + src);
						error(src)
					};
					img.onload = function() {
						if (this.complete) {
							progress(this, 1 - remaining.length / nbImages);
							setTimeout(loadOne, document.location.search.indexOf("fakelag") >= 0 ? 1e3 : 1)
						}
					};
					var src = remaining.pop();
					img.src = src;
					loaded[src] = img
				}
			};
			var remaining = images.slice(0);
			var end = callbackEnd || new Function;
			var progress = callbackProgress || new Function;
			var error = callbackError || new Function;
			var nbImages = remaining.length;
			var loaded = {};
			setTimeout(loadOne, 1)
		},
		rand: function(min, max) {
			return Math.random() * (max - min) + min
		},
		randomPick: function() {
			var i = parseInt(Util.rand(0, arguments.length));
			return arguments[i]
		},
		limit: function(n, min, max) {
			if (n < min) return min;
			else if (n > max) return max;
			else return n
		},
		sign: function(n) {
			if (n > 0) return 1;
			else if (n == 0) return 0;
			else return -1
		},
		cookie: {
			set: function(name, value, ttl) {
				if (ttl == undefined) ttl = 1e3 * 3600 * 24 * 365;
				document.cookie = name + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
				var expires = new Date;
				expires.setTime(expires.getTime() + ttl);
				document.cookie = [name + "=" + value + "; ", "expires=" + expires.toGMTString() + "; ", "path=/"].join("")
			},
			get: function(name) {
				var cookie = document.cookie.split("; ");
				for (var i in cookie) {
					var spl = cookie[i].split("=");
					if (spl.length == 2 && spl[0] == name) {
						return spl[1]
					}
				}
				return undefined
			}
		},
		storage: window.localStorage ? {
			getItem: function(item) {
				try {
					return window.localStorage.getItem(item)
				} catch (e) {
					return null
				}
			},
			setItem: function(item, value) {
				try {
					window.localStorage.setItem(item, value)
				} catch (e) {
					console.log("Local storage issue: " + e)
				}
			}
		} : {
			getItem: function(item) {
				return Util.cookie.get(item)
			},
			setItem: function(item, value) {
				Util.cookie.set(item, value)
			}
		},
		merge: function(template, object) {
			if (!object) {
				return template
			}
			for (var i in template) {
				if (!(i in object)) {
					object[i] = template[i]
				} else {
					if (typeof template[i] == "object" && !(object[i] instanceof Array)) {
						object[i] = arguments.callee.call(this, template[i], object[i])
					}
				}
			}
			return object
		},
		copyObject: function(obj) {
			var res = {};
			for (var i in obj) {
				res[i] = obj[i]
			}
			return res
		},
		isTouchScreen: function() {
			var bool = "orientation" in window || "orientation" in window.screen || "mozOrientation" in window.screen || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || "ontouchstart" in document.documentElement;
			if (bool) {
				bool = bool && Detect.isMobile()
			}
			return bool || window.location.search.indexOf("touch") >= 0
		},
		distance: function(x1, y1, x2, y2) {
			return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
		},
		arrayUnique: function(a) {
			for (var i = 0; i < a.length; i++) {
				var j = i + 1;
				while (a[j]) {
					if (a[i] == a[j]) {
						a.splice(j, 1)
					} else {
						j++
					}
				}
			}
		},
		analyzeParameters: function() {
			var res = {};
			var tmp;
			var params = window.location.search.substr(1).split("&");
			for (var i = 0; i < params.length; i++) {
				tmp = params[i].split("=");
				res[tmp[0]] = tmp[1]
			}
			return res
		},
		interpolate: function(obj, props, duration, callback) {
			var before = {};
			for (var i in props) {
				before[i] = parseFloat(obj[i])
			}
			var tStart = Date.now();
			(function() {
				var now = Date.now();
				var prct = Math.min(1, (now - tStart) / duration);
				for (var i in props) {
					obj[i] = prct * (props[i] - before[i]) + before[i]
				}
				if (prct < 1) {
					requestAnimFrame(arguments.callee)
				} else {
					if (callback) {
						callback.call(obj)
					}
				}
			})()
		},
		addZeros: function(n, length) {
			var res = n.toString();
			while (res.length < length) res = "0" + res;
			return res
		},
		formatDate: function(format, date, options) {
			date = date || new Date;
			options = Util.merge({
				months: ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"]
			}, options);
			var res = "";
			var formatNext = false;
			for (var i = 0; i < format.length; i++) {
				if (format.charAt(i) == "%") {
					formatNext = true
				} else if (formatNext) {
					formatNext = false;
					switch (format.charAt(i)) {
						case "%":
							res += "%";
							break;
						case "M":
							res += options.months[date.getMonth()];
							break;
						case "d":
							res += date.getDate();
							break;
						case "Y":
							res += date.getFullYear();
							break;
						case "m":
							res += date.getMonth();
							break
					}
				} else {
					res += format.charAt(i)
				}
			}
			return res
		},
		keyOf: function(object, element) {
			for (var i in object) {
				if (object[i] == element) {
					return i
				}
			}
			return null
		}
	};
	var Ajax = {
		send: function(url, method, params, success, fail) {
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest
			} else if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP")
				} catch (e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP")
				}
			} else {
				console.log("AJAX not supported by your browser.");
				return false
			}
			success = success || new Function;
			fail = fail || new Function;
			method = method.toUpperCase();
			params = params || {};
			var paramsArray = [];
			for (var i in params) {
				paramsArray.push(i + "=" + params[i])
			}
			var paramsString = paramsArray.join("&");
			if (method == "GET") {
				url += "?" + paramsString
			}
			xhr.open(method, url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState != 4) return;
				if (xhr.status < 200 || xhr.status >= 300) {
					fail(xhr.status, xhr.responseText)
				} else {
					success(xhr.status, xhr.responseText)
				}
			};
			if (method == "POST") {
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(paramsString)
			} else {
				xhr.send(null)
			}
		}
	};
	var ArrayManager = {
		elements: [],
		arrays: [],
		remove: function(array, element) {
			this.arrays.push(array);
			this.elements.push(element)
		},
		flush: function() {
			var ind;
			for (var i in this.arrays) {
				ind = this.arrays[i].indexOf(this.elements[i]);
				if (ind >= 0) {
					this.arrays[i].splice(ind, 1)
				}
			}
			this.arrays = [];
			this.elements = []
		},
		init: function() {
			this.arrays = [];
			this.elements = []
		}
	};
	var Encoder = {
		buildString: function(tab) {
			var s = "",
				content;
			for (var i in tab) {
				content = tab[i].toString();
				content = content.replace(/=/g, " ");
				content = content.replace(/\|/g, " ");
				s += i + "=" + content + "|"
			}
			return s
		},
		encode: function(hash) {
			var str = Encoder.buildString(hash);
			var key = ~~Util.rand(1, 255);
			var encodedString = Encoder.encodeString(str, key);
			return encodeURIComponent(encodedString)
		},
		encodeString: function(s, cle) {
			var enc = "",
				c;
			for (var i = 0; i < s.length; i++) {
				c = s.charCodeAt(i);
				enc += String.fromCharCode((c + cle) % 256)
			}
			enc = String.fromCharCode(cle) + enc;
			return enc
		}
	};
	var Detect = {
		agent: navigator.userAgent.toLowerCase(),
		isMobile: function() {
			return this.isAndroid() || this.isFirefoxOS() || this.isWindowsMobile() || this.isIOS()
		},
		isAndroid: function() {
			return this.agent.indexOf("android") >= 0
		},
		isFirefoxOS: function() {
			return !this.isAndroid() && this.agent.indexOf("firefox") >= 0 && this.agent.indexOf("mobile") >= 0
		},
		isIOS: function() {
			return this.agent.indexOf("ios") >= 0 || this.agent.indexOf("ipod") >= 0 || this.agent.indexOf("ipad") >= 0 || this.agent.indexOf("iphone") >= 0
		},
		isWindowsMobile: function() {
			return this.agent.indexOf("windows") >= 0 && this.agent.indexOf("mobile") >= 0 || this.agent.indexOf("iemobile") >= 0
		},
		isTizen: function() {
			return this.agent.indexOf("tizen") >= 0
		}
	};
	var resourceManager = {
		processImages: function(images) {
			var canvas = DOM.create("canvas");
			var c = canvas.getContext("2d");
			resources.folder = resources.folder || "";
			R.image = R.image || {};
			if (resources.image) {
				for (var i in resources.image) {
					R.image[i] = images[resources.folder + resources.image[i]]
				}
			}
			R.pattern = R.pattern || {};
			if (resources.pattern) {
				for (var i in resources.pattern) {
					R.pattern[i] = c.createPattern(images[resources.folder + resources.pattern[i]], "repeat")
				}
			}
			R.sprite = R.sprite || {};
			if (resources.sprite) {
				for (var i in resources.sprite) {
					R.sprite[i] = this.createSprite(images[resources.folder + resources.sprite[i].sheet], resources.sprite[i]);
					if (resources.sprite[i].pattern) {
						R.pattern[i] = c.createPattern(R.sprite[i], "repeat")
					}
				}
			}
			R.animation = R.animation || {};
			if (resources.animation) {
				for (var i in resources.animation) {
					R.animation[i] = [];
					for (var j = 0; j < resources.animation[i].length; j++) {
						if (R.sprite[resources.animation[i][j]]) {
							R.animation[i].push(R.sprite[resources.animation[i][j]])
						} else {
							console.log("Error for animation " + i + ': sprite "' + resources.animation[i][j] + '" not found')
						}
					}
				}
			}
			R.raw = R.raw || {};
			if (resources.raw) {
				for (var i in resources.raw) {
					R.raw[i] = resources.raw[i] instanceof Function ? resources.raw[i]() : resources.raw[i]
				}
			}
			R.string = R.string || {};
			if (resources.string) {
				var lang = this.getLanguage(resources.string);
				if (!resources.string[lang]) {
					var pp = function(obj) {
						if (typeof obj == "string") {
							return
						} else {
							var o = {};
							for (var i in obj) {
								if (typeof obj[i] == "string") {
									o[i] = "{" + i + "}"
								} else {
									o[i] = pp(obj[i])
								}
							}
							return o
						}
					};
					resources.string[lang] = pp(resources.string.en)
				}
				for (var i in resources.string[lang]) {
					R.string[i] = resources.string[lang][i]
				}
				for (var i in R.string) {
					if (i.charAt(0) == "$") {
						try {
							DOM.get(i.substring(1)).innerHTML = R.string[i]
						} catch (e) {
							console.log("DOM element " + i + " does not exist")
						}
					}
				}
			}
			resources = null;
			resourceManager = null
		},
		createSprite: function(image, details) {
			var canvas = DOM.create("canvas");
			var c = canvas.getContext("2d");
			canvas.width = details.width;
			canvas.height = details.height;
			c.drawImage(image, details.x, details.y, details.width, details.height, 0, 0, details.width, details.height);
			return canvas
		},
		getNecessaryImages: function() {
			var res = [];
			for (var i in resources.image) {
				res.push(resources.folder + resources.image[i])
			}
			for (var i in resources.pattern) {
				res.push(resources.folder + resources.pattern[i])
			}
			for (var i in resources.sprite) {
				res.push(resources.folder + resources.sprite[i].sheet)
			}
			Util.arrayUnique(res);
			return res
		},
		getLanguage: function(languages) {
			var lang = null;
			var browser_language = null;
			var params = Util.analyzeParameters();
			if (params.lang) {
				return params.lang
			}
			if (navigator && navigator.userAgent && (browser_language = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
				browser_language = browser_language[1]
			}
			if (!browser_language && navigator) {
				if (navigator.language) {
					browser_language = navigator.language
				} else if (navigator.browserLanguage) {
					browser_language = navigator.browserLanguage
				} else if (navigator.systemLanguage) {
					browser_language = navigator.systemLanguage
				} else if (navigator.userLanguage) {
					browser_language = navigator.userLanguage
				}
				browser_language = browser_language.substr(0, 2)
			}
			for (var i in languages) {
				if (browser_language.indexOf(i) >= 0) {
					lang = i;
					break
				} else if (!lang) {
					lang = i
				}
			}
			return lang
		}
	};
	var cycleManager = {
		init: function(cycle, fpsMin) {
			this.pause = false;
			this.oncycle = cycle;
			var hidden, visibilityChange;
			if (typeof document.hidden !== "undefined") {
				hidden = "hidden";
				visibilityChange = "visibilitychange"
			} else if (typeof document.mozHidden !== "undefined") {
				hidden = "mozHidden";
				visibilityChange = "mozvisibilitychange"
			} else if (typeof document.msHidden !== "undefined") {
				hidden = "msHidden";
				visibilityChange = "msvisibilitychange"
			} else if (typeof document.webkitHidden !== "undefined") {
				hidden = "webkitHidden";
				visibilityChange = "webkitvisibilitychange"
			}
			this.focus = true;
			if (!hidden) {
				DOM.on(window, "focus", function() {
					cycleManager.focus = true
				});
				DOM.on(window, "blur", function() {
					cycleManager.focus = false
				})
			} else {
				DOM.on(document, visibilityChange, function() {
					cycleManager.focus = !document[hidden]
				})
			}
			this.lastCycle = Date.now();
			this.fpsMin = fpsMin || 10;
			this.framesUntilNextStat = 0;
			this.lastStat = 0;
			this.fakeLag = document.location.search.indexOf("fakelag") >= 0;
			this.fps = 0;
			(function() {
				cycleManager.cycle();
				if (cycleManager.fakeLag) {
					setTimeout(arguments.callee, 1e3 / this.fpsMin)
				} else {
					requestAnimFrame(arguments.callee)
				}
			})();
			this.init = null
		},
		cycle: function() {
			var now = Date.now();
			var elapsed = Math.min((now - this.lastCycle) / 1e3, 1 / this.fpsMin);
			this.lastCycle = now;
			if (!this.pause) {
				this.oncycle(elapsed);
				this.framesUntilNextStat--;
				if (this.framesUntilNextStat <= 0) {
					this.framesUntilNextStat = 60;
					this.fps = ~~(60 * 1e3 / (Date.now() - this.lastStat + elapsed));
					this.lastStat = Date.now()
				}
			}
		}
	};
	var cycleManager = {
		init: function(cycle, fpsMin) {
			this.pause = false;
			this.oncycle = cycle;
			var hidden, visibilityChange;
			if (typeof document.hidden !== "undefined") {
				hidden = "hidden";
				visibilityChange = "visibilitychange"
			} else if (typeof document.mozHidden !== "undefined") {
				hidden = "mozHidden";
				visibilityChange = "mozvisibilitychange"
			} else if (typeof document.msHidden !== "undefined") {
				hidden = "msHidden";
				visibilityChange = "msvisibilitychange"
			} else if (typeof document.webkitHidden !== "undefined") {
				hidden = "webkitHidden";
				visibilityChange = "webkitvisibilitychange"
			}
			this.focus = true;
			if (!hidden) {
				DOM.on(window, "focus", function() {
					cycleManager.focus = true
				});
				DOM.on(window, "blur", function() {
					cycleManager.focus = false
				})
			} else {
				DOM.on(document, visibilityChange, function() {
					cycleManager.focus = !document[hidden]
				})
			}
			this.lastCycle = Date.now();
			this.fpsMin = fpsMin || 10;
			this.framesUntilNextStat = 0;
			this.lastStat = 0;
			this.fakeLag = document.location.search.indexOf("fakelag") >= 0;
			this.fps = 0;
			this.requestId = null;
			this.init = null;
			this.resume();
			if (window.kik && kik.browser && kik.browser.on) {
				kik.browser.on("background", function() {
					cycleManager.stop()
				});
				kik.browser.on("foreground", function() {
					cycleManager.resume()
				})
			}
		},
		stop: function() {
			this.pause = true;
			cancelAnimFrame(this.requestId)
		},
		resume: function() {
			this.pause = false;
			cancelAnimFrame(this.requestId);
			(function() {
				cycleManager.cycle();
				cycleManager.requestId = requestAnimFrame(arguments.callee)
			})()
		},
		cycle: function() {
			var now = Date.now();
			var elapsed = Math.min((now - this.lastCycle) / 1e3, 1 / this.fpsMin);
			this.lastCycle = now;
			if (!this.pause) {
				try {
					this.oncycle(elapsed)
				} catch (e) {
					console.log("Error: " + e + " - ")
				}
				this.framesUntilNextStat--;
				if (this.framesUntilNextStat <= 0) {
					this.framesUntilNextStat = 60;
					this.fps = ~~(60 * 1e3 / (Date.now() - this.lastStat + elapsed));
					this.lastStat = Date.now()
				}
			}
		}
	};
	var resizer = {
		init: function(width, height, element, desktop) {
			this.enabled = Util.isTouchScreen() || desktop;
			this.targetWidth = width;
			this.targetHeight = height;
			this.element = element;
			this.dimensions = {
				width: width,
				height: height
			};
			this.scale = 1;
			if (Util.isTouchScreen() || desktop) {
				DOM.on(window, "resize orientationchange", function() {
					resizer.resize()
				});
				this.resize();
				this.toResize = null
			}
			this.init = null
		},
		resize: function() {
			if (!this.toResize && this.enabled) {
				this.toResize = setTimeout(function() {
					if (!resizer.enabled) return;
					window.scrollTo(0, 1);
					resizer.toResize = null;
					resizer.dimensions = DOM.fitScreen(resizer.element, resizer.targetWidth / resizer.targetHeight);
					resizer.scale = resizer.dimensions.height / resizer.targetHeight
				}, 1e3)
			}
		}
	};
	if (window.cordova) {
		document.addEventListener("deviceready", function() {
			cordova.exec(null, null, "SplashScreen", "hide", []);
			DOM.notify('More HTML5 games available at <a style="color:white" href="' + GameParams.moregamesurl + '">' + GameParams.moregamesurl + "</a>", 3e3)
		}, false)
	}
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			if (typeof this !== "function") {
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
			}
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP;
			return fBound
		}
	}
	window.originalOpen = window.open;
	Number.prototype.mod = function(n) {
		return (this % n + n) % n
	};

	function ResourceLoader(settings) {
		this.settings = settings;
		this.appCache = window.applicationCache;
		this.finished = false;
		this.message = null
	}
	ResourceLoader.prototype.load = function(end, canvas) {
		this.endCallback = end;
		this.canvasOutput = canvas;
		if (!this.appCache || this.appCache.status === this.appCache.UNCACHED) {
			this.loadResources()
		} else {
			this.loadCache()
		}
	};
	ResourceLoader.prototype.loadCache = function() {
		console.log("cache");
		this.message = "Updating...";
		this.appCache.addEventListener("checking", this.checkingCache.bind(this), false);
		this.appCache.addEventListener("noupdate", this.loadResources.bind(this), false);
		this.appCache.addEventListener("obsolete", this.loadResources.bind(this), false);
		this.appCache.addEventListener("error", this.loadResources.bind(this), false);
		this.appCache.addEventListener("cached", this.loadResources.bind(this), false);
		this.appCache.addEventListener("downloading", this.updatingCache.bind(this), false);
		this.appCache.addEventListener("progress", this.updatingCacheProgress.bind(this), false);
		this.appCache.addEventListener("updateready", this.updatingCacheReady.bind(this), false);
		if (this.appCache.status === this.appCache.IDLE) {
			try {
				this.appCache.update()
			} catch (e) {
				this.loadResources()
			}
		}
	};
	ResourceLoader.prototype.checkingCache = function() {
		if (!this.finished) {
			this.showProgress(this.canvasOutput, 0)
		}
	};
	ResourceLoader.prototype.updatingCache = function(e) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, 0)
		}
	};
	ResourceLoader.prototype.updatingCacheProgress = function(e) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, e.loaded / e.total || 0)
		}
	};
	ResourceLoader.prototype.updatingCacheReady = function(e) {
		if (!this.finished) {
			this.finished = true;
			try {
				this.appCache.swapCache()
			} catch (e) {}
			location.reload()
		}
	};
	ResourceLoader.prototype.loadResources = function() {
		this.message = "Loading assets. Please wait...";
		this.R = {};
		this.processLanguage(this.R);
		var images = this.getNecessaryImages();
		var loader = this;
		Util.preload(images, this.resourcesProgress.bind(this), this.resourcesLoaded.bind(this), this.resourcesError.bind(this))
	};
	ResourceLoader.prototype.resourcesError = function(imageSrc) {
		alert("Could not load " + imageSrc + ".\nUnable to launch.")
	};
	ResourceLoader.prototype.resourcesProgress = function(img, progress) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, progress)
		}
	};
	ResourceLoader.prototype.resourcesLoaded = function(loadedImages) {
		if (!this.finished) {
			this.finished = true;
			this.processImages(loadedImages, this.R);
			this.endCallback(this.R)
		}
	};
	ResourceLoader.prototype.showProgress = function(canvas, progress) {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "10px Arial";
		ctx.fillStyle = "gray";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.message, canvas.width / 2, canvas.height / 2 - 20);
		ctx.fillRect(0, canvas.height / 2 - 5, canvas.width, 10);
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height / 2 - 5, progress * canvas.width, 10);
		ctx.fillStyle = "black";
		ctx.textAlign = "right";
		ctx.fillText(~~(progress * 100) + "%", progress * canvas.width - 2, canvas.height / 2)
	};
	ResourceLoader.prototype.createSprite = function(image, details) {
		var canvas = document.createElement("canvas");
		var c = canvas.getContext("2d");
		canvas.width = details.width;
		canvas.height = details.height;
		c.drawImage(image, details.x, details.y, details.width, details.height, 0, 0, details.width, details.height);
		return canvas
	};
	ResourceLoader.prototype.getNecessaryImages = function() {
		var res = [];
		for (var i in this.settings.image) {
			res.push(this.settings.folder + this.settings.image[i])
		}
		for (var i in this.settings.pattern) {
			res.push(this.settings.folder + this.settings.pattern[i])
		}
		for (var i in this.settings.sprite) {
			res.push(this.settings.folder + this.settings.sprite[i].sheet)
		}
		Util.arrayUnique(res);
		return res
	};
	ResourceLoader.prototype.getLanguage = function(languages) {
		var lang = null;
		var browser_language = null;
		var params = Util.analyzeParameters();
		if (params.lang) {
			return params.lang
		}
		if (navigator && navigator.userAgent && (browser_language = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
			browser_language = browser_language[1]
		}
		if (!browser_language && navigator) {
			if (navigator.language) {
				browser_language = navigator.language
			} else if (navigator.browserLanguage) {
				browser_language = navigator.browserLanguage
			} else if (navigator.systemLanguage) {
				browser_language = navigator.systemLanguage
			} else if (navigator.userLanguage) {
				browser_language = navigator.userLanguage
			}
			browser_language = browser_language.substr(0, 2)
		}
		for (var i in languages) {
			if (browser_language.indexOf(i) >= 0) {
				lang = i;
				break
			} else if (!lang) {
				lang = i
			}
		}
		return lang
	};
	ResourceLoader.prototype.processImages = function(images, R) {
		var canvas = DOM.create("canvas");
		var c = canvas.getContext("2d");
		this.settings.folder = this.settings.folder || "";
		R.image = R.image || {};
		if (this.settings.image) {
			for (var i in this.settings.image) {
				R.image[i] = images[this.settings.folder + this.settings.image[i]]
			}
		}
		R.pattern = R.pattern || {};
		if (this.settings.pattern) {
			for (var i in this.settings.pattern) {
				R.pattern[i] = c.createPattern(images[this.settings.folder + this.settings.pattern[i]], "repeat");
				R.pattern[i].width = images[this.settings.folder + this.settings.pattern[i]].width;
				R.pattern[i].height = images[this.settings.folder + this.settings.pattern[i]].height
			}
		}
		R.sprite = R.sprite || {};
		if (this.settings.sprite) {
			for (var i in this.settings.sprite) {
				R.sprite[i] = this.createSprite(images[this.settings.folder + this.settings.sprite[i].sheet], this.settings.sprite[i]);
				if (this.settings.sprite[i].pattern) {
					R.pattern[i] = c.createPattern(R.sprite[i], "repeat");
					R.pattern[i].width = R.sprite[i].width;
					R.pattern[i].height = R.sprite[i].height
				}
			}
		}
		R.animation = R.animation || {};
		if (this.settings.animation) {
			for (var i in this.settings.animation) {
				R.animation[i] = [];
				for (var j = 0; j < this.settings.animation[i].length; j++) {
					if (R.sprite[this.settings.animation[i][j]]) {
						R.animation[i].push(R.sprite[this.settings.animation[i][j]])
					} else {
						console.log("Error for animation " + i + ': sprite "' + this.settings.animation[i][j] + '" not found')
					}
				}
			}
		}
		R.raw = R.raw || {};
		if (this.settings.raw) {
			for (var i in this.settings.raw) {
				R.raw[i] = this.settings.raw[i] instanceof Function ? this.settings.raw[i]() : this.settings.raw[i]
			}
		}
	};
	ResourceLoader.prototype.processLanguage = function(R) {
		R.string = R.string || {};
		if (this.settings.string) {
			this.language = this.getLanguage(this.settings.string);
			if (!this.settings.string[this.language]) {
				var pp = function(obj) {
					if (typeof obj == "string") {
						return
					} else {
						var o = {};
						for (var i in obj) {
							if (typeof obj[i] == "string") {
								o[i] = "{" + i + "}"
							} else {
								o[i] = pp(obj[i])
							}
						}
						return o
					}
				};
				this.settings.string[this.language] = pp(this.settings.string.en)
			}
			for (var i in this.settings.string[this.language]) {
				R.string[i] = this.settings.string[this.language][i]
			}
			for (var i in R.string) {
				if (i.charAt(0) == "$") {
					try {
						DOM.get(i.substring(1)).innerHTML = R.string[i]
					} catch (e) {
						console.log("DOM element " + i + " does not exist")
					}
				}
			}
		}
	};

	function Resizer(options) {
		this.delay = options.delay || 0;
		this.element = options.element || null;
		this.baseWidth = options.baseWidth;
		this.baseHeight = options.baseHeight;
		this.onResize = options.onResize;
		this.enabled = true;
		this.scale = 1;
		this.resizeTimeout = null
	}
	Resizer.prototype = {
		needsResize: function(maxWidth, maxHeight) {
			clearTimeout(this.resizeTimeout);
			if (this.enabled) {
				this.maxWidth = maxWidth;
				this.maxHeight = maxHeight;
				this.resizeTimeout = setTimeout(this.resize.bind(this), this.delay)
			}
		},
		resize: function() {
			this.resizeTimeout = null;
			var dimensions = this.getFittingDimensions(this.maxWidth, this.maxHeight);
			this.element.style.width = dimensions.width + "px";
			this.element.style.height = dimensions.height + "px";
			if (this.onResize) {
				this.onResize.call(this)
			}
		},
		scaleX: function() {
			return parseInt(this.element.style.width) / this.baseWidth || 1
		},
		scaleY: function() {
			return parseInt(this.element.style.height) / this.baseHeight || 1
		},
		getFittingDimensions: function(maxWidth, maxHeight) {
			var availableRatio = maxWidth / maxHeight;
			var baseRatio = this.baseWidth / this.baseHeight;
			var ratioDifference = Math.abs(availableRatio - baseRatio);
			var maxRatioDifference = P.cocoon ? Number.MAX_VALUE : .1;
			var width, height;
			if (ratioDifference <= maxRatioDifference) {
				width = maxWidth;
				height = maxHeight
			} else if (availableRatio <= baseRatio) {
				width = maxWidth;
				height = width / baseRatio
			} else {
				height = maxHeight;
				width = height * baseRatio
			}
			return {
				width: width,
				height: height
			}
		}
	};

	function extend(subClass, superClass) {
		if (!subClass.extends || !subClass.extends[superClass]) {
			for (var i in superClass.prototype) {
				if (!subClass.prototype[i]) {
					subClass.prototype[i] = superClass.prototype[i]
				}
			}
			subClass.extends = subClass.extends || {};
			subClass.extends[superClass] = true
		}
	}

	function extendPrototype(superClass, proto) {
		var subProto = {};
		for (var i in superClass.prototype) {
			subProto[i] = superClass.prototype[i]
		}
		for (var i in proto) {
			subProto[i] = proto[i]
		}
		return subProto
	}(function() {
		var cache = {};
		var ctx = null,
			usingWebAudio = true,
			noAudio = false;
		try {
			if (typeof AudioContext !== "undefined") {
				ctx = new AudioContext
			} else if (typeof webkitAudioContext !== "undefined") {
				ctx = new webkitAudioContext
			} else {
				usingWebAudio = false
			}
		} catch (e) {
			usingWebAudio = false
		}
		if (!usingWebAudio) {
			if (typeof Audio !== "undefined") {
				try {
					new Audio
				} catch (e) {
					noAudio = true
				}
			} else {
				noAudio = true
			}
		}
		if (usingWebAudio) {
			var masterGain = typeof ctx.createGain === "undefined" ? ctx.createGainNode() : ctx.createGain();
			masterGain.gain.value = 1;
			masterGain.connect(ctx.destination)
		}
		var HowlerGlobal = function() {
			this._volume = 1;
			this._muted = false;
			this.usingWebAudio = usingWebAudio;
			this.noAudio = noAudio;
			this._howls = []
		};
		HowlerGlobal.prototype = {
			volume: function(vol) {
				var self = this;
				vol = parseFloat(vol);
				if (vol >= 0 && vol <= 1) {
					self._volume = vol;
					if (usingWebAudio) {
						masterGain.gain.value = vol
					}
					for (var key in self._howls) {
						if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
							for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
								self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume
							}
						}
					}
					return self
				}
				return usingWebAudio ? masterGain.gain.value : self._volume
			},
			mute: function() {
				this._setMuted(true);
				return this
			},
			unmute: function() {
				this._setMuted(false);
				return this
			},
			_setMuted: function(muted) {
				var self = this;
				self._muted = muted;
				if (usingWebAudio) {
					masterGain.gain.value = muted ? 0 : self._volume
				}
				for (var key in self._howls) {
					if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
						for (var i = 0; i < self._howls[key]._audioNode.length; i++) {
							self._howls[key]._audioNode[i].muted = muted
						}
					}
				}
			}
		};
		var Howler = new HowlerGlobal;
		var audioTest = null;
		if (!noAudio) {
			audioTest = new Audio;
			var codecs = {
				mp3: !!audioTest.canPlayType("audio/mpeg;").replace(/^no$/, ""),
				opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
				ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
				wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
				m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
				mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
				weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
			}
		}
		var Howl = function(o) {
			var self = this;
			self._autoplay = o.autoplay || false;
			self._buffer = o.buffer || false;
			self._duration = o.duration || 0;
			self._format = o.format || null;
			self._loop = o.loop || false;
			self._loaded = false;
			self._sprite = o.sprite || {};
			self._src = o.src || "";
			self._pos3d = o.pos3d || [0, 0, -.5];
			self._volume = o.volume !== undefined ? o.volume : 1;
			self._urls = o.urls || [];
			self._rate = o.rate || 1;
			self._model = o.model || null;
			self._onload = [o.onload || function() {}];
			self._onloaderror = [o.onloaderror || function() {}];
			self._onend = [o.onend || function() {}];
			self._onpause = [o.onpause || function() {}];
			self._onplay = [o.onplay || function() {}];
			self._onendTimer = [];
			self._webAudio = usingWebAudio && !self._buffer;
			self._audioNode = [];
			if (self._webAudio) {
				self._setupAudioNode()
			}
			Howler._howls.push(self);
			self.load()
		};
		Howl.prototype = {
			load: function() {
				var self = this,
					url = null;
				if (noAudio) {
					self.on("loaderror");
					return
				}
				for (var i = 0; i < self._urls.length; i++) {
					var ext, urlItem;
					if (self._format) {
						ext = self._format
					} else {
						urlItem = self._urls[i].toLowerCase().split("?")[0];
						ext = urlItem.match(/.+\.([^?]+)(\?|$)/);
						ext = ext && ext.length >= 2 ? ext : urlItem.match(/data\:audio\/([^?]+);/);
						if (ext) {
							ext = ext[1]
						} else {
							self.on("loaderror");
							return
						}
					}
					if (codecs[ext]) {
						url = self._urls[i];
						break
					}
				}
				if (!url) {
					self.on("loaderror");
					return
				}
				self._src = url;
				if (self._webAudio) {
					loadBuffer(self, url)
				} else {
					var newNode = new Audio;
					newNode.addEventListener("error", function() {
						if (newNode.error && newNode.error.code === 4) {
							HowlerGlobal.noAudio = true
						}
						self.on("loaderror", {
							type: newNode.error ? newNode.error.code : 0
						})
					}, false);
					self._audioNode.push(newNode);
					newNode.src = url;
					newNode._pos = 0;
					newNode.preload = "auto";
					newNode.volume = Howler._muted ? 0 : self._volume * Howler.volume();
					cache[url] = self;
					var listener = function() {
						self._duration = Math.ceil(newNode.duration * 10) / 10;
						if (Object.getOwnPropertyNames(self._sprite).length === 0) {
							self._sprite = {
								_default: [0, self._duration * 1e3]
							}
						}
						if (!self._loaded) {
							self._loaded = true;
							self.on("load")
						}
						if (self._autoplay) {
							self.play()
						}
						newNode.removeEventListener("canplaythrough", listener, false)
					};
					newNode.addEventListener("canplaythrough", listener, false);
					newNode.load()
				}
				return self
			},
			urls: function(urls) {
				var self = this;
				if (urls) {
					self.stop();
					self._urls = typeof urls === "string" ? [urls] : urls;
					self._loaded = false;
					self.load();
					return self
				} else {
					return self._urls
				}
			},
			play: function(sprite, callback) {
				var self = this;
				if (typeof sprite === "function") {
					callback = sprite
				}
				if (!sprite || typeof sprite === "function") {
					sprite = "_default"
				}
				if (!self._loaded) {
					self.on("load", function() {
						self.play(sprite, callback)
					});
					return self
				}
				if (!self._sprite[sprite]) {
					if (typeof callback === "function") callback();
					return self
				}
				self._inactiveNode(function(node) {
					node._sprite = sprite;
					var pos = node._pos > 0 ? node._pos : self._sprite[sprite][0] / 1e3,
						duration = self._sprite[sprite][1] / 1e3 - node._pos;
					var loop = !!(self._loop || self._sprite[sprite][2]);
					var soundId = typeof callback === "string" ? callback : Math.round(Date.now() * Math.random()) + "",
						timerId;
					(function() {
						var data = {
							id: soundId,
							sprite: sprite,
							loop: loop
						};
						timerId = setTimeout(function() {
							if (!self._webAudio && loop) {
								self.stop(data.id).play(sprite, data.id)
							}
							if (self._webAudio && !loop) {
								self._nodeById(data.id).paused = true;
								self._nodeById(data.id)._pos = 0
							}
							if (!self._webAudio && !loop) {
								self.stop(data.id)
							}
							self.on("end", soundId)
						}, duration * 1e3);
						self._onendTimer.push({
							timer: timerId,
							id: data.id
						})
					})();
					if (self._webAudio) {
						var loopStart = self._sprite[sprite][0] / 1e3,
							loopEnd = self._sprite[sprite][1] / 1e3;
						node.id = soundId;
						node.paused = false;
						refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
						self._playStart = ctx.currentTime;
						node.gain.value = self._volume;
						if (typeof node.bufferSource.start === "undefined") {
							node.bufferSource.noteGrainOn(0, pos, duration)
						} else {
							node.bufferSource.start(0, pos, duration)
						}
					} else {
						if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
							node.readyState = 4;
							node.id = soundId;
							node.currentTime = pos;
							node.muted = Howler._muted || node.muted;
							node.volume = self._volume * Howler.volume();
							setTimeout(function() {
								node.play()
							}, 0)
						} else {
							self._clearEndTimer(soundId);
							(function() {
								var sound = self,
									playSprite = sprite,
									fn = callback,
									newNode = node;
								var listener = function() {
									sound.play(playSprite, fn);
									newNode.removeEventListener("canplaythrough", listener, false)
								};
								newNode.addEventListener("canplaythrough", listener, false)
							})();
							return self
						}
					}
					self.on("play");
					if (typeof callback === "function") callback(soundId);
					return self
				});
				return self
			},
			pause: function(id) {
				var self = this;
				if (!self._loaded) {
					self.on("play", function() {
						self.pause(id)
					});
					return self
				}
				self._clearEndTimer(id);
				var activeNode = id ? self._nodeById(id) : self._activeNode();
				if (activeNode) {
					activeNode._pos = self.pos(null, id);
					if (self._webAudio) {
						if (!activeNode.bufferSource || activeNode.paused) {
							return self
						}
						activeNode.paused = true;
						if (typeof activeNode.bufferSource.stop === "undefined") {
							activeNode.bufferSource.noteOff(0)
						} else {
							activeNode.bufferSource.stop(0)
						}
					} else {
						activeNode.pause()
					}
				}
				self.on("pause");
				return self
			},
			stop: function(id) {
				var self = this;
				if (!self._loaded) {
					self.on("play", function() {
						self.stop(id)
					});
					return self
				}
				self._clearEndTimer(id);
				var activeNode = id ? self._nodeById(id) : self._activeNode();
				if (activeNode) {
					activeNode._pos = 0;
					if (self._webAudio) {
						if (!activeNode.bufferSource || activeNode.paused) {
							return self
						}
						activeNode.paused = true;
						if (typeof activeNode.bufferSource.stop === "undefined") {
							activeNode.bufferSource.noteOff(0)
						} else {
							activeNode.bufferSource.stop(0)
						}
					} else if (!isNaN(activeNode.duration)) {
						activeNode.pause();
						activeNode.currentTime = 0
					}
				}
				return self
			},
			mute: function(id) {
				var self = this;
				if (!self._loaded) {
					self.on("play", function() {
						self.mute(id)
					});
					return self
				}
				var activeNode = id ? self._nodeById(id) : self._activeNode();
				if (activeNode) {
					if (self._webAudio) {
						activeNode.gain.value = 0
					} else {
						activeNode.muted = true
					}
				}
				return self
			},
			unmute: function(id) {
				var self = this;
				if (!self._loaded) {
					self.on("play", function() {
						self.unmute(id)
					});
					return self
				}
				var activeNode = id ? self._nodeById(id) : self._activeNode();
				if (activeNode) {
					if (self._webAudio) {
						activeNode.gain.value = self._volume
					} else {
						activeNode.muted = false
					}
				}
				return self
			},
			volume: function(vol, id) {
				var self = this;
				vol = parseFloat(vol);
				if (vol >= 0 && vol <= 1) {
					self._volume = vol;
					if (!self._loaded) {
						self.on("play", function() {
							self.volume(vol, id)
						});
						return self
					}
					var activeNode = id ? self._nodeById(id) : self._activeNode();
					if (activeNode) {
						if (self._webAudio) {
							activeNode.gain.value = vol
						} else {
							activeNode.volume = vol * Howler.volume()
						}
					}
					return self
				} else {
					return self._volume
				}
			},
			loop: function(loop) {
				var self = this;
				if (typeof loop === "boolean") {
					self._loop = loop;
					return self
				} else {
					return self._loop
				}
			},
			sprite: function(sprite) {
				var self = this;
				if (typeof sprite === "object") {
					self._sprite = sprite;
					return self
				} else {
					return self._sprite
				}
			},
			pos: function(pos, id) {
				var self = this;
				if (!self._loaded) {
					self.on("load", function() {
						self.pos(pos)
					});
					return typeof pos === "number" ? self : self._pos || 0
				}
				pos = parseFloat(pos);
				var activeNode = id ? self._nodeById(id) : self._activeNode();
				if (activeNode) {
					if (pos >= 0) {
						self.pause(id);
						activeNode._pos = pos;
						self.play(activeNode._sprite, id);
						return self
					} else {
						return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime
					}
				} else if (pos >= 0) {
					return self
				} else {
					for (var i = 0; i < self._audioNode.length; i++) {
						if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
							return self._webAudio ? self._audioNode[i]._pos : self._audioNode[i].currentTime
						}
					}
				}
			},
			pos3d: function(x, y, z, id) {
				var self = this;
				y = typeof y === "undefined" || !y ? 0 : y;
				z = typeof z === "undefined" || !z ? -.5 : z;
				if (!self._loaded) {
					self.on("play", function() {
						self.pos3d(x, y, z, id)
					});
					return self
				}
				if (x >= 0 || x < 0) {
					if (self._webAudio) {
						var activeNode = id ? self._nodeById(id) : self._activeNode();
						if (activeNode) {
							self._pos3d = [x, y, z];
							activeNode.panner.setPosition(x, y, z);
							activeNode.panner.panningModel = self._model || "HRTF"
						}
					}
				} else {
					return self._pos3d
				}
				return self
			},
			fade: function(from, to, len, callback, id) {
				var self = this,
					diff = Math.abs(from - to),
					dir = from > to ? "down" : "up",
					steps = diff / .01,
					stepTime = len / steps;
				if (!self._loaded) {
					self.on("load", function() {
						self.fade(from, to, len, callback, id)
					});
					return self
				}
				self.volume(from, id);
				for (var i = 1; i <= steps; i++) {
					(function() {
						var change = self._volume + (dir === "up" ? .01 : -.01) * i,
							vol = Math.round(1e3 * change) / 1e3,
							toVol = to;
						setTimeout(function() {
							self.volume(vol, id);
							if (vol === toVol) {
								if (callback) callback()
							}
						}, stepTime * i)
					})()
				}
			},
			fadeIn: function(to, len, callback) {
				return this.volume(0).play().fade(0, to, len, callback)
			},
			fadeOut: function(to, len, callback, id) {
				var self = this;
				return self.fade(self._volume, to, len, function() {
					if (callback) callback();
					self.pause(id);
					self.on("end")
				}, id)
			},
			_nodeById: function(id) {
				var self = this,
					node = self._audioNode[0];
				for (var i = 0; i < self._audioNode.length; i++) {
					if (self._audioNode[i].id === id) {
						node = self._audioNode[i];
						break
					}
				}
				return node
			},
			_activeNode: function() {
				var self = this,
					node = null;
				for (var i = 0; i < self._audioNode.length; i++) {
					if (!self._audioNode[i].paused) {
						node = self._audioNode[i];
						break
					}
				}
				self._drainPool();
				return node
			},
			_inactiveNode: function(callback) {
				var self = this,
					node = null;
				for (var i = 0; i < self._audioNode.length; i++) {
					if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
						callback(self._audioNode[i]);
						node = true;
						break
					}
				}
				self._drainPool();
				if (node) {
					return
				}
				var newNode;
				if (self._webAudio) {
					newNode = self._setupAudioNode();
					callback(newNode)
				} else {
					self.load();
					newNode = self._audioNode[self._audioNode.length - 1];
					newNode.addEventListener(navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata", function() {
						callback(newNode)
					})
				}
			},
			_drainPool: function() {
				var self = this,
					inactive = 0,
					i;
				for (i = 0; i < self._audioNode.length; i++) {
					if (self._audioNode[i].paused) {
						inactive++
					}
				}
				for (i = self._audioNode.length - 1; i >= 0; i--) {
					if (inactive <= 5) {
						break
					}
					if (self._audioNode[i].paused) {
						if (self._webAudio) {
							self._audioNode[i].disconnect(0)
						}
						inactive--;
						self._audioNode.splice(i, 1)
					}
				}
			},
			_clearEndTimer: function(soundId) {
				var self = this,
					index = 0;
				for (var i = 0; i < self._onendTimer.length; i++) {
					if (self._onendTimer[i].id === soundId) {
						index = i;
						break
					}
				}
				var timer = self._onendTimer[index];
				if (timer) {
					clearTimeout(timer.timer);
					self._onendTimer.splice(index, 1)
				}
			},
			_setupAudioNode: function() {
				var self = this,
					node = self._audioNode,
					index = self._audioNode.length;
				node[index] = typeof ctx.createGain === "undefined" ? ctx.createGainNode() : ctx.createGain();
				node[index].gain.value = self._volume;
				node[index].paused = true;
				node[index]._pos = 0;
				node[index].readyState = 4;
				node[index].connect(masterGain);
				node[index].panner = ctx.createPanner();
				node[index].panner.panningModel = self._model || "equalpower";
				node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
				node[index].panner.connect(node[index]);
				return node[index]
			},
			on: function(event, fn) {
				var self = this,
					events = self["_on" + event];
				if (typeof fn === "function") {
					events.push(fn)
				} else {
					for (var i = 0; i < events.length; i++) {
						if (fn) {
							events[i].call(self, fn)
						} else {
							events[i].call(self)
						}
					}
				}
				return self
			},
			off: function(event, fn) {
				var self = this,
					events = self["_on" + event],
					fnString = fn.toString();
				for (var i = 0; i < events.length; i++) {
					if (fnString === events[i].toString()) {
						events.splice(i, 1);
						break
					}
				}
				return self
			},
			unload: function() {
				var self = this;
				var nodes = self._audioNode;
				for (var i = 0; i < self._audioNode.length; i++) {
					if (!nodes[i].paused) {
						self.stop(nodes[i].id)
					}
					if (!self._webAudio) {
						nodes[i].src = ""
					} else {
						nodes[i].disconnect(0)
					}
				}
				for (i = 0; i < self._onendTimer.length; i++) {
					clearTimeout(self._onendTimer[i].timer)
				}
				var index = Howler._howls.indexOf(self);
				if (index !== null && index >= 0) {
					Howler._howls.splice(index, 1)
				}
				delete cache[self._src];
				self = null
			}
		};
		if (usingWebAudio) {
			var loadBuffer = function(obj, url) {
				if (url in cache) {
					obj._duration = cache[url].duration;
					loadSound(obj)
				} else {
					var xhr = new XMLHttpRequest;
					xhr.open("GET", url, true);
					xhr.responseType = "arraybuffer";
					xhr.onload = function() {
						ctx.decodeAudioData(xhr.response, function(buffer) {
							if (buffer) {
								cache[url] = buffer;
								loadSound(obj, buffer)
							}
						}, function(err) {
							obj.on("loaderror")
						})
					};
					xhr.onerror = function() {
						if (obj._webAudio) {
							obj._buffer = true;
							obj._webAudio = false;
							obj._audioNode = [];
							delete obj._gainNode;
							obj.load()
						}
					};
					try {
						xhr.send()
					} catch (e) {
						xhr.onerror()
					}
				}
			};
			var loadSound = function(obj, buffer) {
				obj._duration = buffer ? buffer.duration : obj._duration;
				if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
					obj._sprite = {
						_default: [0, obj._duration * 1e3]
					}
				}
				if (!obj._loaded) {
					obj._loaded = true;
					obj.on("load")
				}
				if (obj._autoplay) {
					obj.play()
				}
			};
			var refreshBuffer = function(obj, loop, id) {
				var node = obj._nodeById(id);
				node.bufferSource = ctx.createBufferSource();
				node.bufferSource.buffer = cache[obj._src];
				node.bufferSource.connect(node.panner);
				node.bufferSource.loop = loop[0];
				if (loop[0]) {
					node.bufferSource.loopStart = loop[1];
					node.bufferSource.loopEnd = loop[1] + loop[2]
				}
				node.bufferSource.playbackRate.value = obj._rate
			}
		}
		if (typeof define === "function" && define.amd) {
			define(function() {
				return {
					Howler: Howler,
					Howl: Howl
				}
			})
		}
		if (typeof exports !== "undefined") {
			exports.Howler = Howler;
			exports.Howl = Howl
		}
		if (typeof window !== "undefined") {
			window.Howler = Howler;
			window.Howl = Howl
		}
	})();
	// (function(g, m, a, p, i) {
	// 	g["GameMixAPIName"] = i;
	// 	g[i] = g[i] || function(f) {
	// 		g[i].q = g[i].q || [];
	// 		g[i].q.push(f)
	// 	};
	// 	g[i]({
	// 		apiDomain: p
	// 	});
	// 	var s = m.createElement(a),
	// 		d = m.getElementsByTagName(a)[0];
	// 	s.type = "text/javascript";
	// 	s.async = true;
	// 	s.src = p + "/v1/gm.js";
	// 	d.parentNode.insertBefore(s, d)
	// })(window, document, "script", "http://gmapi.gamemix.com", "gmapi");
	// gmapi("ninja");
	// window.googletag = window.googletag || {};
	// googletag.cmd = googletag.cmd || [];
	// (function() {
	// 	var gads = document.createElement("script");
	// 	gads.async = true;
	// 	gads.type = "text/javascript";
	// 	var useSSL = "https:" == document.location.protocol;
	// 	gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
	// 	var node = document.getElementsByTagName("script")[0];
	// 	node.parentNode.insertBefore(gads, node)
	// })();

	function DisplayableObject() {
		this.parent = null;
		this.x = this.y = 0;
		this.rotation = 0;
		this.scaleX = this.scaleY = 1;
		this.alpha = 1;
		this.visible = true
	}
	DisplayableObject.prototype = {
		applyTransforms: function(c) {
			if (this.x != 0 || this.y != 0) c.translate(this.x, this.y);
			if (this.scaleX != 1 || this.scaleY != 1) c.scale(this.scaleX, this.scaleY);
			if (this.rotation != 0) c.rotate(this.rotation);
			if (this.alpha != 1) c.globalAlpha *= this.alpha
		},
		doRender: function(c) {
			if (this.visible && this.alpha > .01 && this.scaleX != 0 && this.scaleY != 0) {
				c.save();
				this.applyTransforms(c);
				this.render(c);
				c.restore()
			}
		},
		render: function(c) {
			throw new Error("Rendering undefined")
		},
		remove: function() {
			if (this.parent) {
				this.parent.removeChild(this)
			}
		},
		leaves: function() {
			return 1
		}
	};

	function DisplayableContainer() {
		DisplayableObject.call(this);
		this.children = []
	}
	DisplayableContainer.prototype = extendPrototype(DisplayableObject, {
		render: function(c) {
			var i = -1;
			while (this.children[++i]) {
				this.children[i].doRender(c)
			}
		},
		addChild: function(child) {
			if (child.parent) {
				child.parent.removeChild(child)
			}
			this.children.push(child);
			child.parent = this;
			child.parentIndex = this.children.length - 1
		},
		removeChild: function(child) {
			if (!isNaN(child.parentIndex)) {
				this.children.splice(child.parentIndex, 1);
				for (var i = child.parentIndex; i < this.children.length; i++) {
					this.children[i].parentIndex--
				}
				child.parent = null;
				child.parentIndex = null
			}
		},
		clear: function() {
			for (var i in this.children) {
				this.children[i].parent = null;
				this.children[i].parentIndex = null
			}
			this.children = []
		},
		leaves: function() {
			var total = 0;
			for (var i in this.children) {
				total += this.children[i].leaves()
			}
			return total
		}
	});

	function DisplayableImage() {
		DisplayableObject.call(this);
		this.image = null;
		this.anchorX = this.anchorY = 0
	}
	DisplayableImage.prototype = extendPrototype(DisplayableObject, {
		render: function(c) {
			c.drawImage(this.image, this.anchorX, this.anchorY)
		}
	});

	function DisplayableRectangle() {
		DisplayableContainer.call(this);
		this.color = "#000";
		this.width = 0;
		this.height = 0
	}
	DisplayableRectangle.prototype = extendPrototype(DisplayableContainer, {
		render: function(c) {
			c.fillStyle = this.color;
			c.fillRect(0, 0, this.width, this.height);
			DisplayableContainer.prototype.render.call(this, c)
		}
	});

	function DisplayableTextField() {
		DisplayableObject.call(this);
		this.text = null;
		this.font = "12pt Arial";
		this.textAlign = "left";
		this.textBaseline = "top";
		this.color = "#000";
		this.shadowColor = null;
		this.shadowOffsetX = 0;
		this.shadowOffsetY = 0
	}
	DisplayableTextField.prototype = extendPrototype(DisplayableObject, {
		render: function(c) {
			if (this.text != null && this.text.toString().length > 0) {
				c.font = this.font;
				c.textAlign = this.textAlign;
				c.textBaseline = this.textBaseline;
				if (this.shadowColor) {
					c.fillStyle = this.shadowColor;
					c.fillText(this.text, this.shadowOffsetX, this.shadowOffsetY)
				}
				c.fillStyle = this.color;
				c.fillText(this.text, 0, 0)
			}
		}
	});

	function DisplayableShape(drawFunction) {
		DisplayableObject.call(this);
		this.drawFunction = drawFunction
	}
	DisplayableShape.prototype = extendPrototype(DisplayableObject, {
		render: function(c) {
			this.drawFunction(c)
		}
	});

	function ClippedContainer() {
		DisplayableContainer.call(this);
		this.width = this.height = 100;
		this.borderWidth = 0
	}
	ClippedContainer.prototype = extendPrototype(DisplayableContainer, {
		render: function(c) {
			c.beginPath();
			c.rect(0, 0, this.width, this.height);
			if (this.borderWidth > 0) {
				c.lineWidth = this.borderWidth;
				c.strokeStyle = this.borderColor;
				c.stroke()
			}
			c.clip();
			DisplayableContainer.prototype.render.call(this, c)
		}
	});

	function ResourceLoader(settings) {
		this.settings = settings;
		this.appCache = window.applicationCache;
		this.finished = false;
		this.message = null
	}
	ResourceLoader.prototype.load = function(end, canvas) {
		this.endCallback = end;
		this.canvasOutput = canvas;
		if (!this.appCache || this.appCache.status === this.appCache.UNCACHED) {
			this.loadResources()
		} else {
			this.loadCache()
		}
	};
	ResourceLoader.prototype.loadCache = function() {
		console.log("cache");
		this.message = "Updating...";
		this.appCache.addEventListener("checking", this.checkingCache.bind(this), false);
		this.appCache.addEventListener("noupdate", this.loadResources.bind(this), false);
		this.appCache.addEventListener("obsolete", this.loadResources.bind(this), false);
		this.appCache.addEventListener("error", this.loadResources.bind(this), false);
		this.appCache.addEventListener("cached", this.loadResources.bind(this), false);
		this.appCache.addEventListener("downloading", this.updatingCache.bind(this), false);
		this.appCache.addEventListener("progress", this.updatingCacheProgress.bind(this), false);
		this.appCache.addEventListener("updateready", this.updatingCacheReady.bind(this), false);
		if (this.appCache.status === this.appCache.IDLE) {
			try {
				this.appCache.update()
			} catch (e) {
				this.loadResources()
			}
		}
	};
	ResourceLoader.prototype.checkingCache = function() {
		if (!this.finished) {
			this.showProgress(this.canvasOutput, 0)
		}
	};
	ResourceLoader.prototype.updatingCache = function(e) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, 0)
		}
	};
	ResourceLoader.prototype.updatingCacheProgress = function(e) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, e.loaded / e.total || 0)
		}
	};
	ResourceLoader.prototype.updatingCacheReady = function(e) {
		if (!this.finished) {
			this.finished = true;
			try {
				this.appCache.swapCache()
			} catch (e) {}
			location.reload()
		}
	};
	ResourceLoader.prototype.loadResources = function() {
		this.message = "Loading assets. Please wait...";
		this.R = {};
		this.processLanguage(this.R);
		var images = this.getNecessaryImages();
		var loader = this;
		Util.preload(images, this.resourcesProgress.bind(this), this.resourcesLoaded.bind(this), this.resourcesError.bind(this))
	};
	ResourceLoader.prototype.resourcesError = function(imageSrc) {
		alert("Could not load " + imageSrc + ".\nUnable to launch.")
	};
	ResourceLoader.prototype.resourcesProgress = function(img, progress) {
		if (this.canvasOutput && !this.finished) {
			this.showProgress(this.canvasOutput, progress)
		}
	};
	ResourceLoader.prototype.resourcesLoaded = function(loadedImages) {
		if (!this.finished) {
			this.finished = true;
			this.processImages(loadedImages, this.R);
			this.endCallback(this.R)
		}
	};
	ResourceLoader.prototype.showProgress = function(canvas, progress) {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "10px Arial";
		ctx.fillStyle = "gray";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.message, canvas.width / 2, canvas.height / 2 - 20);
		ctx.fillRect(0, canvas.height / 2 - 5, canvas.width, 10);
		ctx.fillStyle = "white";
		ctx.fillRect(0, canvas.height / 2 - 5, progress * canvas.width, 10);
		ctx.fillStyle = "black";
		ctx.textAlign = "right";
		ctx.fillText(~~(progress * 100) + "%", progress * canvas.width - 2, canvas.height / 2)
	};
	ResourceLoader.prototype.createSprite = function(image, details) {
		var canvas = document.createElement("canvas");
		var c = canvas.getContext("2d");
		canvas.width = details.width;
		canvas.height = details.height;
		c.drawImage(image, details.x, details.y, details.width, details.height, 0, 0, details.width, details.height);
		return canvas
	};
	ResourceLoader.prototype.getNecessaryImages = function() {
		var res = [];
		for (var i in this.settings.image) {
			res.push(this.settings.folder + this.settings.image[i])
		}
		for (var i in this.settings.pattern) {
			res.push(this.settings.folder + this.settings.pattern[i])
		}
		for (var i in this.settings.sprite) {
			res.push(this.settings.folder + this.settings.sprite[i].sheet)
		}
		Util.arrayUnique(res);
		return res
	};
	ResourceLoader.prototype.getLanguage = function(languages) {
		var lang = null;
		var browser_language = null;
		var params = Util.analyzeParameters();
		if (params.lang) {
			return params.lang
		}
		if (navigator && navigator.userAgent && (browser_language = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
			browser_language = browser_language[1]
		}
		if (!browser_language && navigator) {
			if (navigator.language) {
				browser_language = navigator.language
			} else if (navigator.browserLanguage) {
				browser_language = navigator.browserLanguage
			} else if (navigator.systemLanguage) {
				browser_language = navigator.systemLanguage
			} else if (navigator.userLanguage) {
				browser_language = navigator.userLanguage
			}
			browser_language = browser_language.substr(0, 2)
		}
		for (var i in languages) {
			if (browser_language.indexOf(i) >= 0) {
				lang = i;
				break
			} else if (!lang) {
				lang = i
			}
		}
		return lang
	};
	ResourceLoader.prototype.processImages = function(images, R) {
		var canvas = DOM.create("canvas");
		var c = canvas.getContext("2d");
		this.settings.folder = this.settings.folder || "";
		R.image = R.image || {};
		if (this.settings.image) {
			for (var i in this.settings.image) {
				R.image[i] = images[this.settings.folder + this.settings.image[i]]
			}
		}
		R.pattern = R.pattern || {};
		if (this.settings.pattern) {
			for (var i in this.settings.pattern) {
				R.pattern[i] = c.createPattern(images[this.settings.folder + this.settings.pattern[i]], "repeat");
				R.pattern[i].width = images[this.settings.folder + this.settings.pattern[i]].width;
				R.pattern[i].height = images[this.settings.folder + this.settings.pattern[i]].height
			}
		}
		R.sprite = R.sprite || {};
		if (this.settings.sprite) {
			for (var i in this.settings.sprite) {
				R.sprite[i] = this.createSprite(images[this.settings.folder + this.settings.sprite[i].sheet], this.settings.sprite[i]);
				if (this.settings.sprite[i].pattern) {
					R.pattern[i] = c.createPattern(R.sprite[i], "repeat");
					R.pattern[i].width = R.sprite[i].width;
					R.pattern[i].height = R.sprite[i].height
				}
			}
		}
		R.animation = R.animation || {};
		if (this.settings.animation) {
			for (var i in this.settings.animation) {
				R.animation[i] = [];
				for (var j = 0; j < this.settings.animation[i].length; j++) {
					if (R.sprite[this.settings.animation[i][j]]) {
						R.animation[i].push(R.sprite[this.settings.animation[i][j]])
					} else {
						console.log("Error for animation " + i + ': sprite "' + this.settings.animation[i][j] + '" not found')
					}
				}
			}
		}
		R.raw = R.raw || {};
		if (this.settings.raw) {
			for (var i in this.settings.raw) {
				R.raw[i] = this.settings.raw[i] instanceof Function ? this.settings.raw[i]() : this.settings.raw[i]
			}
		}
	};
	ResourceLoader.prototype.processLanguage = function(R) {
		R.string = R.string || {};
		if (this.settings.string) {
			this.language = this.getLanguage(this.settings.string);
			if (!this.settings.string[this.language]) {
				var pp = function(obj) {
					if (typeof obj == "string") {
						return
					} else {
						var o = {};
						for (var i in obj) {
							if (typeof obj[i] == "string") {
								o[i] = "{" + i + "}"
							} else {
								o[i] = pp(obj[i])
							}
						}
						return o
					}
				};
				this.settings.string[this.language] = pp(this.settings.string.en)
			}
			for (var i in this.settings.string[this.language]) {
				R.string[i] = this.settings.string[this.language][i]
			}
			for (var i in R.string) {
				if (i.charAt(0) == "$") {
					try {
						DOM.get(i.substring(1)).innerHTML = R.string[i]
					} catch (e) {
						console.log("DOM element " + i + " does not exist")
					}
				}
			}
		}
	};

	function Tween(object, property, from, to, duration, delay, onFinish) {
		this.object = object;
		this.delayLeft = delay || 0;
		this.duration = duration;
		this.elapsed = 0;
		this.property = property;
		this.from = from;
		this.to = to;
		this.onFinish = onFinish;
		this.cancelled = false;
		object[property] = from
	}
	Tween.prototype = {
		cycle: function(e) {
			if (this.delayLeft > 0) {
				this.delayLeft -= e;
				this.object[this.property] = this.from
			}
			if (this.delayLeft <= 0) {
				this.elapsed += e;
				if (this.elapsed >= this.duration) {
					this.finish()
				} else {
					this.progress()
				}
			}
		},
		finish: function() {
			this.object[this.property] = this.to;
			if (this.onFinish) {
				this.onFinish.call(this)
			}
		},
		cancel: function() {
			this.cancelled = true
		},
		isFinished: function() {
			return this.elapsed >= this.duration || this.cancelled
		},
		progress: function() {
			var prct = this.duration > 0 ? this.elapsed / this.duration : 1;
			this.object[this.property] = prct * (this.to - this.from) + this.from
		}
	};
	var TweenPool = {
		tweens: [],
		cycle: function(e) {
			var i = 0;
			while (this.tweens[i]) {
				this.tweens[i].cycle(e);
				if (!this.tweens[i].isFinished()) {
					i++
				} else {
					this.tweens.splice(i, 1)
				}
			}
		},
		remove: function(tw) {
			var index = this.tweens.indexOf(tw);
			if (index >= 0) {
				this.tweens.splice(index, 1)
			}
		},
		add: function(tw) {
			this.tweens.push(tw)
		}
	};
	var P = {
		width: 960,
		height: 600,
		tutorialKey: "tutorial-ninja",
		highscoreKey: "ninja-high",
		offsetTop: -40,
		offsetBottom: -20,
		cocoon: !!window.isCocoon,
		adMobPublisherId: "TODO"
	};
	window.addToHomeConfig = {
		touchIcon: true,
		autostart: false
	};
	var AdsSettings = {
		ads: {
			tablet: {
				slot: "/20973361/blocks_iPad_300x600",
				width: 300,
				height: 600,
				interval: 1,
				check: function() {
					return navigator.userAgent.toLowerCase().indexOf("ipad") >= 0
				}
			},
			mobile: {
				slot: "/20973361/blocks_mobile_300x250",
				width: 300,
				height: 250,
				interval: 1,
				check: function() {
					return Util.isTouchScreen()
				}
			},
			web: {
				slot: "/20973361/blocks_desktop_300x600",
				width: 300,
				height: 600,
				interval: 1,
				check: function() {
					return true
				}
			}
		}
	};
	var resources = {
		folder: "img/",
		image: {
			spike_white: "spike-white.png",
			spike_black: "spike-black.png",
			shuriken_white: "shuriken-white.png",
			shuriken_black: "shuriken-black.png",
			ninja_white: "ninja-white.png",
			ninja_black: "ninja-black.png",
			logo: "logo.png",
			bubble_highscore: "bubble-highscore.png",
			end_bg: "end-bg.png",
			button_kik: "button-kik.png",
			button_retry: "button-retry.png",
			rotate: "rotate.png",
			arrow_key: "arrow-key.png"
		},
		sprite: {},
		string: {
			en: {
				menu: {
					play: "Play",
					leaderboard: "Leaderboard",
					best: "Best: %time% s"
				},
				tutorial: {
					taptojump: "Tap to jump",
					uptojump: "Press up to jump",
					downtojump: "Press down to jump",
					jumpobstacles: "Jump over obstacles",
					nice: "Nice!",
					goodluck: "Good luck!",
					tryagain: "Let's try again..."
				},
				gameplay: {
					time: "Time: %time% s",
					congratulations: ["Nice!", "Wow!", "Awesome!"],
					ouch: "Ouch!",
					faster: "Faster!",
					record: "New record!"
				},
				end: {
					menu: "Menu",
					score: "Your score: %time% s",
					best: "Best: %time% s",
					newrecord: "New highscore!"
				},
				orientation: {
					message: "Please rotate your screen",
					close: "Dismiss"
				}
			},
			fr: {
				menu: {
					play: "Jouer",
					leaderboard: "Meilleurs scores",
					best: "Meilleur: %time% s"
				},
				tutorial: {
					taptojump: "Tape pour sauter",
					uptojump: "Appuie sur haut pour sauter",
					downtojump: "Appuie sur bas pour sauter",
					jumpobstacles: "Saute au-dessus des obstacles",
					nice: "Pas mal !",
					goodluck: "Bonne chance !",
					tryagain: "On va réessayer..."
				},
				gameplay: {
					time: "Temps: %time% s",
					congratulations: ["Pas mal !", "Wow !", "Sympa !"],
					ouch: "Aie !",
					faster: "Plus vite !",
					record: "Nouveau record!"
				},
				end: {
					menu: "Menu",
					score: "Ton score : %time% s",
					best: "Meilleur temps : %time% s",
					newrecord: "Nouveau record !"
				},
				orientation: {
					message: "Tourne ton écran pour jouer",
					close: "Fermer"
				}
			}
		}
	};
	DOM.on(window, "load", function() {
		DOM.un(window, "load", arguments.callee);
		Tracker.beginStage("loading");
		can = DOM.get("gamecanvas");
		can.width = P.width;
		can.height = P.height;
		ctx = can.getContext("2d");
		if (!Util.isTouchScreen()) {
			var link = document.createElement("link");
			link.setAttribute("rel", "stylesheet");
			link.setAttribute("type", "text/css");
			link.setAttribute("href", "css/desktop.css");
			document.head.appendChild(link)
		}
		window.resizer = new Resizer({
			element: DOM.get("viewport"),
			delay: 50,
			baseWidth: P.width,
			baseHeight: P.height,
			onResize: function() {
				window.scrollTo(0, 1)
			}
		});
		var getDimensionsAndResize = function() {
			var w = window.innerWidth;
			var h = window.innerHeight;
			if (!Util.isTouchScreen()) {
				w *= .85;
				h *= .85
			}
			this.resizer.needsResize(w, h)
		};
		if (!P.cocoon) {
			DOM.on(window, "resize orientationchange", getDimensionsAndResize);
			getDimensionsAndResize()
		}
		getDimensionsAndResize();
		var loader = new ResourceLoader(resources);
		loader.load(function(res) {
			R = res;
			if (Util.isTouchScreen()) {
				window.scrollTo(0, 1)
			}
			try {
				new Game(resizer)
			} catch (e) {
				console.log(e);
				alert(e)
			}
		}, can)
	});

	function Game() {
		Game.instance = this;
		window.G = this;
		this.curScreen = null;
		this.screenStack = [];
		this.soundManager = new SoundManager({
			sounds: [{
				id: "jump3",
				urls: ["sound/jump3.mp3", "sound/jump3.ogg", "sound/jump3.wav"],
				volume: .5
			}, {
				id: "jump4",
				urls: ["sound/jump4.mp3", "sound/jump4.ogg", "sound/jump4.wav"],
				volume: .5
			}, {
				id: "lose",
				urls: ["sound/lose.mp3", "sound/lose.ogg", "sound/lose.wav"]
			}, {
				id: "music",
				urls: ["sound/ninjaflipsloop.mp3", "sound/ninjaflipsloop.ogg", "sound/ninjaflipsloop.wav"],
				loop: true
			}]
		});
		this.highscore = parseFloat(Util.storage.getItem(P.highscoreKey)) || 0;
		this.playedGames = 0;
		this.lastCycleDate = Date.now();
		// this.kikInit();
		// this.initAds();
		this.initCrossPromoBanner();
		this.initOrientation();
		this.menu();
		cycleManager.init(this.cycle.bind(this));
		DOM.on(document.body, "touchstart mousedown", this.handleDownEvent.bind(this));
		DOM.on(document.body, "touchmove mousemove", this.handleMoveEvent.bind(this));
		DOM.on(document.body, "touchend mouseup touchcancel", this.handleUpEvent.bind(this));
		DOM.on(document.body, "keydown", this.handleKeyDownEvent.bind(this));
		DOM.on(document.body, "keyup", this.handleKeyUpEvent.bind(this));
		// DOM.on("ad-close-button", "click touchend", this.closeWebAd.bind(this));
		// DOM.on("ad-overlay", "click touchend", this.closeWebAd.bind(this))
	}
	Game.prototype = {
		setScreen: function(screen, noTransition) {
			if (this.curScreen) {
				this.curScreen.destroy()
			}
			this.curScreen = screen;
			this.curScreen.create();
			this.stage = this.curScreen.view;
			this.screenStack = [this.curScreen];
			if (!noTransition) {
				this.stage.addChild(new ScreenTransition)
			}
			Tracker.event("screen-show", "screen-" + screen.id);
			Tracker.beginStage("screen-" + screen.id)
		},
		cycle: function(elapsed) {
			this.lastCycleDate = Date.now();
			var before = Date.now();
			this.curScreen.cycle(elapsed);
			TweenPool.cycle(elapsed);
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, P.width, P.height);
			var between = Date.now();
			this.stage.doRender(ctx);
			var after = Date.now();
			if (P.showFrameRate) {
				ctx.textAlign = "left";
				ctx.fillStyle = "#ffffff";
				ctx.fillText("FPS: " + cycleManager.fps, 10, 10);
				ctx.fillText("Total: " + (after - before), 10, 20);
				ctx.fillText("Cycle: " + (between - before), 10, 30);
				ctx.fillText("Render: " + (after - between), 10, 40);
				ctx.fillText("Theoretical: " + Math.round(1e3 / Math.max(1, after - before)), 10, 50);
				ctx.fillText("Size: " + this.stage.leaves(), 10, 60)
			}
		},
		getPositions: function(e) {
			if (!e.changedTouches) e = {
				changedTouches: e.touches || [e]
			};
			var canRect = can.getBoundingClientRect();
			var res = [];
			for (var i = 0; i < e.changedTouches.length; i++) {
				res.push({
					x: (e.changedTouches[i].clientX - canRect.left) / window.resizer.scaleX(),
					y: (e.changedTouches[i].clientY - canRect.top) / window.resizer.scaleY()
				})
			}
			return res
		},
		handleDownEvent: function(e) {
			if (Date.now() - this.lastCycleDate >= 1e3) {
				cycleManager.stop();
				cycleManager.resume()
			}
			var evtType = e.type.indexOf("touch") >= 0 ? "touch" : "mouse";
			this.inputType = this.inputType || evtType;
			if (evtType != this.inputType) return;
			this.down = true;
			var positions = this.getPositions(e);
			for (var i in positions) {
				this.lastEvent = positions[i];
				this.curScreen.touchStart(this.lastEvent.x, this.lastEvent.y);
				if (evtType == "touch") {}
			}
		},
		handleMoveEvent: function(e) {
			var positions = this.getPositions(e);
			for (var i in positions) {
				this.lastEvent = positions[i];
				if (this.down) {
					e.preventDefault();
					this.curScreen.touchMove(this.lastEvent.x, this.lastEvent.y)
				}
				if (this.curScreen.areaContains(this.lastEvent.x, this.lastEvent.y)) {
					can.style.cursor = "pointer"
				} else {
					can.style.cursor = "default"
				}
			}
			if (this.inputType == "touch") {
				e.preventDefault()
			}
		},
		handleUpEvent: function(e) {
			if (this.down) {
				this.curScreen.touchEnd(this.lastEvent.x, this.lastEvent.y);
				this.down = false;
				this.lastEvent = null
			}
			window.scrollTo(0, 1)
		},
		handleKeyDownEvent: function(e) {
			if (e.keyCode == 38 || e.keyCode == 40) {
				e.preventDefault()
			}
			this.curScreen.keyDown(e.keyCode)
		},
		handleKeyUpEvent: function(e) {
			this.curScreen.keyUp(e.keyCode)
		},
		newAttempt: function(retry) {
			if (window.crossPromo && crossPromo.hide) {
				crossPromo.hide()
			}
			this.setScreen(new GameplayScreen(this), !retry);
			addToHome.close()
		},
		retry: function() {
			this.newAttempt(true)
		},
		gameOver: function() {
			this.playedGames++;
			this.highscore = Math.max(this.highscore, this.curScreen.time);
			Util.storage.setItem(P.highscoreKey, this.highscore);
			this.lastTime = this.curScreen.time;
			this.setScreen(new EndScreen(this, this.lastTime));
			if ("standalone" in window.navigator && !window.navigator.standalone && this.playedGames == 3) {
				addToHome.show();
				Tracker.event("add2home", "add2home-show")
			}
			var tier = Math.floor(this.lastTime / 10) * 10;
			Tracker.event("gameover", "gameover-tier-" + tier + "s");
			// window.gmga("gamedone");
			if (this.playedGames > 1 && this.playedGames % this.adInterval == 0 || true) {
				this.showAd()
			}
			if (window.crossPromo && crossPromo.show) {
				crossPromo.show()
			}
			var score = this.lastTime;
			 // hello2gameAPI('1^'+Math.round(score * 10) / 10) ;
			 postScore(Math.round(score * 10) / 10)
			// alert(Math.round(score * 10) / 10)
			console.log("sending " + score);
			// gmapi(function(api) {
			// 	api.game.leaderboard.sendScore(score * 1e3)
			// })
		},
		menu: function() {
			this.setScreen(new MenuScreen(this))
		},
		hasPlayedTutorial: function() {
			return !!Util.storage.getItem(P.tutorialKey) && location.search.indexOf("tuto") == -1
		},
		disableTutorial: function() {
			Util.storage.setItem(P.tutorialKey, true)
		},
		kikInit: function() {
			if (window.kik) {
				var kik = window.kik;
				if (kik.push && kik.push.handler) {
					kik.push.handler(function(data) {
						Tracker.event("kik-push-notification", "open")
					})
				}
				if (kik.browser && kik.browser.setOrientationLock) {
					kik.browser.setOrientationLock("landscape")
				}
				if (kik.message) {
					Tracker.event("kik-message", "kik-message-open")
				}
			}
		},
		shareKik: function() {
			 // hello2gameAPI('2^') 
			 goLeaderboard()
			// alert(Math.round(this.highscore * 10) / 10)
			// var txt;
			// if (this.lastTime) {
			// 	txt = "I flipped for " + Math.round(this.lastTime * 10) / 10 + " s!"
			// } else {
			// 	txt = "My highscore is " + Math.round(this.highscore * 10) / 10 + " s!"
			// }
			// kik.send({
			// 	title: txt,
			// 	text: "Can you beat me?",
			// 	pic: "promo/icon-128x128.png",
			// 	data: {
			// 		score: this.lastTime || this.highscore
			// 	}
			// });
			// Tracker.event("kik-message", "kik-message-send")
		},
		initAds: function() {
			if (P.cocoon) {
				this.initNativeAds()
			} else {
				this.initWebAds()
			}
		},
		initNativeAds: function() {
			if (!this.nativeAdsInitialized) {
				this.nativeAdsInitialized = true;
				this.nativeAdsReady = false;
				console.log("Initializing cocoon native ads");
				var me = this;
				if (Detect.isIOS() || true) {
					CocoonJS.Ad.onFullScreenShown.addEventListener(function() {
						console.log("fullscreen shown");
						CocoonJS.Ad.refreshFullScreen()
					});
					CocoonJS.Ad.onFullScreenHidden.addEventListener(function() {
						console.log("fullscreen hidden")
					});
					CocoonJS.Ad.onFullScreenReady.addEventListener(function() {
						console.log("fullscreen ready");
						me.nativeAdsReady = true
					});
					setTimeout(function() {
						CocoonJS.Ad.preloadFullScreen()
					}, 3e3)
				} else {
					CocoonJS.Ad.onBannerShown.addEventListener(function() {
						console.log("onBannerShown")
					});
					CocoonJS.Ad.onBannerHidden.addEventListener(function() {
						console.log("onBannerHidden")
					});
					CocoonJS.Ad.onBannerReady.addEventListener(function(width, height) {
						console.log("onBannerReady " + width, height);
						me.nativeAdsReady = true
					});
					CocoonJS.Ad.preloadBanner()
				}
			}
		},
		showAd: function() {
			console.log("Trying to show an ad");
			if (this.googleAdsInitted) {
				this.showWebAd()
			} else if (P.cocoon) {
				this.showNativeAd()
			}
		},
		showNativeAd: function() {
			console.log("Showing a native ad");
			return CocoonJS.Ad.showFullScreen();
			if (this.nativeAdsReady) {
				console.log("Native ad seems ready");
				if (Detect.isIOS() || true) {
					console.log("Trying to trigger fullscreen");
					CocoonJS.Ad.showFullScreen()
				} else {
					var rect = CocoonJS.Ad.getRectangle();
					var dpr = window.devicePixelRatio;
					rect.x = window.innerWidth * dpr / 2 - rect.width / 2;
					rect.y = 0;
					CocoonJS.Ad.setRectangle(rect);
					CocoonJS.Ad.showBanner();
					CocoonJS.Ad.refreshBanner()
				}
			} else {
				console.log("Native ads are not ready yet")
			}
		},
		initWebAds: function() {
			var ad, iframe, container, me = this;
			if (this.googleAdsInitted) {
				return
			}
			this.adsShown = 0;
			this.adCreated = false;
			this.googleAdsInitted = true;
			for (var i in AdsSettings.ads) {
				if (AdsSettings.ads[i].check()) {
					ad = AdsSettings.ads[i];
					break
				}
			}
			if (ad) {
				this.adSettings = ad;
				this.adSlot = null;
				this.adInterval = ad.interval;
				googletag.cmd.push(function() {
					me.adSlot = googletag.defineSlot(ad.slot, [ad.width, ad.height], "ad").addService(googletag.pubads());
					googletag.pubads().enableSingleRequest();
					googletag.enableServices();
					me.adCreated = true;
					googletag.display("ad");
					Tracker.event("ad-web", "ad-web-initialize-success")
				});
				var container = DOM.get("ad-container");
				container.style.width = ad.width + "px";
				container.style.height = ad.height + "px"
			}
		},
		showWebAd: function() {
			if (!this.webAdOpen) {
				var me = this;
				this.webAdOpen = true;
				if (this.adsShown > 0) {
					googletag.cmd.push(function() {
						googletag.pubads().refresh([me.adSlot])
					})
				}
				this.adsShown++;
				DOM.show("ad-overlay");
				Tracker.event("ad-web", "ad-web-show-success")
			}
		},
		closeWebAd: function() {
			if (this.webAdOpen) {
				this.webAdOpen = false;
				DOM.hide("ad-overlay");
				Tracker.event("ad-web", "ad-web-close")
			}
		},
		initOrientation: function() {
			if ("orientation" in window && window.orientation == 0) {
				this.setScreen(new OrientationScreen(this))
			}
		},
		initCrossPromoBanner: function() {
			var banner = document.getElementById("banner-container");
			if (banner && typeof RequestAd_ != "undefined") {}
		},
		showCrossPromoBanner: function() {},
		hideCrossPromoBanner: function() {}
	};
	Game.formatTime = function(t) {
		var n = Math.round(t * 10) / 10;
		if (n % 1 == 0) {
			return n + ".0"
		} else {
			return n.toString()
		}
	};
	var Tracker = {
		suffix: function() {
			if ("standalone" in window.navigator && navigator.standalone) {
				return "-homescreen"
			} else if (window.cordova || P.cocoon) {
				return "-native"
			} else if (window.kik && kik.send) {
				return "-kik"
			} else if (P.amazon) {
				return "-amazon"
			} else {
				return "-web"
			}
		},
		event: function(eventCategory, eventLabel, eventValue) {
			if (window.cordova && window.gaPlugin) {
				gaPlugin.trackEvent(function() {
					console.log("Sent event data")
				}, function(e) {
					console.log("Error while sending event data: " + e)
				}, "gameevent", eventCategory + this.suffix(), eventLabel + this.suffix(), eventValue || 0)
			} else if (window.ga) {
				ga("send", "event", "gameevent", eventCategory + this.suffix(), eventLabel + this.suffix(), eventValue || 0)
			}
		},
		beginStage: function(stageLabel) {
			var page = "/stage-" + stageLabel + this.suffix();
			if (window.cordova && window.gaPlugin) {
				gaPlugin.trackPage(function() {
					console.log("Sent page view")
				}, function(e) {
					console.log("Error while sending page view: " + e)
				}, page)
			} else if (window.ga) {
				ga("send", "pageview", page)
			}
		}
	};

	function SoundManager(settings) {
		this.soundMap = {};
		this.loadSettings(settings)
	}
	SoundManager.prototype = {
		loadSettings: function(settings) {
			this.volume = isNaN(settings.volume) ? 1 : settings.volume;
			for (var i in settings.sounds) {
				this.soundMap[settings.sounds[i].id] = this.prepareSound(settings.sounds[i])
			}
		},
		prepareSound: function(settings) {
			return new Howl({
				urls: settings.urls,
				volume: (settings.volume || 1) * this.volume,
				loop: !!settings.loop,
				preload: true
			})
		},
		play: function(id) {
			if (this.soundMap[id]) {
				var soundObject = this.soundMap[id];
				this.soundMap[id].play(function(id) {
					soundObject.instanceId = id
				})
			}
		},
		stop: function(id) {
			if (this.soundMap[id]) {
				this.soundMap[id].stop(this.soundMap[id].instanceId)
			}
		},
		pause: function(id) {
			if (this.soundMap[id]) {
				this.soundMap[id].pause(this.soundMap[id].instanceId)
			}
		},
		fadeOut: function(id) {
			if (this.soundMap[id]) {
				this.soundMap[id].fadeOut(this.soundMap[id].instanceId)
			}
		}
	};

	function Screen(game, id) {
		this.game = game;
		this.areas = [];
		this.currentActionArea = null;
		this.view = null;
		this.id = id || "unnamed"
	}
	Screen.prototype = {
		cycle: function(elapsed) {},
		touchStart: function(x, y) {
			for (var i in this.areas) {
				if (this.areas[i].enabled && this.areas[i].contains(x, y)) {
					this.currentActionArea = this.areas[i];
					this.currentActionArea.actionStart(x, y);
					break
				}
			}
		},
		touchMove: function(x, y) {
			if (this.currentActionArea && !this.currentActionArea.contains(x, y)) {
				this.currentActionArea.actionCancel(x, y);
				this.currentActionArea = null
			}
		},
		touchEnd: function(x, y) {
			if (this.currentActionArea && this.currentActionArea.contains(x, y)) {
				this.currentActionArea.actionPerformed(x, y)
			}
			this.currentActionArea = null
		},
		keyDown: function(keyCode) {},
		keyUp: function(keyCode) {},
		create: function() {},
		destroy: function() {},
		addArea: function(area) {
			this.areas.push(area)
		},
		areaContains: function(x, y) {
			for (var i in this.areas) {
				if (this.areas[i].enabled && this.areas[i].contains(x, y)) {
					return true
				}
			}
			return false
		}
	};

	function ScreenTransition() {
		DisplayableContainer.call(this);
		this.old = new DisplayableImage;
		this.old.image = DOM.saveCanvas(can);
		this.oldContainer = new ClippedContainer;
		this.oldContainer.height = P.height;
		this.oldContainer.addChild(this.old);
		this.addChild(this.oldContainer);
		this.shadow = new DisplayableRectangle;
		this.shadow.width = P.width;
		this.shadow.height = P.height;
		this.shadow.color = "#000";
		this.addChild(this.shadow);
		var me = this;
		TweenPool.add(new Tween(this.oldContainer, "width", P.width, 0, .3));
		TweenPool.add(new Tween(this.shadow, "x", P.width, 0, .3));
		TweenPool.add(new Tween(this.shadow, "alpha", 1, 0, .2, .2, function() {
			me.remove()
		}))
	}
	ScreenTransition.prototype = extendPrototype(DisplayableContainer, {});

	function Button(settings, action) {
		DisplayableObject.call(this);
		this.pressed = false;
		this.action = action;
		this.width = settings.width || 404;
		this.height = settings.height || 125;
		this.bgColor = settings.bgColor || "#ffffff";
		this.borderColor = settings.lineColor || "#000";
		this.borderRadius = isNaN(settings.borderRadius) ? 10 : settings.borderRadius;
		this.textColor = settings.textColor || "#000";
		this.textFont = settings.textFont || "Arial";
		this.fontSize = settings.fontSize || 20;
		this.outlineColor = settings.outlineColor || "#000";
		this.outlineWidth = settings.outlineWidth || 0;
		this.id = settings.id || undefined;
		this.setContent(settings.content)
	}
	Button.prototype = extendPrototype(DisplayableObject, {
		setContent: function(arg0) {
			this.text = this.image = null;
			if (!arg0.src) {
				this.type = "button";
				this.text = arg0;
				this.id = this.text
			} else {
				this.type = "image";
				this.image = arg0;
				this.width = this.width || arg0.width;
				this.height = this.height || arg0.height
			}
		},
		render: function(c) {
			c.save();
			c.translate(.5, .5);
			c.globalAlpha *= this.pressed ? .5 : 1;
			c.beginPath();
			c.fillStyle = this.bgColor;
			c.strokeStyle = this.borderColor;
			c.lineWidth = 2;
			c.moveTo(0, this.borderRadius);
			c.arc(this.borderRadius, this.borderRadius, this.borderRadius, Math.PI, -Math.PI / 2, false);
			c.arc(this.width - this.borderRadius, this.borderRadius, this.borderRadius, -Math.PI / 2, 0, false);
			c.arc(this.width - this.borderRadius, this.height - this.borderRadius, this.borderRadius, 0, Math.PI / 2, false);
			c.arc(this.borderRadius, this.height - this.borderRadius, this.borderRadius, Math.PI / 2, Math.PI, false);
			c.closePath();
			c.fill();
			c.stroke();
			c.restore();
			c.font = this.fontSize + "pt " + this.textFont;
			c.textAlign = "center";
			c.textBaseline = "middle";
			if (this.text) {
				c.fillStyle = this.textColor;
				c.fillText(this.text, this.width / 2, this.height / 2)
			} else {
				c.globalAlpha *= this.pressed ? .5 : 1;
				c.drawImage(this.image, 0, 0, this.image.width, this.image.height, (this.width - this.image.width) / 2, (this.height - this.image.height) / 2, this.image.width, this.image.height)
			}
			if (this.outlineWidth > 0) {
				c.lineWidth = this.outlineWidth;
				c.strokeStyle = this.outlineColor;
				c.strokeText(this.text, this.width / 2, this.height / 2 + 3)
			}
		},
		getArea: function() {
			var me = this;
			return new Area(this.x, this.y, this.width, this.height, {
				actionStart: function() {
					me.pressed = true
				},
				actionPerformed: function() {
					me.pressed = false;
					me.action();
					Tracker.event("button-clicked", "button-" + me.id)
				},
				actionCancel: function() {
					me.pressed = false
				}
			})
		}
	});

	function OrientationScreen(game) {
		Screen.call(this, game)
	}
	OrientationScreen.prototype = extendPrototype(Screen, {
		create: function() {
			this.view = new DisplayableContainer;
			var bg = new DisplayableRectangle;
			bg.color = "#000";
			bg.width = P.width;
			bg.height = P.height;
			this.view.addChild(bg);
			var message = new DisplayableTextField;
			this.view.addChild(message);
			with(message) {
				color = "#ffffff";
				textAlign = "center";
				textBaseline = "middle";
				font = "20pt LastNinja";
				text = R.string.orientation.message;
				x = P.width / 2;
				y = 100
			}
			var icon = new DisplayableImage;
			icon.image = R.image.rotate;
			icon.x = (P.width - icon.image.width) / 2;
			icon.y = (P.height - icon.image.height) / 2;
			this.view.addChild(icon);
			var closeButton = new Button({
				id: "close-orientation",
				content: R.string.orientation.close,
				width: 250,
				height: 50,
				textFont: "LastNinja",
				fontSize: 30
			}, this.close.bind(this));
			closeButton.x = (P.width - closeButton.width) / 2;
			closeButton.y = P.height - 100;
			this.view.addChild(closeButton);
			this.addArea(closeButton.getArea());
			this.check()
		},
		close: function() {
			this.game.menu()
		},
		check: function() {
			if (Math.abs(window.orientation) == 90) {
				this.close()
			}
		},
		cycle: function(e) {
			this.check()
		}
	});

	function MenuScreen(game) {
		Screen.call(this, game, "menu")
	}
	MenuScreen.prototype = extendPrototype(Screen, {
		create: function() {
			this.view = new DisplayableContainer;
			this.topHalf = new GameplayHalf(this, 0, {
				background: R.image.bg_1,
				characterType: R.image.ninja_black,
				backgroundColor: "#ffffff",
				bandanaColor: "#000",
				cameraOffset: P.offsetTop,
				spikeImage: R.image.spike_black,
				shurikenImage: R.image.shuriken_black
			});
			this.topHalf.y = P.height / 2;
			this.view.addChild(this.topHalf);
			this.bottomHalf = new GameplayHalf(this, 0, {
				background: R.image.bg_2,
				characterType: R.image.ninja_white,
				backgroundColor: "#000",
				bandanaColor: "#ffffff",
				cameraOffset: P.offsetBottom,
				spikeImage: R.image.spike_white,
				shurikenImage: R.image.shuriken_white
			});
			this.bottomHalf.x = P.width;
			this.bottomHalf.y = P.height / 2;
			this.bottomHalf.scaleX = -1;
			this.bottomHalf.scaleY = -1;
			this.view.addChild(this.bottomHalf);
			this.title = new DisplayableImage;
			this.title.image = R.image.logo;
			this.title.x = (P.width - this.title.image.width) / 2;
			this.title.y = P.height / 4 - this.title.image.height / 2 - 70;
			this.view.addChild(this.title);
			this.bestBubble = new DisplayableImage;
			this.bestBubble.image = R.image.bubble_highscore;
			this.bestBubble.x = 450;
			this.bestBubble.y = 154;
			this.view.addChild(this.bestBubble);
			this.bestTf = new DisplayableTextField;
			this.view.addChild(this.bestTf);
			with(this.bestTf) {
				font = "16pt LastNinja";
				color = "#ffffff";
				x = this.bestBubble.x + this.bestBubble.image.width / 2;
				y = this.bestBubble.y + 40;
				text = R.string.menu.best.replace("%time%", Game.formatTime(this.game.highscore));
				textAlign = "center";
				textBaseline = "middle"
			}
			var me = this;
			var playButton = new Button({
				id: "play",
				content: R.string.menu.play,
				width: 370,
				height: 110,
				textFont: "LastNinja",
				fontSize: 40
			}, function() {
				me.game.newAttempt()
			});
			playButton.x = P.width - 50 - playButton.width;
			playButton.y = 350;
			this.view.addChild(playButton);
			var leaderboardButton = new Button({
				id: "leaderboard",
				content: R.string.menu.leaderboard,
				width: 370,
				height: 110,
				textFont: "LastNinja",
				bgColor: "black",
				textColor: "white",
				lineColor: "white"
			}, function() {
				me.game.newAttempt()
			});
			leaderboardButton.x = (P.width - playButton.width) / 2;
			leaderboardButton.y = playButton.y+120;
			this.view.addChild(leaderboardButton);
			leaderboardButton.visible = false;
			playButton.x = (P.width - playButton.width) / 2;
			this.addArea(playButton.getArea());
			this.game.showCrossPromoBanner()
		},
		destroy: function() {
			this.game.hideCrossPromoBanner()
		},
		cycle: function(e) {
			this.topHalf.cycle(e);
			this.bottomHalf.cycle(e)
		}
	});

	function EndScreen(game, time) {
		Screen.call(this, game, "end");
		this.time = time
	}
	EndScreen.prototype = extendPrototype(Screen, {
		create: function() {
			this.view = new DisplayableContainer;
			this.bg = new DisplayableRectangle;
			this.bg.width = P.width;
			this.bg.height = P.height;
			this.bg.color = "#000";
			this.view.addChild(this.bg);
			this.image = new DisplayableImage;
			this.image.image = R.image.end_bg;
			this.image.x = (P.width - this.image.image.width) / 2;
			this.image.y = (P.height - this.image.image.height) / 2;
			this.view.addChild(this.image);
			this.message = new DisplayableTextField;
			this.view.addChild(this.message);
			with(this.message) {
				x = P.width / 2;
				y = 100;
				color = "#ffffff";
				text = R.string.end.score.replace("%time%", Game.formatTime(this.time));
				font = "20pt LastNinja";
				textAlign = "center";
				textBaseline = "middle"
			}
			this.best = new DisplayableTextField;
			this.view.addChild(this.best);
			with(this.best) {
				x = P.width / 2;
				y = 140;
				color = "#ffffff";
				text = R.string.end.best.replace("%time%", Game.formatTime(this.game.highscore));
				font = "15pt LastNinja";
				textAlign = "center";
				textBaseline = "middle"
			}
			var me = this;
			var buttons = [new Button({
				id: "retry",
				content: R.image.button_retry,
				width: 150,
				height: 110,
				textFont: "LastNinja",
				fontSize: 40,
				borderRadius: 1
			}, function() {
				me.game.retry()
			}), new Button({
				id: "menu",
				content: R.string.end.menu,
				width: 150,
				height: 110,
				textFont: "LastNinja",
				fontSize: 20,
				borderRadius: 1
			}, function() {
				me.game.menu()
			})];

				buttons.push(new Button({
					id: "kik",
					content: R.image.button_kik,
					width: 150,
					height: 110,
					textFont: "LastNinja",
					fontSize: 40,
					borderRadius: 1
				}, function() {
					me.game.shareKik()
				}))

			var buttonWidth = 200;
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].x = (i + .5 - buttons.length / 2) * buttonWidth + P.width / 2 - buttons[i].width / 2;
				buttons[i].y = P.height - 150;
				this.view.addChild(buttons[i]);
				this.addArea(buttons[i].getArea())
			}
			if (this.time >= this.game.highscore) {
				this.highScoreEffect()
			}
		},
		highScoreEffect: function() {
			var t;
			for (var i = 0; i < 50; i++) {
				t = new DisplayableShape(function(c) {
					c.fillStyle = this.color;
					c.beginPath();
					c.moveTo(0, 0);
					c.lineTo(20, 0);
					c.lineTo(0, 20);
					c.fill()
				});
				t.rotation = Math.random() * Math.PI * 2;
				t.x = Math.random() * P.width;
				t.y = -Math.random() * 300 - 10;
				t.color = Util.randomPick("red", "blue", "yellow", "white", "green", "purple", "cyan");
				this.view.addChild(t);
				TweenPool.add(new Tween(t, "y", t.y, P.height + 10, 2 + Math.random() * 1, 1, function() {
					this.object.remove()
				}))
			}
			var tf = new DisplayableTextField;
			this.view.addChild(tf);
			with(tf) {
				font = "bold 40pt LastNinja";
				color = "white";
				x = P.width / 2;
				y = P.height / 2;
				text = R.string.end.newrecord;
				rotation = Math.PI / 7;
				shadowColor = "#000";
				shadowOffsetX = 6;
				shadowOffsetY = 6;
				textAlign = "center";
				textBaseline = "middle"
			}
			TweenPool.add(new Tween(tf, "scaleX", 0, 1, .5, 1, function() {
				TweenPool.add(new Tween(tf, "scaleX", 1, 0, .5, 2.5, function() {
					this.object.remove()
				}));
				TweenPool.add(new Tween(tf, "scaleY", 1, 0, .5, 2.5))
			}));
			TweenPool.add(new Tween(tf, "scaleY", 0, 1, .5, 1))
		}
	});

	function GameplayScreen(game, type) {
		Screen.call(this, game, "gameplay");
		this.type = type
	}
	GameplayScreen.prototype = extendPrototype(Screen, {
		create: function() {
			this.view = new DisplayableContainer;
			this.top = new GameplayHalf(this, 0, {
				background: R.image.bg_1,
				characterType: R.image.ninja_black,
				backgroundColor: "#ffffff",
				bandanaColor: "#000",
				cameraOffset: P.offsetTop,
				spikeImage: R.image.spike_black,
				shurikenImage: R.image.shuriken_black,
				jumpSound: "jump3"
			});
			this.top.y = P.height / 2;
			this.view.addChild(this.top);
			this.bottom = new GameplayHalf(this, 0, {
				background: R.image.bg_2,
				characterType: R.image.ninja_white,
				backgroundColor: "#000",
				bandanaColor: "#ffffff",
				cameraOffset: P.offsetBottom,
				spikeImage: R.image.spike_white,
				shurikenImage: R.image.shuriken_white,
				jumpSound: "jump4"
			});
			this.bottom.y = P.height / 2;
			this.bottom.scaleY = -1;
			this.view.addChild(this.bottom);
			if (this.type != "same") {
				this.bottom.x = P.width;
				this.bottom.scaleX = -1
			}
			this.topArea = new Area(-P.width / 2, -P.height / 2, P.width * 2, P.height, {
				actionStart: this.topTap.bind(this)
			});
			this.bottomArea = new Area(-P.width / 2, P.height / 2, P.width * 2, P.height, {
				actionStart: this.bottomTap.bind(this)
			});
			this.addArea(this.topArea);
			this.addArea(this.bottomArea);
			this.time = 0;
			this.timeTf = new DisplayableTextField;
			this.view.addChild(this.timeTf);
			with(this.timeTf) {
				x = P.width / 2;
				y = 20;
				textAlign = "center";
				textBaseline = "middle";
				color = "#000";
				font = "20pt LastNinja"
			}
			this.messageTf = new DisplayableTextField;
			this.view.addChild(this.messageTf);
			with(this.messageTf) {
				x = P.width / 2;
				y = P.height / 4;
				textAlign = "center";
				textBaseline = "middle";
				color = "#000";
				font = "40pt LastNinja"
			}
			this.nextObstacle = Util.rand(3, 5);
			this.isInTutorial = !this.game.hasPlayedTutorial();
			if (this.isInTutorial) {
				this.tutorialState = {
					bottomJump: false,
					topJump: false,
					topObstacle: null,
					bottomObstacle: null
				};
				this.topTutorialTf = new DisplayableTextField;
				this.view.addChild(this.topTutorialTf);
				with(this.topTutorialTf) {
					x = P.width / 2;
					y = P.height / 4;
					textAlign = "center";
					textBaseline = "middle";
					color = "#000";
					font = "25pt LastNinja"
				}
				this.bottomTutorialTf = new DisplayableTextField;
				this.view.addChild(this.bottomTutorialTf);
				with(this.bottomTutorialTf) {
					x = P.width / 2;
					y = P.height * 3 / 4;
					textAlign = "center";
					textBaseline = "middle";
					color = "#ffffff";
					font = "25pt LastNinja"
				}
				if (!Util.isTouchScreen()) {
					this.arrowUp = new DisplayableImage;
					this.arrowUp.image = R.image.arrow_key;
					this.arrowUp.anchorX = -this.arrowUp.image.width / 2;
					this.arrowUp.anchorY = -this.arrowUp.image.height / 2;
					this.arrowUp.x = P.width / 2;
					this.arrowUp.y = P.height / 4 - 70;
					this.view.addChild(this.arrowUp);
					this.arrowDown = new DisplayableImage;
					this.arrowDown.image = R.image.arrow_key;
					this.arrowDown.anchorX = -this.arrowDown.image.width / 2;
					this.arrowDown.anchorY = -this.arrowDown.image.height / 2;
					this.arrowDown.x = P.width / 2;
					this.arrowDown.y = P.height * 3 / 4 + 70;
					this.arrowDown.scaleY = -1;
					this.view.addChild(this.arrowDown)
				}
				this.checkTutorialProgress();
				Tracker.event("tutorial", "tutorial-start")
			}
			this.recordAnnounced = false;
			this.game.soundManager.play("music")
		},
		destroy: function() {
			this.game.soundManager.stop("music")
		},
		showMessage: function(t) {
			this.messageTime = 2;
			this.messageTf.text = t;
			TweenPool.add(new Tween(this.messageTf, "scaleX", 4, 1, .3));
			TweenPool.add(new Tween(this.messageTf, "scaleY", 4, 1, .3))
		},
		cycle: function(e) {
			this.top.cycle(e);
			this.bottom.cycle(e);
			this.messageTime -= e;
			this.messageTf.visible = this.messageTime > 0;
			if (!this.isInTutorial) {
				this.nextObstacle -= e;
				if (this.nextObstacle <= 0 && !this.ended) {
					var sides = [];
					if (Math.random() < 1 / 15) {
						sides = [this.top, this.bottom]
					} else {
						sides = [Util.randomPick(this.top, this.bottom)]
					}
					for (var i in sides) {
						sides[i].spawnObstacle()
					}
					var minTime = 1 - this.time / 60;
					var randomTime = 3 - this.time / 40;
					var minTime;
					if (this.time < 30) {}
					minTime = Math.max(2 - this.time / 20, .5);
					randomTime = Math.random() * .5;
					this.nextObstacle = Math.random() * randomTime + minTime
				}
				if (!this.ended) {
					this.time += e;
					this.timeTf.text = R.string.gameplay.time.replace("%time%", Game.formatTime(this.time));
					if (!this.recordAnnounced && this.time > this.game.highscore && this.game.highscore > 0) {
						this.recordAnnounced = true;
						this.showMessage(R.string.gameplay.record)
					}
				}
			} else {
				this.checkTutorialProgress()
			}
		},
		gameOver: function() {
			if (!this.ended) {
				this.ended = true;
				var me = this;
				if (this.isInTutorial) {
					this.bottomTutorialTf.remove();
					this.topTutorialTf.text = R.string.gameplay.tryagain;
					setTimeout(function() {
						me.game.retry()
					}, 1e3);
					Tracker.event("tutorial", "tutorial-fail")
				} else {
					this.showMessage(R.string.gameplay.ouch);
					setTimeout(function() {
						me.game.gameOver()
					}, 1e3)
				}
			}
		},
		topTap: function() {
			this.top.character.jump();
			if (this.isInTutorial) {
				this.tutorialState.topJump = true
			}
		},
		bottomTap: function() {
			this.bottom.character.jump();
			if (this.isInTutorial) {
				this.tutorialState.bottomJump = true
			}
		},
		keyDown: function(keyCode) {
			if (keyCode == 38) {
				this.topTap()
			} else if (keyCode == 40) {
				this.bottomTap()
			}
		},
		checkTutorialProgress: function() {
			if (!this.ended) {
				var tapTopText = Util.isTouchScreen() ? R.string.tutorial.taptojump : R.string.tutorial.uptojump;
				var tapBottomText = Util.isTouchScreen() ? R.string.tutorial.taptojump : R.string.tutorial.downtojump;
				this.topTutorialTf.text = this.tutorialState.topJump ? R.string.tutorial.jumpobstacles : tapTopText;
				this.bottomTutorialTf.text = this.tutorialState.bottomJump ? R.string.tutorial.jumpobstacles : tapBottomText;
				if (this.tutorialState.topJump && !this.tutorialState.topObstacle) {
					this.tutorialState.topObstacle = this.top.spawnObstacle(true);
					this.tutorialState.topObstacle.x += P.width;
					if (this.arrowUp) this.arrowUp.visible = false
				}
				if (this.tutorialState.bottomJump && !this.tutorialState.bottomObstacle) {
					this.tutorialState.bottomObstacle = this.bottom.spawnObstacle(true);
					this.tutorialState.bottomObstacle.x += P.width;
					if (this.arrowDown) this.arrowDown.visible = false
				}
				var dTop = this.tutorialState.topObstacle ? this.tutorialState.topObstacle.x - this.top.character.x : 0;
				var dBottom = this.tutorialState.bottomObstacle ? this.tutorialState.bottomObstacle.x - this.bottom.character.x : 0;
				if (dTop < -P.width / 2 && dBottom < -P.width / 2) {
					this.isInTutorial = false;
					this.topTutorialTf.text = R.string.tutorial.goodluck;
					this.game.disableTutorial();
					this.bottomTutorialTf.remove();
					Tracker.event("tutorial", "tutorial-success");
					var me = this;
					setTimeout(function() {
						me.topTutorialTf.remove()
					}, 2e3)
				} else {
					if (dTop < -200) {
						this.topTutorialTf.text = null
					} else if (dTop < -20) {
						this.topTutorialTf.text = R.string.tutorial.nice
					}
					if (dBottom < -200) {
						this.bottomTutorialTf.text = null
					} else if (dBottom < -20) {
						this.bottomTutorialTf.text = R.string.tutorial.nice
					}
				}
			}
		}
	});

	function GameplayHalf(screen, characterOffset, graphicSettings) {
		DisplayableContainer.call(this);
		this.screen = screen;
		this.graphicSettings = graphicSettings;
		this.bg = new DisplayableRectangle;
		this.bg.width = P.width;
		this.bg.height = P.height / 2;
		this.bg.color = graphicSettings.backgroundColor;
		this.bg.y = -this.bg.height;
		this.addChild(this.bg);
		this.loseBg = new DisplayableRectangle;
		this.loseBg.width = P.width;
		this.loseBg.height = P.height / 2;
		this.loseBg.color = "#ff0000";
		this.loseBg.y = -this.loseBg.height;
		this.loseBg.visible = false;
		this.addChild(this.loseBg);
		this.contentView = new DisplayableContainer;
		this.addChild(this.contentView);
		this.character = new Character(this, graphicSettings);
		this.contentView.addChild(this.character);
		this.nextObstacle = Util.rand(3, 5);
		this.obstacles = [];
		this.cameraOffset = graphicSettings.cameraOffset
	}
	GameplayHalf.prototype = extendPrototype(DisplayableContainer, {
		cycle: function(e) {
			this.character.cycle(e);
			var i = 0;
			while (this.obstacles[i]) {
				this.obstacles[i].cycle(e);
				i++
			}
			if (this.obstacles.length && this.obstacles[0].x < this.character.x - P.width / 2 - 50) {
				this.obstacles.shift()
			}
			if (!this.ended) {
				this.contentView.x = -this.character.x + P.width / 2 + this.cameraOffset
			} else {
				this.contentView.x -= this.character.speed * e
			}
		},
		spawnObstacle: function(floor) {
			var types = [SpikeObstacle, ShurikenObstacle];
			if (!floor) {
				types.push(HighShurikenObstacle)
			}
			var type = Util.randomPick.apply(null, types);
			var o = new type(this, this.graphicSettings);
			o.x = this.character.x + P.width / 2 + 50;
			this.obstacles.push(o);
			this.contentView.addChild(o);
			return o
		},
		collided: function() {
			if (!this.ended) {
				this.ended = true;
				this.loseBg.visible = true;
				TweenPool.add(new Tween(this.loseBg, "alpha", 0, 1, .15, 0, function() {
					TweenPool.add(new Tween(this.object, "alpha", 1, 0, .15))
				}));
				this.character.die();
				this.screen.gameOver();
				navigator.vibrate(100)
			}
		}
	});

	function Character(half, settings) {
		DisplayableContainer.call(this);
		this.half = half;
		this.speed = 300;
		this.nextAcceleration = 10;
		this.image = new DisplayableImage;
		this.image.image = settings.characterType;
		this.image.anchorX = -this.image.image.width / 2;
		this.image.anchorY = -this.image.image.height / 2;
		this.addChild(this.image);
		this.bandanaColor = settings.bandanaColor;
		this.jumpSound = settings.jumpSound;
		this.x = 0;
		this.y = 0;
		this.radius = 18;
		this.yMax = 100;
		this.jumpTime = .5;
		this.timeRunning = 0;
		this.time = 0;
		this.consecutiveNiceJumps = 0;
		this.gravity = 4 * 2 * this.yMax / (this.jumpTime * this.jumpTime);
		this.vJump = this.gravity * this.jumpTime / 2;
		this.land();
		this.bandanaPositions = [];
		for (var i = 0, x = 0; i < 50; i++, x -= 20) {
			this.bandanaPositions.unshift({
				x: x,
				y: this.y - 10 + Util.rand(-2, 2)
			})
		}
	}
	Character.prototype = extendPrototype(DisplayableContainer, {
		render: function(c) {
			c.strokeStyle = this.bandanaColor;
			c.lineWidth = 6;
			c.beginPath();
			c.moveTo(0, 0);
			var curDistance = 0,
				dX, dY, remainingDistance, neededPrct, prevX, prevY, segmentDistance, maxDistance = 70;
			if (!this.isDying) {
				for (var i = this.bandanaPositions.length - 1; i >= 0; i--) {
					if (prevX) {
						dX = this.bandanaPositions[i].x - prevX;
						dY = this.bandanaPositions[i].y - prevY;
						segmentDistance = Math.sqrt(dX * dX + dY * dY);
						curDistance += segmentDistance
					}
					remainingDistance = Util.limit(maxDistance - curDistance, 0, maxDistance);
					neededDistance = Math.min(segmentDistance, remainingDistance);
					if (isNaN(prevX)) {
						c.lineTo(-this.x + this.bandanaPositions[i].x, -this.y + this.bandanaPositions[i].y)
					} else {
						c.lineTo(-this.x + prevX + dX * neededDistance / segmentDistance, -this.y + prevY + dY * neededDistance / segmentDistance)
					}
					prevX = this.bandanaPositions[i].x;
					prevY = this.bandanaPositions[i].y;
					if (remainingDistance == 0) {
						break
					}
				}
			}
			c.stroke();
			DisplayableContainer.prototype.render.call(this, c)
		},
		jump: function() {
			if (!this.jumping && !this.isDying) {
				this.jumping = true;
				this.vY = -20;
				this.tJump = 0;
				this.jumpTween = new Tween(this.image, "rotation", 0, 2 * Math.PI, this.jumpTime);
				TweenPool.add(this.jumpTween);
				this.half.screen.game.soundManager.play(this.jumpSound);
				this.nextPrint = 0;
				if (this.timeRunning < .4) {
					this.consecutiveNiceJumps++
				} else {
					this.consecutiveNiceJumps = 0
				}
			}
		},
		shouldLand: function() {
			return this.y > -this.radius
		},
		land: function() {
			this.jumping = false;
			this.y = -this.radius;
			this.timeRunning = 0;
			if (this.time > 15 && this.consecutiveNiceJumps > 0 && this.consecutiveNiceJumps % 2 == 0) {
				this.half.screen.showMessage(Util.randomPick.apply(null, R.string.gameplay.congratulations))
			}
		},
		cycle: function(e) {
			if (!this.isDying) {
				this.time += e;
				this.timeRunning += e;
				if (this.jumping) {
					this.tJump += e;
					this.y = this.gravity * this.tJump * this.tJump / 2 + -this.vJump * this.tJump - this.radius;
					if (this.shouldLand() && this.tJump > this.jumpTime / 2) {
						this.land()
					} else {
						this.nextPrint -= e;
						if (this.nextPrint <= 0) {
							this.nextPrint = .08;
							this.addPrint()
						}
					}
				}
				if (!this.half.screen.isInTutorial) {
					this.nextAcceleration -= e;
					if (this.nextAcceleration <= 0) {
						this.accelerate()
					}
				}
				this.x += this.speed * e
			}
			var first = this.bandanaPositions.shift();
			if (!this.isDying) {
				first.x = this.x;
				first.y = this.y - 10 + Util.rand(-2, 2);
				this.bandanaPositions.push(first)
			}
		},
		die: function() {
			if (!this.isDying) {
				this.isDying = true;
				if (this.jumpTween) {
					this.jumpTween.cancel()
				}
				var me = this;
				TweenPool.add(new Tween(this, "x", this.x, this.x - 50, .3));
				TweenPool.add(new Tween(this, "y", this.y, this.y - 20, .15, 0, function() {
					TweenPool.add(new Tween(me, "y", me.y, -me.radius, .15))
				}));
				TweenPool.add(new Tween(this.image, "rotation", this.rotation, -Math.PI, .3));
				this.half.screen.game.soundManager.play("lose")
			}
		},
		accelerate: function() {
			if (this.half.screen.showMessage) {
				this.speed += 20;
				this.nextAcceleration = 10;
				this.half.screen.showMessage(R.string.gameplay.faster)
			}
		},
		addPrint: function() {
			var p = new DisplayableImage;
			p.x = this.x;
			p.y = this.y;
			p.rotation = this.image.rotation;
			p.image = this.image.image;
			p.anchorX = this.image.anchorX;
			p.anchorY = this.image.anchorY;
			this.parent.addChild(p);
			TweenPool.add(new Tween(p, "alpha", .2, 0, .5, 0, function() {
				this.object.remove()
			}))
		}
	});

	function Comet() {
		DisplayableContainer.call(this);
		var me = this;
		this.crashingPart = new DisplayableRectangle;
		this.crashingPart.color = "#000";
		this.crashingPart.width = 100;
		this.crashingPart.height = 100;
		this.addChild(this.crashingPart);
		TweenPool.add(new Tween(this.crashingPart, "x", 200, 0, 1, 0));
		TweenPool.add(new Tween(this.crashingPart, "y", -200, 0, 1, 0, function() {
			me.crashingPart.visible = false;
			me.crashedPart.visible = true
		}));
		this.explosion = new DisplayableShape(function(c) {
			c.fillStyle = "#ffffff";
			c.beginPath();
			c.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
			c.fill()
		});
		this.addChild(this.explosion);
		TweenPool.add(new Tween(this.explosion, "radius", 0, 100, .5, 1));
		TweenPool.add(new Tween(this.explosion, "alpha", 1, 0, .5, 1));
		this.crashedPart = new DisplayableRectangle;
		this.crashedPart.color = "#ff0000";
		this.crashedPart.visible = false;
		this.crashedPart.width = 100;
		this.crashedPart.height = 100;
		this.addChild(this.crashedPart)
	}
	Comet.prototype = extendPrototype(DisplayableContainer, {});

	function Obstacle(half) {
		DisplayableContainer.call(this);
		this.half = half;
		this.radiusX = 15;
		this.radiusY = 15
	}
	Obstacle.prototype = extendPrototype(DisplayableContainer, {
		render: function(c) {
			DisplayableContainer.prototype.render.call(this, c);
			c.fillStyle = "#ff0000"
		},
		cycle: function(e) {
			if (this.collides(this.half.character)) {
				this.half.collided()
			}
		},
		collides: function(character) {
			return Math.abs(this.x - character.x) <= this.radiusX && Math.abs(this.y - character.y) <= this.radiusY
		}
	});

	function ImageObstacle(half, img) {
		Obstacle.call(this, half);
		this.image = new DisplayableImage;
		this.image.image = img;
		this.image.anchorX = -this.image.image.width / 2;
		this.image.anchorY = -this.image.image.height + this.radiusY;
		this.addChild(this.image)
	}
	ImageObstacle.prototype = extendPrototype(Obstacle, {});

	function SpikeObstacle(half, settings) {
		ImageObstacle.call(this, half, settings.spikeImage);
		this.y = -this.radiusY
	}
	SpikeObstacle.prototype = extendPrototype(ImageObstacle, {});

	function ShurikenObstacle(half, settings) {
		ImageObstacle.call(this, half, settings.shurikenImage);
		this.image.y = -10;
		this.image.anchorX = -this.image.image.width / 2;
		this.image.anchorY = -this.image.image.height / 2;
		this.radiusY = 30;
		this.y = -this.radiusY
	}
	ShurikenObstacle.prototype = extendPrototype(ImageObstacle, {
		cycle: function(e) {
			this.image.rotation += e * Math.PI;
			ImageObstacle.prototype.cycle.call(this, e)
		}
	});

	function HighShurikenObstacle(half, settings) {
		ShurikenObstacle.call(this, half, settings);
		this.image.y = -10;
		this.image.anchorX = -this.image.image.width / 2;
		this.image.anchorY = -this.image.image.height / 2;
		this.radiusY = 30;
		this.y = -100
	}
	HighShurikenObstacle.prototype = extendPrototype(ShurikenObstacle, {});

	function Area(x, y, w, h, settings) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.enabled = true;
		settings = settings || {};
		this.onactionperformed = settings.actionPerformed;
		this.onactionstart = settings.actionStart;
		this.onactioncancel = settings.actionCancel
	}
	Area.prototype = {
		contains: function(x, y) {
			return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height
		},
		actionPerformed: function(x, y) {
			if (this.onactionperformed) {
				this.onactionperformed(x, y)
			}
		},
		actionStart: function(x, y) {
			if (this.onactionstart) {
				this.onactionstart(x, y)
			}
		},
		actionCancel: function(x, y) {
			if (this.onactioncancel) {
				this.onactioncancel(x, y)
			}
		}
	};
	var addToHome = function(w) {
		var nav = w.navigator,
			isIDevice = "platform" in nav && /iphone|ipod|ipad/gi.test(nav.platform),
			isIPad, isRetina, isSafari, isStandalone, OSVersion, startX = 0,
			startY = 0,
			lastVisit = 0,
			isExpired, isSessionActive, isReturningVisitor, balloon, overrideChecks, positionInterval, closeTimeout, options = {
				autostart: true,
				returningVisitor: false,
				animationIn: "drop",
				animationOut: "fade",
				startDelay: 2e3,
				lifespan: 15e3,
				bottomOffset: 14,
				expire: 0,
				message: "",
				touchIcon: false,
				arrow: true,
				hookOnLoad: true,
				closeButton: true,
				iterations: 100
			},
			intl = {
				ar: '<span dir="rtl">قم بتثبيت هذا التطبيق على <span dir="ltr">%device:</span>انقر<span dir="ltr">%icon</span> ،<strong>ثم اضفه الى الشاشة الرئيسية.</strong></span>',
				ca_es: "Per instal·lar aquesta aplicació al vostre %device premeu %icon i llavors <strong>Afegir a pantalla d'inici</strong>.",
				cs_cz: "Pro instalaci aplikace na Váš %device, stiskněte %icon a v nabídce <strong>Přidat na plochu</strong>.",
				da_dk: "Tilføj denne side til din %device: tryk på %icon og derefter <strong>Føj til hjemmeskærm</strong>.",
				de_de: "Installieren Sie diese App auf Ihrem %device: %icon antippen und dann <strong>Zum Home-Bildschirm</strong>.",
				el_gr: "Εγκαταστήσετε αυτήν την Εφαρμογή στήν συσκευή σας %device: %icon μετά πατάτε <strong>Προσθήκη σε Αφετηρία</strong>.",
				en_us: "Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.",
				es_es: "Para instalar esta app en su %device, pulse %icon y seleccione <strong>Añadir a pantalla de inicio</strong>.",
				fi_fi: "Asenna tämä web-sovellus laitteeseesi %device: paina %icon ja sen jälkeen valitse <strong>Lisää Koti-valikkoon</strong>.",
				fr_fr: "Ajoutez cette application sur votre %device en cliquant sur %icon, puis <strong>Ajouter à l'écran d'accueil</strong>.",
				he_il: '<span dir="rtl">התקן אפליקציה זו על ה-%device שלך: הקש %icon ואז <strong>הוסף למסך הבית</strong>.</span>',
				hr_hr: "Instaliraj ovu aplikaciju na svoj %device: klikni na %icon i odaberi <strong>Dodaj u početni zaslon</strong>.",
				hu_hu: "Telepítse ezt a web-alkalmazást az Ön %device-jára: nyomjon a %icon-ra majd a <strong>Főképernyőhöz adás</strong> gombra.",
				it_it: "Installa questa applicazione sul tuo %device: premi su %icon e poi <strong>Aggiungi a Home</strong>.",
				ja_jp: "このウェブアプリをあなたの%deviceにインストールするには%iconをタップして<strong>ホーム画面に追加</strong>を選んでください。",
				ko_kr: '%device에 웹앱을 설치하려면 %icon을 터치 후 "홈화면에 추가"를 선택하세요',
				nb_no: "Installer denne appen på din %device: trykk på %icon og deretter <strong>Legg til på Hjem-skjerm</strong>",
				nl_nl: "Installeer deze webapp op uw %device: tik %icon en dan <strong>Voeg toe aan beginscherm</strong>.",
				pl_pl: "Aby zainstalować tę aplikacje na %device: naciśnij %icon a następnie <strong>Dodaj jako ikonę</strong>.",
				pt_br: "Instale este aplicativo em seu %device: aperte %icon e selecione <strong>Adicionar à Tela Inicio</strong>.",
				pt_pt: "Para instalar esta aplicação no seu %device, prima o %icon e depois em <strong>Adicionar ao ecrã principal</strong>.",
				ru_ru: "Установите это веб-приложение на ваш %device: нажмите %icon, затем <strong>Добавить в «Домой»</strong>.",
				sv_se: "Lägg till denna webbapplikation på din %device: tryck på %icon och därefter <strong>Lägg till på hemskärmen</strong>.",
				th_th: "ติดตั้งเว็บแอพฯ นี้บน %device ของคุณ: แตะ %icon และ <strong>เพิ่มที่หน้าจอโฮม</strong>",
				tr_tr: "Bu uygulamayı %device'a eklemek için %icon simgesine sonrasında <strong>Ana Ekrana Ekle</strong> düğmesine basın.",
				uk_ua: "Встановіть цей веб сайт на Ваш %device: натисніть %icon, а потім <strong>На початковий екран</strong>.",
				zh_cn: "您可以将此应用安装到您的 %device 上。请按 %icon 然后选择<strong>添加至主屏幕</strong>。",
				zh_tw: "您可以將此應用程式安裝到您的 %device 上。請按 %icon 然後點選<strong>加入主畫面螢幕</strong>。"
			};

		function init() {
			if (!isIDevice) return;
			var now = Date.now(),
				i;
			if (w.addToHomeConfig) {
				for (i in w.addToHomeConfig) {
					options[i] = w.addToHomeConfig[i]
				}
			}
			if (!options.autostart) options.hookOnLoad = false;
			isIPad = /ipad/gi.test(nav.platform);
			isRetina = w.devicePixelRatio && w.devicePixelRatio > 1;
			isSafari = /Safari/i.test(nav.appVersion) && !/CriOS/i.test(nav.appVersion);
			isStandalone = nav.standalone;
			OSVersion = nav.appVersion.match(/OS (\d+_\d+)/i);
			OSVersion = OSVersion && OSVersion[1] ? +OSVersion[1].replace("_", ".") : 0;
			lastVisit = +w.localStorage.getItem("addToHome");
			isSessionActive = w.sessionStorage.getItem("addToHomeSession");
			isReturningVisitor = options.returningVisitor ? lastVisit && lastVisit + 28 * 24 * 60 * 60 * 1e3 > now : true;
			if (!lastVisit) lastVisit = now;
			isExpired = isReturningVisitor && lastVisit <= now;
			if (options.hookOnLoad) w.addEventListener("load", loaded, false);
			else if (!options.hookOnLoad && options.autostart) loaded()
		}

		function loaded() {
			w.removeEventListener("load", loaded, false);
			if (!isReturningVisitor) w.localStorage.setItem("addToHome", Date.now());
			else if (options.expire && isExpired) w.localStorage.setItem("addToHome", Date.now() + options.expire * 6e4);
			if (!overrideChecks && (!isSafari || !isExpired || isSessionActive || isStandalone || !isReturningVisitor)) return;
			var touchIcon = "",
				platform = nav.platform.split(" ")[0],
				language = nav.language.replace("-", "_");
			balloon = document.createElement("div");
			balloon.id = "addToHomeScreen";
			balloon.style.cssText += "left:-9999px;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);position:" + (OSVersion < 5 ? "absolute" : "fixed");
			if (options.message in intl) {
				language = options.message;
				options.message = ""
			}
			if (options.message === "") {
				options.message = language in intl ? intl[language] : intl["en_us"]
			}
			if (options.touchIcon) {
				touchIcon = isRetina ? document.querySelector('head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon]') : document.querySelector('head link[rel^=apple-touch-icon][sizes="57x57"],head link[rel^=apple-touch-icon]');
				if (touchIcon) {
					touchIcon = '<span style="background-image:url(' + touchIcon.href + ')" class="addToHomeTouchIcon"></span>'
				}
			}
			balloon.className = (OSVersion >= 7 ? "addToHomeIOS7 " : "") + (isIPad ? "addToHomeIpad" : "addToHomeIphone") + (touchIcon ? " addToHomeWide" : "");
			balloon.innerHTML = touchIcon + options.message.replace("%device", platform).replace("%icon", OSVersion >= 4.2 ? '<span class="addToHomeShare"></span>' : '<span class="addToHomePlus">+</span>') + (options.arrow ? '<span class="addToHomeArrow"' + (OSVersion >= 7 && isIPad && touchIcon ? ' style="margin-left:-32px"' : "") + "></span>" : "") + (options.closeButton ? '<span class="addToHomeClose">×</span>' : "");
			document.body.appendChild(balloon);
			if (options.closeButton) {
				balloon.addEventListener("click", clicked, false);
				balloon.querySelector(".addToHomeClose").addEventListener("touchstart", close, false)
			}
			if (!isIPad && OSVersion >= 6) window.addEventListener("orientationchange", orientationCheck, false);
			setTimeout(show, options.startDelay)
		}

		function show() {
			var duration, iPadXShift = 208;
			if (isIPad) {
				if (OSVersion < 5) {
					startY = w.scrollY;
					startX = w.scrollX
				} else if (OSVersion < 6) {
					iPadXShift = 160
				} else if (OSVersion >= 7) {
					iPadXShift = 143
				}
				balloon.style.top = startY + options.bottomOffset + "px";
				balloon.style.left = Math.max(startX + iPadXShift - Math.round(balloon.offsetWidth / 2), 9) + "px";
				switch (options.animationIn) {
					case "drop":
						duration = "0.6s";
						balloon.style.webkitTransform = "translate3d(0," + -(w.scrollY + options.bottomOffset + balloon.offsetHeight) + "px,0)";
						break;
					case "bubble":
						duration = "0.6s";
						balloon.style.opacity = "0";
						balloon.style.webkitTransform = "translate3d(0," + (startY + 50) + "px,0)";
						break;
					default:
						duration = "1s";
						balloon.style.opacity = "0"
				}
			} else {
				startY = w.innerHeight + w.scrollY;
				if (OSVersion < 5) {
					startX = Math.round((w.innerWidth - balloon.offsetWidth) / 2) + w.scrollX;
					balloon.style.left = startX + "px";
					balloon.style.top = startY - balloon.offsetHeight - options.bottomOffset + "px"
				} else {
					balloon.style.left = "50%";
					balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - (w.orientation % 180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0) + "px";
					balloon.style.bottom = options.bottomOffset + "px"
				}
				switch (options.animationIn) {
					case "drop":
						duration = "1s";
						balloon.style.webkitTransform = "translate3d(0," + -(startY + options.bottomOffset) + "px,0)";
						break;
					case "bubble":
						duration = "0.6s";
						balloon.style.webkitTransform = "translate3d(0," + (balloon.offsetHeight + options.bottomOffset + 50) + "px,0)";
						break;
					default:
						duration = "1s";
						balloon.style.opacity = "0"
				}
			}
			balloon.offsetHeight;
			balloon.style.webkitTransitionDuration = duration;
			balloon.style.opacity = "1";
			balloon.style.webkitTransform = "translate3d(0,0,0)";
			balloon.addEventListener("webkitTransitionEnd", transitionEnd, false);
			closeTimeout = setTimeout(close, options.lifespan)
		}

		function manualShow(override) {
			if (!isIDevice || balloon) return;
			overrideChecks = override;
			loaded()
		}

		function close() {
			clearInterval(positionInterval);
			clearTimeout(closeTimeout);
			closeTimeout = null;
			if (!balloon) return;
			var posY = 0,
				posX = 0,
				opacity = "1",
				duration = "0";
			if (options.closeButton) balloon.removeEventListener("click", clicked, false);
			if (!isIPad && OSVersion >= 6) window.removeEventListener("orientationchange", orientationCheck, false);
			if (OSVersion < 5) {
				posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY;
				posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX
			}
			balloon.style.webkitTransitionProperty = "-webkit-transform,opacity";
			switch (options.animationOut) {
				case "drop":
					if (isIPad) {
						duration = "0.4s";
						opacity = "0";
						posY += 50
					} else {
						duration = "0.6s";
						posY += balloon.offsetHeight + options.bottomOffset + 50
					}
					break;
				case "bubble":
					if (isIPad) {
						duration = "0.8s";
						posY -= balloon.offsetHeight + options.bottomOffset + 50
					} else {
						duration = "0.4s";
						opacity = "0";
						posY -= 50
					}
					break;
				default:
					duration = "0.8s";
					opacity = "0"
			}
			balloon.addEventListener("webkitTransitionEnd", transitionEnd, false);
			balloon.style.opacity = opacity;
			balloon.style.webkitTransitionDuration = duration;
			balloon.style.webkitTransform = "translate3d(" + posX + "px," + posY + "px,0)"
		}

		function clicked() {
			w.sessionStorage.setItem("addToHomeSession", "1");
			isSessionActive = true;
			close()
		}

		function transitionEnd() {
			balloon.removeEventListener("webkitTransitionEnd", transitionEnd, false);
			balloon.style.webkitTransitionProperty = "-webkit-transform";
			balloon.style.webkitTransitionDuration = "0.2s";
			if (!closeTimeout) {
				balloon.parentNode.removeChild(balloon);
				balloon = null;
				return
			}
			if (OSVersion < 5 && closeTimeout) positionInterval = setInterval(setPosition, options.iterations)
		}

		function setPosition() {
			var matrix = new WebKitCSSMatrix(w.getComputedStyle(balloon, null).webkitTransform),
				posY = isIPad ? w.scrollY - startY : w.scrollY + w.innerHeight - startY,
				posX = isIPad ? w.scrollX - startX : w.scrollX + Math.round((w.innerWidth - balloon.offsetWidth) / 2) - startX;
			if (posY == matrix.m42 && posX == matrix.m41) return;
			balloon.style.webkitTransform = "translate3d(" + posX + "px," + posY + "px,0)"
		}

		function reset() {
			w.localStorage.removeItem("addToHome");
			w.sessionStorage.removeItem("addToHomeSession")
		}

		function orientationCheck() {
			balloon.style.marginLeft = -Math.round(balloon.offsetWidth / 2) - (w.orientation % 180 && OSVersion >= 6 && OSVersion < 7 ? 40 : 0) + "px"
		}
		init();
		return {
			show: manualShow,
			close: close,
			reset: reset
		}
	}(window);
	// (function() {
	// 	if (!P.cocoon) {
	// 		(function(i, s, o, g, r, a, m) {
	// 			i["GoogleAnalyticsObject"] = r;
	// 			i[r] = i[r] || function() {
	// 				(i[r].q = i[r].q || []).push(arguments)
	// 			}, i[r].l = 1 * new Date;
	// 			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	// 			a.async = 1;
	// 			a.src = g;
	// 			m.parentNode.insertBefore(a, m)
	// 		})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga")
	// 	} else if (!window.cordova) {
	// 		var interfaceReady = false;
	// 		var queue = [];
	// 		var flushQueue = function() {
	// 			var cmd;
	// 			while (cmd = queue.shift()) {
	// 				forwardCmd(cmd)
	// 			}
	// 		};
	// 		var forwardCmd = function(cmd) {
	// 			CocoonJS.App.forwardAsync(cmd)
	// 		};
	// 		var addToQueue = function(cmd) {
	// 			queue.push(cmd);
	// 			if (interfaceReady) {
	// 				flushQueue()
	// 			}
	// 		};
	// 		window.gaInterfaceIsReady = function() {
	// 			CocoonJS.App.forwardAsync("CocoonJS.App.show(0, 0, " + window.innerWidth * window.devicePixelRatio + "," + window.innerHeight * window.devicePixelRatio + ");");
	// 			interfaceReady = true;
	// 			flushQueue()
	// 		};
	// 		console.log("Creating GAI interface");
	// 		CocoonJS.App.loadInTheWebView("http://more.gamemix.com/cocoonoverlay.html?currentGame=ninjaflips");
	// 		window.ga = function() {
	// 			var args = "";
	// 			for (var i = 0; i < arguments.length; i++) {
	// 				if (i > 0) {
	// 					args += ","
	// 				}
	// 				args += JSON.stringify(arguments[i])
	// 			}
	// 			var cmd = "window.ga(" + args + ")";
	// 			addToQueue(cmd)
	// 		}
	// 	}
	// 	ga("require", "displayfeatures");
	// 	ga("create", "UA-51187636-1");
	// 	(function(g, m, c, d, a) {
	// 		g["GameMixGA"] = a;
	// 		g[a] = g[a] || function(f) {
	// 			g[a].q = g[a].q || [];
	// 			g[a].q.push(f)
	// 		};
	// 		g[a]({
	// 			gmgaDomain: d
	// 		});
	// 		var s = m.createElement(c),
	// 			p = m.getElementsByTagName(c)[0];
	// 		s.type = "text/javascript";
	// 		s.async = true;
	// 		s.src = d + "/client/gmga.js";
	// 		p.parentNode.insertBefore(s, p)
	// 	})(window, document, "script", "http://gmga.gamemix.com", "gmga");
	// 	gmga("ninjaflips")
	// })()
})();