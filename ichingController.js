// iChing controller for app in angular js v1.1

(function(angular) {
  'use strict';

var app = angular.module('myApp', []);

app.filter('iChingCoins', function() {
  return function(x) {
    var i, c, txt = "";
    for (i = 0; i < x.length; i++) {
      if (x[i]=='0')                      // is the coin a yin line? (0)
        c = String.fromCharCode(0x2688);   // show a black coin with one dot for yin lines
      else
        c = String.fromCharCode(0x2687);   // show a white coin with two dots for yang lines

      txt += c;
    }
    return txt;
  };
});

app.filter('iChingLines', function() {
  return function(x) {
      return _linePatterns[x];
  };
});

app.filter('iChingFlip', function() {
  return function(x) {

    var dash = x.search("-");
    var str = dash+2;
    var end = x.length;
    var name = x.substring(str, end);
    var nbr = x.substring(0, dash-1);
    var rev = name +  " - " + nbr;

    return rev;
  };
});

app.filter('iChingNoFlip', function() {
  return function(x) {
    return x;
  };
});

app.factory('iChingLinks', function () {
  var x = _iChingInfo[0];
  return x;
});

app.factory('iChingSites', function () {
  return {
    site: function(x) {
      return _iChingInfo[x].hexagram[1];
    }
  }
});

app.controller('iChingCtrl', ['$scope', 'iChingLinks', '$sce', '$filter', function($scope, $sce, $filter) {

    $scope.hexInfo = _hexInfo;
    $scope.noSpokeInfo = _noSpokeInfo;
    $scope.spokeInfoLeft = _spokeInfoLeft;
    $scope.spokeInfoRight = _spokeInfoRight;
    $scope.trigramNames = _trigramNames;
    $scope.lineOrder = [ { id:5 }, { id:4 }, { id:3 }, { id:2 }, { id:1 }, { id:0 } ];

    $scope.iChingSites = [];
    for (var i = 0; i < _iChingInfo.length; ++i) {
        var x = {};
        x.id = _iChingInfo[i].id;
        x.Domain = _iChingInfo[i].Domain;
        x.Short = _iChingInfo[i].Short;
        $scope.iChingSites.push(x);
    }

    $scope.no_divination = {id:0, idName:"New", question:{value:""}, coins:["","","","","",""], time:"", hexagramNow:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", ndx:-1, key:-1}, hexagramNext:{number:"", name:"", lines:[-1,-1,-1,-1,-1,-1], trigram1:"", trigram2:"", ndx:-1, key:-1}};

    $scope.lineNow = 0;
    $scope.urlHexagram = "";
    $scope.txtLocalData = "";

    var retrievedObject = localStorage.getItem('iching');

    if (retrievedObject) {
        $scope.divinations = [];
        $scope.divinations = JSON.parse(retrievedObject);
        $scope.txtLocalData = retrievedObject;
    }
    else {
        $scope.divinations = [];
        $scope.divinations.push(angular.copy($scope.no_divination));   // start with a blank
    }

    $scope.getHexagram = function(site, hexagram) {
      var x = _iChingInfo[site].Hexagrams[hexagram];
      return x;
    }

    $scope.okAboutHide = function() {
      var boxAbout = angular.element( document.querySelector( '.infoAbout' ));
      boxAbout.css('display','none');
    }

    $scope.okAboutShow = function() {
      var boxAbout = angular.element( document.querySelector( '.infoAbout' ));
      boxAbout.css('display','block');
    }
    
    //
    // STORAGE HELPERS - CLEAR, DELETE and SAVE - these use the LocalStorage API
    //
    $scope.clearDivination = function() {
        $scope.divinations[0] = JSON.parse(JSON.stringify($scope.no_divination));   // restore to a blank divination
        $scope.highlightHexs(0, 0);
    };

    $scope.deleteDivination = function(n) {
        $scope.divinations.splice(n, 1);        // delete 1 at index n
        $scope.clearDivination();

        for(let i=0; i<$scope.divinations.length; ++i) {
            $scope.divinations[i].id = i;
        }
        if($scope.divinations.length>1)
            $scope.selSaved = 1;
        else
            $scope.selSaved = 0;

        $scope.highlightHexs($scope.divinations[$scope.selSaved].hexagramNow.number, $scope.divinations[$scope.selSaved].hexagramNext.number);

        // save the divinations in local storage (on disk)
        localStorage.setItem('iching', JSON.stringify($scope.divinations));
    };

    $scope.saveDivination = function() {
        // skip edit buff at 0
        $scope.divinations.splice(1, 0, angular.copy($scope.divinations[0]));   // saved at index 1, 0 deleted
        $scope.clearDivination();

        for(let i=0; i<$scope.divinations.length; ++i) {
            $scope.divinations[i].id = i;
            if(i>0) $scope.divinations[i].idName = $scope.divinations[i].question.value.substring(0,20) +
                "? on " + $filter('date')($scope.divinations[i].time, "mediumDate") +
                " at " + $filter('date')($scope.divinations[i].time, "mediumTime");
        }

        $scope.selSaved=1;
        $scope.highlightHexs($scope.divinations[$scope.selSaved].hexagramNow.number, $scope.divinations[$scope.selSaved].hexagramNext.number);

        // save the divinations in local storage (on disk)
        localStorage.setItem('iching', JSON.stringify($scope.divinations));
    };

    $scope.resetDivinations = function() {
        localStorage.removeItem('iching');
        $scope.divinations = [];
        $scope.divinations.push(angular.copy($scope.no_divination));   // start with a blank
        $scope.selTab = '0';
    };

    //
    // finds two hexagrams and highlights them, clearing any previous highlights.
    // - 1st run builds a table of hexagram elements from the DOM to quickly change the styles to highlight.
    //
    $scope.highlightHexs = function(hexNow, hexNext) {

        if ( typeof $scope.highlightHexs.hexElements == 'undefined' ) {
            // find the elements for all 64 hexagrams in the DOM
            $scope.highlightHexs.hexElements = [];
            $scope.highlightHexs.hexElements[0] = 0; // no hexagram 0
            for (let i = 1; i< 65; ++i)
                 $scope.highlightHexs.hexElements[i] = angular.element( document.querySelector( '.hex' + i.toString()) );

            $scope.highlightHexs.hexNowHighlighted = 0;
            $scope.highlightHexs.hexNextHighlighted = 0;
        }

        if($scope.highlightHexs.hexNowHighlighted>0) {
            //$scope.highlightHexs.hexElements[$scope.highlightHexs.hexNowHighlighted].css('border','0');
            $scope.highlightHexs.hexElements[$scope.highlightHexs.hexNowHighlighted].css('background-color','lightgrey');
        }
        if($scope.highlightHexs.hexNextHighlighted>0) {
            //$scope.highlightHexs.hexElements[$scope.highlightHexs.hexNextHighlighted].css('border','0');
            $scope.highlightHexs.hexElements[$scope.highlightHexs.hexNextHighlighted].css('background-color','lightgrey');
        }

        if(hexNow>0) {
            //$scope.highlightHexs.hexElements[hexNow].css('border','4px solid #0F0');
            $scope.highlightHexs.hexElements[hexNow].css('background-color','aqua');
        }
        if(hexNext>0) {
            //$scope.highlightHexs.hexElements[hexNext].css('border','4px solid #F00');
            $scope.highlightHexs.hexElements[hexNext].css('background-color','gold');
        }

        $scope.highlightHexs.hexNowHighlighted = hexNow;
        $scope.highlightHexs.hexNextHighlighted = hexNext;
    };

    //
    // ThrowCoins - calls calcHexagrams
    //
    $scope.ThrowCoins = function() {
      var c, mult, l, mask=0x7, toss, divider=2;

        // See if we want to throw each line individually
        if ($scope.rbThrow.value == 'ThrowEach') {
            if($scope.lineNow>5) {
                let q = $scope.divinations[0].question;     // save question
                $scope.clearDivination();
                $scope.divinations[0].question = q;         // restore question
                $scope.lineNow=0;
            }

            var n = get3coins();  // show in binary with 3 digits padded to 0
            $scope.rndCoins = n;     // show the coins after the throw button for debug
            $scope.divinations[0].coins[$scope.lineNow] = n;   // save the coins for each line
            $scope.lineNow += 1;         // move to next line

            $scope.divinations[0].time = Date.now();
            calcHexagrams();
        }
        else {
          // get all 6 lines at one time
          for (l=0; l<6; l++) {
            $scope.lineNow = l;
            var n = get3coins();  // show in binary with 3 digits padded to 0
            $scope.divinations[0].coins[$scope.lineNow] = n;       // save the coin for each line 
          }

          $scope.divinations[0].time = Date.now();
          $scope.lineNow = 6;
          calcHexagrams();
        }
    }

    function get3coins() {
        var i=0,mult=1,toss=0,coin=0,coins3="";
        for(i=0; i<3; ++i) {
            // generate a 16 bit random number and pull 3 bits out to use as coin states
            var random_number = Math.floor(Math.random()*65535);
            coin = (random_number & 1);  // pull bit 0
            toss=toss+(coin*mult);
            mult*=2;
        }
        coins3 = toss.toString(2).padStart(3, '0');  // show in binary with 3 digits padded to 0
        return coins3;
    }

    function calcHexagrams() {
      for (var l=0; l<6; l++) {
        // for each coin pattern, calculate the lines of the now and next hexagrams including change lines
        let n = $scope.divinations[0].coins[l];
        var i = parseInt(n, 2);

        $scope.divinations[0].hexagramNow.lines[l] = _lineValues[i];
        $scope.divinations[0].hexagramNext.lines[l] = _lineValues[i];

        // is change line?  strip B1 and invert B0 (no change lines in hexagramNext, but change lines are inverted)
        if (_lineValues[i] & 2)
          // strip hi bit = change line
          $scope.divinations[0].hexagramNext.lines[l] = ((_lineValues[i] & 1) ^ 1);
      }

      if ($scope.lineNow > 5) {    // if all 6 lines done?
        $scope.divinations[0].hexagramNow.key = calcKeyNow();
        $scope.divinations[0].hexagramNow.trigram2 = (parseInt($scope.divinations[0].hexagramNow.key, 2) & 0x38) / 8;   // top 3 of 6 bits
        $scope.divinations[0].hexagramNow.trigram2 = _trigramNames[$scope.divinations[0].hexagramNow.trigram2];
        $scope.divinations[0].hexagramNow.trigram1 = parseInt($scope.divinations[0].hexagramNow.key, 2) & 7;            // bottom 3 bits
        $scope.divinations[0].hexagramNow.trigram1 = _trigramNames[$scope.divinations[0].hexagramNow.trigram1];

        $scope.divinations[0].hexagramNext.key = calcKeyNext();
        $scope.divinations[0].hexagramNext.trigram2 = (parseInt($scope.divinations[0].hexagramNext.key, 2) & 0x38) / 8;   // top 3 of 6 bits
        $scope.divinations[0].hexagramNext.trigram2 = _trigramNames[$scope.divinations[0].hexagramNext.trigram2];
        $scope.divinations[0].hexagramNext.trigram1 = parseInt($scope.divinations[0].hexagramNext.key, 2) & 7;            // bottom 3 bits
        $scope.divinations[0].hexagramNext.trigram1 = _trigramNames[$scope.divinations[0].hexagramNext.trigram1];

        // Lookup number of Now Hexagram
        for(i=0; i<64; ++i) {
          if(_iChingInfo[0].Hexagrams[i].Key==$scope.divinations[0].hexagramNow.key) {
            $scope.divinations[0].hexagramNow.number = i+1;
            $scope.divinations[0].hexagramNow.ndx = i;
            break;
          }
        }

        // Lookup number of Next Hexagram
        for(i=0; i<64; ++i) {
          if(_iChingInfo[0].Hexagrams[i].Key==$scope.divinations[0].hexagramNext.key) {
            $scope.divinations[0].hexagramNext.number = i+1;
            $scope.divinations[0].hexagramNext.ndx = i;
            break;
          }
        }
      }
      $scope.highlightHexs($scope.divinations[0].hexagramNow.number, $scope.divinations[0].hexagramNext.number);
    };

    // Calculate Key for the Now Hexagram
    function calcKeyNow() {
      let k = "", bit = -1;
      for (let i = 5; i >= 0; --i) {
        bit = $scope.divinations[0].hexagramNow.lines[i];
        bit = bit & 1;  // strip change line bit
        k += bit.toString();
      }
      return k;
    };

    // Calculate Key for the Next Hexagram
    function calcKeyNext() {
      let k = "", bit = -1;
      for (let i = 5; i >= 0; --i) {
        bit = $scope.divinations[0].hexagramNow.lines[i];

        if ( bit & 2) {   // is this a change line?
          bit = bit & 1;  // strip change line bit
          bit = bit ^ 1;  // invert line in hexagramNext
        }
        else {
          bit = bit & 1;  // strip change line bit
        }

        k += bit.toString();
      }
      return k;
    };

  }]);

})(window.angular);
