const express = require('express');
const { apparent } = require('astronomia').sidereal;
const cors = require('cors');




const app = express();
const port = 3000; // Choose a suitable port

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

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

// Route to calculate LST
app.post('/calculate-lst', (req, res) => {
    // Extract date and longitude from the request body
    const { date, longitude } = req.body;

    if (!date || !longitude) {
        return res.status(400).json({ error: 'Date and longitude are required in the request body.' });
    }

    // Create a Date object from the provided date string
    const parsedDate = new Date(date);

    // Validate if date is valid
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format. Please provide a valid ISO 8601 date string.' });
    }

    // Calculate LST
    const lst = calculateLST(parsedDate, parseFloat(longitude));

    // Send response with LST
    res.json({ lst });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
