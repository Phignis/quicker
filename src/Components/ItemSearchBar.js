
import React, { useState } from "react";
import { Container, InputGroup, Form, ListGroup } from "react-bootstrap";

const ItemSearchBar = ({ data, onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults =
    searchTerm !== ""
      ? data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.store.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleItemSelect = (item) => {
    onSelectItem(item);
    setSearchTerm(""); 
  };

  return (
    <Container>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text></InputGroup.Text>
        <Form.Control
          placeholder="Find your Item.. "
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <ListGroup>
        {searchTerm !== "" ? (
          filteredResults.length === 0 ? (
            <ListGroup.Item>No results found.</ListGroup.Item>
          ) : (
            filteredResults.map((item) => (
              <ListGroup.Item
                key={item.id}
                action
                onClick={() => handleItemSelect(item)}
              >
                <strong>{item.name}</strong>
              </ListGroup.Item>
            ))
          )
        ) : null}
      </ListGroup>
    </Container>
  );
};

export default ItemSearchBar;
