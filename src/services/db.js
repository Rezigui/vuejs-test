import idb from 'idb';

const idbPromise = idb.open('selency-test', 1, (db) => {
  db.createObjectStore('companies');
  db.createObjectStore('rates');
});

const db = {
  install(Vue) {
    Vue.mixin({
      methods: {
        iget(table, key) {
          return idbPromise.then((d) => {
            const tx = d.transaction(table).objectStore(table).get(key);
            return tx.then(r => r);
          });
        },
        iset(table, key, val) {
          return idbPromise.then(async (d) => {
            const tx = d.transaction(table, 'readwrite');
            let status = 'created';
            const store = tx.objectStore(table);
            const exist = await store.get(key);
            if (exist) {
              status = 'updated';
            }
            store.put(val, key);
            return tx.complete.then(() => status);
          });
        },
        idelete(table, key) {
          return idbPromise.then((d) => {
            const tx = d.transaction(table, 'readwrite');
            tx.objectStore(table).delete(key);
            return tx.complete;
          });
        },
        iclear(table) {
          return idbPromise.then((d) => {
            const tx = d.transaction(table, 'readwrite');
            tx.objectStore(table).clear();
            return tx.complete;
          });
        },
        iall(table) {
          return idbPromise.then((d) => {
            const tx = d.transaction(table, 'readwrite');
            const data = [];
            const open = tx.objectStore(table);

            open.getAllKeys().then((r) => {
              r.map(v => open.get(v).then(rs => data.push(rs)));
            });

            return tx.complete.then(() => data);
          });
        },
      },
    });
  },
};

export default db;
