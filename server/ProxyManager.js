function proxyManager(clientManager) {

    let _clientManager = clientManager;

    this.startProxies = () => {
        console.log(_clientManager.getProxyClient());
    }

}

module.exports = exports = proxyManager;