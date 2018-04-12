var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {

  // REGEX IP validation
  TestIP: function(ip){
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))
      {
        return true;
      }
    return false;
  },

  // Creating Promise to Get Coordinates
  getCoordinates: function(ipInput){
    var url = `http://api.ipstack.com/${ipInput}?access_key=9beb48e6953b819b3f6116d675cad527&format=1`
    var coordinatesObj = new Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
          if (xhr.status === 200){
            var response = xhr.responseText;
            var responseJson = JSON.parse(response);
            resolve(responseJson);
          } else {
            reject(xhr.status);
          }
        }
      }
    });
    return coordinatesObj;
  }
}
