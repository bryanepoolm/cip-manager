# Panel de Control de Exportaciones (CIP Panel)

Este es un sistema web desarrollado con Laravel y Vue.js para la gestión y seguimiento de operaciones de exportación. La aplicación permite a los usuarios crear, leer, actualizar y eliminar registros de exportación, adjuntar documentación relevante y mantener un historial detallado de los cambios de estado de cada operación.

## Características Principales

- **Gestión CRUD de Exportaciones**: Funcionalidad completa para Crear, Leer, Actualizar y Eliminar registros de exportación.
- **Generación Automática de Clave**: Cada nueva exportación recibe una clave única y legible (ej. `CIP-ABC12345`) generada automáticamente para una fácil identificación.
- **Subida de Múltiples Archivos**: Permite adjuntar varios documentos a cada registro de exportación.
  - **Nomenclatura Inteligente**: Los archivos se guardan con su nombre original sanitizado.
  - **Manejo de Duplicados**: Si un archivo con el mismo nombre ya existe, se le añade un sufijo numérico (ej. `documento_2.pdf`) para evitar conflictos.
- **Campos de Selección Avanzados**: Los campos de país de origen y destino utilizan un componente de dropdown con búsqueda, alimentado por la API externa [REST Countries](https://restcountries.com/), con un sistema de caché para optimizar el rendimiento.
- **Bitácora de Cambios de Estado**:
  - **Modal de Confirmación**: Al cambiar el estado de una exportación (ej. de "Pendiente" a "En Proceso"), se abre un modal que requiere al usuario añadir una nota justificando el cambio.
  - **Línea de Tiempo (Timeline)**: La vista de edición de cada exportación muestra un historial cronológico de todos los cambios de estado, quién los hizo, cuándo y la nota asociada.
- **Stack Tecnológico Moderno**: Construido con Inertia.js para una experiencia de Single-Page Application (SPA) sin la necesidad de construir una API separada.

## Stack Tecnológico

| Tecnología | Versión |
| :--- | :--- |
| PHP | `^8.2` |
| Laravel | `^12.0` |
| Vue.js | `^3.5.13` |
| Tailwind CSS | `^4.1.1` |
| PrimeVue | `^4.4.1` |
| Inertia.js | `^2.1.0` |
| Vite | `^7.0.4` |

## Instalación y Setup

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd cip-panel
    ```

2.  **Ejecutar el script de setup**: Este comando instalará las dependencias de Composer y NPM, configurará el archivo `.env` y ejecutará las migraciones de la base de datos.
    ```bash
    composer run-script setup
    ```

3.  **Iniciar el entorno de desarrollo**: Este comando utiliza `concurrently` para iniciar el servidor de PHP, el listener de colas, el visualizador de logs (`pail`) y el servidor de Vite, todo en una sola terminal.
    ```bash
    composer run-script dev
    ```

4.  Accede a la aplicación en la URL proporcionada por el servidor de Laravel (normalmente `http://127.0.0.1:8000`).
