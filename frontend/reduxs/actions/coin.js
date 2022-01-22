import { GET_COIN_SUCCESS, GET_COIN_FAIL } from "./types";
import axios from "axios";
// coinmarketcapからデータを取得
export const getCoinData = () => async (dispatch) => {
  //   var url = new URL(
  //     "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
  //   );
  const API_KEY = "12748421-ef15-4f3d-9467-976c62778580"; // Set your api key
  //   dispatch({
  //     type: SET_AUTH_LOADING,
  //   });

  //   var params = { start: "1", limit: "10", aux: "cmc_rank" };
  //   Object.keys(params).forEach((key) =>
  //     url.searchParams.append(key, params[key])
  //   );
  //   console.log(url);

  await axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&aux=cmc_rank",
      {
        headers: {
          Accepts: "application/json",
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    )
    .then((res) => {
      //   console.log(res.data.data);
      dispatch({
        type: GET_COIN_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_COIN_FAIL,
      });
    });

  //   dispatch({
  //     type: REMOVE_AUTH_LOADING,
  //   });
};
