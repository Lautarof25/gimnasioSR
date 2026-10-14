# gimnasio

## Actualizar los planes

Las tarjetas de planes se cargan desde la primera pestaña de la [planilla de Google](https://docs.google.com/spreadsheets/d/1goEAr7KeQfjK2hDu0cL2Yf0XU9W52jOy0v1LlhHUQaQ/edit). Al abrir la página se leen sus datos públicos en formato CSV; si la planilla no está disponible o no tiene el formato esperado, se conservan las tarjetas incluidas en `index.html`.

Para que la página pueda leerla, la planilla debe tener el acceso general configurado como **Cualquier persona con el vínculo: lector**. Conservá los datos de cada tarjeta en las columnas A y B:

- Iniciá cada bloque con `TARJETA DESTACADA`, `TARJETA COMUN` o `TARJETA AMPLIA` en la columna A. El número que sigue al nombre (por ejemplo, `TARJETA COMUN 1`) sirve para distinguir tarjetas.
- En las filas siguientes, usá las etiquetas `Etiqueta`, `Título`, `Precio` y `Descripción` en la columna A, y el valor editable en la columna B.
- Para las listas, agregá filas `Actividad 1`, `Actividad 2`, etc. o `Beneficio 1`, `Beneficio 2`, etc. Los números deben ser consecutivos.
- Separá cada tarjeta con una nueva fila de encabezado `TARJETA ...`. El texto de las columnas C en adelante no se usa para las tarjetas de la página.

Los cambios publicados en la planilla aparecen cuando alguien vuelve a cargar el sitio.
