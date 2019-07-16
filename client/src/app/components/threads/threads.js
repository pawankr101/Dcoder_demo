import React from 'react';
import './threads.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';

class Threads extends React.Component {
    state = {
        threads: [],
        searchText: ''
	};
    constructor(props) {
		super(props)
		this.utility = new UtilityService();
		this.server = new ServerUtilityService();
    }

    handleInputChange(event) {
        this.setState({
          searchText: event.target.value
        });
    }

    render() {
        return (
            <div className="Threads">
                Threads
            </div>
        );
    }
}
export default Threads;