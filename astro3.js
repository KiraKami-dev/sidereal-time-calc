const julian = require('astronomia').julian;

// Function to calculate Local Sidereal Time (LST)
function calculateLST(date, longitude) {
    // Convert longitude to radians
    const lonRad = longitude * Math.PI / 180;

    // Calculate Julian Date for the given date
    const jd = julian.Date(date);

    // Julian centuries since J2000.0
    const t = julian.J2000Century(jd);

    // Greenwich Mean Sidereal Time (GMST) in hours
    let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t - t * t * t / 38710000.0;

    // Normalize GMST to range 0-24 hours
    gmst %= 24;
    if (gmst < 0) {
        gmst += 24;
    }

    // Local Sidereal Time (LST) in hours
    let lst = gmst + lonRad * 12 / Math.PI;
    lst %= 24;
    if (lst < 0) {
        lst += 24;
    }

    return lst;
}

// Example usage: Calculate LST for 25th September 2002 and longitude 72°53'E
const date = new Date('2002-09-25T00:00:00Z');
const longitude = 72.8833; // Longitude in degrees

const lst = calculateLST(date, longitude);
console.log(`Local Sidereal Time (LST) for 25th September 2002 at longitude ${longitude}°E: ${lst} hours`);
