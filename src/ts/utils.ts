//axiox的utils部分方法
// utils is a library of generic helper functions non-specific to axios

var toDString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val: any) {
  return toDString.call(val) === "[object Array]";
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined(val: any) {
  return typeof val === "undefined";
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
export function isBuffer(val: any) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    typeof val.constructor.isBuffer === "function" &&
    val.constructor.isBuffer(val)
  );
}

export function fileToBlob(file: File, callback: Function) {
  const type = file.type;
  const reader = new FileReader();
  reader.onload = function (evt) {
    const blob = new Blob([evt?.target?.result!], { type });
    if (typeof callback === "function") {
      callback(blob);
    } else {
      console.log("我是 blob:", blob);
    }
  };
  reader.readAsDataURL(file);
}

/**
 * make the File to Base64String
 * @param file  the File Object
 */
export function fileToBase64(
  file: File,
  progress?: (ev: ProgressEvent) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      if (progress) {
        reader.onprogress = function (evt) {
          progress(evt);
        };
      }
      reader.onload = function (evt) {
        const res = evt?.target?.result;
        resolve(res as string);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * remove base64 spare descriptions
 * @param dataUrl A Base64String
 * @returns
 */
export function base64Content(dataUrl: string): string {
  return dataUrl.replace(/data:(.*);base64,/, "");
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
export function isArrayBuffer(val: any) {
  return toDString.call(val) === "[object ArrayBuffer]";
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
export function isFormData(val: any) {
  return typeof FormData !== "undefined" && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
export function isArrayBufferView(val: any) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString(val: any) {
  return typeof val === "string";
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber(val: any) {
  return typeof val === "number";
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val: any) {
  return val !== null && typeof val === "object";
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
export function isPlainObject(val: any) {
  if (toDString.call(val) !== "[object Object]") {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function isDate(val: any) {
  return toDString.call(val) === "[object Date]";
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
export function isFile(val: any) {
  return toDString.call(val) === "[object File]";
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
export function isBlob(val: any) {
  return toDString.call(val) === "[object Blob]";
}
