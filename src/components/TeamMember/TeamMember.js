import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';
import axios from 'axios';

class TeamMember extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string,
    forceUpdate: PropTypes.func,
  };

  static defaultProps = {
    photoUrl: CodelitEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      title: '',
      story: '',
      favoriteColor: '',
      photoURL: '',
      error: '',
    }
  }

  async createMemberHandle() {
    if (this.state.firstName === '') {
      this.setState({ error: 'Must provide a firstname!' })
    } else {
      await axios.post('/create', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title,
        story: this.state.story,
        favoriteColor: this.state.favoriteColor,
        photoURL: this.state.photoURL,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        firstName: '',
        lastName: '',
        title: '',
        story: '',
        favoriteColor: '',
        photoURL: '',
        error: '',
      })

      this.props.update();
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <div className="avatar-container">
            <img
              className="avatar"
              src={this.props.photoUrl}
              alt={this.props.name}
            />
          </div>
          <h2 className="title">{this.props.title}</h2>
          <h1 className="name">{this.props.name}</h1>
        </header>
        {this.props.name === "Join us!" && (
          <div>
            <form className="form-container">
              <label>
                <input placeholder='Firstname' value={this.state.firstName} onChange={(value) => this.setState({firstName: value.target.value})}/>
              </label>
              <label>
                <input placeholder='Lastname' value={this.state.lastName} onChange={(value) => this.setState({lastName: value.target.value})}/>
              </label>
              <label>
                <input placeholder='Title' value={this.state.title} onChange={(value) => this.setState({title: value.target.value})}/>
              </label>
              <label>
                <input placeholder='Story' value={this.state.story} onChange={(value) => this.setState({story: value.target.value})}/>
              </label>
              <label>
                <input placeholder='Favorite Color' value={this.state.favoriteColor} onChange={(value) => this.setState({favoriteColor: value.target.value})}/>
              </label>
              <label>
                <input placeholder='Photo URL' value={this.state.photoURL} onChange={(value) => this.setState({photoURL: value.target.value})}/>
              </label>
            </form>
            {this.state.error !== '' && (
              <span style={{color: 'red'}}>{this.state.error}</span>
            )}
            <button onClick={() => this.createMemberHandle()}>Create Teammate!</button>
          </div>
        )}
        <div className="body">{this.props.story}</div>
        <footer style={{ backgroundColor: this.props.favoriteColor }}>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box stat">9.0</div>
            <div className="one-third-flex-box stat bordered">9.0</div>
            <div className="one-third-flex-box stat">9.0</div>
          </div>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">CANDID</div>
            <div className="one-third-flex-box">LEARNING</div>
            <div className="one-third-flex-box">GRIT</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default TeamMember;
