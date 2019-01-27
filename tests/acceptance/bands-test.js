import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
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
    this.server.create('band', {name: 'Alt-J'});

    await visit('/');
    await createSong('Tessellate');
    assert.dom('[data-test-rr=band-list-item] > .active').hasText('Alt-J', 'The currently clicked band active');
    assert.dom('[data-test-rr=song-list-item]').exists({count: 1}, 'A band link rendered', 'A new song is rendered' );
    assert.dom('[data-test-rr=songs-nav-item] > .active').hasText('Songs', 'The Songs tab is active');
  })
});
