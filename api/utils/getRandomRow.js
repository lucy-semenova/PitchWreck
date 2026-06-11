// Converts sqlite3 callback-based db.get() into a Promise.
// This allows the rest of the backend to use async/await.
export function getRandomRow(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => { //callback function that runs when the query is done
      if (error) {
          reject(error);
            return;
      } else {
        resolve(row);
      }
    });
  });
}