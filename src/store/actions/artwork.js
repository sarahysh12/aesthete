import * as actionTypes from "./actionTypes";
import axios from "../../axios";

// Fetch all Artworks
export const fetchArtworkStart = () => {
  return {
    type: actionTypes.FETCH_ARTWORKS_START,
  };
};

export const fetchArtworkSuccess = (artworks) => {
  return {
    type: actionTypes.FETCH_ARTWORKS_SUCCESS,
    artworks: artworks,
  };
};

export const fetchArtworkFail = (error) => {
  return {
    type: actionTypes.FETCH_ARTWORKS_FAIL,
    error: error,
  };
};

export const fetchArtworks = () => {
  return (dispatch) => {
    dispatch(fetchArtworkStart());
    axios
      .get("/artworks.json")
      .then((response) => {
        const fetchedArtworks = [];
        for (let key in response.data) {
          fetchedArtworks.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchArtworkSuccess(fetchedArtworks));
      })
      .catch((error) => {
        dispatch(fetchArtworkFail(error));
      });
  };
};

// Add new Artwork
export const addArtworkStart = () => {
  return {
    type: actionTypes.ADD_ARTWORK_START,
  };
};

export const addArtworkSuccess = (id, artworkData) => {
  return {
    type: actionTypes.ADD_ARTWORK_SUCCESS,
    artworkId: id,
    artworkData: artworkData,
  };
};

export const addArtworkFailed = (error) => {
  return {
    type: actionTypes.ADD_ARTWORK_FAIL,
    error: error,
  };
};

//TODO how to use token?
export const addArtwork = (artworkData, token) => {
  return (dispatch) => {
    dispatch(addArtworkStart());
    axios
      .post("/artworks.json", artworkData)
      .then((response) => {
        dispatch(addArtworkSuccess(response.data.name, artworkData));
      })
      .catch((error) => {
        dispatch(addArtworkFailed(error));
      });
  };
};

// Fetch Artworks by userId
export const fetchArtworksByUserId = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchArtworkStart());
    const queryParams = '?orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/artworks.json" + queryParams)
      .then((response) => {
        const fetchedArtworks = [];
        for (let key in response.data) {
          fetchedArtworks.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchArtworkSuccess(fetchedArtworks));
      })
      .catch((error) => {
        dispatch(fetchArtworkFail(error));
      });
  };
};

//TODO
export const fetchArtworksByArtId = (token, artId) => {};

// Search Artworks
export const searchArtworkStart = () => {
  return {
    type: actionTypes.SEARCH_ARTWORK_START,
  };
};

export const searchArtworkSuccess = (artworks) => {
  return {
    type: actionTypes.SEARCH_ARTWORK_SUCCESS,
    artworks: artworks,
  };
};

export const searchArtworkFail = (error) => {
  return {
    type: actionTypes.SEARCH_ARTWORK_FAIL,
    error: error,
  };
};

export const searchArtworks = (categoty) => {
  return (dispatch) => {
    dispatch(searchArtworkStart());
    const queryParams =
      '?orderBy="artworkData/artwork_type"&equalTo="' + categoty + '"';
    axios
      .get("/artworks.json" + queryParams)
      .then((response) => {
        const fetchedArtworks = [];
        for (let key in response.data) {
          fetchedArtworks.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(searchArtworkSuccess(fetchedArtworks));
      })
      .catch((error) => {
        dispatch(searchArtworkFail(error));
      });
  };
};
