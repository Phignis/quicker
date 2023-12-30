// @ts-check

/**
 * Represent an ordered collection, where you can add and retreive in precise order elements.<br />
 * Items of the collection [will be retreived]{@link LightestWeightQueue#pop} by weight
 * [specified when added]{@link LightestWeightQueue#push}.
 */
class LightestWeightQueue {

    /**
     * encapsulated continuous array, storing all elements, with weight information
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
     * <br /><br />
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
    #nodesEdges;

    /**
     * Store arrays representing categories of product available in the current node (id given by index)
     * 
     * @type {Array.<Array.<string>>}
     * 
     * @access private
     */
    #nodesProductsCategories;

    /**
     * store nodes id which have entries
     */
    #entries;

    /**
     * store nodes id which have exists
     */
    #exits;

    /** 
     * Construct a graph with specified number of nodes and no edges defined.
     * 
     * @param {number} nbNodesInGraph 
     */
    constructor(nbNodesInGraph) {
        this.#nodesEdges = []; // index represent the node number, it will contain edges
        this.#nodesProductsCategories = [];
        this.#entries = [];
        this.#exits = [];
        for(let i = 0; i < nbNodesInGraph; ++i) {
            this.#nodesEdges[i] = []; // ready to receive edges for the node
            this.#nodesProductsCategories[i] = [];
        }
    }

    /**
     * Add edge for source node, if possible, with a given target node and a weight
     * Give back information if edge was added or not
     * 
     * @param {number} sourceNodeId id of the source node, from where directed edge is starting
     * @param {number} targettedNodeId id of the target node, where directed edge is ending
     * @param {number} weight cost to go to target node using the edge
     * @returns {boolean} true if edge was added, else false, for example if you try to add edge to 
     * non-existing edge, which are specified [in the constructor]{@link WeightQueue#constructor}
     * 
     * @access public
     */
    addNewEdge(sourceNodeId, targettedNodeId, weight) {
        if(sourceNodeId >= this.#nodesEdges.length) {
            return false;
        }
        this.#nodesEdges[sourceNodeId].push({target : targettedNodeId, weight : weight});
        return true;
    }

    /**
     * Set categories of ressources available for a given node
     * 
     * @param {number} nodeId id of the node which categories are for 
     * @param {Array.<String>} categoriesToSet categories of ressource available to add
     * 
     * @returns {boolean} true if categories where added, false if node does not exists in current graph
     */
    addCategoriesFor(nodeId, categoriesToSet) {
        if(nodeId < this.#nodesEdges.length) {
            this.#nodesProductsCategories[nodeId] = this.#nodesProductsCategories[nodeId].concat(categoriesToSet);
            return true;
        }
        return false;
    }

    /**
     * add an entry to graph
     * 
     * @param {number} entryNode id of the node where you can enter in the building
     * 
     * @returns {boolean} true if exit is added, false if entry node id given does not exists in graph
     */
    addEntry(entryNode) {
        if(entryNode < this.#nodesEdges.length) {
            this.#entries.push(entryNode);
            return true;
        }
        return false;
    }

    /**
     * add an exit to graph
     * 
     * @param {number} exitNode id of the node where you can exit in the building
     * 
     * @returns {boolean} true if exit is added, false if exit node id given does not exists in graph
     */
    addExit(exitNode) {
        if(exitNode < this.#nodesEdges.length) {
            this.#exits.push(exitNode);
            return true;
        }
        return false;
    }
    
    /**
     * allows you to retreive a list of nodes to navigate from source to targetted node.
     * This list will represent the shortest path possible in the graph.<br /><br />
     * 
     * Time complexity : O((v + e) log(n)) where v is the number of nodes, and e the number of edge
     * 
     * @param {number} sourceNodeId id of the node where the shortest path will start
     * @param {number} targettedNodeId id of the node where the shortest path will end
     * 
     * @returns {number[] | false} list of array to visit (in order) to get shortest path<br/>
     *  false if specified node ids doesn't exists in current graph<br />
     *  list will be empty if target and source node exists, but there's no path possible
     */
    getShortestPath(sourceNodeId, targettedNodeId) {
        if(sourceNodeId >= this.#nodesEdges.length || targettedNodeId >= this.#nodesEdges.length) {
            return false;
        }

        /**@type {LightestWeightQueue} */
        const navigableNodes = new LightestWeightQueue(); // will store all nodes that we have discovered
        // store the distance, infinite if not reachable ; number < 0 means already reached
        const distances = new Array(this.#nodesEdges.length).fill(Infinity);
        /**@type {number[]} */
        const pathToTargetted = [sourceNodeId]; // store the shortest path to target from source

        navigableNodes.push(sourceNodeId, 0);
        distances[sourceNodeId] = 0;

        /**@type {{element : any, weight : number} | null} */
        let shortestReachableNode;

        while((shortestReachableNode = navigableNodes.pop()) !== null) { // while there's still navigable nodes

            // to uncomment when you'll want to search from one path to another
            // if(distances[indexNodeToVisit] !== "visited") {
                // distances[indexNodeToVisit] = "visited"; // to not visit again edge

            if(distances[shortestReachableNode.element] >= 0) {
                distances[shortestReachableNode.element] = -distances[shortestReachableNode.element]; // to not visit again edge

                this.#nodesEdges[shortestReachableNode.element].forEach(({target, weight}) => {
                    const distanceWithSourceNode = (shortestReachableNode?.weight ?? 0) + weight;
                    if(distances[target] !== "visited" && distanceWithSourceNode < distances[target]) {
                        distances[target] = distanceWithSourceNode;
                        navigableNodes.push(target, distances[target]);
                    }
                });
            }
        }

        // just display distance from origin for now
        console.log("Vertex Distance from Source");
        for (let i = 0; i < this.#nodesEdges.length; ++i) {
            console.log(`${i}\t\t${distances[i] === Infinity ? "Infinity" : -distances[i]}`);
        }
        return pathToTargetted;
    }
}