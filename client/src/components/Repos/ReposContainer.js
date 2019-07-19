import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { 
    Spinner,
    Nav, 
    NavItem
} from 'reactstrap'

import { fetchRepos } from './repoActions'

class Repos extends Component{
    constructor(props){
        super(props)
        this.mapRepos = this.mapRepos.bind(this)
        this.renderSpinner = this.renderSpinner.bind(this)
        this.getListGroupItem = this.getListGroupItem.bind(this)
    }

    componentDidMount(){
        const { dispatch, match } = this.props
        const { org } = match.params
        dispatch(fetchRepos(org))
    }

    componentDidUpdate(prevProps){
        const { dispatch, match } = this.props
        const { org } = match.params
        
        if(prevProps.match.params.org !== org){
            dispatch(fetchRepos(org))
        }
    }

    getListGroupItem = (repo) => {
        const { org } = this.props.match.params
        
        let activeStyle = {
            backgroundColor: '#5EACFF',
            color: 'white'
        }
        
        let style = {
            width: '100%',
            padding: 10
        }

        let linkParams = {
            pathname: `/${org}/${repo.name}`, 
            state: {repo: repo}
        }

        return(

            <Nav key={repo.name}>
                <NavLink activeStyle={activeStyle} style={style} to={linkParams}>
                    {repo.name}
                </NavLink>
            </Nav>
            
            ) 
          

    }

    mapRepos = () => {
        const { data } = this.props.repos

        return data && data.map(repo => this.getListGroupItem(repo))
    }

    renderSpinner = () => {
        let style = {
            margin: 10,
            width: '3rem', 
            height: '3rem'
        }
        return (<Spinner style={style} />)
    }

    render(){
        let { loading, data } = this.props.repos
        
        let reposList = (loading || !data) ? this.renderSpinner() : this.mapRepos()
        let style={
            textAlign: 'left',
            margin: 15
        }
        return(
            <Nav vertical style={style}>
                {reposList}
            </Nav>
                
        )
    }
}

const mapStateToProps = (state) => {
    const { repos } = state
    return { repos }
}
export default connect(mapStateToProps)(Repos)