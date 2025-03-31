    export class Modal {
        static MODES = {
            PERPETUO: "PERPETUO",
            INTERACTIVE: "INTERACTIVE"
        };

        constructor(name, mode = Modal.MODES.INTERACTIVE) {
            if (!name) throw new Error("El modal debe tener un nombre.");

            this.name = name;
            this.mode = mode;
            this.isOpen = false;

            // Crear la pantalla negra (fondo del modal)
            this.pantallaNegra = document.createElement("div");
            this.pantallaNegra.id = `modal-${this.name}`;
            this.pantallaNegra.style.position = "fixed";
            this.pantallaNegra.style.top = "0";
            this.pantallaNegra.style.left = "0";
            this.pantallaNegra.style.width = "100vw";
            this.pantallaNegra.style.height = "100vh";
            this.pantallaNegra.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            this.pantallaNegra.style.display = "none"; // Oculto por defecto
            this.pantallaNegra.style.justifyContent = "center";
            this.pantallaNegra.style.alignItems = "center";
            this.pantallaNegra.style.zIndex = "1000";

            // Crear el contenido del modal
            this.modalContent = document.createElement("div");
            this.modalContent.style.background = "white";
            this.modalContent.style.padding = "20px";
            this.modalContent.style.borderRadius = "10px";
            this.modalContent.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.3)";


            // Botón de cerrar (solo en modo INTERACTIVE)
            if (this.mode === Modal.MODES.INTERACTIVE) {
                const closeButton = document.createElement("button");
                closeButton.innerText = "Cerrar";
                closeButton.style.marginTop = "10px";
                closeButton.addEventListener("click", () => this.close());
                this.modalContent.appendChild(closeButton);
            }

        }

        open() {
            this.pantallaNegra.style.display = "flex";
            this.isOpen = true;
        }

        close() {
            if (this.mode === Modal.MODES.PERPETUO) return; // No se cierra en modo perpetuo
            this.pantallaNegra.style.display = "none";
            this.isOpen = false;
            document.getElementById( this.pantallaNegra.id )?.remove();
            
        }

        añadir() {
            document.body.appendChild(this.pantallaNegra);
            this.pantallaNegra.appendChild(this.modalContent);
        }
    }
