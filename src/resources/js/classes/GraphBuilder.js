// @ts-check

/**
 * Provide builder in order to create a unified representation of {@link Graph}
 * from various initial representation
 */
class GraphBuilder {
    constructor() {
        if (this.constructor == GraphBuilder) {
            throw new Error('Abstract class can\'t be instanciated !');
        }
    }

    /**
     * Get an instance of builder, meant to create a [graph]{@link Graph}
     * 
     * @returns {GraphBuilder} a builder meant to parse object following JsonGraph standard,
     * [standard available here]{@link https://github.com/jsongraph/json-graph-specification/tree/master}
     * 
     * @access public
     */
    static getInstanceForJsonGraph() {
        return new GraphBuilderJsonGraph();
    }

    /**
     * Return Graph from given object, by doing a shallow copy of it. Arrays are not stored by reference,
     * but rather by shallow copy
     * 
     * @param {Object} objectToParse original representation of the Graph
     * 
     * @returns {Graph | null } formatted Graph if all went good, null if given objectToParse does not respect
     * builder expected format
     * 
     * @access public
     */
    createGraph(objectToParse) {
        return null; // just to avoid type check error, but useless
    }
}

class GraphBuilderJsonGraph extends GraphBuilder {
    createGraph(objectToParse) {
        if(objectToParse.graph === undefined || objectToParse.graph.nodes === undefined ||
            objectToParse.graph.edges === undefined) {
            return null;
        }

        const toReturn = new Graph(Object.keys(objectToParse.graph.nodes).length);
        
        // setup categories, entry & exit 
        Object.values(objectToParse.graph.nodes).forEach(({metadata}, index) => {
            toReturn.addCategoriesFor(index, metadata.availableProducts);
            if(metadata.entry !== undefined) {
                toReturn.addEntry(index);
            }
            if(metadata.exit !== undefined) {
                toReturn.addExit(index);
            }
        });

        // setup edges
        objectToParse.graph.edges.forEach(edge => {
            toReturn.addNewEdge(Number(edge.source), Number(edge.target), Number(edge.metadata.weight));

        });

        return toReturn;
    }
}