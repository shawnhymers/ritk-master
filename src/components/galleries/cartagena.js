import React, {  lazy} from 'react';
import GalleryBody from "../sharedComponents/galleryComponents/galleryBody";
import  { useState,useEffect } from 'react';

import cartagena13 from '../../assets/galleries/cartagena/cartagena13.jpg'

import cartagena9 from '../../assets/galleries/cartagena/cartagena9.jpg'
import cartagena11 from '../../assets/galleries/cartagena/cartagena11.jpg'
import cartagena10 from '../../assets/galleries/cartagena/cartagena10.jpg'
import cartagena15 from '../../assets/galleries/cartagena/cartagena15.jpg'
import cartagena14 from '../../assets/galleries/cartagena/cartagena14.jpg'
import cartagena12 from '../../assets/galleries/cartagena/cartagena12.jpg'
import cartagena17 from '../../assets/galleries/cartagena/cartagena17.jpg'
import cartagena7 from '../../assets/galleries/cartagena/cartagena7.jpg'
import cartagena5 from '../../assets/galleries/cartagena/cartagena5.jpg'
import cartagena16 from '../../assets/galleries/cartagena/cartagena16.jpg'
import cartagena1 from '../../assets/galleries/cartagena/cartagena1.jpg'
import cartagena2 from '../../assets/galleries/cartagena/cartagena2.jpg'

import medellin13 from '../../assets/galleries/medellin/Medellin13.jpg'
import guatape10 from '../../assets/galleries/guatape/Guatape10.jpg'

import panama28 from '../../assets/galleries/panama/panama28.jpg'

const DesktopHeader = lazy(() => import('../sharedComponents/navComponents/desktopHeader'));
const MobileHeader = lazy(() => import('../sharedComponents/navComponents/mobileHeader'));
const Cartagena = props => {

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
       <MobileHeader page ={'gallery'}/>
   :
       <DesktopHeader page ={'gallery'}/>
   }
     <GalleryBody header ={{src:cartagena13, label:'Cartagena', subLabel:'Photo Gallery'}}

                  nextTitle1={"Guatape"}
                  nextTitle2={'Medellin'}
                  nextTitle3={"Panama City"}
                  nextPic1 ={guatape10}
                  nextPic2 ={medellin13}
                  nextPic3 ={panama28}
                  nextLink1= {'/guatape'}
                  nextLink2= {'/medellin'}
                  nextLink3= {'/panamaCity'}

                  blurb ={[{type:'text',text:"Cartagena, Colombia is a city built around one of the major ports on Colombia’s northern coast. It has served as a vital port town since 1540. Now hundreds of thousands of cruise ship passengers come through the port, making tourism one of its largest current industries. We spent the majority of our time wandering the colourful and photogenic streets of the old town and neighbouring hip neighbourhood, Getsemani."}]}
                  updated={'March 2022'}
                  isMobile={isMobile}
                  contentTest ={[

                                {type:'horizontalImage',src:cartagena13},
                                {type:'diptych',src1:cartagena9,src2:cartagena11},
                                {type:'diptych',src1:cartagena10,src2:cartagena15},
                                {type:'diptych',src1:cartagena14,src2:cartagena12},
                                {type:'diptych',src1:cartagena17,src2:cartagena7},
                                {type:'diptych',src1:cartagena5,src2:cartagena16},
                                {type:'diptych',src1:cartagena1,src2:cartagena2},
                               ]}/>
   </div>
  </>
  )}

  export default Cartagena;
