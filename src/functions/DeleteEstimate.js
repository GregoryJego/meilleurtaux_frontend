import axios from "axios";

export default async function DeleteEstimate(id) {
  try {
    await axios.post(
      `https://meilleurtaux-backend-gj.herokuapp.com/estimate/${id}/delete`
    );
  } catch (e) {
    console.log(e);
  }
}
