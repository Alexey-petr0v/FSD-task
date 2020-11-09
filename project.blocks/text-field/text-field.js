if ($('.text-field__elem_masked').length) {
  const cleave = new Cleave('.text-field__elem_masked', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
  });
}