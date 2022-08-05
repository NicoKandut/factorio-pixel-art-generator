# Factorio Pixel Art Generator

This app can generate factorio blueprints from any image.

You can try it here: https://nicokandut.github.io/factorio-pixel-art-generator/

# Known Issues

- SVG files don't work

# Development

This section describes how to run the app locally and develop new features.

## Structure

The app consists of two parts:

- The frontend, powered by svelte
- The backend, powered by web assembly

## Frontend

When developing you will need to start the frontend with one of the following commands.

```js
// with npm
npm run-script dev

// with yarn
yarn dev
```

By default, this will serve the app on http://localhost:3000/.

Changes to frontend code will appear there immediatly.

## Backend

The backend doesn't need to be started but if you want to make changes to it, you will need to recompile it.

To do that you will need to run the command below in the root folder of the repository.

```bash
em++ -s "EXPORTED_RUNTIME_METHODS=['cwrap']" -s "EXPORTED_FUNCTIONS=['_process','_create_buffer','_destroy_buffer']" -s NO_EXIT_RUNTIME=1 -s ENVIRONMENT=web -s USE_ZLIB=1 -s ALLOW_MEMORY_GROWTH=1 -s MAXIMUM_MEMORY=4GB -s MODULARIZE=1 --no-entry -O3 -o ./public/out.js ./backend/src/main.cpp
```

Notice, that this step requires emscripten to be installed.
