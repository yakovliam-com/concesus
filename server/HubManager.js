function hubManager(clientManager) {

    let _clientManager = clientManager;
    let _hubs = []

    this.start = () => {
        console.log(_clientManager.getHubClient());
        // somehow load proxies (objects from kubernetes) into array
    }

}

module.exports = exports = hubManager;