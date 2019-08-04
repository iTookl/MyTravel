(function() {
  var placesAutocomplete = places({
    appId: 'plJEC6ZJ6XFH',
    apiKey: '8f8c09c406bc629b85c185f27e8a074a',
    container: document.querySelector('#address')
  }).configure({
    type: ['country', 'city'],
  });;
})();

(function() {
  var placesAutocomplete = places({
    appId: 'plJEC6ZJ6XFH',
    apiKey: '8f8c09c406bc629b85c185f27e8a074a',
    container: document.querySelector('#secondAddress')
  }).configure({
    type: ['country', 'city'],
  });;
})();




/*(function() {
  const placesAutocomplete = places({
    appId: 'plJEC6ZJ6XFH',
    apiKey: '8f8c09c406bc629b85c185f27e8a074a',
    container: document.querySelector('#SecondAddress')
  });

  const $address = document.querySelector('#address-value');
  placesAutocomplete.on('change', function(e) {
    $address.textContent = e.suggestion.value;
  });

  placesAutocomplete.on('clear', function() {
    $address.textContent = 'none';
  });

})();*/