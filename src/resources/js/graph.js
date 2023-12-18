const loadStaticGraphTest = () => {
    return JSON.parse(`{
        "graph": {
          "directed": false,
          "type": "graph type",
          "label": "grocery_image_example graph",
          "metadata" : {
            "targetUrl" : "http://url.to.gather.graph"
          },
          "nodes": {
            "1": {
              "label": "entry alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "cleaning products"
                ]
              }
            },
            "2": {
              "label": "connecting alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                ]
              }
            },
            "3" : {
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
            "4" : {
              "label": "leftmost alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "charcuterie",
                  "cheese"
                ]
              }
            },
            "5" : {
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
            "6" : {
              "label": "rightmost alley",
              "metadata": {
                "type": "node type",
                "availableProducts" : [
                  "fish shop"
                ]
              }
            },
            "7" : {
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
              "source": "1",
              "target": "2",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "1",
              "target": "3",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "1",
              "target": "6",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "2",
              "target": "1",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 1
              }
            },
            {
              "relation": "edge relationship",
              "source": "2",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 1
              }
            },
            {
              "relation": "edge relationship",
              "source": "3",
              "target": "1",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "3",
              "target": "4",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "3",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "4",
              "target": "7",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "5",
              "target": "2",
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
                "direction" : "straight on",
                "weight" : 4
              }
            },
            {
              "relation": "edge relationship",
              "source": "5",
              "target": "6",
              "directed": true,
              "metadata": {
                "direction" : "straight on",
                "weight" : 4
              }
            },
            {
              "relation": "edge relationship",
              "source": "6",
              "target": "1",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "6",
              "target": "5",
              "directed": true,
              "metadata": {
                "direction" : "right",
                "weight" : 2
              }
            },
            {
              "relation": "edge relationship",
              "source": "6",
              "target": "7",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 3
              }
            },
            {
              "relation": "edge relationship",
              "source": "7",
              "target": "4",
              "directed": true,
              "metadata": {
                "direction" : "left",
                "weight" : 5
              }
            },
            {
              "relation": "edge relationship",
              "source": "7",
              "target": "6",
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
