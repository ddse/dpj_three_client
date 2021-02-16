// FORã€€EKC 20201124ã€€IE11ã¯ES 2015ã€2016ã€€ã‚’å¯¾å¿œã™ã‚‹ç‚ºã«ã€ã‚½ãƒ¼ã‚¹ã‚’å¤‰æ›ã™ã‚‹
// missing forEach on NodeList for IE11

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
} //ARRAY FROM IE11å¯¾å¿œã—ãªã„ãŸã‚ã€ãƒ¡ã‚½ãƒƒãƒ‰ã‚’è¿½åŠ ã™ã‚‹

if (!Array.from) {
    Array.from = (function() {
        var symbolIterator;

        try {
            symbolIterator = Symbol.iterator ?
                Symbol.iterator :
                "Symbol(Symbol.iterator)";
        } catch (error) {
            symbolIterator = "Symbol(Symbol.iterator)";
        }

        var toStr = Object.prototype.toString;

        var isCallable = function isCallable(fn) {
            return typeof fn === "function" || toStr.call(fn) === "[object Function]";
        };

        var toInteger = function toInteger(value) {
            var number = Number(value);
            if (isNaN(number)) return 0;
            if (number === 0 || !isFinite(number)) return number;
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };

        var maxSafeInteger = Math.pow(2, 53) - 1;

        var toLength = function toLength(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        var setGetItemHandler = function setGetItemHandler(isIterator, items) {
            var iterator = isIterator && items[symbolIterator]();
            return function getItem(k) {
                return isIterator ? iterator.next() : items[k];
            };
        };

        var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
            // 16. Let k be 0.
            var k = 0; // 17. Repeat, while k < lenâ€¦ or while iterator is done (also steps a - h)

            while (k < len || isIterator) {
                var item = getItem(k);
                var kValue = isIterator ? item.value : item;

                if (isIterator && item.done) {
                    return A;
                } else {
                    if (mapFn) {
                        A[k] =
                            typeof T === "undefined" ?
                            mapFn(kValue, k) :
                            mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                }

                k += 1;
            }

            if (isIterator) {
                throw new TypeError(
                    "Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1"
                );
            } else {
                A.length = len;
            }

            return A;
        }; // The length property of the from method is 1.

        return function from(
            arrayLikeOrIterator
            /*, mapFn, thisArg */
        ) {
            // 1. Let C be the this value.
            var C = this; // 2. Let items be ToObject(arrayLikeOrIterator).

            var items = Object(arrayLikeOrIterator);
            var isIterator = isCallable(items[symbolIterator]); // 3. ReturnIfAbrupt(items).

            if (arrayLikeOrIterator == null && !isIterator) {
                throw new TypeError(
                    "Array.from requires an array-like object or iterator - not null or undefined"
                );
            } // 4. If mapfn is undefined, then let mapping be false.

            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;

            if (typeof mapFn !== "undefined") {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError(
                        "Array.from: when provided, the second argument must be a function"
                    );
                } // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.

                if (arguments.length > 2) {
                    T = arguments[2];
                }
            } // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).

            var len = toLength(items.length); // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).

            var A = isCallable(C) ? Object(new C(len)) : new Array(len);
            return getArray(
                T,
                A,
                len,
                setGetItemHandler(isIterator, items),
                isIterator,
                mapFn
            );
        };
    })();
}

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        "use strict";

        if (typeof start !== "number") {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
/* globals  */

export const _readOnlyError = (name) => {
    throw new Error('"' + name + '" is read-only');
}; // let vm = null;

export const debounce = (fn /*, delay*/ ) => {
    // return fn.apply(that, args);
    var isBrowser =
        typeof window !== "undefined" && typeof document !== "undefined";
    var longerTimeoutBrowsers = ["Edge", "Trident", "Firefox"];
    var supportsMicroTasks = isBrowser && window.Promise;
    var timeoutDuration = 0;

    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (
            isBrowser &&
            navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0
        ) {
            timeoutDuration = 100;
            break;
        }
    }

    if (supportsMicroTasks) {
        var called = false;
        return function() {
            if (called) {
                return;
            }

            called = true;
            window.Promise.resolve().then(function() {
                called = false;
                fn();
            });
        };
    } else {
        var scheduled = false;
        return function() {
            if (!scheduled) {
                scheduled = true;
                setTimeout(function() {
                    scheduled = false;
                    fn();
                }, timeoutDuration);
            }
        };
    } // var timeoutID = null
    // return function() {
    //     clearTimeout(timeoutID)
    //     var args = arguments
    //     var that = this
    //     timeoutID = setTimeout(function() {
    //         fn.apply(that, args)
    //     }, delay)
    // }
};

export default {
    debounce
}