jQuery(function () {

  const traits = {
    "committed": 0,
    "skilled_worker": 0,
    "compassionate": 0,
    "communicator": 0,
    "teamwork": 0,
    "self-management": 0,
    "animal_lover": 0,
    "leadership": 0,
    "problem_solver": 0,
    "nature_lover": 0,
    "resilience": 0,
    "donation": 0,
    "imaginative": 0,
    "outdoors": 0,
  };

  const personalities = {
    "clingy": ["compassionate", "communicator", "teamwork"] ,
    "control_freak": ["leadership", "teamwork", "communicator"],
    "beastmaster": ["outdoors", "animal_Lover", "nature_lover"],
    "oversharer": ["compassionate", "donation", "self-management"],
    "strong_silent_type": ["resilience", "committed", "compassionate"],
    "workaholic": ["committed", "skilled_worker", "self-management"],
    "artsy_fartsy": ["imaginative", "problem_solver", "teamwork"],
    "corporate_slave": ["skilled_worker", "self-management", "problem_solver"],
  };

  $(":button").on("click", function () {
    // traits.push($(this).data("id"));
    traits[$(this).data("id")] += 1;
    console.log(traits);
    if ($(this).parent().parent().attr("id") == "q10") {
      let personality = calcPersonality();
      $(this).parent().parent().attr("personality_id", personality);
    };
  });

  function calcPersonality() {
    // Returning beastmaster for mid demo:
    return "3"
  };
});


function calcPersonality2() {// work in progress - dont touch
  // let keysSorted = Object.keys(traits).sort(function (a, b) { return traits[a] - traits[b] }).map(key => traits[key]);
  // console.log(keysSorted);

  let entries = Object.entries(traits);

  let sorted = entries.sort((a, b) => a[1] - b[1]);  // have array of arrays -> ordered in lowest to most

  let no_zeros = (sorted.filter(word => word[1] > 0)); // remove traits with zeros
  let is_found = false;

  let only_ones = (sorted.filter(word => word[1] == 1)); // only ones in this array

  console.log("no zeros: ", no_zeros);
  console.log("last", no_zeros[no_zeros.length - 1][1]);
  console.log("second last", no_zeros[no_zeros.length - 2][1]);
  console.log("third last", no_zeros[no_zeros.length - 3][1]);
  console.log("fourth last", no_zeros[no_zeros.length - 4][1]);

  // New stuff from 17/05
  if ((no_zeros[no_zeros.length - 3][1] >= 2) && (no_zeros[no_zeros.length - 4][1] == 1)) { //If first three are clearly winning (2+, 2+, 2+, 1/0)
    console.log("got here");
    let trait_group = [no_zeros[no_zeros.length - 3][0], no_zeros[no_zeros.length - 1][0], no_zeros[no_zeros.length - 2][0]];
    for (const key in personalities) {
      if (trait_group.sort() === personalities[key].sort()) {
        console.log(key);
        return key;
      };
    };
  } else if (no_zeros[no_zeros.length - 2][1] >= 2 && no_zeros[no_zeros.length - 3][1] == 1) { // (e.g 2+ 2+ 1 1....)
    while (is_found == false) {
      let random_no = Math.floor(Math.random() * (only_ones.length - 1));
      let third_trait = only_ones[random_no][0]; //choose random 3rd trait from group of 1's
      let trait_group = [no_zeros[no_zeros.length - 1][0], no_zeros[no_zeros.length - 2][0], third_trait];
      for (const key in personalities) {
        if (trait_group.sort() === personalities[key].sort()) {
          console.log(key);
          is_found = true;
          return key;
        };
      };
    };

  } else if (no_zeros[no_zeros.length - 1][1] >= 2 && no_zeros[no_zeros.length - 2][1] == 1) { // (e.g 2+ 1 1 1....)
    while (is_found == false) {
      let random_no = Math.floor(Math.random() * (only_ones.length - 1));
      let random_no2 = Math.floor(Math.random() * (only_ones.length - 1));
      let second_trait = only_ones[random_no2][0]; //choose random 2nd trait from group of 1's
      let third_trait = only_ones[random_no][0]; //choose random 3rd trait from group of 1's
      let trait_group = [no_zeros[no_zeros.length - 1][0], second_trait, third_trait];
      console.log(trait_group);
      for (const key in personalities) {
        if (trait_group.sort() === personalities[key].sort()) {
          console.log(key);
          is_found = true;
          return key;
        };
      };
    };
  } else if (no_zeros[no_zeros.length - 1][1] == 1) {
    while (is_found == false) { // (e.g 1 1 1 1....)
      let random_no = Math.floor(Math.random() * (only_ones.length - 1));
      let random_no2 = Math.floor(Math.random() * (only_ones.length - 1));
      let random_no3 = Math.floor(Math.random() * (only_ones.length - 1));
      let first_trait = only_ones[random_no3][0]; // choose random 1st trait from group of 1's
      let second_trait = only_ones[random_no2][0]; //choose random 2nd trait from group of 1's
      let third_trait = only_ones[random_no][0]; //choose random 3rd trait from group of 1's
      let trait_group = [first_trait, second_trait, third_trait];
      for (const key in personalities) {
        if (trait_group.sort() === personalities[key].sort()) {
          console.log(key);
          is_found = true;
          return key;
        };
      };
    };
  } else if (no_zeros[no_zeros.length - 3][1] >= 2 && no_zeros[no_zeros.length - 4][1] >= 2) { // (e.g 2+ 2+ 2+ 2+....)
    let only_twos = (sorted.filter(word => word[1] == 2)); // only ones in this array
    while (is_found == false) {
      let random_no = Math.floor(Math.random() * (only_twos.length - 1));
      let random_no2 = Math.floor(Math.random() * (only_twos.length - 1));
      let random_no3 = Math.floor(Math.random() * (only_twos.length - 1));
      let first_trait = only_twos[random_no3][0]; // choose random 1st trait from group of 1's
      let second_trait = only_twos[random_no2][0]; //choose random 2nd trait from group of 1's
      let third_trait = only_twos[random_no][0]; //choose random 3rd trait from group of 1's
      let trait_group = [first_trait, second_trait, third_trait];
      for (const key in personalities) {
        if (trait_group.sort() === personalities[key].sort()) {
          console.log(key);
          is_found = true;
          return key;
        };
      };
    };
  };
};
