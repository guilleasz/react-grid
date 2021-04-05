# React Grid

## Starting App

```
$ npm install
$ npm start
```

## Code Structure

React components are on `src/components` directory. With their corresponding `.scss` files for styles.

Customize hooks are defined on `src/hooks`

And state managment is done on `src/state` with the reducer, action creators, and action types.

Other usefult functions are in `src/lib`

## Features

1. You can click on any cell and flip its color
2. You can double click on any cell and flip the whole column to that cell's color
3. Long press any cell and drag cursor to change all the cells you want to the first selected cell
4. Your Grid State is being sent to API every two seconds after not having more updates.

Hope you enjoy it!
