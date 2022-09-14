/**
 * Servicio para la carga de imágenes localmante
 */
 const path = require("path");
 const fs = require("fs");
 const { v4: uuidv4 } = require('uuid');
 
 /**
  * Se intenta almacenar una imagen de forma local y generarle un nombre único.
  * @param file que se va almacenar localmente.
  * @returns Devuelve una respuesta {ok,message,data:Url del imagen} con el resultado de la operación.
  */
 const uploadImage = async (file) => {
 
     // Validar que exista el archivo
     if (!file) {
         return {
             ok: false,
             message: "No hay ningún archivo para subir.",
             data: null
         };
     }
 
     // Validar extension
     const fileNameSegments = file.name.split('.'); // archivo.ejemplo.ext
     const fileExtension = fileNameSegments[fileNameSegments.length - 1]; // .ext
 
     const validateExtensions = ['png', 'jpg', 'jpeg'];
 
     if (!validateExtensions.includes(fileExtension)) {
         return {
             ok: false,
             message: "Tipo de archivo no permitido, sólo se permiten imágenes.",
             data: null
         };
     }
 
     // Generar el nombre del archivo
     const filename = `${uuidv4()}.${fileExtension}`;
     // Path para guardar a imagen
     const path = `uploads/${filename}`;
 
     try {
         // Mover la imagen
         await file.mv(path);
 
         // Si todo está correcto, devuelve la ruta de donde se guardó
         return {
             ok: true,
             message: "Imagen guardada correctamente.",
             data: path
         };
     } catch (error) {
        console.log(error)
         return {
             ok: false,
             message: "No se pudo cargar la imagen.",
             data: null
         };
     }
 }
 
 /**
  * Intenta eliminar una imagen local desde la ruta local del archivo.
  * @param path Dirección local de la imagen que se quiere eliminar.
  * @returns Devuelve una respuesta (ok, message, data) con el resultado de la operación.
  */
 const deleteImage = (path) => {
 
     if (fs.existsSync(path)) {
 
         fs.unlinkSync(path);
         return {
             ok: true,
             message: "Imagen eliminada correctamente.",
             data: path
         };
     }
 
     return {
         ok: false,
         message: "La imagen no existe o ya fue eliminada.",
         data: null
     };
 
 }
 
 module.exports = {
     uploadImage,
     deleteImage
 };