const router = require("express").Router();
const dbModel = require("./answersModel");
const answerScrubber = require("./answerScrubber");

router.get("/", (req, res) => {
  const id = req.user.userId;
  return dbModel
    .findAllByUserId(id)
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(404).json({ message: "SOMEMESSAGE", ...e });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  return dbModel
    .findAllQuestionId(req.user.userId,id)
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(200).json({ message: "SOMEMESSAGE", ...e });
    });
});

//Expects {"startDate":"2019-11-20", "endDate":"2019-11-21"}
router.post("/datefilter", (req, res) => {
  const id = req.user.userId;
  const { startDate, endDate } = req.body;
  
    return dbModel
      .findByDateRange(id,startDate, endDate)
      .then(p => {
        res.status(200).json({ message: `SUCCESS`, ...p });
      })
      .catch(e => {
        res.status(404).json({ message: "SOMEMESSAGE", ...e });
      });
});

router.post("/", answerScrubber, (req, res) => {
  const { body } = req;

  return dbModel
    .add(body)
    .then(p => {
      res.status(201).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(200).json({ message: "SOMEMESSAGE", ...e, ...body });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {userId} = req.user
  const { body } = req;

  return dbModel
    .editById(userId,id)
    .then(p => {
      res.status(200).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(200).json({ message: "SOMEMESSAGE", ...e });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  return dbModel
    .remove(id)
    .then(p => {
      res.status(201).json({ message: `SUCCESS`, ...p });
    })
    .catch(e => {
      res.status(200).json({ message: "SOMEMESSAGE", ...e });
    });
});
module.exports = router;