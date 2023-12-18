class WeightQueue {

    // represent if elements are ordered for sure. When pop occurs, if it's set to false, will sort again
    #orderedElements; // private, no one should access this
    
    #ordered;

    constructor() {
        this.#orderedElements = [];
        this.#ordered = true;
    }

    isEmpty() {
        return this.#orderedElements.length === 0;
    }

    push(element, weight) {
        this.#orderedElements.push({element : element, weight : weight});
        this.#ordered = false; // set to false, to reorder it for next pop
    }

    // private, no one should access this, used to sort only when popping and push appened before, to save execution time
    #sortQueue() {
        this.#orderedElements.sort((item0, item1) => {
            // if sort function return > 0 => item 1 before item 0
            // more prioritary are the ones in first places of queue (FIFO)
            return item0.weight - item1.weight; // if < 0, then item 0 is more important than item1 (less weight should be prioritized)
        });
        this.#ordered = true;
    }

    pop() {
        if(!this.#ordered) {
            this.#sortQueue();
        }
        // null means that absance of value is intended, stronger than undefined (from ECMAScript2015 https://262.ecma-international.org/6.0/#sec-terms-and-definitions-undefined-type)
        return (this.isEmpty()) ? null : this.#orderedElements.shift();
    }
}

class Graph {
    constructor(nbNodesInGraph) {
        this.nodes = Array(nbNodesInGraph); // index represent the node number, it will contain edges
        for(let i = 0; i < nbNodesInGraph; ++i) {
            this.nodes[i] = []; // ready to receive edges for the node
        }
    }

    addNewEdge(nodeNumber, targettedNodeNumber, weight) {
        if(nodeNumber >= this.nodes.length) {
            return false;
        }
        this.nodes[nodeNumber].push({target : targettedNodeNumber, weight : weight});
    }

    getShortestPath(indexSourceNode, indexTargettedNode) {
        const navigableNodes = new WeightQueue(); // will store all nodes that we have discovered
        const distances = new Array(this.nodes.length).fill(Infinity); // store the distance, infinite if not reachable ; -1 means already reached
        const pathToTargetted = [indexSourceNode]; // store the shortest path to target from source

        navigableNodes.push(indexSourceNode, 0);
        distances[indexSourceNode] = 0;

        while(!navigableNodes.isEmpty()) { // while there's still navigable nodes
            const {element : indexNodeToVisit, weight : weightEdgeWithNode} = navigableNodes.pop();

            // to uncomment when you'll want to search from one path to another
            // if(distances[indexNodeToVisit] !== "visited") {
                // distances[indexNodeToVisit] = "visited"; // to not visit again edge

            if(distances[indexNodeToVisit] >= 0) {
                distances[indexNodeToVisit] = -distances[indexNodeToVisit]; // to not visit again edge

                this.nodes[indexNodeToVisit].forEach(({target, weight}) => {
                    const distanceWithSourceNode = weightEdgeWithNode + weight;
                    if(distances[target] !== "visited" && distanceWithSourceNode < distances[target]) {
                        distances[target] = distanceWithSourceNode;
                        navigableNodes.push(target, distances[target]);
                    }
                });
            }
        }

        // just display distance from origin for now
        console.log("Vertex Distance from Source");
        for (let i = 0; i < this.nodes.length; i++) {
            console.log(`${i}\t\t${distances[i] === Infinity ? "Infinity" : -distances[i]}`);
        }
    }

}