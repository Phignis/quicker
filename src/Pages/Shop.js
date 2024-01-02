//@ts-check

import React, { useState } from "react";
import Navbarr from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import carrefourbefore from "../images/Carrefour-avant.png";
import carrefourafter from "../images/Carrefour-après.png";
import ItemFooter from "../Components/ShopItemFooter";
import { Button } from "react-bootstrap";
import milkimage from "../images/milk.jpg";
import ShopMap from "../Components/ShopMap";
import gsap from "gsap";
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import GraphBuilder from "../backpart/js/classes/GraphBuilder";
import loadStaticGraphJsonTest from "../backpart/js/graph_usage";



gsap.registerPlugin(MotionPathPlugin);

function ShopPage() {
    const dummyShoppingItems = [
        { id: 1, name: "Milk", pricePerUnit: 2.99, picture: milkimage, store: "Carrefour", category: "cheese" },
        { id: 2, name: "Cake", pricePerUnit: 4.99, picture: "path/to/cake.jpg", store: "Carrefour", category: "biscuits" },
        { id: 3, name: "Apples", pricePerUnit: 2.49, picture: "path/to/apples.jpg", store: "Carrefour", category: "promotions" },
        { id: 4, name: "Bread", pricePerUnit: 1.89, picture: "path/to/bread.jpg", store: "Carrefour", category: "biscuits" },
        { id: 6, name: "Pasta", pricePerUnit: 1.99, picture: "path/to/pasta.jpg", store: "Carrefour", category: "biscuits" },
        { id: 7, name: "Yogurt", pricePerUnit: 1.79, picture: "path/to/yogurt.jpg", store: "Carrefour", category: "cheese" },
        { id: 8, name: "Cleaning agent", pricePerUnit: 5.49, picture: "path/to/cleaning_agent.jpg", store: "Carrefour", category: "cleaning products" },
        { id: 9, name: "tuna", pricePerUnit: 19.49, picture: "path/to/tuna.jpg", store: "Carrefour", category: "fish shop" },
        { id: 10, name: "Chicken", pricePerUnit: 8.99, picture: "path/to/chicken.jpg", store: "Carrefour", category: "butchery" },
      ];
  const dummyShops = [
    {
      id: 1,
      name: "Carrefour",
      address: "random address 1",
      mapBeforeModification: carrefourbefore,
      mapAfterModification: carrefourafter,
    },
    {
      id: 2,
      name: "Lidl",
      address: "random address 2",
      mapBeforeModification: "randomBefore",
      mapAfterModification: "randomAfter",
    },
  ];
  
  const [selectedShop, setSelectedShop] = useState(null);
  const [pathFound, setPathFound] = useState(false);
  const [readycheck, setReadyCheck] = useState(false);
  const [optimalpath, setOptimalPath] = useState([]);

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setPathFound(false); 
  };

  const handleFindPath = () => {
    setPathFound(true);
    let dynamicCatToHave = [];
    dummyShoppingItems.forEach(item => {
      dynamicCatToHave.push(item.category)
    });
    dynamicCatToHave = [...new Set(dynamicCatToHave)]; // guarantee unicity
    const g = GraphBuilder.getInstanceForJsonGraph().createGraph(loadStaticGraphJsonTest());
    console.log(g?.getOptimizedPathFor(dynamicCatToHave));
    // @ts-ignore
    setOptimalPath(g?.getOptimizedPathFor(dynamicCatToHave));
    setReadyCheck(true);

  };

  return (
    <div >
      <Navbarr />
      
      <SearchBar  data={dummyShops} onSelectShop={handleShopSelect} />
      <ShopMap optimalpath={optimalpath} ready={readycheck}/>

      <Button variant="success" onClick={handleFindPath} disabled={pathFound}> Find path</Button>
      

      {selectedShop && (
        <img
        // @ts-ignore
        src={pathFound ? selectedShop.mapAfterModification : selectedShop.mapBeforeModification}
          
          
        />
      )}
      <ItemFooter shoppingItems={dummyShoppingItems}   />
    </div>
  );
}

export default ShopPage;