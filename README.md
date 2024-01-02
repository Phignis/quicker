# Quicker

## Technologie used
> * node.js version 18.15.0
> * npm 9.6.3

## Launch me !
> 1.  npm install
> 2.  npm run build
> 3.  npm install -g serve (if not already installed)
> 4.  Set-ExecutionPolicy RemoteSigned
> 5.  serve -s build

## Install PWA
### Desktop
> If you are on the localhost address provided, you can install the PWA, even if it's not meant to be.
> PWA should be available throught HTTPS only, but localhost is also considered as secure.<br />
> On browser, go for responsive display, and mobile type (F12, then activate responsive display)

### Mobile
> You first have to find out the IP address of the hosting desktop throught network. Once you found the IP adress,
> type it in the mobile browser, with the port provided when launching app with serve.<br />
> If you would really like to install the PWA on your mobile, you first have to self-certificate the desktop,
> and the method is not described here. Once you can connect to the website in HTTPS, you should be able to install.

## What can you do?
>In order to connect, you can provide any email and password, there is currently any checking.<br /> <br/>
> Not so much for now, the application is mostly a POC. Even if the whole dijkstra algorithm is meant
> to be adapted to categories of products that you have, the grocery list is not editable for now.<br />
> You can click on the "Find Path" button, which will retreive all categories of products in the list, which is not editable.<br />
> You can go into [this file](./src/Pages/Shop.js), to edit the `dummyShoppingItems`. Try removing
> the chicken from the list, and you'll see the path modified when pressing again the button find path
> (rebuilding app is needed, or hot reload dev environment by running npm start instead of run build and the following commands).
