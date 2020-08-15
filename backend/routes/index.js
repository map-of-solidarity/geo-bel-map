const express = require('express');
const router = express.Router();

router.get('/', async  (req, res) => {
  await res.status(200).send('ok');
  res.end()
});


module.exports = router;
