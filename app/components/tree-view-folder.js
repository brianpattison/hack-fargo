import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['tree-view-folder'],
  tagName: 'li',

  actions: {
    toggleFolder: function(folder) {
      folder.toggleProperty('folderIsOpen');
      if (typeof(folder.save) === 'function') {
        folder.save();
      }
    }
  }
});
