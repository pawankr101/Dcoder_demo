import React from 'react';
import './threads.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';
import { api_url } from '../../../config/config';
import { Link } from 'react-router-dom';

class Threads extends React.Component {
    state = {
        threads: [],
        searchText: ''
	};
    constructor(props) {
		super(props)
		this.utility = new UtilityService();
        this.server = new ServerUtilityService();
        this.finalSearchResult = this.finalSearchResult.bind(this);
    }

    searchFilter(list, inputText) {
        if (!list || !list.length) { return [{err: 'No Thread Available'}]; }
        if (!inputText.length) { return list; }
        inputText = inputText.toLowerCase();
        const arr = list.filter(el => {
          return el.title.toLowerCase().includes(inputText);
        });
        return arr.length > 0 ? arr : [{err: 'No matched Thread'}];
    }

    createTagsChips(tags) {
        if(!tags || !tags.length) {
            return null;
        }
        return tags.map((el, index) => {
            return (
                <div key={index} className="m-2 p-2 d-inline-block" style={{backgroundColor: '#cecece', borderRadius: '10px'}}>{el}</div>
            );
        });
    }

    convertDateToString(date) {
        date = new Date(date);
        return `${date.toDateString()} ${date.toTimeString()}`;
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
                <div key={index} className="card result-card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2 font-weight-bold">Title: </div>
                            <div className="col-10">{el.title}</div>
                        </div>
                        <div className="row">
                            <div className="col-2 font-weight-bold">Description: </div>
                            <div className="col-10">{el.description}</div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-3 font-weight-bold">Tags: </div>
                                    <div className="col-8">
                                        {this.createTagsChips(el.tags)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-4 font-weight-bold">Created by:</div>
                                    <div className="col-8">{el.creator_details.name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4 font-weight-bold">Created at:</div>
                                    <div className="col-8">{this.convertDateToString(el.created_at)}</div>
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

    getThreadLIst() {
        this.server.getRequest(api_url.threads).then(res => {
            console.log(res);
            this.setState({
                threads: this.utility.getValue(res, 'data', [])
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getThreadLIst();
    }

    render() {
        return (
            <div className="Threads">
                <div>
                    <div className="row w-100 m-0" style={{height:"60px"}}>
                        <div className="offset-2 col-9">
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
                    <div className="row m-5">
                        <div className="offset-1 col-10">
                            {this.finalSearchResult()}
                        </div>
                    </div>
                </div>

                <div style={{position: 'fixed', width: '100%'}}>
                    <div style={{display: 'inline-block', position: 'absolute', right: '60px', bottom: '220px'}}>
                        <Link className="btn btn-primary" to='/threads/new' style={{lineHeight: '7px', borderRadius: '50%', padding: '20px'}}>
                            +
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Threads;