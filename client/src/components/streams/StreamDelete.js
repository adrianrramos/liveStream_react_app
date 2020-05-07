import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onClickDelete = () => {
        this.props.deleteStream(this.props.stream.id);
    };


    render() {
        const actions = (
            <React.Fragment>
                <button className="ui button negative" onClick={() => this.onClickDelete()}>
                    Delete Stream
                </button>
                <button className="ui button">
                    Cancel
                </button>
            </React.Fragment>
        );
        
        console.log(this.props.stream)
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content={this.props.stream ? this.props.stream.title : "Loading..."}
                    actions={actions}
                    onDismiss={() => history.push("/")}
                />
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
