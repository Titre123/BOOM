import React from 'react';
import { Button } from 'reactstrap';
import '../../styles/components/button.css'

const MyButton = (props) => {
  return (
    <Button className='btn-back' onClick={props.click}>
      {props.value}
    </Button>
  );
}

export default MyButton;
