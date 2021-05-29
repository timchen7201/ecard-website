import React,{useState} from 'react'
// import{ createBrowserHistory } from "react-router";

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { Redirect } from 'react-router'

export default function Entry(){
  const [jump,setJump]=useState(false)
  const [show, setShow] = useState(true);
  const [code,setCode] = useState("none")
  const handleClose = () => setShow(false);
  
  return (
    <div className="container">
      {
          jump?(<Redirect to={`/view/${code}`}/>):(
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>請輸入禮物代碼</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Code</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    aria-label="Small" 
                    aria-describedby="inputGroup-sizing-sm" 
                    onChange={(e)=> setCode(e.target.value)}
                    />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{
                setCode("none")
                setJump(true)
              }}>
                沒收到
              </Button>
              <Button variant="primary" onClick={()=>{
                  setJump(true)
              }}>
                  送出
              </Button>
            </Modal.Footer>
          </Modal>
          )
      }
    </div>
    )
}
