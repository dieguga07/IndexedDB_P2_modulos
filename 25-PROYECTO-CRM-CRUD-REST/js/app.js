import { activarBoton, añadirCliente, comprobarFormulario, consultarBD, desactivarBoton, editarCliente, eliminarBD, eliminarCliente, limpiarAlerta, limpiarHTML, mostraAlerta, mostrarCliente, validar ,validarEmail, validarNombres, validarTelefono} from "./funciones.js";


  export const formObj = {
    nombre: "h",
    email: "i",
    telefono: "j",
    empresa: "k"
  };
  
  
  export let listadoClientes = document.querySelector("#listado-clientes");
  
  export const formularioNombre = document.querySelector("#nombre");
  
  export const formularioEmail = document.querySelector("#email");
  
  export  const formularioTelefono = document.querySelector("#telefono");
  
  export const formularioEmpresa = document.querySelector("#empresa");
  
  export const agregarClienteBoton = document.querySelector("#formulario input[type='submit']");
  
  export let clientesArray = []
  
  // Listeners
  
  formularioNombre.addEventListener("blur", validar);
  formularioEmail.addEventListener("blur", validar);
  formularioTelefono.addEventListener("blur", validar);
   formularioEmpresa.addEventListener("blur", validar);
  agregarClienteBoton.addEventListener("click", (e) => {
    e.preventDefault();
    const nuevoCliente = {
      nombre: formularioNombre.value.trim(),
      email: formularioEmail.value.trim(),
      telefono: formularioTelefono.value.trim(),
      empresa: formularioEmpresa.value.trim(),
    };

    agregarBD(nuevoCliente);

    mostrarCliente(nuevoCliente);
    formularioNombre.value = "";
    formularioEmail.value = "";
    formularioTelefono.value = "";
    formularioEmpresa.value = "";
    desactivarBoton();
  });

  listadoClientes.addEventListener("click",eliminarCliente)
  listadoClientes.addEventListener("click", editarCliente);
  
  
  // Funciones
  
  desactivarBoton()
  

  comprobarFormulario()
  

  
 
  
  export let db;
  
  const conexion = indexedDB.open("BaseDatosClientes", 2);
  
  conexion.onsuccess = () => {
    db = conexion.result;
    console.log("Base de datos abierta", db);
    consultarBD();
  };
  
  conexion.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("Base de datos creada", db);
    if (!db.objectStoreNames.contains("clientes")) {
      const almacen = db.createObjectStore("clientes", { keyPath: "email" });
      almacen.createIndex("email", "email", { unique: true }); 
    }
  };
  
 
  const agregarBD = (cliente) => {
    const transaccion = db.transaction(["clientes"], "readwrite");
    const almacen = transaccion.objectStore("clientes");
    almacen.add(cliente);
  };
  

 
  
  consultarBD();
