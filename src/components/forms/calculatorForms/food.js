import { Container, Row, Col, Button,Form} from 'react-bootstrap';
import { connect } from "react-redux";
import {submitFood,submitDiet} from "../../../store/actions/creators/submits"
import {useState} from "react";
import Dropdown from '../../sharedComponents/formComponents/dropdown';
import foodData from "../../data/foodData"
import dietData from "../../data/dietData"
import CarbonTotal from "../../sharedComponents/carbonTotal"
import FormCheck from "react-bootstrap/FormCheck"
import HelpIcon from "../../sharedComponents/helpIcon"
import { useDispatch } from "react-redux";

const FoodForm = props =>{
  const dispatch = useDispatch();
  const [foodQuantity, setFoodQuantity]=useState('')
  function updateFoodQuantity(e){
    console.log('updating food quantity test')
    if (!isNaN(parseInt(e.target.value))) {
      console.log('updating food quantity'+e.target.value)
      setFoodQuantity(parseInt(e.target.value))
      let carbonFootprint = parseInt(e.target.value)*selectedFood.ghg_ratio*selectedFood.serving;
      setCarbonFootprint(carbonFootprint)
    }
    else if(e.target.value==='') {
      setFoodQuantity('')
      setCarbonFootprint(0)
    }
  }
  const [selectedFood, setFoodType] = useState({food: "Apples",
                                               ghg_ratio: "0.43",
                                               servingDescr:'One Apple',
                                               serving: "0.136078"})

  const [selectedDiet, setDietType] = useState({food:"Balanced Diet",
                                               ghg_ratio:'10.2',
                                               servingDescr:'One Average Day',
                                               serving:'1'})
  const [dietQuantity, setDietQuantity] = useState('')
  function updateDietQuantity(e){
    console.log('updating diet quantity test')
    if (!isNaN(parseInt(e.target.value))) {
      console.log('updating food quantity'+e.target.value)
      setDietQuantity(parseInt(e.target.value))
      let carbonFootprint = parseInt(e.target.value)*selectedDiet.ghg_ratio*selectedDiet.serving;
      setCarbonFootprint(carbonFootprint)
    }
    else if(e.target.value==='') {
      setDietQuantity('')
      setCarbonFootprint(0)
    }
  }

  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const [isAdvanced, setType]=useState(false)

  const [foodQuantityError,setFoodQuantityError]=useState(false)
  const [dietQuantityError,setDietQuantityError]=useState(false)

  function updateDietType(e){
    let selectedDiet = dietData[dietData.findIndex(x=>x.food === e.target.value)];
    setDietType(selectedDiet)
    let carbonFootprint = selectedDiet.ghg_ratio*dietQuantity;
    setCarbonFootprint(carbonFootprint)
  }

  function updateFoodType(e){
    let food = foodData[foodData.findIndex(x=>x.food === e.target.value)]
    setFoodType(food)
    let carbonFootprint = food.ghg_ratio*foodQuantity*food.serving;
    setCarbonFootprint(carbonFootprint)
  }

  function updateType(type){
    if (isAdvanced) {
      setType(false)
    }
    else {
      setType(true)
    }
    setFoodQuantity('')
    setDietQuantity('')
    setCarbonFootprint(0)
  }

  function addFood(){
    console.log('adding food')

    if (carbonFootprint>0) {
      if (isAdvanced) {
        let data ={ type:'food',
                    subType:'Food Item',
                    quantity:foodQuantity,
                    food: selectedFood,
                    carbonFootprint: carbonFootprint
        }
        console.log(data)
        // props.addCarbonCostItem(data)
        dispatch(submitFood(data))
      }
      else {
        let data ={ type:'diet',
                    subtype:'Diet Type',
                    quantity:dietQuantity,
                    dietType:selectedDiet,
                    carbonFootprint: carbonFootprint
        }
        console.log(data)
        // props.addCarbonCostItem(data)
        dispatch(submitDiet(data))
      }
      setFoodQuantity('')
      setDietQuantity('')
      setCarbonFootprint(0)
      setDietType({food:"Balanced Diet",
                   ghg_ratio:'8.25',
                   servingDescr:'One Average Day',
                   serving:'1'})
      setFoodType({food: "Apples",
                   ghg_ratio: "0.43",
                   servingDescr:'One Apple',
                   serving: "0.136078"});

      // setType(false)
      setFoodQuantityError(false)
      setDietQuantityError(false)
    }
    else {
      if (isAdvanced) {
        if (foodQuantity==='') {
          setFoodQuantityError(true)
        }
        else {
          setFoodQuantityError(false)
        }
      }
      else {
        if (dietQuantity==='') {
          setDietQuantityError(true)
        }
        else {
          setDietQuantityError(false)
        }
      }
    }
  }

  return(
    <>
    <Row className ='vertical-padding-sm'>
      <Col xs={1} sm={1} md={1} lg={2} xl={3}>
        &nbsp;
      </Col>
      <Col>
        <Container className ='form-container white'>

          <Row className ='form-line'>
            <p className ='form-title'>Food</p>
          </Row>
          <Row className ='form-line'>
            <Col>
              &nbsp;
            </Col>
            <Col>
              &nbsp;
            </Col>
            <Col>
              <FormCheck
                onChange={(e)=>{updateType(e)}}
                type="switch"
                id="custom-switch-"
                label="Advanced"
                checked={isAdvanced}/>
            </Col>
          </Row>

          {isAdvanced?
          <>

              <Row className ='form-line'>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Row>
                  <Form.Select aria-label="Default select example"
                               value = {selectedFood.food}
                               onChange = {updateFoodType}
                               className="browser-default">
                               {foodData.map((food, i)=>{return <Dropdown value = {food.food}
                                                                          displayValue ={food.food+' ('+food.servingDescr+')'}
                                                                          key={food.food+i}/>})}
                  </Form.Select>
                  </Row>
                </Col>
                <Col>
                  <HelpIcon message ="Select your food. (More foods are on their way.)"/>
                </Col>
              </Row>
              <Row className ='form-line nice-input-wrapper'>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Row>
                    <input type='text'

                           value = {foodQuantity }
                           placeholder = 'Number of Servings'
                           onChange = {updateFoodQuantity}
                           className ={foodQuantityError? "error-input":"dropdown-text roaming-black-text"}/>
                    <label htmlFor="foodQuantity"
                           className ={foodQuantityError? "error-label":"dropdown-text roaming-black-text"}>
                    {'Number of Servings'}
                    </label>
                  </Row>
                </Col>
                <Col>
                  <HelpIcon message ="Enter the number of servings. (Average serving size is shown above.)"/>
                </Col>
              </Row>

          </>
          :
          <>


            <Row className ='form-line'>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Row>
                <Form.Select aria-label="Default select example"
                             value = {selectedDiet.food}
                             onChange = {(e)=>updateDietType(e)}
                             className="browser-default">
                {dietData.map((diet, i)=>{return <Dropdown value = {diet.food}
                                                           displayValue ={diet.food+' ('+diet.servingDescr+')'}
                                                           key={diet.food+i}/>})}


                </Form.Select>
                </Row>
              </Col>
              <Col>
                <HelpIcon message ="Select your diet type. If you're unsure what your diet type is, select Balance Diet for an approximation."/>
              </Col>
            </Row>


            <Row className ='form-line nice-input-wrapper'>
              <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                <Row>
                  <input type="text"
                         id="dietQuantity"
                         name="dietQuantity"

                         value = {dietQuantity}
                         placeholder ='Number of Days'
                         onChange = {updateDietQuantity}
                         className ={dietQuantityError? "error-input":"dropdown-text roaming-black-text"}/>
                  <label htmlFor="dietQuantity"
                         className ={dietQuantityError? "error-label":"dropdown-text roaming-black-text"}>
                    {'Number of Days'}
                  </label>
                </Row>
              </Col>
              <Col>
                <HelpIcon message ="Enter the number of days you're planning on eating this diet."/>
              </Col>
            </Row>
          </>
          }

          <CarbonTotal footprint={carbonFootprint} label ={'Carbon Footprint (KG)'}/>

          <Row className ='form-submit-line'>
            <Button onClick = {addFood}  variant='custom'>Add</Button>
          </Row>

        </Container>
      </Col>
      <Col xs={1} sm={1} md={1} lg={2} xl={3}>
        &nbsp;
      </Col>
    </Row>
    </>
  )
}
const mapStateToProps = (state) => {
  return{navigation:state.navigation}
};

export default connect(mapStateToProps,{submitFood,submitDiet})(FoodForm);
