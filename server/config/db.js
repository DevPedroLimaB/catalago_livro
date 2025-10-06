const mongoose = require('mongoose');

function maskMongoUri(uri) {
  try {
    const u = new URL(uri);
    if (u.password) {
      u.password = '***';
    }
    return u.toString();
  } catch {
    return '<invalid-uri>';
  }
}

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI not set in environment');
  }

  mongoose.set('strictQuery', true);

  // Decide dbName if not present in URI path
  let connectOpts = {};
  try {
    const parsed = new URL(uri);
    const hasDbInPath = parsed.pathname && parsed.pathname !== '/' && parsed.pathname.length > 1;
    if (!hasDbInPath) {
      connectOpts.dbName = process.env.DB_NAME || 'book_catalog';
    }
  } catch {
    // ignore parse errors; let mongoose handle
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('[MongoDB] Connecting to', maskMongoUri(uri), connectOpts.dbName ? `(dbName=${connectOpts.dbName})` : '');
  }

  try {
    await mongoose.connect(uri, connectOpts);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('[MongoDB] Connection error:', err.message);
    throw err;
  }
}

// Surface connection errors after initial connect attempt
mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] runtime connection error:', err?.message || err);
});

module.exports = connectDB;
