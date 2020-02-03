// We wait for DOM to be loaded because some tests will require a DOM
$(function () {

  var challenge = $('#number-field');
  var submitButton = $('#submit-button');
  var response = $('#word-field');

  function numberComparator(number, phrase) {
    challenge.val(number);
    submitButton.click();
    expect(response.text()).toEqual(phrase);

    // Cleanup fields after testing
    challenge.val("");
    response.empty();
  }

  // Test suite to perform basic DOM verifications
  describe('DOM verification', function () {
    it("ensures the number input field appears when the page loads", function () {
      expect(document.getElementById("number-field")).toBeInDOM();
    });
    it("focuses the number input field when user clicks on it", function () {
      expect((challenge).click().focus()).toBeFocused()
    });
  });

  // Test suite to spy event on Submit button
  describe('Spy event on Submit button', function () {
    beforeEach(function () {
      // Calls the convertNumber() function
      spyOn(window, 'convertNumber');
    });
    it("checks if the convertNumber() function is called when clicking on Submit button", function () {
      submitButton.click();
      expect(window.convertNumber).toHaveBeenCalled();
    });
  });

  // Test suite to compare numbers and expected phrase.
  // Numbers before, onto and after the ranges defined in convert.js have been tested 
  describe('Number Comparator', function () {
    it('checks if "7" equals to "seven"', function () {
      numberComparator(7, 'seven')
    });
    it('checks if "99" equals to "ninety-nine"', function () {
      numberComparator(99, 'ninety-nine')
    });
    it('checks if "100" equals to "one hundred"', function () {
      numberComparator(100, 'one hundred')
    });
    it('checks if "101" equals to "one hundred and one"', function () {
      numberComparator(101, 'one hundred and one')
    });
    it('checks if "200" equals to "two hundred"', function () {
      numberComparator(200, 'two hundred')
    });
    it('checks if "999" equals to "nine hundred and ninety-nine"', function () {
      numberComparator(999, 'nine hundred and ninety-nine')
    });
    it('checks if "1000" equals to "one thousand"', function () {
      numberComparator(1000, 'one thousand')
    });
    it('checks if "1001" equals to "one thousand and one"', function () {
      numberComparator(1001, 'one thousand and one')
    });
    it('checks if "1100" equals to "one thousand and one hundred"', function () {
      numberComparator(1100, 'one thousand and one hundred')
    });
    it('checks if "9999" equals to "nine thousand and nine hundred and ninety-nine"', function () {
      numberComparator(9999, 'nine thousand and nine hundred and ninety-nine')
    });
    it('checks if "10000" equals to "ten thousand"', function () {
      numberComparator(10000, 'ten thousand')
    });
    it('checks if "10001" equals to "ten thousand and one"', function () {
      numberComparator(10001, 'ten thousand and one')
    });
    it('checks if "10100" equals to "ten thousand and one hundred"', function () {
      numberComparator(10100, 'ten thousand and one hundred')
    });
    it('checks if "10101" equals to "ten thousand and one hundred and one"', function () {
      numberComparator(10101, 'ten thousand and one hundred and one')
    });
    it('checks if "99999" equals to "ninety-nine thousand and nine hundred and ninety-nine"', function () {
      numberComparator(99999, 'ninety-nine thousand and nine hundred and ninety-nine')
    });
    it('checks if "100000" equals to "one hundred thousand"', function () {
      numberComparator(100000, 'one hundred thousand')
    });
    it('checks if "100001" equals to "one hundred thousand and one"', function () {
      numberComparator(100001, 'one hundred thousand and one')
    });
    it('checks if "100099" equals to "one hundred thousand and ninety-nine"', function () {
      numberComparator(100099, 'one hundred thousand and ninety-nine')
    });
  });

}());