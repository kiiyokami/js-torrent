import dgram from 'dgram';
import { Buffer } from 'buffer';
import { URL } from 'url';


export const getPeers = (torrent, callback) => {
    const url = new URL(torrent.announce.toString('utf8'));
    const socket = dgram.createSocket('udp4');

    //send connection request
    udpSend(socket, buildConnReq(), url);

    socket.on('message', res => {
        if(resType(res) === 'connect') {
            const connResp = parseConnResp(res);
            const announceReq = buildAnnounceReq(connResp.connectionId);
            udpSend(socket, announceReq, url);
        } else if (resType(res) === 'announce') {
            const announceResp = parseAnnounceResp(res);
            callback(announceResp.peers);
        }
    });

}

function udpSend (socket, msg, rawURL, callback) {
    const url = new URL(rawURL);
    socket.send(msg, 0, msg.length, url.port, url.hostname,callback);
};

function resType(resp) {
    // ...
}

function buildConnReq() {
// ...
}

function parseConnResp(resp) {
// ...
}

function buildAnnounceReq(connId) {
// ...
}

function parseAnnounceResp(resp) {
// ...
}



// const msg = Buffer.from('test', 'utf8');

// socket.send(msg, 0, msg.length, url.port, url.host, () => {});

