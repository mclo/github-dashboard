import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
    Container,
    Row,
    Col
} from 'reactstrap'


import Repos from '../Repos/ReposContainer'
import RepoTabs from '../Repos/RepoTabs'
import OrganizationDropdown from './OrganizationDropdown'

class OrganizationsPage extends Component {
    render(){ 

        return (
        <Container id="organization">
            <Row>
                <Col xs="3">
                    <Route path='/' component={OrganizationDropdown} />
                </Col>
            </Row>
            <Row>
                <Col sm="4">
                    <Route path='/:org' component={Repos}/>
                </Col>
                <Col>
                    <Route path='/:org/:repo' component={RepoTabs}/>
                </Col>
            </Row>
        </Container>)
    }
}

export default OrganizationsPage