# Kytos/UI

This is the web user interface for the Kytos project. For more information
on how to use it, please refer to the [UI documentation](https://github.com/kytos-ng/kytos/blob/master/docs/developer/web-ui.rst).

## Build Setup

```bash
# install dependencies (should always be done first)
npm install

# starts the dev server, serve with hot reload at localhost:8080
npm run dev

# build UI for preproduction without minification and with sourcemaps for better error logs (used for debugging/testing)
npm run preprod

# build UI for production with minification (more efficient and takes up less storage)
npm run build

# builds the UI for production (like the previous command) and then zips it
npm run zip

# view the most recent build locally
npm run preview
```

## How to create a new release

To create a new release file you need to run the command below and during the
procedure to create a new release on github you need append the file
latest.zip.

```bash
# build for production and compress the file as latest.zip
npm run zip
```

After build and upload the file in the github, the Kytos has an endpoint to see
the latest release version and download the latest.zip file from github and
unpack it in the kytos/web-ui folder.

This update command can be trigger using the kytos-utils command displayed
below. If no version is specified the latest version of kytos/ui on github will
be used.

``` bash
# update the kytos web-ui to latest version
$ kytos web update

# update the kytos web-ui to a specific version
$ kytos web update <version>
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Linting and Formatting

```bash
# lints all files (the --ext option can be used to specify the files that should be searched for)
npm run lint

npm run lint -- . --ext .js,.jsx,.ts,.tsx

# lints the specified file
npm run lint -- file

# tries to fix the potentially fixable problems within all files
npm run lint -- --fix .

# tries to fix the potentially fixable problems within the specified file
npm run lint -- --fix file

# lints all files
npm run lint

# checks the formatting of all files
npm run format -- --check .

# checks the formatting of the specified file
npm run format -- --check file

# fixes the formatting of all files
npm run format -- --write .

# fixes the formatting of the specified file
npm run format -- --write file
```
