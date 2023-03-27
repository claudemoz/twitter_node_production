const mongoose = require('mongoose')
//const pwd = 'ClaudeAPI';
const env = require(`../environment/${process.env.NODE_ENV}`);

exports.clientPromise = mongoose.connect(env.DB_URL)
                              .then(m => m.connection.getClient())
                              .catch((err) => console.log(`erreur de connexion => ${err.message}`))