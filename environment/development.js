const path = require('path');
const DEV_DB_PWD="ClaudeAPI"
module.exports = {
    DB_URL: `mongodb+srv://claude_moz:${DEV_DB_PWD}@cluster0.4mza5.mongodb.net/twitter?retryWrites=true&w=majority`,
    key: path.join(__dirname, '../ssl/locale.key'),
    cert: path.join(__dirname, '../ssl/local.crt'),
    portHttp: 3000,
    portHttps: 3001
}