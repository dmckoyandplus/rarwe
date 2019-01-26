import Controller from '@ember/controller';

export default Controller.extend({
  isEditing: false,

  actions: {
    toggleIsEditing(){
      this.toggleProperty('isEditing');
    }
  }
});
