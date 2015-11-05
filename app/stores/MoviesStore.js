import alt from "../alt";
import MoviesActions from "../actions/MoviesActions";

class MoviesStore {
    constructor() {
        this.bindActions(MoviesActions);
        this.movies = [];
    }

    onGetMoviesSuccess(data) {
        this.movies = data;
    }

    onGetMoviesFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(MoviesStore);