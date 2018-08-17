import React, { Component } from 'react';
import {
  Card,
  Nav,
  NavItem,
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { FaSistrix, FaListUl, FaChevronLeft, FaChevronRight, FaPlusCircle } from 'react-icons/fa';
import { IoIosCalendar } from 'react-icons/io';

import CampaignCard from '../CampaignCard/CampaignCard.js';
import './campaigns.css';

const moment = require('moment');

const API_URL = 'api/dashboard';


const DatePicker = () => {
    return (
      <div className="date-picker">
        <FaChevronLeft />
        <span className="selected-date">
            <IoIosCalendar size={28} style={{marginTop: '-5px'}} />
            <span className="date-text">Today, {moment().format("MMM DD")}</span>
        </span>
        <FaChevronRight />
        <span className="date-range">1d</span>
      </div>
    )
}


class Campaigns extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        campaigns: [],
        cards: [],
        filters: [],
        selectedCampaignId: null
      },
    }
  }

  componentWillMount = () => {
    console.log("API URL", API_URL)
    fetch(API_URL)
    .then((resp) => {
      resp.json().then((data) => {
        this.setState({
          'data': data
        })
      })
    })
  }

  selectCampaign = (e) => {
    this.setState({'selectedCampaignId': e.target.value});
  }

  selectedCampaignName = () => {
    if (this.state.selectedCampaignId) {
      const campaign = this.state.data.campaigns.filter((c) => c.id == this.state.selectedCampaignId)
      if (campaign.length > 0) {
        return campaign[0].campaignName
      } else {
        return "Unknown Campaign Selected"
      }
    } else {
      return "All Campaigns"
    }
  }

  render() {

    let cards = this.state.data.cards;
    if (this.state.selectedCampaignId) {
      cards = cards.filter((card) => {
        return (card.campaignId == this.state.selectedCampaignId)
      });
    }

    return (
      <div className="campaigns">
        <Navbar color="light" light expand="md" >
          <div className="container">
            <Nav className="mr-auto align-items-center left-navigation" navbar>
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret role="button"  >
                    {this.selectedCampaignName()}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.selectCampaign} value={null} >
                        All Campaigns
                    </DropdownItem>
                    <DropdownItem divider />
                    {this.state.data.campaigns.map((campaign) => {
                      return (<DropdownItem key={"camp-"+campaign.id} onClick={this.selectCampaign} value={campaign.id} >
                                {campaign.campaignName}
                              </DropdownItem>)
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem className="hamburger">
                <FaListUl  size={24}/>
              </NavItem>
              <NavItem className="navbar-current-state">
                <span className="navbar-state">Pending</span>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              <NavItem>
                <FaSistrix size={24}/>
              </NavItem>
              <NavItem>
                <DatePicker />
              </NavItem>
            </Nav>
          </div>
        </Navbar>

        <div className="container cards">
          {cards.map((card, c) => {
            return <CampaignCard key={"card-"+card.id+"-"+c} {...card} />
          })}
          <Card className="create-a-card">
            <FaPlusCircle size={40} />
            <div>Create a Service Card</div>
          </Card>
        </div>
      </div>
    )
  }
}


export default Campaigns;
