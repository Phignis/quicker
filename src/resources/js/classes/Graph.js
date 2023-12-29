// to enable type checking with JSDoc (rather than full TypeScript)
// @ts-check

/**
 * Represent an ordered collection, where you can add and retreive in precise order elements.
 * Items of the collection [will be retreived]{@link LightestWeightQueue#pop} by weight
 * [specified when added]{@link LightestWeightQueue#push}.
 */
class LightestWeightQueue {

    /**
     * encapsulated array, storing all elements, with weight information
     * 
     * @type {Array.<{element: any, weight: number}>}
     * 
     * @access private
     */
    #orderedElements; // private, no one should access this
    
    /**
     * represent if elements in orderedElements are ordered or not
     * 
     * @type {boolean}
     * 
     * @access private
     */
    #ordered;

    /** 
     * Create an empty WeightQueue
     * 
     * @access public
     */
    constructor() {
        this.#orderedElements = [];
        this.#ordered = true;
    }

    /**
     * Check if collection is empty or not
     * 
     * @returns {boolean} true if there is no elements in collection, else false
     * 
     * @access public
     */
    isEmpty() {
        return this.#orderedElements.length === 0;
    }

    /**
     * add an element in the collection, ordered by weight
     * <br /><br />
     * Time Complexity : O(1)
     * 
     * @param {any} elementName
     * @param {number} weight weight of the element, used to order element, used when [retreiving them]{@link LightestWeightQueue#pop}
     * 
     * @access public
     */
    push(elementName, weight) {
        this.#orderedElements.push({element : elementName, weight : weight});
        this.#ordered = false; // set to false, to reorder it for next pop
    }

    
    /**
     * internal use only
     * 
     * used to order elements by weight in [the array]{@link LightestWeightQueue#orderedElements}.
     * Elements with lightest weights should be at the end, to be retreived when [using pop]{@link LightestWeightQueue#pop}
     * <br /><br />
     * Time complexity : O(n log(n)) (dependant on browsersort algorithm implementation, worst case being 0(n²))
     * 
     * @access private
     */
    #sortQueue() {
        this.#orderedElements.sort((item0, item1) => {
            // if sort function return > 0 => item 1 before item 0
            // more prioritary are the ones in last position of the collection
            return item1.weight - item0.weight; // if > 0, then item 0 is more important than item1, and should be placed after item1
        });
        this.#ordered = true;
    }

    /**
     * Retreive and give back the element with the lightest weight of the collection, removing it from the collection.
     * 
     * Time complexity : 0(n log(n)) if sorting is needed, else O(1).
     * 
     * @returns {{element : any, weight : number} | null} The element removed with lightest weight possible, or null if the collection is empty
     */
    pop() {
        if(!this.#ordered) {
            this.#sortQueue();
        }
        // null means that absance of value is intended, stronger than undefined (from ECMAScript2015 https://262.ecma-international.org/6.0/#sec-terms-and-definitions-undefined-type)
        let toReturn = this.#orderedElements.pop();
        return (toReturn !== undefined) ? toReturn : null;
    }
}

/**
 * Represent a graph, meant to describe here shop architecture
 */
class Graph {

    /**
     * Store arrays representing edges of the current node (id given by index), 
     * with the id of node to reach, and cost to reach it
     * 
     * @type {Array.<Array.<{target: number, weight: number}>>}
     * 
     * @access private
     */
    #nodes;

    /** 
     * Construct a graph with specified number of nodes and no edges defined.
     * 
     * @param {number} nbNodesInGraph 
     */
    constructor(nbNodesInGraph) {
        this.#nodes = Array(nbNodesInGraph); // index represent the node number, it will contain edges
        for(let i = 0; i < nbNodesInGraph; ++i) {
            this.#nodes[i] = []; // ready to receive edges for the node
        }
    }

    /**
     * Add edge for source node, if possible, with a given target node and a weight
     * Give back information if edge was added or not
     * 
     * @param {number} sourceNodeId id of the source node, from where directed edge is starting
     * @param {number} targettedNodeId id of the target node, where directed edge is ending
     * @param {number} weight cost to take the edge
     * @returns {boolean} true if edge was added, else false, for example if you try to add edge to 
     * non-existing edge, which are specified [in the constructor]{@link WeightQueue#constructor}
     * 
     * @access public
     */
    addNewEdge(sourceNodeId, targettedNodeId, weight) {
        if(sourceNodeId >= this.#nodes.length) {
            return false;
        }
        this.#nodes[sourceNodeId].push({target : targettedNodeId, weight : weight});
        return true;
    }

    /**
     * create the array containing, in order, all nodes to visit from a source node to a given targetted node
     * could return false if at some point, path end up on a node without any predecessor.
     * 
     * @param {number} targettedNodeId the end node of the path
     * @param {number[]} precedessorOfEachNodes the predecessing node of each node (given by index).
     * -2 means it's the source node, -1 means no predecessor where found
     * 
     * @returns {number[] | boolean} the shortest path in a list, or false if shortest path is not possible
     * 
     * @access private
     */
    #createShortestPath(targettedNodeId, precedessorOfEachNodes) {
        const toReturn = [];
        let currentNodeId = targettedNodeId;
        while(currentNodeId !== -2) {
            if(currentNodeId === -1) {
                return false;
            }
            toReturn.push(currentNodeId);
            currentNodeId = precedessorOfEachNodes[currentNodeId];
        }
        return toReturn.reverse();
    }
    
    /**
     * allows you to retreive a list of nodes to navigate from source to targetted node.
     * This list will represent the shortest path possible in the graph, ordered
     * 
     * Time complexity : O((v + e) log(v)) where v is the number of nodes, and e the number of edge
     * 
     * @param {number} sourceNodeId id of the node where the shortest path will start
     * @param {number} targettedNodeId id of the node where the shortest path will end
     * 
     * @returns {number[] | boolean} list of array to visit (in order) to get shortest path,
     *  false if specified node ids doesn't exists in current graph
     *  list will be empty if target and source node exists, but there's no path possible
     */
    getShortestPath(sourceNodeId, targettedNodeId) {
        if(sourceNodeId >= this.#nodes.length || targettedNodeId >= this.#nodes.length) {
            return false;
        }

        /**@type {LightestWeightQueue} */
        const navigableNodes = new LightestWeightQueue(); // will store all nodes that we have discovered
        
        // TODO: see typed Array, more cache-friendly, array are arrays of object (references)

        // store the distance, infinite if not reachable ; number < 0 means already reached
        const distances = new Array(this.#nodes.length).fill(Infinity);
        // store the predecessor of each nodes, when discovered
        /**@type {number[]} */
        const predecessorNode = new Array(this.#nodes.length).fill(-1);

        navigableNodes.push(sourceNodeId, 0);
        distances[sourceNodeId] = 0;
        predecessorNode[sourceNodeId] = -2; // no parent

        /** @type {{element : any, weight : number} | null} */
        let shortestReachableNode;

        while((shortestReachableNode = navigableNodes.pop()) !== null) { // while there's still navigable nodes
            
            if(distances[shortestReachableNode.element] >= 0) {
                // reached targetted node
                if(shortestReachableNode.element === targettedNodeId) {
                    // TODO: here, you have O(V) to construct, better if you do it on the go for time optimization
                    return this.#createShortestPath(targettedNodeId, predecessorNode);
                }
                distances[shortestReachableNode.element] = -distances[shortestReachableNode.element]; // to not visit again edge

                this.#nodes[shortestReachableNode.element].forEach(({target, weight}) => {
                    const distanceWithSourceNode = (shortestReachableNode?.weight ?? 0) + weight;
                    if(distances[target] !== "visited" && distanceWithSourceNode < distances[target]) {
                        distances[target] = distanceWithSourceNode;
                        predecessorNode[target] = shortestReachableNode?.element ?? -1; // new precedessor is the one we are visiting
                        navigableNodes.push(target, distances[target]);
                    }
                });
            }
        }

        // if we reach end of navigables nodes, we didn't found the targetted node and explored the whole graph from source node
        return [];
    }
}