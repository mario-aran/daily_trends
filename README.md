# API Daily Trends

## Descripción

- Hacer API que exponga un feed de noticias. El feed es un agregador de noticias de portadas de periódicos número uno ("El País" y "El Mundo").
- [ ] Al abrir la API, se deben mostrar las 5 noticias de portada del día actual de "El País" y de "El Mundo".
- [ ] Se pueden añadir noticias a mano desde la API.

## Tareas Previas

- [x] Crear un repo público en github.
- [x] Antes de empezar las tareas, enviar el enlace del repositorio por mail.
- Mínimo un commit por tarea.

## Tareas

- [x] Crear un proyecto TypeScript con la arquitectura de ficheros a elección.
- [x] Crear un modelo de feed y sus atributos. Utilizar MongoDB y algún ODM.
- [ ] Definir los endpoints para gestionar los servicios CRUD del modelo Feed. Desacoplar las capas de la API al máximo.
- [ ] Crear un “servicio de lectura de feeds” que extraiga por web scraping las noticias de portada y las guarde como Feeds (usar OOP).

## Otros Detalles

- [ ] Representar en un dibujo la arquitectura y las capas de la aplicación.
- Utilizar las buenas prácticas que conozcas.
- Demostrar conocimientos de OOP: abstracción, encapsulamiento, herencia y polimorfismo.
- [ ] Realizar los tests que consideres necesarios.
