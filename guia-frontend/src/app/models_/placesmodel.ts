export interface PlaceModel{
    id: number;
    name: string;
    descripcion: string;
    categoria: string;
    calificacion: number;
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
}