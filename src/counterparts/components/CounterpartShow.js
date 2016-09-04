import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import * as actions from '../actions';
import CounterpartInfo from './CounterpartInfo';
import CounterpartLawsuitsList from './CounterpartLawsuitsList';
import CounterpartForm from './CounterpartForm';

class CounterpartShow extends Component {
  componentWillMount() {
    this.props.fetchCounterparts({ id: this.props.params.id });
  }

  render() {
    const { counterpart, edit, updateCounterpart, toggleEdit } = this.props;

    if (!counterpart) {
      return <div className="ui big active centered inline loader" />;
    }

    return (
      <div>
        <div className="show-grid">
          <div className="column">
            <div className="segment">
              <button
                className="link-button"
                onClick={toggleEdit}
              >Ändra</button>

              {edit ?
                <CounterpartForm
                  onSubmit={updateCounterpart}
                  toggleEdit={toggleEdit}
                /> :
                <CounterpartInfo counterpart={counterpart} />
              }
            </div>
          </div>
          <div className="column">
            <div className="segment">
              <h2>Inblandad i ärenden</h2>
              <CounterpartLawsuitsList lawsuits={counterpart.lawsuits} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CounterpartShow.propTypes = {
  fetchCounterparts: PropTypes.func.isRequired,
  counterpart: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  params: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  updateCounterpart: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counterpart: state.counterparts.counterpart,
  edit: state.counterparts.edit,
});

export default connect(mapStateToProps, actions)(CounterpartShow);
