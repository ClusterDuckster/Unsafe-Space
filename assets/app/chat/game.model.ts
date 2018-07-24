export class Game {
    constructor(
        public id: string,
        public name: string,
        public maxPlayers: number,
        public curPlayers: number,
        public state = 'inactive'
    ){}

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }
}
