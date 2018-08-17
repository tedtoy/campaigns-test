import React, { Component } from 'react';

import { Card,
         CardImg,
         CardBody,
         CardTitle } from 'reactstrap';


import { FaDatabase,
         FaUserFriends,
         FaEye,
         FaPencilAlt,
         FaPause,
         FaClock,
         FaThumbsDown,
         FaCalendarTimes,
         FaTrashAlt,
         FaCheck } from 'react-icons/fa';

import './campaign_card.css';

const Spinner = require('react-spinkit');

const spinnerTypes = [
  ['ball-grid-beat', 'coral'],
  ['ball-grid-pulse', 'goldenrod'],
  ['line-spin-fade-loader', 'red'],
  ['ball-pulse-rise', 'fuchsia'],
  ['line-scale', 'steelblue'],
  ['pacman', 'orange'],
  ['pacman', 'pink'],
  ['pacman', 'steelblue'],
  ['ball-triangle-path', 'goldenrod'],
  ['ball-scale-ripple-multiple', 'olive'],
  ['ball-scale-multiple', 'blue'],
  ['ball-zig-zag', 'steelblue'],
  ['ball-clip-rotate-multiple', 'orange'],
  ['wave', 'yellow'],
  ['cube-grid', 'green'],
  ['folding-cube', 'steelblue'],
  ['wandering-cubes', 'orange']
]


const CHEWBACCA_RIDING_A_SQUIRREL_AND_FIGHTING_NAZIS = "https://i.imgur.com/GX2m4Lc.jpg";


class CampaignCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentWorkflow: props.currentWorkflow,
      showOptions: false,
      isChangingWorkFlow: false
    }
  }

  toggleOptions = () => {
    let showOptions = !this.state.showOptions;
    if (['declined', 'terminated', 'expired'].includes(this.state.currentWorkflow)) {
      return
    }
    this.setState({
      showOptions: showOptions
    })
  }

  determineOptions = () => {
    switch(this.state.currentWorkflow) {
      case 'saved':
        return ['pending']
      case 'pending':
        return ['declined', 'active']
      case 'active':
        return ['pause', 'terminate', 'expire']
      case 'paused':
        return ['active']
      default:
        return []
    }
  }

  changeOption = (workflow) => {
    this.setState({'isChangingWorkFlow': true})
    setTimeout(() => {
      let showOptions = this.state.showOptions;
      if (['declined', 'terminated', 'expired'].includes(workflow)) {
        showOptions = false;
      }
      this.setState({'currentWorkflow': workflow, 'isChangingWorkFlow': false, 'showOptions': showOptions});
    }, 1500)
  }

  Options = {
    'pending': (<div className="option pending" onClick={() => this.changeOption('pending')}><span className="icon"><FaClock /></span> Pending </div>),
    'active': (<div className="option active" onClick={() => this.changeOption('active')}><span className="icon"><FaCheck /></span>Active</div>),
    'pause': (<div className="option pause" onClick={() => this.changeOption('paused')}><span className="icon"><FaPause /></span> Pause </div>),
    'decline': (<div className="option decline" onClick={() => this.changeOption('declined')}><span className="icon"><FaThumbsDown /></span> Decline </div>),
    'terminate': (<div className="option terminate" onClick={() => this.changeOption('terminated')}><span className="icon"><FaTrashAlt /></span> Terminate </div>),
    'expire': (<div className="option expire" onClick={() => this.changeOption('expired')}><span className="icon"><FaCalendarTimes /></span> Expire</div>),
  }

  renderOptions = () => {
    const options = this.determineOptions();
    if (options.length > 0) {
      return (
        <div className="menu-options">
          {options.map((optionName) => this.Options[optionName])}
        </div>)
    } else {
      return ''
    }
  }

  getRandomSpinner = () => {
    const info = spinnerTypes[Math.floor(Math.random() * spinnerTypes.length)];
    return <Spinner name={info[0]} color={info[1]} fadeIn="none" />
  }

  render() {

    const detailBarClass = "detail-bar " + this.state.currentWorkflow;
    const statusDotClass = "dot " + this.state.currentWorkflow;

    return (
      <Card>
        <CardImg
          top
          width="100%"
          className="card-img-top img-fluid"
          src={this.props.primaryMediaUrl}
          onError={(e)=>{e.target.src=CHEWBACCA_RIDING_A_SQUIRREL_AND_FIGHTING_NAZIS}}/>

        <div className={(this.state.showOptions) ? "options-container show" : "options-container" }>
          <div className="toggle-options"
               onClick={this.toggleOptions}>
            <FaPencilAlt size={14} />
          </div>
          {this.state.showOptions && this.renderOptions()}
        </div>
        <CardBody>
          <CardTitle>{this.props.cardTitle}</CardTitle>
          <div className="details">
            <div className="detail-info">
              <div className="cost">$ {this.props.listOfPlans[0].price.amount} / Month</div>
              <div className="status"> {this.state.currentWorkflow} <div className={statusDotClass} ></div></div>
            </div>
            <div className={detailBarClass} ></div>
          </div>
        </CardBody>
        <div className="card-footer">
          <div className="revenue">
            <FaDatabase /> ${this.props.totalRevenue}
          </div>
          <div className="subscribers">
            <FaUserFriends /> {this.props.subscribers}
          </div>
          <div className="views">
            <FaEye /> {this.props.views}
          </div>
        </div>

          {this.state.isChangingWorkFlow && (
            <div className="loading">
              {this.getRandomSpinner()}
            </div>
          )}
      </Card>
    )
  }
}


export default CampaignCard;
