import React, { useState } from "react";
import { Container, InputGroup, Form, ListGroup } from "react-bootstrap";

const SearchBar = ({ data, onSelectShop }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults =
    searchTerm !== ""
      ? data.filter(
          (shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleShopSelect = (shop) => {
    onSelectShop(shop);
    setSearchTerm(""); // Clear the search term
  };

  return (
    <Container>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text></InputGroup.Text>
        <Form.Control
          placeholder="Find your Store.. "
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
            filteredResults.map((shop) => (
              <ListGroup.Item
                key={shop.id}
                action
                onClick={() => handleShopSelect(shop)}
              >
                <strong>{shop.name}</strong> - {shop.address}
              </ListGroup.Item>
            ))
          )
        ) : null}
      </ListGroup>
    </Container>
  );
};

export default SearchBar;