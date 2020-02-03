function convertNumber() {
  var numberInput = document.getElementById("number-field").value;
  var wordField = document.getElementById("word-field");

  // Add check for null and positive numbers not starting with 0, up to 100099
  var numberPattern = /^\d*[1-9]\d*$/;
  if (!numberInput.match(numberPattern) || numberInput.length > 6 || numberInput > 100099) {
    alert(
      "This field only accepts positive numbers with no leading zero, up to 100099."
    );
  }

  // Although this array becomes repetitive after 19, it has been created as a single array to prevent too complex "if" checks later in hundreds and thousands conversions. 
  var zeroToNinetyNine = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty", "thirty-one", "thirty-two", "thirty-three", "thirty-four", "thirty-five", "thirty-six", "thirty-seven", "thirty-eight", "thirty-nine", "forty", "forty-one", "forty-two", "forty-three", "forty-four", "forty-five", "forty-six", "forty-seven", "forty-eight", "forty-nine", "fifty", "fifty-one", "fifty-two", "fifty-three", "fifty-four", "fifty-five", "fifty-six", "fifty-seven", "fifty-eight", "fifty-nine", "sixty", "sixty-one", "sixty-two", "sixty-three", "sixty-four", "sixty-five", "sixty-six", "sixty-seven", "sixty-eight", "sixty-nine", "seventy", "seventy-one", "seventy-two", "seventy-three", "seventy-four", "seventy-five", "seventy-six", "seventy-seven", "seventy-eight", "seventy-nine", "eighty", "eighty-one", "eighty-two", "eighty-three", "eighty-four", "eighty-five", "eighty-six", "eighty-seven", "eighty-eight", "eighty-nine", "ninety", "ninety-one", "ninety-two", "ninety-three", "ninety-four", "ninety-five", "ninety-six", "ninety-seven", "ninety-eight", "ninety-nine"];

  // Convert numbers between 0-99
  if (numberInput >= 0 && numberInput < 100) {
    convertZeroToNinetyNine(numberInput);
  }

  function convertZeroToNinetyNine(nZeroToNinetyNine) {
    wordField.textContent = zeroToNinetyNine[nZeroToNinetyNine];
  }

  // Convert numbers between 100-999
  if (numberInput.length == 3) {
    convertHundreds(numberInput);
  }

  function convertHundreds(nHundred, isThousand) {
    var hundredFirstDigit = nHundred.substring(0, 1);
    var hundredDecimals = nHundred.substring(1, 3);

    // hasThousand true/false is used to check which phrase to use, based on the type of number
    var hasThousand = isThousand ? " thousand" : "";

    if (hundredDecimals == "00") {
      wordField.textContent = zeroToNinetyNine[hundredFirstDigit] + " hundred" + hasThousand;
    }
    if (hundredDecimals > "00" && hundredDecimals < 100) {
      wordField.textContent =
        zeroToNinetyNine[hundredFirstDigit] +
        " hundred and " +
        zeroToNinetyNine[Number(hundredDecimals)];
    }
  }

  //Convert numbers between 1000-100099
  if (numberInput.length > 3 && numberInput.length < 7) {
    // In case of numbers major than 999, insert a dot every 3 digits, starting from the end of number,
    // this makes it easy to recognize thousands and hundreds in a number
    // and convert them accordingly
    var dottedNumber = numberInput
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    convertThousands(dottedNumber);
  }

  function convertThousands(nThousands) {
    var thousands = nThousands.substr(0, nThousands.indexOf("."));
    var hundreds = nThousands.substr(nThousands.indexOf(".") + 1);

    if (hundreds == "000" && thousands < 100) {
      wordField.textContent = zeroToNinetyNine[thousands] + " thousand";
    }
    if (hundreds == "000" && thousands > 99) {
      convertHundreds(thousands, true);
    }
    if (thousands < 100 && hundreds > "000" && hundreds < 100) {
      convertZeroToNinetyNine(Number(hundreds));
      wordField.prepend(zeroToNinetyNine[thousands] + " thousand and ");
    }
    if (thousands > 99 && hundreds > "000" && hundreds < 100) {
      convertHundreds(thousands, true);
      wordField.append(" and " + zeroToNinetyNine[Number(hundreds)]);
    }
    if (thousands < 100 && hundreds > 99) {
      wordField.append(zeroToNinetyNine[thousands] + " thousand");
      convertHundreds(hundreds);
      wordField.prepend(zeroToNinetyNine[thousands] + " thousand and ");
    }
  }
}