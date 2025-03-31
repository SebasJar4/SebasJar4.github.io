import rutas_data_json from "./rutas.json" assert { type: "json" };
// Función para añadir un archivo CSS al documento
function add_css(ruta) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = ruta;
    document.head.appendChild(link);
}

// Función para añadir un archivo JS al documento
function add_js(ruta) {
    let script = document.createElement("script");
    script.src = ruta;
    script.type = "module"; // Si el JS es un módulo
    document.head.appendChild(script);
}

// Función para identificar el tipo de archivo y cargarlo
function add_file(name) {
    const regjs = [/css/gi, /js/gi];  // Expresiones regulares corregidas
    const funciones = [add_css, add_js]; // Array de funciones

    regjs.forEach((expresion, index) => {
        if (expresion.test(name)) {
            funciones[index](rutas_data_json[name]); // Llama a la función con la ruta
        }
    });
}

// Iterar sobre los archivos a añadir y llamarlos correctamente
rutas_data_json.añadir.forEach(element => add_file(element));
