
const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const arabicNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Converts Bengali numerals in a string to Arabic numerals.
 */
export const toArabicNumerals = (str: string): string => {
    return str.split('').map(char => {
        const index = bengaliNumerals.indexOf(char);
        return index !== -1 ? arabicNumerals[index] : char;
    }).join('');
};

/**
 * Converts Arabic numerals in a string or number to Bengali numerals.
 */
export const toBengaliNumerals = (val: string | number): string => {
    const str = val.toString();
    return str.split('').map(char => {
        const index = arabicNumerals.indexOf(char);
        return index !== -1 ? bengaliNumerals[index] : char;
    }).join('');
};

/**
 * Checks if a string is a valid numeric value, supporting both Arabic and Bengali numerals.
 */
export const isValidNumber = (str: string): boolean => {
    if (!str) return true;
    const arabic = toArabicNumerals(str);
    return /^\d*\.?\d*$/.test(arabic);
};

/**
 * Parses a string that might contain Bengali numerals into a float.
 */
export const parseBengaliFloat = (str: string): number => {
    const arabic = toArabicNumerals(str);
    return parseFloat(arabic) || 0;
};
