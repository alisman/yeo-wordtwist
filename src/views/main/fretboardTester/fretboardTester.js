import React, { PropTypes as T } from 'react';
import {Link} from 'react-router';
import FretboardChallenge from './fretboardChallenge';
import { actionCreators } from 'reducers/fretboard';
import HistoryChart from './charts/history';

export class IndexPage extends React.Component {

    componentDidMount(){

        //this.props.store.dispatch({ type:"NEW_CHALLENGE" });

        this.props.store.dispatch(actionCreators.newTest());

    }

    handleNoteClick(noteObj) {

        this.props.store.dispatch(actionCreators.selectionAttempt(noteObj));

    }

    render() {

        let challenge;

        let storeState = this.props.store.getState();

        if (storeState.get('noteSelection').get('currentChallenge') !== null) {

            challenge = <FretboardChallenge key={storeState.get('noteSelection').get('currentChallenge').get('id')} activeStringIndex={ storeState.get('noteSelection').get('currentChallenge').get('activeStringIndex') }
                                            onNoteClick={(note) => this.handleNoteClick(note) }
                                            fretboardData={ storeState.get("noteSelection").get('strings') }
                                            challenge={ storeState.get('noteSelection').get('currentChallenge') }
                />;

        } else {

            challenge = "<h2>Error: There is no challenge</h2>";

        }

        return (
            <div>
                <div className="section" id="challenge-area">
                    { challenge }
                </div>
                <div className="section" id="stats-area">
                    <HistoryChart data={storeState.getIn(['noteSelection','testHistory'])}  />
                </div>
            </div>
        )
    }
}

export default IndexPage;
