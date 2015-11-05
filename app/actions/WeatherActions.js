import alt from "../alt";

class WeatherActions{
    constructor() {
      this.generateActions(
          'getSuccess',
          'getFail'
      );
    }
    getWeather(){
        $.ajax({url:"/weather"})
        .done( data => {
            data = JSON.parse(data);
            this.actions.getSuccess(data);
        })
    }
}
export default alt.createActions(WeatherActions);