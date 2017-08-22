export class ShoutOut {
    content: string;
    author: string;
    shoutoutId?: string;
    userId?: string;

    constructor (content: string, author: string, shoutoutId?: string, userId?: string){
        this.content = content;
        this.author = author;
        this.shoutoutId = shoutoutId;
        this.userId = userId;
    }
}
