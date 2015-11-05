import alt from "../alt";
import WeatherActions from "../actions/WeatherActions";

class WeatherStore {
    constructor() {
        this.bindActions(WeatherActions);
        this.weather = {
            "daily_forecast":[],
            "now": {
                "wind":{}
            },
            "hourly_forecast":[]
        };
    }

    onGetSuccess(data) {
        this.weather = data["HeWeather data service 3.0"][0];
    }

    onGetFail(errorMessage) {
        toastr.error(errorMessage);
    }
}

export default alt.createStore(WeatherStore);