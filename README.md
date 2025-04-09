# API Daily Trends

## Instrucciones

- levantar base de datos: `docker compose up -d`
- instalar dependencias: `pnpm install`
- correr aplicación: `pnpm run dev`
- api url: "http://localhost:3000/api"
- mongo-express url: "http://localhost:8081"

## Arquitectura

![app-architecture](/resources/architecture-diag.png)

---

## Enunciado

Descripción

- Hacer API que exponga un feed de noticias. El feed es un agregador de noticias de portadas de periódicos número uno ("El País" y "El Mundo").
- [x] Al abrir la API, se deben mostrar las 5 noticias de portada del día actual de "El País" y de "El Mundo".
- [x] Se pueden añadir noticias a mano desde la API.

Tareas Previas

- [x] Crear un repo público en github.
- [x] Antes de empezar las tareas, enviar el enlace del repositorio por mail.
- Mínimo un commit por tarea.

Tareas

- [x] Crear un proyecto TypeScript con la arquitectura de ficheros a elección.
- [x] Crear un modelo de feed y sus atributos. Utilizar MongoDB y algún ODM.
- [x] Definir los endpoints para gestionar los servicios CRUD del modelo Feed. Desacoplar las capas de la API al máximo.
- [x] Crear un “servicio de lectura de feeds” que extraiga por web scraping las noticias de portada y las guarde como Feeds (usar OOP).

Otros Detalles

- [x] Representar en un dibujo la arquitectura y las capas de la aplicación.
- Utilizar las buenas prácticas que conozcas.
- Demostrar conocimientos de OOP: abstracción, encapsulamiento, herencia y polimorfismo.
- [x] Realizar los tests que consideres necesarios.
