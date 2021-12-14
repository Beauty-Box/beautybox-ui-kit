const express = require('express');
const router = express.Router();
const history = require('connect-history-api-fallback');
const { resolve } = require('path');

router.use('/assets', express.static(resolve(process.cwd(), 'dist', 'assets')));

router.use(
    history({
        index: resolve(process.cwd(), 'dist', 'index.html'),
        verbose: true,
        logger: console.log.bind(console),
    })
);

router.use('*', (req, res) => {
    res.sendFile(resolve(process.cwd(), 'dist', 'index.html'));
});

module.exports = router;
