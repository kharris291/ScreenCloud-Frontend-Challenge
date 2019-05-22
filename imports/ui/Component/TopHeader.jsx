import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class TopHeader extends Component {
  constructor(props) {
    super(props);

    console.log(props)
    console.log(this.props);
  }
  
  render() {
    console.log(this);
    const isLogged = this.props.state.signedIn === "true";
    if(isLogged){
      return(
        <Menu secondary pointing>
          <Menu.Item as={NavLink} activeClassName="active" exact to={'/bankBanlance'}>Bank Balance</Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" exact to={'/withdrawCash'}>Widthraw Cash</Menu.Item>
        </Menu>
      )
    } else{
      return (
        <Menu secondary pointing>
          <Menu.Item as={NavLink} activeClassName="active" exact to={'/'}>Home</Menu.Item>
        </Menu>
      ) 
    }
    
  }
    
  
}

export default TopHeader
