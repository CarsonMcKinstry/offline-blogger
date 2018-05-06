import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class Form extends Component {
  initialState = {
    topic: undefined,
    title: '',
    author: '',
    body: ''
  };

  state = this.initialState;

  handleSelectChange = (e, i, v) => {
    this.setState({
      topic: v
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.createPost(this.state).then(() => {
      this.setState(this.initialState);
    });
  };

  render() {
    // if (this.props.loading) return <h2>Loading</h2>;
    console.log(this.props.topics);
    return (
      <Paper zDepth={2} style={{ padding: 12 }}>
        <TextField
          floatingLabelText="Title"
          fullWidth={true}
          value={this.state.title}
          onChange={this.handleChange}
          name="title"
        />
        <TextField
          floatingLabelText="Author"
          fullWidth={true}
          value={this.state.author}
          onChange={this.handleChange}
          name="author"
        />
        <SelectField
          floatingLabelText="Topic..."
          value={this.state.topic}
          maxHeight={250}
          onChange={this.handleSelectChange}
        >
          <MenuItem value={undefined} />
          {this.props.topics.map(({ value, label }, i) => (
            <MenuItem key={label} value={value} primaryText={label} />
          ))}
        </SelectField>
        <TextField
          value={this.state.body}
          fullWidth={true}
          multiLine={true}
          rows={5}
          onChange={this.handleChange}
          name="body"
        />
        <RaisedButton
          primary
          label="Submit"
          fullWidth={true}
          onClick={this.handleSubmit}
        />
      </Paper>
    );
  }
}

Form.propTypes = {};

export default Form;
