import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

// Do not change code below this line

app.get("/api{/:date}",(req,res)=>{
  const dateParam = req.params.date;
  let dateObj;

  if (!dateParam) {
  dateObj = new Date();
} else if (/^\d+$/.test(dateParam)) {
  dateObj = new Date(parseInt(dateParam));
} else {
  dateObj = new Date(dateParam);
}

  if(isNaN(dateObj.getTime())){
    return res.json({
      error: "Invalid Date"
    })
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
})



const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
