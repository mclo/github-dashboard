import React, { Component } from 'react'

import { 
    Nav, 
    NavItem,  
    NavLink,
    Row, 
    Col
} from 'reactstrap';

import IssuesTable from '../Issues/IssuesTable'
import Releases from './Releases'
import Subscriptions from '../Subscription/Subscriptions'
import firebaseHoc from '../PushNotifications/activateNotificationHoc'

class RepoTabs extends Component{
    constructor(props){
        super(props)

        this.state = {
            activeTab: 'issues',
            navItems: [
                {
                    title: 'issues',
                    component: IssuesTable
                }, 
                {
                    title: 'releases',
                    component: Releases
                }, 
                {
                    title: 'settings',
                    component: firebaseHoc(Subscriptions)
                }]
        }

        this.activateNav = this.activateNav.bind(this)
        this.getNav = this.getNav.bind(this)
        this.getChildComponent = this.getChildComponent.bind(this)
    }

    activateNav(e){
        this.setState({
            activeTab: e
        })
    }

    getNav(navItems){
        const { activeTab } = this.state
        return navItems.map((navItem) => 
            <NavItem key={navItem.title}>
                <NavLink   
                className={navItem.title === activeTab ? 'active' : ''} 
                onClick={() => this.activateNav(navItem.title)}
                >
                    {navItem.title}
                </NavLink>   
            </NavItem>
        )
    }
    
    getChildComponent(){
        const { activeTab, navItems } = this.state
        const selectedNavItem = navItems.find((item) => item.title === activeTab)

        return selectedNavItem.component 
    }

    render(){
        const { repo } = this.props.match.params
        const { navItems } = this.state

        const nav = this.getNav(navItems)
        const ChildComponent = this.getChildComponent()

        return(
            <div>
                <Row>
                    <Col><p>{repo}</p></Col>
                </Row>
                <Row>
                    <Col>
                        <Nav tabs>{nav}</Nav>
                    </Col>   
                </Row>
                <Row>
                    <ChildComponent {...this.props}/>
                </Row>
            </div>
                    
            )
    }
}


export default RepoTabs