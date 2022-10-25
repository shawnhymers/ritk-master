import React, {  lazy} from 'react';
import BlogBody from "../sharedComponents/blogComponents/blogBody";
import  { useState,useEffect } from 'react';
import ometepe10 from '../../assets/galleries/ometepe/ometepe10.jpg'
import cartagena12 from "../../assets/galleries/cartagena/cartagena12.jpg"
import blog3 from "../../assets/blogPreview/blog3.jpg"
import quito17 from '../../assets/galleries/quito/Quito17.jpg'
const DesktopHeader = lazy(() => import('../sharedComponents/navComponents/desktopHeader'));
const MobileHeader = lazy(() => import('../sharedComponents/navComponents/mobileHeader'));

const CarbonCostOfLatam = props => {

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
    <BlogBody header ={{src:ometepe10, label:'Carbon Cost of Central America'}}
              nextTitle1={'Carbon Cost of Flying'}
              nextTitle2={"Carbon Cost of Ecuador"}
              nextTitle3={"Carbon Cost of Colombia"}
              nextPic1 ={blog3}
              nextPic2 ={quito17}
              nextPic3 ={cartagena12}
              nextLink1= {'/carbonCostOfFlying'}
              nextLink2= {'/carbonCostOfEcuador'}
              nextLink3= {'/carbonCostOfColombia'}
              topBlurb={{type:'topBlurb',
                         updated:'June 2022',
                         content:[{type:'text',text:"Here is a breakdown of our carbon footprint of 51 days of travelling Central America."}]}}

              isMobile={isMobile}
              contentTest ={[ {type:'header',text:"Carbon Footprint For Central America"},
                              {type:'horizontalImage',src:'CarbonCostCharts/LATAMCost.png'},
                              {type:'totalFootprint',text:"Total Footprint ",centered:true},
                                {type:'footprintLine',footprint:'1,269.3',unit:'KG Co2',centered:true},
                              {type:'footprintComparison',footprintPerDay:'24.9'},
                            {type:'paragraph',text:'Overall Central America was a huge win for us. It was the first leg out of adventure, and we were still learning how to travel safely and efficiently. A huge hit to our carbon budget was our flights in. Flying all the way from Canada to Nicaragua was over half of our carbon footprint for the entire 51 days. This is a great example of how longer trips, if you have the privilege of taking the time, are much more environmentally friendly. A big win for us was the amount of vegan food we found all throughout Central America. Although it’s not the most vegan friendly part of the world, we were able to find delicious vegan food for the entirety of our trip which really helped us offset those huge flights!'},


                             {type:'header',text:"Flights"},
                             {type:'listItem',text:"1) Toronto To San Salvador"},
                             {type:'footprintLine',distance:'100',footprint:'556',unit:'KG Co2'},
                             {type:'listItem',text:"2) San Salvador To Managua"},
                             {type:'footprintLine',distance:'100',footprint:'116',unit:'KG Co2'},
                             {type:'listItem',text:"3) Alajuela to Panama City  "},
                             {type:'footprintLine',distance:'100',footprint:'139.5',unit:'KG Co2'},

                             {type:'header',text:"Other Transport"},
                             {type:'listItem',text:"1) Shuttle from Managua to Granada "},
                              {type:'footprintLine',distance:'42',footprint:'6',unit:'KG Co2'},
                             {type:'listItem',text:"2) Chicken bus from Granada to Rivas  "},
                              {type:'footprintLine',distance:'70',footprint:'1.3',unit:'KG Co2'},
                             {type:'listItem',text:"3) Car ride from Riva to Maderas"},
                              {type:'footprintLine',distance:'24',footprint:'2.3',unit:'KG Co2'},
                             {type:'listItem',text:"4) Taxi from Maderas to Rivas"},
                              {type:'footprintLine',distance:'24',footprint:'2.3',unit:'KG Co2'},
                             {type:'listItem',text:"5) Bus from Riva to Liberia"},
                              {type:'footprintLine',distance:'113',footprint:'2.0',unit:'KG Co2'},
                             {type:'listItem',text:"6) Bus from Liberia to La Fortuna"},
                              {type:'footprintLine',distance:'134',footprint:'3.3',unit:'KG Co2'},
                             {type:'listItem',text:"7) Bus from La Fortuna to Monteverde"},
                              {type:'footprintLine',distance:'121',footprint:'2.2',unit:'KG Co2'},
                             {type:'listItem',text:"8) Bus from Monteverde to Manuel Antonio"},
                              {type:'footprintLine',distance:'182',footprint:'3.3',unit:'KG Co2'},
                             {type:'listItem',text:"9) Bus from Manuel Antonio to Alajuela"},
                              {type:'footprintLine',distance:'157',footprint:'2.8',unit:'KG Co2'},

                             {type:'header',text:"Food"},
                             {type:'listItem',text:"51 days of a vegan diet"},
                             {type:'footprintLine',footprint:'107',unit:'KG Co2'},

                             {type:'header',text:"Accomodation"},
                             {type:'listItem',text:"50 Nights-- Mix of Small Hostels and Eco Lodges"},
                             {type:'footprintLine',footprint:'306.1',unit:'KG Co2'},

                             {type:'header',text:"Additional Costs"},
                             {type:'listItem',text:"Day Trips / Ubers / Public Transport"},
                            {type:'footprintLine',footprint:'19',unit:'KG Co2'},

                             {type:'header',text:"Overview"},
                             {type:'horizontalImage',src:'CarbonCostCharts/LATAMCost.png'},
                             {type:'totalFootprint',text:"Total Footprint "},
                               {type:'footprintLine',footprint:'1,269.3',unit:'KG Co2',centered:true},
                             {type:'footprintComparison',footprintPerDay:'24.9'},



                           ]}/>
  </div>
  </>
)}

export default CarbonCostOfLatam;
