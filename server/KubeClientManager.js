'use strict';

const fs = require('fs');
const k8s = require('@kubernetes/client-node');

function clientManager() {

    let _proxyContext;
    let _proxyClient;

    this.loadClients = () => {
        this.loadProxyClient();
    }

    this.loadProxyClient = () => {
        this.loadProxyContext();

        // create client
        let client = new k8s.KubeConfig();

        client.loadFromOptions({
            clusters: [_proxyContext.cluster],
            users: [_proxyContext.user],
            contexts: [_proxyContext],
            currentContext: _proxyContext.name,
        });

        _proxyClient = client.makeApiClient(k8s.CoreV1Api);
    }


    this.loadProxyContext = () => {
        let data = fs.readFileSync('contexts.json');
        let parsed = JSON.parse(data);

        _proxyContext = parsed.proxy;
    }

    this.getProxyContext = () => {
        return _proxyContext;
    }

    this.getProxyClient = () => {
        return _proxyClient;
    }
}

module.exports = exports = clientManager;
