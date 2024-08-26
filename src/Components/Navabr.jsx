import React from 'react'
import { NavLink } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import "./Navbar.css"

const Navbar = () => {
  return (
        <div className='Navbarcont'>
          
            <nav className='Navbar'>
              <div id="logoh">
                {/* <img src={logo} alt="" id="logohh"/> */}
                <Text fontSize={"2xl" } as="b">ResuMine</Text>
                </div>
              
                <ul id='hca'>
                    <li className='navers'>
                           <NavLink to={"/analyse"}><Text className="navname"> Analyse</Text></NavLink>
                        </li>
                    <li className='navers'>
                           <NavLink to={"/compare"}><Text className="navname">Compare</Text></NavLink>
                        </li>
                    <li className='navers'>
                           <NavLink to={"/create"}><Text className="navname">Create</Text></NavLink>
                        </li>
                        
                        
                        
                        
                    </ul>
                    <div className="rightnav">
    
    
                    {/* <div className="login">
                      <NavLink to={"/login"}>
    
                     <Loginbutton/>
                      </NavLink>
                    </div>
                    <NavLink to={"/cart"}>
    
                    <div className='cart chamak'>
                         <IoCartOutline size="2rem"  id="carti"/>
                    </div>
                    </NavLink>
                    <div className="profile">
                        <Profile2button/>
                    </div> */}
                    
                    </div>
                
                
            </nav>
        </div>
  )
}

export default Navbar