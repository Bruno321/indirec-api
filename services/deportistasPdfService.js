const PDFDocument = require('pdfkit');
const PdfTable = require('voilab-pdf-table');
const PdfkitConstruct = require('pdfkit-construct');

/**
 * @params deportistasArreglo. 
 * Se debe de pasar a la tabla que muestra los deportistas un arreglo de objetos que contenga los siguientes atributos:
 * numberRow, apellidos, nombres, numeroJugador.
*/

async function buildPDF(dataCallback, endCallback, data,equipoData) {

  // const deportistasArreglo = [
  //   {"numberRow": "1","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "2","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "3","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "4","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "5","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "6","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "7","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "8","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "9","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "10","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "11","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "12","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "13","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "14","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "15","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "16","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "17","apellidos": "","nombres": "","numJugador": ""},
  //   {"numberRow": "18","apellidos": "","nombres": "","numJugador": ""}
  // ]

  // data.forEach((e,i)=>{
  //   console.log(e)
  // })
  
  const pdf = new PdfkitConstruct({
    size: 'A4',
    // margins: {top: 60, left: 0, right: 0, bottom: 20},
    bufferPages: true,
  });

  pdf.on('data', dataCallback);
  pdf.on('end', endCallback);


  pdf.setDocumentHeader({
      height: '28%'
    }, () => {
      pdf.image('assets/img/logoSEP.png', 180, 25, {width: 150})
      pdf.image('assets/img/logoConade.png', 350, 30, {width: 120})
      pdf.image('assets/img/logoFisu.png', 490, 30, {width: 35})
      pdf.moveDown();
      pdf.font('Helvetica-Bold').fontSize(10).fillColor('#8C2E40').text('CONSEJO NACIONAL DEL DEPORTE DE LA EDUCACIÓN, A.C.').moveDown(0.5);
      pdf.font('Helvetica-Bold').fontSize(18).fillColor('black').text(`${equipoData.facultad} ${new Date().getFullYear()}`);
      pdf.font('Helvetica').fontSize(10).fillColor('black').text('CÉDULA DE INSCRIPCIÓN');
      pdf.moveDown();
      pdf.font('Helvetica-Bold').fontSize(18).fillColor('#8C2E40').text(equipoData.nombre);
      pdf.moveDown();

      //Creacion de la primera Tabla de los datos generales
      pdf.rect(pdf.x, 170, 150, 20).stroke();
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`REGIÓN |`, 78, 177);
      pdf.rect(pdf.x + 144, 170, 303, 20).stroke();
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`ESTADO |`, 230, 177);
      pdf.rect(pdf.x - 158, 190, 453, 20).stroke();
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`INSTITUCIÓN |`, 78, 197); //Facultad
      pdf.rect(pdf.x - 6, 210, 200, 20).stroke();
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`SIGLA IES |`, 78, 217);
      pdf.rect(pdf.x + 194, 210, 126, 20).stroke();
      pdf.rect(pdf.x + 320, 210, 127, 20).stroke();
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`VARONIL |`, 280, 217);
      pdf.font('Helvetica').fontSize(10).fillColor('black').text(`FEMENIL |`, 405, 217);

      pdf.font('Helvetica').fontSize(12).fillColor('black').text('');
    }
  );
  
  //Tabla que muestra los deportistas 
  pdf.addTable(
    [
        {key: 'numberRow', label: '', align: 'center'},
        {key: 'apellidos', label: '             APELLIDOS             ', align: 'center'},
        {key: 'nombres',   label: '       NOMBRES        ', align: 'center'},
        {key: 'numJugador', label: 'NÚMERO'},
    ],
    data, {
        width: "fill_body",
        border : {size: 0.1, color: '#707475'},
        // cellsPadding: 6,
        marginLeft: 60,
        marginRight: 60,
        headAlign: 'center',
        headFont : "Helvetica-Bold",
        headHeight : 16,
        headBackground : '#707475',
        headColor : '#fff',
        cellsFont : "Helvetica",
        marginBottom : 10,
    }
  );

  //Tabla que muestra los datos del entrenados y asistente.
  pdf.addTable(
    [
        {key: 'numberRow', label: '', align: 'left'},
        {key: 'apellidos', label: '             APELLIDOS            ', align: 'center'},
        {key: 'nombres',   label: '             NOMBRES              ', align: 'center'},
    ],
    [
      {"numberRow": "ENTRENADOR(A)", "apellidos": equipoData.apellidoEntrenador, "nombres": equipoData.nombreEntrenador,},  //Aqui es donde se debe colocar el nombre y apellido del entrenador para que se muestren en la tabla.
      {"numberRow": "ASISTENTE", "apellidos": equipoData.apellidoAsistente, "nombres":equipoData.nombreAsistente,} //Aqui es donde se debe colocar el nombre y apellido del asistente para que se muestren en la tabla.
    ], {
        width: "fill_body",
        border : {size: 0.1, color: '#707475'},
        // cellsPadding: 6,
        marginLeft: 60,
        marginRight: 60,
        headAlign: 'center',
        headFont : "Helvetica-Bold",
        headHeight : 16,
        headBackground : '#707475',
        headColor : '#fff',
        cellsFont : "Helvetica",
      }
  );

  pdf.setDocumentFooter({
    height : "10%"
  }, () => {
    pdf.font('Helvetica').fontSize(10).text('______________________________________', pdf.footer.x + 60, pdf.footer.y - 14)
    pdf.font('Helvetica').fontSize(10).text('COORDINADOR GENERAL DE LA REGIÓN', pdf.footer.x + 64, pdf.footer.y)
    pdf.font('Helvetica').fontSize(10).text('________________________________', pdf.footer.x + 334, pdf.footer.y - 14)
    pdf.font('Helvetica').fontSize(10).text('DELEGADO ESTATAL DEL CONDDE', pdf.footer.x + 340, pdf.footer.y)
  });
  // render tables
  pdf.render();
  pdf.end();
}


module.exports = {
  buildPDF
};