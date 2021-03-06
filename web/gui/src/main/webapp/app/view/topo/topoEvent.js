/*
 * Copyright 2015 Open Networking Laboratory
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 ONOS GUI -- Topology Event Module.

 Defines the conduit between the client and the server:
    - provides a clean API for sending events to the server
    - dispatches incoming events from the server to the appropriate submodule

 */

(function () {
    'use strict';

    // injected refs
    var $log, wss, wes, tps, tis, tfs;

    // internal state
    var wsock, evApis;

    // ==========================

    function bindApis() {
        evApis = {
            showSummary: tps,
            addInstance: tis,
            updateInstance: tis,
            removeInstance: tis,
            addDevice: tfs,
            updateDevice: tfs,
            removeDevice: tfs,
            addHost: tfs,
            updateHost: tfs,
            removeHost: tfs,
            addLink: tfs,
            updateLink: tfs,
            removeLink: tfs

            // TODO: add remaining event api vectors
        };
    }

    var dispatcher = {
        handleEvent: function (ev) {
            var eid = ev.event,
                api = evApis[eid] || {},
                eh = api[eid];

            if (eh) {
                $log.debug('  *EVENT* ', ev.payload);
                eh(ev.payload);
            } else {
                $log.warn('Unknown event (ignored):', ev);
            }
        },

        sendEvent: function (evType, payload) {
            if (wsock) {
                wes.sendEvent(wsock, evType, payload);
            } else {
                $log.warn('sendEvent: no websocket open:', evType, payload);
            }
        }
    };

    // ===  Web Socket functions ===

    function onWsOpen() {
        $log.debug('web socket opened...');
        // kick off request for periodic summary data...
        dispatcher.sendEvent('requestSummary');
    }

    function onWsMessage(ev) {
        dispatcher.handleEvent(ev);
    }

    function onWsClose(reason) {
        $log.log('web socket closed; reason=', reason);
        wsock = null;
    }

    // ==========================

    angular.module('ovTopo')
    .factory('TopoEventService',
        ['$log', '$location', 'WebSocketService', 'WsEventService',
            'TopoPanelService', 'TopoInstService', 'TopoForceService',

        function (_$log_, $loc, _wss_, _wes_, _tps_, _tis_, _tfs_) {
            $log = _$log_;
            wss = _wss_;
            wes = _wes_;
            tps = _tps_;
            tis = _tis_;
            tfs = _tfs_;

            bindApis();

            // TODO: handle "guiSuccessor" functionality (replace host)
            // TODO: implement retry on close functionality

            function openSock() {
                wsock = wss.createWebSocket('topology', {
                    onOpen: onWsOpen,
                    onMessage: onWsMessage,
                    onClose: onWsClose,
                    wsport: $loc.search().wsport
                });
                $log.debug('web socket opened:', wsock);
            }

            function closeSock() {
                var path;
                if (wsock) {
                    path = wsock.meta.path;
                    wsock.close();
                    wsock = null;
                    $log.debug('web socket closed. path:', path);
                }
            }

            return {
                openSock: openSock,
                closeSock: closeSock,
                sendEvent: dispatcher.sendEvent
            };
        }]);
}());
