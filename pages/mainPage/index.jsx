import React from 'react';
import './index.less';
import './media.less';
import {Button} from '../../components';

const MainPage = (props) => {
   // const { children, type, ...restProps } = props
   return (
     <div className="wrapper">
      <div className="main">
         <div className="menu-cont">
            <div className="menu">
               <img src="images/logo.png" alt="logo" />
               <a href="#">You deserve to live a life</a>
            </div>
            <Button className="contacts-btn">Log In</Button>
         </div>
        
        <nav className="navigation">
            <ul className="nav-list">
               <li className="nav-item"><a href="#" className="link-nav active"> Home</a></li>
               <li className="nav-item"><a href="#" className="link-nav"> Advantages</a></li>
               <li className="nav-item"><a href="#" className="link-nav"> About APP</a></li>
               <li className="nav-item"><a href="#" className="link-nav"> About Us</a></li>
            </ul>
         </nav>
   
          <div className="graphic">
             <div className="graphic-head">
                 <span></span> 
                 <p className="super-text">It is YOUR CHOISE </p>
             </div>
             <div className="graphic-detail">
                <p>To study English, to understand people better and to make them feel free-hearted.</p>     
             </div>
          </div>
      </div>
   
   
   <div className="services">
      <div className="services-head">
         <p>How your English skills can impact on people?</p>
         <p>It is a matter of relationship. They will become stronger. Conversations will become more frank.</p>
      </div>
      <div className="services-box-cont">
   
         <div className="services-box">
            <div className="box-icon front-icon">         </div>
            <h3>Face to Face</h3>
            <p>Our APP helps people to feel more confident in conversation.</p>
         </div>
         <div className="services-box">
            <div className="box-icon back-icon">         </div>
            <h3>Prevent uneasiness</h3>
            <p>Feel free to speak and make people smile and feel merry.</p>
         </div>
         <div className="services-box">
            <div className="box-icon ui-icon">         </div>
            <h3>Improve skills</h3>
            <p>Learn and improve youe English skill fast!</p>
         </div>
         <div className="services-box">
            <div className="box-icon gui-icon">         </div>
            <h3>Prevent suicide</h3>
            <p>You'll impove your English skills and what? Now you can speak! You can convince people be away from suicide</p>
         </div>
      </div>
   </div>
   
   <div className="contacts">
      <h1>So, what are U waiting for? Log In!</h1>
      <Button className="contacts-btn">Log In</Button>  
   </div>
    
   <div className="plan">
      <div className="plan-head">
         <p>Why you should study English NOW?</p>
         <p>We could talk and discuss too long, just look at this details and make a decision</p>
      </div>
      <div className="plan-box-cont">
         <div className="plan-box">
            <p className="plan-box-head">Gamification</p>
            <div className="image-container">
               <img src="images/game.png" alt="https://icons8.com" />
            </div>
            <p className="price-details">We design and develop game app that helps people to execute good deeds</p> 
         </div>
         <div className="plan-box">
            <p className="plan-box-head">Interval learning</p>
            <div className="image-container">
               <img src="images/interval.png" alt="https://icons8.com" />
            </div>
            <p className="price-details">Our interval learning system is built on the best technology for effective memorization.</p> 
         </div>
         <div className="plan-box">
            <p className="plan-box-head">Big amount of settings</p>
            <div className="image-container">
               <img src="images/sett.png" alt="https://icons8.com" />
            </div>
            <p className="price-details">You could program system for your requirements just by few clicks!</p> 
         </div>
         <div className="plan-box">
            <p className="plan-box-head">Just like part of your life</p>
            <div className="image-container">
               <img src="images/part.png" alt="https://icons8.com" /> 
            </div>
            <p className="price-details">Make you day special with our App! And you'll can even save somebody life!</p> 
         </div>
      </div>
   </div>
   
   <div className="learning">
      <div className="learning-pic"> 
      </div>
      <div className="learning-descript">
         <p> All that you need is to find a method that lets you spend less time studying while retaining the same amount of information. And we found it!</p>
         <p> <b className="underline">- Space out your studying.</b> By introducing time intervals between study sessions, you can remember more – even if you spend fewer actual hours studying.</p>
         
         <p> <b className="underline">- Spaced repetition.</b> The algorithm that determines intervals is quite complex, but we simplified it:
         <ul className="learning-list">
            <li>First repetition: 1 day</li>
            <li>Second repetition: 7 days</li>
            <li>Third repetition: 16 days</li>
            <li> Fourth repetition: 35 days</li>
         </ul>
         </p>
      </div>
   </div>
   
   <div className="video-cont">
      <div className="team-head">
         <p className="underline">LOOK HOW IT WORKS!</p>
      </div>
      <video width="100%" src="" ></video>
   </div>
   
   
   <div className="team">
      <div className="team-head">
         <p>Team of Dream</p>
         <p>We made it because we want to prevent people of doing bad things, but to be happier</p>
      </div>
      <div className="team-box-cont">
         <div className="team-box">
            <div className="team-member member-01"></div>
            <div className="team-member-detail">
               <a href="#">Dmitry Xmel</a>
               <p>The Smartest bro ever</p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-02"></div>
            <div className="team-member-detail">
               <a href="#">Anastasiya Rzhevutskaya</a>
               <p>Menedger & Team-lead</p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-03"></div>
            <div className="team-member-detail">
               <a href="#">Olya Trolya</a>
               <p>UI/UX designer & the sun light</p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-04"></div>
            <div className="team-member-detail">
               <a href="#">Olya Kharkevich</a>
               <p>React Developer bro</p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-05"></div>
            <div className="team-member-detail">
               <a href="#">Bahdanovich Yauheni </a>
               <p>React Developer bro </p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-06"></div>
            <div className="team-member-detail">
               <a href="#">YuraTez </a>
               <p>React Developer bro </p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-07"></div>
            <div className="team-member-detail">
               <a href="#">GxTh </a>
               <p>React Developer bro </p>
            </div>
         </div>
         <div className="team-box">
            <div className="team-member member-08"></div>
            <div className="team-member-detail">
               <a href="#">Vladislav Khlebec </a>
               <p>Super-puper mentor </p>
            </div>
         </div>
      </div>
   </div>
   
   
   <footer>
      <div className="footer-cont">
         <ul>
            <h1>Team</h1>
            <li><a href="#">Dmitry</a></li>
            <li><a href="#">Anastasiya</a></li>
            <li><a href="#">Trolya</a></li>
            <li><a href="#">Olya</a></li>
            <li><a href="#">Yury</a></li>
         </ul>
         <ul>
            <h1>Channel</h1>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Website of English APP</a></li> 
         </ul>
         <div className="social">
            <h1>Social</h1>
            <div className="social-icons"> 
               <a href="#"><i className="fab fa-github"></i></a> 
               <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
         </div>
      </div>
      <p className="copyright">KUMAMON copyright 2020</p>
   </footer> 
   </div>
   )
 };

 export default MainPage;