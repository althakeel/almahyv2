import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'almahy';

type GlobalMongoCache = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalMongo = globalThis as GlobalMongoCache;

const clientPromise = (() => {
  if (!uri) {
    return undefined;
  }

  const cachedPromise = globalMongo._mongoClientPromise || new MongoClient(uri).connect();

  if (process.env.NODE_ENV !== 'production') {
    globalMongo._mongoClientPromise = cachedPromise;
  }

  return cachedPromise;
})();

export const getMongoDb = async () => {
  if (!clientPromise) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  const client = await clientPromise;
  return client.db(dbName);
};