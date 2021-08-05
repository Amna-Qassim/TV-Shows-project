import React, {useRef, useEffect} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Style.css';

const SearchPage = () => {
  const inputRef = useRef(null);

  /*this function is the callback accepts a single parameter:
  an object based on Event describing the event that has occurred, and it returns nothing.*/
  const handleKeyPress = (event) => {
    if(event.key === '/') {
      inputRef.current.focus();
    }
  };
/*useEffect run just after first render but the listener is always listen to event and when the
event happen the browser tell the react to render useEffect again*/
  React.useEffect(() => {
    //Type of event I want to listen to it is ==>keypress is one of the keyboard functions type
    //handelkeypress is a function it's run after press a key
    //here the second parameter it's can be callback function or object
    window.addEventListener("keypress", handleKeyPress);
    // cleanup this component
    return () => {
      //in this code this line it will not run in any time but it's good practice to write here
      //the clean up happen just when the element delete after that clean up happen
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <Row>
      <Col xs={4}>
        <p>Search:</p>
        <div>
          <FormControl className="formControl" ref={inputRef} onKeyPress={handleKeyPress}/>
          <Button className="searchButton">Search</Button>
        </div>
      </Col>
    </Row>
  )
}

export default SearchPage;
