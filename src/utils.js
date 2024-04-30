const fs = require("fs");

// generate unique filenames
const generateFilename = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    // return a string with the date and time as the filename
    const filename = `${year}-${month}-${day}-${hour}-${minute}-${second}.json`;
    return filename;
};

// Export the functions
module.exports = {
    generateFilename
};