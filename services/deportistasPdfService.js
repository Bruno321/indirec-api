const PDFDocument = require('pdfkit');
const PdfTable = require('voilab-pdf-table');
const PdfkitConstruct = require('pdfkit-construct');

async function buildPDF(dataCallback, endCallback, data) {

  const deportistasArreglo = [
    {
      "number": "1",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "2",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "3",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "4",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "5",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "6",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "7",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "8",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "9",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "10",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "11",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "12",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "13",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "14",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "15",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "16",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "17",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    },
    {
      "number": "18",
      "apellidos": "",
      "nombres": "",
      "numeroJugador": "",
    }
  ]

  // Create a document
  // const pdf = new PDFDocument({ size: 'LEGAL' });
  const pdf = new PdfkitConstruct({
    size: 'A4',
    // margins: {top: 60, left: 0, right: 10, bottom: 20},
    bufferPages: true,
  });

  pdf.on('data', dataCallback);
  pdf.on('end', endCallback);


  pdf.setDocumentHeader({
      height: '20%'
    }, () => {
      pdf.font('Helvetica-Bold').fontSize(10).fillColor('#8C2E40').text('CONSEJO NACIONAL DEL DEPORTE DE LA EDUCACIÓN, A.C.').moveDown(0.5);
      pdf.font('Helvetica-Bold').fontSize(18).fillColor('black').text('UNIVERSIADA NACIONAL 2021');
      pdf.font('Helvetica').fontSize(10).fillColor('black').text('CÉDULA DE INSCRIPCIÓN');
      pdf.moveDown();
      pdf.font('Helvetica-Bold').fontSize(18).fillColor('#8C2E40').text('FÚTBOL ASOCIACIÓN');
      pdf.font('Helvetica').fontSize(12).fillColor('black').text('');


      // const table = new PdfTable(pdf, {
      //   bottomMargin: 30
      // })

      // table
      // .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
      //   column: 'number'
      // }))
      // .setColumnsDefaults({
      //   headerBorder: 'B',
      //   align: 'left'
      // })
      // .addColumns([
      //   {
      //     id: 'number',
      //     header: '',
      //     align: 'center',
      //     width: 20
      //   },
      //   {
      //     id: 'apellidos',
      //     header: 'APELLIDOS',
      //     align: 'center',
      //     width: 200
      //   },
      //   {
      //     id: 'nombres',
      //     header: 'NOMBRES',
      //     width: 180,
      //     align: 'center'
      //   },
      //   {
      //     id: 'numeroJugador',
      //     header: 'NÚMERO',
      //     width: 60,
      //     align: 'center'
      //   }
      // ])
      // .onPageAdded(function (tb) {
      //   tb.addHeader();
      // })

      // table.addBody([
      //   {number: '1', apellidos: 'Aros Ramírez', nombres: 'Daniel', numeroJugador: '2'},
      //   {number: '1', apellidos: 'Aros Ramírez', nombres: 'Daniel', numeroJugador: '2'},
      //   {number: '1', apellidos: 'Aros Ramírez', nombres: 'Daniel', numeroJugador: '2'},
      //   {number: '1', apellidos: 'Aros Ramírez', nombres: 'Daniel', numeroJugador: '2'},
      //   {number: '1', apellidos: 'Aros Ramírez', nombres: 'Daniel', numeroJugador: '2'}
      // ])
    }
  );

  pdf.addTable(
    [
        {key: 'number', label: '', align: 'center'},
        {key: 'apellidos', label: '             APELLIDOS             ', align: 'center'},
        {key: 'nombres',   label: '       NOMBRES        ', align: 'center'},
        {key: 'numeroJugador', label: 'NÚMERO'},
    ],
    deportistasArreglo, {
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
        marginBottom : 40,
    });

    pdf.addTable(
      [
          {key: 'number', label: '', align: 'left'},
          {key: 'apellidos', label: '             APELLIDOS            ', align: 'center'},
          {key: 'nombres',   label: '             NOMBRES              ', align: 'center'},
      ],[
        {
          "number": "ENTRENADOR(A)",
          "apellidos": "",
          "nombres": "",
        },
        {
          "number": "ASISTENTE",
          "apellidos": "",
          "nombres": "",
        }
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
      });

  // pdf.setDocumentFooter({
  //   // height : "2%"
  // }, () => {
  //   pdf.text('Hola MUNDO', pdf.footer.x + 60, pdf.footer.y + 10)
  // });
  // render tables
  pdf.render();
  pdf.end();
}


module.exports = {
  buildPDF
};