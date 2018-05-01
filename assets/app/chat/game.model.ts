export class Game {
    constructor(
        public id: string,
        public name: string,
        public state = 'inactive'
    ){}

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }
}
