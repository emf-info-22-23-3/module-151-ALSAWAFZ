class servicesHttp {
    constructor() {
        this.BASE_URL = "http://localhost:8080/projet/server/server.php";
    }
  
    connect(username, password, successCallback, errorCallback) {
        console.log("Sending data to server:", { username, password });
  
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
            error: errorCallback
        });
    }
  
    disconnect(successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            dataType: "xml",
            url: this.BASE_URL,
            data: { action: 'disconnect' },
            success: successCallback,
            error: errorCallback
        });
    }
  
    getMatchs(successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            dataType: "xml",
            url: this.BASE_URL,
            data: { action: 'getMatchs' },
            success: successCallback,
            error: errorCallback
        });
    }
  
    getPlayers(successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            dataType: "xml",
            url: this.BASE_URL,
            data: { action: 'getPlayers' },
            success: successCallback,
            error: errorCallback
        });
    }
  }
  