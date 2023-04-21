import React from 'react';

class CityExplorerForm extends React.Component {

  render() {
    return (

        <form onSubmit={this.props.submitLocation}>
          <input type='text' placeholder='enter city name here...' onChange={this.props.onChange} />
          <input type='submit' />
        </form>

    )
  }
}

export default CityExplorerForm;