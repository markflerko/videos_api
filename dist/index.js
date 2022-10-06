"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./models/db"));
const status_codes_constants_1 = require("./models/status-codes.constants");
const getVideoViewModel_1 = require("./utils/getVideoViewModel");
exports.app = (0, express_1.default)();
const jsonParser = express_1.default.json();
exports.app.use(jsonParser);
const port = +(process.env.PORT || 3001);
exports.app.delete("/__test__/data", (req, res) => {
    db_1.default.videos = [];
    res.sendStatus(status_codes_constants_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.get("/videos", (req, res) => {
    let results = db_1.default.videos;
    if (req.query.title) {
        results = db_1.default.videos.filter((video) => video.title.indexOf(req.query.title) > -1);
    }
    res.json(results.map(getVideoViewModel_1.getVideoViewModel));
});
exports.app.get("/videos/:id", (req, res) => {
    const foundedCourse = db_1.default.videos.find((item) => item.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(status_codes_constants_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    res.json((0, getVideoViewModel_1.getVideoViewModel)(foundedCourse));
});
exports.app.delete("/videos/:id", (req, res) => {
    const index = db_1.default.videos.findIndex((item) => item.id === +req.params.id);
    if (index === -1) {
        res.sendStatus(status_codes_constants_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    db_1.default.videos.splice(index, 1);
    res.sendStatus(status_codes_constants_1.HTTP_STATUS.NO_CONTENT_204);
});
exports.app.put("/videos/:id", (req, res) => {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.title)) {
        res.sendStatus(status_codes_constants_1.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const foundedVideo = db_1.default.videos.find((item) => item.id === +req.params.id);
    if (!foundedVideo) {
        res.sendStatus(status_codes_constants_1.HTTP_STATUS.NOT_FOUND_404);
        return;
    }
    foundedVideo.title = req.body.title;
    foundedVideo.author = req.body.author;
    foundedVideo.availableResolutions = req.body.availableResolutions;
    foundedVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundedVideo.minAgeRestriction = req.body.minAgeRestriction;
    res.json((0, getVideoViewModel_1.getVideoViewModel)(foundedVideo));
});
exports.app.post("/videos", (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.title)) {
        res.sendStatus(status_codes_constants_1.HTTP_STATUS.BAD_REQUEST_400);
        return;
    }
    const newVideo = {
        id: Date.now(),
        title: (_b = req.body) === null || _b === void 0 ? void 0 : _b.title,
        author: (_c = req.body) === null || _c === void 0 ? void 0 : _c.author,
        availableResolutions: (_d = req.body) === null || _d === void 0 ? void 0 : _d.availableResolutions,
        canBeDownloaded: ((_e = req.body) === null || _e === void 0 ? void 0 : _e.canBeDownloaded) || true,
        minAgeRestriction: ((_f = req.body) === null || _f === void 0 ? void 0 : _f.minAgeRestriction) || null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
    };
    db_1.default.videos.push(newVideo);
    res.json((0, getVideoViewModel_1.getVideoViewModel)(newVideo));
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
