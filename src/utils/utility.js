
class Utility {

  buildUrl(url, parameters) {
    let queryString = '';

    for(let key in parameters){
      if(parameters.hasOwnProperty(key)){
        // console.log("ecode URI >>" + encodeURIComponent(key) + " URI:: " + key + " comp:-> " + parameters[key]);
        queryString += encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]) + '&';
      }
    }

    if(queryString.lastIndexOf('&') === queryString.length - 1){
      queryString = queryString.substring(0, queryString.length - 1);
    }

    return url + '?' + queryString;
  }

  extend(object) {
    for(let i = 1; i < arguments.length; i++){
      for(let key in arguments[i]){
        if(arguments[i].hasOwnProperty(key)){
          object[key] = arguments[i][key];
        }
      }
    }
    return object;
  }

    // window.Utility = {
    //   buildUrl: buildUrl,
    //   extend: extend
    // };
}

export default new Utility();
