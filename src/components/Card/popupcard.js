// import React from 'react';
// import styled from "styled-components";

// const popupcard = ({card}) => {
//     return (
//         <Card>
//           <Image>
//             <img src={card.img} alt="card img" />
//           </Image>
//           <Content className="content">
//             <h3>{card.heading}</h3>
//             <p>{card.para}</p>
//           </Content>
//         </Card>
//       );
// }

// export default popupcard
// const Card = styled.div`
//   width: 25%;
//   height: 12em;
//   margin-top: 5em;
//   background: linear-gradient(#F21D26, #3F0A0F);
//   padding: 20px 15px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
//   transition: 0.3s ease-in-out;
//   border-radius: 15px;
//   cursor: pointer; 
//   :hover {
//     height: 24em;
//     .content {
//       margin-top: 30px;
//       visibility: visible;
//       opacity: 1;
//       transition-delay: 0.2s;
//     }
//   }
//   @media (min-width:286px) and (max-width:786px){
//     width: 100%;
//   }
// `;

// const Image = styled.div`
//   position: relative;
//   width: 100%;
//   height: 15em;
//   top: -30%;
//   box-shadow: 0 20px 10px rgb(0 0 0 / 48%);
//   z-index: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 15px;
//   background-color: white;
//   img {
//     max-width: 100%;
//     height: 100%;
//   }
// `;

// const Content = styled.div`
//   position: relative;
//   top: -140px;
//   padding: 10px 15px;
//   color: white;
//   text-align: center;
//   visibility: hidden;
//   opacity: 0;
//   transition: 0.3s ease-in-out;
//   h3{
//     font-size: clamp(1em,1.5vw,1em);
//   }
//   p{
//     font-size: clamp(0.7em,0.8vw,1em);
//   }
// `;

import React from 'react'
import './card.css'
import { useState } from 'react';

const Popupcard = ({ card }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`slidecard ${isExpanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <div className='imagediv'>
        <img src={card.img} alt="card img" />
      </div>
      <div className='lastdiv'>
        <h3><i class="fa fa-user"></i>{card.heading}</h3>
        <p><i class='fas fa-mobile-alt'></i>{card.para}</p>
        <p><b>Contact For Boooking</b></p>
      </div>
    </div>
  )
}

export default Popupcard