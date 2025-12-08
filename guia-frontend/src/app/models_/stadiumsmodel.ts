export interface StadiumModel{
    id: number;

    // Datos principales
    name: string;
    subtitulo: string
    descripcion: string;

    // Datos generales
    capacidad: number;
    ciudad: string;

    // Multimedia
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
    video_url:string;

}