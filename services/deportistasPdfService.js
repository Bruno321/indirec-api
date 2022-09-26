const PDFDocument = require('pdfkit');

async function buildPDF(dataCallback, endCallback, data) {

  // Create a document
  const doc = new PDFDocument({ size: 'LEGAL' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);


  doc.fontSize(12).font('Helvetica-Bold').text("CONSEJO NACIONAL DEL DEPORTE DE LA EDUCACIÓN, A.C:", 74, 240)

  //fecha?
  doc.fontSize(12).font('Helvetica-Bold').text("UNIVERSIDAD NACIONAL 2021:", 74, 240)
  doc.fontSize(12).font('Helvetica-Bold').text("CÉDULA DE INSCRIPCIÓN:", 74, 240)

//   de donde
  doc.fontSize(12).font('Helvetica-Bold').text("FÚTBOL ASOCIACIÓN:", 74, 240)

  doc.fontSize(9).font('Helvetica').text(`Fecha de solicitud: ${data.apellidos}`, 450, 35)

  doc.fontSize(25).font('Helvetica-Bold').text(data.nombres, 73, 60) // Título de vacante

  doc.fontSize(12).font('Helvetica').text(data.empresa.nombreEmpresa, 74, 105) // 


  doc.fontSize(12).font('Helvetica-Bold').text(`Carrera: ${data.numero}`, 74, 165)




  
  doc.fontSize(12).font('Helvetica').text(`${data.tipoContratacion}`, 74, 260, {
    width: 135
  })


  doc.end();
}


module.exports = {
  buildPDF
};