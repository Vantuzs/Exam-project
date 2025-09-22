ages.aggregate([
  {
    $match: {
      $expr: {
        $regexMatch: { input: '$body', regex: 'паравоз', options: 'i' },
      },
    },
  },
]);
