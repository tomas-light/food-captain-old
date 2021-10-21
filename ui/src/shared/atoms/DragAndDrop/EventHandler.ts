/**
 * @description If there are child elements inside our drag and drop div,
 * the drag events will be fired on those nested elements as well
 * (causing flickering from setState to be called each time),
 * so we want to keep track of the how many elements deep our cursor is,
 * and only set call this.setState({dragging: false}) once our cursor is all the way out
 * */
export class EventHandler {
	private counter: number;

	constructor() {
		this.counter = 0;
	}

	in = () => this.counter++;
	out = () => this.counter--;
	check = () => this.counter === 0;
	done = () => (this.counter = 0);
}
