async function createTtlIndex(db) {
  return db.collection("blocklist").createIndex(
    {
      date: 1,
    },
    {
      expireAfterSeconds: 1800,
    }
  );
}

module.exports = { createTtlIndex };
