export class User {
    constructor(
        public fname: string,
        public lname: string,
        public uname: string,
        public pword1: string,
        public profilepic?: string,
        public pword2?: string,
    ) {}
}
