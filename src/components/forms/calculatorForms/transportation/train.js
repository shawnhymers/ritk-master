import React from 'react';
import { Container,Row,Col,Button} from 'react-bootstrap';
import { connect } from "react-redux";
import {submitTrain} from "../../../../store/actions/creators/submits"
import {useState} from "react";
import gridData from "../../../data/gridData"
import SearchDrop from '../../../sharedComponents/formComponents/searchDrop';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CarbonTotal from "../../../sharedComponents/carbonTotal"
import HelpIcon from "../../../sharedComponents/helpIcon"
import GreenRadio from "../../../sharedComponents/formComponents/greenRadio"
import { useDispatch } from "react-redux";

const TrainForm = props => {
  const dispatch = useDispatch();
  const [countrySearchValue, setCountrySearchValue] =useState('')

  const [countryOptions, setCountryOptions] = useState(gridData);
  const [selectedGridRegion,setGridRegion]  = useState('');

  const [distance, setDistance] =useState('');
  const [engineType, setEngineType] =useState('diesel');

  const [carbonFootprint,setCarbonFootprint] =useState(0)

  const [countryError,setCountryError]=useState(false)
  const [distanceError,setDistanceError]=useState(false)


  function updateGridRegions(e){
    console.log('udating grid regions')
    console.log(e.target.value);
    var options = gridData.filter(function (el)
    {
      return el.country.toUpperCase().includes(e.target.value.toUpperCase())
    })
    setCountryOptions(options);

  }
  function updateEngineType(e){
    console.log('updating Engine type')
    setEngineType(e.target.value);
    updateCarbonFootprint(e.target.value,distance,selectedGridRegion)
  }

  function updateDistance(e){
    if (!isNaN(parseInt(e.target.value))) {
      setDistance(parseInt(e.target.value));
      updateCarbonFootprint(engineType,parseInt(e.target.value),selectedGridRegion)
    }
    else {
      setDistance('');
      updateCarbonFootprint(engineType,0,selectedGridRegion)
    }

  }
  function selectGridRegion(region){
    console.log('setting grid region')
    console.log(region);
    setGridRegion(region)
    updateCarbonFootprint(engineType,distance,region)
  }
  function updateCarbonFootprint(engineType, distance, region){
    let footprint=0;
    if (engineType==='electric') {
      let footprint = parseFloat(distance)*0.0882*region.carbon;
      setCarbonFootprint(footprint)
    }
    else if (engineType==='diesel') {
      let footprint = parseFloat(distance)*0.0252*3.132;
      setCarbonFootprint(footprint)
    }
    else {
      setCarbonFootprint(footprint)
    }

  }
  function updateCountrySearchValue(value){
    setCountrySearchValue(value)
    if (value==='') {
      setGridRegion({})
    }
  }
  function addTrain(){

    if (carbonFootprint>0) {
      let data ={country:selectedGridRegion.country,
                 distance: distance,
                 engineType:engineType,
                 carbonFootprint:carbonFootprint,
                 type:'transport',
                 subType:'train'
             }
      // props.addCarbonCostItem(data)
      dispatch(submitTrain(data))
      resetState()
    }
    else {
      if (distance<=0) {
        setDistanceError(true)
      }
      else {
        setDistanceError(false)
      }
      if (selectedGridRegion.country===undefined) {
        setCountryError(true)
      }
      else{
        setCountryError(false)
      }
      console.log(selectedGridRegion)
    }
  }

  function resetState(){
    setCountryOptions(gridData)
    setGridRegion('')
    setDistance('')
    setEngineType('diesel')
    setCountrySearchValue('')
    setCarbonFootprint(0)
    setDistanceError(false)
    setCountryError(false)
  }
return(
  <>
    <Row className =''>
      <Col xs={1} sm={1} md={1} lg={2} xl={3}>
        &nbsp;
      </Col>
      <Col>
        <Container className ='form-container white'>
          <Row className ='form-line'>
            <p className ='form-title'>Train Trip</p>
          </Row>

          <Row className ='form-line'>
            <FormControl component="fieldset">
              <FormLabel component="legend">Engine Type:</FormLabel>
              <RadioGroup row aria-label="train" name="selectedEngineType" value={engineType} onChange={updateEngineType}>
                <FormControlLabel value="electric" control={<GreenRadio />} label="Electric" />
                <FormControlLabel value="diesel" control={<GreenRadio />} label="Diesel" />
                <HelpIcon message ="Select the engine type for your trip. Electric engines generally have a smaller footprint, but the exact footprint depends on the energy grid powering the engine."/>
              </RadioGroup>
            </FormControl>
          </Row>

          {engineType==='diesel'?
          null
          :
          <>
            <Row className ='form-line'>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <SearchDrop options={countryOptions}
                            inputId ={'gridRegion'}
                            inputName={'gridRegion'}
                            inputLabel={'Select The Country'}
                            searchValue = {countrySearchValue}
                            setSearchValue ={updateCountrySearchValue}
                            updateOptions = {updateGridRegions}
                            selectOption = {selectGridRegion}
                            displayKeys = {['country']}
                            valueKey ={'carbon'}
                            keyFields ={['country']}
                            invalidInput={countryError}
                            key ={'Grid Region Search'}/>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <HelpIcon message ="Select the country. Different countries energy grids have different carbon consequences. Right now, we only have accurate data for several European countries. We are working hard to add more countries to this list."/>
              </Col>
            </Row>
          </>}


          <Row className ='form-line nice-input-wrapper'>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Row>
                <input type = 'text'
                       id= "distance"
                       value = {distance}
                       name = "distance"
                       placeholder = "Distance (Km)"
                       onChange ={updateDistance}
                       className ={distanceError? "error-input":"dropdown-text roaming-black-text"}/>
                <label htmlFor="distance"
                       className ={distanceError? "error-label":"dropdown-text roaming-black-text"}>
                  Distance (km)
                </label>
              </Row>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <HelpIcon message ="Total distance of your train journey."/>
            </Col>
          </Row>

          <CarbonTotal footprint={carbonFootprint} label ={'Carbon Footprint (KG)'}/>

          <Row className ='form-submit-line'>
            <Button onClick = {addTrain} variant='custom'>Add</Button>
          </Row>

        </Container>
      </Col>
    <Col xs={1} sm={1} md={1} lg={2} xl={3}>
        &nbsp;
      </Col>
    </Row>
  </>
)}

const mapStateToProps = (state) => {
  return{navigation:state.navigation}
};

export default connect(mapStateToProps,{submitTrain})(TrainForm);
