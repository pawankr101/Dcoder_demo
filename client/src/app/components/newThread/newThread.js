import React from 'react';
import './newThread.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';

class NewThread extends React.Component {
    state = {
        threads: [],

	};
    constructor(props) {
		super(props)
		this.utility = new UtilityService();
		this.server = new ServerUtilityService();
    }

    render() {
        return (
            <div className="NewThread">
                New Thread
            </div>
        );
    }
}
export default NewThread;