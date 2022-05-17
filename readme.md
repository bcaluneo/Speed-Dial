### Speed Dial

A visual bookmark added for Firefox reminiscent of old T9 speed dial setups.

## Building

This project is built using NodeJS with the Typescript, browserify, express, and esmify modules. First clone this repo with:

`git clone git@github.com:bcaluneo/Speed-Dial`

Then install the modules and types:
```
npm install typescript --save-dev
npm install --save-dev @types/node
npm install browserify
npm install express
npm install esmify
```

The provided makefile can be used to build the project. It assumes the outputted `.js` files are placed in the public directory. Running the command `make zip` will package the extension so you can import it into Firefox through the `about:debugging` page.
