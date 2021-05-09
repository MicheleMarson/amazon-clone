import axios from "axios"

const instance = axios.create({
  baseURL: "https://us-central1-clone-21945.cloudfunctions.net/api "
  // "http://localhost:5001/clone-21945/us-central1/api" // the api(cloud function) url
})

export default instance

//firebase deploy --only hosting - only front end
