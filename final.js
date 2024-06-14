const { apparent } = require('astronomia/sidereal');

// Function to calculate Local Sidereal Time (LST)
function calculateLST(date, longitude) {
    // Convert longitude to radians
    const lonRad = longitude * Math.PI / 180;

    // Calculate Julian Date for the given date
    const jd = date.getTime() / 86400000 + 2440587.5; // Convert JavaScript date to Julian Date

    // Calculate apparent sidereal time at Greenwich
    const apparentSiderealTime = apparent(jd);

    // Convert apparent sidereal time to LST at the given longitude
    let lstHours = (apparentSiderealTime + lonRad * 12 / Math.PI) % 86400 / 3600;
    if (lstHours < 0) {
        lstHours += 24;
    }

    // Calculate minutes and seconds
    let lstMinutes = (lstHours % 1) * 60;
    let lstSeconds = (lstMinutes % 1) * 60;

    // Format hours, minutes, and seconds
    lstHours = Math.floor(lstHours);
    lstMinutes = Math.floor(lstMinutes);
    lstSeconds = Math.round(lstSeconds);

    // Ensure two-digit formatting for minutes and seconds
    lstMinutes = lstMinutes < 10 ? `0${lstMinutes}` : lstMinutes;
    lstSeconds = lstSeconds < 10 ? `0${lstSeconds}` : lstSeconds;

    // Return formatted LST string
    return `${lstHours}:${lstMinutes}:${lstSeconds}`;
}



// Example usage: Calculate LST for 25th September 2002 and longitude 72°53'E
const date = new Date('2002-09-24T00:00:00Z');
const longitude = 72.8833; // Longitude in degrees

const lst = calculateLST(date, longitude);
console.log(`Local Sidereal Time (LST) for 24th September 2002 at longitude ${longitude}°E: ${lst}`);
