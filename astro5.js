const { sidereal } = require('astronomia');

// Function to calculate Apparent Sidereal Time (GAST)
function calculateGAST(date) {
    // Calculate Julian Date for the given date
    const jd = date.getTime() / 86400000 + 2440587.5; // Convert JavaScript date to Julian Date

    // Calculate apparent sidereal time at Greenwich
    const gastSeconds = sidereal.apparent(jd);

    // Convert GAST to hours, minutes, and seconds
    let gastHours = gastSeconds / 3600;
    gastHours %= 24;
    if (gastHours < 0) {
        gastHours += 24;
    }

    // Calculate minutes and seconds
    let gastMinutes = (gastHours % 1) * 60;
    let gastSecondsOutput = (gastMinutes % 1) * 60;

    // Round seconds for better presentation
    gastSecondsOutput = Math.round(gastSecondsOutput);

    // Ensure two-digit formatting for minutes and seconds
    gastMinutes = gastMinutes < 10 ? `0${Math.floor(gastMinutes)}` : Math.floor(gastMinutes);
    gastSecondsOutput = gastSecondsOutput < 10 ? `0${gastSecondsOutput}` : gastSecondsOutput;

    // Return formatted GAST string
    return `${Math.floor(gastHours)}:${gastMinutes}:${gastSecondsOutput}`;
}

// Example usage: Calculate GAST for 25th September 2002
const date = new Date('2002-09-25T00:00:00Z');
const gast = calculateGAST(date);
console.log(`Apparent Sidereal Time (GAST) for 25th September 2002: ${gast}`);
