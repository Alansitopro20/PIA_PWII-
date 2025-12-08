export interface PlaceModel{
    id: number;

    //Datos principales
    name: string;
    subtitulo: string;
    ciudad:string;
    descripcion: string;

    // Datos generales
    categoria: string;
    calificacion: number;

    //Multimedia
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
    video_url:string;

}