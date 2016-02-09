angular.module('colorsApp', [])
  .controller('ColorsController', function() {
    var colors = this;
    colors.color = {
      hex: 'dbefb9',
      red: 219,
      green: 239,
      blue: 185,
      percentage: 25,
      hex10: 'fafcf7',
      hex20: 'f7fbf1',
      hex30: 'f3f9e9',
      hex40: 'f0f8e3',
      hex50: 'ecf6db',
      hex60: 'e9f5d5',
      hex70: 'e5f3cd',
      hex80: 'e2f2c7',
      hex90: 'def0bf',
      hex100: 'dbefb9',
      hexPercentage: 'f6fbee',
      hash: '#'
    };

    colors.calculateFromHex = function () {
      if(colors.hexIsValid()) {
        var hex,
            redHex,
            greenHex,
            blueHex,
            red,
            green,
            blue;

        hex = colors.color.hex;

        redHex = hex.substring(0,2);
        greenHex = hex.substring(2,4);
        blueHex = hex.substring(4,6);

        red = colors.hexToDec(redHex);
        green = colors.hexToDec(greenHex);
        blue = colors.hexToDec(blueHex);

        colors.color.red = red;
        colors.color.green = green;
        colors.color.blue = blue;

        colors.calculatePercentages();

        colors.calculateHexPercentage();
      }
    };

    colors.calculateFromRGB = function () {
      if(colors.rgbIsValid(colors.color.red, colors.color.green, colors.color.blue)) {
        var red,
            green,
            blue,
            redHex,
            greenHex,
            blueHex;

        red = colors.color.red;
        green = colors.color.green;
        blue = colors.color.blue;

        redHex = colors.decToHex(red);
        greenHex = colors.decToHex(green);
        blueHex = colors.decToHex(blue);

        redHex = colors.twoDigitsHex(redHex);
        greenHex = colors.twoDigitsHex(greenHex);
        greenHex = colors.twoDigitsHex(greenHex);

        colors.color.hex = redHex + greenHex + blueHex;
        colors.calculatePercentages();

        colors.calculateHexPercentage();
      }
    };

    colors.twoDigitsHex = function (hex) {
      return hex.length === 1 ? '0' + hex : hex;
    };

    colors.hexToDec = function (hex) {
      return parseInt(hex,16);
    };

    colors.decToHex = function (dec) {
      return dec.toString(16);
    };

    colors.rgbIsValid = function (r, g, b) {
      var red = colors.color.red,
          green = colors.color.green,
          blue = colors.color.blue;

      return (r >= 0 && r <= 255) &&
              (g >= 0 && g <= 255) &&
              (b >= 0 && b <= 255) &&
              Number.isInteger(r) &&
              Number.isInteger(g) &&
              Number.isInteger(b);
    };

    colors.hexIsValid = function () {
      var hex,
            redHex,
            greenHex,
            blueHex,
            red,
            green,
            blue;

        hex = colors.color.hex;

        redHex = hex.substring(0,2);
        greenHex = hex.substring(2,4);
        blueHex = hex.substring(4,6);

        red = colors.hexToDec(redHex);
        green = colors.hexToDec(greenHex);
        blue = colors.hexToDec(blueHex);

        return colors.rgbIsValid(red, green, blue) && colors.color.hex.length === 6;
    };

    colors.calculatePercentages = function () {
      colors.color.hex10 = colors.calculatePercentage(10);
      colors.color.hex20 = colors.calculatePercentage(20);
      colors.color.hex30 = colors.calculatePercentage(30);
      colors.color.hex40 = colors.calculatePercentage(40);
      colors.color.hex50 = colors.calculatePercentage(50);
      colors.color.hex60 = colors.calculatePercentage(60);
      colors.color.hex70 = colors.calculatePercentage(70);
      colors.color.hex80 = colors.calculatePercentage(80);
      colors.color.hex90 = colors.calculatePercentage(90);
      colors.color.hex100 = colors.calculatePercentage(100);
    };

    colors.calculatePercentage = function (percentage) {
      var percentage = (100 - percentage)/100,
          red = Math.round((255 - colors.color.red) * percentage + colors.color.red),
          green = Math.round((255 - colors.color.green) * percentage + colors.color.green),
          blue = Math.round((255 - colors.color.blue) * percentage + colors.color.blue),
          redHex = colors.decToHex(red),
          greenHex = colors.decToHex(green),
          blueHex = colors.decToHex(blue);

      redHex = colors.twoDigitsHex(redHex);
      greenHex = colors.twoDigitsHex(greenHex);
      blueHex = colors.twoDigitsHex(blueHex);

      return redHex + greenHex + blueHex;
    }

    colors.calculateHexPercentage = function () {
      if (colors.rgbIsValid(colors.color.red, colors.color.green, colors.color.blue) && colors.percentageIsValid()) {
        colors.color.hexPercentage = colors.calculatePercentage(colors.color.percentage);
      }
    };

    colors.percentageIsValid = function () {
      var p = colors.color.percentage;

      return Number.isInteger(p) && p >= 0 && p <= 100;
    };
  });