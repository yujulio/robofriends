import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobot: () => dispatch(requestRobots())
  }
}

function App(props) {
  const { searchField, onSearchChange, robots, isPending, onRequestRobot } = props;

  useEffect(() => {
    onRequestRobot()
  },[])

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
  });

  return(
    isPending ? <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
        </Scroll>
      </div>
    )
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(App);