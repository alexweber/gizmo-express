import _isObject = require('lodash.isobject');
import escape = require('validator/lib/escape');
import trim = require('validator/lib/trim');

const createDOMPurify = require('dompurify');
import * as jsdom from 'jsdom';
const window = jsdom.jsdom('', {
  features: {
    FetchExternalResources: false,
    ProcessExternalResources: false
  }
}).defaultView;
const DOMPurify = createDOMPurify(window);

/**
 * Sanitizes strings.
 */
const sanitizeString = function (str: string, html = false): string {
  // Coerce to string to avoid errors.
  let cleanStr = '' + str;
  if (!html) {
    cleanStr = escape(cleanStr);
  }
  return DOMPurify.sanitize(trim(cleanStr));
};

/**
 * Sanitizes simple values. Objects will get mangled.
 */
const sanitizeSimple = function (val: any, html = false): any {
  switch (typeof val) {
    case 'boolean':
    case 'number':
    case 'undefined':
      // Don't type-cast these.
      // @TODO verify this is safe.
      return val;

    case 'function':
    case 'symbol':
    case 'object':
      // These should never occur except for typeof null === "object".
      return null;

    default:
      return sanitizeString('' + val, html);
  }
};

/**
 * Sanitizes an array recursively.
 */
const sanitizeArray = function (arr: any[], html = false): any[] {
  return arr.map(val => {
    if (Array.isArray(val)) {
      return sanitizeArray(val, html);
    } else if (_isObject(val)) {
      /* tslint:disable:no-use-before-declare */
      return sanitizeObject(val, html);
      /* tslint:enable:no-use-before-declare */
    } else {
      return sanitizeSimple(val, html);
    }
  });
};

/**
 * Sanitizes an object recursively.
 */
const sanitizeObject = function (obj: Object, html = false): Object {
  const cleanObj = {};
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      cleanObj[key] = sanitizeArray(obj[key], html);
    } else if (_isObject(obj[key])) {
      cleanObj[key] = sanitizeObject(obj[key], html);
    } else {
      cleanObj[key] = sanitizeSimple(obj[key], html);
    }
  });
  return cleanObj;
};

/**
 * Sanitize any value recursively, preserving data types.
 */
const sanitize = function (input: any, html = false): any {
  if (typeof input === 'function') {
    return null;
  } else if (Array.isArray(input)) {
    return sanitizeArray(input, html);
  } else if (_isObject(input)) {
    return sanitizeObject(input, html);
  } else {
    return sanitizeSimple(input, html);
  }
};

export default sanitize;
