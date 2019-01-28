import { module, test } from 'qunit';
import { visit, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import { createBand, createSong } from '../helpers/custom-helpers';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', {name: 'Radiohead'});
    this.server.create('band', {name: 'Long Distance Calling'})

    await visit('/');
    assert.dom('[data-test-rr=band-link]').exists({count: 2}, 'All band links are rendered');
    assert.dom('[data-test-rr=band-list-item]:first-child').hasText('Radiohead', 'First band link contains the band name');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Long Distance Calling', 'The other band link contains the band name');
  });

  test('Create a band', async function(assert){
    this.server.create('band', {name: 'Royal Blood'});

    await visit('/');
    await createBand('Caspian');
    assert.dom('[data-test-rr=band-list-item]').exists({count: 2}, 'All band links are rendered', 'A new band link is rendered');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
  });

  test('Create a new song for an existing band', async function(assert){
    this.server.logging = true;
    this.server.create('band', {name: 'Alt-J'});

    await visit('/');
    await createSong('Tessellate');
    assert.dom('[data-test-rr=band-list-item] > .active').hasText('Alt-J', 'The currently clicked band active');
    assert.dom('[data-test-rr=song-list-item]').exists({count: 1}, 'A band link rendered', 'A new song is rendered' );
    assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
  });

  test('Sort songs in various ways', async function(assert){
    this.server.logging = true;
    let band = this.server.create('band', {name: 'Them Crooked Vultures'});
    this.server.create('song', {title: 'Elephants', rating: 5, band});
    this.server.create('song', {title: 'New Fang', rating: 4, band});
    this.server.create('song', {title: 'Mind Eraser, No Chaser', rating: 4, band});
    this.server.create('song', {title: 'Spinning in Daffodils', rating: 5, band});
    
    await visit('/');
    await click('[data-test-rr=band-link]');
    
    assert.dom('[data-test-rr=song-list-item]').exists({count: 4}, '4 songs render under the selected band');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Elephants', 'The first song is the highest ranked, first one in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:nth-child(4)').hasText('New Fang', 'The last song is the lowest ranked, last one in the alphabet');
  });
});
