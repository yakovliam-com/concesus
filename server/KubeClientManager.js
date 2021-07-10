'use strict';

const fs = require('fs');
const k8s = require('@kubernetes/client-node');

function clientManager() {

    let _proxyContext;
    let _proxyClient;

    let _hubContext;
    let _hubClient;

    this.loadClients = () => {
        this.loadProxyClient();
        this.loadHubClient();
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

    this.loadHubClient = () => {
        this.loadHubContext();

        // create client
        let client = new k8s.KubeConfig();

        client.loadFromOptions({
            clusters: [_hubContext.cluster],
            users: [_hubContext.user],
            contexts: [_hubContext],
            currentContext: _hubContext.name,
        });

        _hubClient = client.makeApiClient(k8s.CoreV1Api);
    }

    this.loadProxyContext = () => {
        let data = fs.readFileSync('contexts.json');
        let parsed = JSON.parse(data);

        _proxyContext = parsed.proxy;
    }

    this.loadHubContext = () => {
        let data = fs.readFileSync('contexts.json');
        let parsed = JSON.parse(data);

        _hubContext = parsed.hub;
    }

    this.getProxyClient = () => {
        return _proxyClient;
    }

    this.getHubClient = () => {
        return _hubClient;
    }
}

module.exports = exports = clientManager;
