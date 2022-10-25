import React, {  lazy} from 'react';
import { Container,Row} from 'react-bootstrap';
import  { useState,useEffect } from 'react';
const DesktopHeader = lazy(() => import('../sharedComponents/navComponents/desktopHeader'));
const MobileHeader = lazy(() => import('../sharedComponents/navComponents/mobileHeader'));

const VancouverActivityGuide = props => {
  const[isMobile, setIsMobile]=useState(false)

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    window.addEventListener("contextmenu", e => e.preventDefault());
    setTimeout(() => {
      updateDimensions();
      }, 300)
    })

  function updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    console.log('updating dimensions')
    if (windowWidth>= windowHeight) {
      setIsMobile(false)
    }
    else {
      setIsMobile(true)
    }
  }

return(
  <>
    <div style ={{overflowX:'hidden'}}>
    <Container>
    {isMobile?
        <MobileHeader page ={'blog'}/>
    :
        <DesktopHeader page ={'blog'}/>
    }
      <Row>
        <p>Vancouver Activity Guide</p>
      </Row>

      <Row>
        <p>Vancouver Activity Guide</p>
      </Row>
    </Container>

    </div>
  </>
)}

export default VancouverActivityGuide;
