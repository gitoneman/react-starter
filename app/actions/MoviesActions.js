import alt from "../alt";

class MoviesActions{
    constructor() {
        this.generateActions(
            'getMoviesSuccess',
            'getMoviesFail'
        );
    }

    getMovies(limit) {
        $.ajax({ url: '/movies',data:{limit:limit} })
        .done(data => {
            this.actions.getMoviesSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getMoviesFail(jqXhr.responseJSON.message);
        });
    }
}
export default alt.createActions(MoviesActions);