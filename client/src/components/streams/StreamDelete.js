import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>
                    Delete Stream
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        )    
    };

    render() {
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content={this.props.stream ? this.props.stream.title : "Loading..."}
                    actions={this.renderActions()}
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
