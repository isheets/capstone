export default class ExtractedWord {
    constructor(word, order, start, end, pos) {
        this.word = word;
        this.order = order;
        this.start = start;
        this.end = end;
        this.pos = pos;
    }
    getWord() {
        return this.word
    }
    getOrderNum() {
        return this.order
    }
    getStartIdx() {
        return this.start
    }
    getStartIdx() {
        return this.end
    }
}