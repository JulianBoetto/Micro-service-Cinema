async function createTtlIndex(db) {
  return db.collection("blocklist").createIndex(
    {
      data: 1,
    },
    {
      expireAfterSeconds: 1800,
    }
  );
}

module.exports = { createTtlIndex };
