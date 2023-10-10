export class Message {
    constructor(
        public message: string,
        public sender: string,
        public receiver: string,
        public timestamp: Date,
        public senderId: string
    ) {}
}
