export default function truncateText(str: string, maxLength: number = 32) {
    // Check if the string is longer than the specified length
    if (str.length > maxLength) {
        // Return the truncated string with three dots appended
        return str.slice(0, maxLength - 3) + '...';
    }
    // If the string is within the length limit, return it as is
    return str;
}