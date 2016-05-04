import React from 'react';
import { connect } from 'react-redux';

import DateInput from '../form-elements/DateInput';
import ErrorableSelect from '../form-elements/ErrorableSelect';
import ErrorableTextInput from '../form-elements/ErrorableTextInput';
import FullName from '../questions/FullName';
import Gender from '../questions/Gender';
import MothersMaidenName from './MothersMaidenName';
import SocialSecurityNumber from '../questions/SocialSecurityNumber';
import { maritalStatuses, states } from '../../utils/options-for-select.js';
import { isNotBlank, validateIfDirty } from '../../utils/validations';
import { veteranUpdateField } from '../../actions';

/**
 * Props:
 * `isSectionComplete` - Boolean. Marks the section as completed. Provides styles for completed sections.
 * `reviewSection` - Boolean. Hides components that are only needed for ReviewAndSubmitSection.
 */
class NameAndGeneralInfoSection extends React.Component {
  render() {
    let content;

    if (this.props.isSectionComplete && this.props.reviewSection) {
      content = (<table className="review usa-table-borderless">
        <tbody>
          <tr>
            <td>Veteran Name:</td>
            <td>{this.props.data.fullName.first.value} {this.props.data.fullName.middle.value} {this.props.data.fullName.last.value} {this.props.data.fullName.suffix.value}</td>
          </tr>
          <tr>
            <td>Mother's Maiden Name:</td>
            <td>{this.props.data.mothersMaidenName.value}</td>
          </tr>
          <tr>
            <td>Social Security Number:</td>
            <td>{this.props.data.socialSecurityNumber.value}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{this.props.data.gender.value}</td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>{this.props.data.dateOfBirth.month.value}/{this.props.data.dateOfBirth.day.value}/{this.props.data.dateOfBirth.year.value}</td>
          </tr>
          <tr>
            <td>Place of Birth:</td>
            <td>{this.props.data.cityOfBirth.value} {this.props.data.stateOfBirth.value}</td>
          </tr>
          <tr>
            <td>Current Marital Status:</td>
            <td>{this.props.data.maritalStatus.value}</td>
          </tr>
        </tbody>
      </table>);
    } else {
      content = (<div>
        <p>(<span className="hca-required-span">*</span>) Indicates a required field</p>
        <div className="input-section">
          <FullName required
              name={this.props.data.fullName}
              onUserInput={(update) => {this.props.onStateChange('fullName', update);}}/>
          <MothersMaidenName value={this.props.data.mothersMaidenName}
              onUserInput={(update) => {this.props.onStateChange('mothersMaidenName', update);}}/>
          <SocialSecurityNumber required
              ssn={this.props.data.socialSecurityNumber}
              onValueChange={(update) => {this.props.onStateChange('socialSecurityNumber', update);}}/>
          <Gender required
              value={this.props.data.gender}
              onUserInput={(update) => {this.props.onStateChange('gender', update);}}/>
          <DateInput required
              day={this.props.data.dateOfBirth.day}
              month={this.props.data.dateOfBirth.month}
              year={this.props.data.dateOfBirth.year}
              onValueChange={(update) => {this.props.onStateChange('dateOfBirth', update);}}/>
        </div>
        <div className="input-section">
          <h4>Place of Birth</h4>
          <ErrorableTextInput label="City"
              field={this.props.data.cityOfBirth}
              onValueChange={(update) => {this.props.onStateChange('cityOfBirth', update);}}/>
          <ErrorableSelect label="State"
              options={states.USA}
              value={this.props.data.stateOfBirth}
              onValueChange={(update) => {this.props.onStateChange('stateOfBirth', update);}}/>
          <ErrorableSelect
              errorMessage={validateIfDirty(this.props.data.maritalStatus, isNotBlank) ? undefined : 'Please select a marital status'}
              label="Current Marital Status"
              options={maritalStatuses}
              required
              value={this.props.data.maritalStatus}
              onValueChange={(update) => {this.props.onStateChange('maritalStatus', update);}}/>
        </div>
      </div>);
    }

    return (
      <fieldset>
        <h4>Veteran's Name</h4>
        {content}
      </fieldset>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.veteran.nameAndGeneralInformation,
    isSectionComplete: state.uiState.completedSections['/personal-information/name-and-general-information']
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStateChange: (field, update) => {
      dispatch(veteranUpdateField(['nameAndGeneralInformation', field], update));
    }
  };
}

// TODO(awong): Remove the pure: false once we start using ImmutableJS.
export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(NameAndGeneralInfoSection);
export { NameAndGeneralInfoSection };
