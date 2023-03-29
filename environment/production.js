const PROD_DB_PWD="ClaudeAPI"
module.exports = {
    DB_URL: `mongodb+srv://claude_moz:${PROD_DB_PWD}@cluster0.4mza5.mongodb.net/twitter?retryWrites=true&w=majority`,
    key: '/etc/letsencrypt/live/www.tsiang.fr/privkey.pem',
    cert: '/etc/letsencrypt/live/www.tsiang.fr/fullchain.pem',
    portHttp: 80,
    portHttps: 443
}