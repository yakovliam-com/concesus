function proxyManager(clientManager) {

    let _clientManager = clientManager;
    let _proxies = []

    this.start = () => {
        console.log(_clientManager.getProxyClient());

        // somehow load proxies (objects from kubernetes) into array
    }

}

module.exports = exports = proxyManager;