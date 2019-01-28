import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | Band', function(hooks) {
  setupTest(hooks);

  test('#isGreatBand', async function(assert){
    let store = this.owner.lookup('service:store');
    let pearlJam = store.createRecord('band', {
      songs: [
        store.createRecord('song', {title: 'Daughter', rating: 5}),
        store.createRecord('song', {title: 'Rearviewmirror', rating: 4}),
        store.createRecord('song', {title: 'Who Are You', rating: 2})
      ]
    });
    assert.ok(pearlJam.isGreatBand, 'A band with >=2 good songs is a great band');

    let stiltskin = store.createRecord('band', {
      songs: [
        store.createRecord('song', {title: 'Inside', rating: 5})
      ]
    });
    assert.notOk(stiltskin.isGreatBand, 'A band with less than good songs is not a great band');

  });
});
