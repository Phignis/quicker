import React from "react";
import { Col,Card, Button, FormCheck} from "react-bootstrap";
import classes from "../Components/ItemCardC.module.css";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

function ItemCardS(props){
    const test={ id: 1, name: "Milk", pricePerUnit: 2.99, picture: "path/to/milk.jpg", store: "Carrefour" };
    return(
<Col sm="12" lg="4" md="6">

<Card  className={classes.seReCard} >
<Card.Img src={props.picture}  height="50px" width="50px"/>
<Card.Body>
<Card.Title>{props.name}</Card.Title>
<FormCheckInput></FormCheckInput>
</Card.Body>
</Card>

</Col>
) }
export default ItemCardS;
