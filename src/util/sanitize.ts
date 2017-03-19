import _isObject = require('lodash.isobject');
import escape = require('validator/lib/escape');
import trim = require('validator/lib/trim');

const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const window = jsdom.jsdom('', {
  features: {
    FetchExternalResources: false,
    ProcessExternalResources: false
  }
}).defaultView;
const DOMPurify = createDOMPurify(window);

/**
 * Sanitizes strings, numbers and other simple values.
 */
const sanitizeString = function (str: string|number): string {
  // Coerce to string to avoid errors.y
  return DOMPurify.sanitize(trim(escape('' + str)));
};

/**
 * Sanitizes an array recursively.
 */
const sanitizeArray = function (arr: any[]): any[] {
  return arr.map(val => {
    if (Array.isArray(val)) {
      return sanitizeArray(val);
    } else if (_isObject(val)) {
      return sanitizeObject(val);
    } else {
      return sanitizeString(val);
    }
  });
};

/**
 * Sanitizes an object recursively.
 */
const sanitizeObject = function (obj: Object): Object {
  const cleanObj = {};
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      cleanObj[key] = sanitizeArray(obj[key]);
    } else if (_isObject(obj[key])) {
      cleanObj[key] = sanitizeObject(obj[key]);
    } else {
      cleanObj[key] = sanitizeString(obj[key]);
    }
  });
  return cleanObj;
};

/**
 * Sanitize any data structure recursively.
 */
const sanitize = function (input: any): any {
  if (Array.isArray(input)) {
    return sanitizeArray(input);
  } else if (_isObject(input)) {
    return sanitizeObject(input);
  }
  return sanitizeString(input);
};

export default sanitize;
