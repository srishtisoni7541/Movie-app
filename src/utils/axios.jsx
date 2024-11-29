import axios from "axios";
const instance = axios.create({
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTk5NjFjNzk1MzIyOWYxNTc3NDBmOGY3NzkwYmE0ZSIsIm5iZiI6MTczMDYxODAwOS41ODE5NzUsInN1YiI6IjY3MjI4NDRkZWViMGM1ZWYzYjliYmRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rbq8OCaMe90GDDUG7Qqi5DjUDeOWlOBC9xWcTlYBhCM",
  },
  baseURL: "https://api.themoviedb.org/3/",
});
export default instance;
