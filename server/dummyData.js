import Lens from './models/lens';

export default function () {
  Lens.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const lens1 = new Post({ lens_name: 'some lens', manufacturer: 'fujifilm'});

    Post.create([lens1], (error) => {
      if (!error) {
        console.log('Lens initially added ready to go....');
      }
    });
  });
}
