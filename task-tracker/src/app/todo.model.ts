export class Todo {
    constructor(
        public empId: string,
        public name: string,
        public task: string,
        public deadline: Date,
    ) { }
}