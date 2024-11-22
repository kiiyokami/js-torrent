import fs from 'fs';
import bencode from 'bencode';
import tracker from './services/tracker';

const torrent = bencode.decode(fs.readFileSync('test.torrent'));



