// =====================
// Convert date function
// returns date in format dd/mm/yyyy
// =====================

module.exports.dateConverter = dateObj => {
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
};