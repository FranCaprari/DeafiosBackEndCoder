

class Usuario {
    constructor(nombre, apellido, libros, mascota){
        this.nombre= nombre;
        this.apellido= apellido;
        this.libros = libros;
        this.mascota = mascota;
    }
 getFullName(nombre, apellido){
    return `Nombre de usuario: ${this.nombre}  ${this.apellido}`; 
}
addMascota(nueva){
    this.mascota.push(nueva);
}
countMascotas(){
    return this.mascota.length;
}
addBook(libro, autor){
    this.libros.push({libro, autor});
}
getBookNames(){
    return this.libros.map(({libro}) => libro);
}
}

let mascota = ["perro", "Hamster"];
let libros = [
    {
        libro: "Harry Potter",
        autor: "J. K. Rowling",
    },
    {
        libro: "El señor de los anillos",
        autor: "J. R. R. Tolkien",
    }
];

let usuario = new Usuario("Francisco", "Caprari", libros, mascota);

usuario.addBook("Game of thrones", "George R. R. Martin");
usuario.addMascota("Gato");

console.log(usuario);
console.log(usuario.getFullName())
console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);
console.log(usuario.getBookNames());