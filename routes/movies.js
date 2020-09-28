
const { Router } = require('express');
const router = Router();
const fs = require('fs');

// leer el archivo json fileSystem
const moviesFile = fs.readFileSync("./movies.json", "utf-8");
let movies = JSON.parse(moviesFile);
// básico
router.get("/", (req, res) => {
    res.json("API-JSON-CRUD POLIJIC");
});
// Mostrar todas las peliculas disponibles
router.get("/movies", (req, res) => {
    res.status(200).json(movies);

});
// Guardar un dato  POST/movies
router.post("/movies", (req, res) => {
    const { title, director, year, duration, genre, poster } = req.body;
    if (!title || !director || !year || !duration || !genre || !poster) {
        // verdadero hay un campo sin llenar ´Ó es falso cuando todos son falsos
        res.status(4001).json({ error: "Debe completar todos los campos" });
        console.log("Debe completar todos los campos");
    } else {
        // falso todos estan correctos
        const id = movies.length + 1;
        let newMovies = {
            id, title, director, year, duration, genre, poster
        }

        movies.push(newMovies);
        const json_movies = JSON.stringify(movies);
        fs.writeFileSync("./movies.json", json_movies, "utf-8");
        res.status(200).json(movies);
    }
}); // fin POST/movies

// modificar un datos
// buscarlo y enviar nuevos datos
router.put("/movies/:id", (req, res) => {
    const { title, director, year, duration, genre, poster } = req.body;
    const id = req.params.id;
    if (!title || !director || !year || !duration || !genre || !poster || !id) {
        res.status(401).json({ error: " Debes completar todos los campos " });
    }
    else { // buscar el dato a  modificar
        movies.filter((movie) => {
            if (movie.id == id) { // pelicula encontrada
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.duration = duration;
                movie.genre = genre;
                movie.poster = poster;
            }// fin búsqueda 

        }); // fin filtro  
        const json_movies = JSON.stringify(movies);
        fs.writeFileSync("./movies.json", json_movies, "utf-8");
        res.status(200).json(movies);
    }
    });



    router.delete("/movie/:id", (req, res) => {
        const id = req.params.id;
    
        if (!id) {
            res
                .status(401)
                .json({ error: "Ingrese el código de la pelicula a eliminar" });
        } else {
            const indexMovie = movies.findIndex((movie) => movie.id === id);
            // =  asignar ; == igual ; === exactamente IGUal
            movies.splice(indexMovie, 1);
            const json_movies = JSON.stringify(movies);
            fs.writeFileSync("./movies.json", json_movies, "utf-8");
            res.status(200).json(movies);
        }// fin modificar

    




}); // fin editar PUT


module.exports = router;
