class servicesHttp {

  constructor() {
      this.BASE_URL = "http://localhost:8080/projet/server/server.php";
  }
  
  connect(username, password, successCallback, CallbackError) {
      console.log("Sending data to server:", { username: username, password: password });
      
      $.ajax({
          type: "POST",
          dataType: "xml",
          url: this.BASE_URL,
          data: {
              action: 'login',
              username: username,
              password: password
          },
          success: successCallback,
          error: CallbackError
      });
  }
  


  disconnect(successCallback, CallbackError) {
      $.ajax({
          type: "POST",
          dataType: "xml",
          url: this.BASE_URL,
          data: {
              action: 'disconnect',
          },
          success: successCallback,
          error: CallbackError
      });
  }

  getMatchs(successCallback, CallbackError) {
      $.ajax({
          type: "GET",
          dataType: "xml",
          url: this.BASE_URL,
          data: 'action=getMatchs',
          success: successCallback,
          error: CallbackError
      });
  }

  getPlayers(successCallback, CallbackError) {
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: this.BASE_URL,
        data: 'action=getPlayers',
        success: successCallback,
        error: CallbackError
    });
}
}