import Lens from '../models/lens';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getLens(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lens });
  });
}



/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getSearchedLens(req, res) {
  Lens.findOne({ lens_name: req.params.lens_name }).exec((err, lens) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lens });
  });
}
