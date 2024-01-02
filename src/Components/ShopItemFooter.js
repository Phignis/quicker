
import React, { useState } from "react";
import { Button, ListGroup, Row } from "react-bootstrap";
import ItemCardS from "./ItemCardS";


function ItemFooter({ shoppingItems }) {
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <div  style={{ maxHeight: "50%", overflowY: "auto",position: "fixed", bottom: 0, left: 0, width: "100%", background: "#f0f0f0" }}>
      <Button onClick={toggleListVisibility}>
        {isListVisible ? "Hide List" : "Show List"}
      </Button>
      {isListVisible && (
        <Row>
          {shoppingItems.map((item) => (
            <ItemCardS
              key={item.id}
              name={item.name}
              picture={item.picture}
            />
          ))}
        </Row>
      )}
    </div>
  );
}

export default ItemFooter;
