Package.describe({
  summary: 'Helpful native prototype extensions with safety checks'
});

Package.on_use(function (api) {
  api.add_files(['extensions.js'], ['client', 'server']);
});
