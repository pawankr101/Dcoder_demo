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

    searchFilter(list, inputText) {
        if (!list || !list.length) { return [{err: 'No Thread Available'}]; }
        if (!inputText.length) { return list; }
        inputText = inputText.toLowerCase();
        const arr = list.filter(el => {
          return el.name.toLowerCase().includes(inputText);
        });
        return arr.length > 0 ? arr : [{err: 'No matched Thread'}];
    }

    createTagsChips(tags) {
        if(!tags || !tags.length) {
            return null;
        }
        return tags.map((el, index) => {
            return (
                <div key={index} className="m-2 p-2 bg-secondary d-inline-block">{el}</div>
            );
        });
    }
    
    searchResults(arr) {
        if(!arr || !arr.length) {
          return null;
        }
        if(arr[0].err) {
            return(
                <div className="card">
                    <div className="card-body row">
                        <div className="offset-1">{arr[0].err}</div>
                    </div>
                </div>
            );
        }
        return arr.map((el, index) => {
            return (
                <div key={index} className="card result-card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">Title: </div>
                            <div className="col-10">{el.title}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">Description: </div>
                            <div className="col-10">{el.description}</div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <div className="col-2">Tags: </div>
                                <div className="col-10">
                                    {this.createTagsChips(el.tags)}
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-2">Created by:</div>
                                    <div className="col-10">{el.creator_detail.name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-2">Created at:</div>
                                    <div className="col-10">{el.created_at}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    finalSearchResult() {
        let filteredArr = this.searchFilter(this.state.threads, this.state.searchText);
        return this.searchResults(filteredArr);
    }

    handleInputChange(event) {
        this.setState({
          searchText: event.target.value
        });
    }

    render() {
        return (
            <div className="Threads">
                <div>
                    <div className="row w-100 m-0" style={{height:"60px"}}>
                        <div className="offset-1 col-10">
                            <div className="row h-100 w-100 m-0">
                                <div className="col-5 align-self-end border-bottom">
                                    <h2 className="m-0">All Threads</h2>
                                </div>
                                <div className="offset-1 col-5 align-self-end">
                                    <div className="search-box text-center">
                                        <input autoFocus className="form-control form-control-lg text-left"
                                            type="text" placeholder="Type Thread's name" onChange={this.handleInputChange.bind(this)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Threads;