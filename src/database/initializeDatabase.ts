import { categoriesSeed } from "../data";

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("testDatabase", 1);
    let db: IDBDatabase;

    request.onupgradeneeded = () => {
      db = request.result;
      console.log("ONUPGRADENEEDED");

      const objStore = db.createObjectStore("categories", { keyPath: "title" });

      objStore.transaction.oncomplete = () => {
        const categoriesObjectStore = db
          .transaction("categories", "readwrite")
          .objectStore("categories");

        categoriesSeed.forEach((category) => {
          console.log(category);
          categoriesObjectStore.add(category);
        });
      };
    };

    request.onsuccess = () => {
      console.log("Database sucessfully open");
      resolve(request.result);
    };

    request.onerror = () => {
      console.log(`Database error: ${request.error}`);
      reject(request.error);
    };
  });
}
