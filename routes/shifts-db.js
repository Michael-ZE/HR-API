var express = require("express");
var router = express.Router();
var fs = require("fs");
var mysql = require("mysql");

const DATA_PATH = "data/structure.sql";

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "shifts"
});

function getConnection(res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("connection failed", err);
        res.render("error", {
          status: err.status || 500,
          message: "Connection failed",
          error: {
            status: "Check API logs"
          }
          //error: err
        });
        reject("mysql connection failed", err);
        return;
      }
      resolve(connection);
    });
  });
}

/**
 * run this before first USAGE to create shifts TABLE
 */
router.get("/install", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = fs.readFileSync(DATA_PATH, "utf8");
    connection.query(sql, function (err, results) {
      if (err) {
        console.error("Install failed", err);
      }
      connection.release();
      res.redirect("/");
    });
  } catch (err) {}
});

/**
 *
 */
router.get("/", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = `SELECT id, type, startdate, enddate, days, status, comment FROM shifts`;
    connection.query(sql, function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.send(err);
        return;
      }
      connection.release();
      res.json(results);
    });
  } catch (err) {}
});

/**
 *
 */
router.post("/create", async function (req, res, next) {
  const type = req.body.type;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const days = req.body.days;
  const status = req.body.status;
  const comment = req.body.comment;

  try {
    const connection = await getConnection(res);
    const sql = `INSERT INTO shifts (id, type, startdate, enddate, days, status, comment) VALUES (NULL, ?, ?, ?, ?, ?, ?);`;
    connection.query(
      sql,
      [type, startdate, enddate, days, status, comment],
      function (err, results) {
        if (err) throw err;
        const id = results.insertId;
        connection.release();
        res.json({
          success: true,
          id
        });
      }
    );
  } catch (err) {}
});

/**
 *
 */
router.delete("/delete", async function (req, res, next) {
  const id = req.body.id;

  try {
    const connection = await getConnection(res);
    const sql = `DELETE FROM shifts WHERE id=?`;
    connection.query(sql, [id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  } catch (err) {}
});

/**
 *
 */
router.put("/update", async function (req, res, next) {
  const id = req.body.id;
  const type = req.body.type;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const days = req.body.days;
  const status = req.body.status;
  const comment = req.body.comment;

  try {
    const connection = await getConnection(res);
    const sql = `UPDATE shifts SET promotion=?, members=?, name=?, url=? WHERE id=?`;
    connection.query(
      sql,
      [id, type, startdate, enddate, days, status, comment],
      function (err, results) {
        if (err) throw err;
        connection.release();
        res.json({ success: true });
      }
    );
  } catch (err) {}
});

module.exports = router;
