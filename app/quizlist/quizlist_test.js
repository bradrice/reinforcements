'use strict';

describe('myApp.view module', function() {

  beforeEach(module('myApp.quizlist'));

  describe('quizlist controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var quizlistCtrl = $controller('QuizListCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});