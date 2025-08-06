import Dexie from 'dexie';

export const db = new Dexie('VisariaAIHistory');
db.version(1).stores({
  history: '++id, timestamp, caption, image, audio',
});
