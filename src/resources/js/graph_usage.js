// @ts-check

const loadStaticGraphJsonTest = () => {
    return JSON.parse(`{
        "graph": {
          "directed": true,
          "type": "graph type",
          "label": "grocery_image_example graph",
          "metadata" : {
            "targetUrl" : "http://url.to.gather.graph"
          },
          "nodes": {
            "0": {
              "label": "entry alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "cleaning products"
                ],
                "entry": true,
                "exit": true
              }
            },
            "1": {
              "label": "connecting alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                ]
              }
            },
            "2" : {
              "label": "promotions alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "biscuits",
                  "promotions",
                  "charcuterie",
                  "cheese"
                ]
              }
            },
            "3" : {
              "label": "leftmost alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "charcuterie",
                  "cheese"
                ]
              }
            },
            "4" : {
              "label": "central alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "games",
                  "biscuits",
                  "cleaning products"
                ]
              }
            },
            "5" : {
              "label": "rightmost alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "fish shop"
                ]
              }
            },
            "6" : {
              "label": "back alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "butchery",
                  "fish shop"
                ]
              }
            }
          },
          "edges": [
            {
              "relation": "edge relationship",
              "source": "0",
              "target": "1",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "0",
              "target": "2",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "0",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "1",
              "target": "0",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 1
              }
            },
            {
              "relation": "edge relationship",
              "source": "1",
              "target": "4",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 1
              }
            },
            {
              "relation": "edge relationship",
              "source": "2",
              "target": "0",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "2",
              "target": "3",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "3",
              "target": "2",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "3",
              "target": "4",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "3",
              "target": "6",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "1",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "3",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 4
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 4
              }
            },
            {
              "relation": "edge relationship",
              "source": "5",
              "target": "0",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "5",
              "target": "4",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "5",
              "target": "6",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "6",
              "target": "3",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 5
              }
            },
            {
              "relation": "edge relationship",
              "source": "6",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 5
              }
            }
          ]
        }
      }`)
}


const loadStaticGraphClassTest = () => {
  let toReturn = new Graph(7);

  toReturn.addNewEdge(0, 1, 3);
  toReturn.addNewEdge(0, 2, 3);
  toReturn.addNewEdge(0, 5, 3);
  toReturn.addNewEdge(1, 0, 1);
  toReturn.addNewEdge(1, 4, 1);
  toReturn.addNewEdge(2, 0, 2);
  toReturn.addNewEdge(2, 3, 2);
  toReturn.addNewEdge(3, 2, 3);
  toReturn.addNewEdge(3, 4, 2);
  toReturn.addNewEdge(3, 6, 3);
  toReturn.addNewEdge(4, 1, 3);
  toReturn.addNewEdge(4, 3, 4);
  toReturn.addNewEdge(4, 5, 4);
  toReturn.addNewEdge(5, 0, 3);
  toReturn.addNewEdge(5, 4, 2);
  toReturn.addNewEdge(5, 6, 3);
  toReturn.addNewEdge(6, 3, 5);
  toReturn.addNewEdge(6, 5, 5);

  return toReturn;
}

const parseGraphFromJsonGraphtest = () => {
  return GraphBuilder.getInstanceForJsonGraph().createGraph(loadStaticGraphJsonTest());
}

const getShortestPath = (sourceNode, targetNode) => {
  const g = GraphBuilder.getInstanceForJsonGraph().createGraph(loadStaticGraphJsonTest());
  // @ts-ignore
  let sourceId = Number(document.getElementById("sourceNodeId")?.value);
  // @ts-ignore
  let targetId = Number(document.getElementById("targettedNodeId")?.value);
  console.log("shortest path from node " + sourceId + " to node " + targetId)
  console.log(g?.getShortestPath(sourceId, targetId));
}

const getOptimizedPath = () =>  {
  const catToHave = ["cleaning products", "butchery", "biscuits"];
  const g = GraphBuilder.getInstanceForJsonGraph().createGraph(loadStaticGraphJsonTest());
  console.log(g?.getOptimizedPathFor(catToHave));
}