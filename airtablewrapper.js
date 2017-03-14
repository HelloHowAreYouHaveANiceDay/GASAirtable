var Airtable = function(apiKey,base,table){
  var that = this;
  that.apiKey = apiKey || 0;
  that.base = base || 0;
  that.table = table || 0;
  that.setKey = function(apiKey){
    that.apiKey = apiKey;
    return that;
  };
  that.setBase = function(base){
    that.base = base;
    return that;
  };
  that.setTable = function(table){
    that.table = table;
    return that;
  }

  that.getTable = function(fields,view){
    if(that.apiKey && that.base && that.table){
    var url = ["https://api.airtable.com/v0/",that.base,"/", that.table, "?api_key=", that.apiKey];
    var fields = fields || 0;
    var view = view || 0;
     if(that.fields||that.formula||that.maxRecords||that.pageSize||that.sort||that.view){url.push('&')}
     var optionsString = [];
   for(var i=0;i<fields.length;i++){
      optionsString.push("fields%5B%5D=" + fields[i]);
   };
  if(that.view){optionsString.push("view=" + that.view)}

  optionsString = optionsString.join('&');
//  Logger.log(optionsString);

  url = url.concat(optionsString);

  url = url.join('')
    var response = UrlFetchApp.fetch(url);
    return JSON.parse(response)
    }else{
     var error = new MissingAirError(that.apiKey,that.base,that.table);
     Logger.log(error);
    }
  };


  that.postRecord = function(data){
     var options = {
       'method' : 'post',
       'headers' : {'Authorization':'Bearer '+ that.apiKey, 'Content-type' : 'application/json'},
       'payload' : JSON.stringify(data)
                   };
        var response = UrlFetchApp.fetch( "https://api.airtable.com/v0/"+that.base+"/"+ that.table, options);
        return JSON.parse(response)
  }
}
