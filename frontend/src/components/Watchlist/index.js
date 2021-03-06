import React, { useState, useEffect } from 'react';
// import * as sessionActions from '../../store/session';
import * as projectActions from '../../store/project';
import * as watchlistActions from '../../store/watchlist';
import * as purchaseActions from '../../store/purchase';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './Watchlist.css';
import { Link } from 'react-router-dom';

function Watchlist() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(projectActions.getProjects());
        dispatch(watchlistActions.getWatchlists());
        dispatch(purchaseActions.getPurchases());
    }, [useSelector]);

    const user = useSelector(state => state.session.user);
    const projects = useSelector(state => state.project.projects);

    let watchlists = useSelector(state => state.watchlist.watchlists);
    if (watchlists) {
      watchlists = watchlists.filter(w => w.userId === user.id);
    }

    return (
        <div>
            <h1>watchlist</h1>
            <div>
                {watchlists && watchlists.map(w => (
                    <div className="project" key={w.id}>{w.id}, 
                        project: {(projects.find(p => p.id === w.projectId)).name},
                        karma released: {(projects.find(p => p.id === w.projectId)).karmaReleased.toString()}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Watchlist;