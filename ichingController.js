// iChing controller for app in angular js v1.0


(function(angular) {
  'use strict';

angular.module('myApp', [])
  .controller('iChingCtrl', ['$scope', '$sce', function($scope, $sce) {

//    $scope.data = {
//        singleSelect: null,
//        multipleSelect: [],
//        option1: "Jim DeKorne's"
//    };


    $scope.lineNow = 0;
    $scope.urlHexagram = "";
    $scope.txtLocalData = "";
    //$scope.divinations = [];
    //$scope.divinations.push(angular.copy(no_divination));   // start with a blank

/***/
    var retrievedObject = localStorage.getItem('iching');

    if (retrievedObject) {
        $scope.divinations = [];
        $scope.divinations = JSON.parse(retrievedObject);
        $scope.txtLocalData = retrievedObject;
        
        //localStorage.removeItem('iching');
        //$scope.divinations = [];
        //$scope.divinations.push(angular.copy(no_divination));   // start with a blank

        // wait for DOM to update...
        //setTimeout(function(){ $scope.updateHexWeb(); }, 1000);
                
        //$scope.updateHexWeb();

      //$scope.showHexWeb($scope.divinations[1].hexagramNow.number);

    }
    else {
        $scope.divinations = [];
        $scope.divinations.push(angular.copy(no_divination));   // start with a blank
    }

/***/

/***    
    if (true) {
        // add some test data
        $scope.divinations[0].question.value = "Well?";
        $scope.divinations[0].coins = ["101","001","010","100","110","000"];
        $scope.divinations[0].time = Date.now();
        calcHexagrams();
        $scope.divinations.push(angular.copy($scope.divinations[0]));

        // add more test data
        $scope.divinations[0].question.value = "Think so?";
        $scope.divinations[0].coins = ["110","101","011","101","010","010"];
        $scope.divinations[0].time = "Jan 14";
        calcHexagrams();
        $scope.divinations.push(angular.copy($scope.divinations[0]));

        // add even more test data
        $scope.divinations[0].question.value = "Any chance?";
        $scope.divinations[0].coins = ["001","010","100","010","101","101"];
        $scope.divinations[0].time = "Jan 3";
        calcHexagrams();
//       $scope.divinations.push(angular.copy($scope.divinations[0]));    // leave this one to display in first row
    }

***/

    //
    // DISPLAY HELPERS - for coins and lines
    //
    // return string for display of 3 coins translating 0 and 1 to graphics characters
    $scope.showCoins = function(c) {        
      let s="";
      if(c=="") return s;
      for (let i=0; i<3; ++i) {
        if (c[i]=='0')                      // is the coin a yin line? (0)
          s+=String.fromCharCode(0x2688);   // show a black coin with one dot for yin lines
        else
          s+=String.fromCharCode(0x2687);   // show a white coin with two dots for yang lines
      }
      return s;
    };

    // return the display for a line of the hexagram 
    $scope.showLine = function(l) {
      // will be pretty graphics, but for now show text strings
      return linePatterns[l];
    }

    //
    // MAIN TWO FUNCTIONS
    // ThrowCoins - calls calcHexagrams
    //
    $scope.ThrowCoins = function() {
      var l, mask=0xE, toss, divider=2;

        // See if we want to throw each line individually
        if ($scope.rbThrow.value == 'ThrowEach') {
            if($scope.lineNow>5) {
                let q = $scope.divinations[0].question;     // save question
                $scope.clearDivination();
                $scope.divinations[0].question = q;         // restore question
                $scope.lineNow=0;
            }

            // generate a 16 bit random number and pull 3 bits out to use as coin states
            var random_number = Math.floor(Math.random()*65535);
            toss = (random_number & mask)/divider;  // 1110 pull these three bits for number
            //var n = ((random_number)>>>0).toString(16).padStart(4, '0')  // show in hex with 4 digits padded to 0
            var n = ((toss)>>>0).toString(2).padStart(3, '0')  // show in binary with 3 digits padded to 0
            $scope.rndCoins = n;     // show the coins after the throw button for debug
            $scope.divinations[0].coins[$scope.lineNow] = n;   // save the coins for each line
            $scope.lineNow += 1;         // move to next line

//            if ($scope.lineNow > 5) {    // if all 6 lines done?
                $scope.divinations[0].time = Date.now();
                calcHexagrams();
//            }
        }
        else {
          // generate a 20 bit random number and pull 18 bits out as 6 groups of three bits to use as coin states
          var random_number = Math.floor(Math.random()*1048560);
          var r = ((random_number)>>>0).toString(2).padStart(20, '0')  // show in binary with 20 digits padded to 0 
          $scope.rndCoins = r;

          for (l=0; l<6; l++) {
            $scope.lineNow = l;
            toss = (random_number & mask)/divider;  // 1110 pull these three bits for number
            mask = mask * 8;              // move mask and divider over 3 bits
            divider = divider * 8;
            var n = ((toss)>>>0).toString(2).padStart(3, '0')  // show in binary with 3 digits padded to 0
            $scope.divinations[0].coins[$scope.lineNow] = n;       // save the coin for each line 
          }

          $scope.divinations[0].time = Date.now();
          calcHexagrams();
          $scope.lineNow = 0;       // time to reset
        }
    }

    function calcHexagrams() {
      for (var l=0; l<6; l++) {
        // for each coin pattern, calculate the lines of the now and next hexagrams including change lines
        let n = $scope.divinations[0].coins[l];
        var i = parseInt(n, 2);

        $scope.divinations[0].hexagramNow.lines[l] = lineValues[i];
        $scope.divinations[0].hexagramNext.lines[l] = lineValues[i];

        // is change line?  strip B1 and invert B0 (no change lines in hexagramNext, but change lines are inverted)
        if (lineValues[i] & 2)
          // strip hi bit = change line
          $scope.divinations[0].hexagramNext.lines[l] = ((lineValues[i] & 1) ^ 1);
      }

      if ($scope.lineNow > 5) {    // if all 6 lines done?
        $scope.divinations[0].hexagramNow.key = calcKeyNow();
        $scope.divinations[0].hexagramNow.trigram2 = (parseInt($scope.divinations[0].hexagramNow.key, 2) & 0x38) / 8;   // top 3 of 6 bits
        $scope.divinations[0].hexagramNow.trigram2 = trigramNames[$scope.divinations[0].hexagramNow.trigram2];
        $scope.divinations[0].hexagramNow.trigram1 = parseInt($scope.divinations[0].hexagramNow.key, 2) & 7;            // bottom 3 bits
        $scope.divinations[0].hexagramNow.trigram1 = trigramNames[$scope.divinations[0].hexagramNow.trigram1];

        $scope.divinations[0].hexagramNext.key = calcKeyNext();
        $scope.divinations[0].hexagramNext.trigram2 = (parseInt($scope.divinations[0].hexagramNext.key, 2) & 0x38) / 8;   // top 3 of 6 bits
        $scope.divinations[0].hexagramNext.trigram2 = trigramNames[$scope.divinations[0].hexagramNext.trigram2];
        $scope.divinations[0].hexagramNext.trigram1 = parseInt($scope.divinations[0].hexagramNext.key, 2) & 7;            // bottom 3 bits
        $scope.divinations[0].hexagramNext.trigram1 = trigramNames[$scope.divinations[0].hexagramNext.trigram1];

        // Lookup name of Now Hexagram
        for(i=0; i<64; ++i) {
          if(HexagramsJamesDekorne[i].Key==$scope.divinations[0].hexagramNow.key) {
            $scope.divinations[0].hexagramNow.number = i+1;
            //$scope.divinations[0].hexagramNow.name = lookupHexName(i);
            break;
          }
        }

        // Lookup name of Next Hexagram
        for(i=0; i<64; ++i) {
          if(HexagramsJamesDekorne[i].Key==$scope.divinations[0].hexagramNext.key) {
            $scope.divinations[0].hexagramNext.number = i+1;
            //$scope.divinations[0].hexagramNext.name = lookupHexName(i);
            break;
          }
        }
      }
      // show hexagram now decoded from web
      //$scope.showHexWeb($scope.divinations[0].hexagramNow.number);
    };

    $scope.lookup_change = function() {
      //$window.location.reload();
      //calcHexagrams();
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

    //
    // STORAGE HELPERS - CLEAR, DELETE and SAVE
    //
    $scope.clearDivination = function() {
        $scope.divinations[0] = JSON.parse(JSON.stringify(no_divination));   // restore to a blank divination
    };

    $scope.deleteDivination = function(n) {
        $scope.divinations.splice(n, 1);        // delete 1 at index n
        $scope.clearDivination();

        // save the divinations in local storage (on disk)
        localStorage.setItem('iching', JSON.stringify($scope.divinations));
    };

    $scope.saveDivination = function() {
        // skip edit buff at 0
        $scope.divinations.splice(1, 0, angular.copy($scope.divinations[0]));   // saved at index 1, 0 deleted
        $scope.clearDivination();

        // save the divinations in local storage (on disk)
        localStorage.setItem('iching', JSON.stringify($scope.divinations));
    };

    $scope.resetDivinations = function() {
        localStorage.removeItem('iching');
        $scope.divinations = [];
        $scope.divinations.push(angular.copy(no_divination));   // start with a blank
        $scope.selTab = '0';
    };


    //
    // WEB DISPLAY HELPERS FOR HEXAGRAM DECODE FROM OTHER WEBSITES
    //

    $scope.lookupHexName = function(n) {
      if(n != "") {
        if(lookup.value=="Jim DeKorne's")     return HexagramsJamesDekorne[n-1].Name;
        else if(lookup.value=="Divination")   return HexagramsDivination[n-1].Name;
        else if(lookup.value=="The-iChing")   return HexagramsTheiChing[n-1].Name;
      }
      return "";
    }

    $scope.lookupHexLink = function(n) {
      if(n != "") {
        if(lookup.value=="Jim DeKorne's")     return HexagramsJamesDekorne[n-1].url;
        else if(lookup.value=="Divination")   return HexagramsDivination[n-1].url;
        else if(lookup.value=="The-iChing")   return HexagramsTheiChing[n-1].url;
      }
    }

    $scope.showHexWeb = function(n) {
      if(n != "") {
        if(lookup.value=="Jim DeKorne's")     window.open(HexagramsJamesDekorne[n-1].url, '_blank');
        else if(lookup.value=="Divination")   window.open(HexagramsDivination[n-1].url, '_blank');
        else if(lookup.value=="The-iChing")   window.open(HexagramsTheiChing[n-1].url, '_blank');
      }
    }

  }]);

})(window.angular);
