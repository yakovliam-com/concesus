'use strict';

const fs = require('fs');
const k8s = require('@kubernetes/client-node');

function clientManager() {

    let _client;
    let _contexts;

    this.loadContexts = () => {
        let raw = fs.readFileSync('contexts.json');
        _contexts = JSON.parse(raw);
    }

    this.loadClients = () => {
        // create client
        let client = new k8s.KubeConfig();

        client.loadFromOptions({
            clusters: [_contexts.cluster],
            users: [_contexts.proxy.user, _contexts.hub.user],
            contexts: [_contexts.proxy, _contexts.hub],
            currentContext: _contexts.proxy.name,
        });

        _client = client.makeApiClient(k8s.CoreV1Api);
    }

    this.getClient = () => {
        return _client;
    }
}

module.exports = exports = clientManager;
