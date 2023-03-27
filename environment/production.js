const path = require('path');
module.exports = {
    DB_URL: `mongodb+srv://claude_moz:${process.env.PROD_DB_PWD}@cluster0.4mza5.mongodb.net/twitter?retryWrites=true&w=majority`,
    key: path.join(__dirname, ''),
    cert: path.join(__dirname, ''),

}