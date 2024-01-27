"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send('Hello World!');
});
router.post('/auth', (req, res) => {
    //   sunucu sadece nginx'e açık
    const streamkey = req.body.key;
    //   istersek burada veritbanına bağlanıp kullanıcıları kontrol edebiliriz
    if (streamkey === 'supersecret') {
        res.status(200).send();
        return;
    }
    //   yayını reddet
    res.status(403).send();
});
exports.default = router;
