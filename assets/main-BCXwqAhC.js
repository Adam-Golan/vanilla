var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O;
(/* @__PURE__ */ __name(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  __name(getFetchOpts, "getFetchOpts");
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
  __name(processPreload, "processPreload");
}, "polyfill"))();
String.prototype.titleCase = function() {
  return this.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
};
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.addSpaces = function(type) {
  if (!this.length) return "";
  if (type !== "uppercase") return this.split(type).join(" ");
  let result = this[0];
  for (let i = 1; i < this.length; i++) {
    const char = this[i];
    result += char >= "A" && char <= "Z" ? ` ${char}` : char;
  }
  return result;
};
String.prototype.remove = function(substr) {
  const regex = new RegExp(substr, "g");
  return this.replace(regex, "");
};
String.prototype.snakeCase = function() {
  return this.replace(/\W+/g, "_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};
String.prototype.kebabCase = function() {
  return this.replace(/\W+/g, "-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};
String.prototype.isPalindrome = function() {
  const cleaned = this.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return cleaned === cleaned.reverse();
};
String.prototype.count = function(substr) {
  return (this.match(new RegExp(substr, "g")) || []).length;
};
String.prototype.truncate = function(length) {
  return this.length > length ? `${this.slice(0, length - 3)}...` : `${this}`;
};
String.prototype.superTrim = function() {
  return this.trim().replace(/\s+/g, " ");
};
String.prototype.sliceFrom = function(substr) {
  return this.slice(this.indexOf(substr) + substr.length);
};
String.prototype.sliceTo = function(substr) {
  return this.slice(0, this.lastIndexOf(substr));
};
String.prototype.injector = function(...substrs) {
  let str = this;
  for (let idx = 0; idx < substrs.length; idx++)
    str = this.replace(`\${${idx}}`, `${substrs[idx]}`);
  return str;
};
Number.prototype.isEven = function() {
  return +this % 2 === 0;
};
Number.prototype.isOdd = function() {
  return +this % 2 !== 0;
};
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(+this, min), max);
};
Number.prototype.toOrdinal = function() {
  const n = this.valueOf();
  const suffix = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${suffix[(v - 20) % 10] || suffix[v] || suffix[0]}`;
};
Number.prototype.isPrime = function() {
  const n = this.valueOf();
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
};
Number.prototype.factorial = function() {
  const n = this.valueOf();
  if (n < 0) return NaN;
  return n === 0 ? 1 : n * (n - 1).factorial();
};
Number.prototype.toRoman = function() {
  const n = this.valueOf();
  if (n <= 0 || n >= 4e3) return null;
  const map = [
    ["M", 1e3],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
  ];
  let result = "";
  let num = n;
  for (const [letter, value] of map) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result;
};
Number.prototype.toCurrency = function(locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(+this);
};
Number.prototype.roundToNearest = function(multiple) {
  return Math.round(+this / multiple) * multiple;
};
BigInt.prototype.factorial = function() {
  if (+this < 0n) throw new RangeError("Factorial is not defined for negative numbers");
  let result = 1n;
  for (let i = 2n; i <= +this; i++) result *= i;
  return result;
};
BigInt.prototype.isPrime = function() {
  if (this < 2n) return false;
  if (this === 2n || this === 3n) return true;
  if (this % 2n === 0n || this % 3n === 0n) return false;
  let i = 5n;
  const limit = BigInt(Math.floor(Number(this) ** 0.5));
  while (i <= limit) {
    if (this % i === 0n || this % (i + 2n) === 0n) return false;
    i += 6n;
  }
  return true;
};
BigInt.prototype.toDecimalString = function() {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
Object.defineProperty(Array.prototype, "last", {
  /**
   * Gets the last element of the array.
   *
   * @returns {*} The last element of the array.
   */
  get: /* @__PURE__ */ __name(function() {
    return this[this.length - 1];
  }, "get"),
  /**
   * Sets the last element of the array to the given value.
   *
   * @param value The new value for the last element.
   */
  set: /* @__PURE__ */ __name(function(value) {
    this[this.length - 1] = value;
  }, "set"),
  configurable: false,
  enumerable: false
});
Object.defineProperty(Array.prototype, "first", {
  /**
   * Returns the first element of the array.
   *
   * @returns The first element of the array.
   */
  get() {
    return this[0];
  },
  /**
   * Sets the first element of the array to the given value.
   *
   * @param value The new value for the first element.
   */
  set: /* @__PURE__ */ __name(function(value) {
    this[0] = value;
  }, "set"),
  configurable: false,
  enumerable: false
});
Array.prototype.avg = function() {
  return this.reduce((sum, val) => sum + val, 0) / this.length;
};
Array.prototype.chunk = function(size) {
  return Array.from(
    { length: Math.ceil(this.length / size) },
    (_, i) => this.slice(i * size, i * size + size)
  );
};
Array.prototype.unique = function() {
  return [...new Set(this)];
};
Array.prototype.remove = function(value) {
  const idx = this.indexOf(value);
  if (idx > -1) this.splice(idx, 1);
  return this;
};
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};
Array.prototype.groupBy = function(callBack) {
  return this.reduce((acc, val) => {
    const key = callBack(val);
    (acc[key] = acc[key] || []).push(val);
    return acc;
  }, {});
};
Array.prototype.countBy = function(callBack) {
  return this.reduce((acc, val) => {
    const key = callBack(val);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};
Array.prototype.diff = function(array) {
  return this.filter((x) => !array.includes(x));
};
Array.prototype.intersect = function(array) {
  return this.filter((x) => array.includes(x));
};
Array.prototype.rotate = function(steps) {
  const len = this.length;
  const normalizedSteps = (steps % len + len) % len;
  return this.slice(normalizedSteps).concat(this.slice(0, normalizedSteps));
};
Object.prototype.cloneDeep = function() {
  if (typeof structuredClone === "function") return structuredClone(this);
  const clone = /* @__PURE__ */ __name((obj) => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map((item) => clone(item));
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Map) return new Map(Array.from(obj.entries()).map(([key, value]) => [clone(key), clone(value)]));
    if (obj instanceof Set) return new Set(Array.from(obj).map((item) => clone(item)));
    const clonedObj = Object.create(Object.getPrototypeOf(obj));
    for (const key of Object.keys(obj)) clonedObj[key] = clone(obj[key]);
    return clonedObj;
  }, "clone");
  return clone(this);
};
Object.prototype.isEmpty = function() {
  return !Object.keys(this).length;
};
Object.prototype.mergeDeep = function(source) {
  const merge = /* @__PURE__ */ __name((target, source2) => {
    if (source2 == null || typeof source2 !== "object") return target;
    Object.keys(source2).forEach((key) => {
      source2[key] && typeof source2[key] === "object" && !Array.isArray(source2[key]) ? target[key] = merge(target[key] || {}, source2[key]) : target[key] = source2[key];
    });
    return target;
  }, "merge");
  if (typeof structuredClone === "function") {
    const clone = structuredClone(this);
    return Object.assign(clone, merge(clone, source));
  }
  return merge(this, source);
};
Object.prototype.getPath = function(path) {
  const keys = path.split(".");
  let current = this;
  for (const key of keys) {
    if (current == null || !(key in current)) return void 0;
    current = current[key];
  }
  return current;
};
Object.prototype.omit = function(...keys) {
  const result = { ...this };
  keys.forEach((key) => delete result[key]);
  return result;
};
Object.prototype.pick = function(...keys) {
  return keys.reduce((acc, key) => {
    if (key in this) acc[key] = this[key];
    return acc;
  }, {});
};
Function.prototype.debounce = function(delay) {
  let timeoutId;
  const func = this;
  const returnFn = /* @__PURE__ */ __name((...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(returnFn, args), delay);
  }, "returnFn");
  return returnFn;
};
Function.prototype.throttle = function(delay) {
  let lastCall = 0;
  const func = this;
  const returnFn = /* @__PURE__ */ __name((...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(returnFn, args);
    }
  }, "returnFn");
  return returnFn;
};
Function.prototype.once = function() {
  let called = false;
  const func = this;
  const returnFn = /* @__PURE__ */ __name((...args) => {
    if (!called) {
      called = true;
      return func.apply(returnFn, args);
    }
  }, "returnFn");
  return returnFn;
};
Promise.prototype.timeout = function(ms, timeoutError = "Promise timed out") {
  return Promise.race([
    this,
    new Promise((_, rej) => setTimeout(() => rej(new Error(timeoutError)), ms))
  ]);
};
Promise.prototype.finallyCatch = function(callback) {
  return this.catch((error) => {
    callback(error);
    throw error;
  });
};
Promise.prototype.to = async function() {
  try {
    return [null, await this];
  } catch (error) {
    return [error, void 0];
  }
};
Promise.prototype.retry = function(retries, delay) {
  return new Promise((res, rej) => {
    const attempt = /* @__PURE__ */ __name((retriesLeft) => {
      this.then(res).catch((error) => {
        retriesLeft <= 0 ? rej(error) : setTimeout(() => attempt(retriesLeft - 1), delay);
      });
    }, "attempt");
    attempt(retries);
  });
};
Promise.prototype.series = function(promises) {
  const results = [];
  for (const promise of promises) promise().then((result) => results.push(result));
  return Promise.resolve(results);
};
JSON.safeParse = function(jsonString, defaultValue) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
};
JSON.deepCopy = function(toCopy) {
  return JSON.parse(JSON.stringify(toCopy));
};
JSON.pretty = function(value, indent = 2) {
  return JSON.stringify(value, null, indent);
};
Date.prototype.getTimeDiff = function(date) {
  const timeDiff = Math.floor((this.getTime() - date.getTime()) / 1e3);
  const hours = Math.floor(timeDiff / 3600);
  const minutes = Math.floor(timeDiff % 3600 / 60);
  const seconds = timeDiff % 60;
  const duration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return { timeDiff, seconds, minutes, hours, duration };
};
Date.prototype.isLeapYear = function() {
  const year = this.getFullYear();
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};
Date.prototype.add = function(type, value) {
  const result = new Date(this);
  const key = type === "y" ? "FullYear" : type === "m" ? "Month" : "Date";
  result[`set${key}`](result[`get${key}`]() + value);
  return result;
};
Date.prototype.subtract = function(type, value) {
  return this.add(type, -value);
};
Date.prototype.isSameDay = function(date) {
  return this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};
Date.prototype.daysBetween = function(date) {
  const msPerDay = 24 * 60 * 60 * 1e3;
  return Math.floor(Math.abs(this.getTime() - date.getTime()) / msPerDay);
};
Date.prototype.toISODateString = function() {
  return this.toISOString().split("T")[0];
};
Set.prototype.union = function(set) {
  return /* @__PURE__ */ new Set([...this, ...set]);
};
Set.prototype.intersect = function(set) {
  return new Set([...this].filter((item) => set.has(item)));
};
Set.prototype.diff = function(set) {
  return new Set([...this].filter((item) => !set.has(item)));
};
Set.prototype.isSubset = function(set) {
  return [...this].every((item) => set.has(item));
};
Set.prototype.symmetricDiff = function(set) {
  return /* @__PURE__ */ new Set([...this.diff(set), ...set.diff(this)]);
};
Map.prototype.invert = function() {
  const inverted = /* @__PURE__ */ new Map();
  for (const [key, value] of this) inverted.set(value, key);
  return inverted;
};
Map.prototype.filter = function(callback) {
  const filtered = /* @__PURE__ */ new Map();
  for (const [key, value] of this) if (callback(value, key, this)) filtered.set(key, value);
  return filtered;
};
Map.prototype.setMap = function(keys, values) {
  if (!Array.isArray(keys) || !Array.isArray(values)) throw new TypeError("Both keys and values must be arrays.");
  if (keys.length !== values.length) throw new Error("Keys and values arrays must have the same length.");
  for (let idx = 0; idx < keys.length; idx++) this.set(keys[idx], values[idx]);
  return this;
};
Map.prototype.changeKeys = function(callback) {
  const newMap = /* @__PURE__ */ new Map();
  for (const [key, value] of this) newMap.set(callback(key, value, this), value);
  return newMap;
};
Map.prototype.changeValues = function(callback) {
  const newMap = /* @__PURE__ */ new Map();
  for (const [key, value] of this) newMap.set(key, callback(value, key, this));
  return newMap;
};
Map.prototype.toObject = function() {
  const obj = {};
  for (const [key, value] of this) obj[key] = value;
  return obj;
};
RegExp.prototype.testAsync = function(substr) {
  return new Promise((res) => res(this.test(substr)));
};
const _APIError = class _APIError extends Error {
  constructor(message, status, action, method, details) {
    super(message);
    this.status = status;
    this.action = action;
    this.method = method;
    this.details = details;
    this.name = "APIError";
  }
};
__name(_APIError, "APIError");
let APIError = _APIError;
function setOpenGraphTags({ title, description, imageUrl, url }) {
  const cElem = document.createElement;
  const head = document.head;
  const ogTitle = cElem("meta");
  ogTitle.setAttribute("property", "og:title");
  ogTitle.content = title;
  head.appendChild(ogTitle);
  const ogDescription = cElem("meta");
  ogDescription.setAttribute("property", "og:description");
  ogDescription.content = description;
  head.appendChild(ogDescription);
  const ogImage = cElem("meta");
  ogImage.setAttribute("property", "og:image");
  ogImage.content = imageUrl;
  head.appendChild(ogImage);
  const ogUrl = cElem("meta");
  ogUrl.setAttribute("property", "og:url");
  ogUrl.content = url;
  head.appendChild(ogUrl);
}
__name(setOpenGraphTags, "setOpenGraphTags");
function setMetaTags(tags) {
  const cElem = document.createElement.bind(document);
  const head = document.head;
  const description = cElem("meta");
  description.name = "description";
  description.content = tags.description;
  head.appendChild(description);
  if (tags.keywords) {
    const keywords = cElem("meta");
    keywords.name = "keywords";
    keywords.content = tags.keywords;
    head.appendChild(keywords);
  }
  if (tags.author) {
    const author = cElem("meta");
    author.name = "author";
    author.content = tags.author;
    head.appendChild(author);
  }
}
__name(setMetaTags, "setMetaTags");
const _Device = class _Device {
  // Platform Detection
  static get platform() {
    const ua = navigator.userAgent;
    if (/Win/.test(ua)) return "windows";
    if (/Mac/.test(ua)) return "macos";
    if (/Linux/.test(ua)) return "linux";
    return "unknown";
  }
  // OS Detection
  static get os() {
    const osMap = /* @__PURE__ */ new Map([
      ["macos", "MacOS"],
      ["windows", "Windows"],
      ["linux", "Linux"],
      ["android", "Android"],
      ["iphone", "iOS"],
      ["ipad", "iOS"]
    ]);
    return osMap.get(_Device.platform) || "Unknown OS";
  }
  // Browser Detection
  static get browser() {
    const ua = navigator.userAgent;
    const browserMap = [
      { name: "Chrome", regex: /Chrome\/([\d.]+)/ },
      { name: "Firefox", regex: /Firefox\/([\d.]+)/ },
      { name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
      { name: "Opera", regex: /Opera\/([\d.]+)|OPR\/([\d.]+)/ },
      { name: "MSIE", regex: /MSIE ([\d.]+)/ },
      { name: "Edge", regex: /Edg\/([\d.]+)/ }
    ];
    for (const { name, regex } of browserMap) {
      const match = ua.match(regex);
      if (match) return { name, version: match[1] || "Unknown" };
    }
    return { name: "Netscape", version: "Unknown" };
  }
  // Get User Language
  static get lang() {
    const primaryLanguage = navigator.language || "en";
    const twoCharCode = primaryLanguage.split("-")[0];
    return twoCharCode || "en";
  }
};
__name(_Device, "Device");
let Device = _Device;
const scriptRel = "modulepreload";
const assetsURL = /* @__PURE__ */ __name(function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
}, "assetsURL");
const seen = {};
const __vitePreload = /* @__PURE__ */ __name(function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    __name(allSettled, "allSettled");
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  __name(handlePreloadError, "handlePreloadError");
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
}, "preload");
const languages = /* @__PURE__ */ Object.assign({ "../../../assets/lang/en/lang.js": /* @__PURE__ */ __name(() => __vitePreload(() => import("./lang-BWLDCGCl.js"), true ? [] : void 0, import.meta.url), "../../../assets/lang/en/lang.js") });
const _Language = class _Language {
  texts;
  getTexts(path) {
    return path.length ? path.includes("/") ? this.locateTexts(path.split("/")) : this.texts[path] : this.texts["home"];
  }
  locateTexts(paths) {
    let ref = this.texts;
    for (const subPath of paths) ref = ref[subPath];
    return ref;
  }
  async importTexts(lang) {
    const path = `../../../assets/lang/${lang}/lang.js`;
    try {
      this.texts = false ? (await __vitePreload(async () => {
        const { texts } = await import(
          /* @vite-ignore */
          `../../../i18n/${lang}/lang`
        );
        return { texts };
      }, true ? [] : void 0, import.meta.url)).texts : languages[path] ? (await languages[path]()).texts : console.error(`Language file not found: ${lang}`);
    } catch (err) {
      this.texts = {};
      console.error(err);
    }
  }
};
__name(_Language, "Language");
let Language = _Language;
const _Storage = class _Storage {
  constructor(db = "DB", store = "general") {
    this.db = db;
    this.store = store;
  }
  storageTypes = ["localStorage", "sessionStorage", "indexedDB"];
  /**
   * Sets the value associated with the given key in the specified storage type.
   *
   * @param key The key of the item to set.
   * @param value The value to set.
   * @param storageType The type of storage to set the item in. Defaults to 'localStorage'.
   * @throws {Error} If the storage type is invalid.
   */
  async setItem(key, value, storageType = "localStorage") {
    this.checkType(storageType);
    switch (storageType) {
      case "localStorage":
      case "sessionStorage":
        window[storageType].setItem(key, JSON.stringify(value));
        break;
      case "indexedDB":
        const [store, tx] = await this.getStore();
        store.put(value, key);
        await tx;
        break;
      default:
        throw new Error(`Failed to set item: ${key}`);
    }
  }
  /**
   * Retrieves the value associated with the given key from the specified storage type.
   *
   * @param key The key of the item to retrieve.
   * @param storageType The type of storage to retrieve the item from.
   * @throws {Error} If the storage type is invalid.
   * @returns The value associated with the given key, or `null` if the key does not exist in the storage type.
   */
  async getItem(key, storageType = "localStorage") {
    this.checkType(storageType);
    let result;
    switch (storageType) {
      case "localStorage":
      case "sessionStorage":
        result = window[storageType].getItem(key);
        return result ?? JSON.parse(result);
      case "indexedDB":
        const [store] = await this.getStore();
        const request = store.get(key);
        result = await new Promise((res) => {
          request.onsuccess = () => res(request.result);
          request.onerror = () => res(null);
        });
        return result;
      default:
        throw new Error(`Failed to get item: ${key}`);
    }
  }
  /**
   * Removes the item with the given key from the specified storage type.
   *
   * @param key The key of the item to remove.
   * @param storageType The type of storage to remove the item from.
   * @throws {Error} If the storage type is invalid.
   */
  async removeItem(key, storageType = "localStorage") {
    this.checkType(storageType);
    switch (storageType) {
      case "localStorage":
      case "sessionStorage":
        window[storageType].removeItem(key);
        break;
      case "indexedDB":
        const [store, tx] = await this.getStore();
        store.delete(key);
        await tx;
        break;
      default:
        throw new Error(`Failed to remove item: ${key}`);
    }
  }
  /**
   * Checks if the given storage type is valid.
   * @param storageType The storage type to check.
   * @throws {Error} If the storage type is invalid.
   * @private
   */
  checkType(storageType) {
    if (!this.storageTypes.includes(storageType)) throw new Error(`Invalid storage type: ${storageType}`);
  }
  /**
   * Opens the IndexedDB database and returns the object store and transaction.
   * @returns A tuple containing the object store and transaction.
   * @private
   */
  async getStore() {
    const db = await this.openDB(this.db, 1);
    const tx = db.transaction(this.store, "readwrite");
    const store = tx.objectStore(this.store);
    return [store, tx];
  }
  /**
   * Opens the IndexedDB database with the given name and version.
   * @param name The name of the database.
   * @param version The version of the database. If not provided, the latest version is used.
   * @returns A Promise that resolves with the opened database.
   * @private
   */
  async openDB(name, version) {
    return new Promise((res, rej) => {
      const request = indexedDB.open(name, version);
      request.onsuccess = () => res(request.result);
      request.onerror = () => rej(request.error);
    });
  }
};
__name(_Storage, "Storage");
let Storage = _Storage;
const _State = class _State {
  data = /* @__PURE__ */ new Map();
  subscribers = /* @__PURE__ */ new Map();
  /**
   * Sets the value associated with the given name in the state data.
   * @param name The name of the value to set in the state data.
   * @param value The value to set in the state data.
   */
  set(name, value) {
    this.data.set(name, value);
  }
  /**
   * Retrieves the value associated with the given name in the state data.
   * Returns undefined if the given name does not exist in the state data.
   * @param name The name of the value to retrieve from the state data.
   */
  get(name) {
    return this.data.get(name);
  }
  /**
   * Returns true if the given name exists in the state data, false otherwise.
   * @param name the name to check for
   */
  has(name) {
    return this.data.has(name);
  }
  /**
   * Deletes registry by name.
   */
  delete(name) {
    this.data.delete(name);
  }
  /**
   * Clears all stored state data.
   */
  clear() {
    this.data.clear();
  }
  publish(name, ...args) {
    this.subscribers.get(name)?.forEach((fn) => fn(args.length === 1 ? args[0] : args));
  }
  /**
   * Adds a subscriber function for the given event name.
   * Returns an unsubscribe function to remove this specific subscriber.
   * @param name The name of the event to subscribe to.
   * @param fn The subscriber function to add.
   * @returns An unsubscribe function that removes this subscriber.
   */
  subscribe(name, fn) {
    if (this.subscribers.has(name)) {
      this.subscribers.get(name).push(fn);
    } else {
      this.subscribers.set(name, [fn]);
    }
    return () => this.unsubscribe(name, fn);
  }
  /**
   * Removes the given subscriber function from the given event name.
   * @param name The name of the event to remove the subscriber from.
   * @param fn The subscriber function to remove.
   */
  unsubscribe(name, fn) {
    if (this.subscribers.has(name)) {
      const subscribers = this.subscribers.get(name);
      const idx = subscribers.indexOf(fn);
      if (idx > -1) subscribers.splice(idx, 1);
    }
  }
  /**
   * Removes all subscribers for the given event name.
   * @param name The name of the event to remove all subscribers from.
   */
  unsubscribeAll(name) {
    this.subscribers.delete(name);
  }
};
__name(_State, "State");
let State = _State;
const theme = {
  dark: {
    bg: "#000",
    color: "#fff"
  },
  light: {
    color: "#000",
    bg: "#fff"
  }
};
const _Preference = class _Preference {
  storage = new Storage();
  storageKey = _Preference.name.toLowerCase();
  initialFontSize;
  constructor() {
    this.initialFontSize = +getComputedStyle(document.documentElement).getPropertyValue("--fontSize").trim().replace("px", "");
  }
  // General
  // // Theme
  async getTheme() {
    return await this.storage.getItem(`${this.storageKey}:theme`) ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  setTheme(theme2) {
    this.storage.setItem(`${this.storageKey}:theme`, theme2);
    this.executeTheme();
  }
  async executeTheme() {
    let preferredTheme = await this.getTheme();
    if (preferredTheme === "auto") preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    for (const [variable, value] of Object.values(theme[preferredTheme]))
      if (value.length) document.documentElement.style.setProperty(`--${variable}`, value);
  }
  // // Language
  async getLang() {
    return await this.storage.getItem(`${this.storageKey}:lang`) ?? Device.lang;
  }
  setLang(lang) {
    this.storage.setItem(`${this.storageKey}:lang`, lang);
  }
  // // Font Size
  async getFontSize() {
    return await this.storage.getItem(`${this.storageKey}:size`) ?? "medium";
  }
  setFontSize(size) {
    this.storage.setItem(`${this.storageKey}:size`, size);
    this.executeFontSize();
  }
  async executeFontSize() {
    const size = await this.getFontSize();
    let newFontSize = this.initialFontSize;
    if (size === "large") newFontSize *= 1.2;
    if (size === "small") newFontSize /= 1.2;
    document.documentElement.style.setProperty(`--fontSize`, `${newFontSize}px`);
  }
  // // Date Format
  async getDateFormat() {
    return await this.storage.getItem(`${this.storageKey}:date`) ?? "MM/DD/YYYY";
  }
  setDateFormat(format) {
    this.storage.setItem(`${this.storageKey}:date`, format);
  }
  // // Time Format
  async getTimeFormat() {
    return await this.storage.getItem(`${this.storageKey}:time`) ?? 24;
  }
  setTimeFormat(format) {
    this.storage.setItem(`${this.storageKey}:time`, format);
  }
  // Accessibility
  // // Contrast
  highContrast() {
    document.body.classList.add("high-contrast");
  }
  regularContrast() {
    document.body.classList.remove("high-contrast");
  }
  // // Reduce Motion
  reduceMotion() {
    document.body.classList.add("reduce-motion");
  }
  regularMotion() {
    document.body.classList.remove("reduce-motion");
  }
};
__name(_Preference, "Preference");
let Preference = _Preference;
function Enlist(type, target) {
  customElements.define(`${target.name.toLowerCase()}-${type}`, target);
}
__name(Enlist, "Enlist");
function addMeta(target, type) {
  const name = target.constructor.name.toLowerCase();
  target[type === "page" ? "id" : "className"] = name;
  target.dataset.type = type;
}
__name(addMeta, "addMeta");
const _Basis = class _Basis extends HTMLElement {
  /**
   * Construct a new `Basis` instance.
   *
   * @param config The configuration object for this component.
   *
   * The `init` method is called automatically after a short delay to allow the
   * component to be fully initialized before the `init` method is called.
   */
  constructor(config) {
    super();
    this.config = config;
    setTimeout(this.init.bind(this));
  }
  /**
   * Create an element with a given tag name.
   * @param tag The tag name of the element to create, e.g. "div", "span", etc.
   * @returns The created element.
   */
  cElem = document.createElement.bind(document);
  /**
   * Get an element by its id.
   * @param id The id of the element to retrieve.
   * @returns The element with the given id, or null if it doesn't exist.
   */
  idElem = /* @__PURE__ */ __name((id) => this.querySelector(`[id="${id}"]`), "idElem");
  /**
   * Get elements by their "name" attribute.
   * @param name The value of the "name" attribute to search for.
   * @returns A list of elements with a "name" attribute equal to the given value.
   */
  nmElem = /* @__PURE__ */ __name((name) => this.querySelectorAll(`[name="${name}"]`), "nmElem");
  /**
   * Get elements by their "class" attribute.
   * @param className The value of the "class" attribute to search for.
   * @returns A list of elements with a "class" attribute equal to the given value.
   */
  clsElem = this.getElementsByClassName;
  /**
   * Get elements by their tag name.
   * @param tag The tag name of the elements to retrieve, e.g. "div", "span", etc.
   * @returns A collection of elements with the specified tag name.
   */
  tagElem = this.getElementsByTagName;
  /**
   * Updates an element property with a given value.
   * If the 3rd parameter is provided, it sets an attribute on the element with the given name and value.
   * If the 3rd parameter is not provided, it sets the innerHTML of the element to the given value.
   * @param child The name of the element property to update.
   * @param value The value to update the element property with.
   * @param attr The name of the attribute to set on the element (optional).
   */
  uElem(child, value, attr) {
    if (this[child] instanceof HTMLElement) attr ? this[child].setAttribute(attr, value) : this[child].innerHTML = `${value}`;
  }
  /**
   * Creates multiple HTML elements based on a given list of specifications.
   * Each specification includes a tag name and an optional class name.
   * @param list - An array of objects, each containing:
   *   - `tag`: The tag name of the element to create (e.g., "div", "span").
   *   - `cls` (optional): A class name to assign to the created element.
   * @returns An array of created HTML elements.
   */
  cAlot(list) {
    return list.map(({ tag, cls }) => {
      const el = this.cElem(tag);
      if (cls) el.className = cls;
      return el;
    });
  }
};
__name(_Basis, "Basis");
let Basis = _Basis;
function ComponentDecorator(target) {
  Enlist("component", target);
}
__name(ComponentDecorator, "ComponentDecorator");
const _Component = class _Component extends Basis {
  /**
   * Constructs a Component instance.
   *
   * @param config - Configuration object of type IConfig.
   * @param parentState - Optional parent state.
   */
  constructor(config, parentState) {
    super(config);
    this.config = config;
    this.parentState = parentState;
    addMeta(this, "component");
  }
};
__name(_Component, "Component");
let Component = _Component;
function ModuleDecorator(target) {
  Enlist("module", target);
}
__name(ModuleDecorator, "ModuleDecorator");
const _Module = class _Module extends Basis {
  /**
   * Constructs a Module instance.
   *
   * @param config - Configuration object of type IConfig.
   * @param parentState - Optional parent state.
   */
  constructor(config, parentState) {
    super(config);
    this.config = config;
    this.parentState = parentState;
    addMeta(this, "module");
  }
  state = new State();
};
__name(_Module, "Module");
let Module = _Module;
const StateKeys = {
  // Events.
  // // Navigation.
  navigate: "navigate",
  contentReady: "contentReady",
  // // Dialogs.
  openModal: "openModal",
  checkModal: "checkModal",
  preferences: "preferences",
  texts: "texts"
};
function PageDecorator(target) {
  Enlist("page", target);
}
__name(PageDecorator, "PageDecorator");
const _Page = class _Page extends Basis {
  /**
   * Constructor for Page.
   * @param texts Page's texts.
   * @param appState Application's state.
   */
  constructor(texts, appState) {
    super(texts);
    this.texts = texts;
    this.appState = appState;
    addMeta(this, "page");
    this.dataset.layout = this.layout;
  }
  // Creating a page's state.
  state = new State();
  // Declaring layout type.
  layout = "single_column";
  // Declaring optional navigation.
  navigation;
  footer;
  /**
   * Initializes the page.
   * Prints a message in the console if the page is not shown, and if the page has navigation, but the static method getPages() is not defined.
   * @remarks
   * This method is called automatically after the page is created.
   * If you don't want to see the message, you can delete this method or set the environment variable `DEV` to `false`.
   */
  init() {
  }
  /**
   * Shows the page after the content is ready.
   * Publishes the `${basePath}:${StateKeys.contentReady}` state event.
   * If the page has a footer, creates a new Footer instance and appends it to the page.
   * @param basePath - The basePath of the page ancestory. Defaults to '/'.
   */
  showPage(basePath = "/") {
    this.appState.publish(`${basePath}:${StateKeys.contentReady}`);
    if (this.texts?.FOOTER) {
      this.footer = new Footer(this.texts.FOOTER, this.appState);
      this.append(this.footer);
    }
  }
};
__name(_Page, "Page");
let Page = _Page;
var __getOwnPropDesc$C = Object.getOwnPropertyDescriptor;
var __decorateClass$C = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$C(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$C");
let Adder = (_a = class extends HTMLElement {
  constructor(appState, modalKey, comp) {
    super();
    this.appState = appState;
    this.modalKey = modalKey;
    this.comp = comp;
    this.init();
    addMeta(this, "component");
  }
  init() {
    this.id = "adder";
    this.onclick = () => this.appState.publish(StateKeys.openModal, this.modalKey, this.comp);
  }
}, __name(_a, "Adder"), _a);
Adder = __decorateClass$C([
  ComponentDecorator
], Adder);
var __getOwnPropDesc$B = Object.getOwnPropertyDescriptor;
var __decorateClass$B = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$B(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$B");
let Avatar = (_b = class extends HTMLElement {
  constructor(url, width = 100) {
    super();
    addMeta(this, "component");
    this.setAttribute("role", "img");
    this.setAttribute("alt", "avatar");
    this.style.width = `${width}px`;
    this.style.backgroundImage = `url(${url}), url('./generics/user.svg')`;
  }
}, __name(_b, "Avatar"), _b);
Avatar = __decorateClass$B([
  ComponentDecorator
], Avatar);
var __getOwnPropDesc$A = Object.getOwnPropertyDescriptor;
var __decorateClass$A = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$A(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$A");
let Badge = (_c = class extends Component {
  constructor(texts) {
    super(texts);
    this.texts = texts;
  }
  init() {
    this.classList.add(this.texts.type, this.texts.pos);
    this.innerHTML = this.texts.text;
  }
}, __name(_c, "Badge"), _c);
Badge = __decorateClass$A([
  ComponentDecorator
], Badge);
var __getOwnPropDesc$z = Object.getOwnPropertyDescriptor;
var __decorateClass$z = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$z(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$z");
const _Code = class _Code extends Component {
  constructor(code) {
    super(code);
    this.code = code;
  }
  copyCode() {
    const copyBtn = this.clsElem("titled")[0] ?? this;
    navigator.clipboard.writeText(this.code).then((_) => copyBtn.dataset.title = "Copied!").catch((_) => copyBtn.dataset.title = "Failed!").finally(() => setTimeout(() => copyBtn.dataset.title = "Copy", 1e3));
  }
  prepareCopier(ref) {
    ref.classList.add("titled");
    ref.dataset.title = "Copy";
    ref.onclick = this.copyCode.bind(this);
  }
};
__name(_Code, "Code");
let Code = _Code;
let CodeChunk = (_d = class extends Code {
  init() {
    this.createHead();
    this.createCode();
  }
  createCode() {
    const pre = this.cElem("pre");
    pre.innerText = this.code;
    pre.className = "content";
    this.append(pre);
  }
  createHead() {
    const div = this.cElem("div");
    div.className = "head";
    div.innerText = "code";
    div.append(this.createCopier());
    this.append(div);
  }
  createCopier() {
    const span = this.cElem("span");
    this.prepareCopier(span);
    return span;
  }
}, __name(_d, "CodeChunk"), _d);
CodeChunk = __decorateClass$z([
  ComponentDecorator
], CodeChunk);
let CodeWord = (_e = class extends Code {
  constructor(code, preText, postText) {
    super(code);
    this.code = code;
    this.preText = preText;
    this.postText = postText;
  }
  init() {
    this.innerHTML = `${this.preText ? `${this.preText}: ` : ""}<samp>${this.code}</samp> ${this.postText ? `${this.postText}.` : ""}`;
    this.prepareCopier(this);
  }
}, __name(_e, "CodeWord"), _e);
CodeWord = __decorateClass$z([
  ComponentDecorator
], CodeWord);
var __getOwnPropDesc$y = Object.getOwnPropertyDescriptor;
var __decorateClass$y = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$y(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$y");
let Collapsible = (_f = class extends Component {
  init() {
    if (this.config.type) this.classList.add(this.config.type);
    const details = this.cElem("details");
    const summary = this.cElem("summary");
    const content = this.cElem("div");
    summary.innerHTML = `<span>&#9658;</span> ${this.config.summary}`;
    content.innerHTML = this.config.content;
    content.className = "content";
    details.append(summary);
    this.append(details, content);
  }
}, __name(_f, "Collapsible"), _f);
Collapsible = __decorateClass$y([
  ComponentDecorator
], Collapsible);
const _BaseDropdown = class _BaseDropdown extends Component {
  constructor(list = [], cb) {
    super(list);
    this.list = list;
    this.cb = cb;
    this.classList.add("dropdown");
  }
  dialog = this.cElem("dialog");
  init() {
    this.append(this.dialog);
    this.renderList();
  }
  renderList(list = this.list) {
    this.dialog.innerHTML = "";
    for (const data of list) {
      const item = this.createItem(data);
      if (!(data instanceof HTMLElement)) item.onclick = () => {
        this.cb(data);
        this.close();
      };
      this.dialog.append(item);
    }
  }
  toggle() {
    this.dialog.open = !this.dialog.open;
  }
  open() {
    this.dialog.open = true;
  }
  close() {
    this.dialog.open = false;
  }
};
__name(_BaseDropdown, "BaseDropdown");
let BaseDropdown = _BaseDropdown;
var __getOwnPropDesc$x = Object.getOwnPropertyDescriptor;
var __decorateClass$x = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$x(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$x");
let SelectDropdown = (_g = class extends BaseDropdown {
  createItem(item) {
    const div = this.cElem("div");
    div.innerText = item.text;
    div.dataset.value = item.value || item.text;
    return div;
  }
}, __name(_g, "SelectDropdown"), _g);
SelectDropdown = __decorateClass$x([
  ComponentDecorator
], SelectDropdown);
var __getOwnPropDesc$w = Object.getOwnPropertyDescriptor;
var __decorateClass$w = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$w(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$w");
let FilterDropdown = (_h = class extends SelectDropdown {
  filteredList;
  filter(val) {
    this.filteredList = this.list.filter((item) => item.text.toLowerCase().includes(val.toLowerCase()));
    this.renderList(this.filteredList);
    this[this.filteredList.length ? "open" : "close"]();
  }
}, __name(_h, "FilterDropdown"), _h);
FilterDropdown = __decorateClass$w([
  ComponentDecorator
], FilterDropdown);
var __getOwnPropDesc$v = Object.getOwnPropertyDescriptor;
var __decorateClass$v = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$v(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$v");
let MenuDropdown = (_i = class extends BaseDropdown {
  constructor(list) {
    super(list, () => null);
    this.list = list;
  }
  createItem = /* @__PURE__ */ __name((item) => item, "createItem");
}, __name(_i, "MenuDropdown"), _i);
MenuDropdown = __decorateClass$v([
  ComponentDecorator
], MenuDropdown);
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$u");
let Extender = (_j = class extends Component {
  constructor(list, type) {
    super(list);
    this.list = list;
    this.type = type;
    this.classList.add("extender");
    if (this.type.match(/(caret|dots)/)) this.classList.add(...this.type.split(" "));
    this.onclick = () => this.dropdown.toggle();
  }
  dropdown;
  init() {
    this.dropdown = new MenuDropdown(this.list);
    if (!this.type.match(/(caret|dots)/)) {
      const div = this.cElem("div");
      div.innerHTML = this.type;
      div.className = "link";
      this.append(div);
    }
    this.append(this.dropdown);
  }
}, __name(_j, "Extender"), _j);
Extender = __decorateClass$u([
  ComponentDecorator
], Extender);
const _Modal = class _Modal {
  constructor(appendFn, content, deleteFn) {
    this.appendFn = appendFn;
    this.content = content;
    this.deleteFn = deleteFn;
    this.init();
  }
  dialog;
  init() {
    this.dialog = document.createElement("dialog");
    const closeBtn = document.createElement("span");
    this.dialog.className = "modal";
    closeBtn.className = "close";
    closeBtn.onclick = () => this.closeModal();
    this.dialog.onclick = ({ clientX, clientY }) => {
      const { top, left, width, height } = this.dialog.getBoundingClientRect();
      const isInDialog = top <= clientY && clientY <= top + height && left <= clientX && clientX <= left + width;
      if (!isInDialog) this.closeModal();
    };
    this.dialog.append(this.content, closeBtn);
    this.appendFn(this.dialog);
    this.dialog.showModal();
  }
  closeModal() {
    this.dialog.remove();
    setTimeout(() => this.deleteFn?.(), 500);
  }
};
__name(_Modal, "Modal");
let Modal = _Modal;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __decorateClass$t = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$t");
let Fluid = (_k = class extends HTMLElement {
  constructor() {
    super();
    addMeta(this, "component");
  }
}, __name(_k, "Fluid"), _k);
Fluid = __decorateClass$t([
  ComponentDecorator
], Fluid);
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$s");
let Link = (_l = class extends Component {
  constructor(texts, navigate) {
    super(texts);
    this.texts = texts;
    this.navigate = navigate;
  }
  init() {
    this.innerHTML = this.texts.text.replace(/\-/g, " ");
    this.tabIndex = 0;
    this.dataset.href = this.texts.href;
    this.onclick = () => {
      if (this.dataset.disabled !== "true") this.navigate(this.texts.href);
    };
    if (this.texts.title) this.title = this.texts.title;
    if (this.texts.img?.length) {
      const img = this.cElem("img");
      img.alt = this.texts.img.slice(this.texts.img.lastIndexOf("/") + 1);
      img.src = this.texts.img;
      this.append(img);
    }
  }
  activateMe() {
    this.classList[location.pathname.includes(this.texts.href) ? "add" : "remove"]("active");
  }
}, __name(_l, "Link"), _l);
Link = __decorateClass$s([
  ComponentDecorator
], Link);
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$r");
let Loader = (_m = class extends Component {
  init() {
    const img = document.createElement("img");
    img.style.background = `url(./loader/loader.svg) no-repeat 50%`;
    this.append(img);
  }
}, __name(_m, "Loader"), _m);
Loader = __decorateClass$r([
  ComponentDecorator
], Loader);
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$q");
let Progress = (_n = class extends Component {
  constructor(max) {
    super(max);
    this.max = max;
    this.progress.max = this.max;
  }
  progress = this.appendChild(this.cElem("progress"));
  init() {
  }
  update(value) {
    if (this.progress.value !== value) {
      this.progress.value = value;
    }
  }
}, __name(_n, "Progress"), _n);
Progress = __decorateClass$q([
  ComponentDecorator
], Progress);
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$p");
let Rating = (_o = class extends Component {
  constructor(data) {
    super(data);
    this.data = data;
  }
  init() {
    for (let i = 1; i <= this.data.max; i++) {
      const star = document.createElement("span");
      star.classList.add("star");
      if (i <= this.data.curr) star.classList.add("filled");
      star.dataset.value = `${i}`;
      star.onclick = () => this.handleRating(i);
      this.appendChild(star);
    }
  }
  handleRating(value) {
    this.data.curr = value;
    this.updateStars();
  }
  updateStars() {
    for (const star of this.clsElem("star")) {
      const value = +(star.dataset.value || "0");
      star.classList.toggle("filled", value <= this.data.curr);
    }
  }
}, __name(_o, "Rating"), _o);
Rating = __decorateClass$p([
  ComponentDecorator
], Rating);
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$o");
let Seperator = (_p = class extends Component {
  init() {
    this.innerText = this.config.header;
  }
}, __name(_p, "Seperator"), _p);
Seperator = __decorateClass$o([
  ComponentDecorator
], Seperator);
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$n");
let Soon = (_q = class extends Component {
  constructor(texts) {
    super(texts);
    this.texts = texts;
  }
  init() {
    const header = this.cElem("h1");
    header.innerText = `${this.texts} is coming soon...`;
    this.append(header);
  }
}, __name(_q, "Soon"), _q);
Soon = __decorateClass$n([
  ComponentDecorator
], Soon);
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$m");
let Tester = (_r = class extends HTMLElement {
  constructor() {
    super();
    addMeta(this, "component");
  }
}, __name(_r, "Tester"), _r);
Tester = __decorateClass$m([
  ComponentDecorator
], Tester);
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$l");
let Toast = (_s = class extends HTMLElement {
  constructor(ref, timeout = 2e3) {
    super();
    this.ref = ref;
    this.timeout = timeout;
    ref.append(this);
  }
  showToast(msg, type = "default") {
    this.innerHTML = msg;
    this.className = `toast ${type} ${this.ref === document.body ? "body" : "el"}`;
    this.classList.add("show");
    setTimeout(() => this.classList.remove("show"), this.timeout);
  }
}, __name(_s, "Toast"), _s);
Toast = __decorateClass$l([
  ComponentDecorator
], Toast);
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$k");
const _Tooltip = class _Tooltip extends Component {
  constructor(texts) {
    super(texts);
    this.texts = texts;
    this.classList.add("tooltip");
  }
  addTooltipListeners(ref) {
    ref.addEventListener("mouseenter", () => this.toggleTooltip(true));
    ref.addEventListener("mouseleave", () => this.toggleTooltip(false));
  }
  toggleTooltip(show) {
    this.classList[show ? "add" : "remove"]("show");
  }
};
__name(_Tooltip, "Tooltip");
let Tooltip = _Tooltip;
let TooltipEl = (_t = class extends Tooltip {
  init() {
    this.setAttribute("role", "tooltip");
    this.addTooltipListeners(this);
    if (!this.texts.label && !this.texts.symbol) throw "Cannot render tooltip element without label or symbol!";
    if (this.texts.symbol) this.createSymbol();
    if (this.texts.label) this.createLabel();
    this.createTooltip();
  }
  createSymbol() {
    const cls = ["i", "?"].includes(this.texts.type) ? "info" : "danger";
    const span = this.createSpan(`symbol ${cls}`);
    span.innerText = this.texts.type;
    this.append(span);
  }
  createLabel() {
    this.append(this.createSpan("content", `${this.texts.label}`));
  }
  createTooltip() {
    const cls = ["i", "?"].includes(this.texts.type) ? "info" : "danger";
    this.append(this.createSpan(`bubble ${cls}`, this.texts.text));
  }
  createSpan(cls, content) {
    const span = this.cElem("span");
    span.className = cls;
    if (content) span.innerHTML = content;
    return span;
  }
}, __name(_t, "TooltipEl"), _t);
TooltipEl = __decorateClass$k([
  ComponentDecorator
], TooltipEl);
let TooltipAp = (_u = class extends Tooltip {
  constructor(texts, ref) {
    super(texts);
    this.texts = texts;
    this.addTooltipListeners(ref);
  }
  init() {
    this.setAttribute("role", "tooltip");
    this.createTooltip();
  }
  createTooltip() {
    this.innerHTML = this.texts.text;
    const cls = ["i", "?"].includes(this.texts.type) ? "info" : "danger";
    this.className = `bubble ${cls}`;
  }
}, __name(_u, "TooltipAp"), _u);
TooltipAp = __decorateClass$k([
  ComponentDecorator
], TooltipAp);
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$j");
let Top = (_v = class extends HTMLElement {
  constructor(ref) {
    super();
    addMeta(this, "component");
    this.innerHTML = "<span></span>";
    this.classList.add("titled");
    this.dataset.title = "Page top";
    this.onclick = () => ref.scrollTo({ top: 0, behavior: "smooth" });
    ref.addEventListener("scroll", () => {
      const method = ref.scrollTop > 200 ? "add" : "remove";
      this.classList[method]("visible");
    });
  }
}, __name(_v, "Top"), _v);
Top = __decorateClass$j([
  ComponentDecorator
], Top);
const _FormComponent = class _FormComponent extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  value = "";
  field;
  hasError = false;
  formCb;
  init() {
    this.hasError = !!(this.props.required && this.props.error?.length);
    this.prepend(this.createMe());
  }
  // // Generic creator -> paragraph(container), label, and field.
  createFormGroup(inpType) {
    const [fieldset, label] = this.createBasicElements(inpType);
    fieldset.className = label.className = this.field.className = "form-";
    fieldset.className += "group";
    label.className += "label";
    this.field.className += `field ${inpType} ${this.constructor.name.toLowerCase()}`;
    const children = [this.field];
    this.setField();
    this.setFieldsetProps(fieldset);
    if (this.props.label?.length) this.setLabel(label) && children.unshift(label);
    this.setAccessibility(children);
    fieldset.append(...children);
    if (this.props.error?.length) fieldset.append(this.createError());
    return fieldset;
  }
  // ---------------------------------------------------------------------------------------------
  // Elements Methods.
  // ---------------------------------------------------------------------------------------------
  // // Creates container and label.
  createBasicElements(inpType) {
    this.field = this.cElem(inpType);
    return [this.cElem("fieldset"), this.cElem("label")];
  }
  // // Field.
  setField() {
    this.field.id = this.field.name = this.props.name;
    if (this.props.placeholder?.length && !(this.field instanceof HTMLSelectElement)) this.field.placeholder = this.props.placeholder;
    this.field.oninput = () => this.onInput(this.field.value);
    if (this.props.required) {
      this.field.addEventListener("focus", () => this.field.classList.remove("touched"));
      this.field.addEventListener("blur", () => this.field.classList.add("touched"));
    }
    this.field.autocomplete = this.props.autocomplete ?? "off";
    this.field.ariaRequired = `${!!this.props.required}`;
  }
  // // Paragraph.
  setFieldsetProps(para) {
    if (this.props.dataset) Object.entries(this.props.dataset).forEach(([key, value]) => para.dataset[key] = value);
    if (typeof this.props.required === "boolean") para.dataset.required = `${this.props.required}`;
  }
  // // Label.
  setLabel(label) {
    label.innerText = this.props.label;
    label.htmlFor = this.props.name;
    label.id = `${this.props.name}Label`;
    return true;
  }
  // // Accessibility
  setAccessibility(children) {
    if (this.props.label?.length) this.field.setAttribute("aria-labelledby", `${this.props.name}Label`);
    if (this.props.ariaDescribedBy) {
      this.field.setAttribute("aria-describedby", `${this.props.name}Help`);
      const small = this.cElem("small");
      small.innerText = this.props.ariaDescribedBy;
      small.id = `${this.props.name}Help`;
      children.push(small);
    }
    if (this.props.ariaDescription) this.field.ariaDescription = this.props.ariaDescription;
  }
  // ---------------------------------------------------------------------------------------------
  // Value Methods.
  // ---------------------------------------------------------------------------------------------
  onInput(value) {
    this.value = this.field.value = value;
    this.checkError();
    if (this.formCb) this.formCb();
  }
  reset() {
    this.field.value = "";
    this.hasError = !!(this.props.required && this.props.error?.length);
  }
  // ---------------------------------------------------------------------------------------------
  // Error Methods.
  // ---------------------------------------------------------------------------------------------
  createError() {
    const para = this.cElem("p");
    para.innerText = `${this.props.error}`;
    para.className = "form-output";
    return para;
  }
  checkError() {
    if (this.props.error?.length) {
      this.hasError = !!(this.props.required && this.props.error?.length && (!this.value.length || this.value === "off"));
      this.clsElem("form-output").item(0)?.classList[this.hasError ? "add" : "remove"]("show");
    }
  }
  // ---------------------------------------------------------------------------------------------
  // Interface Methods.
  // ---------------------------------------------------------------------------------------------
  focus() {
    this.field?.focus();
  }
};
__name(_FormComponent, "FormComponent");
let FormComponent = _FormComponent;
const _FormKeyboardComponent = class _FormKeyboardComponent extends FormComponent {
  reset() {
    super.reset();
    if (this.props.placeholder?.length) this.field.placeholder = this.props.placeholder;
  }
};
__name(_FormKeyboardComponent, "FormKeyboardComponent");
let FormKeyboardComponent = _FormKeyboardComponent;
const _FormMouseComponent = class _FormMouseComponent extends FormComponent {
};
__name(_FormMouseComponent, "FormMouseComponent");
let FormMouseComponent = _FormMouseComponent;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$i");
let Autocomplete = (_w = class extends FormKeyboardComponent {
  dropdown;
  createMe() {
    const fieldset = this.createFormGroup("input");
    this.field.type = this.props.type ?? "text";
    if (this.props.pattern) this.field.pattern = this.props.pattern;
    if (this.props.value) this.field.value = this.props.value;
    this.dropdown = new FilterDropdown(this.props.options, this.select.bind(this));
    fieldset.insertBefore(this.dropdown, fieldset.querySelector(".form-output"));
    this.field.addEventListener("focus", () => this.dropdown.open());
    this.field.addEventListener("blur", () => setTimeout(() => {
      this.dropdown.close();
      this.checkError();
    }, 250));
    return fieldset;
  }
  select({ text }) {
    this.value = this.field.value = text;
    this.checkError();
    if (this.formCb) this.formCb();
    this.field.dispatchEvent(new Event("input", { bubbles: true }));
  }
  checkError() {
    super.checkError();
    setTimeout(() => {
      const diff = this.clsElem("form-group")[0].getBoundingClientRect().bottom - this.field.getBoundingClientRect().bottom;
      this.dropdown.style.setProperty("--topAdjust", `${diff}px`);
    }, 410);
  }
  onInput(value) {
    this.dropdown.filter(value);
    this.value = this.props.dynamicOption ? value : "";
  }
}, __name(_w, "Autocomplete"), _w);
Autocomplete = __decorateClass$i([
  ComponentDecorator
], Autocomplete);
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$h");
let Checkbox = (_x = class extends FormComponent {
  createMe() {
    const fieldset = this.createFormGroup("input");
    this.field.type = "checkbox";
    this.field.checked = !!this.props.value;
    this.field.value = this.field.checked ? "on" : "off";
    this.field.oninput = () => this.onInput(this.field.value = this.field.checked ? "on" : "off");
    return fieldset;
  }
}, __name(_x, "Checkbox"), _x);
Checkbox = __decorateClass$h([
  ComponentDecorator
], Checkbox);
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$g");
let Input = (_y = class extends FormKeyboardComponent {
  createMe() {
    const fieldset = this.createFormGroup("input");
    this.field.type = this.props.type ?? "text";
    if (this.props.pattern) this.field.pattern = this.props.pattern;
    if (this.props.value) this.field.value = this.props.value;
    this.field.oninput = () => this.onInput(this.field.value = this.checkZero(this.field.value.toLowerCase()));
    return fieldset;
  }
  checkZero(val) {
    if (this.props.pattern !== "[0-9]") return val;
    return val[0] === "0" ? this.removeZero(val) : val;
  }
  removeZero(val) {
    val = val.slice(1);
    return val[0] === "0" ? this.removeZero(val) : val;
  }
}, __name(_y, "Input"), _y);
Input = __decorateClass$g([
  ComponentDecorator
], Input);
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$f");
let Radio = (_z = class extends FormComponent {
  createMe() {
    this.field = this.cElem("input");
    const [fieldset, legend] = this.cAlot([{ tag: "fieldset" }, { tag: "legend" }]), children = [legend];
    fieldset.className = "form-group";
    legend.innerHTML = this.props.label;
    for (const radio of this.props.values) {
      const [label, inp, span] = this.cAlot([{ tag: "label" }, { tag: "input" }, { tag: "span" }]);
      inp.type = "radio";
      inp.name = this.props.name;
      inp.id = inp.value = label.htmlFor = span.innerText = radio;
      if (this.props.value === radio) inp.checked = true;
      inp.oninput = () => inp.checked ? this.onInput(inp.value) : null;
      label.append(inp, span);
      children.push(label);
    }
    fieldset.append(...children);
    return fieldset;
  }
}, __name(_z, "Radio"), _z);
Radio = __decorateClass$f([
  ComponentDecorator
], Radio);
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$e");
let Range = (_A = class extends FormComponent {
  createMe() {
    const fieldset = this.createFormGroup("input");
    this.field.type = "range";
    this.field.min = this.props.min;
    this.field.max = this.props.max;
    if (this.props.value) this.field.value = this.props.value;
    return fieldset;
  }
}, __name(_A, "Range"), _A);
Range = __decorateClass$e([
  ComponentDecorator
], Range);
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$d");
let Select = (_B = class extends FormMouseComponent {
  createMe() {
    const fieldset = this.createFormGroup("select");
    if (typeof this.props.required === "boolean") this.field.required = this.props.required;
    if (this.props.placeholder?.length) this.field.innerHTML = `<option disabled selected>${this.props.placeholder}</option>`;
    this.field.append(...this.props.options.map((opt) => {
      const option = this.cElem("option");
      option.innerText = opt.text;
      option.value = opt.value ?? opt.text;
      return option;
    }));
    if (!this.props.placeholder?.length) setTimeout(() => this.field.dispatchEvent(new Event("input", { bubbles: true })));
    return fieldset;
  }
  reset() {
    this.field.selectedIndex = 0;
    super.reset();
  }
}, __name(_B, "Select"), _B);
Select = __decorateClass$d([
  ComponentDecorator
], Select);
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$c");
let Switch = (_C = class extends Checkbox {
}, __name(_C, "Switch"), _C);
Switch = __decorateClass$c([
  ComponentDecorator
], Switch);
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$b");
let Textarea = (_D = class extends FormKeyboardComponent {
  createMe() {
    return this.createFormGroup("textarea");
  }
}, __name(_D, "Textarea"), _D);
Textarea = __decorateClass$b([
  ComponentDecorator
], Textarea);
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$a");
let Form = (_E = class extends Module {
  constructor(map, btns) {
    super({});
    this.map = map;
    this.btns = btns;
  }
  query = {};
  fields = [];
  appBtns = [];
  submitable = false;
  init() {
    this.innerHTML = "";
    if (!this.fields.length) this.createFields();
    this.append(this.createLegend(), ...this.fields, this.createBtns());
  }
  // Legend creator.
  createLegend() {
    if (this.map.legend?.length) {
      const legend = this.cElem("legend");
      legend.innerText = this.map.legend;
      delete this.map.legend;
      return legend;
    } else return "";
  }
  // Fields creator.
  createFields() {
    return this.fields = Object.values(this.map.fields).map((obj) => {
      let field;
      switch (obj.type) {
        case "input":
          field = new Input(obj.props);
          if (obj.props.multiplyBy?.length) {
            setTimeout(() => {
              const ref = this.fields.find((field2) => field2.props.label === obj.props.multiplyBy);
              this.addRefListener(ref, field);
              this.multiply(ref, field);
            });
          }
          break;
        case "select":
          field = new Select(obj.props);
          break;
        case "textarea":
          field = new Textarea(obj.props);
          break;
        case "autocomplete":
          field = new Autocomplete(obj.props);
          break;
        case "checkbox":
          field = new Checkbox(obj.props);
          break;
        case "range":
          field = new Range(obj.props);
          break;
        case "radio":
          field = new Radio(obj.props);
          break;
        case "switch":
          field = new Switch(obj.props);
          break;
      }
      field.formCb = () => {
        this.query[obj.props.name] = `${field.value} ${obj.props.dataset?.unit ?? ""}`.trim();
        this.checkForm();
      };
      return field;
    });
  }
  // Buttons creator.
  createBtns() {
    const wrapper = this.cElem("div");
    const baseCls = "form-";
    wrapper.className = `${baseCls}btns`;
    if (!this.btns.length) {
      wrapper.style.display = "none";
      return wrapper;
    }
    wrapper.append(...this.btns.map((props) => {
      const btn = this.cElem("button");
      btn.className = `${baseCls}${props.text}`;
      btn.innerText = props.text;
      btn.type = props.type;
      if (btn.type === "reset") {
        btn.onclick = () => this.resetForm();
      } else {
        btn.onclick = () => props.cb ? this.cleanQuery() && props.cb(this.query) : null;
        btn.disabled = !this.submitable;
        this.appBtns.push(btn);
      }
      return btn;
    }));
    return wrapper;
  }
  // Query reset.
  cleanQuery() {
    for (const key of Object.keys(this.query)) if (!this.query[key]?.length) delete this.query[key];
    return true;
  }
  // Form reset.
  resetForm() {
    for (let field of this.fields) field.reset();
    this.checkForm();
  }
  // Multiplication.
  addRefListener(ref, toClone) {
    if (ref) {
      if (!ref.value) ref?.onInput("1");
      ref.addEventListener("input", () => this.multiply(ref, toClone));
    }
  }
  multiply(ref, toClone) {
    if (!ref?.value) return;
    let idx = -1;
    const amount = this.fields.filter((field, i) => {
      if (field.props.name.includes(`${toClone.props.name}`)) {
        if (idx < 0) idx = i;
        return field;
      }
    }).length;
    const newFields = [];
    for (let ctx = 1; ctx <= +ref?.value; ctx++) {
      const props = structuredClone(toClone.props);
      props.name += `${ctx}`;
      const field = new Input(props);
      field.formCb = () => {
        this.query[props.name] = `${field.value} ${props.dataset?.unit ?? ""}`.trim();
        this.checkForm();
      };
      field.onchange = () => {
        this.query[props.name] = field.value?.length ? `${field.value} ${props.dataset?.unit ?? ""}` : "";
        this.checkForm();
      };
      newFields.push(field);
    }
    this.fields.splice(idx, amount, ...newFields);
    this.init();
    this.fields[0].focus();
  }
  // Form check.
  checkForm() {
    this.submitable = !this.fields.some((field) => field.hasError);
    for (const btn of this.appBtns) btn.disabled = !this.submitable;
  }
}, __name(_E, "Form"), _E);
Form = __decorateClass$a([
  ModuleDecorator
], Form);
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$9");
let Card = (_F = class extends Module {
  constructor(cardType, data) {
    super(data);
    this.cardType = cardType;
    this.data = data;
    this.classList.add(cardType);
  }
  init() {
    const sections = this.createCardSections();
    for (const section of sections) {
      const container = this.createCardSection(section);
      if (section === "title") this.createTitle(container);
      if (section === "description") this.createDesc(container);
      if (section === "actions") this.createActions(container);
      if (section === "collapsible") this.createCollpase(container);
      if (section === "image") this.createImage(container);
      if (section === "price" || section === "date" || section === "author") this.createPlainText(container, section);
      if (section === "form") this.createForm(container);
      this.append(container);
    }
  }
  createCardSections() {
    const sections = ["title", "description"];
    switch (this.cardType) {
      case "notification":
      case "collapsible":
        sections.push("actions");
        if (this.cardType === "collapsible") sections.push("collapsible");
        break;
      case "blog":
      case "gallery":
      case "image":
      case "product":
      case "profile":
        sections.push("image", "actions");
        if (this.cardType === "blog") sections.push("author", "date");
        if (this.cardType === "product") sections.push("price");
        break;
      case "metric":
        sections.push("price");
        break;
      case "interactive":
        sections.push("form");
        break;
    }
    return sections;
  }
  createCardSection(name) {
    const div = this.cElem("div");
    div.className = name;
    return div;
  }
  createTitle(ref) {
    const header = this.cElem("h3");
    header.innerText = this.data.title;
    ref.append(header);
  }
  createDesc(ref) {
    const para = this.cElem("p");
    para.innerHTML = this.data.description;
    ref.append(para);
  }
  createImage(ref) {
    if ("image" in this.data) {
      if (this.cardType === "profile") {
        ref.append(new Avatar(this.data.image));
      } else {
        const img = this.cElem("img");
        img.src = `${this.data.image}`;
        img.alt = this.cardType;
        ref.append(img);
      }
    }
  }
  createActions(ref) {
    if ("actions" in this.data) {
      for (const action of this.data.actions) {
        const btn = this.cElem("button");
        btn.type = action.type;
        btn.innerHTML = action.text;
        btn.onclick = () => action.cb(this.data);
        ref.append(btn);
      }
    }
  }
  createCollpase(ref) {
    if ("collapsible" in this.data) ref.append(new Collapsible(this.data.collapsible));
  }
  createPlainText(ref, key) {
    if (key in this.data) {
      const span = this.cElem("span");
      span.innerHTML = `${this.data[key]}`;
      ref.append(span);
    }
  }
  createForm(ref) {
    if ("form" in this.data) ref.append(new Form(this.data.form.map, this.data.form.btns));
  }
}, __name(_F, "Card"), _F);
Card = __decorateClass$9([
  ModuleDecorator
], Card);
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$8");
let Footer = (_G = class extends Module {
  /**
   * Constructs a new Footer instance.
   *
   * @param config - The configuration object for the footer, containing details
   *                 about each section to be rendered.
   * @param appState - The application state object, used to manage and respond
   *                   to state changes related to the footer.
   */
  constructor(config, appState) {
    super(config, appState);
    this.config = config;
    this.appState = appState;
  }
  /**
   * Initializes the footer by creating its sections based on the configuration.
   * Checks for the presence of each section in the configuration and calls the
   * corresponding creation method if the section is defined.
   */
  init() {
    if (this.config.about) this.createAbout();
    if (this.config.links) this.createLinks();
    if (this.config.contact) this.createContact();
    if (this.config.socials) this.createSocials();
    if (this.config.copyrights) this.createCopyrights();
  }
  /**
   * Creates an about section in the footer.
   * It creates a 'div' element with the class 'about', and a 'h4' element with the text 'about us'.
   * Then it creates a new 'Link' component for each sector provided in the config's 'about' property,
   * and appends it to the 'about' container.
   * Finally it appends the 'about' container to the footer container.
   */
  createAbout() {
    const about = this.cElem("div");
    about.className = "about";
    const h4 = this.createSubHeader("about us");
    about.append(h4, ...Object.entries(this.config.about).map(([sector, text]) => new Link({ text, href: `/about-us#${sector}` }, (path) => this.appState.publish(StateKeys.navigate, path))));
    this.append(about);
  }
  /**
   * Creates a links section in the footer.
   * It creates a 'div' element with the class 'links', and a 'h4' element with the text 'site links'.
   * Then it creates a new 'Link' component for each link provided in the config, and appends it to the 'links' container.
   * Finally it appends the 'links' container to the footer component.
   */
  createLinks() {
    const [links] = this.cAlot([{ tag: "div", cls: "container links" }]);
    links.append(this.createSubHeader("site links"), ...this.config.links.map((link) => new Link(link, (path) => this.appState.publish(StateKeys.navigate, path))));
    this.append(links);
  }
  /**
   * Creates a contact section in the footer.
   * - Initializes a container for the contact section.
   * - Adds a header with the text 'get in touch'.
   * - Appends a form using the configured map and buttons.
   * - Appends the contact section to the footer.
   */
  createContact() {
    const [contact] = this.cAlot([{ tag: "div", cls: "container contact" }]);
    contact.append(this.createSubHeader("get in touch"), new Form(this.config.contact.map, this.config.contact.btns));
    this.append(contact);
  }
  /**
   * Creates and appends a container for social media links to the footer.
   * The container is assigned the 'socials' class and its inner HTML is set
   * to display the social media links from the footer configuration.
   * Each link is represented by an anchor tag with an href attribute set
   * to the corresponding link, and an i tag with a class set to the
   * corresponding social media platform (e.g. 'fb', 'tw', 'ig', etc.).
   */
  createSocials() {
    const [socials] = this.cAlot([{ tag: "div", cls: "container socials" }]);
    socials.append(this.createSubHeader("follow us"), ...Object.entries(this.config.socials).map(([social, link]) => `<a href="${link}"><i class="${social}"></i></a>`));
    this.append(socials);
  }
  /**
   * Creates and appends a container for copyright information to the footer.
   * The container is assigned the 'copyrights' class and its inner HTML is set
   * to display the copyright text from the footer configuration.
   */
  createCopyrights() {
    const [rights] = this.cAlot([{ tag: "div", cls: "container copyrights" }]);
    rights.innerHTML = `&copy; ${this.config.copyrights}`;
    this.append(rights);
  }
  /**
   * Creates a subheader 'h4' element with the provided text and returns it.
   * @param text - The text to be displayed in the subheader.
   * @returns The created subheader element.
   */
  createSubHeader(text) {
    const subHeader = this.cElem("h4");
    subHeader.innerText = text;
    return subHeader;
  }
}, __name(_G, "Footer"), _G);
Footer = __decorateClass$8([
  ModuleDecorator
], Footer);
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$7");
let Header = (_H = class extends Component {
  init() {
    const [header, subHeader] = this.cAlot([{ tag: "h1" }, { tag: "h3" }]);
    header.innerHTML = this.config.header;
    subHeader.innerHTML = this.config.subHeader;
    this.append(header, subHeader);
  }
}, __name(_H, "Header"), _H);
Header = __decorateClass$7([
  ComponentDecorator
], Header);
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$6");
let Hero = (_I = class extends Module {
  constructor(texts, pageState) {
    super(texts);
    this.texts = texts;
    this.pageState = pageState;
  }
  init() {
    this.style.backgroundImage = `url(${this.texts.img})`;
    this.append(new Header(this.texts));
    if (this.texts.anchor?.text && this.texts.anchor?.href)
      this.append(new Link(this.texts.anchor, () => this.pageState.publish(StateKeys.navigate, this.texts.anchor?.href)));
  }
}, __name(_I, "Hero"), _I);
Hero = __decorateClass$6([
  ModuleDecorator
], Hero);
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$5");
let Navbar = (_J = class extends Module {
  constructor(pages, parentState, type = "top") {
    super(pages, parentState);
    this.pages = pages;
    this.parentState = parentState;
    this.type = type;
    this.classList.add(type);
  }
  links = [];
  init() {
    this.linksCreator();
    if (!this.links.length) {
      document.documentElement.style.setProperty("--pageBlockPad", "0");
      this.remove();
    }
    this.linksRenderer();
    if (window.screen.width <= 480) this.createHamburger();
    if (window.screen.width > 480 && this.type === "top") this.createExtender();
    setTimeout(this.setActive.bind(this));
    window.addEventListener("popstate", this.setActive.bind(this));
    this.parentState.subscribe(StateKeys.navigate, this.setActive.bind(this));
  }
  linksCreator(arrRef = this.links, pages = this.pages) {
    if (Array.from(pages).length === 1) return;
    for (const page of pages) {
      if (typeof page === "string") {
        const text = page.slice(1).addSpaces("uppercase").titleCase();
        arrRef.push(new Link({ href: page, text }, () => this.parentState.publish(StateKeys.navigate, page)));
      } else {
        Object.keys(page).forEach((key) => {
          const subLink = [];
          this.linksCreator(subLink, page[key]);
          arrRef.push(new Extender(subLink, key.slice(1)));
        });
      }
    }
  }
  static isILink(item) {
    return typeof item === "object" && "text" in item && "href" in item;
  }
  linksRenderer() {
    const container = this.cElem("div");
    container.className = "links";
    container.append(...this.links);
    this.append(container);
  }
  createHamburger() {
    const hamburger = this.cElem("div");
    hamburger.className = "hamburger";
    for (const _ of new Array(3).fill(null)) hamburger.append(this.cElem("span"));
    hamburger.onclick = () => {
      hamburger.classList.toggle("active");
      this.classList.toggle("show");
    };
    for (const link of Array.from(this.clsElem("link")))
      link.addEventListener("click", () => hamburger.click());
    this.prepend(hamburger);
  }
  createExtender() {
    const links = this.clsElem("links")[0];
    if (links.clientHeight > 50) {
      const linksCollect = this.clsElem("link");
      let linksWidth = 0;
      for (const link of Array.from(linksCollect)) linksWidth += +link.getBoundingClientRect().width.toFixed(2);
      const idx = Math.floor(window.screen.width / (linksWidth / linksCollect.length)) - 1;
      const toRemove = Array.from(links.children).splice(idx);
      for (const link of toRemove) links.removeChild(link);
      this.clsElem("links")[0].append(new Extender(toRemove, "dots"));
    }
  }
  setActive() {
    const links = Array.from(this.clsElem("link"));
    for (const link of links)
      if (link instanceof Link) link.activateMe();
  }
}, __name(_J, "Navbar"), _J);
Navbar = __decorateClass$5([
  ModuleDecorator
], Navbar);
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$4");
let Table = (_K = class extends Module {
  constructor(data) {
    super(data);
    this.data = data;
  }
  init() {
    this.createHead();
    this.createBody();
  }
  createHead() {
    const [head, tr] = this.cAlot([{ tag: "thead" }, { tag: "tr" }]);
    this.data.columns.forEach((col) => {
      tr.innerHTML += `<th>${col}</th>`;
    });
    head.append(tr);
    this.append(head);
  }
  createBody() {
    const body = this.cElem("tbody");
    this.data.rows.forEach((row) => {
      const tr = this.cElem("tr");
      const arr = new Array(this.data.columns.length);
      for (const cell of row) arr[this.data.columns.indexOf(cell.field)] = cell.data;
      arr.forEach((cell) => {
        tr.innerHTML += `<td>${cell}</td>`;
      });
      body.append(tr);
    });
    this.append(body);
  }
}, __name(_K, "Table"), _K);
Table = __decorateClass$4([
  ModuleDecorator
], Table);
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$3");
let AboutUs = (_L = class extends Page {
  async init() {
    const container = new Fluid();
    const para = this.cElem("p");
    para.innerText = this.texts.MISSION;
    container.append(new Seperator(this.texts.SEPERATORS.mission), para, new Seperator(this.texts.SEPERATORS.team));
    this.append(new Header(this.texts.HEADER), container);
    for (const card of this.texts.CARDS) container.append(new Card("profile", card));
    super.init();
    this.showPage();
  }
}, __name(_L, "AboutUs"), _L);
AboutUs = __decorateClass$3([
  PageDecorator
], AboutUs);
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$2");
let ContactUs = (_M = class extends Page {
  async init() {
    const fluid = new Fluid();
    const intro = this.cElem("p");
    intro.classList.add("intro");
    intro.innerText = this.texts.INTRO;
    this.createBlocks(fluid);
    fluid.append(this.createForm());
    this.append(new Header(this.texts.HEADER), intro, fluid);
    super.init();
    this.showPage();
  }
  createBlocks(fluid) {
    for (const block of this.texts.BLOCKS) {
      const [conatainer, header] = this.cAlot([{ tag: "div", cls: "contanier contact-method" }, { tag: "h3" }]);
      header.innerText = block.header;
      const paras = this.cAlot(block.content.map(() => ({ tag: "p" })));
      for (let idx = 0; idx < block.content.length; idx++) paras[idx].innerHTML = block.content[idx];
      conatainer.append(header, ...paras);
      fluid.append(conatainer);
    }
  }
  createForm() {
    const map = {
      legend: "you can nag us directly",
      fields: {
        name: {
          type: "input",
          props: {
            name: "name",
            placeholder: "Your Name",
            required: true
          }
        },
        subject: {
          type: "input",
          props: {
            name: "subject",
            placeholder: "Subject",
            required: true
          }
        },
        email: {
          type: "input",
          props: {
            name: "email",
            placeholder: "Email",
            required: true
          }
        },
        message: {
          type: "textarea",
          props: {
            name: "message",
            placeholder: "Message",
            required: true
          }
        }
      }
    };
    const btns = [
      { text: "send", type: "submit", cb: /* @__PURE__ */ __name(() => alert("The Matrix has you!"), "cb") }
    ];
    return new Form(map, btns);
  }
}, __name(_M, "ContactUs"), _M);
ContactUs = __decorateClass$2([
  PageDecorator
], ContactUs);
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass$1");
let Counter = (_N = class extends Component {
  _value = 0;
  field = this.cElem("span");
  set value(newVal) {
    this.uElem("field", this._value = newVal);
  }
  init() {
    this.createHeader();
    const [container, add, sub] = this.cAlot([{ tag: "div", cls: "container counter" }, { tag: "span", cls: "add" }, { tag: "span", cls: "sub" }]);
    this.value = this._value;
    this.field.className = "value";
    add.innerHTML = "+";
    add.onclick = () => this.value = ++this._value;
    sub.innerHTML = "-";
    sub.onclick = () => this.value = --this._value;
    container.append(add, this.field, sub);
    this.append(container);
    this.createSnippet();
  }
  createHeader() {
    const header = this.cElem("h2");
    header.innerText = "This is a counter:";
    this.append(header);
  }
  createSnippet() {
    const header = this.cElem("h3");
    header.innerText = "This is the snippet:";
    const samp = this.cElem("code");
    samp.innerText = Counter.toString();
    this.append(header, samp);
  }
}, __name(_N, "Counter"), _N);
Counter = __decorateClass$1([
  ComponentDecorator
], Counter);
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
}, "__decorateClass");
let Home = (_O = class extends Page {
  init() {
    this.append(new Hero(this.texts.HERO, this.appState), new Counter({}));
    super.init();
    this.showPage();
  }
}, __name(_O, "Home"), _O);
Home = __decorateClass([
  PageDecorator
], Home);
const appConfig = {
  siteURL: "https://vanilla.com",
  // Replace with your site's actual URL
  routes: /* @__PURE__ */ new Map([
    ["/home", Home],
    ["/contact-us", ContactUs],
    ["/about-us", AboutUs]
  ]),
  meta: {
    description: "Welcome to Vanilla, a fast and reliable web development frame.",
    keywords: "Vanilla, framework, fast development",
    author: "Adam Golan"
  }
};
const _Navigation = class _Navigation {
  /**
   * Constructor for Navigation.
   *
   * @param state The state object that handles all state changes.
   * @param ref The root element of the application.
   * @param pages The list of pages to be used in the navigation.
   * @param basePath The base path for all navigation (default is '/').
   */
  constructor(state, ref, pages, basePath = "/") {
    this.state = state;
    this.ref = ref;
    this.pages = pages;
    this.basePath = basePath;
    this.tree = this.createTree();
    this.subscribes();
    this.homePage = pages.keys().next().value || "/home";
    if (this.basePath.endsWith("/")) this.basePath = this.basePath.slice(0, -1);
  }
  loader = new Loader({});
  currentPage;
  history = [];
  tree;
  homePage;
  // ------------------------------
  // Initiation section.
  // ------------------------------
  /**
   * Subscribes to the state events.
   *
   * Page Navigation - listen to the StateKeys.navigate event and call the loadingProcess function with the given path.
   * Load Page - listen to the StateKeys.contentReady event and replace the loader with the loaded page.
   * History - listen to the popstate event and go to the previous page if it exists.
   * Hashchange - listen to the hashchange event and replace the state with the new path.
   */
  subscribes() {
    const splitPath = /* @__PURE__ */ __name(() => location.pathname.split("/").filter(Boolean), "splitPath");
    this.state.subscribe(StateKeys.navigate, (path) => this.loadingProcess(path));
    this.state.subscribe(`${this.basePath}:${StateKeys.contentReady}`, () => !this.basePath.length && splitPath().length > 1 ? null : this.currentPage ? this.ref.replaceChild(this.currentPage, this.loader) : null);
    window.addEventListener("popstate", () => {
      if (!!location.hash) return;
      if (this.basePath === location.pathname) return;
      this.loadingProcess(location.pathname);
    });
  }
  /**
   * Creates a tree structure for the pages based on the provided pages object.
   * Each key in the object is a page, and the value is either the path to the page or another object containing the subpages.
   * The returned tree is an array of strings and objects, where each string is a page path, and each object is a page with its subpages.
   * @param pages - The pages object to create the tree from. Defaults to the pages object provided in the constructor.
   * @returns The tree structure for the pages.
   */
  createTree(pages = this.pages) {
    const tree = [];
    pages.forEach((value, key) => {
      value.getPages ? tree.push({ [key]: this.createTree(value.getPages()) }) : tree.push(key);
    });
    return tree;
  }
  // ------------------------------
  // Loading section.
  // ------------------------------
  /**
   * Reloads the current page.
   * Replaces the current page with the loader element and calls the navigation logic with the current path.
   * @remarks
   * This method is useful when you want to reload the page without pushing a new state to the browser's history.
   */
  reload() {
    this.ref.replaceChildren(this.loader);
    this.navigationLogic();
  }
  /**
   * Initializes the loading process of the page.
   * If the current path is the base path, it pushes the home page to the history.
   * Removes all children of the ref element except the navbar.
   * Appends the loader to the ref.
   * Calls the navigation logic with the current path.
  */
  firstLoad() {
    if (this.basePath === location.pathname) return;
    Array.from(this.ref.children).forEach((child) => !child.classList.contains("navbar") ? this.ref.removeChild(child) : null);
    this.ref.replaceChildren(this.loader);
    this.navigationLogic();
  }
  /**
   * Loads the page by given path.
   * If the page with given path is already loaded, it does nothing.
   * If the page with given path is not found, it loads the homepage.
   * If the page with given path is not cached, it creates a new instance
   * of the page and caches it.
   * It also updates the browser's address bar and the page's title.
   * @param path - The path to navigate to.
   */
  loadingProcess(path) {
    const slashIdx = path.lastIndexOf("/");
    if (!this.tree.includes(path.slice(slashIdx))) return;
    path = slashIdx ? path.slice(slashIdx) : this.searchFullPath(path) || this.homePage;
    this.ref.replaceChildren(this.loader);
    this.navigationLogic(path);
  }
  /**
   * Navigates to the given path by setting the page's title and content.
   * If the page is already cached, it simply replaces the current page
   * with the cached one. If the page is not cached, it creates a new instance
   * of the page and caches it.
   * @param path - The path to navigate to.
   */
  navigationLogic(path = location.pathname) {
    path = this.findPage(path);
    document.title = `${appConfig.siteURL.replace(/(https?:\/\/|www\.)/, "").sliceTo(".").titleCase()} | ${path.slice(1).addSpaces("-").titleCase()}`;
    if (document.title.indexOf("|") === document.title.length - 1) document.title = document.title.replace("|", "");
    const Page2 = this.pages.get(path);
    if (this.currentPage && Page2.name === this.currentPage.constructor.name && !location.pathname.includes(path)) return;
    const texts = this.state.get(StateKeys.texts).getTexts(path.remove(/(\-|\/)/));
    this.currentPage = new Page2(texts, this.state);
    this.pushState(path);
  }
  // ------------------------------
  // Utilities.
  // ------------------------------
  /**
   * Searches for the given path in the tree of pages and returns the full path
   * if the path is found, otherwise returns null.
   * 
   * @param path - The path to be searched.
   * @param tree - The tree of pages to search in. Defaults to the tree of pages
   *              provided during construction.
   * @returns The full path if the path is found, otherwise null.
   */
  searchFullPath(path, tree = this.tree) {
    const fullPath = [];
    for (const branch of tree) {
      if (typeof branch !== "string")
        for (const key of Object.keys(branch)) {
          const result = this.searchFullPath(path, branch[key]);
          if (result) fullPath.push(key, result);
        }
      else if (branch === path) fullPath.push(path);
    }
    return fullPath.length ? fullPath.join("") : null;
  }
  /**
   * Determines the appropriate page path based on the provided path.
   * 
   * @param path - The URL path to be evaluated.
   * @returns The first matching sub-path from the pages or the home page
   *          if no match is found or if the path equals the base path.
   */
  findPage(path = location.pathname) {
    if (path === this.basePath) return this.homePage;
    const pathArr = path.slice(1).split("/");
    for (let i = 0; i < pathArr.length; i++) if (this.pages.has(`/${pathArr[i]}`)) return `/${pathArr[i]}`;
    return this.homePage;
  }
  /**
   * Pushes the given path to the browser's navigation history and updates the URL
   * in the browser's address bar. This method is called by the loadingProcess method
   * and should not be called directly.
   * @param path - The path to push to the navigation history.
   */
  pushState(path) {
    if (path.endsWith("/")) path = path.slice(0, -1);
    if (!location.pathname.includes(path)) {
      this.history.push(path);
      window.history.pushState(null, "", this.basePath.length ? `${location.pathname}${path}` : path);
    }
  }
  /**
   * Logs information about the navigation process for debugging purposes.
   * @param fnName The name of the function that calls this method.
   * @param path The path being navigated to.
   */
  log(fnName, path) {
    console.log("base path: ", this.basePath, `
${fnName}: `, path, "\n-----------------------------");
  }
};
__name(_Navigation, "Navigation");
let Navigation = _Navigation;
const _AppError = class _AppError extends Error {
  constructor(message, code, component, details) {
    super(message);
    this.code = code;
    this.component = component;
    this.details = details;
    this.name = "AppError";
  }
};
__name(_AppError, "AppError");
let AppError = _AppError;
const _ErrorBoundary = class _ErrorBoundary {
  errorHandlers = [];
  errorLog = [];
  maxLogSize = 100;
  constructor() {
    this.setupGlobalHandlers();
  }
  /**
   * Gets the singleton instance of ErrorBoundary
   */
  static getInstance() {
    if (!_ErrorBoundary.instance) {
      _ErrorBoundary.instance = new _ErrorBoundary();
    }
    return _ErrorBoundary.instance;
  }
  /**
   * Sets up global error and rejection handlers
   */
  setupGlobalHandlers() {
    window.addEventListener("error", (event) => {
      this.handleError({
        message: event.message,
        severity: "error",
        timestamp: /* @__PURE__ */ new Date(),
        error: event.error,
        stack: event.error?.stack
      });
      event.preventDefault();
    });
    window.addEventListener("unhandledrejection", (event) => {
      const error = event.reason;
      if (error instanceof APIError) {
        this.handleError({
          message: `API Error: ${error.message}`,
          severity: error.status >= 500 ? "critical" : "error",
          timestamp: /* @__PURE__ */ new Date(),
          error,
          component: "API"
        });
      } else if (error instanceof AppError) {
        this.handleError({
          message: error.message,
          severity: "error",
          timestamp: /* @__PURE__ */ new Date(),
          error,
          component: error.component
        });
      } else {
        this.handleError({
          message: error instanceof Error ? error.message : String(error),
          severity: "error",
          timestamp: /* @__PURE__ */ new Date(),
          error: error instanceof Error ? error : void 0,
          stack: error instanceof Error ? error.stack : void 0
        });
      }
      event.preventDefault();
    });
  }
  /**
   * Handles an error and notifies all registered handlers
   */
  handleError(errorInfo) {
    this.errorLog.push(errorInfo);
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }
    const logMethod = this.getLogMethod(errorInfo.severity);
    logMethod(
      `[${errorInfo.severity.toUpperCase()}]${errorInfo.component ? ` [${errorInfo.component}]` : ""} ${errorInfo.message}`,
      errorInfo.error || "",
      errorInfo.stack || ""
    );
    this.errorHandlers.forEach((handler) => {
      try {
        handler(errorInfo);
      } catch (err) {
        console.error("Error in error handler:", err);
      }
    });
  }
  /**
   * Gets the appropriate console method based on severity
   */
  getLogMethod(severity) {
    switch (severity) {
      case "info":
        return console.info;
      case "warning":
        return console.warn;
      case "error":
      case "critical":
        return console.error;
      default:
        return console.log;
    }
  }
  /**
   * Registers an error handler
   * @returns Unsubscribe function
   */
  onError(handler) {
    this.errorHandlers.push(handler);
    return () => {
      const index = this.errorHandlers.indexOf(handler);
      if (index > -1) {
        this.errorHandlers.splice(index, 1);
      }
    };
  }
  /**
   * Gets the error log
   */
  getErrorLog() {
    return [...this.errorLog];
  }
  /**
   * Clears the error log
   */
  clearErrorLog() {
    this.errorLog = [];
  }
  /**
   * Manually report an error
   */
  reportError(error, component, severity = "error") {
    this.handleError({
      message: error.message,
      severity,
      timestamp: /* @__PURE__ */ new Date(),
      error,
      component,
      stack: error.stack
    });
  }
};
__name(_ErrorBoundary, "ErrorBoundary");
__publicField(_ErrorBoundary, "instance");
let ErrorBoundary = _ErrorBoundary;
ErrorBoundary.getInstance();
const _Main = class _Main {
  // App element.
  app = document.getElementById("app") ?? this.createApp();
  // Services.
  appState = new State();
  navigation = new Navigation(this.appState, this.app, appConfig.routes);
  // Elements.
  constructor() {
    const i18n = new Language();
    const pref = new Preference();
    this.appState.set(StateKeys.preferences, pref);
    this.appState.set(StateKeys.texts, i18n);
    pref.getLang().then((lang) => i18n.importTexts(lang).then((_) => this.init()));
    setMetaTags(appConfig.meta);
    if (appConfig.OGCard) setOpenGraphTags(appConfig.OGCard);
  }
  /**
   * Creates an 'app' element if it doesn't exist.
   * @returns - 'app' element.
   */
  createApp() {
    const app = document.createElement("div");
    app.id = "app";
    document.body.replaceChildren(app);
    return app;
  }
  /**
   * Initializes the application.
   * Adds a Navbar to the application's 'app' element and subscribes to events.
   * @returns - Nothing.
   */
  init() {
    document.body.append(new Navbar(this.navigation.tree, this.appState));
    this.navigation.firstLoad();
    this.subscribes();
  }
  /**
   * Subscribes to events.
   * Creates a modal if StateKeys.openModal is emitted, and removes it if StateKeys.closeModal is emitted.
   * @returns - Nothing.
   */
  subscribes() {
    const modals = {};
    this.appState.subscribe(StateKeys.openModal, ({ key, content }) => {
      if (modals[key]) return;
      this.appState.set(`${key}:${StateKeys.checkModal}`, true);
      modals[key] = new Modal(this.app.append.bind(this.app), content, () => (delete modals[key], this.appState.set(`${key}:${StateKeys.checkModal}`, false)));
    });
  }
};
__name(_Main, "Main");
let Main = _Main;
new Main();
