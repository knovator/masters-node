const express = require('express');
const router = express.Router();

router.post(`/files/upload`, (req, res) => {
    // TO DO: some file storage operation
    let uri = "/image.jpg";
    let id = "62c54b15524b6b59d2313c02";
    res.json({
      code: 'SUCCESS',
      data: { id, uri },
      message: 'File uploaded successfully'
    });
});

router.delete(`/files/:id/delete`, (req, res) => {
    // TO DO: some file remove operation
    res.json({
        code: 'SUCCESS',
        data: {},
        message: 'File removed successfully'
    })
})

module.exports = router;