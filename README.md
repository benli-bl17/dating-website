# Dating-website
This project sets up a website for programmers to make friends. 

It has mainly three modules:</br>
The user module is used to edit the users information and check the friend list.</br>
The activity module offers avtivities for programmers to participate in.</br>
The homepage is where the users viewing the others' information.</br>

This prokject is based on the M(mangodb)E(express)A(Angular)N(Node) structure.</br>
This project developed by Angular2. Make sure you have installed node.js.</br>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

# Developers

Cheng Zhu 13000359</br>
Yilun Chen 12781961</br>
Bin Li 12520817</br>

## Database
This project uses mongodb to set up the database and uses mongoose help manage the data.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Style Guide
### Single responsibility
* A file defines one thing, such as a component, a service, a pipe, an directive.
* Each file is within 400 lines.
* Define a function with a single function.
* A function should not exceed 75 lines at most.
### Naming
* Do follow a pattern that describes the symbol's feature then its type. The recommended pattern is `feature.type.**.`.
  * Component ---   `***.component.ts|html|css`
  * Module ---   `***.module.ts`
  * Routing ---   `***-routing.module.ts`
  * Service ---   `***.service.ts`
  * Pipe ---   `***.pipe.ts`
  * Directive ---   `***.directive.ts`
  * Model ---   `***.model.ts`
  * Data ---   `***.data.ts`
* Do use dashes to separate words in the descriptive name. For example `hero-list.component.ts` 
* Do use upper camel case for class names, and same as the file name.
For example, the class name defined by `app.module.ts` is `AppModule`.<br/>
* Do use lower camel case for directive selector. For example `clickOutSide`
### Coding conventions
* Do use upper camel case when naming classes.
* Do declare variables with `const`.
* The naming of variables should be controlled within 3 words.
* Do use upper camel case for name an interface.
* Do use lower camel case for name properties and methods.
* Leaving one empty line between third party imports and application imports.



  




