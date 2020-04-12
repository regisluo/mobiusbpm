(function() {
  'use strict';

  angular
    .module('mobiusUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
