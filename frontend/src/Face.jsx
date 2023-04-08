import React, { useRef, useEffect, useState } from "react";
import { drawConnectors } from "@mediapipe/drawing_utils";
import Webcam from "react-webcam";
import './App.css';
import "./components/toggle.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';



  render() {
    return (
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="login" placeholder="ФИО" name="login"/>
          </Form.Group>
    
          <Button variant="secondary" type="submit" name="presence" value="{{dieTime}}">
            Submit
          </Button>
        </Form>
    );
  }



export default Face;