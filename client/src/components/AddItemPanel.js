import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";


function AddItemPanel() {
  const [prompt, setPrompt] = useState(true);//temporary set to true for demo
  const [propmtMsg, setPropmtMsg] = useState("Test Msg");//temporary test msg for demo
  const [promptClass, setPromptClass] = useState("success"); //temporary succes class for demo
  const [btnMsg, setBtnMsg] = useState("add");
  const [loading, setLoading] = useState(false);
  //form values
  const [formData, setFormData] = useState({
    itemName: "",
    itemDesc: "",
    itemQ: "",
    itemPrice: "",
  });
  const {
    itemName,
    itemDesc,
    itemQ,
    itemPrice,
  } = formData;

  const addShopItem = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const body = {
      "name": itemName,
      "desc": itemDesc,
      "quantity": itemQ,
      "price": itemPrice,
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/shopItems/`,
        body,
        config
      );

      if (res.status == 200) {
        setPrompt(`Sea time service added for ${res.data.name}`);
        setFormData({
          itemName: "",
          itemDesc: "",
          itemQ: "",
          itemPrice: "",
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setPrompt(`Something went wrong ... couldn't add Item`);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    //addShopItem();
  };


  useEffect(() => { });
  return (
    <div className="addItemPanel">
      {prompt ? <Alert variant={promptClass}>{propmtMsg}</Alert> : <></>}

      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="itemName">
          <Form.Label>Item name</Form.Label>
          <Form.Control type="text" placeholder="Enter Item name"
            name="itemName"
            value={itemName}
            onChange={(e) => onChange(e)} />
        </Form.Group>

        <Form.Group controlId="itemDesc">
          <Form.Label>Description to your Item</Form.Label>
          <Form.Control type="text" placeholder="What is it?" name="itemDesc"
            value={itemDesc}
            onChange={(e) => onChange(e)} />
        </Form.Group>

        <Form.Row>
          <Col>
            <Form.Control type="number" placeholder="Quantity" name="itemQ"
              value={itemQ}
              onChange={(e) => onChange(e)} />
          </Col>
          <Col>
            <Form.Control type="number" step="0.01" placeholder="price" name="itemPrice"
              value={itemPrice}
              onChange={(e) => onChange(e)} />
          </Col>
        </Form.Row>
        <Button variant="primary" type="submit" className="my-2" >
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {btnMsg}
        </Button>
      </Form>
    </div>
  );
}

export default AddItemPanel;