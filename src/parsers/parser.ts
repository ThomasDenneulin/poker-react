import { parse as winamaxParser } from './parser-winamax';
import Hand from './models/hand';

const fs = window.require('fs');
const readline = window.require('readline');
const roomToParser: {[i: string]: Function} = {
    winamax: winamaxParser
}

export default function parseFile(room: string, pathToFile: string): Promise<Hand[]> {
    if (!roomToParser[room]) {
        throw `no parser registered for room ${room}`;
    }

    const rl = readline.createInterface({
        input: fs.createReadStream(pathToFile)
    });

    return roomToParser[room](rl);
}
