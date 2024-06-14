const { julian } = require('astronomia');

// Function to calculate Local Sidereal Time (LST)
function calculateLST(date, longitude) {
    // Convert longitude to radians
    const lonRad = longitude * Math.PI / 180;

    // Calculate Julian Date for the given date
    const jd = julian.Date(date);

    // Julian centuries since J2000.0
    const t = julian.J2000Century(jd);

    // Greenwich Mean Sidereal Time (GMST) in hours
    const gmst = 6.697374558 + 0.06570982441908 * jd + 1.00273790935 * t + 0.000026 * t * t;

    // Normalize GMST to range 0-24 hours
    let gmstHours = gmst % 24;
    if (gmstHours < 0) {
        gmstHours += 24;
    }

    // Local Sidereal Time (LST) in hours
    let lstHours = gmstHours + lonRad * 12 / Math.PI;
    lstHours %= 24;
    if (lstHours < 0) {
        lstHours += 24;
    }

    return lstHours;
}

// Example usage: Calculate LST for 25th September 2002 and longitude 72°53'E
const date = new Date('2002-09-25T00:00:00Z');
const longitude = 72.8833; // Longitude in degrees

const lst = calculateLST(date, longitude);
console.log(`Local Sidereal Time (LST) for 25th September 2002 at longitude ${longitude}°E: ${lst} hours`);
