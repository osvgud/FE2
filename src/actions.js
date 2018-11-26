export const setMovies = (movies) => {
  // action - always return only object with data, no functionality can be done here
  return {
    type: 'SET_MOVIES',
    movies,
  };
};

export const setGenres = (genres) => {
    return {
        type: 'SET_GENRES',
        genres,
    }
};

export const setLike = (likes) => {
    return {
        type: 'SET_LIKES',
        likes,
    }
};

export const setLogs = (logs) => {
    return {
        type: 'SET_LOGS',
        logs,
    }
}
