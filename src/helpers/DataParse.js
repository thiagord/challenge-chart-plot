export function JsonParse(val) {

        if (/^[\],:{}\s]*$/.test(val.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    var data = JSON.parse(val);
    return data;  
   
    }else{
  
  return false;

    }
    
}