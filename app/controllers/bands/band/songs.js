import Controller from '@ember/controller';
import { empty, sort } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  isAddingSong: false,
  newSongName: '',
  sortBy: 'ratingDesc',
  
  sortProperties: computed('sortBy', function(){
    let options = {
      ratingDesc: ['rating:desc', 'title:asc'],
      ratingAsc: ['rating:asc', 'title:asc'],
      titleDesc: ['title:desc'],
      titleAsc: ['title:asc']
    };
    return options[this.sortBy];
  }),
  sortedSongs: sort('model.songs', 'sortProperties'),

  isAddButtonDisabled: empty('newSongName'),

  actions: {
    addSong(){
      this.set('isAddingSong', true)
    },
    async saveSong(event){
      event.preventDefault();
      let newSong = this.store.createRecord('song', {
        title: this.newSongName,
        band: this.model
      });
      await newSong.save();
      this.set('newSongName', '');
    },
    cancelAddSong(){
      this.set('isAddingSong', false);
    },
    updateRating(song, rating){
      song.set('rating', song.rating === rating ? 0 : rating);
      song.save();
    }
  }
  
});