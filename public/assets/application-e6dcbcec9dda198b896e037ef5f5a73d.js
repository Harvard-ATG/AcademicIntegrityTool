/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
// 4.1.3 (2014-07-29)
!function(e,t){"use strict";function n(e,t){for(var n,r=[],i=0;i<e.length;++i){if(n=s[e[i]]||o(e[i]),!n)throw"module definition dependecy not found: "+e[i];r.push(n)}t.apply(null,r)}function r(e,r,i){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(r===t)throw"invalid module definition, dependencies must be specified";if(i===t)throw"invalid module definition, definition function must be specified";n(r,function(){s[e]=i.apply(null,arguments)})}function i(e){return!!s[e]}function o(t){for(var n=e,r=t.split(/[.\/]/),i=0;i<r.length;++i){if(!n[r[i]])return;n=n[r[i]]}return n}function a(n){for(var r=0;r<n.length;r++){for(var i=e,o=n[r],a=o.split(/[.\/]/),l=0;l<a.length-1;++l)i[a[l]]===t&&(i[a[l]]={}),i=i[a[l]];i[a[a.length-1]]=s[o]}}var s={},l="tinymce/dom/EventUtils",c="tinymce/dom/Sizzle",u="tinymce/util/Tools",d="tinymce/Env",f="tinymce/dom/DomQuery",p="tinymce/html/Styles",h="tinymce/dom/TreeWalker",m="tinymce/dom/Range",g="tinymce/html/Entities",v="tinymce/dom/StyleSheetLoader",y="tinymce/dom/DOMUtils",b="tinymce/dom/ScriptLoader",C="tinymce/AddOnManager",x="tinymce/dom/RangeUtils",w="tinymce/NodeChange",_="tinymce/html/Node",E="tinymce/html/Schema",N="tinymce/html/SaxParser",k="tinymce/html/DomParser",S="tinymce/html/Writer",T="tinymce/html/Serializer",R="tinymce/dom/Serializer",A="tinymce/dom/TridentSelection",B="tinymce/util/VK",D="tinymce/dom/ControlSelection",L="tinymce/dom/BookmarkManager",H="tinymce/dom/Selection",M="tinymce/dom/ElementUtils",P="tinymce/fmt/Preview",O="tinymce/Formatter",I="tinymce/UndoManager",F="tinymce/EnterKey",z="tinymce/ForceBlocks",W="tinymce/EditorCommands",V="tinymce/util/URI",U="tinymce/util/Class",$="tinymce/util/EventDispatcher",q="tinymce/ui/Selector",j="tinymce/ui/Collection",Y="tinymce/ui/DomUtils",K="tinymce/ui/Control",G="tinymce/ui/Factory",X="tinymce/ui/KeyboardNavigation",J="tinymce/ui/Container",Q="tinymce/ui/DragHelper",Z="tinymce/ui/Scrollable",et="tinymce/ui/Panel",tt="tinymce/ui/Movable",nt="tinymce/ui/Resizable",rt="tinymce/ui/FloatPanel",it="tinymce/ui/Window",ot="tinymce/ui/MessageBox",at="tinymce/WindowManager",st="tinymce/util/Quirks",lt="tinymce/util/Observable",ct="tinymce/EditorObservable",ut="tinymce/Shortcuts",dt="tinymce/Editor",ft="tinymce/util/I18n",pt="tinymce/FocusManager",ht="tinymce/EditorManager",mt="tinymce/LegacyInput",gt="tinymce/util/XHR",vt="tinymce/util/JSON",yt="tinymce/util/JSONRequest",bt="tinymce/util/JSONP",Ct="tinymce/util/LocalStorage",xt="tinymce/Compat",wt="tinymce/ui/Layout",_t="tinymce/ui/AbsoluteLayout",Et="tinymce/ui/Tooltip",Nt="tinymce/ui/Widget",kt="tinymce/ui/Button",St="tinymce/ui/ButtonGroup",Tt="tinymce/ui/Checkbox",Rt="tinymce/ui/ComboBox",At="tinymce/ui/ColorBox",Bt="tinymce/ui/PanelButton",Dt="tinymce/ui/ColorButton",Lt="tinymce/util/Color",Ht="tinymce/ui/ColorPicker",Mt="tinymce/ui/Path",Pt="tinymce/ui/ElementPath",Ot="tinymce/ui/FormItem",It="tinymce/ui/Form",Ft="tinymce/ui/FieldSet",zt="tinymce/ui/FilePicker",Wt="tinymce/ui/FitLayout",Vt="tinymce/ui/FlexLayout",Ut="tinymce/ui/FlowLayout",$t="tinymce/ui/FormatControls",qt="tinymce/ui/GridLayout",jt="tinymce/ui/Iframe",Yt="tinymce/ui/Label",Kt="tinymce/ui/Toolbar",Gt="tinymce/ui/MenuBar",Xt="tinymce/ui/MenuButton",Jt="tinymce/ui/ListBox",Qt="tinymce/ui/MenuItem",Zt="tinymce/ui/Menu",en="tinymce/ui/Radio",tn="tinymce/ui/ResizeHandle",nn="tinymce/ui/Spacer",rn="tinymce/ui/SplitButton",on="tinymce/ui/StackLayout",an="tinymce/ui/TabPanel",sn="tinymce/ui/TextBox",ln="tinymce/ui/Throbber";r(l,[],function(){function e(e,t,n,r){e.addEventListener?e.addEventListener(t,n,r||!1):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e,t,n,r){e.removeEventListener?e.removeEventListener(t,n,r||!1):e.detachEvent&&e.detachEvent("on"+t,n)}function n(e,t){function n(){return!1}function r(){return!0}var i,o=t||{},l;for(i in e)s[i]||(o[i]=e[i]);if(o.target||(o.target=o.srcElement||document),e&&a.test(e.type)&&e.pageX===l&&e.clientX!==l){var c=o.target.ownerDocument||document,u=c.documentElement,d=c.body;o.pageX=e.clientX+(u&&u.scrollLeft||d&&d.scrollLeft||0)-(u&&u.clientLeft||d&&d.clientLeft||0),o.pageY=e.clientY+(u&&u.scrollTop||d&&d.scrollTop||0)-(u&&u.clientTop||d&&d.clientTop||0)}return o.preventDefault=function(){o.isDefaultPrevented=r,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},o.stopPropagation=function(){o.isPropagationStopped=r,e&&(e.stopPropagation?e.stopPropagation():e.cancelBubble=!0)},o.stopImmediatePropagation=function(){o.isImmediatePropagationStopped=r,o.stopPropagation()},o.isDefaultPrevented||(o.isDefaultPrevented=n,o.isPropagationStopped=n,o.isImmediatePropagationStopped=n),o}function r(n,r,i){function o(){i.domLoaded||(i.domLoaded=!0,r(c))}function a(){("complete"===l.readyState||"interactive"===l.readyState&&l.body)&&(t(l,"readystatechange",a),o())}function s(){try{l.documentElement.doScroll("left")}catch(e){return void setTimeout(s,0)}o()}var l=n.document,c={type:"ready"};return i.domLoaded?void r(c):(l.addEventListener?"complete"===l.readyState?o():e(n,"DOMContentLoaded",o):(e(l,"readystatechange",a),l.documentElement.doScroll&&n.self===n.top&&s()),void e(n,"load",o))}function i(){function i(e,t){var n,r,i,o,a=s[t];if(n=a&&a[e.type])for(r=0,i=n.length;i>r;r++)if(o=n[r],o&&o.func.call(o.scope,e)===!1&&e.preventDefault(),e.isImmediatePropagationStopped())return}var a=this,s={},l,c,u,d,f;c=o+(+new Date).toString(32),d="onmouseenter"in document.documentElement,u="onfocusin"in document.documentElement,f={mouseenter:"mouseover",mouseleave:"mouseout"},l=1,a.domLoaded=!1,a.events=s,a.bind=function(t,o,p,h){function m(e){i(n(e||_.event),g)}var g,v,y,b,C,x,w,_=window;if(t&&3!==t.nodeType&&8!==t.nodeType){for(t[c]?g=t[c]:(g=l++,t[c]=g,s[g]={}),h=h||t,o=o.split(" "),y=o.length;y--;)b=o[y],x=m,C=w=!1,"DOMContentLoaded"===b&&(b="ready"),a.domLoaded&&"ready"===b&&"complete"==t.readyState?p.call(h,n({type:b})):(d||(C=f[b],C&&(x=function(e){var t,r;if(t=e.currentTarget,r=e.relatedTarget,r&&t.contains)r=t.contains(r);else for(;r&&r!==t;)r=r.parentNode;r||(e=n(e||_.event),e.type="mouseout"===e.type?"mouseleave":"mouseenter",e.target=t,i(e,g))})),u||"focusin"!==b&&"focusout"!==b||(w=!0,C="focusin"===b?"focus":"blur",x=function(e){e=n(e||_.event),e.type="focus"===e.type?"focusin":"focusout",i(e,g)}),v=s[g][b],v?"ready"===b&&a.domLoaded?p({type:b}):v.push({func:p,scope:h}):(s[g][b]=v=[{func:p,scope:h}],v.fakeName=C,v.capture=w,v.nativeHandler=x,"ready"===b?r(t,x,a):e(t,C||b,x,w)));return t=v=0,p}},a.unbind=function(e,n,r){var i,o,l,u,d,f;if(!e||3===e.nodeType||8===e.nodeType)return a;if(i=e[c]){if(f=s[i],n){for(n=n.split(" "),l=n.length;l--;)if(d=n[l],o=f[d]){if(r)for(u=o.length;u--;)if(o[u].func===r){var p=o.nativeHandler,h=o.fakeName,m=o.capture;o=o.slice(0,u).concat(o.slice(u+1)),o.nativeHandler=p,o.fakeName=h,o.capture=m,f[d]=o}r&&0!==o.length||(delete f[d],t(e,o.fakeName||d,o.nativeHandler,o.capture))}}else{for(d in f)o=f[d],t(e,o.fakeName||d,o.nativeHandler,o.capture);f={}}for(d in f)return a;delete s[i];try{delete e[c]}catch(g){e[c]=null}}return a},a.fire=function(e,t,r){var o;if(!e||3===e.nodeType||8===e.nodeType)return a;r=n(null,r),r.type=t,r.target=e;do o=e[c],o&&i(r,o),e=e.parentNode||e.ownerDocument||e.defaultView||e.parentWindow;while(e&&!r.isPropagationStopped());return a},a.clean=function(e){var t,n,r=a.unbind;if(!e||3===e.nodeType||8===e.nodeType)return a;if(e[c]&&r(e),e.getElementsByTagName||(e=e.document),e&&e.getElementsByTagName)for(r(e),n=e.getElementsByTagName("*"),t=n.length;t--;)e=n[t],e[c]&&r(e);return a},a.destroy=function(){s={}},a.cancel=function(e){return e&&(e.preventDefault(),e.stopImmediatePropagation()),!1}}var o="mce-data-",a=/^(?:mouse|contextmenu)|click/,s={keyLocation:1,layerX:1,layerY:1,returnValue:1};return i.Event=new i,i.Event.bind(window,"ready",function(){}),i}),r(c,[],function(){function e(e,t,n,r){var i,o,a,s,l,c,d,p,h,m;if((t?t.ownerDocument||t:z)!==D&&B(t),t=t||D,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(H&&!r){if(i=vt.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&I(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return Z.apply(n,t.getElementsByTagName(e)),n;if((a=i[3])&&x.getElementsByClassName)return Z.apply(n,t.getElementsByClassName(a)),n}if(x.qsa&&(!M||!M.test(e))){if(p=d=F,h=t,m=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){for(c=N(e),(d=t.getAttribute("id"))?p=d.replace(bt,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",l=c.length;l--;)c[l]=p+f(c[l]);h=yt.test(e)&&u(t.parentNode)||t,m=c.join(",")}if(m)try{return Z.apply(n,h.querySelectorAll(m)),n}catch(g){}finally{d||t.removeAttribute("id")}}}return S(e.replace(st,"$1"),t,n,r)}function n(){function e(n,r){return t.push(n+" ")>w.cacheLength&&delete e[t.shift()],e[n+" "]=r}var t=[];return e}function r(e){return e[F]=!0,e}function i(e){var t=D.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),r=e.length;r--;)w.attrHandle[n[r]]=t}function a(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||K)-(~e.sourceIndex||K);if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function s(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function l(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function c(e){return r(function(t){return t=+t,r(function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function u(e){return e&&typeof e.getElementsByTagName!==Y&&e}function d(){}function f(e){for(var t=0,n=e.length,r="";n>t;t++)r+=e[t].value;return r}function p(e,t,n){var r=t.dir,i=n&&"parentNode"===r,o=V++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||i)return e(t,n,o)}:function(t,n,a){var s,l,c=[W,o];if(a){for(;t=t[r];)if((1===t.nodeType||i)&&e(t,n,a))return!0}else for(;t=t[r];)if(1===t.nodeType||i){if(l=t[F]||(t[F]={}),(s=l[r])&&s[0]===W&&s[1]===o)return c[2]=s[2];if(l[r]=c,c[2]=e(t,n,a))return!0}}}function h(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function m(t,n,r){for(var i=0,o=n.length;o>i;i++)e(t,n[i],r);return r}function g(e,t,n,r,i){for(var o,a=[],s=0,l=e.length,c=null!=t;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),c&&t.push(s));return a}function v(e,t,n,i,o,a){return i&&!i[F]&&(i=v(i)),o&&!o[F]&&(o=v(o,a)),r(function(r,a,s,l){var c,u,d,f=[],p=[],h=a.length,v=r||m(t||"*",s.nodeType?[s]:s,[]),y=!e||!r&&t?v:g(v,f,e,s,l),b=n?o||(r?e:h||i)?[]:a:y;if(n&&n(y,b,s,l),i)for(c=g(b,p),i(c,[],s,l),u=c.length;u--;)(d=c[u])&&(b[p[u]]=!(y[p[u]]=d));if(r){if(o||e){if(o){for(c=[],u=b.length;u--;)(d=b[u])&&c.push(y[u]=d);o(null,b=[],c,l)}for(u=b.length;u--;)(d=b[u])&&(c=o?tt.call(r,d):f[u])>-1&&(r[c]=!(a[c]=d))}}else b=g(b===a?b.splice(h,b.length):b),o?o(null,a,b,l):Z.apply(a,b)})}function y(e){for(var t,n,r,i=e.length,o=w.relative[e[0].type],a=o||w.relative[" "],s=o?1:0,l=p(function(e){return e===t},a,!0),c=p(function(e){return tt.call(t,e)>-1},a,!0),u=[function(e,n,r){return!o&&(r||n!==T)||((t=n).nodeType?l(e,n,r):c(e,n,r))}];i>s;s++)if(n=w.relative[e[s].type])u=[p(h(u),n)];else{if(n=w.filter[e[s].type].apply(null,e[s].matches),n[F]){for(r=++s;i>r&&!w.relative[e[r].type];r++);return v(s>1&&h(u),s>1&&f(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(st,"$1"),n,r>s&&y(e.slice(s,r)),i>r&&y(e=e.slice(r)),i>r&&f(e))}u.push(n)}return h(u)}function b(t,n){var i=n.length>0,o=t.length>0,a=function(r,a,s,l,c){var u,d,f,p=0,h="0",m=r&&[],v=[],y=T,b=r||o&&w.find.TAG("*",c),C=W+=null==y?1:Math.random()||.1,x=b.length;for(c&&(T=a!==D&&a);h!==x&&null!=(u=b[h]);h++){if(o&&u){for(d=0;f=t[d++];)if(f(u,a,s)){l.push(u);break}c&&(W=C)}i&&((u=!f&&u)&&p--,r&&m.push(u))}if(p+=h,i&&h!==p){for(d=0;f=n[d++];)f(m,v,a,s);if(r){if(p>0)for(;h--;)m[h]||v[h]||(v[h]=J.call(l));v=g(v)}Z.apply(l,v),c&&!r&&v.length>0&&p+n.length>1&&e.uniqueSort(l)}return c&&(W=C,T=y),m};return i?r(a):a}var C,x,w,_,E,N,k,S,T,R,A,B,D,L,H,M,P,O,I,F="sizzle"+-new Date,z=window.document,W=0,V=0,U=n(),$=n(),q=n(),j=function(e,t){return e===t&&(A=!0),0},Y=typeof t,K=1<<31,G={}.hasOwnProperty,X=[],J=X.pop,Q=X.push,Z=X.push,et=X.slice,tt=X.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1},nt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",rt="[\\x20\\t\\r\\n\\f]",it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ot="\\["+rt+"*("+it+")(?:"+rt+"*([*^$|!~]?=)"+rt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+rt+"*\\]",at=":("+it+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",st=new RegExp("^"+rt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+rt+"+$","g"),lt=new RegExp("^"+rt+"*,"+rt+"*"),ct=new RegExp("^"+rt+"*([>+~]|"+rt+")"+rt+"*"),ut=new RegExp("="+rt+"*([^\\]'\"]*?)"+rt+"*\\]","g"),dt=new RegExp(at),ft=new RegExp("^"+it+"$"),pt={ID:new RegExp("^#("+it+")"),CLASS:new RegExp("^\\.("+it+")"),TAG:new RegExp("^("+it+"|[*])"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+at),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+rt+"*(even|odd|(([+-]|)(\\d*)n|)"+rt+"*(?:([+-]|)"+rt+"*(\\d+)|))"+rt+"*\\)|)","i"),bool:new RegExp("^(?:"+nt+")$","i"),needsContext:new RegExp("^"+rt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+rt+"*((?:-\\d)?\\d*)"+rt+"*\\)|)(?=[^-]|$)","i")},ht=/^(?:input|select|textarea|button)$/i,mt=/^h\d$/i,gt=/^[^{]+\{\s*\[native \w/,vt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,yt=/[+~]/,bt=/'|\\/g,Ct=new RegExp("\\\\([\\da-f]{1,6}"+rt+"?|("+rt+")|.)","ig"),xt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)};try{Z.apply(X=et.call(z.childNodes),z.childNodes),X[z.childNodes.length].nodeType}catch(wt){Z={apply:X.length?function(e,t){Q.apply(e,et.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}x=e.support={},E=e.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},B=e.setDocument=function(e){var t,n=e?e.ownerDocument||e:z,r=n.defaultView;return n!==D&&9===n.nodeType&&n.documentElement?(D=n,L=n.documentElement,H=!E(n),r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",function(){B()},!1):r.attachEvent&&r.attachEvent("onunload",function(){B()})),x.attributes=i(function(e){return e.className="i",!e.getAttribute("className")}),x.getElementsByTagName=i(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),x.getElementsByClassName=gt.test(n.getElementsByClassName),x.getById=i(function(e){return L.appendChild(e).id=F,!n.getElementsByName||!n.getElementsByName(F).length}),x.getById?(w.find.ID=function(e,t){if(typeof t.getElementById!==Y&&H){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},w.filter.ID=function(e){var t=e.replace(Ct,xt);return function(e){return e.getAttribute("id")===t}}):(delete w.find.ID,w.filter.ID=function(e){var t=e.replace(Ct,xt);return function(e){var n=typeof e.getAttributeNode!==Y&&e.getAttributeNode("id");return n&&n.value===t}}),w.find.TAG=x.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==Y?t.getElementsByTagName(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},w.find.CLASS=x.getElementsByClassName&&function(e,t){return H?t.getElementsByClassName(e):void 0},P=[],M=[],(x.qsa=gt.test(n.querySelectorAll))&&(i(function(e){e.innerHTML="<select msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&M.push("[*^$]="+rt+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||M.push("\\["+rt+"*(?:value|"+nt+")"),e.querySelectorAll(":checked").length||M.push(":checked")}),i(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&M.push("name"+rt+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||M.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),M.push(",.*:")})),(x.matchesSelector=gt.test(O=L.matches||L.webkitMatchesSelector||L.mozMatchesSelector||L.oMatchesSelector||L.msMatchesSelector))&&i(function(e){x.disconnectedMatch=O.call(e,"div"),O.call(e,"[s!='']:x"),P.push("!=",at)}),M=M.length&&new RegExp(M.join("|")),P=P.length&&new RegExp(P.join("|")),t=gt.test(L.compareDocumentPosition),I=t||gt.test(L.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},j=t?function(e,t){if(e===t)return A=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r?r:(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&r||!x.sortDetached&&t.compareDocumentPosition(e)===r?e===n||e.ownerDocument===z&&I(z,e)?-1:t===n||t.ownerDocument===z&&I(z,t)?1:R?tt.call(R,e)-tt.call(R,t):0:4&r?-1:1)}:function(e,t){if(e===t)return A=!0,0;var r,i=0,o=e.parentNode,s=t.parentNode,l=[e],c=[t];if(!o||!s)return e===n?-1:t===n?1:o?-1:s?1:R?tt.call(R,e)-tt.call(R,t):0;if(o===s)return a(e,t);for(r=e;r=r.parentNode;)l.unshift(r);for(r=t;r=r.parentNode;)c.unshift(r);for(;l[i]===c[i];)i++;return i?a(l[i],c[i]):l[i]===z?-1:c[i]===z?1:0},n):D},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==D&&B(t),n=n.replace(ut,"='$1']"),!(!x.matchesSelector||!H||P&&P.test(n)||M&&M.test(n)))try{var r=O.call(t,n);if(r||x.disconnectedMatch||t.document&&11!==t.document.nodeType)return r}catch(i){}return e(n,D,null,[t]).length>0},e.contains=function(e,t){return(e.ownerDocument||e)!==D&&B(e),I(e,t)},e.attr=function(e,n){(e.ownerDocument||e)!==D&&B(e);var r=w.attrHandle[n.toLowerCase()],i=r&&G.call(w.attrHandle,n.toLowerCase())?r(e,n,!H):t;return i!==t?i:x.attributes||!H?e.getAttribute(n):(i=e.getAttributeNode(n))&&i.specified?i.value:null},e.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},e.uniqueSort=function(e){var t,n=[],r=0,i=0;if(A=!x.detectDuplicates,R=!x.sortStable&&e.slice(0),e.sort(j),A){for(;t=e[i++];)t===e[i]&&(r=n.push(i));for(;r--;)e.splice(n[r],1)}return R=null,e},_=e.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=_(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=_(t);return n},w=e.selectors={cacheLength:50,createPseudo:r,match:pt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Ct,xt),e[3]=(e[3]||e[4]||e[5]||"").replace(Ct,xt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(e){var t,n=!e[6]&&e[2];return pt.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&dt.test(n)&&(t=N(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Ct,xt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=U[e+" "];return t||(t=new RegExp("(^|"+rt+")"+e+"("+rt+"|$)"))&&U(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==Y&&e.getAttribute("class")||"")})},ATTR:function(t,n,r){return function(i){var o=e.attr(i,t);return null==o?"!="===n:n?(o+="","="===n?o===r:"!="===n?o!==r:"^="===n?r&&0===o.indexOf(r):"*="===n?r&&o.indexOf(r)>-1:"$="===n?r&&o.slice(-r.length)===r:"~="===n?(" "+o+" ").indexOf(r)>-1:"|="===n?o===r||o.slice(0,r.length+1)===r+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var c,u,d,f,p,h,m=o!==a?"nextSibling":"previousSibling",g=t.parentNode,v=s&&t.nodeName.toLowerCase(),y=!l&&!s;if(g){if(o){for(;m;){for(d=t;d=d[m];)if(s?d.nodeName.toLowerCase()===v:1===d.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?g.firstChild:g.lastChild],a&&y){for(u=g[F]||(g[F]={}),c=u[e]||[],p=c[0]===W&&c[1],f=c[0]===W&&c[2],d=p&&g.childNodes[p];d=++p&&d&&d[m]||(f=p=0)||h.pop();)if(1===d.nodeType&&++f&&d===t){u[e]=[W,p,f];break}}else if(y&&(c=(t[F]||(t[F]={}))[e])&&c[0]===W)f=c[1];else for(;(d=++p&&d&&d[m]||(f=p=0)||h.pop())&&((s?d.nodeName.toLowerCase()!==v:1!==d.nodeType)||!++f||(y&&((d[F]||(d[F]={}))[e]=[W,f]),d!==t)););return f-=i,f===r||f%r===0&&f/r>=0}}},PSEUDO:function(t,n){var i,o=w.pseudos[t]||w.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[F]?o(n):o.length>1?(i=[t,t,"",n],w.setFilters.hasOwnProperty(t.toLowerCase())?r(function(e,t){for(var r,i=o(e,n),a=i.length;a--;)r=tt.call(e,i[a]),e[r]=!(t[r]=i[a])}):function(e){return o(e,0,i)}):o}},pseudos:{not:r(function(e){var t=[],n=[],i=k(e.replace(st,"$1"));return i[F]?r(function(e,t,n,r){for(var o,a=i(e,null,r,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,r,o){return t[0]=e,i(t,null,o,n),!n.pop()}}),has:r(function(t){return function(n){return e(t,n).length>0}}),contains:r(function(e){return e=e.replace(Ct,xt),function(t){return(t.textContent||t.innerText||_(t)).indexOf(e)>-1}}),lang:r(function(t){return ft.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(Ct,xt).toLowerCase(),function(e){var n;do if(n=H?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=window.location&&window.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===L},focus:function(e){return e===D.activeElement&&(!D.hasFocus||D.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!w.pseudos.empty(e)},header:function(e){return mt.test(e.nodeName)},input:function(e){return ht.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:c(function(){return[0]}),last:c(function(e,t){return[t-1]}),eq:c(function(e,t,n){return[0>n?n+t:n]}),even:c(function(e,t){for(var n=0;t>n;n+=2)e.push(n);return e}),odd:c(function(e,t){for(var n=1;t>n;n+=2)e.push(n);return e}),lt:c(function(e,t,n){for(var r=0>n?n+t:n;--r>=0;)e.push(r);return e}),gt:c(function(e,t,n){for(var r=0>n?n+t:n;++r<t;)e.push(r);return e})}},w.pseudos.nth=w.pseudos.eq;for(C in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})w.pseudos[C]=s(C);for(C in{submit:!0,reset:!0})w.pseudos[C]=l(C);return d.prototype=w.filters=w.pseudos,w.setFilters=new d,N=e.tokenize=function(t,n){var r,i,o,a,s,l,c,u=$[t+" "];if(u)return n?0:u.slice(0);for(s=t,l=[],c=w.preFilter;s;){(!r||(i=lt.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),l.push(o=[])),r=!1,(i=ct.exec(s))&&(r=i.shift(),o.push({value:r,type:i[0].replace(st," ")}),s=s.slice(r.length));for(a in w.filter)!(i=pt[a].exec(s))||c[a]&&!(i=c[a](i))||(r=i.shift(),o.push({value:r,type:a,matches:i}),s=s.slice(r.length));if(!r)break}return n?s.length:s?e.error(t):$(t,l).slice(0)},k=e.compile=function(e,t){var n,r=[],i=[],o=q[e+" "];if(!o){for(t||(t=N(e)),n=t.length;n--;)o=y(t[n]),o[F]?r.push(o):i.push(o);o=q(e,b(i,r)),o.selector=e}return o},S=e.select=function(e,t,n,r){var i,o,a,s,l,c="function"==typeof e&&e,d=!r&&N(e=c.selector||e);if(n=n||[],1===d.length){if(o=d[0]=d[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&x.getById&&9===t.nodeType&&H&&w.relative[o[1].type]){if(t=(w.find.ID(a.matches[0].replace(Ct,xt),t)||[])[0],!t)return n;c&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(i=pt.needsContext.test(e)?0:o.length;i--&&(a=o[i],!w.relative[s=a.type]);)if((l=w.find[s])&&(r=l(a.matches[0].replace(Ct,xt),yt.test(o[0].type)&&u(t.parentNode)||t))){if(o.splice(i,1),e=r.length&&f(o),!e)return Z.apply(n,r),n;break}}return(c||k(e,d))(r,t,!H,n,yt.test(e)&&u(t.parentNode)||t),n},x.sortStable=F.split("").sort(j).join("")===F,x.detectDuplicates=!!A,B(),x.sortDetached=i(function(e){return 1&e.compareDocumentPosition(D.createElement("div"))}),i(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||o("type|href|height|width",function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),x.attributes&&i(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||o("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue}),i(function(e){return null==e.getAttribute("disabled")})||o(nt,function(e,t,n){var r;return n?void 0:e[t]===!0?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),e}),r(u,[],function(){function e(e){return null===e||e===t?"":(""+e).replace(m,"")}function n(e,n){return n?"array"==n&&g(e)?!0:typeof e==n:e!==t}function r(e){var t=e,n,r;if(!g(e))for(t=[],n=0,r=e.length;r>n;n++)t[n]=e[n];return t}function i(e,t,n){var r;for(e=e||[],t=t||",","string"==typeof e&&(e=e.split(t)),n=n||{},r=e.length;r--;)n[e[r]]={};return n}function o(e,n,r){var i,o;if(!e)return 0;if(r=r||e,e.length!==t){for(i=0,o=e.length;o>i;i++)if(n.call(r,e[i],i,e)===!1)return 0}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return 0;return 1}function a(e,t){var n=[];return o(e,function(e){n.push(t(e))}),n}function s(e,t){var n=[];return o(e,function(e){(!t||t(e))&&n.push(e)}),n}function l(e,t,n){var r=this,i,o,a,s,l,c=0;if(e=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(e),a=e[3].match(/(^|\.)(\w+)$/i)[2],o=r.createNS(e[3].replace(/\.\w+$/,""),n),!o[a]){if("static"==e[2])return o[a]=t,void(this.onCreate&&this.onCreate(e[2],e[3],o[a]));t[a]||(t[a]=function(){},c=1),o[a]=t[a],r.extend(o[a].prototype,t),e[5]&&(i=r.resolve(e[5]).prototype,s=e[5].match(/\.(\w+)$/i)[1],l=o[a],o[a]=c?function(){return i[s].apply(this,arguments)}:function(){return this.parent=i[s],l.apply(this,arguments)},o[a].prototype[a]=o[a],r.each(i,function(e,t){o[a].prototype[t]=i[t]}),r.each(t,function(e,t){i[t]?o[a].prototype[t]=function(){return this.parent=i[t],e.apply(this,arguments)}:t!=a&&(o[a].prototype[t]=e)})),r.each(t["static"],function(e,t){o[a][t]=e})}}function c(e,t){var n,r;if(e)for(n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}function u(e,n){var r,i,o,a=arguments,s;for(r=1,i=a.length;i>r;r++){n=a[r];for(o in n)n.hasOwnProperty(o)&&(s=n[o],s!==t&&(e[o]=s))}return e}function d(e,t,n,r){r=r||this,e&&(n&&(e=e[n]),o(e,function(e,i){return t.call(r,e,i,n)===!1?!1:void d(e,t,n,r)}))}function f(e,t){var n,r;for(t=t||window,e=e.split("."),n=0;n<e.length;n++)r=e[n],t[r]||(t[r]={}),t=t[r];return t}function p(e,t){var n,r;for(t=t||window,e=e.split("."),n=0,r=e.length;r>n&&(t=t[e[n]],t);n++);return t}function h(t,r){return!t||n(t,"array")?t:a(t.split(r||","),e)}var m=/^\s*|\s*$/g,g=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};return{trim:e,isArray:g,is:n,toArray:r,makeMap:i,each:o,map:a,grep:s,inArray:c,extend:u,create:l,walk:d,createNS:f,resolve:p,explode:h}}),r(d,[],function(){var e=navigator,t=e.userAgent,n,r,i,o,a,s,l;n=window.opera&&window.opera.buildNumber,r=/WebKit/.test(t),i=!r&&!n&&/MSIE/gi.test(t)&&/Explorer/gi.test(e.appName),i=i&&/MSIE (\w+)\./.exec(t)[1],o=-1==t.indexOf("Trident/")||-1==t.indexOf("rv:")&&-1==e.appName.indexOf("Netscape")?!1:11,i=i||o,a=!r&&!o&&/Gecko/.test(t),s=-1!=t.indexOf("Mac"),l=/(iPad|iPhone)/.test(t);var c=!l||t.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:n,webkit:r,ie:i,gecko:a,mac:s,iOS:l,contentEditable:c,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!=i,range:window.getSelection&&"Range"in window,documentMode:i?document.documentMode||7:10}}),r(f,[l,c,u,d],function(e,n,r,i){function o(e){return"undefined"!=typeof e}function a(e){return"string"==typeof e}function s(e,t){var n,r,i;for(t=t||x,i=t.createElement("div"),n=t.createDocumentFragment(),i.innerHTML=e;r=i.firstChild;)n.appendChild(r);return n}function l(e,t,n,r){var i;if(a(t))t=s(t,g(e[0]));else if(t.length&&!t.nodeType){if(t=d.makeArray(t),r)for(i=t.length-1;i>=0;i--)l(e,t[i],n,r);else for(i=0;i<t.length;i++)l(e,t[i],n,r);return e}if(t.nodeType)for(i=e.length;i--;)n.call(e[i],t);return e}function c(e,t){return e&&t&&-1!==(" "+e.className+" ").indexOf(" "+t+" ")}function u(e,t,n){var r,i;return t=d(t)[0],e.each(function(){var e=this;n&&r==e.parentNode?i.appendChild(e):(r=e.parentNode,i=t.cloneNode(!1),e.parentNode.insertBefore(i,e),i.appendChild(e))}),e}function d(e,t){return new d.fn.init(e,t)}function f(e,t){var n;if(t.indexOf)return t.indexOf(e);for(n=t.length;n--;)if(t[n]===e)return n;return-1}function p(e){return null===e||e===k?"":(""+e).replace(L,"")}function h(e,t){var n,r,i,o,a;if(e)if(n=e.length,n===o){for(r in e)if(e.hasOwnProperty(r)&&(a=e[r],t.call(a,r,a)===!1))break}else for(i=0;n>i&&(a=e[i],t.call(a,i,a)!==!1);i++);return e}function m(e,t){var n=[];return h(e,function(e,r){t(r,e)&&n.push(r)}),n}function g(e){return e?9==e.nodeType?e:e.ownerDocument:x}function v(e,n,r){var i=[],o=e[n];for("string"!=typeof r&&r instanceof d&&(r=r[0]);o&&9!==o.nodeType;){if(r!==t){if(o===r)break;if("string"==typeof r&&d(o).is(r))break}1===o.nodeType&&i.push(o),o=o[n]}return i}function y(e,n,r,i){var o=[];for(i instanceof d&&(i=i[0]);e;e=e[n])if(!r||e.nodeType===r){if(i!==t){if(e===i)break;if("string"==typeof i&&d(e).is(i))break}o.push(e)}return o}function b(e,t,n){for(e=e[t];e;e=e[t])if(e.nodeType==n)return e;return null}function C(e,t,n){h(n,function(n,r){e[n]=e[n]||{},e[n][t]=r})}var x=document,w=Array.prototype.push,_=Array.prototype.slice,E=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,N=e.Event,k,S=r.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),T=r.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),R={"for":"htmlFor","class":"className",readonly:"readOnly"},A={"float":"cssFloat"},B={},D={},L=/^\s*|\s*$/g;return d.fn=d.prototype={constructor:d,selector:"",context:null,length:0,init:function(e,t){var n=this,r,i;if(!e)return n;if(e.nodeType)return n.context=n[0]=e,n.length=1,n;if(t&&t.nodeType)n.context=t;else{if(t)return d(e).attr(t);n.context=t=document}if(a(e)){if(n.selector=e,r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:E.exec(e),!r)return d(t).find(e);if(r[1])for(i=s(e,g(t)).firstChild;i;)w.call(n,i),i=i.nextSibling;else{if(i=g(t).getElementById(r[2]),!i)return n;if(i.id!==r[2])return n.find(e);n.length=1,n[0]=i}}else this.add(e,!1);return n},toArray:function(){return r.toArray(this)},add:function(e,t){var n=this,r,i;if(a(e))return n.add(d(e));if(e.nodeType)return n.add([e]);if(t!==!1)for(r=d.unique(n.toArray().concat(d.makeArray(e))),n.length=r.length,i=0;i<r.length;i++)n[i]=r[i];else w.apply(n,d.makeArray(e));
return n},attr:function(e,t){var n=this,r;if("object"==typeof e)h(e,function(e,t){n.attr(e,t)});else{if(!o(t)){if(n[0]&&1===n[0].nodeType){if(r=B[e],r&&r.get)return r.get(n[0],e);if(T[e])return n.prop(e)?e:k;t=n[0].getAttribute(e,2),null===t&&(t=k)}return t}this.each(function(){var n;if(1===this.nodeType){if(n=B[e],n&&n.set)return void n.set(this,t);null===t?this.removeAttribute(e,2):this.setAttribute(e,t,2)}})}return n},removeAttr:function(e){return this.attr(e,null)},prop:function(e,t){var n=this;if(e=R[e]||e,"object"==typeof e)h(e,function(e,t){n.prop(e,t)});else{if(!o(t))return n[0]&&n[0].nodeType&&e in n[0]?n[0][e]:t;this.each(function(){1==this.nodeType&&(this[e]=t)})}return n},css:function(e,t){function n(e){return e.replace(/-(\D)/g,function(e,t){return t.toUpperCase()})}function r(e){return e.replace(/[A-Z]/g,function(e){return"-"+e})}var i=this,a,s;if("object"==typeof e)h(e,function(e,t){i.css(e,t)});else if(o(t))e=n(e),"number"!=typeof t||S[e]||(t+="px"),i.each(function(){var n=this.style;if(s=D[e],s&&s.set)return void s.set(this,t);try{this.style[A[e]||e]=t}catch(i){}(null===t||""===t)&&(n.removeProperty?n.removeProperty(r(e)):n.removeAttribute(e))});else{if(a=i[0],s=D[e],s&&s.get)return s.get(a);if(a.ownerDocument.defaultView)try{return a.ownerDocument.defaultView.getComputedStyle(a,null).getPropertyValue(r(e))}catch(l){return k}else if(a.currentStyle)return a.currentStyle[n(e)]}return i},remove:function(){for(var e=this,t,n=this.length;n--;)t=e[n],N.clean(t),t.parentNode&&t.parentNode.removeChild(t);return this},empty:function(){for(var e=this,t,n=this.length;n--;)for(t=e[n];t.firstChild;)t.removeChild(t.firstChild);return this},html:function(e){var t=this,n;if(o(e)){n=t.length;try{for(;n--;)t[n].innerHTML=e}catch(r){d(t[n]).empty().append(e)}return t}return t[0]?t[0].innerHTML:""},text:function(e){var t=this,n;if(o(e)){for(n=t.length;n--;)"innerText"in t[n]?t[n].innerText=e:t[0].textContent=e;return t}return t[0]?t[0].innerText||t[0].textContent:""},append:function(){return l(this,arguments,function(e){1===this.nodeType&&this.appendChild(e)})},prepend:function(){return l(this,arguments,function(e){1===this.nodeType&&this.insertBefore(e,this.firstChild)},!0)},before:function(){var e=this;return e[0]&&e[0].parentNode?l(e,arguments,function(e){this.parentNode.insertBefore(e,this)}):e},after:function(){var e=this;return e[0]&&e[0].parentNode?l(e,arguments,function(e){this.parentNode.insertBefore(e,this.nextSibling)},!0):e},appendTo:function(e){return d(e).append(this),this},prependTo:function(e){return d(e).prepend(this),this},replaceWith:function(e){return this.before(e).remove()},wrap:function(e){return u(this,e)},wrapAll:function(e){return u(this,e,!0)},wrapInner:function(e){return this.each(function(){d(this).contents().wrapAll(e)}),this},unwrap:function(){return this.parent().each(function(){d(this).replaceWith(this.childNodes)})},clone:function(){var e=[];return this.each(function(){e.push(this.cloneNode(!0))}),d(e)},addClass:function(e){return this.toggleClass(e,!0)},removeClass:function(e){return this.toggleClass(e,!1)},toggleClass:function(e,t){var n=this;return"string"!=typeof e?n:(-1!==e.indexOf(" ")?h(e.split(" "),function(){n.toggleClass(this,t)}):n.each(function(n,r){var i,o;o=c(r,e),o!==t&&(i=r.className,o?r.className=p((" "+i+" ").replace(" "+e+" "," ")):r.className+=i?" "+e:e)}),n)},hasClass:function(e){return c(this[0],e)},each:function(e){return h(this,e)},on:function(e,t){return this.each(function(){N.bind(this,e,t)})},off:function(e,t){return this.each(function(){N.unbind(this,e,t)})},trigger:function(e){return this.each(function(){"object"==typeof e?N.fire(this,e.type,e):N.fire(this,e)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new d(_.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(e){var t,n,r=[];for(t=0,n=this.length;n>t;t++)d.find(e,this[t],r);return d(r)},filter:function(e){return d("function"==typeof e?m(this.toArray(),function(t,n){return e(n,t)}):d.filter(e,this.toArray()))},closest:function(e){var t=[];return e instanceof d&&(e=e[0]),this.each(function(n,r){for(;r;){if("string"==typeof e&&d(r).is(e)){t.push(r);break}if(r==e){t.push(r);break}r=r.parentNode}}),d(t)},offset:function(e){var t,n,r,i=0,o=0,a;return e?this.css(e):(t=this[0],t&&(n=t.ownerDocument,r=n.documentElement,t.getBoundingClientRect&&(a=t.getBoundingClientRect(),i=a.left+(r.scrollLeft||n.body.scrollLeft)-r.clientLeft,o=a.top+(r.scrollTop||n.body.scrollTop)-r.clientTop)),{left:i,top:o})},push:w,sort:[].sort,splice:[].splice},r.extend(d,{extend:r.extend,makeArray:r.toArray,inArray:f,isArray:r.isArray,each:h,trim:p,grep:m,find:n,expr:n.selectors,unique:n.uniqueSort,text:n.getText,contains:n.contains,filter:function(e,t,n){return n&&(e=":not("+e+")"),t=1===t.length?d.find.matchesSelector(t[0],e)?[t[0]]:[]:d.find.matches(e,t)}}),h({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return v(e,"parentNode")},next:function(e){return b(e,"nextSibling",1)},prev:function(e){return b(e,"previousSibling",1)},children:function(e){return y(e.firstChild,"nextSibling",1)},contents:function(e){return r.toArray(("iframe"===e.nodeName?e.contentDocument||e.contentWindow.document:e).childNodes)}},function(e,t){d.fn[e]=function(n){var r=this,i=[];return r.each(function(){var e=t.call(i,this,n,i);e&&(d.isArray(e)?i.push.apply(i,e):i.push(e))}),this.length>1&&(i=d.unique(i),0===e.indexOf("parents")&&(i=i.reverse())),i=d(i),n?i.filter(n):i}}),h({parentsUntil:function(e,t){return v(e,"parentNode",t)},nextUntil:function(e,t){return y(e,"nextSibling",1,t).slice(1)},prevUntil:function(e,t){return y(e,"previousSibling",1,t).slice(1)}},function(e,t){d.fn[e]=function(n,r){var i=this,o=[];return i.each(function(){var e=t.call(o,this,n,o);e&&(d.isArray(e)?o.push.apply(o,e):o.push(e))}),this.length>1&&(o=d.unique(o),(0===e.indexOf("parents")||"prevUntil"===e)&&(o=o.reverse())),o=d(o),r?o.filter(r):o}}),d.fn.is=function(e){return!!e&&this.filter(e).length>0},d.fn.init.prototype=d.fn,d.overrideDefaults=function(e){function t(r,i){return n=n||e(),0===arguments.length&&(r=n.element),i||(i=n.context),new t.fn.init(r,i)}var n;return d.extend(t,this),t},i.ie&&i.ie<8&&(C(B,"get",{maxlength:function(e){var t=e.maxLength;return 2147483647===t?k:t},size:function(e){var t=e.size;return 20===t?k:t},"class":function(e){return e.className},style:function(e){var t=e.style.cssText;return 0===t.length?k:t}}),C(B,"set",{"class":function(e,t){e.className=t},style:function(e,t){e.style.cssText=t}})),i.ie&&i.ie<9&&(A["float"]="styleFloat",C(D,"set",{opacity:function(e,t){var n=e.style;null===t||""===t?n.removeAttribute("filter"):(n.zoom=1,n.filter="alpha(opacity="+100*t+")")}})),d.attrHooks=B,d.cssHooks=D,d}),r(p,[],function(){return function(e,t){function n(e,t,n,r){function i(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+i(t)+i(n)+i(r)}var r=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,i=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,o=/\s*([^:]+):\s*([^;]+);?/g,a=/\s+$/,s,l,c={},u,d,f,p="\ufeff";for(e=e||{},t&&(d=t.getValidStyles(),f=t.getInvalidStyles()),u=("\\\" \\' \\; \\: ; : "+p).split(" "),l=0;l<u.length;l++)c[u[l]]=p+l,c[p+l]=u[l];return{toHex:function(e){return e.replace(r,n)},parse:function(t){function s(e,t,n){var r,i,o,a;if(r=m[e+"-top"+t],r&&(i=m[e+"-right"+t],i&&(o=m[e+"-bottom"+t],o&&(a=m[e+"-left"+t])))){var s=[r,i,o,a];for(l=s.length-1;l--&&s[l]===s[l+1];);l>-1&&n||(m[e+t]=-1==l?s[0]:s.join(" "),delete m[e+"-top"+t],delete m[e+"-right"+t],delete m[e+"-bottom"+t],delete m[e+"-left"+t])}}function u(e){var t=m[e],n;if(t){for(t=t.split(" "),n=t.length;n--;)if(t[n]!==t[0])return!1;return m[e]=t[0],!0}}function d(e,t,n,r){u(t)&&u(n)&&u(r)&&(m[e]=m[t]+" "+m[n]+" "+m[r],delete m[t],delete m[n],delete m[r])}function f(e){return b=!0,c[e]}function p(e,t){return b&&(e=e.replace(/\uFEFF[0-9]/g,function(e){return c[e]})),t||(e=e.replace(/\\([\'\";:])/g,"$1")),e}function h(t,n,r,i,o,a){if(o=o||a)return o=p(o),"'"+o.replace(/\'/g,"\\'")+"'";if(n=p(n||r||i),!e.allow_script_urls){var s=n.replace(/[\s\r\n]+/,"");if(/(java|vb)script:/i.test(s))return"";if(!e.allow_svg_data_urls&&/^data:image\/svg/i.test(s))return""}return C&&(n=C.call(x,n,"style")),"url('"+n.replace(/\'/g,"\\'")+"')"}var m={},g,v,y,b,C=e.url_converter,x=e.url_converter_scope||this;if(t){for(t=t.replace(/[\u0000-\u001F]/g,""),t=t.replace(/\\[\"\';:\uFEFF]/g,f).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(e){return e.replace(/[;:]/g,f)});g=o.exec(t);){if(v=g[1].replace(a,"").toLowerCase(),y=g[2].replace(a,""),y=y.replace(/\\[0-9a-f]+/g,function(e){return String.fromCharCode(parseInt(e.substr(1),16))}),v&&y.length>0){if(!e.allow_script_urls&&("behavior"==v||/expression\s*\(|\/\*|\*\//.test(y)))continue;"font-weight"===v&&"700"===y?y="bold":("color"===v||"background-color"===v)&&(y=y.toLowerCase()),y=y.replace(r,n),y=y.replace(i,h),m[v]=b?p(y,!0):y}o.lastIndex=g.index+g[0].length}s("border","",!0),s("border","-width"),s("border","-color"),s("border","-style"),s("padding",""),s("margin",""),d("border","border-width","border-style","border-color"),"medium none"===m.border&&delete m.border,"none"===m["border-image"]&&delete m["border-image"]}return m},serialize:function(e,t){function n(t){var n,r,o,a;if(n=d[t])for(r=0,o=n.length;o>r;r++)t=n[r],a=e[t],a!==s&&a.length>0&&(i+=(i.length>0?" ":"")+t+": "+a+";")}function r(e,t){var n;return n=f["*"],n&&n[e]?!1:(n=f[t],n&&n[e]?!1:!0)}var i="",o,a;if(t&&d)n("*"),n(t);else for(o in e)a=e[o],a!==s&&a.length>0&&(!f||r(o,t))&&(i+=(i.length>0?" ":"")+o+": "+a+";");return i}}}}),r(h,[],function(){return function(e,t){function n(e,n,r,i){var o,a;if(e){if(!i&&e[n])return e[n];if(e!=t){if(o=e[r])return o;for(a=e.parentNode;a&&a!=t;a=a.parentNode)if(o=a[r])return o}}}var r=e;this.current=function(){return r},this.next=function(e){return r=n(r,"firstChild","nextSibling",e)},this.prev=function(e){return r=n(r,"lastChild","previousSibling",e)}}}),r(m,[u],function(e){function t(n){function r(){return M.createDocumentFragment()}function i(e,t){_(F,e,t)}function o(e,t){_(z,e,t)}function a(e){i(e.parentNode,j(e))}function s(e){i(e.parentNode,j(e)+1)}function l(e){o(e.parentNode,j(e))}function c(e){o(e.parentNode,j(e)+1)}function u(e){e?(H[U]=H[V],H[$]=H[W]):(H[V]=H[U],H[W]=H[$]),H.collapsed=F}function d(e){a(e),c(e)}function f(e){i(e,0),o(e,1===e.nodeType?e.childNodes.length:e.nodeValue.length)}function p(e,t){var n=H[V],r=H[W],i=H[U],o=H[$],a=t.startContainer,s=t.startOffset,l=t.endContainer,c=t.endOffset;return 0===e?w(n,r,a,s):1===e?w(i,o,a,s):2===e?w(i,o,l,c):3===e?w(n,r,l,c):void 0}function h(){E(I)}function m(){return E(P)}function g(){return E(O)}function v(e){var t=this[V],r=this[W],i,o;3!==t.nodeType&&4!==t.nodeType||!t.nodeValue?(t.childNodes.length>0&&(o=t.childNodes[r]),o?t.insertBefore(e,o):3==t.nodeType?n.insertAfter(e,t):t.appendChild(e)):r?r>=t.nodeValue.length?n.insertAfter(e,t):(i=t.splitText(r),t.parentNode.insertBefore(e,i)):t.parentNode.insertBefore(e,t)}function y(e){var t=H.extractContents();H.insertNode(e),e.appendChild(t),H.selectNode(e)}function b(){return q(new t(n),{startContainer:H[V],startOffset:H[W],endContainer:H[U],endOffset:H[$],collapsed:H.collapsed,commonAncestorContainer:H.commonAncestorContainer})}function C(e,t){var n;if(3==e.nodeType)return e;if(0>t)return e;for(n=e.firstChild;n&&t>0;)--t,n=n.nextSibling;return n?n:e}function x(){return H[V]==H[U]&&H[W]==H[$]}function w(e,t,r,i){var o,a,s,l,c,u;if(e==r)return t==i?0:i>t?-1:1;for(o=r;o&&o.parentNode!=e;)o=o.parentNode;if(o){for(a=0,s=e.firstChild;s!=o&&t>a;)a++,s=s.nextSibling;return a>=t?-1:1}for(o=e;o&&o.parentNode!=r;)o=o.parentNode;if(o){for(a=0,s=r.firstChild;s!=o&&i>a;)a++,s=s.nextSibling;return i>a?-1:1}for(l=n.findCommonAncestor(e,r),c=e;c&&c.parentNode!=l;)c=c.parentNode;for(c||(c=l),u=r;u&&u.parentNode!=l;)u=u.parentNode;if(u||(u=l),c==u)return 0;for(s=l.firstChild;s;){if(s==c)return-1;if(s==u)return 1;s=s.nextSibling}}function _(e,t,r){var i,o;for(e?(H[V]=t,H[W]=r):(H[U]=t,H[$]=r),i=H[U];i.parentNode;)i=i.parentNode;for(o=H[V];o.parentNode;)o=o.parentNode;o==i?w(H[V],H[W],H[U],H[$])>0&&H.collapse(e):H.collapse(e),H.collapsed=x(),H.commonAncestorContainer=n.findCommonAncestor(H[V],H[U])}function E(e){var t,n=0,r=0,i,o,a,s,l,c;if(H[V]==H[U])return N(e);for(t=H[U],i=t.parentNode;i;t=i,i=i.parentNode){if(i==H[V])return k(t,e);++n}for(t=H[V],i=t.parentNode;i;t=i,i=i.parentNode){if(i==H[U])return S(t,e);++r}for(o=r-n,a=H[V];o>0;)a=a.parentNode,o--;for(s=H[U];0>o;)s=s.parentNode,o++;for(l=a.parentNode,c=s.parentNode;l!=c;l=l.parentNode,c=c.parentNode)a=l,s=c;return T(a,s,e)}function N(e){var t,n,i,o,a,s,l,c,u;if(e!=I&&(t=r()),H[W]==H[$])return t;if(3==H[V].nodeType){if(n=H[V].nodeValue,i=n.substring(H[W],H[$]),e!=O&&(o=H[V],c=H[W],u=H[$]-H[W],0===c&&u>=o.nodeValue.length-1?o.parentNode.removeChild(o):o.deleteData(c,u),H.collapse(F)),e==I)return;return i.length>0&&t.appendChild(M.createTextNode(i)),t}for(o=C(H[V],H[W]),a=H[$]-H[W];o&&a>0;)s=o.nextSibling,l=D(o,e),t&&t.appendChild(l),--a,o=s;return e!=O&&H.collapse(F),t}function k(e,t){var n,i,o,a,s,l;if(t!=I&&(n=r()),i=R(e,t),n&&n.appendChild(i),o=j(e),a=o-H[W],0>=a)return t!=O&&(H.setEndBefore(e),H.collapse(z)),n;for(i=e.previousSibling;a>0;)s=i.previousSibling,l=D(i,t),n&&n.insertBefore(l,n.firstChild),--a,i=s;return t!=O&&(H.setEndBefore(e),H.collapse(z)),n}function S(e,t){var n,i,o,a,s,l;for(t!=I&&(n=r()),o=A(e,t),n&&n.appendChild(o),i=j(e),++i,a=H[$]-i,o=e.nextSibling;o&&a>0;)s=o.nextSibling,l=D(o,t),n&&n.appendChild(l),--a,o=s;return t!=O&&(H.setStartAfter(e),H.collapse(F)),n}function T(e,t,n){var i,o,a,s,l,c,u;for(n!=I&&(o=r()),i=A(e,n),o&&o.appendChild(i),a=j(e),s=j(t),++a,l=s-a,c=e.nextSibling;l>0;)u=c.nextSibling,i=D(c,n),o&&o.appendChild(i),c=u,--l;return i=R(t,n),o&&o.appendChild(i),n!=O&&(H.setStartAfter(e),H.collapse(F)),o}function R(e,t){var n=C(H[U],H[$]-1),r,i,o,a,s,l=n!=H[U];if(n==e)return B(n,l,z,t);for(r=n.parentNode,i=B(r,z,z,t);r;){for(;n;)o=n.previousSibling,a=B(n,l,z,t),t!=I&&i.insertBefore(a,i.firstChild),l=F,n=o;if(r==e)return i;n=r.previousSibling,r=r.parentNode,s=B(r,z,z,t),t!=I&&s.appendChild(i),i=s}}function A(e,t){var n=C(H[V],H[W]),r=n!=H[V],i,o,a,s,l;if(n==e)return B(n,r,F,t);for(i=n.parentNode,o=B(i,z,F,t);i;){for(;n;)a=n.nextSibling,s=B(n,r,F,t),t!=I&&o.appendChild(s),r=F,n=a;if(i==e)return o;n=i.nextSibling,i=i.parentNode,l=B(i,z,F,t),t!=I&&l.appendChild(o),o=l}}function B(e,t,r,i){var o,a,s,l,c;if(t)return D(e,i);if(3==e.nodeType){if(o=e.nodeValue,r?(l=H[W],a=o.substring(l),s=o.substring(0,l)):(l=H[$],a=o.substring(0,l),s=o.substring(l)),i!=O&&(e.nodeValue=s),i==I)return;return c=n.clone(e,z),c.nodeValue=a,c}if(i!=I)return n.clone(e,z)}function D(e,t){return t!=I?t==O?n.clone(e,F):e:void e.parentNode.removeChild(e)}function L(){return n.create("body",null,g()).outerText}var H=this,M=n.doc,P=0,O=1,I=2,F=!0,z=!1,W="startOffset",V="startContainer",U="endContainer",$="endOffset",q=e.extend,j=n.nodeIndex;return q(H,{startContainer:M,startOffset:0,endContainer:M,endOffset:0,collapsed:F,commonAncestorContainer:M,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:i,setEnd:o,setStartBefore:a,setStartAfter:s,setEndBefore:l,setEndAfter:c,collapse:u,selectNode:d,selectNodeContents:f,compareBoundaryPoints:p,deleteContents:h,extractContents:m,cloneContents:g,insertNode:v,surroundContents:y,cloneRange:b,toStringIE:L}),H}return t.prototype.toString=function(){return this.toStringIE()},t}),r(g,[u],function(e){function t(e){var t;return t=document.createElement("div"),t.innerHTML=e,t.textContent||t.innerText||e}function n(e,t){var n,r,i,a={};if(e){for(e=e.split(","),t=t||10,n=0;n<e.length;n+=2)r=String.fromCharCode(parseInt(e[n],t)),o[r]||(i="&"+e[n+1]+";",a[r]=i,a[i]=r);return a}}var r=e.makeMap,i,o,a,s=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,l=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,c=/[<>&\"\']/g,u=/&(#x|#)?([\w]+);/g,d={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};o={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},a={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"},i=n("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var f={encodeRaw:function(e,t){return e.replace(t?s:l,function(e){return o[e]||e})},encodeAllRaw:function(e){return(""+e).replace(c,function(e){return o[e]||e})},encodeNumeric:function(e,t){return e.replace(t?s:l,function(e){return e.length>1?"&#"+(1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320)+65536)+";":o[e]||"&#"+e.charCodeAt(0)+";"})},encodeNamed:function(e,t,n){return n=n||i,e.replace(t?s:l,function(e){return o[e]||n[e]||e})},getEncodeFunc:function(e,t){function a(e,n){return e.replace(n?s:l,function(e){return o[e]||t[e]||"&#"+e.charCodeAt(0)+";"||e})}function c(e,n){return f.encodeNamed(e,n,t)}return t=n(t)||i,e=r(e.replace(/\+/g,",")),e.named&&e.numeric?a:e.named?t?c:f.encodeNamed:e.numeric?f.encodeNumeric:f.encodeRaw},decode:function(e){return e.replace(u,function(e,n,r){return n?(r=parseInt(r,2===n.length?16:10),r>65535?(r-=65536,String.fromCharCode(55296+(r>>10),56320+(1023&r))):d[r]||String.fromCharCode(r)):a[e]||i[e]||t(e)})}};return f}),r(v,[],function(){return function(e,t){function n(t){e.getElementsByTagName("head")[0].appendChild(t)}function r(t,r,s){function l(){for(var e=v.passed,t=e.length;t--;)e[t]();v.status=2,v.passed=[],v.failed=[]}function c(){for(var e=v.failed,t=e.length;t--;)e[t]();v.status=3,v.passed=[],v.failed=[]}function u(){var e=navigator.userAgent.match(/WebKit\/(\d*)/);return!!(e&&e[1]<536)}function d(e,t){e()||((new Date).getTime()-g<a?window.setTimeout(t,0):c())}function f(){d(function(){for(var t=e.styleSheets,n,r=t.length,i;r--;)if(n=t[r],i=n.ownerNode?n.ownerNode:n.owningElement,i&&i.id===h.id)return l(),!0},f)}function p(){d(function(){try{var e=m.sheet.cssRules;return l(),!!e}catch(t){}},p)}var h,m,g,v;if(o[t]?v=o[t]:(v={passed:[],failed:[]},o[t]=v),r&&v.passed.push(r),s&&v.failed.push(s),1!=v.status){if(2==v.status)return void l();if(3==v.status)return void c();if(v.status=1,h=e.createElement("link"),h.rel="stylesheet",h.type="text/css",h.id="u"+i++,h.async=!1,h.defer=!1,g=(new Date).getTime(),"onload"in h&&!u())h.onload=f,h.onerror=c;else{if(navigator.userAgent.indexOf("Firefox")>0)return m=e.createElement("style"),m.textContent='@import "'+t+'"',p(),void n(m);f()}n(h),h.href=t}}var i=0,o={},a;t=t||{},a=t.maxLoadTime||5e3,this.load=r}}),r(y,[c,f,p,l,h,m,g,d,u,v],function(e,n,r,i,o,a,s,l,c,u){function d(e,t){var n={},r=t.keep_values,i;return i={set:function(n,r,i){t.url_converter&&(r=t.url_converter.call(t.url_converter_scope||e,r,i,n[0])),n.attr("data-mce-"+i,r).attr(i,r)},get:function(e,t){return e.attr("data-mce-"+t)||e.attr(t)}},n={style:{set:function(e,t){return null!==t&&"object"==typeof t?void e.css(t):(r&&e.attr("data-mce-style",t),void e.attr("style",t))},get:function(t){var n=t.attr("data-mce-style")||t.attr("style");return n=e.serializeStyle(e.parseStyle(n),t[0].nodeName)}}},r&&(n.href=n.src=i),n}function f(e,t){var o=this,a;o.doc=e,o.win=window,o.files={},o.counter=0,o.stdMode=!v||e.documentMode>=8,o.boxModel=!v||"CSS1Compat"==e.compatMode||o.stdMode,o.styleSheetLoader=new u(e),o.boundEvents=[],o.settings=t=t||{},o.schema=t.schema,o.styles=new r({url_converter:t.url_converter,url_converter_scope:t.url_converter_scope},t.schema),o.fixDoc(e),o.events=t.ownEvents?new i(t.proxy):i.Event,o.attrHooks=d(o,t),a=t.schema?t.schema.getBlockElements():{},o.$=n.overrideDefaults(function(){return{context:e,element:o.getRoot()}}),o.isBlock=function(e){if(!e)return!1;var t=e.nodeType;return t?!(1!==t||!a[e.nodeName]):!!a[e]}}var p=c.each,h=c.is,m=c.grep,g=c.trim,v=l.ie,y=/^([a-z0-9],?)+$/i,b=/^[ \t\r\n]*$/;return f.prototype={$$:function(e){return"string"==typeof e&&(e=this.get(e)),this.$(e)},root:null,fixDoc:function(e){var t=this.settings,n;if(v&&t.schema){"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g,function(t){e.createElement(t)});for(n in t.schema.getCustomElements())e.createElement(n)}},clone:function(e,t){var n=this,r,i;return!v||1!==e.nodeType||t?e.cloneNode(t):(i=n.doc,t?r.firstChild:(r=i.createElement(e.nodeName),p(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),r))},getRoot:function(){var e=this;return e.settings.root_element||e.doc.body},getViewPort:function(e){var t,n;return e=e?e:this.win,t=e.document,n=this.boxModel?t.documentElement:t.body,{x:e.pageXOffset||n.scrollLeft,y:e.pageYOffset||n.scrollTop,w:e.innerWidth||n.clientWidth,h:e.innerHeight||n.clientHeight}},getRect:function(e){var t=this,n,r;return e=t.get(e),n=t.getPos(e),r=t.getSize(e),{x:n.x,y:n.y,w:r.w,h:r.h}},getSize:function(e){var t=this,n,r;return e=t.get(e),n=t.getStyle(e,"width"),r=t.getStyle(e,"height"),-1===n.indexOf("px")&&(n=0),-1===r.indexOf("px")&&(r=0),{w:parseInt(n,10)||e.offsetWidth||e.clientWidth,h:parseInt(r,10)||e.offsetHeight||e.clientHeight}},getParent:function(e,t,n){return this.getParents(e,t,n,!1)},getParents:function(e,n,r,i){var o=this,a,s=[];for(e=o.get(e),i=i===t,r=r||("BODY"!=o.getRoot().nodeName?o.getRoot().parentNode:null),h(n,"string")&&(a=n,n="*"===n?function(e){return 1==e.nodeType}:function(e){return o.is(e,a)});e&&e!=r&&e.nodeType&&9!==e.nodeType;){if(!n||n(e)){if(!i)return e;s.push(e)}e=e.parentNode}return i?s:null},get:function(e){var t;return e&&this.doc&&"string"==typeof e&&(t=e,e=this.doc.getElementById(e),e&&e.id!==t)?this.doc.getElementsByName(t)[1]:e},getNext:function(e,t){return this._findSib(e,t,"nextSibling")},getPrev:function(e,t){return this._findSib(e,t,"previousSibling")},select:function(t,n){var r=this;return e(t,r.get(n)||r.settings.root_element||r.doc,[])},is:function(n,r){var i;if(n.length===t){if("*"===r)return 1==n.nodeType;if(y.test(r)){for(r=r.toLowerCase().split(/,/),n=n.nodeName.toLowerCase(),i=r.length-1;i>=0;i--)if(r[i]==n)return!0;return!1}}if(n.nodeType&&1!=n.nodeType)return!1;var o=n.nodeType?[n]:n;return e(r,o[0].ownerDocument||o[0],null,o).length>0},add:function(e,t,n,r,i){var o=this;return this.run(e,function(e){var a;return a=h(t,"string")?o.doc.createElement(t):t,o.setAttribs(a,n),r&&(r.nodeType?a.appendChild(r):o.setHTML(a,r)),i?a:e.appendChild(a)})},create:function(e,t,n){return this.add(this.doc.createElement(e),e,t,n,1)},createHTML:function(e,t,n){var r="",i;r+="<"+e;for(i in t)t.hasOwnProperty(i)&&null!==t[i]&&"undefined"!=typeof t[i]&&(r+=" "+i+'="'+this.encode(t[i])+'"');return"undefined"!=typeof n?r+">"+n+"</"+e+">":r+" />"},createFragment:function(e){var t,n,r=this.doc,i;for(i=r.createElement("div"),t=r.createDocumentFragment(),e&&(i.innerHTML=e);n=i.firstChild;)t.appendChild(n);return t},remove:function(e,t){return e=this.$$(e),t?e.each(function(){for(var e;e=this.firstChild;)3==e.nodeType&&0===e.data.length?this.removeChild(e):this.parentNode.insertBefore(e,this)}).remove():e.remove(),e.length>1?e.toArray():e[0]},setStyle:function(e,t,n){e=this.$$(e).css(t,n),this.settings.update_styles&&e.attr("data-mce-style",null)},getStyle:function(e,n,r){return e=this.$$(e),r?e.css(n):(n=n.replace(/-(\D)/g,function(e,t){return t.toUpperCase()}),"float"==n&&(n=v?"styleFloat":"cssFloat"),e[0]&&e[0].style?e[0].style[n]:t)},setStyles:function(e,t){this.$$(e).css(t)},removeAllAttribs:function(e){return this.run(e,function(e){var t,n=e.attributes;for(t=n.length-1;t>=0;t--)e.removeAttributeNode(n.item(t))})},setAttrib:function(e,t,n){var r=this,i,o,a=r.settings;""===n&&(n=null),e=r.$$(e),i=e.attr(t),e.length&&(o=r.attrHooks[t],o&&o.set?o.set(e,n,t):e.attr(t,n),i!=n&&a.onSetAttrib&&a.onSetAttrib({attrElm:e,attrName:t,attrValue:n}))},setAttribs:function(e,t){var n=this;n.$$(e).each(function(e,r){p(t,function(e,t){n.setAttrib(r,t,e)})})},getAttrib:function(e,t,n){var r=this,i,o;return e=r.$$(e),e.length&&(i=r.attrHooks[t],o=i&&i.get?i.get(e,t):e.attr(t)),"undefined"==typeof o&&(o=n||""),o},getPos:function(e,t){var r=this,i=0,o=0,a,s=r.doc,l=s.body,c;if(e=r.get(e),t=t||l,e){if(t===l&&e.getBoundingClientRect&&"static"===n(l).css("position"))return c=e.getBoundingClientRect(),t=r.boxModel?s.documentElement:l,i=c.left+(s.documentElement.scrollLeft||l.scrollLeft)-t.clientLeft,o=c.top+(s.documentElement.scrollTop||l.scrollTop)-t.clientTop,{x:i,y:o};for(a=e;a&&a!=t&&a.nodeType;)i+=a.offsetLeft||0,o+=a.offsetTop||0,a=a.offsetParent;for(a=e.parentNode;a&&a!=t&&a.nodeType;)i-=a.scrollLeft||0,o-=a.scrollTop||0,a=a.parentNode}return{x:i,y:o}},parseStyle:function(e){return this.styles.parse(e)},serializeStyle:function(e,t){return this.styles.serialize(e,t)},addStyle:function(e){var t=this,n=t.doc,r,i;if(t!==f.DOM&&n===document){var o=f.DOM.addedStyles;if(o=o||[],o[e])return;o[e]=!0,f.DOM.addedStyles=o}i=n.getElementById("mceDefaultStyles"),i||(i=n.createElement("style"),i.id="mceDefaultStyles",i.type="text/css",r=n.getElementsByTagName("head")[0],r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i)),i.styleSheet?i.styleSheet.cssText+=e:i.appendChild(n.createTextNode(e))},loadCSS:function(e){var t=this,n=t.doc,r;return t!==f.DOM&&n===document?void f.DOM.loadCSS(e):(e||(e=""),r=n.getElementsByTagName("head")[0],void p(e.split(","),function(e){var i;t.files[e]||(t.files[e]=!0,i=t.create("link",{rel:"stylesheet",href:e}),v&&n.documentMode&&n.recalc&&(i.onload=function(){n.recalc&&n.recalc(),i.onload=null}),r.appendChild(i))}))},addClass:function(e,t){this.$$(e).addClass(t)},removeClass:function(e,t){this.toggleClass(e,t,!1)},hasClass:function(e,t){return this.$$(e).hasClass(t)},toggleClass:function(e,t,r){this.$$(e).toggleClass(t,r).each(function(){""===this.className&&n(this).attr("class",null)})},show:function(e){this.$$(e).show()},hide:function(e){this.$$(e).hide()},isHidden:function(e){return"none"==this.$$(e).css("display")},uniqueId:function(e){return(e?e:"mce_")+this.counter++},setHTML:function(e,t){e=this.$$(e),v?e.each(function(e,r){if(r.canHaveHTML!==!1){for(;r.firstChild;)r.removeChild(r.firstChild);try{r.innerHTML="<br>"+t,r.removeChild(r.firstChild)}catch(i){n("<div>").html("<br>"+t).contents().slice(1).appendTo(r)}return t}}):e.html(t)},getOuterHTML:function(e){return e=this.get(e),1==e.nodeType?e.outerHTML:n("<div>").append(n(e).clone()).html()},setOuterHTML:function(e,t){var r=this;r.$$(e).each(function(){try{this.outerHTML=t}catch(e){r.remove(n(this).html(t),!0)}})},decode:s.decode,encode:s.encodeAllRaw,insertAfter:function(e,t){return t=this.get(t),this.run(e,function(e){var n,r;return n=t.parentNode,r=t.nextSibling,r?n.insertBefore(e,r):n.appendChild(e),e})},replace:function(e,t,n){var r=this;return r.run(t,function(t){return h(t,"array")&&(e=e.cloneNode(!0)),n&&p(m(t.childNodes),function(t){e.appendChild(t)}),t.parentNode.replaceChild(e,t)})},rename:function(e,t){var n=this,r;return e.nodeName!=t.toUpperCase()&&(r=n.create(t),p(n.getAttribs(e),function(t){n.setAttrib(r,t.nodeName,n.getAttrib(e,t.nodeName))}),n.replace(r,e,1)),r||e},findCommonAncestor:function(e,t){for(var n=e,r;n;){for(r=t;r&&n!=r;)r=r.parentNode;if(n==r)break;n=n.parentNode}return!n&&e.ownerDocument?e.ownerDocument.documentElement:n},toHex:function(e){return this.styles.toHex(c.trim(e))},run:function(e,t,n){var r=this,i;return"string"==typeof e&&(e=r.get(e)),e?(n=n||this,e.nodeType||!e.length&&0!==e.length?t.call(n,e):(i=[],p(e,function(e,o){e&&("string"==typeof e&&(e=r.get(e)),i.push(t.call(n,e,o)))}),i)):!1},getAttribs:function(e){var t;if(e=this.get(e),!e)return[];if(v){if(t=[],"OBJECT"==e.nodeName)return e.attributes;"OPTION"===e.nodeName&&this.getAttrib(e,"selected")&&t.push({specified:1,nodeName:"selected"});var n=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;return e.cloneNode(!1).outerHTML.replace(n,"").replace(/[\w:\-]+/gi,function(e){t.push({specified:1,nodeName:e})}),t}return e.attributes},isEmpty:function(e,t){var n=this,r,i,a,s,l,c=0;if(e=e.firstChild){s=new o(e,e.parentNode),t=t||n.schema?n.schema.getNonEmptyElements():null;do{if(a=e.nodeType,1===a){if(e.getAttribute("data-mce-bogus"))continue;if(l=e.nodeName.toLowerCase(),t&&t[l]){if("br"===l){c++;continue}return!1}for(i=n.getAttribs(e),r=i.length;r--;)if(l=i[r].nodeName,"name"===l||"data-mce-bookmark"===l)return!1}if(8==a)return!1;if(3===a&&!b.test(e.nodeValue))return!1}while(e=s.next())}return 1>=c},createRng:function(){var e=this.doc;return e.createRange?e.createRange():new a(this)},nodeIndex:function(e,t){var n=0,r,i;if(e)for(r=e.nodeType,e=e.previousSibling;e;e=e.previousSibling)i=e.nodeType,(!t||3!=i||i!=r&&e.nodeValue.length)&&(n++,r=i);return n},split:function(e,t,n){function r(e){function t(e){var t=e.previousSibling&&"SPAN"==e.previousSibling.nodeName,n=e.nextSibling&&"SPAN"==e.nextSibling.nodeName;return t&&n}var n,o=e.childNodes,a=e.nodeType;if(1!=a||"bookmark"!=e.getAttribute("data-mce-type")){for(n=o.length-1;n>=0;n--)r(o[n]);if(9!=a){if(3==a&&e.nodeValue.length>0){var s=g(e.nodeValue).length;if(!i.isBlock(e.parentNode)||s>0||0===s&&t(e))return}else if(1==a&&(o=e.childNodes,1==o.length&&o[0]&&1==o[0].nodeType&&"bookmark"==o[0].getAttribute("data-mce-type")&&e.parentNode.insertBefore(o[0],e),o.length||/^(br|hr|input|img)$/i.test(e.nodeName)))return;i.remove(e)}return e
}}var i=this,o=i.createRng(),a,s,l;return e&&t?(o.setStart(e.parentNode,i.nodeIndex(e)),o.setEnd(t.parentNode,i.nodeIndex(t)),a=o.extractContents(),o=i.createRng(),o.setStart(t.parentNode,i.nodeIndex(t)+1),o.setEnd(e.parentNode,i.nodeIndex(e)+1),s=o.extractContents(),l=e.parentNode,l.insertBefore(r(a),e),n?l.replaceChild(n,t):l.insertBefore(t,e),l.insertBefore(r(s),e),i.remove(e),n||t):void 0},bind:function(e,t,n,r){var i=this;if(c.isArray(e)){for(var o=e.length;o--;)e[o]=i.bind(e[o],t,n,r);return e}return!i.settings.collect||e!==i.doc&&e!==i.win||i.boundEvents.push([e,t,n,r]),i.events.bind(e,t,n,r||i)},unbind:function(e,t,n){var r=this,i;if(c.isArray(e)){for(i=e.length;i--;)e[i]=r.unbind(e[i],t,n);return e}if(r.boundEvents&&(e===r.doc||e===r.win))for(i=r.boundEvents.length;i--;){var o=r.boundEvents[i];e!=o[0]||t&&t!=o[1]||n&&n!=o[2]||this.events.unbind(o[0],o[1],o[2])}return this.events.unbind(e,t,n)},fire:function(e,t,n){return this.events.fire(e,t,n)},getContentEditable:function(e){var t;return e&&1==e.nodeType?(t=e.getAttribute("data-mce-contenteditable"),t&&"inherit"!==t?t:"inherit"!==e.contentEditable?e.contentEditable:null):null},getContentEditableParent:function(e){for(var t=this.getRoot(),n=null;e&&e!==t&&(n=this.getContentEditable(e),null===n);e=e.parentNode);return n},destroy:function(){var t=this;if(t.boundEvents){for(var n=t.boundEvents.length;n--;){var r=t.boundEvents[n];this.events.unbind(r[0],r[1],r[2])}t.boundEvents=null}e.setDocument&&e.setDocument(),t.win=t.doc=t.root=t.events=t.frag=null},isChildOf:function(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1},dumpRng:function(e){return"startContainer: "+e.startContainer.nodeName+", startOffset: "+e.startOffset+", endContainer: "+e.endContainer.nodeName+", endOffset: "+e.endOffset},_findSib:function(e,t,n){var r=this,i=t;if(e)for("string"==typeof i&&(i=function(e){return r.is(e,t)}),e=e[n];e;e=e[n])if(i(e))return e;return null}},f.DOM=new f(document),f}),r(b,[y,u],function(e,t){function n(){function e(e,t){function n(){o.remove(s),a&&(a.onreadystatechange=a.onload=a=null),t()}function i(){"undefined"!=typeof console&&console.log&&console.log("Failed to load: "+e)}var o=r,a,s;s=o.uniqueId(),a=document.createElement("script"),a.id=s,a.type="text/javascript",a.src=e,"onreadystatechange"in a?a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&n()}:a.onload=n,a.onerror=i,(document.getElementsByTagName("head")[0]||document.body).appendChild(a)}var t=0,n=1,a=2,s={},l=[],c={},u=[],d=0,f;this.isDone=function(e){return s[e]==a},this.markDone=function(e){s[e]=a},this.add=this.load=function(e,n,r){var i=s[e];i==f&&(l.push(e),s[e]=t),n&&(c[e]||(c[e]=[]),c[e].push({func:n,scope:r||this}))},this.loadQueue=function(e,t){this.loadScripts(l,e,t)},this.loadScripts=function(t,r,l){function p(e){i(c[e],function(e){e.func.call(e.scope)}),c[e]=f}var h;u.push({func:r,scope:l||this}),(h=function(){var r=o(t);t.length=0,i(r,function(t){return s[t]==a?void p(t):void(s[t]!=n&&(s[t]=n,d++,e(t,function(){s[t]=a,d--,p(t),h()})))}),d||(i(u,function(e){e.func.call(e.scope)}),u.length=0)})()}}var r=e.DOM,i=t.each,o=t.grep;return n.ScriptLoader=new n,n}),r(C,[b,u],function(e,n){function r(){var e=this;e.items=[],e.urls={},e.lookup={}}var i=n.each;return r.prototype={get:function(e){return this.lookup[e]?this.lookup[e].instance:t},dependencies:function(e){var t;return this.lookup[e]&&(t=this.lookup[e].dependencies),t||[]},requireLangPack:function(t,n){var i=r.language;if(i&&r.languageLoad!==!1){if(n)if(n=","+n+",",-1!=n.indexOf(","+i.substr(0,2)+","))i=i.substr(0,2);else if(-1==n.indexOf(","+i+","))return;e.ScriptLoader.add(this.urls[t]+"/langs/"+i+".js")}},add:function(e,t,n){return this.items.push(t),this.lookup[e]={instance:t,dependencies:n},t},createUrl:function(e,t){return"object"==typeof t?t:{prefix:e.prefix,resource:t,suffix:e.suffix}},addComponents:function(t,n){var r=this.urls[t];i(n,function(t){e.ScriptLoader.add(r+"/"+t)})},load:function(n,o,a,s){function l(){var r=c.dependencies(n);i(r,function(e){var n=c.createUrl(o,e);c.load(n.resource,n,t,t)}),a&&a.call(s?s:e)}var c=this,u=o;c.urls[n]||("object"==typeof o&&(u=o.prefix+o.resource+o.suffix),0!==u.indexOf("/")&&-1==u.indexOf("://")&&(u=r.baseURL+"/"+u),c.urls[n]=u.substring(0,u.lastIndexOf("/")),c.lookup[n]?l():e.ScriptLoader.add(u,l,s))}},r.PluginManager=new r,r.ThemeManager=new r,r}),r(x,[u,h],function(e,t){function n(e,t){var n=e.childNodes;return t--,t>n.length-1?t=n.length-1:0>t&&(t=0),n[t]||e}function r(e){this.walk=function(t,r){function o(e){var t;return t=e[0],3===t.nodeType&&t===c&&u>=t.nodeValue.length&&e.splice(0,1),t=e[e.length-1],0===f&&e.length>0&&t===d&&3===t.nodeType&&e.splice(e.length-1,1),e}function a(e,t,n){for(var r=[];e&&e!=n;e=e[t])r.push(e);return r}function s(e,t){do{if(e.parentNode==t)return e;e=e.parentNode}while(e)}function l(e,t,n){var i=n?"nextSibling":"previousSibling";for(g=e,v=g.parentNode;g&&g!=t;g=v)v=g.parentNode,y=a(g==e?g:g[i],i),y.length&&(n||y.reverse(),r(o(y)))}var c=t.startContainer,u=t.startOffset,d=t.endContainer,f=t.endOffset,p,h,m,g,v,y,b;if(b=e.select("td.mce-item-selected,th.mce-item-selected"),b.length>0)return void i(b,function(e){r([e])});if(1==c.nodeType&&c.hasChildNodes()&&(c=c.childNodes[u]),1==d.nodeType&&d.hasChildNodes()&&(d=n(d,f)),c==d)return r(o([c]));for(p=e.findCommonAncestor(c,d),g=c;g;g=g.parentNode){if(g===d)return l(c,p,!0);if(g===p)break}for(g=d;g;g=g.parentNode){if(g===c)return l(d,p);if(g===p)break}h=s(c,p)||c,m=s(d,p)||d,l(c,h,!0),y=a(h==c?h:h.nextSibling,"nextSibling",m==d?m.nextSibling:m),y.length&&r(o(y)),l(d,m)},this.split=function(e){function t(e,t){return e.splitText(t)}var n=e.startContainer,r=e.startOffset,i=e.endContainer,o=e.endOffset;return n==i&&3==n.nodeType?r>0&&r<n.nodeValue.length&&(i=t(n,r),n=i.previousSibling,o>r?(o-=r,n=i=t(i,o).previousSibling,o=i.nodeValue.length,r=0):o=0):(3==n.nodeType&&r>0&&r<n.nodeValue.length&&(n=t(n,r),r=0),3==i.nodeType&&o>0&&o<i.nodeValue.length&&(i=t(i,o).previousSibling,o=i.nodeValue.length)),{startContainer:n,startOffset:r,endContainer:i,endOffset:o}},this.normalize=function(n){function r(r){function a(n,r){for(var i=new t(n,e.getParent(n.parentNode,e.isBlock)||f);n=i[r?"prev":"next"]();)if("BR"===n.nodeName)return!0}function s(e,t){return e.previousSibling&&e.previousSibling.nodeName==t}function l(n,r){var a,s,l;if(r=r||c,l=e.getParent(r.parentNode,e.isBlock)||f,n&&"BR"==r.nodeName&&g&&e.isEmpty(l))return c=r.parentNode,u=e.nodeIndex(r),void(i=!0);for(a=new t(r,l);p=a[n?"prev":"next"]();){if("false"===e.getContentEditableParent(p))return;if(3===p.nodeType&&p.nodeValue.length>0)return c=p,u=n?p.nodeValue.length:0,void(i=!0);if(e.isBlock(p)||h[p.nodeName.toLowerCase()])return;s=p}o&&s&&(c=s,i=!0,u=0)}var c,u,d,f=e.getRoot(),p,h,m,g;if(c=n[(r?"start":"end")+"Container"],u=n[(r?"start":"end")+"Offset"],g=1==c.nodeType&&u===c.childNodes.length,h=e.schema.getNonEmptyElements(),m=r,1==c.nodeType&&u>c.childNodes.length-1&&(m=!1),9===c.nodeType&&(c=e.getRoot(),u=0),c===f){if(m&&(p=c.childNodes[u>0?u-1:0],p&&(h[p.nodeName]||"TABLE"==p.nodeName)))return;if(c.hasChildNodes()&&(u=Math.min(!m&&u>0?u-1:u,c.childNodes.length-1),c=c.childNodes[u],u=0,c.hasChildNodes()&&!/TABLE/.test(c.nodeName))){p=c,d=new t(c,f);do{if(3===p.nodeType&&p.nodeValue.length>0){u=m?0:p.nodeValue.length,c=p,i=!0;break}if(h[p.nodeName.toLowerCase()]){u=e.nodeIndex(p),c=p.parentNode,"IMG"!=p.nodeName||m||u++,i=!0;break}}while(p=m?d.next():d.prev())}}o&&(3===c.nodeType&&0===u&&l(!0),1===c.nodeType&&(p=c.childNodes[u],p||(p=c.childNodes[u-1]),!p||"BR"!==p.nodeName||s(p,"A")||a(p)||a(p,!0)||l(!0,p))),m&&!o&&3===c.nodeType&&u===c.nodeValue.length&&l(!1),i&&n["set"+(r?"Start":"End")](c,u)}var i,o;return o=n.collapsed,r(!0),o||r(),i&&o&&n.collapse(!0),i}}var i=e.each;return r.compareRanges=function(e,t){if(e&&t){if(!e.item&&!e.duplicate)return e.startContainer==t.startContainer&&e.startOffset==t.startOffset;if(e.item&&t.item&&e.item(0)===t.item(0))return!0;if(e.isEqual&&t.isEqual&&t.isEqual(e))return!0}return!1},r}),r(w,[x],function(e){return function(t){function n(e){var n,r;if(r=t.$(e).parentsUntil(t.getBody()).add(e),r.length===i.length){for(n=r.length;n>=0&&r[n]===i[n];n--);if(-1===n)return i=r,!0}return i=r,!1}var r,i=[];"onselectionchange"in t.getDoc()||t.on("NodeChange Click MouseUp KeyUp Focus",function(n){var i,o;i=t.selection.getRng(),o={startContainer:i.startContainer,startOffset:i.startOffset,endContainer:i.endContainer,endOffset:i.endOffset},"nodechange"!=n.type&&e.compareRanges(o,r)||t.fire("SelectionChange"),r=o}),t.on("contextmenu",function(){t.fire("SelectionChange")}),t.on("SelectionChange",function(){var e=t.selection.getStart(!0);!n(e)&&t.dom.isChildOf(e,t.getBody())&&t.nodeChanged({selectionChange:!0})}),t.on("MouseUp",function(e){e.isDefaultPrevented()||t.nodeChanged()}),this.nodeChanged=function(e){var n=t.selection,r,i,o;!t.initialized||t.settings.disable_nodechange||t.settings.readonly||(o=t.getBody(),r=n.getStart()||o,r=r.ownerDocument!=t.getDoc()?t.getBody():r,"IMG"==r.nodeName&&n.isCollapsed()&&(r=r.parentNode),i=[],t.dom.getParent(r,function(e){return e===o?!0:void i.push(e)}),e=e||{},e.element=r,e.parents=i,t.fire("NodeChange",e))}}}),r(_,[],function(){function e(e,t,n){var r,i,o=n?"lastChild":"firstChild",a=n?"prev":"next";if(e[o])return e[o];if(e!==t){if(r=e[a])return r;for(i=e.parent;i&&i!==t;i=i.parent)if(r=i[a])return r}}function t(e,t){this.name=e,this.type=t,1===t&&(this.attributes=[],this.attributes.map={})}var n=/^[ \t\r\n]*$/,r={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};return t.prototype={replace:function(e){var t=this;return e.parent&&e.remove(),t.insert(e,t),t.remove(),t},attr:function(e,t){var n=this,r,i,o;if("string"!=typeof e){for(i in e)n.attr(i,e[i]);return n}if(r=n.attributes){if(t!==o){if(null===t){if(e in r.map)for(delete r.map[e],i=r.length;i--;)if(r[i].name===e)return r=r.splice(i,1),n;return n}if(e in r.map){for(i=r.length;i--;)if(r[i].name===e){r[i].value=t;break}}else r.push({name:e,value:t});return r.map[e]=t,n}return r.map[e]}},clone:function(){var e=this,n=new t(e.name,e.type),r,i,o,a,s;if(o=e.attributes){for(s=[],s.map={},r=0,i=o.length;i>r;r++)a=o[r],"id"!==a.name&&(s[s.length]={name:a.name,value:a.value},s.map[a.name]=a.value);n.attributes=s}return n.value=e.value,n.shortEnded=e.shortEnded,n},wrap:function(e){var t=this;return t.parent.insert(e,t),e.append(t),t},unwrap:function(){var e=this,t,n;for(t=e.firstChild;t;)n=t.next,e.insert(t,e,!0),t=n;e.remove()},remove:function(){var e=this,t=e.parent,n=e.next,r=e.prev;return t&&(t.firstChild===e?(t.firstChild=n,n&&(n.prev=null)):r.next=n,t.lastChild===e?(t.lastChild=r,r&&(r.next=null)):n.prev=r,e.parent=e.next=e.prev=null),e},append:function(e){var t=this,n;return e.parent&&e.remove(),n=t.lastChild,n?(n.next=e,e.prev=n,t.lastChild=e):t.lastChild=t.firstChild=e,e.parent=t,e},insert:function(e,t,n){var r;return e.parent&&e.remove(),r=t.parent||this,n?(t===r.firstChild?r.firstChild=e:t.prev.next=e,e.prev=t.prev,e.next=t,t.prev=e):(t===r.lastChild?r.lastChild=e:t.next.prev=e,e.next=t.next,e.prev=t,t.next=e),e.parent=r,e},getAll:function(t){var n=this,r,i=[];for(r=n.firstChild;r;r=e(r,n))r.name===t&&i.push(r);return i},empty:function(){var t=this,n,r,i;if(t.firstChild){for(n=[],i=t.firstChild;i;i=e(i,t))n.push(i);for(r=n.length;r--;)i=n[r],i.parent=i.firstChild=i.lastChild=i.next=i.prev=null}return t.firstChild=t.lastChild=null,t},isEmpty:function(t){var r=this,i=r.firstChild,o,a;if(i)do{if(1===i.type){if(i.attributes.map["data-mce-bogus"])continue;if(t[i.name])return!1;for(o=i.attributes.length;o--;)if(a=i.attributes[o].name,"name"===a||0===a.indexOf("data-mce-"))return!1}if(8===i.type)return!1;if(3===i.type&&!n.test(i.value))return!1}while(i=e(i,r));return!0},walk:function(t){return e(this,null,t)}},t.create=function(e,n){var i,o;if(i=new t(e,r[e]||1),n)for(o in n)i.attr(o,n[o]);return i},t}),r(E,[u],function(e){function t(e,t){return e?e.split(t||" "):[]}function n(e){function n(e,n,r){function i(e,t){var n={},r,i;for(r=0,i=e.length;i>r;r++)n[e[r]]=t||{};return n}var s,c,u,d=arguments;for(r=r||[],n=n||"","string"==typeof r&&(r=t(r)),c=3;c<d.length;c++)"string"==typeof d[c]&&(d[c]=t(d[c])),r.push.apply(r,d[c]);for(e=t(e),s=e.length;s--;)u=[].concat(l,t(n)),a[e[s]]={attributes:i(u),attributesOrder:u,children:i(r,o)}}function r(e,n){var r,i,o,s;for(e=t(e),r=e.length,n=t(n);r--;)for(i=a[e[r]],o=0,s=n.length;s>o;o++)i.attributes[n[o]]={},i.attributesOrder.push(n[o])}var a={},l,c,u,d,f,p;return i[e]?i[e]:(l=t("id accesskey class dir lang style tabindex title"),c=t("address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul"),u=t("a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment"),"html4"!=e&&(l.push.apply(l,t("contenteditable contextmenu draggable dropzone hidden spellcheck translate")),c.push.apply(c,t("article aside details dialog figure header footer hgroup section nav")),u.push.apply(u,t("audio canvas command datalist mark meter output progress time wbr video ruby bdi keygen"))),"html5-strict"!=e&&(l.push("xml:lang"),p=t("acronym applet basefont big font strike tt"),u.push.apply(u,p),s(p,function(e){n(e,"",u)}),f=t("center dir isindex noframes"),c.push.apply(c,f),d=[].concat(c,u),s(f,function(e){n(e,"",d)})),d=d||[].concat(c,u),n("html","manifest","head body"),n("head","","base command link meta noscript script style title"),n("title hr noscript br"),n("base","href target"),n("link","href rel media hreflang type sizes hreflang"),n("meta","name http-equiv content charset"),n("style","media type scoped"),n("script","src async defer type charset"),n("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",d),n("address dt dd div caption","",d),n("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",u),n("blockquote","cite",d),n("ol","reversed start type","li"),n("ul","","li"),n("li","value",d),n("dl","","dt dd"),n("a","href target rel media hreflang type",u),n("q","cite",u),n("ins del","cite datetime",d),n("img","src alt usemap ismap width height"),n("iframe","src name width height",d),n("embed","src type width height"),n("object","data type typemustmatch name usemap form width height",d,"param"),n("param","name value"),n("map","name",d,"area"),n("area","alt coords shape href target rel media hreflang type"),n("table","border","caption colgroup thead tfoot tbody tr"+("html4"==e?" col":"")),n("colgroup","span","col"),n("col","span"),n("tbody thead tfoot","","tr"),n("tr","","td th"),n("td","colspan rowspan headers",d),n("th","colspan rowspan headers scope abbr",d),n("form","accept-charset action autocomplete enctype method name novalidate target",d),n("fieldset","disabled form name",d,"legend"),n("label","form for",u),n("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),n("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"==e?d:u),n("select","disabled form multiple name required size","option optgroup"),n("optgroup","disabled label","option"),n("option","disabled label selected value"),n("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),n("menu","type label",d,"li"),n("noscript","",d),"html4"!=e&&(n("wbr"),n("ruby","",u,"rt rp"),n("figcaption","",d),n("mark rt rp summary bdi","",u),n("canvas","width height",d),n("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",d,"track source"),n("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",d,"track source"),n("source","src type media"),n("track","kind src srclang label default"),n("datalist","",u,"option"),n("article section nav aside header footer","",d),n("hgroup","","h1 h2 h3 h4 h5 h6"),n("figure","",d,"figcaption"),n("time","datetime",u),n("dialog","open",d),n("command","type label icon disabled checked radiogroup command"),n("output","for form name",u),n("progress","value max",u),n("meter","value min max low high optimum",u),n("details","open",d,"summary"),n("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!=e&&(r("script","language xml:space"),r("style","xml:space"),r("object","declare classid code codebase codetype archive standby align border hspace vspace"),r("embed","align name hspace vspace"),r("param","valuetype type"),r("a","charset name rev shape coords"),r("br","clear"),r("applet","codebase archive code object alt name width height align hspace vspace"),r("img","name longdesc align border hspace vspace"),r("iframe","longdesc frameborder marginwidth marginheight scrolling align"),r("font basefont","size color face"),r("input","usemap align"),r("select","onchange"),r("textarea"),r("h1 h2 h3 h4 h5 h6 div p legend caption","align"),r("ul","type compact"),r("li","type"),r("ol dl menu dir","compact"),r("pre","width xml:space"),r("hr","align noshade size width"),r("isindex","prompt"),r("table","summary width frame rules cellspacing cellpadding align bgcolor"),r("col","width align char charoff valign"),r("colgroup","width align char charoff valign"),r("thead","align char charoff valign"),r("tr","align char charoff valign bgcolor"),r("th","axis align char charoff valign nowrap bgcolor width height"),r("form","accept"),r("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),r("tfoot","align char charoff valign"),r("tbody","align char charoff valign"),r("area","nohref"),r("body","background bgcolor text link vlink alink")),"html4"!=e&&(r("input button select textarea","autofocus"),r("input textarea","placeholder"),r("a","download"),r("link script img","crossorigin"),r("iframe","sandbox seamless allowfullscreen")),s(t("a form meter progress dfn"),function(e){a[e]&&delete a[e].children[e]}),delete a.caption.children.table,i[e]=a,a)}function r(e,t){var n;return e&&(n={},"string"==typeof e&&(e={"*":e}),s(e,function(e,r){n[r]="map"==t?a(e,/[, ]/):c(e,/[, ]/)})),n}var i={},o={},a=e.makeMap,s=e.each,l=e.extend,c=e.explode,u=e.inArray;return function(e){function o(t,n,r){var o=e[t];return o?o=a(o,/[, ]/,a(o.toUpperCase(),/[, ]/)):(o=i[t],o||(o=a(n," ",a(n.toUpperCase()," ")),o=l(o,r),i[t]=o)),o}function d(e){return new RegExp("^"+e.replace(/([?+*])/g,".$1")+"$")}function f(e){var n,r,i,o,s,l,c,f,p,h,m,g,v,b,x,w,_,E,N,k=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,S=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,T=/[*?+]/;if(e)for(e=t(e,","),y["@"]&&(w=y["@"].attributes,_=y["@"].attributesOrder),n=0,r=e.length;r>n;n++)if(s=k.exec(e[n])){if(b=s[1],p=s[2],x=s[3],f=s[5],g={},v=[],l={attributes:g,attributesOrder:v},"#"===b&&(l.paddEmpty=!0),"-"===b&&(l.removeEmpty=!0),"!"===s[4]&&(l.removeEmptyAttrs=!0),w){for(E in w)g[E]=w[E];v.push.apply(v,_)}if(f)for(f=t(f,"|"),i=0,o=f.length;o>i;i++)if(s=S.exec(f[i])){if(c={},m=s[1],h=s[2].replace(/::/g,":"),b=s[3],N=s[4],"!"===m&&(l.attributesRequired=l.attributesRequired||[],l.attributesRequired.push(h),c.required=!0),"-"===m){delete g[h],v.splice(u(v,h),1);continue}b&&("="===b&&(l.attributesDefault=l.attributesDefault||[],l.attributesDefault.push({name:h,value:N}),c.defaultValue=N),":"===b&&(l.attributesForced=l.attributesForced||[],l.attributesForced.push({name:h,value:N}),c.forcedValue=N),"<"===b&&(c.validValues=a(N,"?"))),T.test(h)?(l.attributePatterns=l.attributePatterns||[],c.pattern=d(h),l.attributePatterns.push(c)):(g[h]||v.push(h),g[h]=c)}w||"@"!=p||(w=g,_=v),x&&(l.outputName=p,y[x]=l),T.test(p)?(l.pattern=d(p),C.push(l)):y[p]=l}}function p(e){y={},C=[],f(e),s(_,function(e,t){b[t]=e.children})}function h(e){var n=/^(~)?(.+)$/;e&&(i.text_block_elements=i.block_elements=null,s(t(e,","),function(e){var t=n.exec(e),r="~"===t[1],i=r?"span":"div",o=t[2];if(b[o]=b[i],L[o]=i,r||(R[o.toUpperCase()]={},R[o]={}),!y[o]){var a=y[i];a=l({},a),delete a.removeEmptyAttrs,delete a.removeEmpty,y[o]=a}s(b,function(e,t){e[i]&&(b[t]=e=l({},b[t]),e[o]=e[i])})}))}function m(e){var n=/^([+\-]?)(\w+)\[([^\]]+)\]$/;e&&s(t(e,","),function(e){var r=n.exec(e),i,o;r&&(o=r[1],i=o?b[r[2]]:b[r[2]]={"#comment":{}},i=b[r[2]],s(t(r[3],"|"),function(e){"-"===o?(b[r[2]]=i=l({},b[r[2]]),delete i[e]):i[e]={}}))})}function g(e){var t=y[e],n;if(t)return t;for(n=C.length;n--;)if(t=C[n],t.pattern.test(e))return t}var v=this,y={},b={},C=[],x,w,_,E,N,k,S,T,R,A,B,D,L={},H={};e=e||{},_=n(e.schema),e.verify_html===!1&&(e.valid_elements="*[*]"),x=r(e.valid_styles),w=r(e.invalid_styles,"map"),T=r(e.valid_classes,"map"),E=o("whitespace_elements","pre script noscript style textarea video audio iframe object"),N=o("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),k=o("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),S=o("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),A=o("non_empty_elements","td th iframe video audio object script",k),B=o("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),R=o("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup",B),D=o("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp"),s((e.special||"script noscript style textarea").split(" "),function(e){H[e]=new RegExp("</"+e+"[^>]*>","gi")}),e.valid_elements?p(e.valid_elements):(s(_,function(e,t){y[t]={attributes:e.attributes,attributesOrder:e.attributesOrder},b[t]=e.children}),"html5"!=e.schema&&s(t("strong/b em/i"),function(e){e=t(e,"/"),y[e[1]].outputName=e[0]}),y.img.attributesDefault=[{name:"alt",value:""}],s(t("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(e){y[e]&&(y[e].removeEmpty=!0)}),s(t("p h1 h2 h3 h4 h5 h6 th td pre div address caption"),function(e){y[e].paddEmpty=!0}),s(t("span"),function(e){y[e].removeEmptyAttrs=!0})),h(e.custom_elements),m(e.valid_children),f(e.extended_valid_elements),m("+ol[ul|ol],+ul[ul|ol]"),e.invalid_elements&&s(c(e.invalid_elements),function(e){y[e]&&delete y[e]}),g("span")||f("span[!data-mce-type|*]"),v.children=b,v.getValidStyles=function(){return x},v.getInvalidStyles=function(){return w},v.getValidClasses=function(){return T},v.getBoolAttrs=function(){return S},v.getBlockElements=function(){return R},v.getTextBlockElements=function(){return B},v.getTextInlineElements=function(){return D},v.getShortEndedElements=function(){return k},v.getSelfClosingElements=function(){return N},v.getNonEmptyElements=function(){return A},v.getWhiteSpaceElements=function(){return E},v.getSpecialElements=function(){return H},v.isValidChild=function(e,t){var n=b[e];return!(!n||!n[t])},v.isValid=function(e,t){var n,r,i=g(e);if(i){if(!t)return!0;if(i.attributes[t])return!0;if(n=i.attributePatterns)for(r=n.length;r--;)if(n[r].pattern.test(e))return!0}return!1},v.getElementRule=g,v.getCustomElements=function(){return L},v.addValidElements=f,v.setValidElements=p,v.addCustomElements=h,v.addValidChildren=m,v.elements=y}}),r(N,[E,g,u],function(e,t,n){function r(e,t,n){var r=1,i,o,a,s;for(s=e.getShortEndedElements(),a=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g,a.lastIndex=i=n;o=a.exec(t);){if(i=a.lastIndex,"/"===o[1])r--;else if(!o[1]){if(o[2]in s)continue;r++}if(0===r)break}return i}function i(i,a){function s(){}var l=this;i=i||{},l.schema=a=a||new e,i.fix_self_closing!==!1&&(i.fix_self_closing=!0),o("comment cdata text start end pi doctype".split(" "),function(e){e&&(l[e]=i[e]||s)}),l.parse=function(e){function o(e){var t,n;for(t=p.length;t--&&p[t].name!==e;);if(t>=0){for(n=p.length-1;n>=t;n--)e=p[n],e.valid&&l.end(e.name);p.length=t}}function s(e,t,n,r,o){var a,s,l=/[\s\u0000-\u001F]+/g;if(t=t.toLowerCase(),n=t in x?t:z(n||r||o||""),_&&!y&&0!==t.indexOf("data-")){if(a=T[t],!a&&R){for(s=R.length;s--&&(a=R[s],!a.pattern.test(t)););-1===s&&(a=null)}if(!a)return;if(a.validValues&&!(n in a.validValues))return}if(V[t]&&!i.allow_script_urls){var c=n.replace(l,"");try{c=decodeURIComponent(c)}catch(u){c=unescape(c)}if(U.test(c))return;if(!i.allow_html_data_urls&&$.test(c)&&!/^data:image\//i.test(c))return}h.map[t]=n,h.push({name:t,value:n})}var l=this,c,u=0,d,f,p=[],h,m,g,v,y,b,C,x,w,_,E,N,k,S,T,R,A,B,D,L,H,M,P,O,I,F=0,z=t.decode,W,V=n.makeMap("src,href,data,background,formaction,poster"),U=/((java|vb)script|mhtml):/i,$=/^data:/i;for(M=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([A-Za-z0-9\\-_\\:\\.]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),P=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,C=a.getShortEndedElements(),H=i.self_closing_elements||a.getSelfClosingElements(),x=a.getBoolAttrs(),_=i.validate,b=i.remove_internals,W=i.fix_self_closing,O=a.getSpecialElements();c=M.exec(e);){if(u<c.index&&l.text(z(e.substr(u,c.index-u))),d=c[6])d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),o(d);else if(d=c[7]){if(d=d.toLowerCase(),":"===d.charAt(0)&&(d=d.substr(1)),w=d in C,W&&H[d]&&p.length>0&&p[p.length-1].name===d&&o(d),!_||(E=a.getElementRule(d))){if(N=!0,_&&(T=E.attributes,R=E.attributePatterns),(S=c[8])?(y=-1!==S.indexOf("data-mce-type"),y&&b&&(N=!1),h=[],h.map={},S.replace(P,s)):(h=[],h.map={}),_&&!y){if(A=E.attributesRequired,B=E.attributesDefault,D=E.attributesForced,L=E.removeEmptyAttrs,L&&!h.length&&(N=!1),D)for(m=D.length;m--;)k=D[m],v=k.name,I=k.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I});if(B)for(m=B.length;m--;)k=B[m],v=k.name,v in h.map||(I=k.value,"{$uid}"===I&&(I="mce_"+F++),h.map[v]=I,h.push({name:v,value:I}));if(A){for(m=A.length;m--&&!(A[m]in h.map););-1===m&&(N=!1)}if(k=h.map["data-mce-bogus"]){if("all"===k){u=r(a,e,M.lastIndex),M.lastIndex=u;continue}N=!1}}N&&l.start(d,h,w)}else N=!1;if(f=O[d]){f.lastIndex=u=c.index+c[0].length,(c=f.exec(e))?(N&&(g=e.substr(u,c.index-u)),u=c.index+c[0].length):(g=e.substr(u),u=e.length),N&&(g.length>0&&l.text(g,!0),l.end(d)),M.lastIndex=u;continue}w||(S&&S.indexOf("/")==S.length-1?N&&l.end(d):p.push({name:d,valid:N}))}else(d=c[1])?(">"===d.charAt(0)&&(d=" "+d),i.allow_conditional_comments||"[if"!==d.substr(0,3)||(d=" "+d),l.comment(d)):(d=c[2])?l.cdata(d):(d=c[3])?l.doctype(d):(d=c[4])&&l.pi(d,c[5]);u=c.index+c[0].length}for(u<e.length&&l.text(z(e.substr(u))),m=p.length-1;m>=0;m--)d=p[m],d.valid&&l.end(d.name)}}var o=n.each;return i.findEndTag=r,i}),r(k,[_,E,N,u],function(e,t,n,r){var i=r.makeMap,o=r.each,a=r.explode,s=r.extend;return function(r,l){function c(t){var n,r,o,a,s,c,d,f,p,h,m,g,v,y;for(m=i("tr,td,th,tbody,thead,tfoot,table"),h=l.getNonEmptyElements(),g=l.getTextBlockElements(),n=0;n<t.length;n++)if(r=t[n],r.parent&&!r.fixed)if(g[r.name]&&"li"==r.parent.name){for(v=r.next;v&&g[v.name];)v.name="li",v.fixed=!0,r.parent.insert(v,r.parent),v=v.next;r.unwrap(r)}else{for(a=[r],o=r.parent;o&&!l.isValidChild(o.name,r.name)&&!m[o.name];o=o.parent)a.push(o);if(o&&a.length>1){for(a.reverse(),s=c=u.filterNode(a[0].clone()),p=0;p<a.length-1;p++){for(l.isValidChild(c.name,a[p].name)?(d=u.filterNode(a[p].clone()),c.append(d)):d=c,f=a[p].firstChild;f&&f!=a[p+1];)y=f.next,d.append(f),f=y;c=d}s.isEmpty(h)?o.insert(r,a[0],!0):(o.insert(s,a[0],!0),o.insert(r,s)),o=a[0],(o.isEmpty(h)||o.firstChild===o.lastChild&&"br"===o.firstChild.name)&&o.empty().remove()}else if(r.parent){if("li"===r.name){if(v=r.prev,v&&("ul"===v.name||"ul"===v.name)){v.append(r);continue}if(v=r.next,v&&("ul"===v.name||"ul"===v.name)){v.insert(r,v.firstChild,!0);continue}r.wrap(u.filterNode(new e("ul",1)));continue}l.isValidChild(r.parent.name,"div")&&l.isValidChild("div",r.name)?r.wrap(u.filterNode(new e("div",1))):"style"===r.name||"script"===r.name?r.empty().remove():r.unwrap()}}}var u=this,d={},f=[],p={},h={};r=r||{},r.validate="validate"in r?r.validate:!0,r.root_name=r.root_name||"body",u.schema=l=l||new t,u.filterNode=function(e){var t,n,r;n in d&&(r=p[n],r?r.push(e):p[n]=[e]),t=f.length;for(;t--;)n=f[t].name,n in e.attributes.map&&(r=h[n],r?r.push(e):h[n]=[e]);return e},u.addNodeFilter=function(e,t){o(a(e),function(e){var n=d[e];n||(d[e]=n=[]),n.push(t)})},u.addAttributeFilter=function(e,t){o(a(e),function(e){var n;for(n=0;n<f.length;n++)if(f[n].name===e)return void f[n].callbacks.push(t);f.push({name:e,callbacks:[t]})})},u.parse=function(t,o){function a(){function e(e){e&&(t=e.firstChild,t&&3==t.type&&(t.value=t.value.replace(R,"")),t=e.lastChild,t&&3==t.type&&(t.value=t.value.replace(D,"")))}var t=y.firstChild,n,i;if(l.isValidChild(y.name,I.toLowerCase())){for(;t;)n=t.next,3==t.type||1==t.type&&"p"!==t.name&&!T[t.name]&&!t.attr("data-mce-type")?i?i.append(t):(i=u(I,1),i.attr(r.forced_root_block_attrs),y.insert(i,t),i.append(t)):(e(i),i=null),t=n;e(i)}}function u(t,n){var r=new e(t,n),i;return t in d&&(i=p[t],i?i.push(r):p[t]=[r]),r}function m(e){var t,n,r;for(t=e.prev;t&&3===t.type;)n=t.value.replace(D,""),n.length>0?(t.value=n,t=t.prev):(r=t.prev,t.remove(),t=r)}function g(e){var t,n={};for(t in e)"li"!==t&&"p"!=t&&(n[t]=e[t]);return n}var v,y,b,C,x,w,_,E,N,k,S,T,R,A=[],B,D,L,H,M,P,O,I;if(o=o||{},p={},h={},T=s(i("script,style,head,html,body,title,meta,param"),l.getBlockElements()),O=l.getNonEmptyElements(),P=l.children,S=r.validate,I="forced_root_block"in o?o.forced_root_block:r.forced_root_block,M=l.getWhiteSpaceElements(),R=/^[ \t\r\n]+/,D=/[ \t\r\n]+$/,L=/[ \t\r\n]+/g,H=/^[ \t\r\n]+$/,v=new n({validate:S,allow_script_urls:r.allow_script_urls,allow_conditional_comments:r.allow_conditional_comments,self_closing_elements:g(l.getSelfClosingElements()),cdata:function(e){b.append(u("#cdata",4)).value=e},text:function(e,t){var n;B||(e=e.replace(L," "),b.lastChild&&T[b.lastChild.name]&&(e=e.replace(R,""))),0!==e.length&&(n=u("#text",3),n.raw=!!t,b.append(n).value=e)},comment:function(e){b.append(u("#comment",8)).value=e},pi:function(e,t){b.append(u(e,7)).value=t,m(b)},doctype:function(e){var t;t=b.append(u("#doctype",10)),t.value=e,m(b)},start:function(e,t,n){var r,i,o,a,s;if(o=S?l.getElementRule(e):{}){for(r=u(o.outputName||e,1),r.attributes=t,r.shortEnded=n,b.append(r),s=P[b.name],s&&P[r.name]&&!s[r.name]&&A.push(r),i=f.length;i--;)a=f[i].name,a in t.map&&(N=h[a],N?N.push(r):h[a]=[r]);T[e]&&m(r),n||(b=r),!B&&M[e]&&(B=!0)}},end:function(t){var n,r,i,o,a;if(r=S?l.getElementRule(t):{}){if(T[t]&&!B){if(n=b.firstChild,n&&3===n.type)if(i=n.value.replace(R,""),i.length>0)n.value=i,n=n.next;else for(o=n.next,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.next,(0===i.length||H.test(i))&&(n.remove(),n=o),n=o;if(n=b.lastChild,n&&3===n.type)if(i=n.value.replace(D,""),i.length>0)n.value=i,n=n.prev;else for(o=n.prev,n.remove(),n=o;n&&3===n.type;)i=n.value,o=n.prev,(0===i.length||H.test(i))&&(n.remove(),n=o),n=o}if(B&&M[t]&&(B=!1),(r.removeEmpty||r.paddEmpty)&&b.isEmpty(O))if(r.paddEmpty)b.empty().append(new e("#text","3")).value="\xa0";else if(!b.attributes.map.name&&!b.attributes.map.id)return a=b.parent,b.unwrap(),void(b=a);b=b.parent}}},l),y=b=new e(o.context||r.root_name,11),v.parse(t),S&&A.length&&(o.context?o.invalid=!0:c(A)),I&&("body"==y.name||o.isRootContent)&&a(),!o.invalid){for(k in p){for(N=d[k],C=p[k],_=C.length;_--;)C[_].parent||C.splice(_,1);for(x=0,w=N.length;w>x;x++)N[x](C,k,o)}for(x=0,w=f.length;w>x;x++)if(N=f[x],N.name in h){for(C=h[N.name],_=C.length;_--;)C[_].parent||C.splice(_,1);
for(_=0,E=N.callbacks.length;E>_;_++)N.callbacks[_](C,N.name,o)}}return y},r.remove_trailing_brs&&u.addNodeFilter("br",function(t){var n,r=t.length,i,o=s({},l.getBlockElements()),a=l.getNonEmptyElements(),c,u,d,f,p,h;for(o.body=1,n=0;r>n;n++)if(i=t[n],c=i.parent,o[i.parent.name]&&i===c.lastChild){for(d=i.prev;d;){if(f=d.name,"span"!==f||"bookmark"!==d.attr("data-mce-type")){if("br"!==f)break;if("br"===f){i=null;break}}d=d.prev}i&&(i.remove(),c.isEmpty(a)&&(p=l.getElementRule(c.name),p&&(p.removeEmpty?c.remove():p.paddEmpty&&(c.empty().append(new e("#text",3)).value="\xa0"))))}else{for(u=i;c&&c.firstChild===u&&c.lastChild===u&&(u=c,!o[c.name]);)c=c.parent;u===c&&(h=new e("#text",3),h.value="\xa0",i.replace(h))}}),r.allow_html_in_named_anchor||u.addAttributeFilter("id,name",function(e){for(var t=e.length,n,r,i,o;t--;)if(o=e[t],"a"===o.name&&o.firstChild&&!o.attr("href")){i=o.parent,n=o.lastChild;do r=n.prev,i.insert(n,o),n=r;while(n)}}),r.validate&&l.getValidClasses()&&u.addAttributeFilter("class",function(e){for(var t=e.length,n,r,i,o,a,s=l.getValidClasses(),c,u;t--;){for(n=e[t],r=n.attr("class").split(" "),a="",i=0;i<r.length;i++)o=r[i],u=!1,c=s["*"],c&&c[o]&&(u=!0),c=s[n.name],u||!c||c[o]||(u=!0),u&&(a&&(a+=" "),a+=o);a.length||(a=null),n.attr("class",a)}})}}),r(S,[g,u],function(e,t){var n=t.makeMap;return function(t){var r=[],i,o,a,s,l;return t=t||{},i=t.indent,o=n(t.indent_before||""),a=n(t.indent_after||""),s=e.getEncodeFunc(t.entity_encoding||"raw",t.entities),l="html"==t.element_format,{start:function(e,t,n){var c,u,d,f;if(i&&o[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n")),r.push("<",e),t)for(c=0,u=t.length;u>c;c++)d=t[c],r.push(" ",d.name,'="',s(d.value,!0),'"');r[r.length]=!n||l?">":" />",n&&i&&a[e]&&r.length>0&&(f=r[r.length-1],f.length>0&&"\n"!==f&&r.push("\n"))},end:function(e){var t;r.push("</",e,">"),i&&a[e]&&r.length>0&&(t=r[r.length-1],t.length>0&&"\n"!==t&&r.push("\n"))},text:function(e,t){e.length>0&&(r[r.length]=t?e:s(e))},cdata:function(e){r.push("<![CDATA[",e,"]]>")},comment:function(e){r.push("<!--",e,"-->")},pi:function(e,t){t?r.push("<?",e," ",t,"?>"):r.push("<?",e,"?>"),i&&r.push("\n")},doctype:function(e){r.push("<!DOCTYPE",e,">",i?"\n":"")},reset:function(){r.length=0},getContent:function(){return r.join("").replace(/\n$/,"")}}}}),r(T,[S,E],function(e,t){return function(n,r){var i=this,o=new e(n);n=n||{},n.validate="validate"in n?n.validate:!0,i.schema=r=r||new t,i.writer=o,i.serialize=function(e){function t(e){var n=i[e.type],s,l,c,u,d,f,p,h,m;if(n)n(e);else{if(s=e.name,l=e.shortEnded,c=e.attributes,a&&c&&c.length>1){for(f=[],f.map={},m=r.getElementRule(e.name),p=0,h=m.attributesOrder.length;h>p;p++)u=m.attributesOrder[p],u in c.map&&(d=c.map[u],f.map[u]=d,f.push({name:u,value:d}));for(p=0,h=c.length;h>p;p++)u=c[p].name,u in f.map||(d=c.map[u],f.map[u]=d,f.push({name:u,value:d}));c=f}if(o.start(e.name,c,l),!l){if(e=e.firstChild)do t(e);while(e=e.next);o.end(s)}}}var i,a;return a=n.validate,i={3:function(e){o.text(e.value,e.raw)},8:function(e){o.comment(e.value)},7:function(e){o.pi(e.name,e.value)},10:function(e){o.doctype(e.value)},4:function(e){o.cdata(e.value)},11:function(e){if(e=e.firstChild)do t(e);while(e=e.next)}},o.reset(),1!=e.type||n.inner?i[11](e):t(e),o.getContent()}}}),r(R,[y,k,g,T,_,E,d,u],function(e,t,n,r,i,o,a,s){var l=s.each,c=s.trim,u=e.DOM;return function(e,i){var s,d,f;return i&&(s=i.dom,d=i.schema),s=s||u,d=d||new o(e),e.entity_encoding=e.entity_encoding||"named",e.remove_trailing_brs="remove_trailing_brs"in e?e.remove_trailing_brs:!0,f=new t(e,d),f.addAttributeFilter("data-mce-tabindex",function(e,t){for(var n=e.length,r;n--;)r=e[n],r.attr("tabindex",r.attributes.map["data-mce-tabindex"]),r.attr(t,null)}),f.addAttributeFilter("src,href,style",function(t,n){for(var r=t.length,i,o,a="data-mce-"+n,l=e.url_converter,c=e.url_converter_scope,u;r--;)i=t[r],o=i.attributes.map[a],o!==u?(i.attr(n,o.length>0?o:null),i.attr(a,null)):(o=i.attributes.map[n],"style"===n?o=s.serializeStyle(s.parseStyle(o),i.name):l&&(o=l.call(c,o,n,i.name)),i.attr(n,o.length>0?o:null))}),f.addAttributeFilter("class",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.attr("class"),r&&(r=n.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),n.attr("class",r.length>0?r:null))}),f.addAttributeFilter("data-mce-type",function(e,t,n){for(var r=e.length,i;r--;)i=e[r],"bookmark"!==i.attributes.map["data-mce-type"]||n.cleanup||i.remove()}),f.addNodeFilter("noscript",function(e){for(var t=e.length,r;t--;)r=e[t].firstChild,r&&(r.value=n.decode(r.value))}),f.addNodeFilter("script,style",function(e,t){function n(e){return e.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")}for(var r=e.length,i,o,a;r--;)i=e[r],o=i.firstChild?i.firstChild.value:"","script"===t?(a=i.attr("type"),a&&i.attr("type","mce-no/type"==a?null:a.replace(/^mce\-/,"")),o.length>0&&(i.firstChild.value="// <![CDATA[\n"+n(o)+"\n// ]]>")):o.length>0&&(i.firstChild.value="<!--\n"+n(o)+"\n-->")}),f.addNodeFilter("#comment",function(e){for(var t=e.length,n;t--;)n=e[t],0===n.value.indexOf("[CDATA[")?(n.name="#cdata",n.type=4,n.value=n.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===n.value.indexOf("mce:protected ")&&(n.name="#text",n.type=3,n.raw=!0,n.value=unescape(n.value).substr(14))}),f.addNodeFilter("xml:namespace,input",function(e,t){for(var n=e.length,r;n--;)r=e[n],7===r.type?r.remove():1===r.type&&("input"!==t||"type"in r.attributes.map||r.attr("type","text"))}),e.fix_list_elements&&f.addNodeFilter("ul,ol",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.parent,("ul"===r.name||"ol"===r.name)&&n.prev&&"li"===n.prev.name&&n.prev.append(n)}),f.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize",function(e,t){for(var n=e.length;n--;)e[n].attr(t,null)}),{schema:d,addNodeFilter:f.addNodeFilter,addAttributeFilter:f.addAttributeFilter,serialize:function(t,n){var i=this,o,u,p,h,m;return a.ie&&s.select("script,style,select,map").length>0?(m=t.innerHTML,t=t.cloneNode(!1),s.setHTML(t,m)):t=t.cloneNode(!0),o=t.ownerDocument.implementation,o.createHTMLDocument&&(u=o.createHTMLDocument(""),l("BODY"==t.nodeName?t.childNodes:[t],function(e){u.body.appendChild(u.importNode(e,!0))}),t="BODY"!=t.nodeName?u.body.firstChild:u.body,p=s.doc,s.doc=u),n=n||{},n.format=n.format||"html",n.selection&&(n.forced_root_block=""),n.no_events||(n.node=t,i.onPreProcess(n)),h=new r(e,d),n.content=h.serialize(f.parse(c(n.getInner?t.innerHTML:s.getOuterHTML(t)),n)),n.cleanup||(n.content=n.content.replace(/\uFEFF/g,"")),n.no_events||i.onPostProcess(n),p&&(s.doc=p),n.node=null,n.content},addRules:function(e){d.addValidElements(e)},setRules:function(e){d.setValidElements(e)},onPreProcess:function(e){i&&i.fire("PreProcess",e)},onPostProcess:function(e){i&&i.fire("PostProcess",e)}}}}),r(A,[],function(){function e(e){function t(t,n){var r,i=0,o,a,s,l,c,u,d=-1,f;if(r=t.duplicate(),r.collapse(n),f=r.parentElement(),f.ownerDocument===e.dom.doc){for(;"false"===f.contentEditable;)f=f.parentNode;if(!f.hasChildNodes())return{node:f,inside:1};for(s=f.children,o=s.length-1;o>=i;)if(u=Math.floor((i+o)/2),l=s[u],r.moveToElementText(l),d=r.compareEndPoints(n?"StartToStart":"EndToEnd",t),d>0)o=u-1;else{if(!(0>d))return{node:l};i=u+1}if(0>d)for(l?r.collapse(!1):(r.moveToElementText(f),r.collapse(!0),l=f,a=!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",1)&&f==r.parentElement();)c++;else for(r.collapse(!0),c=0;0!==r.compareEndPoints(n?"StartToStart":"StartToEnd",t)&&0!==r.move("character",-1)&&f==r.parentElement();)c++;return{node:l,position:d,offset:c,inside:a}}}function n(){function n(e){var n=t(o,e),r,i,s=0,l,c,u;if(r=n.node,i=n.offset,n.inside&&!r.hasChildNodes())return void a[e?"setStart":"setEnd"](r,0);if(i===c)return void a[e?"setStartBefore":"setEndAfter"](r);if(n.position<0){if(l=n.inside?r.firstChild:r.nextSibling,!l)return void a[e?"setStartAfter":"setEndAfter"](r);if(!i)return void(3==l.nodeType?a[e?"setStart":"setEnd"](l,0):a[e?"setStartBefore":"setEndBefore"](l));for(;l;){if(3==l.nodeType&&(u=l.nodeValue,s+=u.length,s>=i)){r=l,s-=i,s=u.length-s;break}l=l.nextSibling}}else{if(l=r.previousSibling,!l)return a[e?"setStartBefore":"setEndBefore"](r);if(!i)return void(3==r.nodeType?a[e?"setStart":"setEnd"](l,r.nodeValue.length):a[e?"setStartAfter":"setEndAfter"](l));for(;l;){if(3==l.nodeType&&(s+=l.nodeValue.length,s>=i)){r=l,s-=i;break}l=l.previousSibling}}a[e?"setStart":"setEnd"](r,s)}var o=e.getRng(),a=i.createRng(),s,l,c,u,d;if(s=o.item?o.item(0):o.parentElement(),s.ownerDocument!=i.doc)return a;if(l=e.isCollapsed(),o.item)return a.setStart(s.parentNode,i.nodeIndex(s)),a.setEnd(a.startContainer,a.startOffset+1),a;try{n(!0),l||n()}catch(f){if(-2147024809!=f.number)throw f;d=r.getBookmark(2),c=o.duplicate(),c.collapse(!0),s=c.parentElement(),l||(c=o.duplicate(),c.collapse(!1),u=c.parentElement(),u.innerHTML=u.innerHTML),s.innerHTML=s.innerHTML,r.moveToBookmark(d),o=e.getRng(),n(!0),l||n()}return a}var r=this,i=e.dom,o=!1;this.getBookmark=function(n){function r(e){var t,n,r,o,a=[];for(t=e.parentNode,n=i.getRoot().parentNode;t!=n&&9!==t.nodeType;){for(r=t.children,o=r.length;o--;)if(e===r[o]){a.push(o);break}e=t,t=t.parentNode}return a}function o(e){var n;return n=t(a,e),n?{position:n.position,offset:n.offset,indexes:r(n.node),inside:n.inside}:void 0}var a=e.getRng(),s={};return 2===n&&(a.item?s.start={ctrl:!0,indexes:r(a.item(0))}:(s.start=o(!0),e.isCollapsed()||(s.end=o()))),s},this.moveToBookmark=function(e){function t(e){var t,n,r,o;for(t=i.getRoot(),n=e.length-1;n>=0;n--)o=t.children,r=e[n],r<=o.length-1&&(t=o[r]);return t}function n(n){var i=e[n?"start":"end"],a,s,l,c;i&&(a=i.position>0,s=o.createTextRange(),s.moveToElementText(t(i.indexes)),c=i.offset,c!==l?(s.collapse(i.inside||a),s.moveStart("character",a?-c:c)):s.collapse(n),r.setEndPoint(n?"StartToStart":"EndToStart",s),n&&r.collapse(!0))}var r,o=i.doc.body;e.start&&(e.start.ctrl?(r=o.createControlRange(),r.addElement(t(e.start.indexes)),r.select()):(r=o.createTextRange(),n(!0),n(),r.select()))},this.addRange=function(t){function n(e){var t,n,a,d,h;a=i.create("a"),t=e?s:c,n=e?l:u,d=r.duplicate(),(t==f||t==f.documentElement)&&(t=p,n=0),3==t.nodeType?(t.parentNode.insertBefore(a,t),d.moveToElementText(a),d.moveStart("character",n),i.remove(a),r.setEndPoint(e?"StartToStart":"EndToEnd",d)):(h=t.childNodes,h.length?(n>=h.length?i.insertAfter(a,h[h.length-1]):t.insertBefore(a,h[n]),d.moveToElementText(a)):t.canHaveHTML&&(t.innerHTML="<span>&#xFEFF;</span>",a=t.firstChild,d.moveToElementText(a),d.collapse(o)),r.setEndPoint(e?"StartToStart":"EndToEnd",d),i.remove(a))}var r,a,s,l,c,u,d,f=e.dom.doc,p=f.body,h,m;if(s=t.startContainer,l=t.startOffset,c=t.endContainer,u=t.endOffset,r=p.createTextRange(),s==c&&1==s.nodeType){if(l==u&&!s.hasChildNodes()){if(s.canHaveHTML)return d=s.previousSibling,d&&!d.hasChildNodes()&&i.isBlock(d)?d.innerHTML="&#xFEFF;":d=null,s.innerHTML="<span>&#xFEFF;</span><span>&#xFEFF;</span>",r.moveToElementText(s.lastChild),r.select(),i.doc.selection.clear(),s.innerHTML="",void(d&&(d.innerHTML=""));l=i.nodeIndex(s),s=s.parentNode}if(l==u-1)try{if(m=s.childNodes[l],a=p.createControlRange(),a.addElement(m),a.select(),h=e.getRng(),h.item&&m===h.item(0))return}catch(g){}}n(!0),n(),r.select()},this.getRangeAt=n}return e}),r(B,[d],function(e){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(e){return e.shiftKey||e.ctrlKey||e.altKey},metaKeyPressed:function(t){return e.mac?t.metaKey:t.ctrlKey&&!t.altKey}}}),r(D,[B,u,d],function(e,t,n){return function(r,i){function o(e){var t=i.settings.object_resizing;return t===!1||n.iOS?!1:("string"!=typeof t&&(t="table,img,div"),"false"===e.getAttribute("data-mce-resize")?!1:i.dom.is(e,t))}function a(t){var n,r,o,a,s;n=t.screenX-T,r=t.screenY-R,P=n*k[2]+D,O=r*k[3]+L,P=5>P?5:P,O=5>O?5:O,o="IMG"==w.nodeName&&i.settings.resize_img_proportional!==!1?!e.modifierPressed(t):e.modifierPressed(t)||"IMG"==w.nodeName&&k[2]*k[3]!==0,o&&(W(n)>W(r)?(O=V(P*H),P=V(O/H)):(P=V(O/H),O=V(P*H))),C.setStyles(_,{width:P,height:O}),a=k.startPos.x+n,s=k.startPos.y+r,a=a>0?a:0,s=s>0?s:0,C.setStyles(E,{left:a,top:s,display:"block"}),E.innerHTML=P+" &times; "+O,k[2]<0&&_.clientWidth<=P&&C.setStyle(_,"left",A+(D-P)),k[3]<0&&_.clientHeight<=O&&C.setStyle(_,"top",B+(L-O)),n=U.scrollWidth-$,r=U.scrollHeight-q,n+r!==0&&C.setStyles(E,{left:a-n,top:s-r}),M||(i.fire("ObjectResizeStart",{target:w,width:D,height:L}),M=!0)}function s(){function e(e,t){t&&(w.style[e]||!i.schema.isValid(w.nodeName.toLowerCase(),e)?C.setStyle(w,e,t):C.setAttrib(w,e,t))}M=!1,e("width",P),e("height",O),C.unbind(I,"mousemove",a),C.unbind(I,"mouseup",s),F!=I&&(C.unbind(F,"mousemove",a),C.unbind(F,"mouseup",s)),C.remove(_),C.remove(E),z&&"TABLE"!=w.nodeName||l(w),i.fire("ObjectResized",{target:w,width:P,height:O}),C.setAttrib(w,"style",C.getAttrib(w,"style")),i.nodeChanged()}function l(e,t,r){var l,u,d,f,p;g(),l=C.getPos(e,U),A=l.x,B=l.y,p=e.getBoundingClientRect(),u=p.width||p.right-p.left,d=p.height||p.bottom-p.top,w!=e&&(m(),w=e,P=O=0),f=i.fire("ObjectSelected",{target:e}),o(e)&&!f.isDefaultPrevented()?x(N,function(e,i){function o(t){T=t.screenX,R=t.screenY,D=w.clientWidth,L=w.clientHeight,H=L/D,k=e,e.startPos={x:u*e[0]+A,y:d*e[1]+B},$=U.scrollWidth,q=U.scrollHeight,_=w.cloneNode(!0),C.addClass(_,"mce-clonedresizable"),C.setAttrib(_,"data-mce-bogus","all"),_.contentEditable=!1,_.unSelectabe=!0,C.setStyles(_,{left:A,top:B,margin:0}),_.removeAttribute("data-mce-selected"),U.appendChild(_),C.bind(I,"mousemove",a),C.bind(I,"mouseup",s),F!=I&&(C.bind(F,"mousemove",a),C.bind(F,"mouseup",s)),E=C.add(U,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},D+" &times; "+L)}var l,c;return t?void(i==t&&o(r)):(l=C.get("mceResizeHandle"+i),l?C.show(l):(c=U,l=C.add(c,"div",{id:"mceResizeHandle"+i,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+i+"-resize; margin:0; padding:0"}),n.ie&&(l.contentEditable=!1)),e.elm||(C.bind(l,"mousedown",function(e){e.stopImmediatePropagation(),e.preventDefault(),o(e)}),e.elm=l),void C.setStyles(l,{left:u*e[0]+A-l.offsetWidth/2,top:d*e[1]+B-l.offsetHeight/2}))}):c(),w.setAttribute("data-mce-selected","1")}function c(){var e,t;g(),w&&w.removeAttribute("data-mce-selected");for(e in N)t=C.get("mceResizeHandle"+e),t&&(C.unbind(t),C.remove(t))}function u(e){function t(e,t){if(e)do if(e===t)return!0;while(e=e.parentNode)}var n,i;return x(C.select("img[data-mce-selected],hr[data-mce-selected]"),function(e){e.removeAttribute("data-mce-selected")}),i="mousedown"==e.type?e.target:r.getNode(),i=C.$(i).closest(z?"table":"table,img,hr")[0],t(i,U)&&(v(),n=r.getStart(!0),t(n,i)&&t(r.getEnd(!0),i)&&(!z||i!=n&&"IMG"!==n.nodeName))?void l(i):void c()}function d(e,t,n){e&&e.attachEvent&&e.attachEvent("on"+t,n)}function f(e,t,n){e&&e.detachEvent&&e.detachEvent("on"+t,n)}function p(e){var t=e.srcElement,n,r,o,a,s,c,u;n=t.getBoundingClientRect(),c=S.clientX-n.left,u=S.clientY-n.top;for(r in N)if(o=N[r],a=t.offsetWidth*o[0],s=t.offsetHeight*o[1],W(a-c)<8&&W(s-u)<8){k=o;break}M=!0,i.fire("ObjectResizeStart",{target:w,width:w.clientWidth,height:w.clientHeight}),i.getDoc().selection.empty(),l(t,r,S)}function h(e){var t=e.srcElement;if(t!=w){if(i.fire("ObjectSelected",{target:t}),m(),0===t.id.indexOf("mceResizeHandle"))return void(e.returnValue=!1);("IMG"==t.nodeName||"TABLE"==t.nodeName)&&(c(),w=t,d(t,"resizestart",p))}}function m(){f(w,"resizestart",p)}function g(){for(var e in N){var t=N[e];t.elm&&(C.unbind(t.elm),delete t.elm)}}function v(){try{i.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(e){}}function y(e){var t;if(z){t=I.body.createControlRange();try{return t.addElement(e),t.select(),!0}catch(n){}}}function b(){w=_=null,z&&(m(),f(U,"controlselect",h))}var C=i.dom,x=t.each,w,_,E,N,k,S,T,R,A,B,D,L,H,M,P,O,I=i.getDoc(),F=document,z=n.ie&&n.ie<11,W=Math.abs,V=Math.round,U=i.getBody(),$,q;N={n:[.5,0,0,-1],e:[1,.5,1,0],s:[.5,1,0,1],w:[0,.5,-1,0],nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var j=".mce-content-body";return i.contentStyles.push(j+" div.mce-resizehandle {position: absolute;border: 1px solid black;background: #FFF;width: 5px;height: 5px;z-index: 10000}"+j+" .mce-resizehandle:hover {background: #000}"+j+" img[data-mce-selected], hr[data-mce-selected] {outline: 1px solid black;resize: none}"+j+" .mce-clonedresizable {position: absolute;"+(n.gecko?"":"outline: 1px dashed black;")+"opacity: .5;filter: alpha(opacity=50);z-index: 10000}"+j+" .mce-resize-helper {background-color: #555;background-color: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}"),i.on("init",function(){z?(i.on("ObjectResized",function(e){"TABLE"!=e.target.nodeName&&(c(),y(e.target))}),d(U,"controlselect",h),i.on("mousedown",function(e){S=e})):(v(),n.ie>=11&&(i.on("mouseup",function(e){var t=e.target.nodeName;!M&&/^(TABLE|IMG|HR)$/.test(t)&&(i.selection.select(e.target,"TABLE"==t),i.nodeChanged())}),i.dom.bind(U,"mscontrolselect",function(e){/^(TABLE|IMG|HR)$/.test(e.target.nodeName)&&(e.preventDefault(),"IMG"==e.target.tagName&&window.setTimeout(function(){i.selection.select(e.target)},0))}))),i.on("nodechange ResizeEditor",u),i.on("keydown keyup",function(e){w&&"TABLE"==w.nodeName&&u(e)}),i.on("hide",c)}),i.on("remove",g),{isResizable:o,showResizeRect:l,hideResizeRect:c,updateResizeRect:u,controlSelect:y,destroy:b}}}),r(L,[d,u],function(e,t){function n(n){var r=n.dom;this.getBookmark=function(e,i){function o(e,n){var i=0;return t.each(r.select(e),function(e,t){e==n&&(i=t)}),i}function a(e){function t(t){var n,r,i,o=t?"start":"end";n=e[o+"Container"],r=e[o+"Offset"],1==n.nodeType&&"TR"==n.nodeName&&(i=n.childNodes,n=i[Math.min(t?r:r-1,i.length-1)],n&&(r=t?0:n.childNodes.length,e["set"+(t?"Start":"End")](n,r)))}return t(!0),t(),e}function s(){function e(e,t){var n=e[t?"startContainer":"endContainer"],a=e[t?"startOffset":"endOffset"],s=[],l,c,u=0;if(3==n.nodeType){if(i)for(l=n.previousSibling;l&&3==l.nodeType;l=l.previousSibling)a+=l.nodeValue.length;s.push(a)}else c=n.childNodes,a>=c.length&&c.length&&(u=1,a=Math.max(0,c.length-1)),s.push(r.nodeIndex(c[a],i)+u);for(;n&&n!=o;n=n.parentNode)s.push(r.nodeIndex(n,i));return s}var t=n.getRng(!0),o=r.getRoot(),a={};return a.start=e(t,!0),n.isCollapsed()||(a.end=e(t)),a}var l,c,u,d,f,p,h="&#xFEFF;",m;if(2==e)return p=n.getNode(),f=p?p.nodeName:null,"IMG"==f?{name:f,index:o(f,p)}:n.tridentSel?n.tridentSel.getBookmark(e):s();if(e)return{rng:n.getRng()};if(l=n.getRng(),u=r.uniqueId(),d=n.isCollapsed(),m="overflow:hidden;line-height:0px",l.duplicate||l.item){if(l.item)return p=l.item(0),f=p.nodeName,{name:f,index:o(f,p)};c=l.duplicate();try{l.collapse(),l.pasteHTML('<span data-mce-type="bookmark" id="'+u+'_start" style="'+m+'">'+h+"</span>"),d||(c.collapse(!1),l.moveToElementText(c.parentElement()),0===l.compareEndPoints("StartToEnd",c)&&c.move("character",-1),c.pasteHTML('<span data-mce-type="bookmark" id="'+u+'_end" style="'+m+'">'+h+"</span>"))}catch(g){return null}}else{if(p=n.getNode(),f=p.nodeName,"IMG"==f)return{name:f,index:o(f,p)};c=a(l.cloneRange()),d||(c.collapse(!1),c.insertNode(r.create("span",{"data-mce-type":"bookmark",id:u+"_end",style:m},h))),l=a(l),l.collapse(!0),l.insertNode(r.create("span",{"data-mce-type":"bookmark",id:u+"_start",style:m},h))}return n.moveToBookmark({id:u,keep:1}),{id:u}},this.moveToBookmark=function(i){function o(e){var t=i[e?"start":"end"],n,r,o,a;if(t){for(o=t[0],r=c,n=t.length-1;n>=1;n--){if(a=r.childNodes,t[n]>a.length-1)return;r=a[t[n]]}3===r.nodeType&&(o=Math.min(t[0],r.nodeValue.length)),1===r.nodeType&&(o=Math.min(t[0],r.childNodes.length)),e?l.setStart(r,o):l.setEnd(r,o)}return!0}function a(n){var o=r.get(i.id+"_"+n),a,s,l,c,h=i.keep;if(o&&(a=o.parentNode,"start"==n?(h?(a=o.firstChild,s=1):s=r.nodeIndex(o),u=d=a,f=p=s):(h?(a=o.firstChild,s=1):s=r.nodeIndex(o),d=a,p=s),!h)){for(c=o.previousSibling,l=o.nextSibling,t.each(t.grep(o.childNodes),function(e){3==e.nodeType&&(e.nodeValue=e.nodeValue.replace(/\uFEFF/g,""))});o=r.get(i.id+"_"+n);)r.remove(o,1);c&&l&&c.nodeType==l.nodeType&&3==c.nodeType&&!e.opera&&(s=c.nodeValue.length,c.appendData(l.nodeValue),r.remove(l),"start"==n?(u=d=c,f=p=s):(d=c,p=s))}}function s(t){return!r.isBlock(t)||t.innerHTML||e.ie||(t.innerHTML='<br data-mce-bogus="1" />'),t}var l,c,u,d,f,p;if(i)if(i.start){if(l=r.createRng(),c=r.getRoot(),n.tridentSel)return n.tridentSel.moveToBookmark(i);o(!0)&&o()&&n.setRng(l)}else i.id?(a("start"),a("end"),u&&(l=r.createRng(),l.setStart(s(u),f),l.setEnd(s(d),p),n.setRng(l))):i.name?n.select(r.select(i.name)[i.index]):i.rng&&n.setRng(i.rng)}}return n.isBookmarkNode=function(e){return e&&"SPAN"===e.tagName&&"bookmark"===e.getAttribute("data-mce-type")},n}),r(H,[h,A,D,x,L,d,u],function(e,n,r,i,o,a,s){function l(e,t,i,a){var s=this;s.dom=e,s.win=t,s.serializer=i,s.editor=a,s.bookmarkManager=new o(s),s.controlSelection=new r(s,a),s.win.getSelection||(s.tridentSel=new n(s))}var c=s.each,u=s.trim,d=a.ie;return l.prototype={setCursorLocation:function(e,t){var n=this,r=n.dom.createRng();e?(r.setStart(e,t),r.setEnd(e,t),n.setRng(r),n.collapse(!1)):(n._moveEndPoint(r,n.editor.getBody(),!0),n.setRng(r))},getContent:function(e){var n=this,r=n.getRng(),i=n.dom.create("body"),o=n.getSel(),a,s,l;return e=e||{},a=s="",e.get=!0,e.format=e.format||"html",e.selection=!0,n.editor.fire("BeforeGetContent",e),"text"==e.format?n.isCollapsed()?"":r.text||(o.toString?o.toString():""):(r.cloneContents?(l=r.cloneContents(),l&&i.appendChild(l)):r.item!==t||r.htmlText!==t?(i.innerHTML="<br>"+(r.item?r.item(0).outerHTML:r.htmlText),i.removeChild(i.firstChild)):i.innerHTML=r.toString(),/^\s/.test(i.innerHTML)&&(a=" "),/\s+$/.test(i.innerHTML)&&(s=" "),e.getInner=!0,e.content=n.isCollapsed()?"":a+n.serializer.serialize(i,e)+s,n.editor.fire("GetContent",e),e.content)},setContent:function(e,t){var n=this,r=n.getRng(),i,o=n.win.document,a,s;if(t=t||{format:"html"},t.set=!0,t.selection=!0,e=t.content=e,t.no_events||n.editor.fire("BeforeSetContent",t),e=t.content,r.insertNode){e+='<span id="__caret">_</span>',r.startContainer==o&&r.endContainer==o?o.body.innerHTML=e:(r.deleteContents(),0===o.body.childNodes.length?o.body.innerHTML=e:r.createContextualFragment?r.insertNode(r.createContextualFragment(e)):(a=o.createDocumentFragment(),s=o.createElement("div"),a.appendChild(s),s.outerHTML=e,r.insertNode(a))),i=n.dom.get("__caret"),r=o.createRange(),r.setStartBefore(i),r.setEndBefore(i),n.setRng(r),n.dom.remove("__caret");try{n.setRng(r)}catch(l){}}else r.item&&(o.execCommand("Delete",!1,null),r=n.getRng()),/^\s+/.test(e)?(r.pasteHTML('<span id="__mce_tmp">_</span>'+e),n.dom.remove("__mce_tmp")):r.pasteHTML(e);t.no_events||n.editor.fire("SetContent",t)},getStart:function(e){var t=this,n=t.getRng(),r,i,o,a;if(n.duplicate||n.item){if(n.item)return n.item(0);for(o=n.duplicate(),o.collapse(1),r=o.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),i=a=n.parentElement();a=a.parentNode;)if(a==r){r=i;break}return r}return r=n.startContainer,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[Math.min(r.childNodes.length-1,n.startOffset)])),r&&3==r.nodeType?r.parentNode:r},getEnd:function(e){var t=this,n=t.getRng(),r,i;return n.duplicate||n.item?n.item?n.item(0):(n=n.duplicate(),n.collapse(0),r=n.parentElement(),r.ownerDocument!==t.dom.doc&&(r=t.dom.getRoot()),r&&"BODY"==r.nodeName?r.lastChild||r:r):(r=n.endContainer,i=n.endOffset,1==r.nodeType&&r.hasChildNodes()&&(e&&n.collapsed||(r=r.childNodes[i>0?i-1:i])),r&&3==r.nodeType?r.parentNode:r)},getBookmark:function(e,t){return this.bookmarkManager.getBookmark(e,t)},moveToBookmark:function(e){return this.bookmarkManager.moveToBookmark(e)},select:function(e,t){var n=this,r=n.dom,i=r.createRng(),o;if(n.lastFocusBookmark=null,e){if(!t&&n.controlSelection.controlSelect(e))return;o=r.nodeIndex(e),i.setStart(e.parentNode,o),i.setEnd(e.parentNode,o+1),t&&(n._moveEndPoint(i,e,!0),n._moveEndPoint(i,e)),n.setRng(i)}return e},isCollapsed:function(){var e=this,t=e.getRng(),n=e.getSel();return!t||t.item?!1:t.compareEndPoints?0===t.compareEndPoints("StartToEnd",t):!n||t.collapsed},collapse:function(e){var t=this,n=t.getRng(),r;n.item&&(r=n.item(0),n=t.win.document.body.createTextRange(),n.moveToElementText(r)),n.collapse(!!e),t.setRng(n)},getSel:function(){var e=this.win;return e.getSelection?e.getSelection():e.document.selection},getRng:function(e){function t(e,t,n){try{return t.compareBoundaryPoints(e,n)}catch(r){return-1}}var n=this,r,i,o,a=n.win.document,s;if(!e&&n.lastFocusBookmark){var l=n.lastFocusBookmark;return l.startContainer?(i=a.createRange(),i.setStart(l.startContainer,l.startOffset),i.setEnd(l.endContainer,l.endOffset)):i=l,i}if(e&&n.tridentSel)return n.tridentSel.getRangeAt(0);try{(r=n.getSel())&&(i=r.rangeCount>0?r.getRangeAt(0):r.createRange?r.createRange():a.createRange())}catch(c){}if(d&&i&&i.setStart&&a.selection){try{s=a.selection.createRange()}catch(c){}s&&s.item&&(o=s.item(0),i=a.createRange(),i.setStartBefore(o),i.setEndAfter(o))}return i||(i=a.createRange?a.createRange():a.body.createTextRange()),i.setStart&&9===i.startContainer.nodeType&&i.collapsed&&(o=n.dom.getRoot(),i.setStart(o,0),i.setEnd(o,0)),n.selectedRange&&n.explicitRange&&(0===t(i.START_TO_START,i,n.selectedRange)&&0===t(i.END_TO_END,i,n.selectedRange)?i=n.explicitRange:(n.selectedRange=null,n.explicitRange=null)),i},setRng:function(e,t){var n=this,r;if(e.select)try{e.select()}catch(i){}else if(n.tridentSel){if(e.cloneRange)try{return void n.tridentSel.addRange(e)}catch(i){}}else if(r=n.getSel()){n.explicitRange=e;try{r.removeAllRanges(),r.addRange(e)}catch(i){}t===!1&&r.extend&&(r.collapse(e.endContainer,e.endOffset),r.extend(e.startContainer,e.startOffset)),n.selectedRange=r.rangeCount>0?r.getRangeAt(0):null}},setNode:function(e){var t=this;return t.setContent(t.dom.getOuterHTML(e)),e},getNode:function(){function e(e,t){for(var n=e;e&&3===e.nodeType&&0===e.length;)e=t?e.nextSibling:e.previousSibling;return e||n}var t=this,n=t.getRng(),r,i=n.startContainer,o=n.endContainer,a=n.startOffset,s=n.endOffset,l=t.dom.getRoot();return n?n.setStart?(r=n.commonAncestorContainer,!n.collapsed&&(i==o&&2>s-a&&i.hasChildNodes()&&(r=i.childNodes[a]),3===i.nodeType&&3===o.nodeType&&(i=i.length===a?e(i.nextSibling,!0):i.parentNode,o=0===s?e(o.previousSibling,!1):o.parentNode,i&&i===o))?i:r&&3==r.nodeType?r.parentNode:r):(r=n.item?n.item(0):n.parentElement(),r.ownerDocument!==t.win.document&&(r=l),r):l},getSelectedBlocks:function(t,n){var r=this,i=r.dom,o,a,s=[];if(a=i.getRoot(),t=i.getParent(t||r.getStart(),i.isBlock),n=i.getParent(n||r.getEnd(),i.isBlock),t&&t!=a&&s.push(t),t&&n&&t!=n){o=t;for(var l=new e(t,a);(o=l.next())&&o!=n;)i.isBlock(o)&&s.push(o)}return n&&t!=n&&n!=a&&s.push(n),s},isForward:function(){var e=this.dom,t=this.getSel(),n,r;return t&&t.anchorNode&&t.focusNode?(n=e.createRng(),n.setStart(t.anchorNode,t.anchorOffset),n.collapse(!0),r=e.createRng(),r.setStart(t.focusNode,t.focusOffset),r.collapse(!0),n.compareBoundaryPoints(n.START_TO_START,r)<=0):!0},normalize:function(){var e=this,t=e.getRng();return!d&&new i(e.dom).normalize(t)&&e.setRng(t,e.isForward()),t},selectorChanged:function(e,t){var n=this,r;return n.selectorChangedData||(n.selectorChangedData={},r={},n.editor.on("NodeChange",function(e){var t=e.element,i=n.dom,o=i.getParents(t,null,i.getRoot()),a={};c(n.selectorChangedData,function(e,t){c(o,function(n){return i.is(n,t)?(r[t]||(c(e,function(e){e(!0,{node:n,selector:t,parents:o})}),r[t]=e),a[t]=e,!1):void 0})}),c(r,function(e,n){a[n]||(delete r[n],c(e,function(e){e(!1,{node:t,selector:n,parents:o})}))})})),n.selectorChangedData[e]||(n.selectorChangedData[e]=[]),n.selectorChangedData[e].push(t),n},getScrollContainer:function(){for(var e,t=this.dom.getRoot();t&&"BODY"!=t.nodeName;){if(t.scrollHeight>t.clientHeight){e=t;break}t=t.parentNode}return e},scrollIntoView:function(e){function t(e){for(var t=0,n=0,r=e;r&&r.nodeType;)t+=r.offsetLeft||0,n+=r.offsetTop||0,r=r.offsetParent;return{x:t,y:n}}var n,r,i=this,o=i.dom,a=o.getRoot(),s,l;if("BODY"!=a.nodeName){var c=i.getScrollContainer();if(c)return n=t(e).y-t(c).y,l=c.clientHeight,s=c.scrollTop,void((s>n||n+25>s+l)&&(c.scrollTop=s>n?n:n-l+25))}r=o.getViewPort(i.editor.getWin()),n=o.getPos(e).y,s=r.y,l=r.h,(n<r.y||n+25>s+l)&&i.editor.getWin().scrollTo(0,s>n?n:n-l+25)},_moveEndPoint:function(t,n,r){var i=n,o=new e(n,i),s=this.dom.schema.getNonEmptyElements();do{if(3==n.nodeType&&0!==u(n.nodeValue).length)return void(r?t.setStart(n,0):t.setEnd(n,n.nodeValue.length));if(s[n.nodeName]&&!/^(TD|TH)$/.test(n.nodeName))return void(r?t.setStartBefore(n):"BR"==n.nodeName?t.setEndBefore(n):t.setEndAfter(n));if(a.ie&&a.ie<11&&this.dom.isBlock(n)&&this.dom.isEmpty(n))return void(r?t.setStart(n,0):t.setEnd(n,0))}while(n=r?o.next():o.prev());"BODY"==i.nodeName&&(r?t.setStart(i,0):t.setEnd(i,i.childNodes.length))},destroy:function(){this.win=null,this.controlSelection.destroy()}},l}),r(M,[L,u],function(e,t){function n(t){this.compare=function(n,i){function o(e){var n={};return r(t.getAttribs(e),function(r){var i=r.nodeName.toLowerCase();0!==i.indexOf("_")&&"style"!==i&&"data-mce-style"!==i&&(n[i]=t.getAttrib(e,i))}),n}function a(e,t){var n,r;for(r in e)if(e.hasOwnProperty(r)){if(n=t[r],"undefined"==typeof n)return!1;if(e[r]!=n)return!1;delete t[r]}for(r in t)if(t.hasOwnProperty(r))return!1;return!0}return n.nodeName!=i.nodeName?!1:a(o(n),o(i))&&a(t.parseStyle(t.getAttrib(n,"style")),t.parseStyle(t.getAttrib(i,"style")))?!e.isBookmarkNode(n)&&!e.isBookmarkNode(i):!1}}var r=t.each;return n}),r(P,[u],function(e){function t(e,t){function r(e){return e.replace(/%(\w+)/g,"")}var i,o,a=e.dom,s="",l,c;if(c=e.settings.preview_styles,c===!1)return"";if(c||(c="font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"),"string"==typeof t){if(t=e.formatter.get(t),!t)return;t=t[0]}return i=t.block||t.inline||"span",o=a.create(i),n(t.styles,function(e,t){e=r(e),e&&a.setStyle(o,t,e)}),n(t.attributes,function(e,t){e=r(e),e&&a.setAttrib(o,t,e)}),n(t.classes,function(e){e=r(e),a.hasClass(o,e)||a.addClass(o,e)}),e.fire("PreviewFormats"),a.setStyles(o,{position:"absolute",left:-65535}),e.getBody().appendChild(o),l=a.getStyle(e.getBody(),"fontSize",!0),l=/px$/.test(l)?parseInt(l,10):0,n(c.split(" "),function(t){var n=a.getStyle(o,t,!0);if(!("background-color"==t&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(n)&&(n=a.getStyle(e.getBody(),t,!0),"#ffffff"==a.toHex(n).toLowerCase())||"color"==t&&"#000000"==a.toHex(n).toLowerCase())){if("font-size"==t&&/em|%$/.test(n)){if(0===l)return;n=parseFloat(n,10)/(/%$/.test(n)?100:1),n=n*l+"px"}"border"==t&&n&&(s+="padding:0 2px;"),s+=t+":"+n+";"}}),e.fire("AfterPreviewFormats"),a.remove(o),s}var n=e.each;return{getCssText:t}}),r(O,[h,x,L,M,u,P],function(e,t,n,r,i,o){return function(a){function s(e){return e.nodeType&&(e=e.nodeName),!!a.schema.getTextBlockElements()[e.toLowerCase()]}function l(e,t){return V.getParents(e,t,V.getRoot())}function c(e){return 1===e.nodeType&&"_mce_caret"===e.id}function u(){p({valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"}}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},defaultBlock:"div"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"}},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"}}],alignright:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"}}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},defaultBlock:"div"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0},fontname:{inline:"span",styles:{fontFamily:"%value"}},fontsize:{inline:"span",styles:{fontSize:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0
},onformat:function(e,t,n){ot(n,function(t,n){V.setAttrib(e,n,t)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]}),ot("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(e){p(e,{block:e,remove:"all"})}),p(a.settings.formats)}function d(){a.addShortcut("ctrl+b","bold_desc","Bold"),a.addShortcut("ctrl+i","italic_desc","Italic"),a.addShortcut("ctrl+u","underline_desc","Underline");for(var e=1;6>=e;e++)a.addShortcut("ctrl+"+e,"",["FormatBlock",!1,"h"+e]);a.addShortcut("ctrl+7","",["FormatBlock",!1,"p"]),a.addShortcut("ctrl+8","",["FormatBlock",!1,"div"]),a.addShortcut("ctrl+9","",["FormatBlock",!1,"address"])}function f(e){return e?W[e]:W}function p(e,t){e&&("string"!=typeof e?ot(e,function(e,t){p(t,e)}):(t=t.length?t:[t],ot(t,function(e){e.deep===et&&(e.deep=!e.selector),e.split===et&&(e.split=!e.selector||e.inline),e.remove===et&&e.selector&&!e.inline&&(e.remove="none"),e.selector&&e.inline&&(e.mixed=!0,e.block_expand=!0),"string"==typeof e.classes&&(e.classes=e.classes.split(/\s+/))}),W[e]=t))}function h(e){var t;return a.dom.getParent(e,function(e){return t=a.dom.getStyle(e,"text-decoration"),t&&"none"!==t}),t}function m(e){var t;1===e.nodeType&&e.parentNode&&1===e.parentNode.nodeType&&(t=h(e.parentNode),a.dom.getStyle(e,"color")&&t?a.dom.setStyle(e,"text-decoration",t):a.dom.getStyle(e,"textdecoration")===t&&a.dom.setStyle(e,"text-decoration",null))}function g(t,n,r){function i(e,t){if(t=t||d,e){if(t.onformat&&t.onformat(e,t,n,r),ot(t.styles,function(t,r){V.setStyle(e,r,R(t,n))}),t.styles){var i=V.getAttrib(e,"style");i&&e.setAttribute("data-mce-style",i)}ot(t.attributes,function(t,r){V.setAttrib(e,r,R(t,n))}),ot(t.classes,function(t){t=R(t,n),V.hasClass(e,t)||V.addClass(e,t)})}}function o(){function t(t,n){var i=new e(n);for(r=i.current();r;r=i.prev())if(r.childNodes.length>1||r==t||"BR"==r.tagName)return r}var n=a.selection.getRng(),i=n.startContainer,o=n.endContainer;if(i!=o&&0===n.endOffset){var s=t(i,o),l=3==s.nodeType?s.length:s.childNodes.length;n.setEnd(s,l)}return n}function l(e,r,o){var a=[],l,f,p=!0;l=d.inline||d.block,f=V.create(l),i(f),$.walk(e,function(e){function r(e){var m,g,y,C,x;return x=p,m=e.nodeName.toLowerCase(),g=e.parentNode.nodeName.toLowerCase(),1===e.nodeType&&tt(e)&&(x=p,p="true"===tt(e),C=!0),k(m,"br")?(h=0,void(d.block&&V.remove(e))):d.wrapper&&b(e,t,n)?void(h=0):p&&!C&&d.block&&!d.wrapper&&s(m)&&q(g,l)?(e=V.rename(e,l),i(e),a.push(e),void(h=0)):d.selector&&(ot(u,function(t){"collapsed"in t&&t.collapsed!==v||V.is(e,t.selector)&&!c(e)&&(i(e,t),y=!0)}),!d.inline||y)?void(h=0):void(!p||C||!q(l,m)||!q(g,l)||!o&&3===e.nodeType&&1===e.nodeValue.length&&65279===e.nodeValue.charCodeAt(0)||c(e)||d.inline&&j(e)?(h=0,ot(at(e.childNodes),r),C&&(p=x),h=0):(h||(h=V.clone(f,J),e.parentNode.insertBefore(h,e),a.push(h)),h.appendChild(e)))}var h;ot(e,r)}),d.links===!0&&ot(a,function(e){function t(e){"A"===e.nodeName&&i(e,d),ot(at(e.childNodes),t)}t(e)}),ot(a,function(e){function r(e){var t=0;return ot(e.childNodes,function(e){A(e)||it(e)||t++}),t}function o(e){var t,n;return ot(e.childNodes,function(e){return 1!=e.nodeType||it(e)||c(e)?void 0:(t=e,J)}),t&&!it(t)&&N(t,d)&&(n=V.clone(t,J),i(n),V.replace(n,e,Q),V.remove(t,1)),n||e}var s;if(s=r(e),(a.length>1||!j(e))&&0===s)return void V.remove(e,1);if(d.inline||d.wrapper){if(d.exact||1!==s||(e=o(e)),ot(u,function(t){ot(V.select(t.inline,e),function(e){it(e)||H(t,n,e,t.exact?e:null)})}),b(e.parentNode,t,n))return V.remove(e,1),e=0,Q;d.merge_with_parents&&V.getParent(e.parentNode,function(r){return b(r,t,n)?(V.remove(e,1),e=0,Q):void 0}),e&&d.merge_siblings!==!1&&(e=O(P(e),e),e=O(e,P(e,Q)))}})}var u=f(t),d=u[0],p,h,v=!r&&U.isCollapsed();if(d)if(r)r.nodeType?(h=V.createRng(),h.setStartBefore(r),h.setEndAfter(r),l(D(h,u),null,!0)):l(r,null,!0);else if(v&&d.inline&&!V.select("td.mce-item-selected,th.mce-item-selected").length)F("apply",t,n);else{var y=a.selection.getNode();Y||!u[0].defaultBlock||V.getParent(y,V.isBlock)||g(u[0].defaultBlock),a.selection.setRng(o()),p=U.getBookmark(),l(D(U.getRng(Q),u),p),d.styles&&(d.styles.color||d.styles.textDecoration)&&(st(y,m,"childNodes"),m(y)),U.moveToBookmark(p),z(U.getRng(Q)),a.nodeChanged()}}function v(e,t,n,r){function i(e){var n,r,o,a,s;if(1===e.nodeType&&tt(e)&&(a=y,y="true"===tt(e),s=!0),n=at(e.childNodes),y&&!s)for(r=0,o=p.length;o>r&&!H(p[r],t,e,e);r++);if(m.deep&&n.length){for(r=0,o=n.length;o>r;r++)i(n[r]);s&&(y=a)}}function o(n){var i;return ot(l(n.parentNode).reverse(),function(n){var o;i||"_start"==n.id||"_end"==n.id||(o=b(n,e,t,r),o&&o.split!==!1&&(i=n))}),i}function s(e,n,r,i){var o,a,s,l,c,u;if(e){for(u=e.parentNode,o=n.parentNode;o&&o!=u;o=o.parentNode){for(a=V.clone(o,J),c=0;c<p.length;c++)if(H(p[c],t,a,a)){a=0;break}a&&(s&&a.appendChild(s),l||(l=a),s=a)}!i||m.mixed&&j(e)||(n=V.split(e,n)),s&&(r.parentNode.insertBefore(s,r),l.appendChild(r))}return n}function c(e){return s(o(e),e,e,!0)}function u(e){var t=V.get(e?"_start":"_end"),n=t[e?"firstChild":"lastChild"];return it(n)&&(n=n[e?"firstChild":"lastChild"]),V.remove(t,!0),n}function d(e){var t,n,r=e.commonAncestorContainer;e=D(e,p,Q),m.split&&(t=I(e,Q),n=I(e),t!=n?(/^(TR|TH|TD)$/.test(t.nodeName)&&t.firstChild&&(t="TR"==t.nodeName?t.firstChild.firstChild||t:t.firstChild||t),r&&/^T(HEAD|BODY|FOOT|R)$/.test(r.nodeName)&&/^(TH|TD)$/.test(n.nodeName)&&n.firstChild&&(n=n.firstChild||n),t=B(t,"span",{id:"_start","data-mce-type":"bookmark"}),n=B(n,"span",{id:"_end","data-mce-type":"bookmark"}),c(t),c(n),t=u(Q),n=u()):t=n=c(t),e.startContainer=t.parentNode,e.startOffset=K(t),e.endContainer=n.parentNode,e.endOffset=K(n)+1),$.walk(e,function(e){ot(e,function(e){i(e),1===e.nodeType&&"underline"===a.dom.getStyle(e,"text-decoration")&&e.parentNode&&"underline"===h(e.parentNode)&&H({deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,e)})})}var p=f(e),m=p[0],g,v,y=!0;return n?void(n.nodeType?(v=V.createRng(),v.setStartBefore(n),v.setEndAfter(n),d(v)):d(n)):void(U.isCollapsed()&&m.inline&&!V.select("td.mce-item-selected,th.mce-item-selected").length?F("remove",e,t,r):(g=U.getBookmark(),d(U.getRng(Q)),U.moveToBookmark(g),m.inline&&C(e,t,U.getStart())&&z(U.getRng(!0)),a.nodeChanged()))}function y(e,t,n){var r=f(e);!C(e,t,n)||"toggle"in r[0]&&!r[0].toggle?g(e,t,n):v(e,t,n)}function b(e,t,n,r){function i(e,t,i){var o,a,s=t[i],l;if(t.onmatch)return t.onmatch(e,t,i);if(s)if(s.length===et){for(o in s)if(s.hasOwnProperty(o)){if(a="attributes"===i?V.getAttrib(e,o):S(e,o),r&&!a&&!t.exact)return;if((!r||t.exact)&&!k(a,T(R(s[o],n),o)))return}}else for(l=0;l<s.length;l++)if("attributes"===i?V.getAttrib(e,s[l]):S(e,s[l]))return t;return t}var o=f(t),a,s,l;if(o&&e)for(s=0;s<o.length;s++)if(a=o[s],N(e,a)&&i(e,a,"attributes")&&i(e,a,"styles")){if(l=a.classes)for(s=0;s<l.length;s++)if(!V.hasClass(e,l[s]))return;return a}}function C(e,t,n){function r(n){var r=V.getRoot();return n===r?!1:(n=V.getParent(n,function(n){return n.parentNode===r||!!b(n,e,t,!0)}),b(n,e,t))}var i;return n?r(n):(n=U.getNode(),r(n)?Q:(i=U.getStart(),i!=n&&r(i)?Q:J))}function x(e,t){var n,r=[],i={};return n=U.getStart(),V.getParent(n,function(n){var o,a;for(o=0;o<e.length;o++)a=e[o],!i[a]&&b(n,a,t)&&(i[a]=!0,r.push(a))},V.getRoot()),r}function w(e){var t=f(e),n,r,i,o,a;if(t)for(n=U.getStart(),r=l(n),o=t.length-1;o>=0;o--){if(a=t[o].selector,!a||t[o].defaultBlock)return Q;for(i=r.length-1;i>=0;i--)if(V.is(r[i],a))return Q}return J}function _(e,t,n){var r;return Z||(Z={},r={},a.on("NodeChange",function(e){var t=l(e.element),n={};t=i.grep(t,function(e){return 1==e.nodeType&&!e.getAttribute("data-mce-bogus")}),ot(Z,function(e,i){ot(t,function(o){return b(o,i,{},e.similar)?(r[i]||(ot(e,function(e){e(!0,{node:o,format:i,parents:t})}),r[i]=e),n[i]=e,!1):void 0})}),ot(r,function(i,o){n[o]||(delete r[o],ot(i,function(n){n(!1,{node:e.element,format:o,parents:t})}))})})),ot(e.split(","),function(e){Z[e]||(Z[e]=[],Z[e].similar=n),Z[e].push(t)}),this}function E(e){return o.getCssText(a,e)}function N(e,t){return k(e,t.inline)?Q:k(e,t.block)?Q:t.selector?1==e.nodeType&&V.is(e,t.selector):void 0}function k(e,t){return e=e||"",t=t||"",e=""+(e.nodeName||e),t=""+(t.nodeName||t),e.toLowerCase()==t.toLowerCase()}function S(e,t){return T(V.getStyle(e,t),t)}function T(e,t){return("color"==t||"backgroundColor"==t)&&(e=V.toHex(e)),"fontWeight"==t&&700==e&&(e="bold"),"fontFamily"==t&&(e=e.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+e}function R(e,t){return"string"!=typeof e?e=e(t):t&&(e=e.replace(/%(\w+)/g,function(e,n){return t[n]||e})),e}function A(e){return e&&3===e.nodeType&&/^([\t \r\n]+|)$/.test(e.nodeValue)}function B(e,t,n){var r=V.create(t,n);return e.parentNode.insertBefore(r,e),r.appendChild(e),r}function D(t,n,r){function i(e){function t(e){return"BR"==e.nodeName&&e.getAttribute("data-mce-bogus")&&!e.nextSibling}var r,i,o,a,s;if(r=i=e?g:y,a=e?"previousSibling":"nextSibling",s=V.getRoot(),3==r.nodeType&&!A(r)&&(e?v>0:b<r.nodeValue.length))return r;for(;;){if(!n[0].block_expand&&j(i))return i;for(o=i[a];o;o=o[a])if(!it(o)&&!A(o)&&!t(o))return i;if(i.parentNode==s){r=i;break}i=i.parentNode}return r}function o(e,t){for(t===et&&(t=3===e.nodeType?e.length:e.childNodes.length);e&&e.hasChildNodes();)e=e.childNodes[t],e&&(t=3===e.nodeType?e.length:e.childNodes.length);return{node:e,offset:t}}function c(e){for(var t=e;t;){if(1===t.nodeType&&tt(t))return"false"===tt(t)?t:e;t=t.parentNode}return e}function u(t,n,i){function o(e,t){var n,o,a=e.nodeValue;return"undefined"==typeof t&&(t=i?a.length:0),i?(n=a.lastIndexOf(" ",t),o=a.lastIndexOf("\xa0",t),n=n>o?n:o,-1===n||r||n++):(n=a.indexOf(" ",t),o=a.indexOf("\xa0",t),n=-1!==n&&(-1===o||o>n)?n:o),n}var s,l,c,u;if(3===t.nodeType){if(c=o(t,n),-1!==c)return{container:t,offset:c};u=t}for(s=new e(t,V.getParent(t,j)||a.getBody());l=s[i?"prev":"next"]();)if(3===l.nodeType){if(u=l,c=o(l),-1!==c)return{container:l,offset:c}}else if(j(l))break;return u?(n=i?0:u.length,{container:u,offset:n}):void 0}function d(e,r){var i,o,a,s;for(3==e.nodeType&&0===e.nodeValue.length&&e[r]&&(e=e[r]),i=l(e),o=0;o<i.length;o++)for(a=0;a<n.length;a++)if(s=n[a],!("collapsed"in s&&s.collapsed!==t.collapsed)&&V.is(i[o],s.selector))return i[o];return e}function f(e,t){var r,i=V.getRoot();if(n[0].wrapper||(r=V.getParent(e,n[0].block,i)),r||(r=V.getParent(3==e.nodeType?e.parentNode:e,function(e){return e!=i&&s(e)})),r&&n[0].wrapper&&(r=l(r,"ul,ol").reverse()[0]||r),!r)for(r=e;r[t]&&!j(r[t])&&(r=r[t],!k(r,"br")););return r||e}var p,h,m,g=t.startContainer,v=t.startOffset,y=t.endContainer,b=t.endOffset;if(1==g.nodeType&&g.hasChildNodes()&&(p=g.childNodes.length-1,g=g.childNodes[v>p?p:v],3==g.nodeType&&(v=0)),1==y.nodeType&&y.hasChildNodes()&&(p=y.childNodes.length-1,y=y.childNodes[b>p?p:b-1],3==y.nodeType&&(b=y.nodeValue.length)),g=c(g),y=c(y),(it(g.parentNode)||it(g))&&(g=it(g)?g:g.parentNode,g=g.nextSibling||g,3==g.nodeType&&(v=0)),(it(y.parentNode)||it(y))&&(y=it(y)?y:y.parentNode,y=y.previousSibling||y,3==y.nodeType&&(b=y.length)),n[0].inline&&(t.collapsed&&(m=u(g,v,!0),m&&(g=m.container,v=m.offset),m=u(y,b),m&&(y=m.container,b=m.offset)),h=o(y,b),h.node)){for(;h.node&&0===h.offset&&h.node.previousSibling;)h=o(h.node.previousSibling);h.node&&h.offset>0&&3===h.node.nodeType&&" "===h.node.nodeValue.charAt(h.offset-1)&&h.offset>1&&(y=h.node,y.splitText(h.offset-1))}return(n[0].inline||n[0].block_expand)&&(n[0].inline&&3==g.nodeType&&0!==v||(g=i(!0)),n[0].inline&&3==y.nodeType&&b!==y.nodeValue.length||(y=i())),n[0].selector&&n[0].expand!==J&&!n[0].inline&&(g=d(g,"previousSibling"),y=d(y,"nextSibling")),(n[0].block||n[0].selector)&&(g=f(g,"previousSibling"),y=f(y,"nextSibling"),n[0].block&&(j(g)||(g=i(!0)),j(y)||(y=i()))),1==g.nodeType&&(v=K(g),g=g.parentNode),1==y.nodeType&&(b=K(y)+1,y=y.parentNode),{startContainer:g,startOffset:v,endContainer:y,endOffset:b}}function L(e,t){return t.links&&"A"==e.tagName}function H(e,t,n,r){var i,o,a;if(!N(n,e)&&!L(n,e))return J;if("all"!=e.remove)for(ot(e.styles,function(i,o){i=T(R(i,t),o),"number"==typeof o&&(o=i,r=0),(e.remove_similar||!r||k(S(r,o),i))&&V.setStyle(n,o,""),a=1}),a&&""===V.getAttrib(n,"style")&&(n.removeAttribute("style"),n.removeAttribute("data-mce-style")),ot(e.attributes,function(e,i){var o;if(e=R(e,t),"number"==typeof i&&(i=e,r=0),!r||k(V.getAttrib(r,i),e)){if("class"==i&&(e=V.getAttrib(n,i),e&&(o="",ot(e.split(/\s+/),function(e){/mce\w+/.test(e)&&(o+=(o?" ":"")+e)}),o)))return void V.setAttrib(n,i,o);"class"==i&&n.removeAttribute("className"),X.test(i)&&n.removeAttribute("data-mce-"+i),n.removeAttribute(i)}}),ot(e.classes,function(e){e=R(e,t),(!r||V.hasClass(r,e))&&V.removeClass(n,e)}),o=V.getAttribs(n),i=0;i<o.length;i++)if(0!==o[i].nodeName.indexOf("_"))return J;return"none"!=e.remove?(M(n,e),Q):void 0}function M(e,t){function n(e,t,n){return e=P(e,t,n),!e||"BR"==e.nodeName||j(e)}var r=e.parentNode,i;t.block&&(Y?r==V.getRoot()&&(t.list_block&&k(e,t.list_block)||ot(at(e.childNodes),function(e){q(Y,e.nodeName.toLowerCase())?i?i.appendChild(e):(i=B(e,Y),V.setAttribs(i,a.settings.forced_root_block_attrs)):i=0})):j(e)&&!j(r)&&(n(e,J)||n(e.firstChild,Q,1)||e.insertBefore(V.create("br"),e.firstChild),n(e,Q)||n(e.lastChild,J,1)||e.appendChild(V.create("br")))),t.selector&&t.inline&&!k(t.inline,e)||V.remove(e,1)}function P(e,t,n){if(e)for(t=t?"nextSibling":"previousSibling",e=n?e:e[t];e;e=e[t])if(1==e.nodeType||!A(e))return e}function O(e,t){function n(e,t){for(i=e;i;i=i[t]){if(3==i.nodeType&&0!==i.nodeValue.length)return e;if(1==i.nodeType&&!it(i))return i}return e}var i,o,a=new r(V);if(e&&t&&(e=n(e,"previousSibling"),t=n(t,"nextSibling"),a.compare(e,t))){for(i=e.nextSibling;i&&i!=t;)o=i,i=i.nextSibling,e.appendChild(o);return V.remove(t),ot(at(t.childNodes),function(t){e.appendChild(t)}),e}return t}function I(t,n){var r,i,o;return r=t[n?"startContainer":"endContainer"],i=t[n?"startOffset":"endOffset"],1==r.nodeType&&(o=r.childNodes.length-1,!n&&i&&i--,r=r.childNodes[i>o?o:i]),3===r.nodeType&&n&&i>=r.nodeValue.length&&(r=new e(r,a.getBody()).next()||r),3!==r.nodeType||n||0!==i||(r=new e(r,a.getBody()).prev()||r),r}function F(t,n,r,i){function o(e){var t=V.create("span",{id:y,"data-mce-bogus":!0,style:C?"color:red":""});return e&&t.appendChild(a.getDoc().createTextNode(G)),t}function l(e,t){for(;e;){if(3===e.nodeType&&e.nodeValue!==G||e.childNodes.length>1)return!1;t&&1===e.nodeType&&t.push(e),e=e.firstChild}return!0}function c(e){for(;e;){if(e.id===y)return e;e=e.parentNode}}function u(t){var n;if(t)for(n=new e(t,t),t=n.current();t;t=n.next())if(3===t.nodeType)return t}function d(e,t){var n,r;if(e)r=U.getRng(!0),l(e)?(t!==!1&&(r.setStartBefore(e),r.setEndBefore(e)),V.remove(e)):(n=u(e),n.nodeValue.charAt(0)===G&&(n.deleteData(0,1),r.startContainer==n&&r.startOffset--,r.endContainer==n&&r.endOffset--),V.remove(e,1)),U.setRng(r);else if(e=c(U.getStart()),!e)for(;e=V.get(y);)d(e,!1)}function p(){var e,t,i,a,s,l,d;e=U.getRng(!0),a=e.startOffset,l=e.startContainer,d=l.nodeValue,t=c(U.getStart()),t&&(i=u(t)),d&&a>0&&a<d.length&&/\w/.test(d.charAt(a))&&/\w/.test(d.charAt(a-1))?(s=U.getBookmark(),e.collapse(!0),e=D(e,f(n)),e=$.split(e),g(n,r,e),U.moveToBookmark(s)):(t&&i.nodeValue===G?g(n,r,t):(t=o(!0),i=t.firstChild,e.insertNode(t),a=1,g(n,r,t)),U.setCursorLocation(i,a))}function h(){var e=U.getRng(!0),t,a,l,c,u,d,p=[],h,m;for(t=e.startContainer,a=e.startOffset,u=t,3==t.nodeType&&(a!=t.nodeValue.length&&(c=!0),u=u.parentNode);u;){if(b(u,n,r,i)){d=u;break}u.nextSibling&&(c=!0),p.push(u),u=u.parentNode}if(d)if(c)l=U.getBookmark(),e.collapse(!0),e=D(e,f(n),!0),e=$.split(e),v(n,r,e),U.moveToBookmark(l);else{for(m=o(),u=m,h=p.length-1;h>=0;h--)u.appendChild(V.clone(p[h],!1)),u=u.firstChild;u.appendChild(V.doc.createTextNode(G)),u=u.firstChild;var g=V.getParent(d,s);g&&V.isEmpty(g)?d.parentNode.replaceChild(m,d):V.insertAfter(m,d),U.setCursorLocation(u,1),V.isEmpty(d)&&V.remove(d)}}function m(){var e;e=c(U.getStart()),e&&!V.isEmpty(e)&&st(e,function(e){1!=e.nodeType||e.id===y||V.isEmpty(e)||V.setAttrib(e,"data-mce-bogus",null)},"childNodes")}var y="_mce_caret",C=a.settings.caret_debug;a._hasCaretEvents||(rt=function(){var e=[],t;if(l(c(U.getStart()),e))for(t=e.length;t--;)V.setAttrib(e[t],"data-mce-bogus","1")},nt=function(e){var t=e.keyCode;d(),(8==t||37==t||39==t)&&d(c(U.getStart())),m()},a.on("SetContent",function(e){e.selection&&m()}),a._hasCaretEvents=!0),"apply"==t?p():h()}function z(t){var n=t.startContainer,r=t.startOffset,i,o,a,s,l;if(3==n.nodeType&&r>=n.nodeValue.length&&(r=K(n),n=n.parentNode,i=!0),1==n.nodeType)for(s=n.childNodes,n=s[Math.min(r,s.length-1)],o=new e(n,V.getParent(n,V.isBlock)),(r>s.length-1||i)&&o.next(),a=o.current();a;a=o.next())if(3==a.nodeType&&!A(a))return l=V.create("a",{"data-mce-bogus":"all"},G),a.parentNode.insertBefore(l,a),t.setStart(a,0),U.setRng(t),void V.remove(l)}var W={},V=a.dom,U=a.selection,$=new t(V),q=a.schema.isValidChild,j=V.isBlock,Y=a.settings.forced_root_block,K=V.nodeIndex,G="\ufeff",X=/^(src|href|style)$/,J=!1,Q=!0,Z,et,tt=V.getContentEditable,nt,rt,it=n.isBookmarkNode,ot=i.each,at=i.grep,st=i.walk,lt=i.extend;lt(this,{get:f,register:p,apply:g,remove:v,toggle:y,match:C,matchAll:x,matchNode:b,canApply:w,formatChanged:_,getCssText:E}),u(),d(),a.on("BeforeGetContent",function(e){rt&&"raw"!=e.format&&rt()}),a.on("mouseup keydown",function(e){nt&&nt(e)})}}),r(I,[d,u,N],function(e,t,n){var r=t.trim,i;return i=new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>",'\\s?data-mce-selected="[^"]+"'].join("|"),"gi"),function(t){function o(){var e=r(t.getContent({format:"raw",no_events:1})),o=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,a,s,l,c,u,d=t.schema;for(e=e.replace(i,""),u=d.getShortEndedElements();c=o.exec(e);)s=o.lastIndex,l=c[0].length,a=u[c[1]]?s:n.findEndTag(d,e,s),e=e.substring(0,s-l)+e.substring(a),o.lastIndex=s-l;return e}function a(e){s.typing=!1,s.add({},e)}var s=this,l=0,c=[],u,d,f=0;return t.on("init",function(){s.add()}),t.on("BeforeExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&s.beforeChange()}),t.on("ExecCommand",function(e){var t=e.command;"Undo"!=t&&"Redo"!=t&&"mceRepaint"!=t&&a(e)}),t.on("ObjectResizeStart",function(){s.beforeChange()}),t.on("SaveContent ObjectResized blur",a),t.on("DragEnd",a),t.on("KeyUp",function(n){var r=n.keyCode;(r>=33&&36>=r||r>=37&&40>=r||45==r||13==r||n.ctrlKey)&&(a(),t.nodeChanged()),(46==r||8==r||e.mac&&(91==r||93==r))&&t.nodeChanged(),d&&s.typing&&(t.isDirty()||(t.isNotDirty=!c[0]||o()==c[0].content,t.isNotDirty||t.fire("change",{level:c[0],lastLevel:null})),t.fire("TypingUndo"),d=!1,t.nodeChanged())}),t.on("KeyDown",function(e){var t=e.keyCode;return t>=33&&36>=t||t>=37&&40>=t||45==t?void(s.typing&&a(e)):void((16>t||t>20)&&224!=t&&91!=t&&!s.typing&&(s.beforeChange(),s.typing=!0,s.add({},e),d=!0))}),t.on("MouseDown",function(e){s.typing&&a(e)}),t.addShortcut("ctrl+z","","Undo"),t.addShortcut("ctrl+y,ctrl+shift+z","","Redo"),t.on("AddUndo Undo Redo ClearUndos",function(e){e.isDefaultPrevented()||t.nodeChanged()}),s={data:c,typing:!1,beforeChange:function(){f||(u=t.selection.getBookmark(2,!0))},add:function(e,n){var r,i=t.settings,a;if(e=e||{},e.content=o(),f||t.removed)return null;if(a=c[l],t.fire("BeforeAddUndo",{level:e,lastLevel:a,originalEvent:n}).isDefaultPrevented())return null;if(a&&a.content==e.content)return null;if(c[l]&&(c[l].beforeBookmark=u),i.custom_undo_redo_levels&&c.length>i.custom_undo_redo_levels){for(r=0;r<c.length-1;r++)c[r]=c[r+1];c.length--,l=c.length}e.bookmark=t.selection.getBookmark(2,!0),l<c.length-1&&(c.length=l+1),c.push(e),l=c.length-1;var s={level:e,lastLevel:a,originalEvent:n};return t.fire("AddUndo",s),l>0&&(t.isNotDirty=!1,t.fire("change",s)),e},undo:function(){var e;return s.typing&&(s.add(),s.typing=!1),l>0&&(e=c[--l],0===l&&(t.isNotDirty=!0),t.setContent(e.content,{format:"raw"}),t.selection.moveToBookmark(e.beforeBookmark),t.fire("undo",{level:e})),e},redo:function(){var e;return l<c.length-1&&(e=c[++l],t.setContent(e.content,{format:"raw"}),t.selection.moveToBookmark(e.bookmark),t.fire("redo",{level:e})),e},clear:function(){c=[],l=0,s.typing=!1,t.fire("ClearUndos")},hasUndo:function(){return l>0||s.typing&&c[0]&&o()!=c[0].content},hasRedo:function(){return l<c.length-1&&!this.typing},transact:function(e){s.beforeChange();try{f++,e()}finally{f--}s.add()}}}}),r(F,[h,x,d],function(e,t,n){var r=n.ie&&n.ie<11;return function(i){function o(o){function f(e){return e&&a.isBlock(e)&&!/^(TD|TH|CAPTION|FORM)$/.test(e.nodeName)&&!/^(fixed|absolute)/i.test(e.style.position)&&"true"!==a.getContentEditable(e)}function p(e){var t;a.isBlock(e)&&(t=s.getRng(),e.appendChild(a.create("span",null,"\xa0")),s.select(e),e.lastChild.outerHTML="",s.setRng(t))}function h(e){var t=e,n=[],r;if(t){for(;t=t.firstChild;){if(a.isBlock(t))return;1!=t.nodeType||d[t.nodeName.toLowerCase()]||n.push(t)}for(r=n.length;r--;)t=n[r],!t.hasChildNodes()||t.firstChild==t.lastChild&&""===t.firstChild.nodeValue?a.remove(t):"A"==t.nodeName&&" "===(t.innerText||t.textContent)&&a.remove(t)}}function m(t){function r(e){for(;e;){if(1==e.nodeType||3==e.nodeType&&e.data&&/[\r\n\s]/.test(e.data))return e;e=e.nextSibling}}var i,o,l,c=t,u;if(t){if(n.ie&&n.ie<9&&A&&A.firstChild&&A.firstChild==A.lastChild&&"BR"==A.firstChild.tagName&&a.remove(A.firstChild),/^(LI|DT|DD)$/.test(t.nodeName)){var f=r(t.firstChild);f&&/^(UL|OL|DL)$/.test(f.nodeName)&&t.insertBefore(a.doc.createTextNode("\xa0"),t.firstChild)}if(l=a.createRng(),n.ie||t.normalize(),t.hasChildNodes()){for(i=new e(t,t);o=i.current();){if(3==o.nodeType){l.setStart(o,0),l.setEnd(o,0);break}if(d[o.nodeName.toLowerCase()]){l.setStartBefore(o),l.setEndBefore(o);break}c=o,o=i.next()}o||(l.setStart(c,0),l.setEnd(c,0))}else"BR"==t.nodeName?t.nextSibling&&a.isBlock(t.nextSibling)?((!B||9>B)&&(u=a.create("br"),t.parentNode.insertBefore(u,t)),l.setStartBefore(t),l.setEndBefore(t)):(l.setStartAfter(t),l.setEndAfter(t)):(l.setStart(t,0),l.setEnd(t,0));s.setRng(l),a.remove(u),s.scrollIntoView(t)}}function g(e){var t=l.forced_root_block;t&&t.toLowerCase()===e.tagName.toLowerCase()&&a.setAttribs(e,l.forced_root_block_attrs)}function v(e){var t=T,n,i,o,s=u.getTextInlineElements();if(e||"TABLE"==P?(n=a.create(e||I),g(n)):n=A.cloneNode(!1),o=n,l.keep_styles!==!1)do if(s[t.nodeName]){if("_mce_caret"==t.id)continue;i=t.cloneNode(!1),a.setAttrib(i,"id",""),n.hasChildNodes()?(i.appendChild(n.firstChild),n.appendChild(i)):(o=i,n.appendChild(i))}while(t=t.parentNode);return r||(o.innerHTML='<br data-mce-bogus="1">'),n}function y(t){var n,r,i;if(3==T.nodeType&&(t?R>0:R<T.nodeValue.length))return!1;if(T.parentNode==A&&F&&!t)return!0;if(t&&1==T.nodeType&&T==A.firstChild)return!0;if("TABLE"===T.nodeName||T.previousSibling&&"TABLE"==T.previousSibling.nodeName)return F&&!t||!F&&t;for(n=new e(T,A),3==T.nodeType&&(t&&0===R?n.prev():t||R!=T.nodeValue.length||n.next());r=n.current();){if(1===r.nodeType){if(!r.getAttribute("data-mce-bogus")&&(i=r.nodeName.toLowerCase(),d[i]&&"br"!==i))return!1}else if(3===r.nodeType&&!/^[ \t\r\n]*$/.test(r.nodeValue))return!1;t?n.prev():n.next()}return!0}function b(e,t){var n,r,o,s,l,c,d=I||"P";if(r=a.getParent(e,a.isBlock),c=i.getBody().nodeName.toLowerCase(),!r||!f(r)){if(r=r||S,!r.hasChildNodes())return n=a.create(d),g(n),r.appendChild(n),N.setStart(n,0),N.setEnd(n,0),n;for(s=e;s.parentNode!=r;)s=s.parentNode;for(;s&&!a.isBlock(s);)o=s,s=s.previousSibling;if(o&&u.isValidChild(c,d.toLowerCase())){for(n=a.create(d),g(n),o.parentNode.insertBefore(n,o),s=o;s&&!a.isBlock(s);)l=s.nextSibling,n.appendChild(s),s=l;N.setStart(e,t),N.setEnd(e,t)}}return e}function C(){function e(e){for(var t=M[e?"firstChild":"lastChild"];t&&1!=t.nodeType;)t=t[e?"nextSibling":"previousSibling"];return t===A}function t(){var e=M.parentNode;return/^(LI|DT|DD)$/.test(e.nodeName)?e:M}var n=M.parentNode.nodeName;/^(OL|UL|LI)$/.test(n)&&(I="LI"),L=I?v(I):a.create("BR"),e(!0)&&e()?"LI"==n?a.insertAfter(L,t()):a.replace(L,M):e(!0)?"LI"==n?(a.insertAfter(L,t()),L.appendChild(a.doc.createTextNode(" ")),L.appendChild(M)):M.parentNode.insertBefore(L,M):e()?(a.insertAfter(L,t()),p(L)):(M=t(),k=N.cloneRange(),k.setStartAfter(A),k.setEndAfter(M),H=k.extractContents(),"LI"==I&&"LI"==H.firstChild.nodeName?(L=H.firstChild,a.insertAfter(H,M)):(a.insertAfter(H,M),a.insertAfter(L,M))),a.remove(A),m(L),c.add()}function x(){i.execCommand("InsertLineBreak",!1,o)}function w(e){do 3===e.nodeType&&(e.nodeValue=e.nodeValue.replace(/^[\r\n]+/,"")),e=e.firstChild;while(e)}function _(e){var t=a.getRoot(),n,r;for(n=e;n!==t&&"false"!==a.getContentEditable(n);)"true"===a.getContentEditable(n)&&(r=n),n=n.parentNode;return n!==t?r:t}function E(e){var t;r||(e.normalize(),t=e.lastChild,(!t||/^(left|right)$/gi.test(a.getStyle(t,"float",!0)))&&a.add(e,"br"))}var N,k,S,T,R,A,B,D,L,H,M,P,O,I,F;if(N=s.getRng(!0),!o.isDefaultPrevented()){if(!N.collapsed)return void i.execCommand("Delete");if(new t(a).normalize(N),T=N.startContainer,R=N.startOffset,I=(l.force_p_newlines?"p":"")||l.forced_root_block,I=I?I.toUpperCase():"",B=a.doc.documentMode,D=o.shiftKey,1==T.nodeType&&T.hasChildNodes()&&(F=R>T.childNodes.length-1,T=T.childNodes[Math.min(R,T.childNodes.length-1)]||T,R=F&&3==T.nodeType?T.nodeValue.length:0),S=_(T)){if(c.beforeChange(),!a.isBlock(S)&&S!=a.getRoot())return void((!I||D)&&x());if((I&&!D||!I&&D)&&(T=b(T,R)),A=a.getParent(T,a.isBlock),M=A?a.getParent(A.parentNode,a.isBlock):null,P=A?A.nodeName.toUpperCase():"",O=M?M.nodeName.toUpperCase():"","LI"!=O||o.ctrlKey||(A=M,P=O),/^(LI|DT|DD)$/.test(P)){if(!I&&D)return void x();if(a.isEmpty(A))return void C()}if("PRE"==P&&l.br_in_pre!==!1){if(!D)return void x()}else if(!I&&!D&&"LI"!=P||I&&D)return void x();I&&A===i.getBody()||(I=I||"P",y()?(L=/^(H[1-6]|PRE|FIGURE)$/.test(P)&&"HGROUP"!=O?v(I):v(),l.end_container_on_empty_block&&f(M)&&a.isEmpty(A)?L=a.split(M,A):a.insertAfter(L,A),m(L)):y(!0)?(L=A.parentNode.insertBefore(v(),A),p(L),m(A)):(k=N.cloneRange(),k.setEndAfter(A),H=k.extractContents(),w(H),L=H.firstChild,a.insertAfter(H,A),h(L),E(A),m(L)),a.setAttrib(L,"id",""),i.fire("NewBlock",{newBlock:L}),c.add())}}}var a=i.dom,s=i.selection,l=i.settings,c=i.undoManager,u=i.schema,d=u.getNonEmptyElements();i.on("keydown",function(e){13==e.keyCode&&o(e)!==!1&&e.preventDefault()})}}),r(z,[],function(){return function(e){function t(){var t=i.getStart(),s=e.getBody(),l,c,u,d,f,p,h,m=-16777215,g,v,y,b,C;if(C=n.forced_root_block,t&&1===t.nodeType&&C){for(;t&&t!=s;){if(a[t.nodeName])return;t=t.parentNode}if(l=i.getRng(),l.setStart){c=l.startContainer,u=l.startOffset,d=l.endContainer,f=l.endOffset;try{v=e.getDoc().activeElement===s}catch(x){}}else l.item&&(t=l.item(0),l=e.getDoc().body.createTextRange(),l.moveToElementText(t)),v=l.parentElement().ownerDocument===e.getDoc(),y=l.duplicate(),y.collapse(!0),u=-1*y.move("character",m),y.collapsed||(y=l.duplicate(),y.collapse(!1),f=-1*y.move("character",m)-u);for(t=s.firstChild,b=s.nodeName.toLowerCase();t;)if((3===t.nodeType||1==t.nodeType&&!a[t.nodeName])&&o.isValidChild(b,C.toLowerCase())){if(3===t.nodeType&&0===t.nodeValue.length){h=t,t=t.nextSibling,r.remove(h);continue}p||(p=r.create(C,e.settings.forced_root_block_attrs),t.parentNode.insertBefore(p,t),g=!0),h=t,t=t.nextSibling,p.appendChild(h)}else p=null,t=t.nextSibling;if(g&&v){if(l.setStart)l.setStart(c,u),l.setEnd(d,f),i.setRng(l);else try{l=e.getDoc().body.createTextRange(),l.moveToElementText(s),l.collapse(!0),l.moveStart("character",u),f>0&&l.moveEnd("character",f),l.select()}catch(x){}e.nodeChanged()}}}var n=e.settings,r=e.dom,i=e.selection,o=e.schema,a=o.getBlockElements();n.forced_root_block&&e.on("NodeChange",t)}}),r(W,[T,d,u,M,x,h],function(e,n,r,i,o,a){var s=r.each,l=r.extend,c=r.map,u=r.inArray,d=r.explode,f=n.gecko,p=n.ie,h=n.ie&&n.ie<11,m=!0,g=!1;return function(r){function v(e,t,n){var r;return e=e.toLowerCase(),(r=T.exec[e])?(r(e,t,n),m):g}function y(e){var t;return e=e.toLowerCase(),(t=T.state[e])?t(e):-1}function b(e){var t;return e=e.toLowerCase(),(t=T.value[e])?t(e):g}function C(e,t){t=t||"exec",s(e,function(e,n){s(n.toLowerCase().split(","),function(n){T[t][n]=e})})}function x(e,n,i){return n===t&&(n=g),i===t&&(i=null),r.getDoc().execCommand(e,n,i)}function w(e){return A.match(e)}function _(e,n){A.toggle(e,n?{value:n}:t),r.nodeChanged()}function E(e){B=S.getBookmark(e)}function N(){S.moveToBookmark(B)}var k=r.dom,S=r.selection,T={state:{},exec:{},value:{}},R=r.settings,A=r.formatter,B;l(this,{execCommand:v,queryCommandState:y,queryCommandValue:b,addCommands:C}),C({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){r.undoManager.add()},"Cut,Copy,Paste":function(e){var t=r.getDoc(),i;try{x(e)}catch(o){i=m}if(i||!t.queryCommandSupported(e)){var a=r.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");n.mac&&(a=a.replace(/Ctrl\+/g,"\u2318+")),r.windowManager.alert(a)}},unlink:function(){if(S.isCollapsed()){var e=S.getNode();return void("A"==e.tagName&&r.dom.remove(e,!0))}A.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t=e.substring(7);"full"==t&&(t="justify"),s("left,center,right,justify".split(","),function(e){t!=e&&A.remove("align"+e)}),_("align"+t),v("mceRepaint")},"InsertUnorderedList,InsertOrderedList":function(e){var t,n;x(e),t=k.getParent(S.getNode(),"ol,ul"),t&&(n=t.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName)&&(E(),k.split(n,t),N()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){_(e)},"ForeColor,HiliteColor,FontName":function(e,t,n){_(e,n)},FontSize:function(e,t,n){var r,i;n>=1&&7>=n&&(i=d(R.font_size_style_values),r=d(R.font_size_classes),n=r?r[n-1]||n:i[n-1]||n),_(e,n)},RemoveFormat:function(e){A.remove(e)},mceBlockQuote:function(){_("blockquote")},FormatBlock:function(e,t,n){return _(n||"p")},mceCleanup:function(){var e=S.getBookmark();r.setContent(r.getContent({cleanup:m}),{cleanup:m}),S.moveToBookmark(e)},mceRemoveNode:function(e,t,n){var i=n||S.getNode();i!=r.getBody()&&(E(),r.dom.remove(i,m),N())},mceSelectNodeDepth:function(e,t,n){var i=0;k.getParent(S.getNode(),function(e){return 1==e.nodeType&&i++==n?(S.select(e),g):void 0},r.getBody())},mceSelectNode:function(e,t,n){S.select(n)},mceInsertContent:function(t,n,o){function a(e){function t(e){return r[e]&&3==r[e].nodeType}var n,r,i;return n=S.getRng(!0),r=n.startContainer,i=n.startOffset,3==r.nodeType&&(i>0?e=e.replace(/^&nbsp;/," "):t("previousSibling")||(e=e.replace(/^ /,"&nbsp;")),i<r.length?e=e.replace(/&nbsp;(<br>|)$/," "):t("nextSibling")||(e=e.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),e}function l(e){if(w)for(b=e.firstChild;b;b=b.walk(!0))_[b.name]&&b.attr("data-mce-new","true")}function c(){if(w){var e=r.getBody(),t=new i(k);s(k.select("*[data-mce-new]"),function(n){n.removeAttribute("data-mce-new");for(var r=n.parentNode;r&&r!=e;r=r.parentNode)t.compare(r,n)&&k.remove(n,!0)})}}var u,d,f,h,m,g,v,y,b,C,x,w,_=r.schema.getTextInlineElements();"string"!=typeof o&&(w=o.merge,o=o.content),/^ | $/.test(o)&&(o=a(o)),u=r.parser,d=new e({},r.schema),x='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#200B;</span>',g={content:o,format:"html",selection:!0},r.fire("BeforeSetContent",g),o=g.content,-1==o.indexOf("{$caret}")&&(o+="{$caret}"),o=o.replace(/\{\$caret\}/,x),y=S.getRng();var E=y.startContainer||(y.parentElement?y.parentElement():null),N=r.getBody();E===N&&S.isCollapsed()&&k.isBlock(N.firstChild)&&k.isEmpty(N.firstChild)&&(y=k.createRng(),y.setStart(N.firstChild,0),y.setEnd(N.firstChild,0),S.setRng(y)),S.isCollapsed()||r.getDoc().execCommand("Delete",!1,null),f=S.getNode();var T={context:f.nodeName.toLowerCase()};if(m=u.parse(o,T),l(m),b=m.lastChild,"mce_marker"==b.attr("id"))for(v=b,b=b.prev;b;b=b.walk(!0))if(3==b.type||!k.isBlock(b.name)){b.parent.insert(v,b,"br"===b.name);
break}if(T.invalid){for(S.setContent(x),f=S.getNode(),h=r.getBody(),9==f.nodeType?f=b=h:b=f;b!==h;)f=b,b=b.parentNode;o=f==h?h.innerHTML:k.getOuterHTML(f),o=d.serialize(u.parse(o.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return d.serialize(m)}))),f==h?k.setHTML(h,o):k.setOuterHTML(f,o)}else o=d.serialize(m),b=f.firstChild,C=f.lastChild,!b||b===C&&"BR"===b.nodeName?k.setHTML(f,o):S.setContent(o);c(),v=k.get("mce_marker"),S.scrollIntoView(v),y=k.createRng(),b=v.previousSibling,b&&3==b.nodeType?(y.setStart(b,b.nodeValue.length),p||(C=v.nextSibling,C&&3==C.nodeType&&(b.appendData(C.data),C.parentNode.removeChild(C)))):(y.setStartBefore(v),y.setEndBefore(v)),k.remove(v),S.setRng(y),r.fire("SetContent",g),r.addVisual()},mceInsertRawHTML:function(e,t,n){S.setContent("tiny_mce_marker"),r.setContent(r.getContent().replace(/tiny_mce_marker/g,function(){return n}))},mceToggleFormat:function(e,t,n){_(n)},mceSetContent:function(e,t,n){r.setContent(n)},"Indent,Outdent":function(e){var t,n,i;t=R.indentation,n=/[a-z%]+$/i.exec(t),t=parseInt(t,10),y("InsertUnorderedList")||y("InsertOrderedList")?x(e):(R.forced_root_block||k.getParent(S.getNode(),k.isBlock)||A.apply("div"),s(S.getSelectedBlocks(),function(o){if("LI"!=o.nodeName){var a=r.getParam("indent_use_margin",!1)?"margin":"padding";a+="rtl"==k.getStyle(o,"direction",!0)?"Right":"Left","outdent"==e?(i=Math.max(0,parseInt(o.style[a]||0,10)-t),k.setStyle(o,a,i?i+n:"")):(i=parseInt(o.style[a]||0,10)+t+n,k.setStyle(o,a,i))}}))},mceRepaint:function(){if(f)try{E(m),S.getSel()&&S.getSel().selectAllChildren(r.getBody()),S.collapse(m),N()}catch(e){}},InsertHorizontalRule:function(){r.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){r.hasVisual=!r.hasVisual,r.addVisual()},mceReplaceContent:function(e,t,n){r.execCommand("mceInsertContent",!1,n.replace(/\{\$selection\}/g,S.getContent({format:"text"})))},mceInsertLink:function(e,t,n){var r;"string"==typeof n&&(n={href:n}),r=k.getParent(S.getNode(),"a"),n.href=n.href.replace(" ","%20"),r&&n.href||A.remove("link"),n.href&&A.apply("link",n,r)},selectAll:function(){var e=k.getRoot(),t;S.getRng().setStart?(t=k.createRng(),t.setStart(e,0),t.setEnd(e,e.childNodes.length),S.setRng(t)):(t=S.getRng(),t.item||(t.moveToElementText(e),t.select()))},"delete":function(){x("Delete");var e=r.getBody();k.isEmpty(e)&&(r.setContent(""),e.firstChild&&k.isBlock(e.firstChild)?r.selection.setCursorLocation(e.firstChild,0):r.selection.setCursorLocation(e,0))},mceNewDocument:function(){r.setContent("")},InsertLineBreak:function(e,t,n){function i(){for(var e=new a(p,v),t,n=r.schema.getNonEmptyElements();t=e.next();)if(n[t.nodeName.toLowerCase()]||t.length>0)return!0}var s=n,l,c,u,d=S.getRng(!0);new o(k).normalize(d);var f=d.startOffset,p=d.startContainer;if(1==p.nodeType&&p.hasChildNodes()){var g=f>p.childNodes.length-1;p=p.childNodes[Math.min(f,p.childNodes.length-1)]||p,f=g&&3==p.nodeType?p.nodeValue.length:0}var v=k.getParent(p,k.isBlock),y=v?v.nodeName.toUpperCase():"",b=v?k.getParent(v.parentNode,k.isBlock):null,C=b?b.nodeName.toUpperCase():"",x=s&&s.ctrlKey;"LI"!=C||x||(v=b,y=C),p&&3==p.nodeType&&f>=p.nodeValue.length&&(h||i()||(l=k.create("br"),d.insertNode(l),d.setStartAfter(l),d.setEndAfter(l),c=!0)),l=k.create("br"),d.insertNode(l);var w=k.doc.documentMode;return h&&"PRE"==y&&(!w||8>w)&&l.parentNode.insertBefore(k.doc.createTextNode("\r"),l),u=k.create("span",{},"&nbsp;"),l.parentNode.insertBefore(u,l),S.scrollIntoView(u),k.remove(u),c?(d.setStartBefore(l),d.setEndBefore(l)):(d.setStartAfter(l),d.setEndAfter(l)),S.setRng(d),r.undoManager.add(),m}}),C({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(e){var t="align"+e.substring(7),n=S.isCollapsed()?[k.getParent(S.getNode(),k.isBlock)]:S.getSelectedBlocks(),r=c(n,function(e){return!!A.matchNode(e,t)});return-1!==u(r,m)},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(e){return w(e)},mceBlockQuote:function(){return w("blockquote")},Outdent:function(){var e;if(R.inline_styles){if((e=k.getParent(S.getStart(),k.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return m;if((e=k.getParent(S.getEnd(),k.isBlock))&&parseInt(e.style.paddingLeft,10)>0)return m}return y("InsertUnorderedList")||y("InsertOrderedList")||!R.inline_styles&&!!k.getParent(S.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(e){var t=k.getParent(S.getNode(),"ul,ol");return t&&("insertunorderedlist"===e&&"UL"===t.tagName||"insertorderedlist"===e&&"OL"===t.tagName)}},"state"),C({"FontSize,FontName":function(e){var t=0,n;return(n=k.getParent(S.getNode(),"span"))&&(t="fontsize"==e?n.style.fontSize:n.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),t}},"value"),C({Undo:function(){r.undoManager.undo()},Redo:function(){r.undoManager.redo()}})}}),r(V,[u],function(e){function t(e,o){var a=this,s,l;if(e=r(e),o=a.settings=o||{},s=o.base_uri,/^([\w\-]+):([^\/]{2})/i.test(e)||/^\s*#/.test(e))return void(a.source=e);var c=0===e.indexOf("//");0!==e.indexOf("/")||c||(e=(s?s.protocol||"http":"http")+"://mce_host"+e),/^[\w\-]*:?\/\//.test(e)||(l=o.base_uri?o.base_uri.path:new t(location.href).directory,""===o.base_uri.protocol?e="//mce_host"+a.toAbsPath(l,e):(e=/([^#?]*)([#?]?.*)/.exec(e),e=(s&&s.protocol||"http")+"://mce_host"+a.toAbsPath(l,e[1])+e[2])),e=e.replace(/@@/g,"(mce_at)"),e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),n(i,function(t,n){var r=e[n];r&&(r=r.replace(/\(mce_at\)/g,"@@")),a[t]=r}),s&&(a.protocol||(a.protocol=s.protocol),a.userInfo||(a.userInfo=s.userInfo),a.port||"mce_host"!==a.host||(a.port=s.port),a.host&&"mce_host"!==a.host||(a.host=s.host),a.source=""),c&&(a.protocol="")}var n=e.each,r=e.trim,i="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),o={ftp:21,http:80,https:443,mailto:25};return t.prototype={setPath:function(e){var t=this;e=/^(.*?)\/?(\w+)?$/.exec(e),t.path=e[0],t.directory=e[1],t.file=e[2],t.source="",t.getURI()},toRelative:function(e){var n=this,r;if("./"===e)return e;if(e=new t(e,{base_uri:n}),"mce_host"!=e.host&&n.host!=e.host&&e.host||n.port!=e.port||n.protocol!=e.protocol&&""!==e.protocol)return e.getURI();var i=n.getURI(),o=e.getURI();return i==o||"/"==i.charAt(i.length-1)&&i.substr(0,i.length-1)==o?i:(r=n.toRelPath(n.path,e.path),e.query&&(r+="?"+e.query),e.anchor&&(r+="#"+e.anchor),r)},toAbsolute:function(e,n){return e=new t(e,{base_uri:this}),e.getURI(n&&this.isSameOrigin(e))},isSameOrigin:function(e){if(this.host==e.host&&this.protocol==e.protocol){if(this.port==e.port)return!0;var t=o[this.protocol];if(t&&(this.port||t)==(e.port||t))return!0}return!1},toRelPath:function(e,t){var n,r=0,i="",o,a;if(e=e.substring(0,e.lastIndexOf("/")),e=e.split("/"),n=t.split("/"),e.length>=n.length)for(o=0,a=e.length;a>o;o++)if(o>=n.length||e[o]!=n[o]){r=o+1;break}if(e.length<n.length)for(o=0,a=n.length;a>o;o++)if(o>=e.length||e[o]!=n[o]){r=o+1;break}if(1===r)return t;for(o=0,a=e.length-(r-1);a>o;o++)i+="../";for(o=r-1,a=n.length;a>o;o++)i+=o!=r-1?"/"+n[o]:n[o];return i},toAbsPath:function(e,t){var r,i=0,o=[],a,s;for(a=/\/$/.test(t)?"/":"",e=e.split("/"),t=t.split("/"),n(e,function(e){e&&o.push(e)}),e=o,r=t.length-1,o=[];r>=0;r--)0!==t[r].length&&"."!==t[r]&&(".."!==t[r]?i>0?i--:o.push(t[r]):i++);return r=e.length-i,s=0>=r?o.reverse().join("/"):e.slice(0,r).join("/")+"/"+o.reverse().join("/"),0!==s.indexOf("/")&&(s="/"+s),a&&s.lastIndexOf("/")!==s.length-1&&(s+=a),s},getURI:function(e){var t,n=this;return(!n.source||e)&&(t="",e||(t+=n.protocol?n.protocol+"://":"//",n.userInfo&&(t+=n.userInfo+"@"),n.host&&(t+=n.host),n.port&&(t+=":"+n.port)),n.path&&(t+=n.path),n.query&&(t+="?"+n.query),n.anchor&&(t+="#"+n.anchor),n.source=t),n.source}},t}),r(U,[u],function(e){function t(){}var n=e.each,r=e.extend,i,o;return t.extend=i=function(e){function t(){var e,t,n,r=this;if(!o&&(r.init&&r.init.apply(r,arguments),t=r.Mixins))for(e=t.length;e--;)n=t[e],n.init&&n.init.apply(r,arguments)}function a(){return this}function s(e,t){return function(){var n=this,r=n._super,i;return n._super=c[e],i=t.apply(n,arguments),n._super=r,i}}var l=this,c=l.prototype,u,d,f;o=!0,u=new l,o=!1,e.Mixins&&(n(e.Mixins,function(t){t=t;for(var n in t)"init"!==n&&(e[n]=t[n])}),c.Mixins&&(e.Mixins=c.Mixins.concat(e.Mixins))),e.Methods&&n(e.Methods.split(","),function(t){e[t]=a}),e.Properties&&n(e.Properties.split(","),function(t){var n="_"+t;e[t]=function(e){var t=this,r;return e!==r?(t[n]=e,t):t[n]}}),e.Statics&&n(e.Statics,function(e,n){t[n]=e}),e.Defaults&&c.Defaults&&(e.Defaults=r({},c.Defaults,e.Defaults));for(d in e)f=e[d],u[d]="function"==typeof f&&c[d]?s(d,f):f;return t.prototype=u,t.constructor=t,t.extend=i,t},t}),r($,[u],function(e){function t(e){function t(){return!1}function n(){return!0}function r(r,i){var a,s,l,d;if(r=r.toLowerCase(),i=i||{},i.type=r,i.target||(i.target=c),i.preventDefault||(i.preventDefault=function(){i.isDefaultPrevented=n},i.stopPropagation=function(){i.isPropagationStopped=n},i.stopImmediatePropagation=function(){i.isImmediatePropagationStopped=n},i.isDefaultPrevented=t,i.isPropagationStopped=t,i.isImmediatePropagationStopped=t),e.beforeFire&&e.beforeFire(i),a=u[r])for(s=0,l=a.length;l>s;s++){if(a[s]=d=a[s],d.once&&o(r,d),i.isImmediatePropagationStopped())return i.stopPropagation(),i;if(d.call(c,i)===!1)return i.preventDefault(),i}return i}function i(e,n,r){var i,o,a;if(n===!1&&(n=t),n)for(o=e.toLowerCase().split(" "),a=o.length;a--;)e=o[a],i=u[e],i||(i=u[e]=[],d(e,!0)),r?i.unshift(n):i.push(n);return l}function o(e,t){var n,r,i,o,a;if(e)for(o=e.toLowerCase().split(" "),n=o.length;n--;){if(e=o[n],r=u[e],!e){for(i in u)d(i,!1),delete u[i];return l}if(r){if(t)for(a=r.length;a--;)r[a]===t&&(r=r.slice(0,a).concat(r.slice(a+1)),u[e]=r);else r.length=0;r.length||(d(e,!1),delete u[e])}}else{for(e in u)d(e,!1);u={}}return l}function a(e,t,n){return t.once=!0,i(e,t,n)}function s(e){return e=e.toLowerCase(),!(!u[e]||0===u[e].length)}var l=this,c,u={},d;e=e||{},c=e.scope||l,d=e.toggleEvent||t,l.fire=r,l.on=i,l.off=o,l.once=a,l.has=s}var n=e.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchend"," ");return t.isNative=function(e){return!!n[e.toLowerCase()]},t}),r(q,[U],function(e){function t(e){for(var t=[],n=e.length,r;n--;)r=e[n],r.__checked||(t.push(r),r.__checked=1);for(n=t.length;n--;)delete t[n].__checked;return t}var n=/^([\w\\*]+)?(?:#([\w\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,r=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,i=/^\s*|\s*$/g,o,a=e.extend({init:function(e){function t(e){return e?(e=e.toLowerCase(),function(t){return"*"===e||t.type===e}):void 0}function o(e){return e?function(t){return t._name===e}:void 0}function a(e){return e?(e=e.split("."),function(t){for(var n=e.length;n--;)if(!t.hasClass(e[n]))return!1;return!0}):void 0}function s(e,t,n){return e?function(r){var i=r[e]?r[e]():"";return t?"="===t?i===n:"*="===t?i.indexOf(n)>=0:"~="===t?(" "+i+" ").indexOf(" "+n+" ")>=0:"!="===t?i!=n:"^="===t?0===i.indexOf(n):"$="===t?i.substr(i.length-n.length)===n:!1:!!n}:void 0}function l(e){var t;return e?(e=/(?:not\((.+)\))|(.+)/i.exec(e),e[1]?(t=u(e[1],[]),function(e){return!d(e,t)}):(e=e[2],function(t,n,r){return"first"===e?0===n:"last"===e?n===r-1:"even"===e?n%2===0:"odd"===e?n%2===1:t[e]?t[e]():!1})):void 0}function c(e,r,c){function u(e){e&&r.push(e)}var d;return d=n.exec(e.replace(i,"")),u(t(d[1])),u(o(d[2])),u(a(d[3])),u(s(d[4],d[5],d[6])),u(l(d[7])),r.psuedo=!!d[7],r.direct=c,r}function u(e,t){var n=[],i,o,a;do if(r.exec(""),o=r.exec(e),o&&(e=o[3],n.push(o[1]),o[2])){i=o[3];break}while(o);for(i&&u(i,t),e=[],a=0;a<n.length;a++)">"!=n[a]&&e.push(c(n[a],[],">"===n[a-1]));return t.push(e),t}var d=this.match;this._selectors=u(e,[])},match:function(e,t){var n,r,i,o,a,s,l,c,u,d,f,p,h;for(t=t||this._selectors,n=0,r=t.length;r>n;n++){for(a=t[n],o=a.length,h=e,p=0,i=o-1;i>=0;i--)for(c=a[i];h;){if(c.psuedo)for(f=h.parent().items(),u=d=f.length;u--&&f[u]!==h;);for(s=0,l=c.length;l>s;s++)if(!c[s](h,u,d)){s=l+1;break}if(s===l){p++;break}if(i===o-1)break;h=h.parent()}if(p===o)return!0}return!1},find:function(e){function n(e,t,i){var o,a,s,l,c,u=t[i];for(o=0,a=e.length;a>o;o++){for(c=e[o],s=0,l=u.length;l>s;s++)if(!u[s](c,o,a)){s=l+1;break}if(s===l)i==t.length-1?r.push(c):c.items&&n(c.items(),t,i+1);else if(u.direct)return;c.items&&n(c.items(),t,i)}}var r=[],i,s,l=this._selectors;if(e.items){for(i=0,s=l.length;s>i;i++)n(e.items(),l[i],0);s>1&&(r=t(r))}return o||(o=a.Collection),new o(r)}});return a}),r(j,[u,q,U],function(e,t,n){var r,i,o=Array.prototype.push,a=Array.prototype.slice;return i={length:0,init:function(e){e&&this.add(e)},add:function(t){var n=this;return e.isArray(t)?o.apply(n,t):t instanceof r?n.add(t.toArray()):o.call(n,t),n},set:function(e){var t=this,n=t.length,r;for(t.length=0,t.add(e),r=t.length;n>r;r++)delete t[r];return t},filter:function(e){var n=this,i,o,a=[],s,l;for("string"==typeof e?(e=new t(e),l=function(t){return e.match(t)}):l=e,i=0,o=n.length;o>i;i++)s=n[i],l(s)&&a.push(s);return new r(a)},slice:function(){return new r(a.apply(this,arguments))},eq:function(e){return-1===e?this.slice(e):this.slice(e,+e+1)},each:function(t){return e.each(this,t),this},toArray:function(){return e.toArray(this)},indexOf:function(e){for(var t=this,n=t.length;n--&&t[n]!==e;);return n},reverse:function(){return new r(e.toArray(this).reverse())},hasClass:function(e){return this[0]?this[0].hasClass(e):!1},prop:function(e,t){var n=this,r,i;return t!==r?(n.each(function(n){n[e]&&n[e](t)}),n):(i=n[0],i&&i[e]?i[e]():void 0)},exec:function(t){var n=this,r=e.toArray(arguments).slice(1);return n.each(function(e){e[t]&&e[t].apply(e,r)}),n},remove:function(){for(var e=this.length;e--;)this[e].remove();return this}},e.each("fire on off show hide addClass removeClass append prepend before after reflow".split(" "),function(t){i[t]=function(){var n=e.toArray(arguments);return this.each(function(e){t in e&&e[t].apply(e,n)}),this}}),e.each("text name disabled active selected checked visible parent value data".split(" "),function(e){i[e]=function(t){return this.prop(e,t)}}),r=n.extend(i),t.Collection=r,r}),r(Y,[u,y],function(e,t){var n=0;return{id:function(){return"mceu_"+n++},createFragment:function(e){return t.DOM.createFragment(e)},getWindowSize:function(){return t.DOM.getViewPort()},getSize:function(e){var t,n;if(e.getBoundingClientRect){var r=e.getBoundingClientRect();t=Math.max(r.width||r.right-r.left,e.offsetWidth),n=Math.max(r.height||r.bottom-r.bottom,e.offsetHeight)}else t=e.offsetWidth,n=e.offsetHeight;return{width:t,height:n}},getPos:function(e,n){return t.DOM.getPos(e,n)},getViewPort:function(e){return t.DOM.getViewPort(e)},get:function(e){return document.getElementById(e)},addClass:function(e,n){return t.DOM.addClass(e,n)},removeClass:function(e,n){return t.DOM.removeClass(e,n)},hasClass:function(e,n){return t.DOM.hasClass(e,n)},toggleClass:function(e,n,r){return t.DOM.toggleClass(e,n,r)},css:function(e,n,r){return t.DOM.setStyle(e,n,r)},on:function(e,n,r,i){return t.DOM.bind(e,n,r,i)},off:function(e,n,r){return t.DOM.unbind(e,n,r)},fire:function(e,n,r){return t.DOM.fire(e,n,r)},innerHtml:function(e,n){t.DOM.setHTML(e,n)}}}),r(K,[U,u,$,j,Y],function(e,t,n,r,i){function o(e){return e._eventDispatcher||(e._eventDispatcher=new n({scope:e,toggleEvent:function(t,r){r&&n.isNative(t)&&(e._nativeEvents||(e._nativeEvents={}),e._nativeEvents[t]=!0,e._rendered&&e.bindPendingEvents())}})),e._eventDispatcher}var a="onmousewheel"in document,s=!1,l="mce-",c=e.extend({Statics:{classPrefix:l},isRtl:function(){return c.rtl},classPrefix:l,init:function(e){var n=this,r,o;if(n.settings=e=t.extend({},n.Defaults,e),n._id=e.id||i.id(),n._text=n._name="",n._width=n._height=0,n._aria={role:e.role},this._elmCache={},r=e.classes)for(r=r.split(" "),r.map={},o=r.length;o--;)r.map[r[o]]=!0;n._classes=r||[],n.visible(!0),t.each("title text width height name classes visible disabled active value".split(" "),function(t){var r=e[t],i;r!==i?n[t](r):n["_"+t]===i&&(n["_"+t]=!1)}),n.on("click",function(){return n.disabled()?!1:void 0}),e.classes&&t.each(e.classes.split(" "),function(e){n.addClass(e)}),n.settings=e,n._borderBox=n.parseBox(e.border),n._paddingBox=n.parseBox(e.padding),n._marginBox=n.parseBox(e.margin),e.hidden&&n.hide()},Properties:"parent,title,text,width,height,disabled,active,name,value",Methods:"renderHtml",getContainerElm:function(){return document.body},getParentCtrl:function(e){for(var t,n=this.getRoot().controlIdLookup;e&&n&&!(t=n[e.id]);)e=e.parentNode;return t},parseBox:function(e){var t,n=10;if(e)return"number"==typeof e?(e=e||0,{top:e,left:e,bottom:e,right:e}):(e=e.split(" "),t=e.length,1===t?e[1]=e[2]=e[3]=e[0]:2===t?(e[2]=e[0],e[3]=e[1]):3===t&&(e[3]=e[1]),{top:parseInt(e[0],n)||0,right:parseInt(e[1],n)||0,bottom:parseInt(e[2],n)||0,left:parseInt(e[3],n)||0})},borderBox:function(){return this._borderBox},paddingBox:function(){return this._paddingBox},marginBox:function(){return this._marginBox},measureBox:function(e,t){function n(t){var n=document.defaultView;return n?(t=t.replace(/[A-Z]/g,function(e){return"-"+e}),n.getComputedStyle(e,null).getPropertyValue(t)):e.currentStyle[t]}function r(e){var t=parseFloat(n(e),10);return isNaN(t)?0:t}return{top:r(t+"TopWidth"),right:r(t+"RightWidth"),bottom:r(t+"BottomWidth"),left:r(t+"LeftWidth")}},initLayoutRect:function(){var e=this,t=e.settings,n,r,o=e.getEl(),a,s,l,c,u,d,f,p;n=e._borderBox=e._borderBox||e.measureBox(o,"border"),e._paddingBox=e._paddingBox||e.measureBox(o,"padding"),e._marginBox=e._marginBox||e.measureBox(o,"margin"),p=i.getSize(o),d=t.minWidth,f=t.minHeight,l=d||p.width,c=f||p.height,a=t.width,s=t.height,u=t.autoResize,u="undefined"!=typeof u?u:!a&&!s,a=a||l,s=s||c;var h=n.left+n.right,m=n.top+n.bottom,g=t.maxWidth||65535,v=t.maxHeight||65535;return e._layoutRect=r={x:t.x||0,y:t.y||0,w:a,h:s,deltaW:h,deltaH:m,contentW:a-h,contentH:s-m,innerW:a-h,innerH:s-m,startMinWidth:d||0,startMinHeight:f||0,minW:Math.min(l,g),minH:Math.min(c,v),maxW:g,maxH:v,autoResize:u,scrollW:0},e._lastLayoutRect={},r},layoutRect:function(e){var t=this,n=t._layoutRect,r,i,o,a,s,l;return n||(n=t.initLayoutRect()),e?(o=n.deltaW,a=n.deltaH,e.x!==s&&(n.x=e.x),e.y!==s&&(n.y=e.y),e.minW!==s&&(n.minW=e.minW),e.minH!==s&&(n.minH=e.minH),i=e.w,i!==s&&(i=i<n.minW?n.minW:i,i=i>n.maxW?n.maxW:i,n.w=i,n.innerW=i-o),i=e.h,i!==s&&(i=i<n.minH?n.minH:i,i=i>n.maxH?n.maxH:i,n.h=i,n.innerH=i-a),i=e.innerW,i!==s&&(i=i<n.minW-o?n.minW-o:i,i=i>n.maxW-o?n.maxW-o:i,n.innerW=i,n.w=i+o),i=e.innerH,i!==s&&(i=i<n.minH-a?n.minH-a:i,i=i>n.maxH-a?n.maxH-a:i,n.innerH=i,n.h=i+a),e.contentW!==s&&(n.contentW=e.contentW),e.contentH!==s&&(n.contentH=e.contentH),r=t._lastLayoutRect,(r.x!==n.x||r.y!==n.y||r.w!==n.w||r.h!==n.h)&&(l=c.repaintControls,l&&l.map&&!l.map[t._id]&&(l.push(t),l.map[t._id]=!0),r.x=n.x,r.y=n.y,r.w=n.w,r.h=n.h),t):n},repaint:function(){var e=this,t,n,r,i,o=0,a=0,s,l;l=document.createRange?function(e){return e}:Math.round,t=e.getEl().style,r=e._layoutRect,s=e._lastRepaintRect||{},i=e._borderBox,o=i.left+i.right,a=i.top+i.bottom,r.x!==s.x&&(t.left=l(r.x)+"px",s.x=r.x),r.y!==s.y&&(t.top=l(r.y)+"px",s.y=r.y),r.w!==s.w&&(t.width=l(r.w-o)+"px",s.w=r.w),r.h!==s.h&&(t.height=l(r.h-a)+"px",s.h=r.h),e._hasBody&&r.innerW!==s.innerW&&(n=e.getEl("body").style,n.width=l(r.innerW)+"px",s.innerW=r.innerW),e._hasBody&&r.innerH!==s.innerH&&(n=n||e.getEl("body").style,n.height=l(r.innerH)+"px",s.innerH=r.innerH),e._lastRepaintRect=s,e.fire("repaint",{},!1)},on:function(e,t){function n(e){var t,n;return"string"!=typeof e?e:function(i){return t||r.parentsAndSelf().each(function(r){var i=r.settings.callbacks;return i&&(t=i[e])?(n=r,!1):void 0}),t.call(n,i)}}var r=this;return o(r).on(e,n(t)),r},off:function(e,t){return o(this).off(e,t),this},fire:function(e,t,n){var r=this;if(t=t||{},t.control||(t.control=r),t=o(r).fire(e,t),n!==!1&&r.parent)for(var i=r.parent();i&&!t.isPropagationStopped();)i.fire(e,t,!1),i=i.parent();return t},hasEventListeners:function(e){return o(this).has(e)},parents:function(e){var t=this,n,i=new r;for(n=t.parent();n;n=n.parent())i.add(n);return e&&(i=i.filter(e)),i},parentsAndSelf:function(e){return new r(this).add(this.parents(e))},next:function(){var e=this.parent().items();return e[e.indexOf(this)+1]},prev:function(){var e=this.parent().items();return e[e.indexOf(this)-1]},findCommonAncestor:function(e,t){for(var n;e;){for(n=t;n&&e!=n;)n=n.parent();if(e==n)break;e=e.parent()}return e},hasClass:function(e,t){var n=this._classes[t||"control"];return e=this.classPrefix+e,n&&!!n.map[e]},addClass:function(e,t){var n=this,r,i;return e=this.classPrefix+e,r=n._classes[t||"control"],r||(r=[],r.map={},n._classes[t||"control"]=r),r.map[e]||(r.map[e]=e,r.push(e),n._rendered&&(i=n.getEl(t),i&&(i.className=r.join(" ")))),n},removeClass:function(e,t){var n=this,r,i,o;if(e=this.classPrefix+e,r=n._classes[t||"control"],r&&r.map[e])for(delete r.map[e],i=r.length;i--;)r[i]===e&&r.splice(i,1);return n._rendered&&(o=n.getEl(t),o&&(o.className=r.join(" "))),n},toggleClass:function(e,t,n){var r=this;return t?r.addClass(e,n):r.removeClass(e,n),r},classes:function(e){var t=this._classes[e||"control"];return t?t.join(" "):""},innerHtml:function(e){return i.innerHtml(this.getEl(),e),this},getEl:function(e){var t=e?this._id+"-"+e:this._id;return this._elmCache[t]||(this._elmCache[t]=i.get(t)),this._elmCache[t]},visible:function(e){var t=this,n;return"undefined"!=typeof e?(t._visible!==e&&(t._rendered&&(t.getEl().style.display=e?"":"none"),t._visible=e,n=t.parent(),n&&(n._lastRect=null),t.fire(e?"show":"hide")),t):t._visible},show:function(){return this.visible(!0)},hide:function(){return this.visible(!1)},focus:function(){try{this.getEl().focus()}catch(e){}return this},blur:function(){return this.getEl().blur(),this},aria:function(e,t){var n=this,r=n.getEl(n.ariaTarget);return"undefined"==typeof t?n._aria[e]:(n._aria[e]=t,n._rendered&&r.setAttribute("role"==e?e:"aria-"+e,t),n)},encode:function(e,t){return t!==!1&&(e=this.translate(e)),(e||"").replace(/[&<>"]/g,function(e){return"&#"+e.charCodeAt(0)+";"})},translate:function(e){return c.translate?c.translate(e):e},before:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t),!0),t},after:function(e){var t=this,n=t.parent();return n&&n.insert(e,n.items().indexOf(t)),t},remove:function(){var e=this,t=e.getEl(),n=e.parent(),r,o;if(e.items){var a=e.items().toArray();for(o=a.length;o--;)a[o].remove()}n&&n.items&&(r=[],n.items().each(function(t){t!==e&&r.push(t)}),n.items().set(r),n._lastRect=null),e._eventsRoot&&e._eventsRoot==e&&i.off(t);var s=e.getRoot().controlIdLookup;return s&&delete s[e._id],t&&t.parentNode&&t.parentNode.removeChild(t),e._rendered=!1,e},renderBefore:function(e){var t=this;return e.parentNode.insertBefore(i.createFragment(t.renderHtml()),e),t.postRender(),t},renderTo:function(e){var t=this;return e=e||t.getContainerElm(),e.appendChild(i.createFragment(t.renderHtml())),t.postRender(),t},postRender:function(){var e=this,t=e.settings,n,r,o,a,s;for(a in t)0===a.indexOf("on")&&e.on(a.substr(2),t[a]);if(e._eventsRoot){for(o=e.parent();!s&&o;o=o.parent())s=o._eventsRoot;if(s)for(a in s._nativeEvents)e._nativeEvents[a]=!0}e.bindPendingEvents(),t.style&&(n=e.getEl(),n&&(n.setAttribute("style",t.style),n.style.cssText=t.style)),e._visible||i.css(e.getEl(),"display","none"),e.settings.border&&(r=e.borderBox(),i.css(e.getEl(),{"border-top-width":r.top,"border-right-width":r.right,"border-bottom-width":r.bottom,"border-left-width":r.left}));var l=e.getRoot();l.controlIdLookup||(l.controlIdLookup={}),l.controlIdLookup[e._id]=e;for(var c in e._aria)e.aria(c,e._aria[c]);e.fire("postrender",{},!1)},scrollIntoView:function(e){function t(e,t){var n,r,i=e;for(n=r=0;i&&i!=t&&i.nodeType;)n+=i.offsetLeft||0,r+=i.offsetTop||0,i=i.offsetParent;return{x:n,y:r}}var n=this.getEl(),r=n.parentNode,i,o,a,s,l,c,u=t(n,r);return i=u.x,o=u.y,a=n.offsetWidth,s=n.offsetHeight,l=r.clientWidth,c=r.clientHeight,"end"==e?(i-=l-a,o-=c-s):"center"==e&&(i-=l/2-a/2,o-=c/2-s/2),r.scrollLeft=i,r.scrollTop=o,this},bindPendingEvents:function(){function e(e){var t=o.getParentCtrl(e.target);t&&t.fire(e.type,e)}function t(){var e=d._lastHoverCtrl;e&&(e.fire("mouseleave",{target:e.getEl()}),e.parents().each(function(e){e.fire("mouseleave",{target:e.getEl()})}),d._lastHoverCtrl=null)}function n(e){var t=o.getParentCtrl(e.target),n=d._lastHoverCtrl,r=0,i,a,s;if(t!==n){if(d._lastHoverCtrl=t,a=t.parents().toArray().reverse(),a.push(t),n){for(s=n.parents().toArray().reverse(),s.push(n),r=0;r<s.length&&a[r]===s[r];r++);for(i=s.length-1;i>=r;i--)n=s[i],n.fire("mouseleave",{target:n.getEl()})}for(i=r;i<a.length;i++)t=a[i],t.fire("mouseenter",{target:t.getEl()})}}function r(e){e.preventDefault(),"mousewheel"==e.type?(e.deltaY=-1/40*e.wheelDelta,e.wheelDeltaX&&(e.deltaX=-1/40*e.wheelDeltaX)):(e.deltaX=0,e.deltaY=e.detail),e=o.fire("wheel",e)}var o=this,l,c,u,d,f,p;if(o._rendered=!0,f=o._nativeEvents){for(u=o.parents().toArray(),u.unshift(o),l=0,c=u.length;!d&&c>l;l++)d=u[l]._eventsRoot;for(d||(d=u[u.length-1]||o),o._eventsRoot=d,c=l,l=0;c>l;l++)u[l]._eventsRoot=d;var h=d._delegates;h||(h=d._delegates={});for(p in f){if(!f)return!1;"wheel"!==p||s?("mouseenter"===p||"mouseleave"===p?d._hasMouseEnter||(i.on(d.getEl(),"mouseleave",t),i.on(d.getEl(),"mouseover",n),d._hasMouseEnter=1):h[p]||(i.on(d.getEl(),p,e),h[p]=!0),f[p]=!1):a?i.on(o.getEl(),"mousewheel",r):i.on(o.getEl(),"DOMMouseScroll",r)}}},getRoot:function(){for(var e=this,t,n=[];e;){if(e.rootControl){t=e.rootControl;break}n.push(e),t=e,e=e.parent()}t||(t=this);for(var r=n.length;r--;)n[r].rootControl=t;return t},reflow:function(){return this.repaint(),this}});return c}),r(G,[],function(){var e={},t;return{add:function(t,n){e[t.toLowerCase()]=n},has:function(t){return!!e[t.toLowerCase()]},create:function(n,r){var i,o,a;if(!t){a=tinymce.ui;for(o in a)e[o.toLowerCase()]=a[o];t=!0}if("string"==typeof n?(r=r||{},r.type=n):(r=n,n=r.type),n=n.toLowerCase(),i=e[n],!i)throw new Error("Could not find control by type: "+n);return i=new i(r),i.type=n,i}}}),r(X,[],function(){return function(e){function t(e){return e=e||b,e&&e.getAttribute("role")}function n(e){for(var n,r=e||b;r=r.parentNode;)if(n=t(r))return n}function r(e){var t=b;return t?t.getAttribute("aria-"+e):void 0}function i(e){var t=e.tagName.toUpperCase();return"INPUT"==t||"TEXTAREA"==t}function o(e){return i(e)&&!e.hidden?!0:/^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell)$/.test(t(e))?!0:!1}function a(e){function t(e){if(1==e.nodeType&&"none"!=e.style.display){o(e)&&n.push(e);for(var r=0;r<e.childNodes.length;r++)t(e.childNodes[r])}}var n=[];return t(e||y.getEl()),n}function s(e){var t,n;e=e||C,n=e.parents().toArray(),n.unshift(e);for(var r=0;r<n.length&&(t=n[r],!t.settings.ariaRoot);r++);return t}function l(e){var t=s(e),n=a(t.getEl());t.settings.ariaRemember&&"lastAriaIndex"in t?c(t.lastAriaIndex,n):c(0,n)}function c(e,t){return 0>e?e=t.length-1:e>=t.length&&(e=0),t[e]&&t[e].focus(),e}function u(e,t){var n=-1,r=s();t=t||a(r.getEl());for(var i=0;i<t.length;i++)t[i]===b&&(n=i);n+=e,r.lastAriaIndex=c(n,t)}function d(){var e=n();"tablist"==e?u(-1,a(b.parentNode)):C.parent().submenu?g():u(-1)}function f(){var e=t(),i=n();"tablist"==i?u(1,a(b.parentNode)):"menuitem"==e&&"menu"==i&&r("haspopup")?v():u(1)}function p(){u(-1)}function h(){var e=t(),i=n();"menuitem"==e&&"menubar"==i?v():"button"==e&&r("haspopup")?v({key:"down"}):u(1)}function m(e){var t=n();if("tablist"==t){var r=a(C.getEl("body"))[0];r&&r.focus()}else u(e.shiftKey?-1:1)}function g(){C.fire("cancel")}function v(e){e=e||{},C.fire("click",{target:b,aria:e})}var y=e.root,b,C;try{b=document.activeElement}catch(x){b=document.body}return C=y.getParentCtrl(b),y.on("keydown",function(e){function t(e,t){i(b)||t(e)!==!1&&e.preventDefault()}if(!e.isDefaultPrevented())switch(e.keyCode){case 37:t(e,d);break;case 39:t(e,f);break;case 38:t(e,p);break;case 40:t(e,h);break;case 27:g();break;case 14:case 13:case 32:t(e,v);break;case 9:m(e)!==!1&&e.preventDefault()}}),y.on("focusin",function(e){b=e.target,C=e.control}),{focusFirst:l}}}),r(J,[K,j,q,G,X,u,Y],function(e,t,n,r,i,o,a){var s={};return e.extend({layout:"",innerClass:"container-inner",init:function(e){var n=this;n._super(e),e=n.settings,n._fixed=e.fixed,n._items=new t,n.isRtl()&&n.addClass("rtl"),n.addClass("container"),n.addClass("container-body","body"),e.containerCls&&n.addClass(e.containerCls),n._layout=r.create((e.layout||n.layout)+"layout"),n.settings.items&&n.add(n.settings.items),n._hasBody=!0},items:function(){return this._items},find:function(e){return e=s[e]=s[e]||new n(e),e.find(this)},add:function(e){var t=this;return t.items().add(t.create(e)).parent(t),t},focus:function(e){var t=this,n,r,i;return e&&(r=t.keyboardNav||t.parents().eq(-1)[0].keyboardNav)?void r.focusFirst(t):(i=t.find("*"),t.statusbar&&i.add(t.statusbar.items()),i.each(function(e){return e.settings.autofocus?(n=null,!1):void(e.canFocus&&(n=n||e))}),n&&n.focus(),t)},replace:function(e,t){for(var n,r=this.items(),i=r.length;i--;)if(r[i]===e){r[i]=t;break}i>=0&&(n=t.getEl(),n&&n.parentNode.removeChild(n),n=e.getEl(),n&&n.parentNode.removeChild(n)),t.parent(this)},create:function(t){var n=this,i,a=[];return o.isArray(t)||(t=[t]),o.each(t,function(t){t&&(t instanceof e||("string"==typeof t&&(t={type:t}),i=o.extend({},n.settings.defaults,t),t.type=i.type=i.type||t.type||n.settings.defaultType||(i.defaults?i.defaults.type:null),t=r.create(i)),a.push(t))}),a},renderNew:function(){var e=this;return e.items().each(function(t,n){var r,i;t.parent(e),t._rendered||(r=e.getEl("body"),i=a.createFragment(t.renderHtml()),r.hasChildNodes()&&n<=r.childNodes.length-1?r.insertBefore(i,r.childNodes[n]):r.appendChild(i),t.postRender())}),e._layout.applyClasses(e),e._lastRect=null,e},append:function(e){return this.add(e).renderNew()},prepend:function(e){var t=this;return t.items().set(t.create(e).concat(t.items().toArray())),t.renderNew()},insert:function(e,t,n){var r=this,i,o,a;return e=r.create(e),i=r.items(),!n&&t<i.length-1&&(t+=1),t>=0&&t<i.length&&(o=i.slice(0,t).toArray(),a=i.slice(t).toArray(),i.set(o.concat(e,a))),r.renderNew()},fromJSON:function(e){var t=this;for(var n in e)t.find("#"+n).value(e[n]);return t},toJSON:function(){var e=this,t={};return e.find("*").each(function(e){var n=e.name(),r=e.value();n&&"undefined"!=typeof r&&(t[n]=r)}),t},preRender:function(){},renderHtml:function(){var e=this,t=e._layout,n=this.settings.role;return e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'"'+(n?' role="'+this.settings.role+'"':"")+'><div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this,t;return e.items().exec("postRender"),e._super(),e._layout.postRender(e),e._rendered=!0,e.settings.style&&a.css(e.getEl(),e.settings.style),e.settings.border&&(t=e.borderBox(),a.css(e.getEl(),{"border-top-width":t.top,"border-right-width":t.right,"border-bottom-width":t.bottom,"border-left-width":t.left})),e.parent()||(e.keyboardNav=new i({root:e})),e},initLayoutRect:function(){var e=this,t=e._super();return e._layout.recalc(e),t},recalc:function(){var e=this,t=e._layoutRect,n=e._lastRect;return n&&n.w==t.w&&n.h==t.h?void 0:(e._layout.recalc(e),t=e.layoutRect(),e._lastRect={x:t.x,y:t.y,w:t.w,h:t.h},!0)},reflow:function(){var t;if(this.visible()){for(e.repaintControls=[],e.repaintControls.map={},this.recalc(),t=e.repaintControls.length;t--;)e.repaintControls[t].repaint();
"flow"!==this.settings.layout&&"stack"!==this.settings.layout&&this.repaint(),e.repaintControls=[]}return this}})}),r(Q,[Y],function(e){function t(){var e=document,t,n,r,i,o,a,s,l,c=Math.max;return t=e.documentElement,n=e.body,r=c(t.scrollWidth,n.scrollWidth),i=c(t.clientWidth,n.clientWidth),o=c(t.offsetWidth,n.offsetWidth),a=c(t.scrollHeight,n.scrollHeight),s=c(t.clientHeight,n.clientHeight),l=c(t.offsetHeight,n.offsetHeight),{width:o>r?i:r,height:l>a?s:a}}return function(n,r){function i(){return a.getElementById(r.handle||n)}var o,a=document,s,l,c,u,d,f;r=r||{},l=function(n){var l=t(),p,h;n.preventDefault(),s=n.button,p=i(),d=n.screenX,f=n.screenY,h=window.getComputedStyle?window.getComputedStyle(p,null).getPropertyValue("cursor"):p.runtimeStyle.cursor,o=a.createElement("div"),e.css(o,{position:"absolute",top:0,left:0,width:l.width,height:l.height,zIndex:2147483647,opacity:1e-4,cursor:h}),a.body.appendChild(o),e.on(a,"mousemove",u),e.on(a,"mouseup",c),r.start(n)},u=function(e){return e.button!==s?c(e):(e.deltaX=e.screenX-d,e.deltaY=e.screenY-f,e.preventDefault(),void r.drag(e))},c=function(t){e.off(a,"mousemove",u),e.off(a,"mouseup",c),o.parentNode.removeChild(o),r.stop&&r.stop(t)},this.destroy=function(){e.off(i())},e.on(i(),"mousedown",l)}}),r(Z,[Y,Q],function(e,t){return{init:function(){var e=this;e.on("repaint",e.renderScroll)},renderScroll:function(){function n(){function t(t,a,s,l,c,u){var d,f,p,h,m,g,v,y,b;if(f=i.getEl("scroll"+t)){if(y=a.toLowerCase(),b=s.toLowerCase(),i.getEl("absend")&&e.css(i.getEl("absend"),y,i.layoutRect()[l]-1),!c)return void e.css(f,"display","none");e.css(f,"display","block"),d=i.getEl("body"),p=i.getEl("scroll"+t+"t"),h=d["client"+s]-2*o,h-=n&&r?f["client"+u]:0,m=d["scroll"+s],g=h/m,v={},v[y]=d["offset"+a]+o,v[b]=h,e.css(f,v),v={},v[y]=d["scroll"+a]*g,v[b]=h*g,e.css(p,v)}}var n,r,a;a=i.getEl("body"),n=a.scrollWidth>a.clientWidth,r=a.scrollHeight>a.clientHeight,t("h","Left","Width","contentW",n,"Height"),t("v","Top","Height","contentH",r,"Width")}function r(){function n(n,r,a,s,l){var c,u=i._id+"-scroll"+n,d=i.classPrefix;i.getEl().appendChild(e.createFragment('<div id="'+u+'" class="'+d+"scrollbar "+d+"scrollbar-"+n+'"><div id="'+u+'t" class="'+d+'scrollbar-thumb"></div></div>')),i.draghelper=new t(u+"t",{start:function(){c=i.getEl("body")["scroll"+r],e.addClass(e.get(u),d+"active")},drag:function(e){var t,u,d,f,p=i.layoutRect();u=p.contentW>p.innerW,d=p.contentH>p.innerH,f=i.getEl("body")["client"+a]-2*o,f-=u&&d?i.getEl("scroll"+n)["client"+l]:0,t=f/i.getEl("body")["scroll"+a],i.getEl("body")["scroll"+r]=c+e["delta"+s]/t},stop:function(){e.removeClass(e.get(u),d+"active")}})}i.addClass("scroll"),n("v","Top","Height","Y","Width"),n("h","Left","Width","X","Height")}var i=this,o=2;i.settings.autoScroll&&(i._hasScroll||(i._hasScroll=!0,r(),i.on("wheel",function(e){var t=i.getEl("body");t.scrollLeft+=10*(e.deltaX||0),t.scrollTop+=10*e.deltaY,n()}),e.on(i.getEl("body"),"scroll",n)),n())}}}),r(et,[J,Z],function(e,t){return e.extend({Defaults:{layout:"fit",containerCls:"panel"},Mixins:[t],renderHtml:function(){var e=this,t=e._layout,n=e.settings.html;return e.preRender(),t.preRender(e),"undefined"==typeof n?n='<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div>":("function"==typeof n&&(n=n.call(e)),e._hasBody=!1),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1" role="group">'+(e._preBodyHtml||"")+n+"</div>"}})}),r(tt,[Y],function(e){function t(t,n,r){var i,o,a,s,l,c,u,d,f,p;return f=e.getViewPort(),o=e.getPos(n),a=o.x,s=o.y,t._fixed&&(a-=f.x,s-=f.y),i=t.getEl(),p=e.getSize(i),l=p.width,c=p.height,p=e.getSize(n),u=p.width,d=p.height,r=(r||"").split(""),"b"===r[0]&&(s+=d),"r"===r[1]&&(a+=u),"c"===r[0]&&(s+=Math.round(d/2)),"c"===r[1]&&(a+=Math.round(u/2)),"b"===r[3]&&(s-=c),"r"===r[4]&&(a-=l),"c"===r[3]&&(s-=Math.round(c/2)),"c"===r[4]&&(a-=Math.round(l/2)),{x:a,y:s,w:l,h:c}}return{testMoveRel:function(n,r){for(var i=e.getViewPort(),o=0;o<r.length;o++){var a=t(this,n,r[o]);if(this._fixed){if(a.x>0&&a.x+a.w<i.w&&a.y>0&&a.y+a.h<i.h)return r[o]}else if(a.x>i.x&&a.x+a.w<i.w+i.x&&a.y>i.y&&a.y+a.h<i.h+i.y)return r[o]}return r[0]},moveRel:function(e,n){"string"!=typeof n&&(n=this.testMoveRel(e,n));var r=t(this,e,n);return this.moveTo(r.x,r.y)},moveBy:function(e,t){var n=this,r=n.layoutRect();return n.moveTo(r.x+e,r.y+t),n},moveTo:function(t,n){function r(e,t,n){return 0>e?0:e+n>t?(e=t-n,0>e?0:e):e}var i=this;if(i.settings.constrainToViewport){var o=e.getViewPort(window),a=i.layoutRect();t=r(t,o.w+o.x,a.w),n=r(n,o.h+o.y,a.h)}return i._rendered?i.layoutRect({x:t,y:n}).repaint():(i.settings.x=t,i.settings.y=n),i.fire("move",{x:t,y:n}),i}}}),r(nt,[Y],function(e){return{resizeToContent:function(){this._layoutRect.autoResize=!0,this._lastRect=null,this.reflow()},resizeTo:function(t,n){if(1>=t||1>=n){var r=e.getWindowSize();t=1>=t?t*r.w:t,n=1>=n?n*r.h:n}return this._layoutRect.autoResize=!1,this.layoutRect({minW:t,minH:n,w:t,h:n}).reflow()},resizeBy:function(e,t){var n=this,r=n.layoutRect();return n.resizeTo(r.w+e,r.h+t)}}}),r(rt,[et,tt,nt,Y],function(e,t,n,r){function i(){function e(e,t){for(;e;){if(e==t)return!0;e=e.parent()}}c||(c=function(t){if(2!=t.button)for(var n=f.length;n--;){var r=f[n],i=r.getParentCtrl(t.target);if(r.settings.autohide){if(i&&(e(i,r)||r.parent()===i))continue;t=r.fire("autohide",{target:t.target}),t.isDefaultPrevented()||r.hide()}}},r.on(document,"click",c))}function o(){u||(u=function(){var e;for(e=f.length;e--;)s(f[e])},r.on(window,"scroll",u))}function a(){if(!d){var e=document.documentElement,t=e.clientWidth,n=e.clientHeight;d=function(){document.all&&t==e.clientWidth&&n==e.clientHeight||(t=e.clientWidth,n=e.clientHeight,m.hideAll())},r.on(window,"resize",d)}}function s(e){function t(t,n){for(var r,i=0;i<f.length;i++)if(f[i]!=e)for(r=f[i].parent();r&&(r=r.parent());)r==e&&f[i].fixed(t).moveBy(0,n).repaint()}var n=r.getViewPort().y;e.settings.autofix&&(e._fixed?e._autoFixY>n&&(e.fixed(!1).layoutRect({y:e._autoFixY}).repaint(),t(!1,e._autoFixY-n)):(e._autoFixY=e.layoutRect().y,e._autoFixY<n&&(e.fixed(!0).layoutRect({y:0}).repaint(),t(!0,n-e._autoFixY))))}function l(e){var t;for(t=f.length;t--;)f[t]===e&&f.splice(t,1);for(t=p.length;t--;)p[t]===e&&p.splice(t,1)}var c,u,d,f=[],p=[],h,m=e.extend({Mixins:[t,n],init:function(e){function t(){var e,t=m.zIndex||65535,i;if(p.length)for(e=0;e<p.length;e++)p[e].modal&&(t++,i=p[e]),p[e].getEl().style.zIndex=t,p[e].zIndex=t,t++;var o=document.getElementById(n.classPrefix+"modal-block");i?r.css(o,"z-index",i.zIndex-1):o&&(o.parentNode.removeChild(o),h=!1),m.currentZIndex=t}var n=this;n._super(e),n._eventsRoot=n,n.addClass("floatpanel"),e.autohide&&(i(),a(),f.push(n)),e.autofix&&(o(),n.on("move",function(){s(this)})),n.on("postrender show",function(e){if(e.control==n){var i,o=n.classPrefix;n.modal&&!h&&(i=r.createFragment('<div id="'+o+'modal-block" class="'+o+"reset "+o+'fade"></div>'),i=i.firstChild,n.getContainerElm().appendChild(i),setTimeout(function(){r.addClass(i,o+"in"),r.addClass(n.getEl(),o+"in")},0),h=!0),p.push(n),t()}}),n.on("close hide",function(e){if(e.control==n){for(var r=p.length;r--;)p[r]===n&&p.splice(r,1);t()}}),n.on("show",function(){n.parents().each(function(e){return e._fixed?(n.fixed(!0),!1):void 0})}),e.popover&&(n._preBodyHtml='<div class="'+n.classPrefix+'arrow"></div>',n.addClass("popover").addClass("bottom").addClass(n.isRtl()?"end":"start"))},fixed:function(e){var t=this;if(t._fixed!=e){if(t._rendered){var n=r.getViewPort();e?t.layoutRect().y-=n.y:t.layoutRect().y+=n.y}t.toggleClass("fixed",e),t._fixed=e}return t},show:function(){var e=this,t,n=e._super();for(t=f.length;t--&&f[t]!==e;);return-1===t&&f.push(e),n},hide:function(){return l(this),this._super()},hideAll:function(){m.hideAll()},close:function(){var e=this;return e.fire("close"),e.remove()},remove:function(){l(this),this._super()},postRender:function(){var e=this;return e.settings.bodyRole&&this.getEl("body").setAttribute("role",e.settings.bodyRole),e._super()}});return m.hideAll=function(){for(var e=f.length;e--;){var t=f[e];t&&t.settings.autohide&&(t.hide(),f.splice(e,1))}},m}),r(it,[rt,et,Y,Q],function(e,t,n,r){var i=e.extend({modal:!0,Defaults:{border:1,layout:"flex",containerCls:"panel",role:"dialog",callbacks:{submit:function(){this.fire("submit",{data:this.toJSON()})},close:function(){this.close()}}},init:function(e){var n=this;n._super(e),n.isRtl()&&n.addClass("rtl"),n.addClass("window"),n._fixed=!0,e.buttons&&(n.statusbar=new t({layout:"flex",border:"1 0 0 0",spacing:3,padding:10,align:"center",pack:n.isRtl()?"start":"end",defaults:{type:"button"},items:e.buttons}),n.statusbar.addClass("foot"),n.statusbar.parent(n)),n.on("click",function(e){-1!=e.target.className.indexOf(n.classPrefix+"close")&&n.close()}),n.on("cancel",function(){n.close()}),n.aria("describedby",n.describedBy||n._id+"-none"),n.aria("label",e.title),n._fullscreen=!1},recalc:function(){var e=this,t=e.statusbar,r,i,o,a;e._fullscreen&&(e.layoutRect(n.getWindowSize()),e.layoutRect().contentH=e.layoutRect().innerH),e._super(),r=e.layoutRect(),e.settings.title&&!e._fullscreen&&(i=r.headerW,i>r.w&&(o=r.x-Math.max(0,i/2),e.layoutRect({w:i,x:o}),a=!0)),t&&(t.layoutRect({w:e.layoutRect().innerW}).recalc(),i=t.layoutRect().minW+r.deltaW,i>r.w&&(o=r.x-Math.max(0,i-r.w),e.layoutRect({w:i,x:o}),a=!0)),a&&e.recalc()},initLayoutRect:function(){var e=this,t=e._super(),r=0,i;if(e.settings.title&&!e._fullscreen){i=e.getEl("head");var o=n.getSize(i);t.headerW=o.width,t.headerH=o.height,r+=t.headerH}e.statusbar&&(r+=e.statusbar.layoutRect().h),t.deltaH+=r,t.minH+=r,t.h+=r;var a=n.getWindowSize();return t.x=Math.max(0,a.w/2-t.w/2),t.y=Math.max(0,a.h/2-t.h/2),t},renderHtml:function(){var e=this,t=e._layout,n=e._id,r=e.classPrefix,i=e.settings,o="",a="",s=i.html;return e.preRender(),t.preRender(e),i.title&&(o='<div id="'+n+'-head" class="'+r+'window-head"><div id="'+n+'-title" class="'+r+'title">'+e.encode(i.title)+'</div><button type="button" class="'+r+'close" aria-hidden="true">\xd7</button><div id="'+n+'-dragh" class="'+r+'dragh"></div></div>'),i.url&&(s='<iframe src="'+i.url+'" tabindex="-1"></iframe>'),"undefined"==typeof s&&(s=t.renderHtml(e)),e.statusbar&&(a=e.statusbar.renderHtml()),'<div id="'+n+'" class="'+e.classes()+'" hidefocus="1"><div class="'+e.classPrefix+'reset" role="application">'+o+'<div id="'+n+'-body" class="'+e.classes("body")+'">'+s+"</div>"+a+"</div></div>"},fullscreen:function(e){var t=this,r=document.documentElement,i,o=t.classPrefix,a;if(e!=t._fullscreen)if(n.on(window,"resize",function(){var e;if(t._fullscreen)if(i)t._timer||(t._timer=setTimeout(function(){var e=n.getWindowSize();t.moveTo(0,0).resizeTo(e.w,e.h),t._timer=0},50));else{e=(new Date).getTime();var r=n.getWindowSize();t.moveTo(0,0).resizeTo(r.w,r.h),(new Date).getTime()-e>50&&(i=!0)}}),a=t.layoutRect(),t._fullscreen=e,e){t._initial={x:a.x,y:a.y,w:a.w,h:a.h},t._borderBox=t.parseBox("0"),t.getEl("head").style.display="none",a.deltaH-=a.headerH+2,n.addClass(r,o+"fullscreen"),n.addClass(document.body,o+"fullscreen"),t.addClass("fullscreen");var s=n.getWindowSize();t.moveTo(0,0).resizeTo(s.w,s.h)}else t._borderBox=t.parseBox(t.settings.border),t.getEl("head").style.display="",a.deltaH+=a.headerH,n.removeClass(r,o+"fullscreen"),n.removeClass(document.body,o+"fullscreen"),t.removeClass("fullscreen"),t.moveTo(t._initial.x,t._initial.y).resizeTo(t._initial.w,t._initial.h);return t.reflow()},postRender:function(){var e=this,t;setTimeout(function(){e.addClass("in")},0),e._super(),e.statusbar&&e.statusbar.postRender(),e.focus(),this.dragHelper=new r(e._id+"-dragh",{start:function(){t={x:e.layoutRect().x,y:e.layoutRect().y}},drag:function(n){e.moveTo(t.x+n.deltaX,t.y+n.deltaY)}}),e.on("submit",function(t){t.isDefaultPrevented()||e.close()})},submit:function(){return this.fire("submit",{data:this.toJSON()})},remove:function(){var e=this,t=e.classPrefix;e.dragHelper.destroy(),e._super(),e.statusbar&&this.statusbar.remove(),e._fullscreen&&(n.removeClass(document.documentElement,t+"fullscreen"),n.removeClass(document.body,t+"fullscreen"))},getContentWindow:function(){var e=this.getEl().getElementsByTagName("iframe")[0];return e?e.contentWindow:null}});return i}),r(ot,[it],function(e){var t=e.extend({init:function(e){e={border:1,padding:20,layout:"flex",pack:"center",align:"center",containerCls:"panel",autoScroll:!0,buttons:{type:"button",text:"Ok",action:"ok"},items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200}},this._super(e)},Statics:{OK:1,OK_CANCEL:2,YES_NO:3,YES_NO_CANCEL:4,msgBox:function(n){function r(e,t,n){return{type:"button",text:e,subtype:n?"primary":"",onClick:function(e){e.control.parents()[1].close(),o(t)}}}var i,o=n.callback||function(){};switch(n.buttons){case t.OK_CANCEL:i=[r("Ok",!0,!0),r("Cancel",!1)];break;case t.YES_NO:case t.YES_NO_CANCEL:i=[r("Yes",1,!0),r("No",0)],n.buttons==t.YES_NO_CANCEL&&i.push(r("Cancel",-1));break;default:i=[r("Ok",!0,!0)]}return new e({padding:20,x:n.x,y:n.y,minWidth:300,minHeight:100,layout:"flex",pack:"center",align:"center",buttons:i,title:n.title,role:"alertdialog",items:{type:"label",multiline:!0,maxWidth:500,maxHeight:200,text:n.text},onPostRender:function(){this.aria("describedby",this.items()[0]._id)},onClose:n.onClose,onCancel:function(){o(!1)}}).renderTo(document.body).reflow()},alert:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,t.msgBox(e)},confirm:function(e,n){return"string"==typeof e&&(e={text:e}),e.callback=n,e.buttons=t.OK_CANCEL,t.msgBox(e)}}});return t}),r(at,[it,ot],function(e,t){return function(n){function r(){return o.length?o[o.length-1]:void 0}var i=this,o=[];i.windows=o,n.on("remove",function(){for(var e=o.length;e--;)o[e].close()}),i.open=function(t,r){var i;return n.editorManager.activeEditor=n,t.title=t.title||" ",t.url=t.url||t.file,t.url&&(t.width=parseInt(t.width||320,10),t.height=parseInt(t.height||240,10)),t.body&&(t.items={defaults:t.defaults,type:t.bodyType||"form",items:t.body}),t.url||t.buttons||(t.buttons=[{text:"Ok",subtype:"primary",onclick:function(){i.find("form")[0].submit()}},{text:"Cancel",onclick:function(){i.close()}}]),i=new e(t),o.push(i),i.on("close",function(){for(var e=o.length;e--;)o[e]===i&&o.splice(e,1);n.focus()}),t.data&&i.on("postRender",function(){this.find("*").each(function(e){var n=e.name();n in t.data&&e.value(t.data[n])})}),i.features=t||{},i.params=r||{},n.nodeChanged(),i.renderTo().reflow()},i.alert=function(e,r,i){t.alert(e,function(){r?r.call(i||this):n.focus()})},i.confirm=function(e,n,r){t.confirm(e,function(e){n.call(r||this,e)})},i.close=function(){r()&&r().close()},i.getParams=function(){return r()?r().params:null},i.setParams=function(e){r()&&(r().params=e)},i.getWindows=function(){return o}}}),r(st,[B,x,_,g,d,u],function(e,t,n,r,i,o){return function(a){function s(e,t){try{a.getDoc().execCommand(e,!1,t)}catch(n){}}function l(){var e=a.getDoc().documentMode;return e?e:6}function c(e){return e.isDefaultPrevented()}function u(){function t(e){var t=new i(function(){});o.each(a.getBody().getElementsByTagName("*"),function(e){"SPAN"==e.tagName&&e.setAttribute("mce-data-marked",1),!e.hasAttribute("data-mce-style")&&e.hasAttribute("style")&&a.dom.setAttrib(e,"style",a.dom.getAttrib(e,"style"))}),t.observe(a.getDoc(),{childList:!0,attributes:!0,subtree:!0,attributeFilter:["style"]}),a.getDoc().execCommand(e?"ForwardDelete":"Delete",!1,null);var n=a.selection.getRng(),r=n.startContainer.parentNode;o.each(t.takeRecords(),function(e){if(q.isChildOf(e.target,a.getBody())){if("style"==e.attributeName){var t=e.target.getAttribute("data-mce-style");t?e.target.setAttribute("style",t):e.target.removeAttribute("style")}o.each(e.addedNodes,function(e){if("SPAN"==e.nodeName&&!e.getAttribute("mce-data-marked")){var t,i;e==r&&(t=n.startOffset,i=e.firstChild),q.remove(e,!0),i&&(n.setStart(i,t),n.setEnd(i,t),a.selection.setRng(n))}})}}),t.disconnect(),o.each(a.dom.select("span[mce-data-marked]"),function(e){e.removeAttribute("mce-data-marked")})}var n=a.getDoc(),r="data:text/mce-internal,",i=window.MutationObserver,s,l;i||(s=!0,i=function(){function e(e){var t=e.relatedNode||e.target;n.push({target:t,addedNodes:[t]})}function t(e){var t=e.relatedNode||e.target;n.push({target:t,attributeName:e.attrName})}var n=[],r;this.observe=function(n){r=n,r.addEventListener("DOMSubtreeModified",e,!1),r.addEventListener("DOMNodeInsertedIntoDocument",e,!1),r.addEventListener("DOMNodeInserted",e,!1),r.addEventListener("DOMAttrModified",t,!1)},this.disconnect=function(){r.removeEventListener("DOMSubtreeModified",e,!1),r.removeEventListener("DOMNodeInsertedIntoDocument",e,!1),r.removeEventListener("DOMNodeInserted",e,!1),r.removeEventListener("DOMAttrModified",t,!1)},this.takeRecords=function(){return n}}),a.on("keydown",function(n){var r=n.keyCode==$,i=e.metaKeyPressed(n);if(!c(n)&&(r||n.keyCode==U)){var o=a.selection.getRng(),s=o.startContainer,l=o.startOffset;if(!i&&o.collapsed&&3==s.nodeType&&(r?l<s.data.length:l>0))return;n.preventDefault(),i&&a.selection.getSel().modify("extend",r?"forward":"backward","word"),t(r)}}),a.on("keypress",function(n){c(n)||j.isCollapsed()||!n.charCode||e.metaKeyPressed(n)||(n.preventDefault(),t(!0),a.selection.setContent(String.fromCharCode(n.charCode)))}),a.addCommand("Delete",function(){t()}),a.addCommand("ForwardDelete",function(){t(!0)}),s||(a.on("dragstart",function(e){var t;a.selection.isCollapsed()&&"IMG"==e.target.tagName&&j.select(e.target),l=j.getRng(),t=a.selection.getContent(),t.length>0&&e.dataTransfer.setData("URL","data:text/mce-internal,"+escape(t))}),a.on("drop",function(e){if(!c(e)){var i=e.dataTransfer.getData("URL");if(!i||-1==i.indexOf(r)||!n.caretRangeFromPoint)return;i=unescape(i.substr(r.length)),n.caretRangeFromPoint&&(e.preventDefault(),window.setTimeout(function(){var r=n.caretRangeFromPoint(e.x,e.y);l&&(j.setRng(l),l=null),t(),j.setRng(r),a.insertContent(i)},0))}}),a.on("cut",function(e){!c(e)&&e.clipboardData&&(e.preventDefault(),e.clipboardData.clearData(),e.clipboardData.setData("text/html",a.selection.getContent()),e.clipboardData.setData("text/plain",a.selection.getContent({format:"text"})),t(!0))}))}function d(){function e(e){var t=q.create("body"),n=e.cloneContents();return t.appendChild(n),j.serializer.serialize(t,{format:"html"})}function n(n){if(!n.setStart){if(n.item)return!1;var r=n.duplicate();return r.moveToElementText(a.getBody()),t.compareRanges(n,r)}var i=e(n),o=q.createRng();o.selectNode(a.getBody());var s=e(o);return i===s}a.on("keydown",function(e){var t=e.keyCode,r,i;if(!c(e)&&(t==$||t==U)){if(r=a.selection.isCollapsed(),i=a.getBody(),r&&!q.isEmpty(i))return;if(!r&&!n(a.selection.getRng()))return;e.preventDefault(),a.setContent(""),i.firstChild&&q.isBlock(i.firstChild)?a.selection.setCursorLocation(i.firstChild,0):a.selection.setCursorLocation(i,0),a.nodeChanged()}})}function f(){a.on("keydown",function(t){!c(t)&&65==t.keyCode&&e.metaKeyPressed(t)&&(t.preventDefault(),a.execCommand("SelectAll"))})}function p(){a.settings.content_editable||(q.bind(a.getDoc(),"focusin",function(){j.setRng(j.getRng())}),q.bind(a.getDoc(),"mousedown",function(e){e.target==a.getDoc().documentElement&&(a.getBody().focus(),j.setRng(j.getRng()))}))}function h(){a.on("keydown",function(e){if(!c(e)&&e.keyCode===U){if(!a.getBody().getElementsByTagName("hr").length)return;if(j.isCollapsed()&&0===j.getRng(!0).startOffset){var t=j.getNode(),n=t.previousSibling;if("HR"==t.nodeName)return q.remove(t),void e.preventDefault();n&&n.nodeName&&"hr"===n.nodeName.toLowerCase()&&(q.remove(n),e.preventDefault())}}})}function m(){window.Range.prototype.getClientRects||a.on("mousedown",function(e){if(!c(e)&&"HTML"===e.target.nodeName){var t=a.getBody();t.blur(),setTimeout(function(){t.focus()},0)}})}function g(){a.on("click",function(e){e=e.target,/^(IMG|HR)$/.test(e.nodeName)&&j.getSel().setBaseAndExtent(e,0,e,1),"A"==e.nodeName&&q.hasClass(e,"mce-item-anchor")&&j.select(e)})}function v(){function e(){var e=q.getAttribs(j.getStart().cloneNode(!1));return function(){var t=j.getStart();t!==a.getBody()&&(q.setAttrib(t,"style",null),V(e,function(e){t.setAttributeNode(e.cloneNode(!0))}))}}function t(){return!j.isCollapsed()&&q.getParent(j.getStart(),q.isBlock)!=q.getParent(j.getEnd(),q.isBlock)}a.on("keypress",function(n){var r;return c(n)||8!=n.keyCode&&46!=n.keyCode||!t()?void 0:(r=e(),a.getDoc().execCommand("delete",!1,null),r(),n.preventDefault(),!1)}),q.bind(a.getDoc(),"cut",function(n){var r;!c(n)&&t()&&(r=e(),setTimeout(function(){r()},0))})}function y(){document.body.setAttribute("role","application")}function b(){a.on("keydown",function(e){if(!c(e)&&e.keyCode===U&&j.isCollapsed()&&0===j.getRng(!0).startOffset){var t=j.getNode().previousSibling;if(t&&t.nodeName&&"table"===t.nodeName.toLowerCase())return e.preventDefault(),!1}})}function C(){l()>7||(s("RespectVisibilityInDesign",!0),a.contentStyles.push(".mceHideBrInPre pre br {display: none}"),q.addClass(a.getBody(),"mceHideBrInPre"),K.addNodeFilter("pre",function(e){for(var t=e.length,r,i,o,a;t--;)for(r=e[t].getAll("br"),i=r.length;i--;)o=r[i],a=o.prev,a&&3===a.type&&"\n"!=a.value.charAt(a.value-1)?a.value+="\n":o.parent.insert(new n("#text",3),o,!0).value="\n"}),G.addNodeFilter("pre",function(e){for(var t=e.length,n,r,i,o;t--;)for(n=e[t].getAll("br"),r=n.length;r--;)i=n[r],o=i.prev,o&&3==o.type&&(o.value=o.value.replace(/\r?\n$/,""))}))}function x(){q.bind(a.getBody(),"mouseup",function(){var e,t=j.getNode();"IMG"==t.nodeName&&((e=q.getStyle(t,"width"))&&(q.setAttrib(t,"width",e.replace(/[^0-9%]+/g,"")),q.setStyle(t,"width","")),(e=q.getStyle(t,"height"))&&(q.setAttrib(t,"height",e.replace(/[^0-9%]+/g,"")),q.setStyle(t,"height","")))})}function w(){a.on("keydown",function(t){var n,r,i,o,s;if(!c(t)&&t.keyCode==e.BACKSPACE&&(n=j.getRng(),r=n.startContainer,i=n.startOffset,o=q.getRoot(),s=r,n.collapsed&&0===i)){for(;s&&s.parentNode&&s.parentNode.firstChild==s&&s.parentNode!=o;)s=s.parentNode;"BLOCKQUOTE"===s.tagName&&(a.formatter.toggle("blockquote",null,s),n=q.createRng(),n.setStart(r,0),n.setEnd(r,0),j.setRng(n))}})}function _(){function e(){a._refreshContentEditable(),s("StyleWithCSS",!1),s("enableInlineTableEditing",!1),Y.object_resizing||s("enableObjectResizing",!1)}Y.readonly||a.on("BeforeExecCommand MouseDown",e)}function E(){function e(){V(q.select("a"),function(e){var t=e.parentNode,n=q.getRoot();if(t.lastChild===e){for(;t&&!q.isBlock(t);){if(t.parentNode.lastChild!==t||t===n)return;t=t.parentNode}q.add(t,"br",{"data-mce-bogus":1})}})}a.on("SetContent ExecCommand",function(t){("setcontent"==t.type||"mceInsertLink"===t.command)&&e()})}function N(){Y.forced_root_block&&a.on("init",function(){s("DefaultParagraphSeparator",Y.forced_root_block)})}function k(){a.on("Undo Redo SetContent",function(e){e.initial||a.execCommand("mceRepaint")})}function S(){a.on("keydown",function(e){var t;c(e)||e.keyCode!=U||(t=a.getDoc().selection.createRange(),t&&t.item&&(e.preventDefault(),a.undoManager.beforeChange(),q.remove(t.item(0)),a.undoManager.add()))})}function T(){var e;l()>=10&&(e="",V("p div h1 h2 h3 h4 h5 h6".split(" "),function(t,n){e+=(n>0?",":"")+t+":empty"}),a.contentStyles.push(e+"{padding-right: 1px !important}"))}function R(){l()<9&&(K.addNodeFilter("noscript",function(e){for(var t=e.length,n,r;t--;)n=e[t],r=n.firstChild,r&&n.attr("data-mce-innertext",r.value)}),G.addNodeFilter("noscript",function(e){for(var t=e.length,i,o,a;t--;)i=e[t],o=e[t].firstChild,o?o.value=r.decode(o.value):(a=i.attributes.map["data-mce-innertext"],a&&(i.attr("data-mce-innertext",null),o=new n("#text",3),o.value=a,o.raw=!0,i.append(o)))}))}function A(){function e(e,t){var n=i.createTextRange();try{n.moveToPoint(e,t)}catch(r){n=null}return n}function t(t){var r;t.button?(r=e(t.x,t.y),r&&(r.compareEndPoints("StartToStart",a)>0?r.setEndPoint("StartToStart",a):r.setEndPoint("EndToEnd",a),r.select())):n()}function n(){var e=r.selection.createRange();a&&!e.item&&0===e.compareEndPoints("StartToEnd",e)&&a.select(),q.unbind(r,"mouseup",n),q.unbind(r,"mousemove",t),a=o=0}var r=q.doc,i=r.body,o,a,s;r.documentElement.unselectable=!0,q.bind(r,"mousedown contextmenu",function(i){if("HTML"===i.target.nodeName){if(o&&n(),s=r.documentElement,s.scrollHeight>s.clientHeight)return;o=1,a=e(i.x,i.y),a&&(q.bind(r,"mouseup",n),q.bind(r,"mousemove",t),q.getRoot().focus(),a.select())}})}function B(){a.on("keyup focusin mouseup",function(t){65==t.keyCode&&e.metaKeyPressed(t)||j.normalize()},!0)}function D(){a.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")}function L(){a.inline||a.on("keydown",function(){document.activeElement==document.body&&a.getWin().focus()})}function H(){a.inline||(a.contentStyles.push("body {min-height: 150px}"),a.on("click",function(e){"HTML"==e.target.nodeName&&(a.getBody().focus(),a.selection.normalize(),a.nodeChanged())}))}function M(){i.mac&&a.on("keydown",function(t){!e.metaKeyPressed(t)||37!=t.keyCode&&39!=t.keyCode||(t.preventDefault(),a.selection.getSel().modify("move",37==t.keyCode?"backward":"forward","word"))})}function P(){s("AutoUrlDetect",!1)}function O(){a.inline||a.on("focus blur beforegetcontent",function(){var e=a.dom.create("br");a.getBody().appendChild(e),e.parentNode.removeChild(e)},!0)}function I(){a.on("click",function(e){var t=e.target;do if("A"===t.tagName)return void e.preventDefault();while(t=t.parentNode)}),a.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")}function F(){a.on("touchstart",function(e){var t,n,r,i;t=e.target,n=(new Date).getTime(),i=e.changedTouches,!i||i.length>1||(r=i[0],a.once("touchend",function(e){var i=e.changedTouches[0],o;(new Date).getTime()-n>500||Math.abs(r.clientX-i.clientX)>5||Math.abs(r.clientY-i.clientY)>5||(o={target:t},V("pageX pageY clientX clientY screenX screenY".split(" "),function(e){o[e]=i[e]}),o=a.fire("click",o))}))})}function z(){a.on("init",function(){a.dom.bind(a.getBody(),"submit",function(e){e.preventDefault()})})}function W(){K.addNodeFilter("br",function(e){for(var t=e.length;t--;)"Apple-interchange-newline"==e[t].attr("class")&&e[t].remove()})}var V=o.each,U=e.BACKSPACE,$=e.DELETE,q=a.dom,j=a.selection,Y=a.settings,K=a.parser,G=a.serializer,X=i.gecko,J=i.ie,Q=i.webkit;w(),d(),B(),Q&&(u(),p(),g(),N(),z(),b(),W(),F(),i.iOS?(L(),H(),I()):f()),J&&i.ie<11&&(h(),y(),C(),x(),S(),T(),R(),A()),i.ie>=11&&(H(),O(),b()),i.ie&&(f(),P()),X&&(h(),m(),v(),_(),E(),k(),D(),M(),b())}}),r(lt,[$],function(e){function t(t){return t._eventDispatcher||(t._eventDispatcher=new e({scope:t,toggleEvent:function(n,r){e.isNative(n)&&t.toggleNativeEvent&&t.toggleNativeEvent(n,r)}})),t._eventDispatcher}return{fire:function(e,n,r){var i=this;if(i.removed&&"remove"!==e)return n;if(n=t(i).fire(e,n,r),r!==!1&&i.parent)for(var o=i.parent();o&&!n.isPropagationStopped();)o.fire(e,n,!1),o=o.parent();return n},on:function(e,n,r){return t(this).on(e,n,r)},off:function(e,n){return t(this).off(e,n)},once:function(e,n){return t(this).once(e,n)},hasEventListeners:function(e){return t(this).has(e)}}}),r(ct,[lt,y,u],function(e,t,n){function r(e,t){return"selectionchange"==t?e.getDoc():!e.inline&&/^mouse|click|contextmenu|drop|dragover|dragend/.test(t)?e.getDoc().documentElement:e.settings.event_root?(e.eventRoot||(e.eventRoot=o.select(e.settings.event_root)[0]),e.eventRoot):e.getBody()}function i(e,t){var n=r(e,t),i;if(e.delegates||(e.delegates={}),!e.delegates[t])if(e.settings.event_root){if(a||(a={},e.editorManager.on("removeEditor",function(){var t;if(!e.editorManager.activeEditor&&a){for(t in a)e.dom.unbind(r(e,t));a=null}})),a[t])return;i=function(n){for(var r=n.target,i=e.editorManager.editors,a=i.length;a--;){var s=i[a].getBody();(s===r||o.isChildOf(r,s))&&(i[a].hidden||i[a].fire(t,n))}},a[t]=i,o.bind(n,t,i)}else i=function(n){e.hidden||e.fire(t,n)},o.bind(n,t,i),e.delegates[t]=i}var o=t.DOM,a,s={bindPendingEventDelegates:function(){var e=this;n.each(e._pendingNativeEvents,function(t){i(e,t)})},toggleNativeEvent:function(e,t){var n=this;n.settings.readonly||"focus"!=e&&"blur"!=e&&(t?n.initialized?i(n,e):n._pendingNativeEvents?n._pendingNativeEvents.push(e):n._pendingNativeEvents=[e]:n.initialized&&(n.dom.unbind(r(n,e),e,n.delegates[e]),delete n.delegates[e]))},unbindAllNativeEvents:function(){var e=this,t;if(e.delegates){for(t in e.delegates)e.dom.unbind(r(e,t),t,e.delegates[t]);delete e.delegates}e.inline||(e.getBody().onload=null,e.dom.unbind(e.getWin()),e.dom.unbind(e.getDoc())),e.dom.unbind(e.getBody()),e.dom.unbind(e.getContainer())}};return s=n.extend({},e,s)}),r(ut,[u,d],function(e,t){var n=e.each,r=e.explode,i={f9:120,f10:121,f11:122};return function(o){var a=this,s={};o.on("keyup keypress keydown",function(e){(e.altKey||e.ctrlKey||e.metaKey)&&n(s,function(n){var r=t.mac?e.metaKey:e.ctrlKey;if(n.ctrl==r&&n.alt==e.altKey&&n.shift==e.shiftKey)return e.keyCode==n.keyCode||e.charCode&&e.charCode==n.charCode?(e.preventDefault(),"keydown"==e.type&&n.func.call(n.scope),!0):void 0})}),a.add=function(t,a,l,c){var u;return u=l,"string"==typeof l?l=function(){o.execCommand(u,!1,null)}:e.isArray(u)&&(l=function(){o.execCommand(u[0],u[1],u[2])}),n(r(t.toLowerCase()),function(e){var t={func:l,scope:c||o,desc:o.translate(a),alt:!1,ctrl:!1,shift:!1};n(r(e,"+"),function(e){switch(e){case"alt":case"ctrl":case"shift":t[e]=!0;break;default:/^[0-9]{2,}$/.test(e)?t.keyCode=parseInt(e,10):(t.charCode=e.charCodeAt(0),t.keyCode=i[e]||e.toUpperCase().charCodeAt(0))}}),s[(t.ctrl?"ctrl":"")+","+(t.alt?"alt":"")+","+(t.shift?"shift":"")+","+t.keyCode]=t}),!0}}}),r(dt,[y,f,C,w,_,R,T,H,O,I,F,z,W,V,b,l,at,E,k,st,d,u,ct,ut],function(e,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v,y,b,C,x,w,_,E){function N(e,t,i){var o=this,a,s;a=o.documentBaseUrl=i.documentBaseURL,s=i.baseURI,o.settings=t=R({id:e,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:a,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",validate:!0,entity_encoding:"named",url_converter:o.convertURL,url_converter_scope:o,ie7_compat:!0},t),r.language=t.language||"en",r.languageLoad=t.language_load,r.baseURL=i.baseURL,o.id=t.id=e,o.isNotDirty=!0,o.plugins={},o.documentBaseURI=new h(t.document_base_url||a,{base_uri:s}),o.baseURI=s,o.contentCSS=[],o.contentStyles=[],o.shortcuts=new E(o),o.execCommands={},o.queryStateCommands={},o.queryValueCommands={},o.loadedCSS={},t.target&&(o.targetElm=t.target),o.suffix=i.suffix,o.editorManager=i,o.inline=t.inline,i.fire("SetupEditor",o),o.execCallback("setup",o),o.$=n.overrideDefaults(function(){return{context:o.inline?o.getBody():o.getDoc(),element:o.getBody()}})}var k=e.DOM,S=r.ThemeManager,T=r.PluginManager,R=w.extend,A=w.each,B=w.explode,D=w.inArray,L=w.trim,H=w.resolve,M=g.Event,P=x.gecko,O=x.ie;return N.prototype={render:function(){function e(){k.unbind(window,"ready",e),n.render()}function t(){var e=m.ScriptLoader;if(r.language&&"en"!=r.language&&!r.language_url&&(r.language_url=n.editorManager.baseURL+"/langs/"+r.language+".js"),r.language_url&&e.add(r.language_url),r.theme&&"function"!=typeof r.theme&&"-"!=r.theme.charAt(0)&&!S.urls[r.theme]){var t=r.theme_url;t=t?n.documentBaseURI.toAbsolute(t):"themes/"+r.theme+"/theme"+o+".js",S.load(r.theme,t)}w.isArray(r.plugins)&&(r.plugins=r.plugins.join(" ")),A(r.external_plugins,function(e,t){T.load(t,e),r.plugins+=" "+t
}),A(r.plugins.split(/[ ,]/),function(e){if(e=L(e),e&&!T.urls[e])if("-"==e.charAt(0)){e=e.substr(1,e.length);var t=T.dependencies(e);A(t,function(e){var t={prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"};e=T.createUrl(t,e),T.load(e.resource,e)})}else T.load(e,{prefix:"plugins/",resource:e,suffix:"/plugin"+o+".js"})}),e.loadQueue(function(){n.removed||n.init()})}var n=this,r=n.settings,i=n.id,o=n.suffix;if(!M.domLoaded)return void k.bind(window,"ready",e);if(n.getElement()&&x.contentEditable){r.inline?n.inline=!0:(n.orgVisibility=n.getElement().style.visibility,n.getElement().style.visibility="hidden");var a=n.getElement().form||k.getParent(i,"form");a&&(n.formElement=a,r.hidden_input&&!/TEXTAREA|INPUT/i.test(n.getElement().nodeName)&&(k.insertAfter(k.create("input",{type:"hidden",name:i}),i),n.hasHiddenInput=!0),n.formEventDelegate=function(e){n.fire(e.type,e)},k.bind(a,"submit reset",n.formEventDelegate),n.on("reset",function(){n.setContent(n.startContent,{format:"raw"})}),!r.submit_patch||a.submit.nodeType||a.submit.length||a._mceOldSubmit||(a._mceOldSubmit=a.submit,a.submit=function(){return n.editorManager.triggerSave(),n.isNotDirty=!0,a._mceOldSubmit(a)})),n.windowManager=new v(n),"xml"==r.encoding&&n.on("GetContent",function(e){e.save&&(e.content=k.encode(e.content))}),r.add_form_submit_trigger&&n.on("submit",function(){n.initialized&&n.save()}),r.add_unload_trigger&&(n._beforeUnload=function(){!n.initialized||n.destroyed||n.isHidden()||n.save({format:"raw",no_events:!0,set_dirty:!1})},n.editorManager.on("BeforeUnload",n._beforeUnload)),t()}},init:function(){function e(n){var r=T.get(n),i,o;i=T.urls[n]||t.documentBaseUrl.replace(/\/$/,""),n=L(n),r&&-1===D(m,n)&&(A(T.dependencies(n),function(t){e(t)}),o=new r(t,i,t.$),t.plugins[n]=o,o.init&&(o.init(t,i),m.push(n)))}var t=this,n=t.settings,r=t.getElement(),i,o,a,s,l,c,u,d,f,p,h,m=[];if(t.rtl=this.editorManager.i18n.rtl,t.editorManager.add(t),n.aria_label=n.aria_label||k.getAttrib(r,"aria-label",t.getLang("aria.rich_text_area")),n.theme&&("function"!=typeof n.theme?(n.theme=n.theme.replace(/-/,""),c=S.get(n.theme),t.theme=new c(t,S.urls[n.theme]),t.theme.init&&t.theme.init(t,S.urls[n.theme]||t.documentBaseUrl.replace(/\/$/,""),t.$)):t.theme=n.theme),A(n.plugins.replace(/\-/g,"").split(/[ ,]/),e),n.render_ui&&t.theme&&(t.orgDisplay=r.style.display,"function"!=typeof n.theme?(i=n.width||r.style.width||r.offsetWidth,o=n.height||r.style.height||r.offsetHeight,a=n.min_height||100,p=/^[0-9\.]+(|px)$/i,p.test(""+i)&&(i=Math.max(parseInt(i,10),100)),p.test(""+o)&&(o=Math.max(parseInt(o,10),a)),l=t.theme.renderUI({targetNode:r,width:i,height:o,deltaWidth:n.delta_width,deltaHeight:n.delta_height}),n.content_editable||(o=(l.iframeHeight||o)+("number"==typeof o?l.deltaHeight||0:""),a>o&&(o=a))):(l=n.theme(t,r),l.editorContainer.nodeType&&(l.editorContainer=l.editorContainer.id=l.editorContainer.id||t.id+"_parent"),l.iframeContainer.nodeType&&(l.iframeContainer=l.iframeContainer.id=l.iframeContainer.id||t.id+"_iframecontainer"),o=l.iframeHeight||r.offsetHeight),t.editorContainer=l.editorContainer),n.content_css&&A(B(n.content_css),function(e){t.contentCSS.push(t.documentBaseURI.toAbsolute(e))}),n.content_style&&t.contentStyles.push(n.content_style),n.content_editable)return r=s=l=null,t.initContentBody();for(t.iframeHTML=n.doctype+"<html><head>",n.document_base_url!=t.documentBaseUrl&&(t.iframeHTML+='<base href="'+t.documentBaseURI.getURI()+'" />'),!x.caretAfter&&n.ie7_compat&&(t.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'),t.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',h=0;h<t.contentCSS.length;h++){var g=t.contentCSS[h];t.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+g+'" />',t.loadedCSS[g]=!0}d=n.body_id||"tinymce",-1!=d.indexOf("=")&&(d=t.getParam("body_id","","hash"),d=d[t.id]||d),f=n.body_class||"",-1!=f.indexOf("=")&&(f=t.getParam("body_class","","hash"),f=f[t.id]||""),t.iframeHTML+='</head><body id="'+d+'" class="mce-content-body '+f+'" data-id="'+t.id+'"><br></body></html>';var v='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+t.id+'");document.write(ed.iframeHTML);document.close();ed.initContentBody(true);})()';document.domain!=location.hostname&&(u=v);var y=k.create("iframe",{id:t.id+"_ifr",frameBorder:"0",allowTransparency:"true",title:t.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:o,display:"block"}});if(y.onload=function(){y.onload=null,t.fire("load")},k.setAttrib("src",u||'javascript:""'),t.contentAreaContainer=l.iframeContainer,t.iframeElement=y,s=k.add(l.iframeContainer,y),O)try{t.getDoc()}catch(b){s.src=u=v}l.editorContainer&&(k.get(l.editorContainer).style.display=t.orgDisplay,t.hidden=k.isHidden(l.editorContainer)),t.getElement().style.display="none",k.setAttrib(t.id,"aria-hidden",!0),u||t.initContentBody(),r=s=l=null},initContentBody:function(t){var n=this,r=n.settings,s=n.getElement(),h=n.getDoc(),m,g;r.inline||(n.getElement().style.visibility=n.orgVisibility),t||r.content_editable||(h.open(),h.write(n.iframeHTML),h.close()),r.content_editable&&(n.on("remove",function(){var e=this.getBody();k.removeClass(e,"mce-content-body"),k.removeClass(e,"mce-edit-focus"),k.setAttrib(e,"contentEditable",null)}),k.addClass(s,"mce-content-body"),n.contentDocument=h=r.content_document||document,n.contentWindow=r.content_window||window,n.bodyElement=s,r.content_document=r.content_window=null,r.root_name=s.nodeName.toLowerCase()),m=n.getBody(),m.disabled=!0,r.readonly||(n.inline&&"static"==k.getStyle(m,"position",!0)&&(m.style.position="relative"),m.contentEditable=n.getParam("content_editable_state",!0)),m.disabled=!1,n.schema=new y(r),n.dom=new e(h,{keep_values:!0,url_converter:n.convertURL,url_converter_scope:n,hex_colors:r.force_hex_style_colors,class_filter:r.class_filter,update_styles:!0,root_element:n.inline?n.getBody():null,collect:r.content_editable,schema:n.schema,onSetAttrib:function(e){n.fire("SetAttrib",e)}}),n.parser=new b(r,n.schema),n.parser.addAttributeFilter("src,href,style,tabindex",function(e,t){for(var r=e.length,i,o=n.dom,a,s;r--;)i=e[r],a=i.attr(t),s="data-mce-"+t,i.attributes.map[s]||("style"===t?(a=o.serializeStyle(o.parseStyle(a),i.name),a.length||(a=null),i.attr(s,a),i.attr(t,a)):"tabindex"===t?(i.attr(s,a),i.attr(t,null)):i.attr(s,n.convertURL(a,t,i.name)))}),n.parser.addNodeFilter("script",function(e){for(var t=e.length,n;t--;)n=e[t],n.attr("type","mce-"+(n.attr("type")||"no/type"))}),n.parser.addNodeFilter("#cdata",function(e){for(var t=e.length,n;t--;)n=e[t],n.type=8,n.name="#comment",n.value="[CDATA["+n.value+"]]"}),n.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(e){for(var t=e.length,r,i=n.schema.getNonEmptyElements();t--;)r=e[t],r.isEmpty(i)&&(r.append(new o("br",1)).shortEnded=!0)}),n.serializer=new a(r,n),n.selection=new l(n.dom,n.getWin(),n.serializer,n),n.formatter=new c(n),n.undoManager=new u(n),n.forceBlocks=new f(n),n.enterKey=new d(n),n.editorCommands=new p(n),n._nodeChangeDispatcher=new i(n),n.fire("PreInit"),r.browser_spellcheck||r.gecko_spellcheck||(h.body.spellcheck=!1,k.setAttrib(m,"spellcheck","false")),n.fire("PostRender"),n.quirks=new C(n),r.directionality&&(m.dir=r.directionality),r.nowrap&&(m.style.whiteSpace="nowrap"),r.protect&&n.on("BeforeSetContent",function(e){A(r.protect,function(t){e.content=e.content.replace(t,function(e){return"<!--mce:protected "+escape(e)+"-->"})})}),n.on("SetContent",function(){n.addVisual(n.getBody())}),r.padd_empty_editor&&n.on("PostProcess",function(e){e.content=e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),n.load({initial:!0,format:"html"}),n.startContent=n.getContent({format:"raw"}),n.initialized=!0,n.bindPendingEventDelegates(),n.fire("init"),n.focus(!0),n.nodeChanged({initial:!0}),n.execCallback("init_instance_callback",n),n.contentStyles.length>0&&(g="",A(n.contentStyles,function(e){g+=e+"\r\n"}),n.dom.addStyle(g)),A(n.contentCSS,function(e){n.loadedCSS[e]||(n.dom.loadCSS(e),n.loadedCSS[e]=!0)}),r.auto_focus&&setTimeout(function(){var e;e=r.auto_focus===!0?n:n.editorManager.get(r.auto_focus),e.focus()},100),s=h=m=null},focus:function(e){var t,n=this,r=n.selection,i=n.settings.content_editable,o,a,s=n.getDoc(),l;if(!e){if(o=r.getRng(),o.item&&(a=o.item(0)),n._refreshContentEditable(),i||(x.opera||n.getBody().focus(),n.getWin().focus()),P||i){if(l=n.getBody(),l.setActive)try{l.setActive()}catch(c){l.focus()}else l.focus();i&&r.normalize()}a&&a.ownerDocument==s&&(o=s.body.createControlRange(),o.addElement(a),o.select())}n.editorManager.activeEditor!=n&&((t=n.editorManager.activeEditor)&&t.fire("deactivate",{relatedTarget:n}),n.fire("activate",{relatedTarget:t})),n.editorManager.activeEditor=n},execCallback:function(e){var t=this,n=t.settings[e],r;if(n)return t.callbackLookup&&(r=t.callbackLookup[e])&&(n=r.func,r=r.scope),"string"==typeof n&&(r=n.replace(/\.\w+$/,""),r=r?H(r):0,n=H(n),t.callbackLookup=t.callbackLookup||{},t.callbackLookup[e]={func:n,scope:r}),n.apply(r||t,Array.prototype.slice.call(arguments,1))},translate:function(e){var t=this.settings.language||"en",n=this.editorManager.i18n;return e?n.data[t+"."+e]||e.replace(/\{\#([^\}]+)\}/g,function(e,r){return n.data[t+"."+r]||"{#"+r+"}"}):""},getLang:function(e,n){return this.editorManager.i18n.data[(this.settings.language||"en")+"."+e]||(n!==t?n:"{#"+e+"}")},getParam:function(e,t,n){var r=e in this.settings?this.settings[e]:t,i;return"hash"===n?(i={},"string"==typeof r?A(r.split(r.indexOf("=")>0?/[;,](?![^=;,]*(?:[;,]|$))/:","),function(e){e=e.split("="),i[L(e[0])]=L(e.length>1?e[1]:e)}):i=r,i):r},nodeChanged:function(e){this._nodeChangeDispatcher.nodeChanged(e)},addButton:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),t.text||t.icon||(t.icon=e),n.buttons=n.buttons||{},t.tooltip=t.tooltip||t.title,n.buttons[e]=t},addMenuItem:function(e,t){var n=this;t.cmd&&(t.onclick=function(){n.execCommand(t.cmd)}),n.menuItems=n.menuItems||{},n.menuItems[e]=t},addCommand:function(e,t,n){this.execCommands[e]={func:t,scope:n||this}},addQueryStateHandler:function(e,t,n){this.queryStateCommands[e]={func:t,scope:n||this}},addQueryValueHandler:function(e,t,n){this.queryValueCommands[e]={func:t,scope:n||this}},addShortcut:function(e,t,n,r){this.shortcuts.add(e,t,n,r)},execCommand:function(e,t,n,r){var i=this,o=0,a;if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(e)||r&&r.skip_focus||i.focus(),r=R({},r),r=i.fire("BeforeExecCommand",{command:e,ui:t,value:n}),r.isDefaultPrevented())return!1;if((a=i.execCommands[e])&&a.func.call(a.scope,t,n)!==!0)return i.fire("ExecCommand",{command:e,ui:t,value:n}),!0;if(A(i.plugins,function(r){return r.execCommand&&r.execCommand(e,t,n)?(i.fire("ExecCommand",{command:e,ui:t,value:n}),o=!0,!1):void 0}),o)return o;if(i.theme&&i.theme.execCommand&&i.theme.execCommand(e,t,n))return i.fire("ExecCommand",{command:e,ui:t,value:n}),!0;if(i.editorCommands.execCommand(e,t,n))return i.fire("ExecCommand",{command:e,ui:t,value:n}),!0;try{o=i.getDoc().execCommand(e,t,n)}catch(s){}return o?(i.fire("ExecCommand",{command:e,ui:t,value:n}),!0):!1},queryCommandState:function(e){var t=this,n,r;if(!t._isHidden()){if((n=t.queryStateCommands[e])&&(r=n.func.call(n.scope),r===!0||r===!1))return r;if(r=t.editorCommands.queryCommandState(e),-1!==r)return r;try{return t.getDoc().queryCommandState(e)}catch(i){}}},queryCommandValue:function(e){var n=this,r,i;if(!n._isHidden()){if((r=n.queryValueCommands[e])&&(i=r.func.call(r.scope),i!==!0))return i;if(i=n.editorCommands.queryCommandValue(e),i!==t)return i;try{return n.getDoc().queryCommandValue(e)}catch(o){}}},show:function(){var e=this;e.hidden&&(e.hidden=!1,e.inline?e.getBody().contentEditable=!0:(k.show(e.getContainer()),k.hide(e.id)),e.load(),e.fire("show"))},hide:function(){var e=this,t=e.getDoc();e.hidden||(O&&t&&!e.inline&&t.execCommand("SelectAll"),e.save(),e.inline?(e.getBody().contentEditable=!1,e==e.editorManager.focusedEditor&&(e.editorManager.focusedEditor=null)):(k.hide(e.getContainer()),k.setStyle(e.id,"display",e.orgDisplay)),e.hidden=!0,e.fire("hide"))},isHidden:function(){return!!this.hidden},setProgressState:function(e,t){this.fire("ProgressState",{state:e,time:t})},load:function(e){var n=this,r=n.getElement(),i;return r?(e=e||{},e.load=!0,i=n.setContent(r.value!==t?r.value:r.innerHTML,e),e.element=r,e.no_events||n.fire("LoadContent",e),e.element=r=null,i):void 0},save:function(e){var t=this,n=t.getElement(),r,i;if(n&&t.initialized)return e=e||{},e.save=!0,e.element=n,r=e.content=t.getContent(e),e.no_events||t.fire("SaveContent",e),r=e.content,/TEXTAREA|INPUT/i.test(n.nodeName)?n.value=r:(t.inline||(n.innerHTML=r),(i=k.getParent(t.id,"form"))&&A(i.elements,function(e){return e.name==t.id?(e.value=r,!1):void 0})),e.element=n=null,e.set_dirty!==!1&&(t.isNotDirty=!0),r},setContent:function(e,t){var n=this,r=n.getBody(),i;return t=t||{},t.format=t.format||"html",t.set=!0,t.content=e,t.no_events||n.fire("BeforeSetContent",t),e=t.content,0===e.length||/^\s+$/.test(e)?(i=n.settings.forced_root_block,i&&n.schema.isValidChild(r.nodeName.toLowerCase(),i.toLowerCase())?(e=O&&11>O?"":'<br data-mce-bogus="1">',e=n.dom.createHTML(i,n.settings.forced_root_block_attrs,e)):O||(e='<br data-mce-bogus="1">'),n.dom.setHTML(r,e),n.fire("SetContent",t)):("raw"!==t.format&&(e=new s({},n.schema).serialize(n.parser.parse(e,{isRootContent:!0}))),t.content=L(e),n.dom.setHTML(r,t.content),t.no_events||n.fire("SetContent",t)),t.content},getContent:function(e){var t=this,n,r=t.getBody();return e=e||{},e.format=e.format||"html",e.get=!0,e.getInner=!0,e.no_events||t.fire("BeforeGetContent",e),n="raw"==e.format?r.innerHTML:"text"==e.format?r.innerText||r.textContent:t.serializer.serialize(r,e),e.content="text"!=e.format?L(n):n,e.no_events||t.fire("GetContent",e),e.content},insertContent:function(e,t){t&&(e=R({content:e},t)),this.execCommand("mceInsertContent",!1,e)},isDirty:function(){return!this.isNotDirty},getContainer:function(){var e=this;return e.container||(e.container=k.get(e.editorContainer||e.id+"_parent")),e.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return this.targetElm||(this.targetElm=k.get(this.id)),this.targetElm},getWin:function(){var e=this,t;return e.contentWindow||(t=e.iframeElement,t&&(e.contentWindow=t.contentWindow)),e.contentWindow},getDoc:function(){var e=this,t;return e.contentDocument||(t=e.getWin(),t&&(e.contentDocument=t.document)),e.contentDocument},getBody:function(){return this.bodyElement||this.getDoc().body},convertURL:function(e,t,n){var r=this,i=r.settings;return i.urlconverter_callback?r.execCallback("urlconverter_callback",e,n,!0,t):!i.convert_urls||n&&"LINK"==n.nodeName||0===e.indexOf("file:")||0===e.length?e:i.relative_urls?r.documentBaseURI.toRelative(e):e=r.documentBaseURI.toAbsolute(e,i.remove_script_host)},addVisual:function(e){var n=this,r=n.settings,i=n.dom,o;e=e||n.getBody(),n.hasVisual===t&&(n.hasVisual=r.visual),A(i.select("table,a",e),function(e){var t;switch(e.nodeName){case"TABLE":return o=r.visual_table_class||"mce-item-table",t=i.getAttrib(e,"border"),void(t&&"0"!=t||!n.hasVisual?i.removeClass(e,o):i.addClass(e,o));case"A":return void(i.getAttrib(e,"href",!1)||(t=i.getAttrib(e,"name")||e.id,o=r.visual_anchor_class||"mce-item-anchor",t&&n.hasVisual?i.addClass(e,o):i.removeClass(e,o)))}}),n.fire("VisualAid",{element:e,hasVisual:n.hasVisual})},remove:function(){var e=this;e.removed||(e.save(),e.removed=1,e.unbindAllNativeEvents(),e.hasHiddenInput&&k.remove(e.getElement().nextSibling),e.inline||(O&&10>O&&e.getDoc().execCommand("SelectAll",!1,null),k.setStyle(e.id,"display",e.orgDisplay),e.getBody().onload=null),e.fire("remove"),e.editorManager.remove(e),k.remove(e.getContainer()),e.destroy())},destroy:function(e){var t=this,n;if(!t.destroyed){if(!e&&!t.removed)return void t.remove();e||(t.editorManager.off("beforeunload",t._beforeUnload),t.theme&&t.theme.destroy&&t.theme.destroy(),t.selection.destroy(),t.dom.destroy()),n=t.formElement,n&&(n._mceOldSubmit&&(n.submit=n._mceOldSubmit,n._mceOldSubmit=null),k.unbind(n,"submit reset",t.formEventDelegate)),t.contentAreaContainer=t.formElement=t.container=t.editorContainer=null,t.bodyElement=t.contentDocument=t.contentWindow=null,t.iframeElement=t.targetElm=null,t.selection&&(t.selection=t.selection.win=t.selection.dom=t.selection.dom.doc=null),t.destroyed=1}},_refreshContentEditable:function(){var e=this,t,n;e._isHidden()&&(t=e.getBody(),n=t.parentNode,n.removeChild(t),n.appendChild(t),t.focus())},_isHidden:function(){var e;return P?(e=this.selection.getSel(),!e||!e.rangeCount||0===e.rangeCount):0}},R(N.prototype,_),N}),r(ft,[],function(){var e={};return{rtl:!1,add:function(t,n){for(var r in n)e[r]=n[r];this.rtl=this.rtl||"rtl"===e._dir},translate:function(t){if("undefined"==typeof t)return t;if("string"!=typeof t&&t.raw)return t.raw;if(t.push){var n=t.slice(1);t=(e[t[0]]||t[0]).replace(/\{([^\}]+)\}/g,function(e,t){return n[t]})}return e[t]||t},data:e}}),r(pt,[y,d],function(e,t){function n(e){function s(){try{return document.activeElement}catch(e){return document.body}}function l(e,t){if(t&&t.startContainer){if(!e.isChildOf(t.startContainer,e.getRoot())||!e.isChildOf(t.endContainer,e.getRoot()))return;return{startContainer:t.startContainer,startOffset:t.startOffset,endContainer:t.endContainer,endOffset:t.endOffset}}return t}function c(e,t){var n;return t.startContainer?(n=e.getDoc().createRange(),n.setStart(t.startContainer,t.startOffset),n.setEnd(t.endContainer,t.endOffset)):n=t,n}function u(e){return!!a.getParent(e,n.isEditorUIElement)}function d(n){var d=n.editor;d.on("init",function(){(d.inline||t.ie)&&("onbeforedeactivate"in document&&t.ie<9?d.dom.bind(d.getBody(),"beforedeactivate",function(){try{d.lastRng=d.selection.getRng()}catch(e){}}):d.on("nodechange mouseup keyup",function(e){var t=s();"nodechange"==e.type&&e.selectionChange||(t&&t.id==d.id+"_ifr"&&(t=d.getBody()),d.dom.isChildOf(t,d.getBody())&&(d.lastRng=d.selection.getRng()))}),t.webkit&&!r&&(r=function(){var t=e.activeEditor;if(t&&t.selection){var n=t.selection.getRng();n&&!n.collapsed&&(d.lastRng=n)}},a.bind(document,"selectionchange",r)))}),d.on("setcontent",function(){d.lastRng=null}),d.on("mousedown",function(){d.selection.lastFocusBookmark=null}),d.on("focusin",function(){var t=e.focusedEditor;d.selection.lastFocusBookmark&&(d.selection.setRng(c(d,d.selection.lastFocusBookmark)),d.selection.lastFocusBookmark=null),t!=d&&(t&&t.fire("blur",{focusedEditor:d}),e.activeEditor=d,e.focusedEditor=d,d.fire("focus",{blurredEditor:t}),d.focus(!0)),d.lastRng=null}),d.on("focusout",function(){window.setTimeout(function(){var t=e.focusedEditor;u(s())||t!=d||(d.fire("blur",{focusedEditor:null}),e.focusedEditor=null,d.selection&&(d.selection.lastFocusBookmark=null))},0)}),i||(i=function(t){var n=e.activeEditor;n&&t.target.ownerDocument==document&&(n.selection&&t.target!=n.getBody()&&(n.selection.lastFocusBookmark=l(n.dom,n.lastRng)),u(t.target)||e.focusedEditor!=n||(n.fire("blur",{focusedEditor:null}),e.focusedEditor=null))},a.bind(document,"focusin",i)),d.inline&&!o&&(o=function(t){var n=e.activeEditor;if(n.inline&&!n.dom.isChildOf(t.target,n.getBody())){var r=n.selection.getRng();r.collapsed||(n.lastRng=r)}},a.bind(document,"mouseup",o))}function f(t){e.focusedEditor==t.editor&&(e.focusedEditor=null),e.activeEditor||(a.unbind(document,"selectionchange",r),a.unbind(document,"focusin",i),a.unbind(document,"mouseup",o),r=i=o=null)}e.on("AddEditor",d),e.on("RemoveEditor",f)}var r,i,o,a=e.DOM;return n.isEditorUIElement=function(e){return-1!==e.className.toString().indexOf("mce-")},n}),r(ht,[dt,f,y,V,d,u,lt,ft,pt],function(e,t,n,r,i,o,a,s,l){function c(e){var t=v.editors,n;delete t[e.id];for(var r=0;r<t.length;r++)if(t[r]==e){t.splice(r,1),n=!0;break}return v.activeEditor==e&&(v.activeEditor=t[0]),v.focusedEditor==e&&(v.focusedEditor=null),n}function u(e){return e&&!(e.getContainer()||e.getBody()).parentNode&&(c(e),e.unbindAllNativeEvents(),e.destroy(!0),e=null),e}var d=n.DOM,f=o.explode,p=o.each,h=o.extend,m=0,g,v;return v={$:t,majorVersion:"4",minorVersion:"1.3",releaseDate:"2014-07-29",editors:[],i18n:s,activeEditor:null,setup:function(){var e=this,t,n,i="",o,a;if(n=document.location.href,/^[^:]+:\/\/\/?[^\/]+\//.test(n)&&(n=n.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(n)||(n+="/")),o=window.tinymce||window.tinyMCEPreInit)t=o.base||o.baseURL,i=o.suffix;else{for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++)if(a=s[c].src,/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(a)){-1!=a.indexOf(".min")&&(i=".min"),t=a.substring(0,a.lastIndexOf("/"));break}!t&&document.currentScript&&(a=document.currentScript.src,-1!=a.indexOf(".min")&&(i=".min"),t=a.substring(0,a.lastIndexOf("/")))}e.baseURL=new r(n).toAbsolute(t),e.documentBaseURL=n,e.baseURI=new r(e.baseURL),e.suffix=i,e.focusManager=new l(e)},init:function(t){function n(e){var t=e.id;return t||(t=e.name,t=t&&!d.get(t)?e.name:d.uniqueId(),e.setAttribute("id",t)),t}function r(t,n,r){if(!u(s.get(t))){var i=new e(t,n,s);i.targetElm=i.targetElm||r,l.push(i),i.render()}}function i(e){var n=t[e];if(n)return n.apply(s,Array.prototype.slice.call(arguments,2))}function o(e,t){return t.constructor===RegExp?t.test(e.className):d.hasClass(e,t)}function a(){var u,g;if(d.unbind(window,"ready",a),i("onpageload"),t.types)return void p(t.types,function(e){p(d.select(e.selector),function(i){r(n(i),h({},t,e),i)})});if(t.selector)return void p(d.select(t.selector),function(e){r(n(e),t,e)});switch(t.target&&r(n(t.target),t),t.mode){case"exact":u=t.elements||"",u.length>0&&p(f(u),function(n){d.get(n)?(c=new e(n,t,s),l.push(c),c.render()):p(document.forms,function(e){p(e.elements,function(e){e.name===n&&(n="mce_editor_"+m++,d.setAttrib(e,"id",n),r(n,t,e))})})});break;case"textareas":case"specific_textareas":p(d.select("textarea"),function(e){t.editor_deselector&&o(e,t.editor_deselector)||(!t.editor_selector||o(e,t.editor_selector))&&r(n(e),t,e)})}t.oninit&&(u=g=0,p(l,function(e){g++,e.initialized?u++:e.on("init",function(){u++,u==g&&i("oninit")}),u==g&&i("oninit")}))}var s=this,l=[],c;s.settings=t,d.bind(window,"ready",a)},get:function(e){return arguments.length?e in this.editors?this.editors[e]:null:this.editors},add:function(e){var t=this,n=t.editors;return n[e.id]=e,n.push(e),t.activeEditor=e,t.fire("AddEditor",{editor:e}),g||(g=function(){t.fire("BeforeUnload")},d.bind(window,"beforeunload",g)),e},createEditor:function(t,n){return this.add(new e(t,n,this))},remove:function(e){var t=this,n,r=t.editors,i;{if(e)return"string"==typeof e?(e=e.selector||e,void p(d.select(e),function(e){i=r[e.id],i&&t.remove(i)})):(i=e,r[i.id]?(c(i)&&t.fire("RemoveEditor",{editor:i}),r.length||d.unbind(window,"beforeunload",g),i.remove(),i):null);for(n=r.length-1;n>=0;n--)t.remove(r[n])}},execCommand:function(t,n,r){var i=this,o=i.get(r);switch(t){case"mceAddEditor":return i.get(r)||new e(r,i.settings,i).render(),!0;case"mceRemoveEditor":return o&&o.remove(),!0;case"mceToggleEditor":return o?(o.isHidden()?o.show():o.hide(),!0):(i.execCommand("mceAddEditor",0,r),!0)}return i.activeEditor?i.activeEditor.execCommand(t,n,r):!1},triggerSave:function(){p(this.editors,function(e){e.save()})},addI18n:function(e,t){s.add(e,t)},translate:function(e){return s.translate(e)}},h(v,a),v.setup(),window.tinymce=window.tinyMCE=v,v}),r(mt,[ht,u],function(e,t){var n=t.each,r=t.explode;e.on("AddEditor",function(e){var t=e.editor;t.on("preInit",function(){function e(e,t){n(t,function(t,n){t&&s.setStyle(e,n,t)}),s.rename(e,"span")}function i(e){s=t.dom,l.convert_fonts_to_spans&&n(s.select("font,u,strike",e.node),function(e){o[e.nodeName.toLowerCase()](s,e)})}var o,a,s,l=t.settings;l.inline_styles&&(a=r(l.font_size_legacy_values),o={font:function(t,n){e(n,{backgroundColor:n.style.backgroundColor,color:n.color,fontFamily:n.face,fontSize:a[parseInt(n.size,10)-1]})},u:function(t,n){e(n,{textDecoration:"underline"})},strike:function(t,n){e(n,{textDecoration:"line-through"})}},t.on("PreProcess SetContent",i))})})}),r(gt,[lt,u],function(e,t){var n={send:function(e){function t(){!e.async||4==r.readyState||i++>1e4?(e.success&&1e4>i&&200==r.status?e.success.call(e.success_scope,""+r.responseText,r,e):e.error&&e.error.call(e.error_scope,i>1e4?"TIMED_OUT":"GENERAL",r,e),r=null):setTimeout(t,10)}var r,i=0;if(e.scope=e.scope||this,e.success_scope=e.success_scope||e.scope,e.error_scope=e.error_scope||e.scope,e.async=e.async===!1?!1:!0,e.data=e.data||"",r=new XMLHttpRequest){if(r.overrideMimeType&&r.overrideMimeType(e.content_type),r.open(e.type||(e.data?"POST":"GET"),e.url,e.async),e.crossDomain&&(r.withCredentials=!0),e.content_type&&r.setRequestHeader("Content-Type",e.content_type),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r=n.fire("beforeSend",{xhr:r,settings:e}).xhr,r.send(e.data),!e.async)return t();setTimeout(t,10)}}};return t.extend(n,e),n}),r(vt,[],function(){function e(t,n){var r,i,o,a;if(n=n||'"',null===t)return"null";if(o=typeof t,"string"==o)return i="\bb	t\nn\ff\rr\"\"''\\\\",n+t.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(e,t){return'"'===n&&"'"===e?e:(r=i.indexOf(t),r+1?"\\"+i.charAt(r+1):(e=t.charCodeAt().toString(16),"\\u"+"0000".substring(e.length)+e))})+n;if("object"==o){if(t.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(t)){for(r=0,i="[";r<t.length;r++)i+=(r>0?",":"")+e(t[r],n);return i+"]"}i="{";for(a in t)t.hasOwnProperty(a)&&(i+="function"!=typeof t[a]?(i.length>1?","+n:n)+a+n+":"+e(t[a],n):"");return i+"}"}return""+t}return{serialize:e,parse:function(e){try{return window[String.fromCharCode(101)+"val"]("("+e+")")}catch(t){}}}}),r(yt,[vt,gt,u],function(e,t,n){function r(e){this.settings=i({},e),this.count=0}var i=n.extend;return r.sendRPC=function(e){return(new r).send(e)},r.prototype={send:function(n){var r=n.error,o=n.success;n=i(this.settings,n),n.success=function(t,i){t=e.parse(t),"undefined"==typeof t&&(t={error:"JSON Parse error."}),t.error?r.call(n.error_scope||n.scope,t.error,i):o.call(n.success_scope||n.scope,t.result)},n.error=function(e,t){r&&r.call(n.error_scope||n.scope,e,t)},n.data=e.serialize({id:n.id||"c"+this.count++,method:n.method,params:n.params}),n.content_type="application/json",t.send(n)}},r}),r(bt,[y],function(e){return{callbacks:{},count:0,send:function(n){var r=this,i=e.DOM,o=n.count!==t?n.count:r.count,a="tinymce_jsonp_"+o;r.callbacks[o]=function(e){i.remove(a),delete r.callbacks[o],n.callback(e)},i.add(i.doc.body,"script",{id:a,src:n.url,type:"text/javascript"}),r.count++}}}),r(Ct,[],function(){function e(){s=[];for(var e in a)s.push(e);i.length=s.length}function n(){function n(e){var n,r;return r=e!==t?u+e:i.indexOf(",",u),-1===r||r>i.length?null:(n=i.substring(u,r),u=r+1,n)}var r,i,s,u=0;if(a={},c){o.load(l),i=o.getAttribute(l)||"";do{var d=n();if(null===d)break;if(r=n(parseInt(d,32)||0),null!==r){if(d=n(),null===d)break;s=n(parseInt(d,32)||0),r&&(a[r]=s)}}while(null!==r);e()}}function r(){var t,n="";if(c){for(var r in a)t=a[r],n+=(n?",":"")+r.length.toString(32)+","+r+","+t.length.toString(32)+","+t;o.setAttribute(l,n);try{o.save(l)}catch(i){}e()}}var i,o,a,s,l,c;try{if(window.localStorage)return localStorage}catch(u){}return l="tinymce",o=document.documentElement,c=!!o.addBehavior,c&&o.addBehavior("#default#userData"),i={key:function(e){return s[e]},getItem:function(e){return e in a?a[e]:null},setItem:function(e,t){a[e]=""+t,r()},removeItem:function(e){delete a[e],r()},clear:function(){a={},r()}},n(),i}),r(xt,[y,l,b,C,u,d],function(e,t,n,r,i,o){var a=window.tinymce;return a.DOM=e.DOM,a.ScriptLoader=n.ScriptLoader,a.PluginManager=r.PluginManager,a.ThemeManager=r.ThemeManager,a.dom=a.dom||{},a.dom.Event=t.Event,i.each(i,function(e,t){a[t]=e}),i.each("isOpera isWebKit isIE isGecko isMac".split(" "),function(e){a[e]=o[e.substr(2).toLowerCase()]}),{}}),r(wt,[U,u],function(e,t){return e.extend({Defaults:{firstControlClass:"first",lastControlClass:"last"},init:function(e){this.settings=t.extend({},this.Defaults,e)},preRender:function(e){e.addClass(this.settings.containerClass,"body")},applyClasses:function(e){var t=this,n=t.settings,r,i,o;r=e.items().filter(":visible"),i=n.firstControlClass,o=n.lastControlClass,r.each(function(e){e.removeClass(i).removeClass(o),n.controlClass&&e.addClass(n.controlClass)}),r.eq(0).addClass(i),r.eq(-1).addClass(o)},renderHtml:function(e){var t=this,n=t.settings,r,i="";return r=e.items(),r.eq(0).addClass(n.firstControlClass),r.eq(-1).addClass(n.lastControlClass),r.each(function(e){n.controlClass&&e.addClass(n.controlClass),i+=e.renderHtml()}),i},recalc:function(){},postRender:function(){}})}),r(_t,[wt],function(e){return e.extend({Defaults:{containerClass:"abs-layout",controlClass:"abs-layout-item"},recalc:function(e){e.items().filter(":visible").each(function(e){var t=e.settings;e.layoutRect({x:t.x,y:t.y,w:t.w,h:t.h}),e.recalc&&e.recalc()})},renderHtml:function(e){return'<div id="'+e._id+'-absend" class="'+e.classPrefix+'abs-end"></div>'+this._super(e)}})}),r(Et,[K,tt],function(e,t){return e.extend({Mixins:[t],Defaults:{classes:"widget tooltip tooltip-n"},text:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().lastChild.innerHTML=t.encode(e)),t):t._value},renderHtml:function(){var e=this,t=e.classPrefix;return'<div id="'+e._id+'" class="'+e.classes()+'" role="presentation"><div class="'+t+'tooltip-arrow"></div><div class="'+t+'tooltip-inner">'+e.encode(e._text)+"</div></div>"},repaint:function(){var e=this,t,n;t=e.getEl().style,n=e._layoutRect,t.left=n.x+"px",t.top=n.y+"px",t.zIndex=131070}})}),r(Nt,[K,Et],function(e,t){var n,r=e.extend({init:function(e){var t=this;t._super(e),e=t.settings,t.canFocus=!0,e.tooltip&&r.tooltips!==!1&&(t.on("mouseenter",function(n){var r=t.tooltip().moveTo(-65535);if(n.control==t){var i=r.text(e.tooltip).show().testMoveRel(t.getEl(),["bc-tc","bc-tl","bc-tr"]);r.toggleClass("tooltip-n","bc-tc"==i),r.toggleClass("tooltip-nw","bc-tl"==i),r.toggleClass("tooltip-ne","bc-tr"==i),r.moveRel(t.getEl(),i)}else r.hide()}),t.on("mouseleave mousedown click",function(){t.tooltip().hide()})),t.aria("label",e.ariaLabel||e.tooltip)},tooltip:function(){return n||(n=new t({type:"tooltip"}),n.renderTo()),n},active:function(e){var t=this,n;return e!==n&&(t.aria("pressed",e),t.toggleClass("active",e)),t._super(e)},disabled:function(e){var t=this,n;return e!==n&&(t.aria("disabled",e),t.toggleClass("disabled",e)),t._super(e)},postRender:function(){var e=this,t=e.settings;e._rendered=!0,e._super(),e.parent()||!t.width&&!t.height||(e.initLayoutRect(),e.repaint()),t.autofocus&&e.focus()},remove:function(){this._super(),n&&(n.remove(),n=null)}});return r}),r(kt,[Nt],function(e){return e.extend({Defaults:{classes:"widget btn",role:"button"},init:function(e){var t=this,n;t.on("click mousedown",function(e){e.preventDefault()}),t._super(e),n=e.size,e.subtype&&t.addClass(e.subtype),n&&t.addClass("btn-"+n)},icon:function(e){var t=this,n=t.classPrefix;if("undefined"==typeof e)return t.settings.icon;if(t.settings.icon=e,e=e?n+"ico "+n+"i-"+t.settings.icon:"",t._rendered){var r=t.getEl().firstChild,i=r.getElementsByTagName("i")[0];e?(i&&i==r.firstChild||(i=document.createElement("i"),r.insertBefore(i,r.firstChild)),i.className=e):i&&r.removeChild(i),t.text(t._text)}return t},repaint:function(){var e=this.getEl().firstChild.style;e.width=e.height="100%",this._super()},text:function(e){var t=this;if(t._rendered){var n=t.getEl().lastChild.lastChild;n&&(n.data=t.translate(e))}return t._super(e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon,i;return i=e.settings.image,i?(r="none","string"!=typeof i&&(i=window.getSelection?i[0]:i[1]),i=" style=\"background-image: url('"+i+"')\""):i="",r=e.settings.icon?n+"ico "+n+"i-"+r:"",'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1" aria-labelledby="'+t+'"><button role="presentation" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+(e._text?(r?"\xa0":"")+e.encode(e._text):"")+"</button></div>"
}})}),r(St,[J],function(e){return e.extend({Defaults:{defaultType:"button",role:"group"},renderHtml:function(){var e=this,t=e._layout;return e.addClass("btn-group"),e.preRender(),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'"><div id="'+e._id+'-body">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(Tt,[Nt],function(e){return e.extend({Defaults:{classes:"checkbox",role:"checkbox",checked:!1},init:function(e){var t=this;t._super(e),t.on("click mousedown",function(e){e.preventDefault()}),t.on("click",function(e){e.preventDefault(),t.disabled()||t.checked(!t.checked())}),t.checked(t.settings.checked)},checked:function(e){var t=this;return"undefined"!=typeof e?(e?t.addClass("checked"):t.removeClass("checked"),t._checked=e,t.aria("checked",e),t):t._checked},value:function(e){return this.checked(e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix;return'<div id="'+t+'" class="'+e.classes()+'" unselectable="on" aria-labelledby="'+t+'-al" tabindex="-1"><i class="'+n+"ico "+n+'i-checkbox"></i><span id="'+t+'-al" class="'+n+'label">'+e.encode(e._text)+"</span></div>"}})}),r(Rt,[Nt,G,Y],function(e,t,n){return e.extend({init:function(e){var t=this;t._super(e),t.addClass("combobox"),t.subinput=!0,t.ariaTarget="inp",e=t.settings,e.menu=e.menu||e.values,e.menu&&(e.icon="caret"),t.on("click",function(n){for(var r=n.target,i=t.getEl();r&&r!=i;)r.id&&-1!=r.id.indexOf("-open")&&(t.fire("action"),e.menu&&(t.showMenu(),n.aria&&t.menu.items()[0].focus())),r=r.parentNode}),t.on("keydown",function(e){"INPUT"==e.target.nodeName&&13==e.keyCode&&t.parents().reverse().each(function(n){return e.preventDefault(),t.fire("change"),n.hasEventListeners("submit")&&n.toJSON?(n.fire("submit",{data:n.toJSON()}),!1):void 0})}),e.placeholder&&(t.addClass("placeholder"),t.on("focusin",function(){t._hasOnChange||(n.on(t.getEl("inp"),"change",function(){t.fire("change")}),t._hasOnChange=!0),t.hasClass("placeholder")&&(t.getEl("inp").value="",t.removeClass("placeholder"))}),t.on("focusout",function(){0===t.value().length&&(t.getEl("inp").value=e.placeholder,t.addClass("placeholder"))}))},showMenu:function(){var e=this,n=e.settings,r;e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(e.getContainerElm()),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control===e.menu&&e.focus()}),e.menu.on("show hide",function(t){t.control.items().each(function(t){t.active(t.value()==e.value())})}).fire("show"),e.menu.on("select",function(t){e.value(t.control.value())}),e.on("focusin",function(t){"INPUT"==t.target.tagName.toUpperCase()&&e.menu.hide()}),e.aria("expanded",!0)),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),e.menu.moveRel(e.getEl(),e.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"])},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t.removeClass("placeholder"),t._rendered&&(t.getEl("inp").value=e),t):t._rendered?(e=t.getEl("inp").value,e!=t.settings.placeholder?e:""):t._value},disabled:function(e){var t=this;return t._rendered&&"undefined"!=typeof e&&(t.getEl("inp").disabled=e),t._super(e)},focus:function(){this.getEl("inp").focus()},repaint:function(){var e=this,t=e.getEl(),r=e.getEl("open"),i=e.layoutRect(),o,a;o=r?i.w-n.getSize(r).width-10:i.w-10;var s=document;return s.all&&(!s.documentMode||s.documentMode<=8)&&(a=e.layoutRect().h-2+"px"),n.css(t.firstChild,{width:o,lineHeight:a}),e._super(),e},postRender:function(){var e=this;return n.on(this.getEl("inp"),"change",function(){e.fire("change")}),e._super()},remove:function(){n.off(this.getEl("inp")),this._super()},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.classPrefix,i=n.value||n.placeholder||"",o,a,s="",l="";return"spellcheck"in n&&(l+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(l+=' maxlength="'+n.maxLength+'"'),n.size&&(l+=' size="'+n.size+'"'),n.subtype&&(l+=' type="'+n.subtype+'"'),e.disabled()&&(l+=' disabled="disabled"'),o=n.icon,o&&"caret"!=o&&(o=r+"ico "+r+"i-"+n.icon),a=e._text,(o||a)&&(s='<div id="'+t+'-open" class="'+r+"btn "+r+'open" tabIndex="-1" role="button"><button id="'+t+'-action" type="button" hidefocus="1" tabindex="-1">'+("caret"!=o?'<i class="'+o+'"></i>':'<i class="'+r+'caret"></i>')+(a?(o?" ":"")+a:"")+"</button></div>",e.addClass("has-open")),'<div id="'+t+'" class="'+e.classes()+'"><input id="'+t+'-inp" class="'+r+"textbox "+r+'placeholder" value="'+i+'" hidefocus="1"'+l+" />"+s+"</div>"}})}),r(At,[Rt],function(e){return e.extend({init:function(e){var t=this;e.spellcheck=!1,e.icon="none",t._super(e),t.addClass("colorbox"),t.on("change keyup postrender",function(){t.repaintColor(t.value())})},repaintColor:function(e){this.getEl().getElementsByTagName("i")[0].style.background=e},value:function(e){var t=this;return"undefined"!=typeof e&&t._rendered&&t.repaintColor(e),t._super(e)}})}),r(Bt,[kt,rt],function(e,t){return e.extend({showPanel:function(){var e=this,n=e.settings;if(e.active(!0),e.panel)e.panel.show();else{var r=n.panel;r.type&&(r={layout:"grid",items:r}),r.role=r.role||"dialog",r.popover=!0,r.autohide=!0,r.ariaRoot=!0,e.panel=new t(r).on("hide",function(){e.active(!1)}).on("cancel",function(t){t.stopPropagation(),e.focus(),e.hidePanel()}).parent(e).renderTo(e.getContainerElm()),e.panel.fire("show"),e.panel.reflow()}e.panel.moveRel(e.getEl(),n.popoverAlign||(e.isRtl()?["bc-tr","bc-tc"]:["bc-tl","bc-tc"]))},hidePanel:function(){var e=this;e.panel&&e.panel.hide()},postRender:function(){var e=this;return e.aria("haspopup",!0),e.on("click",function(t){t.control===e&&(e.panel&&e.panel.visible()?e.hidePanel():(e.showPanel(),e.panel.focus(!!t.aria)))}),e._super()},remove:function(){return this.panel&&(this.panel.remove(),this.panel=null),this._super()}})}),r(Dt,[Bt,y],function(e,t){var n=t.DOM;return e.extend({init:function(e){this._super(e),this.addClass("colorbutton")},color:function(e){return e?(this._color=e,this.getEl("preview").style.backgroundColor=e,this):this._color},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"",i=e.settings.image?" style=\"background-image: url('"+e.settings.image+"')\"":"";return'<div id="'+t+'" class="'+e.classes()+'" role="button" tabindex="-1" aria-haspopup="true"><button role="presentation" hidefocus="1" type="button" tabindex="-1">'+(r?'<i class="'+r+'"'+i+"></i>":"")+'<span id="'+t+'-preview" class="'+n+'preview"></span>'+(e._text?(r?" ":"")+e._text:"")+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1"> <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(r){r.aria&&"down"==r.aria.key||r.control!=e||n.getParent(r.target,"."+e.classPrefix+"open")||(r.stopImmediatePropagation(),t.call(e,r))}),delete e.settings.onclick,e._super()}})}),r(Lt,[],function(){function e(e){function i(e,i,o){var a,s,l,c,u,d;return a=0,s=0,l=0,e/=255,i/=255,o/=255,u=t(e,t(i,o)),d=n(e,n(i,o)),u==d?(l=u,{h:0,s:0,v:100*l}):(c=e==u?i-o:o==u?e-i:o-e,a=e==u?3:o==u?1:5,a=60*(a-c/(d-u)),s=(d-u)/d,l=d,{h:r(a),s:r(100*s),v:r(100*l)})}function o(e,i,o){var a,s,l,c;if(e=(parseInt(e,10)||0)%360,i=parseInt(i,10)/100,o=parseInt(o,10)/100,i=n(0,t(i,1)),o=n(0,t(o,1)),0===i)return void(d=f=p=r(255*o));switch(a=e/60,s=o*i,l=s*(1-Math.abs(a%2-1)),c=o-s,Math.floor(a)){case 0:d=s,f=l,p=0;break;case 1:d=l,f=s,p=0;break;case 2:d=0,f=s,p=l;break;case 3:d=0,f=l,p=s;break;case 4:d=l,f=0,p=s;break;case 5:d=s,f=0,p=l;break;default:d=f=p=0}d=r(255*(d+c)),f=r(255*(f+c)),p=r(255*(p+c))}function a(){function e(e){return e=parseInt(e,10).toString(16),e.length>1?e:"0"+e}return"#"+e(d)+e(f)+e(p)}function s(){return{r:d,g:f,b:p}}function l(){return i(d,f,p)}function c(e){var t;return"object"==typeof e?"r"in e?(d=e.r,f=e.g,p=e.b):"v"in e&&o(e.h,e.s,e.v):(t=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(e))?(d=parseInt(t[1],10),f=parseInt(t[2],10),p=parseInt(t[3],10)):(t=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(e))?(d=parseInt(t[1],16),f=parseInt(t[2],16),p=parseInt(t[3],16)):(t=/#([0-F])([0-F])([0-F])/gi.exec(e))&&(d=parseInt(t[1]+t[1],16),f=parseInt(t[2]+t[2],16),p=parseInt(t[3]+t[3],16)),d=0>d?0:d>255?255:d,f=0>f?0:f>255?255:f,p=0>p?0:p>255?255:p,u}var u=this,d=0,f=0,p=0;e&&c(e),u.toRgb=s,u.toHsv=l,u.toHex=a,u.parse=c}var t=Math.min,n=Math.max,r=Math.round;return e}),r(Ht,[Nt,Q,Y,Lt],function(e,t,n,r){return e.extend({Defaults:{classes:"widget colorpicker"},init:function(e){this._super(e)},postRender:function(){function e(e,t){var r=n.getPos(e),i,o;return i=t.pageX-r.x,o=t.pageY-r.y,i=Math.max(0,Math.min(i/e.clientWidth,1)),o=Math.max(0,Math.min(o/e.clientHeight,1)),{x:i,y:o}}function i(e,t){var i=(360-e.h)/360;n.css(d,{top:100*i+"%"}),t||n.css(p,{left:e.s+"%",top:100-e.v+"%"}),f.style.background=new r({s:100,v:100,h:e.h}).toHex(),s.color().parse({s:e.s,v:e.v,h:e.h})}function o(t){var n;n=e(f,t),c.s=100*n.x,c.v=100*(1-n.y),i(c),s.fire("change")}function a(t){var n;n=e(u,t),c=l.toHsv(),c.h=360*(1-n.y),i(c,!0),s.fire("change")}var s=this,l=s.color(),c,u,d,f,p;u=s.getEl("h"),d=s.getEl("hp"),f=s.getEl("sv"),p=s.getEl("svp"),s._repaint=function(){c=l.toHsv(),i(c)},s._super(),s._svdraghelper=new t(s._id+"-sv",{start:o,drag:o}),s._hdraghelper=new t(s._id+"-h",{start:a,drag:a}),s._repaint()},rgb:function(){return this.color().toRgb()},value:function(e){var t=this;return arguments.length?(t.color().parse(e),void(t._rendered&&t._repaint())):t.color().toHex()},color:function(){return this._color||(this._color=new r),this._color},renderHtml:function(){function e(){var e,t,n="",i,a;for(i="filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=",a=o.split(","),e=0,t=a.length-1;t>e;e++)n+='<div class="'+r+'colorpicker-h-chunk" style="height:'+100/t+"%;"+i+a[e]+",endColorstr="+a[e+1]+");-ms-"+i+a[e]+",endColorstr="+a[e+1]+')"></div>';return n}var t=this,n=t._id,r=t.classPrefix,i,o="#ff0000,#ff0080,#ff00ff,#8000ff,#0000ff,#0080ff,#00ffff,#00ff80,#00ff00,#80ff00,#ffff00,#ff8000,#ff0000",a="background: -ms-linear-gradient(top,"+o+");background: linear-gradient(to bottom,"+o+");";return i='<div id="'+n+'-h" class="'+r+'colorpicker-h" style="'+a+'">'+e()+'<div id="'+n+'-hp" class="'+r+'colorpicker-h-marker"></div></div>','<div id="'+n+'" class="'+t.classes()+'"><div id="'+n+'-sv" class="'+r+'colorpicker-sv"><div class="'+r+'colorpicker-overlay1"><div class="'+r+'colorpicker-overlay2"><div id="'+n+'-svp" class="'+r+'colorpicker-selector1"><div class="'+r+'colorpicker-selector2"></div></div></div></div></div>'+i+"</div>"}})}),r(Mt,[Nt],function(e){return e.extend({init:function(e){var t=this;e.delimiter||(e.delimiter="\xbb"),t._super(e),t.addClass("path"),t.canFocus=!0,t.on("click",function(e){var n,r=e.target;(n=r.getAttribute("data-index"))&&t.fire("select",{value:t.data()[n],index:n})})},focus:function(){var e=this;return e.getEl().firstChild.focus(),e},data:function(e){var t=this;return"undefined"!=typeof e?(t._data=e,t.update(),t):t._data},update:function(){this.innerHtml(this._getPathHtml())},postRender:function(){var e=this;e._super(),e.data(e.settings.data)},renderHtml:function(){var e=this;return'<div id="'+e._id+'" class="'+e.classes()+'">'+e._getPathHtml()+"</div>"},_getPathHtml:function(){var e=this,t=e._data||[],n,r,i="",o=e.classPrefix;for(n=0,r=t.length;r>n;n++)i+=(n>0?'<div class="'+o+'divider" aria-hidden="true"> '+e.settings.delimiter+" </div>":"")+'<div role="button" class="'+o+"path-item"+(n==r-1?" "+o+"last":"")+'" data-index="'+n+'" tabindex="-1" id="'+e._id+"-"+n+'" aria-level="'+n+'">'+t[n].name+"</div>";return i||(i='<div class="'+o+'path-item">\xa0</div>'),i}})}),r(Pt,[Mt,ht],function(e,t){return e.extend({postRender:function(){function e(e){if(1===e.nodeType){if("BR"==e.nodeName||e.getAttribute("data-mce-bogus"))return!0;if("bookmark"===e.getAttribute("data-mce-type"))return!0}return!1}var n=this,r=t.activeEditor;return n.on("select",function(e){r.focus(),r.selection.select(this.data()[e.index].element),r.nodeChanged()}),r.on("nodeChange",function(t){for(var i=[],o=t.parents,a=o.length;a--;)if(1==o[a].nodeType&&!e(o[a])){var s=r.fire("ResolveName",{name:o[a].nodeName.toLowerCase(),target:o[a]});if(s.isDefaultPrevented()||i.push({name:s.name,element:o[a]}),s.isPropagationStopped())break}n.data(i)}),n._super()}})}),r(Ot,[J],function(e){return e.extend({Defaults:{layout:"flex",align:"center",defaults:{flex:1}},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.addClass("formitem"),t.preRender(e),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<div id="'+e._id+'-title" class="'+n+'title">'+e.settings.title+"</div>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></div>"}})}),r(It,[J,Ot,u],function(e,t,n){return e.extend({Defaults:{containerCls:"form",layout:"flex",direction:"column",align:"stretch",flex:1,padding:20,labelGap:30,spacing:10,callbacks:{submit:function(){this.submit()}}},preRender:function(){var e=this,r=e.items();e.settings.formItemDefaults||(e.settings.formItemDefaults={layout:"flex",autoResize:"overflow",defaults:{flex:1}}),r.each(function(r){var i,o=r.settings.label;o&&(i=new t(n.extend({items:{type:"label",id:r._id+"-l",text:o,flex:0,forId:r._id,disabled:r.disabled()}},e.settings.formItemDefaults)),i.type="formitem",r.aria("labelledby",r._id+"-l"),"undefined"==typeof r.settings.flex&&(r.settings.flex=1),e.replace(r,i),i.add(r))})},recalcLabels:function(){var e=this,t=0,n=[],r,i,o;if(e.settings.labelGapCalc!==!1)for(o="children"==e.settings.labelGapCalc?e.find("formitem"):e.items(),o.filter("formitem").each(function(e){var r=e.items()[0],i=r.getEl().clientWidth;t=i>t?i:t,n.push(r)}),i=e.settings.labelGap||0,r=n.length;r--;)n[r].settings.minWidth=t+i},visible:function(e){var t=this._super(e);return e===!0&&this._rendered&&this.recalcLabels(),t},submit:function(){return this.fire("submit",{data:this.toJSON()})},postRender:function(){var e=this;e._super(),e.recalcLabels(),e.fromJSON(e.settings.data)}})}),r(Ft,[It],function(e){return e.extend({Defaults:{containerCls:"fieldset",layout:"flex",direction:"column",align:"stretch",flex:1,padding:"25 15 5 15",labelGap:30,spacing:10,border:1},renderHtml:function(){var e=this,t=e._layout,n=e.classPrefix;return e.preRender(),t.preRender(e),'<fieldset id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1">'+(e.settings.title?'<legend id="'+e._id+'-title" class="'+n+'fieldset-title">'+e.settings.title+"</legend>":"")+'<div id="'+e._id+'-body" class="'+e.classes("body")+'">'+(e.settings.html||"")+t.renderHtml(e)+"</div></fieldset>"}})}),r(zt,[Rt,u],function(e,t){return e.extend({init:function(e){var n=this,r=tinymce.activeEditor,i=r.settings,o,a,s;e.spellcheck=!1,s=i.file_picker_types||i.file_browser_callback_types,s&&(s=t.makeMap(s,/[, ]/)),(!s||s[e.filetype])&&(a=i.file_picker_callback,!a||s&&!s[e.filetype]?(a=i.file_browser_callback,!a||s&&!s[e.filetype]||(o=function(){a(n.getEl("inp").id,n.value(),e.filetype,window)})):o=function(){var i=n.fire("beforecall").meta;i=t.extend({filetype:e.filetype},i),a.call(r,function(e,t){n.value(e).fire("change",{meta:t})},n.value(),i)}),o&&(e.icon="browse",e.onaction=o),n._super(e)}})}),r(Wt,[_t],function(e){return e.extend({recalc:function(e){var t=e.layoutRect(),n=e.paddingBox();e.items().filter(":visible").each(function(e){e.layoutRect({x:n.left,y:n.top,w:t.innerW-n.right-n.left,h:t.innerH-n.top-n.bottom}),e.recalc&&e.recalc()})}})}),r(Vt,[_t],function(e){return e.extend({recalc:function(e){var t,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v=[],y,b,C,x,w,_,E,N,k,S,T,R,A,B,D,L,H,M,P,O,I,F,z=Math.max,W=Math.min;for(r=e.items().filter(":visible"),i=e.layoutRect(),o=e._paddingBox,a=e.settings,f=e.isRtl()?a.direction||"row-reversed":a.direction,s=a.align,l=e.isRtl()?a.pack||"end":a.pack,c=a.spacing||0,("row-reversed"==f||"column-reverse"==f)&&(r=r.set(r.toArray().reverse()),f=f.split("-")[0]),"column"==f?(k="y",E="h",N="minH",S="maxH",R="innerH",T="top",A="deltaH",B="contentH",P="left",H="w",D="x",L="innerW",M="minW",O="right",I="deltaW",F="contentW"):(k="x",E="w",N="minW",S="maxW",R="innerW",T="left",A="deltaW",B="contentW",P="top",H="h",D="y",L="innerH",M="minH",O="bottom",I="deltaH",F="contentH"),d=i[R]-o[T]-o[T],_=u=0,t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),m=p.settings,g=m.flex,d-=n-1>t?c:0,g>0&&(u+=g,h[S]&&v.push(p),h.flex=g),d-=h[N],y=o[P]+h[M]+o[O],y>_&&(_=y);if(x={},x[N]=0>d?i[N]-d+i[A]:i[R]-d+i[A],x[M]=_+i[I],x[B]=i[R]-d,x[F]=_,x.minW=W(x.minW,i.maxW),x.minH=W(x.minH,i.maxH),x.minW=z(x.minW,i.startMinWidth),x.minH=z(x.minH,i.startMinHeight),!i.autoResize||x.minW==i.minW&&x.minH==i.minH){for(C=d/u,t=0,n=v.length;n>t;t++)p=v[t],h=p.layoutRect(),b=h[S],y=h[N]+h.flex*C,y>b?(d-=h[S]-h[N],u-=h.flex,h.flex=0,h.maxFlexSize=b):h.maxFlexSize=0;for(C=d/u,w=o[T],x={},0===u&&("end"==l?w=d+o[T]:"center"==l?(w=Math.round(i[R]/2-(i[R]-d)/2)+o[T],0>w&&(w=o[T])):"justify"==l&&(w=o[T],c=Math.floor(d/(r.length-1)))),x[D]=o[P],t=0,n=r.length;n>t;t++)p=r[t],h=p.layoutRect(),y=h.maxFlexSize||h[N],"center"===s?x[D]=Math.round(i[L]/2-h[H]/2):"stretch"===s?(x[H]=z(h[M]||0,i[L]-o[P]-o[O]),x[D]=o[P]):"end"===s&&(x[D]=i[L]-h[H]-o.top),h.flex>0&&(y+=h.flex*C),x[E]=y,x[k]=w,p.layoutRect(x),p.recalc&&p.recalc(),w+=y+c}else if(x.w=x.minW,x.h=x.minH,e.layoutRect(x),this.recalc(e),null===e._lastRect){var V=e.parent();V&&(V._lastRect=null,V.recalc())}}})}),r(Ut,[wt],function(e){return e.extend({Defaults:{containerClass:"flow-layout",controlClass:"flow-layout-item",endClass:"break"},recalc:function(e){e.items().filter(":visible").each(function(e){e.recalc&&e.recalc()})}})}),r($t,[K,Nt,rt,u,ht,d],function(e,t,n,r,i,o){function a(e){function t(t,n){return function(){var r=this;e.on("nodeChange",function(i){var o=e.formatter,a=null;s(i.parents,function(e){return s(t,function(t){return n?o.matchNode(e,n,{value:t.value})&&(a=t.value):o.matchNode(e,t.value)&&(a=t.value),a?!1:void 0}),a?!1:void 0}),r.value(a)})}}function r(e){e=e.replace(/;$/,"").split(";");for(var t=e.length;t--;)e[t]=e[t].split("=");return e}function i(){function t(e){var n=[];if(e)return s(e,function(e){var o={text:e.title,icon:e.icon};if(e.items)o.menu=t(e.items);else{var a=e.format||"custom"+r++;e.format||(e.name=a,i.push(e)),o.format=a,o.cmd=e.cmd}n.push(o)}),n}function n(){var n;return n=t(e.settings.style_formats_merge?e.settings.style_formats?o.concat(e.settings.style_formats):o:e.settings.style_formats||o)}var r=0,i=[],o=[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",icon:"bold",format:"bold"},{title:"Italic",icon:"italic",format:"italic"},{title:"Underline",icon:"underline",format:"underline"},{title:"Strikethrough",icon:"strikethrough",format:"strikethrough"},{title:"Superscript",icon:"superscript",format:"superscript"},{title:"Subscript",icon:"subscript",format:"subscript"},{title:"Code",icon:"code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",format:"alignleft"},{title:"Center",icon:"aligncenter",format:"aligncenter"},{title:"Right",icon:"alignright",format:"alignright"},{title:"Justify",icon:"alignjustify",format:"alignjustify"}]}];return e.on("init",function(){s(i,function(t){e.formatter.register(t.name,t)})}),{type:"menu",items:n(),onPostRender:function(t){e.fire("renderFormatsMenu",{control:t.control})},itemDefaults:{preview:!0,textStyle:function(){return this.settings.format?e.formatter.getCssText(this.settings.format):void 0},onPostRender:function(){var t=this;t.parent().on("show",function(){var n,r;n=t.settings.format,n&&(t.disabled(!e.formatter.canApply(n)),t.active(e.formatter.match(n))),r=t.settings.cmd,r&&t.active(e.queryCommandState(r))})},onclick:function(){this.settings.format&&l(this.settings.format),this.settings.cmd&&e.execCommand(this.settings.cmd)}}}}function o(t){return function(){function n(){return e.undoManager?e.undoManager[t]():!1}var r=this;t="redo"==t?"hasRedo":"hasUndo",r.disabled(!n()),e.on("Undo Redo AddUndo TypingUndo ClearUndos",function(){r.disabled(!n())})}}function a(){var t=this;e.on("VisualAid",function(e){t.active(e.hasVisual)}),t.active(e.hasVisual)}function l(t){t.control&&(t=t.control.value()),t&&e.execCommand("mceToggleFormat",!1,t)}var c;c=i(),s({bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",subscript:"Subscript",superscript:"Superscript"},function(t,n){e.addButton(n,{tooltip:t,onPostRender:function(){var t=this;e.formatter?e.formatter.formatChanged(n,function(e){t.active(e)}):e.on("init",function(){e.formatter.formatChanged(n,function(e){t.active(e)})})},onclick:function(){l(n)}})}),s({outdent:["Decrease indent","Outdent"],indent:["Increase indent","Indent"],cut:["Cut","Cut"],copy:["Copy","Copy"],paste:["Paste","Paste"],help:["Help","mceHelp"],selectall:["Select all","SelectAll"],removeformat:["Clear formatting","RemoveFormat"],visualaid:["Visual aids","mceToggleVisualAid"],newdocument:["New document","mceNewDocument"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1]})}),s({blockquote:["Blockquote","mceBlockQuote"],numlist:["Numbered list","InsertOrderedList"],bullist:["Bullet list","InsertUnorderedList"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],alignleft:["Align left","JustifyLeft"],aligncenter:["Align center","JustifyCenter"],alignright:["Align right","JustifyRight"],alignjustify:["Justify","JustifyFull"]},function(t,n){e.addButton(n,{tooltip:t[0],cmd:t[1],onPostRender:function(){var t=this;e.formatter?e.formatter.formatChanged(n,function(e){t.active(e)}):e.on("init",function(){e.formatter.formatChanged(n,function(e){t.active(e)})})}})}),e.addButton("undo",{tooltip:"Undo",onPostRender:o("undo"),cmd:"undo"}),e.addButton("redo",{tooltip:"Redo",onPostRender:o("redo"),cmd:"redo"}),e.addMenuItem("newdocument",{text:"New document",shortcut:"Ctrl+N",icon:"newdocument",cmd:"mceNewDocument"}),e.addMenuItem("undo",{text:"Undo",icon:"undo",shortcut:"Ctrl+Z",onPostRender:o("undo"),cmd:"undo"}),e.addMenuItem("redo",{text:"Redo",icon:"redo",shortcut:"Ctrl+Y",onPostRender:o("redo"),cmd:"redo"}),e.addMenuItem("visualaid",{text:"Visual aids",selectable:!0,onPostRender:a,cmd:"mceToggleVisualAid"}),s({cut:["Cut","Cut","Ctrl+X"],copy:["Copy","Copy","Ctrl+C"],paste:["Paste","Paste","Ctrl+V"],selectall:["Select all","SelectAll","Ctrl+A"],bold:["Bold","Bold","Ctrl+B"],italic:["Italic","Italic","Ctrl+I"],underline:["Underline","Underline"],strikethrough:["Strikethrough","Strikethrough"],subscript:["Subscript","Subscript"],superscript:["Superscript","Superscript"],removeformat:["Clear formatting","RemoveFormat"]},function(t,n){e.addMenuItem(n,{text:t[0],icon:n,shortcut:t[2],cmd:t[1]})}),e.on("mousedown",function(){n.hideAll()}),e.addButton("styleselect",{type:"menubutton",text:"Formats",menu:c}),e.addButton("formatselect",function(){var n=[],i=r(e.settings.block_formats||"Paragraph=p;Address=address;Pre=pre;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6");return s(i,function(t){n.push({text:t[0],value:t[1],textStyle:function(){return e.formatter.getCssText(t[1])}})}),{type:"listbox",text:i[0][0],values:n,fixedWidth:!0,onselect:l,onPostRender:t(n)}}),e.addButton("fontselect",function(){var n="Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",i=[],o=r(e.settings.font_formats||n);return s(o,function(e){i.push({text:{raw:e[0]},value:e[1],textStyle:-1==e[1].indexOf("dings")?"font-family:"+e[1]:""})}),{type:"listbox",text:"Font Family",tooltip:"Font Family",values:i,fixedWidth:!0,onPostRender:t(i,"fontname"),onselect:function(t){t.control.settings.value&&e.execCommand("FontName",!1,t.control.settings.value)}}}),e.addButton("fontsizeselect",function(){var n=[],r="8pt 10pt 12pt 14pt 18pt 24pt 36pt",i=e.settings.fontsize_formats||r;return s(i.split(" "),function(e){var t=e,r=e,i=e.split("=");i.length>1&&(t=i[0],r=i[1]),n.push({text:t,value:r})}),{type:"listbox",text:"Font Sizes",tooltip:"Font Sizes",values:n,fixedWidth:!0,onPostRender:t(n,"fontsize"),onclick:function(t){t.control.settings.value&&e.execCommand("FontSize",!1,t.control.settings.value)}}}),e.addMenuItem("formats",{text:"Formats",menu:c})}var s=r.each;i.on("AddEditor",function(t){t.editor.rtl&&(e.rtl=!0),a(t.editor)}),e.translate=function(e){return i.translate(e)},t.tooltips=!o.iOS}),r(qt,[_t],function(e){return e.extend({recalc:function(e){var t=e.settings,n,r,i,o,a,s,l,c,u,d,f,p,h,m,g,v,y,b,C,x,w,_,E=[],N=[],k,S,T,R,A,B;t=e.settings,i=e.items().filter(":visible"),o=e.layoutRect(),r=t.columns||Math.ceil(Math.sqrt(i.length)),n=Math.ceil(i.length/r),y=t.spacingH||t.spacing||0,b=t.spacingV||t.spacing||0,C=t.alignH||t.align,x=t.alignV||t.align,g=e._paddingBox,A="reverseRows"in t?t.reverseRows:e.isRtl(),C&&"string"==typeof C&&(C=[C]),x&&"string"==typeof x&&(x=[x]);for(d=0;r>d;d++)E.push(0);for(f=0;n>f;f++)N.push(0);for(f=0;n>f;f++)for(d=0;r>d&&(u=i[f*r+d],u);d++)c=u.layoutRect(),k=c.minW,S=c.minH,E[d]=k>E[d]?k:E[d],N[f]=S>N[f]?S:N[f];for(T=o.innerW-g.left-g.right,w=0,d=0;r>d;d++)w+=E[d]+(d>0?y:0),T-=(d>0?y:0)+E[d];for(R=o.innerH-g.top-g.bottom,_=0,f=0;n>f;f++)_+=N[f]+(f>0?b:0),R-=(f>0?b:0)+N[f];if(w+=g.left+g.right,_+=g.top+g.bottom,l={},l.minW=w+(o.w-o.innerW),l.minH=_+(o.h-o.innerH),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH,l.minW=Math.min(l.minW,o.maxW),l.minH=Math.min(l.minH,o.maxH),l.minW=Math.max(l.minW,o.startMinWidth),l.minH=Math.max(l.minH,o.startMinHeight),!o.autoResize||l.minW==o.minW&&l.minH==o.minH){o.autoResize&&(l=e.layoutRect(l),l.contentW=l.minW-o.deltaW,l.contentH=l.minH-o.deltaH);var D;D="start"==t.packV?0:R>0?Math.floor(R/n):0;var L=0,H=t.flexWidths;if(H)for(d=0;d<H.length;d++)L+=H[d];else L=r;var M=T/L;for(d=0;r>d;d++)E[d]+=H?H[d]*M:M;for(h=g.top,f=0;n>f;f++){for(p=g.left,s=N[f]+D,d=0;r>d&&(B=A?f*r+r-1-d:f*r+d,u=i[B],u);d++)m=u.settings,c=u.layoutRect(),a=Math.max(E[d],c.startMinWidth),c.x=p,c.y=h,v=m.alignH||(C?C[d]||C[0]:null),"center"==v?c.x=p+a/2-c.w/2:"right"==v?c.x=p+a-c.w:"stretch"==v&&(c.w=a),v=m.alignV||(x?x[d]||x[0]:null),"center"==v?c.y=h+s/2-c.h/2:"bottom"==v?c.y=h+s-c.h:"stretch"==v&&(c.h=s),u.layoutRect(c),p+=a+y,u.recalc&&u.recalc();h+=s+b}}else if(l.w=l.minW,l.h=l.minH,e.layoutRect(l),this.recalc(e),null===e._lastRect){var P=e.parent();P&&(P._lastRect=null,P.recalc())}}})}),r(jt,[Nt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("iframe"),e.canFocus=!1,'<iframe id="'+e._id+'" class="'+e.classes()+'" tabindex="-1" src="'+(e.settings.url||"javascript:''")+'" frameborder="0"></iframe>'},src:function(e){this.getEl().src=e},html:function(e,t){var n=this,r=this.getEl().contentWindow.document.body;return r?(r.innerHTML=e,t&&t()):setTimeout(function(){n.html(e)},0),this}})}),r(Yt,[Nt,Y],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t.addClass("widget"),t.addClass("label"),t.canFocus=!1,e.multiline&&t.addClass("autoscroll"),e.strong&&t.addClass("strong")},initLayoutRect:function(){var e=this,n=e._super();if(e.settings.multiline){var r=t.getSize(e.getEl());r.width>n.maxW&&(n.minW=n.maxW,e.addClass("multiline")),e.getEl().style.width=n.minW+"px",n.startMinH=n.h=n.minH=Math.min(n.maxH,t.getSize(e.getEl()).height)}return n},repaint:function(){var e=this;return e.settings.multiline||(e.getEl().style.lineHeight=e.layoutRect().h+"px"),e._super()},text:function(e){var t=this;return t._rendered&&e&&this.innerHtml(t.encode(e)),t._super(e)},renderHtml:function(){var e=this,t=e.settings.forId;return'<label id="'+e._id+'" class="'+e.classes()+'"'+(t?' for="'+t+'"':"")+">"+e.encode(e._text)+"</label>"}})}),r(Kt,[J],function(e){return e.extend({Defaults:{role:"toolbar",layout:"flow"},init:function(e){var t=this;t._super(e),t.addClass("toolbar")},postRender:function(){var e=this;return e.items().addClass("toolbar-item"),e._super()}})}),r(Gt,[Kt],function(e){return e.extend({Defaults:{role:"menubar",containerCls:"menubar",ariaRoot:!0,defaults:{type:"menubutton"}}})}),r(Xt,[kt,G,Gt],function(e,t,n){function r(e,t){for(;e;){if(t===e)return!0;e=e.parentNode}return!1}var i=e.extend({init:function(e){var t=this;t._renderOpen=!0,t._super(e),t.addClass("menubtn"),e.fixedWidth&&t.addClass("fixed-width"),t.aria("haspopup",!0),t.hasPopup=!0},showMenu:function(){var e=this,n=e.settings,r;return e.menu&&e.menu.visible()?e.hideMenu():(e.menu||(r=n.menu||[],r.length?r={type:"menu",items:r}:r.type=r.type||"menu",e.menu=t.create(r).parent(e).renderTo(),e.fire("createmenu"),e.menu.reflow(),e.menu.on("cancel",function(t){t.control.parent()===e.menu&&(t.stopPropagation(),e.focus(),e.hideMenu())}),e.menu.on("select",function(){e.focus()}),e.menu.on("show hide",function(t){t.control==e.menu&&e.activeMenu("show"==t.type),e.aria("expanded","show"==t.type)}).fire("show")),e.menu.show(),e.menu.layoutRect({w:e.layoutRect().w}),void e.menu.moveRel(e.getEl(),e.isRtl()?["br-tr","tr-br"]:["bl-tl","tl-bl"]))},hideMenu:function(){var e=this;e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide())},activeMenu:function(e){this.toggleClass("active",e)},renderHtml:function(){var e=this,t=e._id,r=e.classPrefix,i=e.settings.icon?r+"ico "+r+"i-"+e.settings.icon:"";return e.aria("role",e.parent()instanceof n?"menuitem":"button"),'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1" aria-labelledby="'+t+'"><button id="'+t+'-open" role="presentation" type="button" tabindex="-1">'+(i?'<i class="'+i+'"></i>':"")+"<span>"+(e._text?(i?"\xa0":"")+e.encode(e._text):"")+'</span> <i class="'+r+'caret"></i></button></div>'},postRender:function(){var e=this;return e.on("click",function(t){t.control===e&&r(t.target,e.getEl())&&(e.showMenu(),t.aria&&e.menu.items()[0].focus())}),e.on("mouseenter",function(t){var n=t.control,r=e.parent(),o;n&&r&&n instanceof i&&n.parent()==r&&(r.items().filter("MenuButton").each(function(e){e.hideMenu&&e!=n&&(e.menu&&e.menu.visible()&&(o=!0),e.hideMenu())}),o&&(n.focus(),n.showMenu()))}),e._super()},text:function(e){var t=this,n,r;if(t._rendered)for(r=t.getEl("open").getElementsByTagName("span"),n=0;n<r.length;n++)r[n].innerHTML=(t.settings.icon&&e?"\xa0":"")+t.encode(e);return this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}});return i}),r(Jt,[Xt],function(e){return e.extend({init:function(e){function t(r){for(var a=0;a<r.length;a++){if(i=r[a].selected||e.value===r[a].value){o=o||r[a].text,n._value=r[a].value;break}r[a].menu&&t(r[a].menu)}}var n=this,r,i,o,a;n._values=r=e.values,r&&("undefined"!=typeof e.value&&t(r),!i&&r.length>0&&(o=r[0].text,n._value=r[0].value),e.menu=r),e.text=e.text||o||r[0].text,n._super(e),n.addClass("listbox"),n.on("select",function(t){var r=t.control;a&&(t.lastControl=a),e.multiple?r.active(!r.active()):n.value(t.control.settings.value),a=r})},value:function(e){function t(e,n){e.items().each(function(e){i=e.value()===n,i&&(o=o||e.text()),e.active(i),e.menu&&t(e.menu,n)})}function n(t){for(var r=0;r<t.length;r++)i=t[r].value==e,i&&(o=o||t[r].text),t[r].active=i,t[r].menu&&n(t[r].menu)}var r=this,i,o,a;return"undefined"!=typeof e&&(r.menu?t(r.menu,e):(a=r.settings.menu,n(a)),r.text(o||this.settings.text)),r._super(e)}})}),r(Qt,[Nt,G,d],function(e,t,n){return e.extend({Defaults:{border:0,role:"menuitem"},init:function(e){var t=this;
t.hasPopup=!0,t._super(e),e=t.settings,t.addClass("menu-item"),e.menu&&t.addClass("menu-item-expand"),e.preview&&t.addClass("menu-item-preview"),("-"===t._text||"|"===t._text)&&(t.addClass("menu-item-sep"),t.aria("role","separator"),t._text="-"),e.selectable&&(t.aria("role","menuitemcheckbox"),t.addClass("menu-item-checkbox"),e.icon="selected"),e.preview||e.selectable||t.addClass("menu-item-normal"),t.on("mousedown",function(e){e.preventDefault()}),e.menu&&!e.ariaHideMenu&&t.aria("haspopup",!0)},hasMenus:function(){return!!this.settings.menu},showMenu:function(){var e=this,n=e.settings,r,i=e.parent();if(i.items().each(function(t){t!==e&&t.hideMenu()}),n.menu){r=e.menu,r?r.show():(r=n.menu,r.length?r={type:"menu",items:r}:r.type=r.type||"menu",i.settings.itemDefaults&&(r.itemDefaults=i.settings.itemDefaults),r=e.menu=t.create(r).parent(e).renderTo(),r.reflow(),r.on("cancel",function(t){t.stopPropagation(),e.focus(),r.hide()}),r.on("show hide",function(e){e.control.items().each(function(e){e.active(e.settings.selected)})}).fire("show"),r.on("hide",function(t){t.control===r&&e.removeClass("selected")}),r.submenu=!0),r._parentMenu=i,r.addClass("menu-sub");var o=r.testMoveRel(e.getEl(),e.isRtl()?["tl-tr","bl-br","tr-tl","br-bl"]:["tr-tl","br-bl","tl-tr","bl-br"]);r.moveRel(e.getEl(),o),r.rel=o,o="menu-sub-"+o,r.removeClass(r._lastRel),r.addClass(o),r._lastRel=o,e.addClass("selected"),e.aria("expanded",!0)}},hideMenu:function(){var e=this;return e.menu&&(e.menu.items().each(function(e){e.hideMenu&&e.hideMenu()}),e.menu.hide(),e.aria("expanded",!1)),e},renderHtml:function(){var e=this,t=e._id,r=e.settings,i=e.classPrefix,o=e.encode(e._text),a=e.settings.icon,s="",l=r.shortcut;return a&&e.parent().addClass("menu-has-icons"),r.image&&(a="none",s=" style=\"background-image: url('"+r.image+"')\""),l&&n.mac&&(l=l.replace(/ctrl\+alt\+/i,"&#x2325;&#x2318;"),l=l.replace(/ctrl\+/i,"&#x2318;"),l=l.replace(/alt\+/i,"&#x2325;"),l=l.replace(/shift\+/i,"&#x21E7;")),a=i+"ico "+i+"i-"+(e.settings.icon||"none"),'<div id="'+t+'" class="'+e.classes()+'" tabindex="-1">'+("-"!==o?'<i class="'+a+'"'+s+"></i>\xa0":"")+("-"!==o?'<span id="'+t+'-text" class="'+i+'text">'+o+"</span>":"")+(l?'<div id="'+t+'-shortcut" class="'+i+'menu-shortcut">'+l+"</div>":"")+(r.menu?'<div class="'+i+'caret"></div>':"")+"</div>"},postRender:function(){var e=this,t=e.settings,n=t.textStyle;if("function"==typeof n&&(n=n.call(this)),n){var r=e.getEl("text");r&&r.setAttribute("style",n)}return e.on("mouseenter click",function(n){n.control===e&&(t.menu||"click"!==n.type?(e.showMenu(),n.aria&&e.menu.focus(!0)):(e.fire("select"),e.parent().hideAll()))}),e._super(),e},active:function(e){return"undefined"!=typeof e&&this.aria("checked",e),this._super(e)},remove:function(){this._super(),this.menu&&this.menu.remove()}})}),r(Zt,[rt,Qt,u],function(e,t,n){var r=e.extend({Defaults:{defaultType:"menuitem",border:1,layout:"stack",role:"application",bodyRole:"menu",ariaRoot:!0},init:function(e){var t=this;if(e.autohide=!0,e.constrainToViewport=!0,e.itemDefaults)for(var r=e.items,i=r.length;i--;)r[i]=n.extend({},e.itemDefaults,r[i]);t._super(e),t.addClass("menu")},repaint:function(){return this.toggleClass("menu-align",!0),this._super(),this.getEl().style.height="",this.getEl("body").style.height="",this},cancel:function(){var e=this;e.hideAll(),e.fire("select")},hideAll:function(){var e=this;return this.find("menuitem").exec("hideMenu"),e._super()},preRender:function(){var e=this;return e.items().each(function(t){var n=t.settings;return n.icon||n.selectable?(e._hasIcons=!0,!1):void 0}),e._super()}});return r}),r(en,[Tt],function(e){return e.extend({Defaults:{classes:"radio",role:"radio"}})}),r(tn,[Nt,Q],function(e,t){return e.extend({renderHtml:function(){var e=this,t=e.classPrefix;return e.addClass("resizehandle"),"both"==e.settings.direction&&e.addClass("resizehandle-both"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'"><i class="'+t+"ico "+t+'i-resize"></i></div>'},postRender:function(){var e=this;e._super(),e.resizeDragHelper=new t(this._id,{start:function(){e.fire("ResizeStart")},drag:function(t){"both"!=e.settings.direction&&(t.deltaX=0),e.fire("Resize",t)},stop:function(){e.fire("ResizeEnd")}})},remove:function(){return this.resizeDragHelper&&this.resizeDragHelper.destroy(),this._super()}})}),r(nn,[Nt],function(e){return e.extend({renderHtml:function(){var e=this;return e.addClass("spacer"),e.canFocus=!1,'<div id="'+e._id+'" class="'+e.classes()+'"></div>'}})}),r(rn,[Xt,Y],function(e,t){return e.extend({Defaults:{classes:"widget btn splitbtn",role:"button"},repaint:function(){var e=this,n=e.getEl(),r=e.layoutRect(),i,o;return e._super(),i=n.firstChild,o=n.lastChild,t.css(i,{width:r.w-t.getSize(o).width,height:r.h-2}),t.css(o,{height:r.h-2}),e},activeMenu:function(e){var n=this;t.toggleClass(n.getEl().lastChild,n.classPrefix+"active",e)},renderHtml:function(){var e=this,t=e._id,n=e.classPrefix,r=e.settings.icon?n+"ico "+n+"i-"+e.settings.icon:"";return'<div id="'+t+'" class="'+e.classes()+'" role="button" tabindex="-1"><button type="button" hidefocus="1" tabindex="-1">'+(r?'<i class="'+r+'"></i>':"")+(e._text?(r?" ":"")+e._text:"")+'</button><button type="button" class="'+n+'open" hidefocus="1" tabindex="-1">'+(e._menuBtnText?(r?"\xa0":"")+e._menuBtnText:"")+' <i class="'+n+'caret"></i></button></div>'},postRender:function(){var e=this,t=e.settings.onclick;return e.on("click",function(e){var n=e.target;if(e.control==this)for(;n;){if(e.aria&&"down"!=e.aria.key||"BUTTON"==n.nodeName&&-1==n.className.indexOf("open"))return e.stopImmediatePropagation(),void t.call(this,e);n=n.parentNode}}),delete e.settings.onclick,e._super()}})}),r(on,[Ut],function(e){return e.extend({Defaults:{containerClass:"stack-layout",controlClass:"stack-layout-item",endClass:"break"}})}),r(an,[et,Y],function(e,t){return e.extend({Defaults:{layout:"absolute",defaults:{type:"panel"}},activateTab:function(e){var n;this.activeTabId&&(n=this.getEl(this.activeTabId),t.removeClass(n,this.classPrefix+"active"),n.setAttribute("aria-selected","false")),this.activeTabId="t"+e,n=this.getEl("t"+e),n.setAttribute("aria-selected","true"),t.addClass(n,this.classPrefix+"active"),this.items()[e].show().fire("showtab"),this.reflow(),this.items().each(function(t,n){e!=n&&t.hide()})},renderHtml:function(){var e=this,t=e._layout,n="",r=e.classPrefix;return e.preRender(),t.preRender(e),e.items().each(function(t,i){var o=e._id+"-t"+i;t.aria("role","tabpanel"),t.aria("labelledby",o),n+='<div id="'+o+'" class="'+r+'tab" unselectable="on" role="tab" aria-controls="'+t._id+'" aria-selected="false" tabIndex="-1">'+e.encode(t.settings.title)+"</div>"}),'<div id="'+e._id+'" class="'+e.classes()+'" hidefocus="1" tabindex="-1"><div id="'+e._id+'-head" class="'+r+'tabs" role="tablist">'+n+'</div><div id="'+e._id+'-body" class="'+e.classes("body")+'">'+t.renderHtml(e)+"</div></div>"},postRender:function(){var e=this;e._super(),e.settings.activeTab=e.settings.activeTab||0,e.activateTab(e.settings.activeTab),this.on("click",function(t){var n=t.target.parentNode;if(t.target.parentNode.id==e._id+"-head")for(var r=n.childNodes.length;r--;)n.childNodes[r]==t.target&&e.activateTab(r)})},initLayoutRect:function(){var e=this,n,r,i;r=t.getSize(e.getEl("head")).width,r=0>r?0:r,i=0,e.items().each(function(e){r=Math.max(r,e.layoutRect().minW),i=Math.max(i,e.layoutRect().minH)}),e.items().each(function(e){e.settings.x=0,e.settings.y=0,e.settings.w=r,e.settings.h=i,e.layoutRect({x:0,y:0,w:r,h:i})});var o=t.getSize(e.getEl("head")).height;return e.settings.minWidth=r,e.settings.minHeight=i+o,n=e._super(),n.deltaH+=o,n.innerH=n.h-n.deltaH,n}})}),r(sn,[Nt,Y],function(e,t){return e.extend({init:function(e){var t=this;t._super(e),t._value=e.value||"",t.addClass("textbox"),e.multiline?t.addClass("multiline"):t.on("keydown",function(e){13==e.keyCode&&t.parents().reverse().each(function(t){return e.preventDefault(),t.hasEventListeners("submit")&&t.toJSON?(t.fire("submit",{data:t.toJSON()}),!1):void 0})})},disabled:function(e){var t=this;return t._rendered&&"undefined"!=typeof e&&(t.getEl().disabled=e),t._super(e)},value:function(e){var t=this;return"undefined"!=typeof e?(t._value=e,t._rendered&&(t.getEl().value=e),t):t._rendered?t.getEl().value:t._value},repaint:function(){var e=this,t,n,r,i=0,o=0,a;t=e.getEl().style,n=e._layoutRect,a=e._lastRepaintRect||{};var s=document;return!e.settings.multiline&&s.all&&(!s.documentMode||s.documentMode<=8)&&(t.lineHeight=n.h-o+"px"),r=e._borderBox,i=r.left+r.right+8,o=r.top+r.bottom+(e.settings.multiline?8:0),n.x!==a.x&&(t.left=n.x+"px",a.x=n.x),n.y!==a.y&&(t.top=n.y+"px",a.y=n.y),n.w!==a.w&&(t.width=n.w-i+"px",a.w=n.w),n.h!==a.h&&(t.height=n.h-o+"px",a.h=n.h),e._lastRepaintRect=a,e.fire("repaint",{},!1),e},renderHtml:function(){var e=this,t=e._id,n=e.settings,r=e.encode(e._value,!1),i="";return"spellcheck"in n&&(i+=' spellcheck="'+n.spellcheck+'"'),n.maxLength&&(i+=' maxlength="'+n.maxLength+'"'),n.size&&(i+=' size="'+n.size+'"'),n.subtype&&(i+=' type="'+n.subtype+'"'),e.disabled()&&(i+=' disabled="disabled"'),n.multiline?'<textarea id="'+t+'" class="'+e.classes()+'" '+(n.rows?' rows="'+n.rows+'"':"")+' hidefocus="1"'+i+">"+r+"</textarea>":'<input id="'+t+'" class="'+e.classes()+'" value="'+r+'" hidefocus="1"'+i+" />"},postRender:function(){var e=this;return t.on(e.getEl(),"change",function(t){e.fire("change",t)}),e._super()},remove:function(){t.off(this.getEl()),this._super()}})}),r(ln,[Y,K],function(e,t){return function(n,r){var i=this,o,a=t.classPrefix;i.show=function(t){return i.hide(),o=!0,window.setTimeout(function(){o&&n.appendChild(e.createFragment('<div class="'+a+"throbber"+(r?" "+a+"throbber-inline":"")+'"></div>'))},t||0),i},i.hide=function(){var e=n.lastChild;return e&&-1!=e.className.indexOf("throbber")&&e.parentNode.removeChild(e),o=!1,i}}}),a([l,c,u,d,f,p,h,m,g,y,b,C,_,E,N,k,S,T,R,A,B,D,L,H,M,O,I,F,z,W,V,U,$,q,j,Y,K,G,X,J,Q,Z,et,tt,nt,rt,it,ot,at,st,lt,ct,ut,dt,ft,pt,ht,mt,gt,vt,yt,bt,Ct,xt,wt,_t,Et,Nt,kt,St,Tt,Rt,At,Bt,Dt,Lt,Ht,Mt,Pt,Ot,It,Ft,zt,Wt,Vt,Ut,$t,qt,jt,Yt,Kt,Gt,Xt,Jt,Qt,Zt,en,tn,nn,rn,on,an,sn,ln])}(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//





;
