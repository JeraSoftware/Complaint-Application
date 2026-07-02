const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

/* Database Connection */

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "Admin",

  database: "complaint_db"

});

db.connect((err) => {

  if (err) {

    console.log("Database Connection Failed");

    console.log(err);

  } else {

    console.log("MySQL Connected");

  }

});

/* getNextComplaintId */
app.get("/getNextComplaintId", (req, res) => {

  const sql = `
    SELECT MAX(id) AS lastId
    FROM complaints
  `;

  db.query(sql, (err, result) => {

    if(err){

      res.send(err);

    }
    else{

      let nextId = 1;

      if(result[0].lastId != null){

        nextId =
          result[0].lastId + 1;

      }

      let complaintId =
        "CM2026-" + nextId;

      res.send({

        complaintId: complaintId

      });

    }

  });

});

/* Insert Complaint */

app.post("/addComplaint", (req, res) => {

  const {

    complaintDesc,

    district,

    department

  } = req.body;

  const sql = `

    INSERT INTO complaints

    (complaint_desc, district, department, status)

    VALUES (?, ?, ?, ?)

  `;

  db.query(

    sql,

    [

      complaintDesc,

      district,

      department,

      "Pending"

    ],

    (err, result) => {

      if(err){

        res.send(err);

      }
      else{

        /* Generate Complaint ID */

        let complaintId =
          "CM2026-" + result.insertId;

        /* Update Complaint ID */

        let updateSql = `

          UPDATE complaints

          SET complaint_id = ?

          WHERE id = ?

        `;

        db.query(

          updateSql,

          [

            complaintId,

            result.insertId

          ],

          (updateErr) => {

            if(updateErr){

              res.send(updateErr);

            }
            else{

              res.send({

                message: "Complaint Added",

                complaintId: complaintId

              });

            }

          }

        );

      }

    }

  );

});

app.get("/complaints", (req, res) => {

  let district = req.query.district;
  let department = req.query.department;
  let status = req.query.status;
  let search = req.query.search;

  let sql = `
    SELECT *
    FROM complaints
    WHERE 1=1
  `;

  let values = [];

  if(district && district !== "Select District"){

    sql += ` AND district = ? `;
    values.push(district);

  }

  if(department && department !== "Select Department"){

    sql += ` AND department = ? `;
    values.push(department);

  }

  if(status && status !== "Select Status"){

    sql += ` AND status = ? `;
    values.push(status);

  }

  if(search){

    sql += `
      AND (
        complaint_desc LIKE ?
        OR complaint_id LIKE ?
      )
    `;

    values.push(`%${search}%`);
    values.push(`%${search}%`);

  }

  sql += ` ORDER BY id DESC `;

  db.query(sql, values, (err, result) => {

    if(err){

      res.send(err);

    }
    else{

      res.send(result);

    }

  });

});

app.put("/complaints/:id/status", (req, res) => {
  const complaintId = req.params.id;
  const status = req.body.status;

  if (!status) {
    return res.status(400).send({ error: "Status is required" });
  }

  const sql = `
    UPDATE complaints
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, complaintId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "Complaint not found" });
    }

    res.send({ message: "Status updated" });
  });
});

/* Admin Dashboard */

app.get("/adminDashboard", (req, res) => {

  const totalSql = `
    SELECT COUNT(*) AS totalComplaints
    FROM complaints
  `;

  const currentMonthSql = `
    SELECT COUNT(*) AS currentMonth
    FROM complaints
    WHERE MONTH(created_at) = MONTH(CURDATE())
    AND YEAR(created_at) = YEAR(CURDATE())
  `;

  const lastMonthSql = `
    SELECT COUNT(*) AS lastMonth
    FROM complaints
    WHERE MONTH(created_at) = MONTH(CURDATE() - INTERVAL 1 MONTH)
    AND YEAR(created_at) = YEAR(CURDATE() - INTERVAL 1 MONTH)
  `;

  const complaintsSql = `
    SELECT *
    FROM complaints
    ORDER BY id DESC
  `;

  db.query(totalSql, (err, totalResult) => {

    if(err) return res.send(err);

    db.query(currentMonthSql, (err, currentResult) => {

      if(err) return res.send(err);

      db.query(lastMonthSql, (err, lastResult) => {

        if(err) return res.send(err);

        db.query(complaintsSql, (err, complaintResult) => {

          if(err) return res.send(err);

          let totalComplaints =
            totalResult[0].totalComplaints;

          let currentMonth =
            currentResult[0].currentMonth;

          let lastMonth =
            lastResult[0].lastMonth;

          let growthPercentage = 0;

          if(lastMonth > 0){

            growthPercentage =
              (
                (currentMonth - lastMonth)
                / lastMonth
              ) * 100;

          }

          res.send({

            totalComplaints,

            currentMonth,

            lastMonth,

            growthPercentage:
              growthPercentage.toFixed(0),

            complaints:
              complaintResult

          });

        });

      });

    });

  });

});



app.listen(5000, () => {

  console.log("Server running on port 5000");

});