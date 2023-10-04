const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://lgouvin:sAXfVn6dJY2WGxKO@cluster0.poferpf.mongodb.net/social-network?retryWrites=true&w=majority';
// force rebuild
connect(connectionString);

module.exports = connection;
