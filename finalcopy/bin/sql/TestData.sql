-- Victim table for ccid = 2
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Female',
    5,
    'yes',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2496111,
    72.8592682,
    'public/images/6b19e3c46b2896a10dd230f7227a36f6.jpg',
    '',
    1,
    2
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Female',
    5,
    'yes',
    'child labour',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2396111,
    72.8592682,
    'public/images/ca5922cbc3f95f51a4efd661e4fbe5a6.jpg',
    'found at an isolated place',
    1,
    2
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Female',
    10,
    'no',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2499111,
    72.8595682,
    'public/images/961db98e1e30d0ae9f60dfc647015360.jpg',
    'found on the highway',
    1,
    2
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Male',
    5,
    'yes',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2446111,
    72.8552682,
    '/public/images/dc605374e3555d06dc3aabc4926ad75e.jpg',
    'found on the streets',
    1,
    2
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Male',
    10,
    'yes',
    'child labour',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2596111,
    72.8692682,
    'public/images/ddf6eae60e5aded86bd3e0afc006fd18.jpg',
    'at a factory',
    1,
    2
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    ccid
  )
values(
    'Male',
    10,
    'no',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2494111,
    72.8596682,
    'public/images/49e6024df2c87f059b2b517c0ad266fc.jpg',
    '',
    1,
    2
  );
-- Victim data for oid = 8
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    oid
  )
values(
    'Male',
    15,
    'yes',
    'child labour',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.2506111,
    72.8602682,
    'public/images/dc605374e3555d06dc3aabc4926ad75e.jpg',
    'found at a lonely place',
    1,
    8
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    oid
  )
values(
    'Female',
    5,
    'yes',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.0238229,
    72.8394269,
    'public/images/3045adc93335b608b382996ec932b26e.jpg',
    '',
    1,
    8
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    oid
  )
values(
    'Female',
    5,
    'yes',
    'child labour',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.0248229,
    72.8384269,
    'public/images/3045adc93335b608b382996ec932b26e.jpg',
    '',
    1,
    8
  );
insert into victim(
    sex,
    age,
    pwdstat,
    activity,
    date,
    time,
    lat,
    lng,
    image,
    description,
    uid,
    oid
  )
values(
    'Female',
    10,
    'no',
    'begging',
    CURRENT_TIMESTAMP,
    CURRENT_TIME,
    19.0258,
    72.8744,
    'public/images/6b19e3c46b2896a10dd230f7227a36f6.jpg',
    '',
    1,
    8
  );


-- INSERTING VALUES IN RESCUED CHILD TABLE
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0632128, 5, 'Female', 72.8975909, 2, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0582128, 5, 'Male', 72.8945909, 2, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0662128, 15, 'Male', 72.9005909, 2, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0552128, 15, 'Female', 72.8955909, 2, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0612128, 5, 'Female', 72.8995909, 2, 1, 'no');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0622128, 10, 'Male', 72.9015909, 2, 1, 'no');
insert into rescued_child(lat, age, sex, lng, oid, vid, pwdstat)
values(19.0652128, 10, 'Female', 72.8945909, 2, 1, 'no');
-- INSERTING VALUES IN RESCUED CHILD TALBLE ccid = 3
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0073, 10, 'Male', 72.8424, 3, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0075, 15, 'Male', 72.8421, 3, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0051, 10, 'Male', 72.8426, 3, 1, 'no');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0062, 15, 'Male', 72.8423, 3, 1, 'no');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0067, 5, 'Female', 72.8437, 3, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0073, 5, 'Female', 72.8425, 3, 1, 'yes');
insert into rescued_child(lat, age, sex, lng, ccid, vid, pwdstat)
values(19.0064, 5, 'Female', 72.8429, 3, 1, 'no');