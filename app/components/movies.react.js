import React from "react";
import MoviesStore from "../stores/MoviesStore";
import MoviesActions from "../actions/MoviesActions";

class movies extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = MoviesStore.getState();
	    this.onChange = this.onChange.bind(this);
  	}
  	componentDidMount() {
	    MoviesStore.listen(this.onChange);
	    //初始actions
	    //MoviesActions.;
	    MoviesActions.getMovies(12);
  	}
  	componentWillUnmount() {
	    MoviesStore.unlisten(this.onChange);
  	}
  	onChange(state) {
	    this.setState(state);
  	}
  	render(){
  		var movies = this.state.movies.map(function(item,i){
			return (
				<div key={i} className="movies-item">
					<a href={item.href} target="_blank"><img src={item.img} /></a>
					<span className="movies-item-title">{item.title}</span>
				</div>
			)
		});
		return (
			<div className="movies-content">
				{movies}
			</div>
		);
  	}
}

export default movies;