import { Container, Row, Col} from 'react-bootstrap';
import React from 'react';
import  { useState } from 'react';



const CustomOptions = props =>{

  return(
    <>
      {props.displayKeys.length>1 ?
      <>
        {props.displayKeys.length ===2 ?
          <>
            <Row onClick = {(selection)=>props.select(props.option)}
                 style ={{margin:'0vh'}}
                 className ='dropdown-item '>
              <p className ='dropdown-text roaming-black-text'>
                {props.option[props.displayKeys[0]]+", "+props.option[props.displayKeys[1]]}
              </p>
            </Row>
          </>
        :null}
        {props.displayKeys.length ===3 ?
          <>
            <Row onClick = {(selection)=>props.select(props.option)}
                style ={{margin:'0vh'}}
                 className ='dropdown-item '>
                <p className ='dropdown-text roaming-black-text'>
                  {props.option[props.displayKeys[0]]+", "+props.option[props.displayKeys[1]]+ ", "+props.option[props.displayKeys[2]]}
                </p>
            </Row>
          </>
        :null}
      </>:
      <Row onClick = {(selection)=>props.select(props.option)}
           style ={{margin:'0vh'}}
           className ='dropdown-item'>
           <p className ='dropdown-text roaming-black-text'>
            {props.option[props.displayKeys[0]]}
          </p>
      </Row>
    }




    </>
  )
}

const SearchDrop = props => {

  // const [searchValue, setSearchValue] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  function updateSearch(e){
    props.setSearchValue(e.target.value)
    // if (e.target.value.length>0) {
      setShowDropDown(true)
    props.updateOptions(e)
    // setOptions(newOptions)
  }
  function select(selection){

    let display = ''
    if (props.displayKeys.length>1) {
      display = selection[props.displayKeys[0]]
      for (var i = 1; i < props.displayKeys.length; i++) {
        display = display + " ("+ selection[props.displayKeys[i]]+ ")"
      }
    }
    else {
      display = selection[props.displayKeys[0]]
    }

    props.setSearchValue(display)
    setShowDropDown(false);
    props.selectOption(selection)
  }
  function showDefaultOptions(){
      setShowDropDown(true);
  }
  function cancelOptions(){
     // setShowDropDown(false);
    setTimeout(() => {
     setShowDropDown(false);
  },300)


  }

return(
  <>

      <Row>
        <Col className =''>
        <form autoComplete="off" >
          <Row className ='nice-input-wrapper'>

              <input style ={{minWidth:'25vw'}}
                    className ={props.invalidInput? 'error-input':'roaming-black-text'}
                     type = 'text'
                     id= {props.inputId}
                     value = {props.searchValue}
                     name = {props.inputName}
                     placeholder={props.inputLabel}
                     onChange ={(e)=>updateSearch(e)}
                     onFocus = {showDefaultOptions}
                     onBlur = {cancelOptions}/>
              <label htmlFor={props.inputId}
                     className ={props.invalidInput? 'error-label':'roaming-black-text'}>

                {props.inputLabel}

              </label>

          </Row>
          </form>
        </Col>
      </Row>
      {showDropDown?
        <>
          <Row >
            <Container className ='raised-borders round-borders ' style ={{width:'95%',margin:'0vh',padding:'0vh'}}>
              {props.options.slice(0,10).map((option, i)=>{return <CustomOptions option = {option}
                                                                                 displayKeys = {props.displayKeys}
                                                                                 select = {select}
                                                                                 valueKey ={props.valueKey}
                                                                                 multiValueKeys = {props.multiValueKeys}
                                                                                 key={option[props.keyFields[0]]+option[props.keyFields[1]]+option[props.keyFields[2]]}/>})}
            </Container>
          </Row>
        </>
      :null}



  </>
)}

export default SearchDrop;
