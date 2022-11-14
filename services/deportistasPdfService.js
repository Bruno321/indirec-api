const PDFDocument = require('pdfkit');

async function buildPDF(dataCallback, endCallback, data) {

  // Create a document
  const doc = new PDFDocument({ size: 'LEGAL' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);


  doc.fontSize(12).font('Helvetica-Bold').text("CONSEJO NACIONAL DEL DEPORTE DE LA EDUCACIÓN, A.C:", 74, 240)

  
  doc.fontSize(12).font('Helvetica-Bold').text("UNIVERSIDAD NACIONAL 2021:", 74, 240)
  doc.fontSize(12).font('Helvetica-Bold').text("CÉDULA DE INSCRIPCIÓN:", 74, 240)


  doc.fontSize(12).font('Helvetica-Bold').text("FÚTBOL ASOCIACIÓN:", 74, 240)

  doc.end();
}


module.exports = {
  buildPDF
};