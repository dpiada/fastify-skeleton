'use strict';

/**
 * Convert string to bytes array
 *
 * @param {String} string
 * The string to convert.
 *
 * @returns {Array}
 * The bytes array.
 */
module.exports.convertStringToBytes = (string) => {

    const data = [];

    for (let i = 0; i < string.length; ++i) {

        data.push(string.charCodeAt(i));
    }

    return data;
};

/**
 * Removes line feed and carriage return characters from a string.
 *
 * @param {String} string
 * The string to clean.
 *
 * @returns {String}
 * The cleaned string.
 */
module.exports.removeLineCharacters = (string) => {

    const cleanedString = string
        .replace(/(\r\n|\n|\r)/g, '')
        .trim();

    return cleanedString;
};
