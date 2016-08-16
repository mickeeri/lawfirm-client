import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Icon from 'react-fa';
import { LAWSUITS_PATH } from '../constants';
import * as actions from '../actions';
import LawsuitDeleteButton from './LawsuitDeleteButton';
import LawsuitForm from './LawsuitForm';
import LawsuitInfo from './LawsuitInfo';
import LawsuitArchiveButton from './LawsuitArchiveButton';


class LawsuitShow extends Component {
  componentWillMount() {
    this.props.fetchLawsuits({ filter: {}, id: this.props.params.id });
  }

  render() {
    const { lawsuit, toggleEdit, edit, createUpdateLawsuit, errorMessage } = this.props;

    if (!lawsuit) {
      return <div className="ui big active centered inline loader" />;
    }

    return (
      <div className="show-grid">
        <div className="column">
          <div className="segment">
            <div className="lawsuit-show-header">
              <h2>Ärende {lawsuit.slug}</h2>
              { lawsuit.closed && <span className="archived"><Icon name="archive" />Arkiverat</span> }
            </div>

            <div className="ui divider" />

            <a onClick={toggleEdit}>Ändra</a>

            {/* Show form or info based on bool edit */}
            {edit ?
              <LawsuitForm
                onSubmit={createUpdateLawsuit}
                errorMessage={errorMessage}
                toggleEdit={toggleEdit}
                primaryClientId={lawsuit.primary_client.id}
              /> :
              <LawsuitInfo lawsuit={lawsuit} />
            }

            <div className="ui divider" />

            <a>Redigera anteckning</a>
            <h3>Anteckning</h3>
            <p>{lawsuit.note}</p>

            <div className="ui section divider" />

            <h3>Inställningar</h3>

            <div className="settings">
              <LawsuitDeleteButton />

              <LawsuitArchiveButton
                toggleClosed={() => {
                  createUpdateLawsuit({ id: lawsuit.id, closed: !lawsuit.closed });
                }}
                closed={lawsuit.closed}
              />
            </div>

            <div className="ui section divider" />

            <Link to={LAWSUITS_PATH}>
              <Icon name="chevron-left" />Tillbaka till ärendelista
            </Link>
          </div>
        </div>
        <div className="column">
          <div className="segment">
            <h2>Klient/Klienter</h2>
          </div>
          <div className="segment">
            <h2>Mortpart/Motparter</h2>
          </div>
        </div>
      </div>
    );
  }
}

LawsuitShow.propTypes = {
  lawsuit: PropTypes.object,
  fetchLawsuits: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  createUpdateLawsuit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  lawsuit: state.lawsuits.lawsuit,
  edit: state.lawsuits.edit,
});

export default connect(mapStateToProps, actions)(LawsuitShow);
