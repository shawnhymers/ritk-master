import React, {  lazy} from 'react';
import BlogBody from "../sharedComponents/blogComponents/blogBody";
import  { useState,useEffect } from 'react';

const DesktopHeader = lazy(() => import('../sharedComponents/navComponents/desktopHeader'));
const MobileHeader = lazy(() => import('../sharedComponents/navComponents/mobileHeader'));

const CarbonCostOfDiet = props => {

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
  <div style={{overflowX:'hidden'}}>
  {isMobile?
      <MobileHeader page ={'blog'}/>
  :
      <DesktopHeader page ={'blog'}/>
  }
    <BlogBody header ={{src:'vancouverFood.jpg', label:'Carbon Cost of LATAM'}}
  
              topBlurb={{type:'topBlurb',
                         updated:'December 2021',
                         content:[{type:'text',text:"Whether you're a vegan veteran, or just looking to expand your plant based options -- this guides got you covered."}]}}

              isMobile={isMobile}
              contentTest ={[{type:'paragraph',text:"I’m just going to come out and say it: Vancouver is the mecca of vegan food."},
                             {type:'diptych', src1:'VancouverFoodBlog/vancouverFood8.jpg',src2:'VancouverFoodBlog/vancouverFood7.jpg'},
                             {type:'header',text:"Top ‘Going out for a nice meal’ dining options:"},
                             {type:'listItem',text:"1) Mila"},
                             {type:'horizontalImage',src:'VancouverFoodBlog/vancouverFood2.jpg'},

                           ]}/>
  </div>
  </>
)}

export default CarbonCostOfDiet;
