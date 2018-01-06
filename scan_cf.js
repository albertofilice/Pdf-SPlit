
module.exports = function (page){
  
  //error messages
  var err1 = "CF not found";
  var err2 = "there're more than CF per page";
  
  //fast RegExp based on CF format
  var fast_cf = /[a-zA-Z]{6}[a-zA-Z0-9]{2}[a-zA-Z][a-zA-Z0-9]{2}[a-zA-Z][a-zA-Z0-9]{3}[a-zA-Z]/g;
  
  //RegExp based on official CF format
  var cf = /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/g;
  
  //first scan with fast_cf pattern
  var found = page.match(fast_cf);
  
  if (found == null){
    
    console.log(err1);
    
    return null;
  } 
    
  //check if the cf code found exists and is unique per page
  var j = 0, unique = 0; 
  
  for (let j = 0; j < found.length; j++){
    
    if (found[j].match(cf) !== null) unique++;
  }
  
  if (unique == 1) return found[j];
  
  else{
    console.log(err2);
      return null;
  } 
}


