import { React , useState} from "react";
import ItemSearchBar from "../Components/ItemSearchBar";
import Navbarr from "../Components/Navbar";
import ItemCardC from "../Components/ItemCardC";
import milkimage from "../images/milk.jpg";
import cookiesimage from "../images/cookies.jpg";
import eggsimage from "../images/eggs.png";

function CoursesPage(){
    const dummyShoppingItems = [
        { id: 1, name: "Milk", pricePerUnit: 2.99, picture: milkimage, store: "Carrefour" },
        { id: 2, name: "Cookies", pricePerUnit: 1.49, picture: cookiesimage, store: "Lidl" },
        { id: 4, name: "Eggs", pricePerUnit: 1.79, picture: eggsimage, store: "Lidl" },
        { id: 5, name: "Cake", pricePerUnit: 4.99, picture: "path/to/cake.jpg", store: "Carrefour" },
        { id: 6, name: "Cereal", pricePerUnit: 3.29, picture: "path/to/cereal.jpg", store: "Lidl" },
        { id: 7, name: "Apples", pricePerUnit: 2.49, picture: "path/to/apples.jpg", store: "Carrefour" },
        { id: 8, name: "Cheese", pricePerUnit: 5.99, picture: "path/to/cheese.jpg", store: "Lidl" },
        { id: 9, name: "Bread", pricePerUnit: 1.89, picture: "path/to/bread.jpg", store: "Carrefour" },
        { id: 10, name: "Coffee", pricePerUnit: 6.49, picture: "path/to/coffee.jpg", store: "Lidl" },
        { id: 11, name: "Tea", pricePerUnit: 2.99, picture: "path/to/tea.jpg", store: "Carrefour" },
        { id: 12, name: "Salad", pricePerUnit: 3.79, picture: "path/to/salad.jpg", store: "Lidl" },
        { id: 13, name: "Pasta", pricePerUnit: 1.99, picture: "path/to/pasta.jpg", store: "Carrefour" },
        { id: 14, name: "Tomatoes", pricePerUnit: 2.29, picture: "path/to/tomatoes.jpg", store: "Lidl" },
        { id: 15, name: "Chicken", pricePerUnit: 8.99, picture: "path/to/chicken.jpg", store: "Carrefour" },
        { id: 16, name: "Oranges", pricePerUnit: 3.49, picture: "path/to/oranges.jpg", store: "Lidl" },
        { id: 17, name: "Yogurt", pricePerUnit: 1.79, picture: "path/to/yogurt.jpg", store: "Carrefour" },
        { id: 18, name: "Ice Cream", pricePerUnit: 4.99, picture: "path/to/ice-cream.jpg", store: "Lidl" },
        { id: 19, name: "Olive Oil", pricePerUnit: 5.49, picture: "path/to/olive-oil.jpg", store: "Carrefour" },
        { id: 20, name: "Bananas", pricePerUnit: 1.69, picture: "path/to/bananas.jpg", store: "Lidl" },
      ];

      const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelect = (item) => {
    
    if (!selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleItemDelete = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <Navbarr />
      <ItemSearchBar data={dummyShoppingItems} onSelectItem={handleItemSelect} />

      {selectedItems.length === 0 ? (
        <p>Empty shopping list</p>
      ) : (
        <div>
          <h3>Shopping List</h3>
          {selectedItems.map((item) => (
            <ItemCardC
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.pricePerUnit}
              picture={item.picture}
              onDelete={handleItemDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default CoursesPage ;