import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const lensSchema = new Schema({
  lens_name: { type: 'String', required: true },
  manufacturer: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Lens', lensSchema);
