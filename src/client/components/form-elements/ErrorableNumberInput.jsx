import React from 'react';
import _ from 'lodash';

import { makeField } from '../../../common/fields.js';

/**
 * A form input with a label that can display error messages.
 *
 * Props:
 * `errorMessage` - Error string to display in the component.
 *                  When defined, indicates input has a validation error.
 * `label` - String for the input field label.
 * `max` - String or function.
 * `min` - String or function.
 * `pattern` - String specifying the pattern for the input.
 * `placeholder` - placeholder string for input field.
 * `required` - boolean. Render marker indicating field is required.
 * `field` - field object representing the input.
 * `onValueChange` - a function with this prototype: (newValue)
 */
class ErrorableNumberInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.inputId = _.uniqueId('errorable-number-input-');
  }

  handleChange(domEvent) {
    this.props.onValueChange(makeField(domEvent.target.value, true));
  }

  render() {
    // Calculate error state.
    let errorSpan = '';
    let errorSpanId = undefined;

    // TODO: Look into an alternate way of adding error styling not based on presence of errorMessage:
    // There could be cases where there is an error but we don't want a message to appear, and this
    // is not clear right now
    if (this.props.errorMessage) {
      errorSpanId = `${this.inputId}-error-message`;
      errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{this.props.errorMessage}</span>;
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = <span className="hca-required-span">*</span>;
    }

    return (
      <div className={this.props.errorMessage ? 'usa-input-error' : undefined}>
        <label
            className={this.props.errorMessage !== undefined ? 'usa-input-error-label' : undefined}
            htmlFor={this.inputId}>
              {this.props.label}
              {requiredSpan}
        </label>
        {errorSpan}
        <input
            aria-describedby={errorSpanId}
            id={this.inputId}
            max={this.props.max}
            min={this.props.min}
            pattern={this.props.pattern}
            placeholder={this.props.placeholder}
            type="number"
            value={this.props.field.value}
            onChange={this.handleChange}/>
      </div>
    );
  }
}

ErrorableNumberInput.propTypes = {
  errorMessage: React.PropTypes.string,
  field: React.PropTypes.shape({
    value: React.PropTypes.string,
    dirty: React.PropTypes.bool
  }).isRequired,
  label: React.PropTypes.string.isRequired,
  min: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  max: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ]),
  pattern: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  onValueChange: React.PropTypes.func.isRequired,
};

export default ErrorableNumberInput;
