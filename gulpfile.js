var gulp = require('gulp');

require('./gulpfiles/_init_');
require('./gulpfiles/_vendor_');

// 加入user
// 执行gulp watch-user,
// 执行gulp build-user
require('./gulpfiles/gulp-user');

