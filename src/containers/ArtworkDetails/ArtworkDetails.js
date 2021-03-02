import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class ArtworkDetails extends Component {
  render() {
    let arts = this.props.arts;
    const currentArtId = this.props.match.params["artId"];
    let currentArt = null;
    arts.forEach((art) => {
      if (art.id === currentArtId) {
        currentArt = <p>{art.artworkData.artwork_title}</p>;
      }
    });
    return (
      <div>
        <h1>Artwork Details</h1>
        {currentArt}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arts: state.artwork.artworks,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchArtworks: () => dispatch(actions.fetchArtworksByArtId()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetails);
