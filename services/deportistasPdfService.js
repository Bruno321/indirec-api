const PDFDocument = require('pdfkit');

async function buildPDF(dataCallback, endCallback, data) {

  // Create a document
  const doc = new PDFDocument({ size: 'LEGAL' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.font('Helvetica-Bold').fontSize(10).fillColor('#8C2E40').text('CONSEJO NACIONAL DEL DEPORTE DE LA EDUCACIÓN, A.C.').moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(18).fillColor('black').text('UNIVERSIADA NACIONAL 2021');
  doc.font('Helvetica').fontSize(10).fillColor('black').text('CÉDULA DE INSCRIPCIÓN');
  doc.moveDown();
  doc.font('Helvetica-Bold').fontSize(18).fillColor('#8C2E40').text('FÚTBOL ASOCIACIÓN');

  doc.end();
}


module.exports = {
  buildPDF
};