// to enable type checking with JSDoc (rather than full TypeScript)
// @ts-check

/**
 * Represent an ordered collection, where you can add and retreive in precise order elements.<br />
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
    //#region attributes
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
     * 
     * @access private
     */
    #entries;

    /**
     * store nodes id which have exists
     * 
     * @access private
     */
    #exits;
    //#endregion

    //#region constructors
    /** 
     * Construct a graph with specified number of nodes and no edges defined.
     * 
     * @param {number} nbNodesInGraph 
     * 
     * @access public
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
    //#endregion

    //#region addInfo
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
     * 
     * @access public
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
     * 
     * @access public
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
     * 
     * @access public
     */
    addExit(exitNode) {
        if(exitNode < this.#nodesEdges.length) {
            this.#exits.push(exitNode);
            return true;
        }
        return false;
    }
    //#endregion
  
    //#region checkInfo
    /**
     * Given a list of nodes, check if there is an entry among them, and return it
     * 
     * @param {number[]} nodes list of nodes to check
     * 
     * @returns {number | undefined} dirst entry node id, undefined if there is none
     * 
     * @access private
     */
    #isThereEntryIn(nodes) {
        const currentEntries = nodes.filter(elt => this.#entries.includes(elt));
    
        return (currentEntries.length !== 0) ? currentEntries[0] : undefined;
    }

    /**
     * Given a list of nodes, check if there is an exit among them, and return it
     * 
     * @param {number[]} nodes list of nodes to check
     * 
     * @returns {number | undefined} first exit node id, undefined if there is none
     * 
     * @access private
     */
    #isThereExitIn(nodes) {
        const currentExits = nodes.filter(elt => this.#exits.includes(elt));
    
        return (currentExits.length !== 0) ? currentExits[0] : undefined;
    }
    //#endregion

    //#region dijkstra related
    /**
     * create the array containing, in order, all nodes to visit from a source node to a given targetted node
     * could return false if at some point, path end up on a node without any predecessor.
     * 
     * @param {number} targettedNodeId the end node of the path
     * @param {number[]} precedessorOfEachNodes the predecessing node of each node (given by index).
     * -2 means it's the source node, -1 means no predecessor where found
     * 
     * @returns {number[] | false} the shortest path in a list, or false if shortest path is not possible
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
     * This list will represent the shortest path possible in the graph.
     * <br /><br />
     * Time complexity : O((v + e) log(v)) where v is the number of nodes, and e the number of edge
     * 
     * @param {number} sourceNodeId id of the node where the shortest path will start
     * @param {number} targettedNodeId id of the node where the shortest path will end
     * 
     * @returns {{path : number[], cost : number} | false} list of array to visit (in order) to get shortest path<br/>
     *  false if specified node ids doesn't exists in current graph<br />
     *  list will be empty if target and source node exists, but there's no path possible
     * 
     * @access public
     */
    getShortestPath(sourceNodeId, targettedNodeId) {
        if(sourceNodeId >= this.#nodesEdges.length || targettedNodeId >= this.#nodesEdges.length) {
            return false;
        }

        /**@type {LightestWeightQueue} */
        const navigableNodes = new LightestWeightQueue(); // will store all nodes that we have discovered
        
        // TODO: see typed Array, more cache-friendly, array are arrays of object (references)

        // store the distance, infinite if not reachable ; number < 0 means already reached
        const distances = new Array(this.#nodesEdges.length).fill(Infinity);
      
        // store the predecessor of each nodes, when discovered
        /**@type {number[]} */
        const predecessorNode = new Array(this.#nodesEdges.length).fill(-1);

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
                    // @ts-ignore
                    return {path : this.#createShortestPath(targettedNodeId, predecessorNode), cost : distances[targettedNodeId]};
                }
                distances[shortestReachableNode.element] = -distances[shortestReachableNode.element]; // to not visit again edge

                this.#nodesEdges[shortestReachableNode.element].forEach(({target, weight}) => {
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
        return {path : [], cost : 0};
    }
    //#endregion

    //#region determine nodes to visit 

    /**
     * return minimum nodes for all wanted products
     * 
     * @param {string[]} wantedCategories categories you want to find nodes for
     * 
     * @returns {number[]} array of nodes for products, all non existing categories will not be satisfied
     * 
     * @access private
     */
    #getNodesFor(wantedCategories) {
        // TODO: for now, nodes are picked without thought, but you should prefer the ones satisfying the most the categories
        const nodesToReturn = [];
        let indexNode = 0;
        while(wantedCategories.length !== 0 && indexNode < this.#nodesProductsCategories.length) {
            let initialNbWantedCat = wantedCategories.length;
            // remove satisfied cat by current node
            wantedCategories = wantedCategories.filter(elt =>
                !this.#nodesProductsCategories[indexNode].includes(elt)
            );
            if(wantedCategories.length < initialNbWantedCat) { // node deliver some categories
                nodesToReturn.push(indexNode);
            }
            ++indexNode;
        }
        return nodesToReturn;
    }

    /**
     * get all possible permutations from given array
     * 
     * @param {number[]} array array you want to find all permutations from
     * 
     * @returns {Array.<number[]>} array giving back all permutation possible
     * 
     * @access private
     */
    #getAllPossiblePermutationsFrom(array) {
        // TODO: complete with all permutation possible
        return [[...array]]; // create shallow copy of array, and encapsulate it in main array
    }

    /**
     * Determine all nodes you have to visit from given categories you want, with one node of entry and
     * one of exit included
     * 
     * @param {Array.<string>} wantedCategories all categories of product needed
     * 
     * @returns {number[] | false} list of array to visit (in order) to get shortest path<br/>
     *  false if specified node ids doesn't exists in current graph<br />
     *  list will be empty if target and source node exists, but there's no path possible
     * 
     * @access public
     */
    getOptimizedPathFor(wantedCategories) {
        const nodesToVisit = this.#getNodesFor(wantedCategories);
        // get entry and exit, or get some if not existing, to avoid too much permutations
        let entry, exit;
        if((entry = this.#isThereEntryIn(nodesToVisit)) === undefined) {
            entry = this.#entries[Math.floor(Math.random() * this.#entries.length)];
        } else {
            nodesToVisit.splice(nodesToVisit.indexOf(entry), 1); // indexOf will found (check before)
        }
        if((exit = this.#isThereExitIn(nodesToVisit)) === undefined) {
            exit = this.#exits[Math.floor(Math.random() * this.#exits.length)];
            
        } else {
            nodesToVisit.splice(nodesToVisit.indexOf(exit), 1); // indexOf will found (check before)
        }
        // do permutation
        const allPossibilities = this.#getAllPossiblePermutationsFrom(nodesToVisit);
        
        let optimizedPath = allPossibilities[0];
        let optimizedCost = Infinity;
        // add entry and exit to all possibilities, and get their optimized path
        allPossibilities.forEach(possibility => {
            possibility.unshift(entry);
            possibility.push(exit);
            let currentCost = 0;
            let totalPath = [];
            for(let i = 1; i < possibility.length; ++i) {
                let data = this.getShortestPath(possibility[i - 1], possibility[i]);
                if(data === false || data.path.length === 0) { // nodes are not reachable
                    currentCost = Infinity;
                    break;
                } else {
                    currentCost += data.cost;
                    totalPath = totalPath.concat(data.path);
                }
            }
            if(currentCost < optimizedCost) {
                optimizedCost = currentCost;
                optimizedPath = totalPath;
            }
        });

        return optimizedPath;
    }
    //#endregion
}

export default Graph;