import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
const API_DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(`${API_DEPARTMENTS_URL}4`);
    const objectIds = result.data.objectIDs.slice(0, 10); // Limiting to first 10 object IDs for demonstration

    // Fetch details for each object in parallel
    const artWork = objectIds.map(async (objectId) => {
      const response = await axios.get(`${API_URL}${objectId}`);
      return response.data;
    });

    // Wait for all requests to complete
    const artDetails = await Promise.all(artWork);
    console.log(artDetails)

    res.render("index.ejs", { content: artDetails });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data.");
  }
});
app.get("/department", async (req, res) => {
  try {
    const result = await axios.get(`${API_DEPARTMENTS_URL}4`);
    const objectIds = result.data.objectIDs.slice(0, 10); // Limiting to first 10 object IDs for demonstration

    // Fetch details for each object in parallel
    const artWork = objectIds.map(async (objectId) => {
      const response = await axios.get(`${API_URL}${objectId}`);
      return response.data;
    });

    // Wait for all requests to complete
    const artDetails = await Promise.all(artWork);
    console.log(artDetails)

    res.render("department.ejs", { content: artDetails });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data.");
  }
});


// app.get("/", async (req, res) => {
//   try {
//     const result = await axios.get(API_URL);
//     const objectIds = result.data.objectIDs.slice(1899, 2000); // Limiting to first 10 object IDs for demonstration

//     // Fetch details for each object in parallel
//     const artWork = objectIds.map(async (objectId) => {
//       const response = await axios.get(`${API_URL}${objectId}`);
//       return response.data;
//     });

//     // Wait for all requests to complete
//     const artDetails = await Promise.all(artWork);

//     res.render("index.ejs", { content: artDetails });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error fetching data.");
//   }
// });

//https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=5

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
