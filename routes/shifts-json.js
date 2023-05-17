var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/shifts.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const shifts = getshifts();
  res.json(shifts);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const type = req.body.type;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const days = req.body.days;
  const status = req.body.status;
  const comment = req.body.comment;

  const shifts = getshifts();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  shifts.push({
    id,
    type,
    startdate,
    enddate,
    days,
    status,
    comment
  });

  setshifts(shifts);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const shifts = getshifts().filter(shift => shift.id != id);

  setshifts(shifts);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const type = req.body.type;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const days = req.body.days;
  const status = req.body.status;
  const comment = req.body.comment;

  const shifts = getshifts();

  const shift = shifts.find(shift => shift.id == id);
  if (shift) {
    shift.type = type;
    shift.startdate = startdate;
    shift.enddate = enddate;
    shift.days = days;
    shift.status = status;
    shift.comment = comment;
  }

  setshifts(shifts);

  res.json({ success: true });
});

function getshifts() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setshifts(shifts) {
  const content = JSON.stringify(shifts, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
