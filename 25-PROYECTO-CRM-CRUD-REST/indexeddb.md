## IndexedDB

IndexedDB es una API de base de datos que se utiliza en el navegador para almacenar y recuperar datos. Es más potente que las cookies e incluso LocalStorage, lo que la hace más adecuada para el manejo de grandes cantidades de datos estructurados. A continuación, se presentan algunos ejemplos de su uso:

### Crear y Abrir una Base de Datos

```javascript
const request = indexedDB.open("MiBaseDeDatos", 1);

request.onerror = (event) => {
  console.error("Error al abrir la base de datos:", event.target.error);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log("Base de datos abierta exitosamente:", db);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore("MiAlmacenamiento", { keyPath: "id" });
  store.createIndex("nombre", "nombre", { unique: false });
};
```

### Agregar un Objeto a la Base de Datos
```javascript
const request = db.transaction(["MiAlmacenamiento"], "readwrite")
  .objectStore("MiAlmacenamiento")
  .add({ id: 1, nombre: "Ejemplo" });

request.onsuccess = (event) => {
  console.log("Objeto agregado exitosamente.");
};
```

### Leer un Objeto de la Base de Datos por Clave

```javascript
const request = db.transaction(["MiAlmacenamiento"])
  .objectStore("MiAlmacenamiento")
  .get(1);

request.onsuccess = (event) => {
  const objeto = event.target.result;
  console.log("Objeto recuperado:", objeto);
};
Actualizar un Objeto en la Base de Datos
javascript
Copy code
const request = db.transaction(["MiAlmacenamiento"], "readwrite")
  .objectStore("MiAlmacenamiento")
  .put({ id: 1, nombre: "Nuevo Ejemplo" });

request.onsuccess = (event) => {
  console.log("Objeto actualizado exitosamente.");
};

```

### Eliminar un Objeto de la Base de Datos por Clave
```javascript
const request = db.transaction(["MiAlmacenamiento"], "readwrite")
  .objectStore("MiAlmacenamiento")
  .delete(1);

request.onsuccess = (event) => {
  console.log("Objeto eliminado exitosamente.");
};

```

### Recuperar Múltiples Objetos Usando un Índice

```javascript
const index = db.transaction(["MiAlmacenamiento"])
  .objectStore("MiAlmacenamiento")
  .index("nombre");

const request = index.getAll("Ejemplo");

request.onsuccess = (event) => {
  const objetos = event.target.result;
  console.log("Objetos encontrados:", objetos);
};
```
Con el uso de estos ejemplos, seremos capaces de realizar varias acciones en  IndexedDB, el cual nos facilita el almacenamiento en los navegadores, siendo consideradamente mejor.

Tambienes recomendable el uso de librerias para facilitaar el trabajo.

Aquí algunos ejemplos:

-LocalForage. Es parecido al localStorage y muy sencillo de utilizar.

-Dexie. js. Perfectamente documentada, fácil de utilizar y una de las preferidas por los desarrolladores.