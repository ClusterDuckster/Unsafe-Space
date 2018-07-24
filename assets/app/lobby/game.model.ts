import { Player } from "./player.model";

export class Game {
    constructor(
        public id: string,
        public name: string,
        public maxPlayers: number,
        public map: string,
        public players: Player[]
    ){}

}
