import axios from "axios";

export default async function DeleteEstimate(id) {
  try {
    await axios.post(
      `https://meilleurtaux-backend-gj.herokuapp.com/estimate/${id}/delete`
    );
    console.log("Suppression réussie");
  } catch (e) {
    console.log(e);
  }
}
