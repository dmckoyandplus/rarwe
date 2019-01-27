import { click, fillIn } from '@ember/test-helpers';

export const createBand = async name => {
  await click('[data-test-rr=new-band-label]');
  await fillIn('[data-test-rr=new-band-input]', name);
  await click('[data-test-rr=new-band-button]');
};

export const createSong = async song => {
  await click('[data-test-rr=band-link]:first-child');
  await click('[data-test-rr=new-song-label]');
  await fillIn('[data-test-rr=new-song-input]', song);
  await click('[data-test-rr=new-song-button]');
}