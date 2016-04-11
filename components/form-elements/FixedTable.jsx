import React from 'react';

/**
 * A container for a fixed number of repeating elements.
 *
 * This component has the following props.
 * `component` - The UI element that is repeated.
 * `initializeCurrentElement` - a chance to update something before rendering
 * `rows` - Data for each UI element.
 * `onRowsUpdate` - Function that updates the source rows.
 */
class FixedTable extends React.Component {
  componentWillMount() {
    if (this.props.initializeCurrentElement !== undefined) {
      this.props.initializeCurrentElement();
    }
  }

  render() {
    const rowElements = this.props.rows.map((obj, index) => {
      return (
        <div className="input-section" key={index}>
          {React.createElement(this.props.component,
            { data: obj,
              onValueChange: (subfield, update) => {
                const rows = this.props.rows.slice();
                const newRow = Object.assign({}, rows[index]);
                newRow[subfield] = update;
                rows[index] = newRow;
                this.props.onRowsUpdate(rows);
              }
            })}
        </div>
      );
    });
    return (
      <div>
        {rowElements}
      </div>
    );
  }
}

FixedTable.propTypes = {
  component: React.PropTypes.func.isRequired,
  initializeCurrentElement: React.PropTypes.func,
  onRowsUpdate: React.PropTypes.func.isRequired,
  rows: React.PropTypes.array.isRequired
};

export default FixedTable;
