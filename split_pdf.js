

var extract = require('pdf-text-extract');
var hummus  = require('hummus');
var path    = require('path');
var fs      = require('fs');

//parser
var scan_cf = require('./scan_cf.js');

module.exports = function(sourcePDF, outputFolder, callback){
    
  console.log('starttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt');
  var cf_list = "";  
  
  //extract pages in array of strings, one page per item
  extract(sourcePDF, (err, pages) => {  
    
    //check extracting
    if (err) console.log(err);
          
          var scanned = "";
    
    //use a for-loop to make it easier to break out after a match is found, a match is a string in the cf form.
    for (let i = 0; i < pages.length; i++) {
      
      scanned = scan_cf(pages[i]);
      
      //use the hummus package to pull that page out into it's own document and use the cf code as the document name.
      //If already exist, appending.
      
      var exists = fs.existsSync(path.join(outputFolder, `${scanned}.pdf`));
      
      if (exists){
        
        var modify_writer = hummus.createWriterToModify(
          path.join(outputFolder, `${scanned}.pdf`), 
            {modifiedFilePath: path.join(outputFolder, `${scanned}.pdf`)
              });
        
        modify_writer.appendPDFPagesFromPDF(
          sourcePDF,
            {type:hummus.eRangeTypeSpecific,specificRanges: [ [ i,i ] ]}
              );
        
        modify_writer.end();
      }
      
      else{
                
        
        cf_list += scanned + ',';
        
        var pdfWriter = hummus.createWriter(
          path.join(outputFolder, `${scanned}.pdf`)
            );
        
        pdfWriter.appendPDFPagesFromPDF(
          sourcePDF,
            {type:hummus.eRangeTypeSpecific,specificRanges: [ [ i,i ] ]}
              );
        
        pdfWriter.end();
      }
    }
    
  callback(cf_list);
  
  });
}

