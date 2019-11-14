const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

// GET /
router.get("/", (req, res) => {
  // res.status(200).json({ message: "hello" });

  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        message: `Unable to get accounts. Error: ${err}`
      });
    });
});

// GET /:id

router.get("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(500).json({
        message: `Unable to get account with id ${id}. Error: ${err}`
      });
    });
});
// router.get("/:id", (req, res) => {
//   db.select("*")
//     .from("accounts")
//     .where("id", "=", req.params.id)
//     .first()
//     .then(account => {
//       res.status(200).json(account);
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: `Unable to get account with id ${id}. Error: ${err}`
//       });
//     });
// });

// POST /
router.post("/", (req, res) => {
  db.insert(req.body, "id")
    .into("accounts")
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({
        message: `Unable to POST to account. Error: ${err}`
      });
    });
});

// PUT /:id
router.put("/:id", (req, res) => {
  const change = req.body;
  // const id = req.params.id;

  db("accounts")
    .where({ id: req.params.id })
    .update(change)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({
        message: `Unabel to update id ${id}. Error: ${err}`
      });
    });
});

// DELETE /:id
router.delete("/:id", (req, res) => {
  const destroy = req.body;

  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({
        message: `Unable to delete account id ${id}. Error: ${err}`
      });
    });
});

module.exports = router;
