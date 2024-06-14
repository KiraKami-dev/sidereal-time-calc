const { julian, sexa, coord } = require('astronomia');

calculateLST()

// Function to calculate Local Sidereal Time (LST)
function calculateLST(date, longitude) {
    // Convert longitude to radians
    const lonRad = coord.longitude(lonRad);

    // Calculate Julian Date for the given date
    const jd = julian.Date(date);

    // Calculate Local Sidereal Time (LST) in hours
    const gmst = julian.apparentSiderealTime(jd);
    let lst = gmst - lonRad;
    lst = sexa.hour(lst).toString();
    console.log(lst)
    return lst;
}

// Example usage: Calculate LST for 25th September 2002 and longitude 72°53'E
