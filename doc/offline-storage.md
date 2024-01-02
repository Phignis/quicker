# Offline storage when programming a PWA

When it comes to storage in a Progressive Web App (PWA), you would in general use a classic server-side database (DB).
This also means that an Internet connexion is required<br />
However, you cannot always have a connexion, moreover a good one, in a supermarket. It is important, then, that the
whole PWA can be executed offline.<br />
In order to do so we can use a service worker, explained [in this file](./service_worker.md).<br />
This service worker will act as an interceptor of http request, will cache responses, and will retreive it for further uses.

What are the different ways to store long-term datas on the handled browser of a WPA?<br />
There is three major solution : the local storage, the IndexedDB API and the Cache API.<br />
You can see an exhaustive list by [following this link](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#what_technologies_store_data_in_the_browser).

## LocalStorage
> Find precise documentation [by following this link](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).<br />
> [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is part of the old-fashion web storage API,
> which is fully supported in most mobile browser starting from 2012.<br />
> Storage is used to store local data in cache. Local storage cache is not cleared on browser closing,
> setting him apart from the [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
> 
> As a difference of the Cache API, which will be seen in third section, local storage don't store pairs of Request -> Response,
> in other word, a URL to contact -> data fetched. Local Storage only store strings, for both of the key and the value.
> It's really meant to store local data, and CacheA API, on the other hand, is meant to store the Result of a fetch, to retreive it.
> 
> You can store up to [5 MiB](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria#web_storage)
> of data in localStorage, and a QuotaExceededError exception is thrown if the limit is reached, which is catchable.

## IndexedDB API
> IndexedDB is meant to store larger data than local storage. It's a real noSQL object oriented DataBase (DB), relying on Javascript objects.<br />
> The API is quite complex to use, as it's entirely asynchronous, to avoid blocking thread upon transaction executions.
> 
> While standard SQL SGBD don't implicate to learn the transaction system, IndexedDB explicitely relies on it, to avoid conflicts
> if multiple instances of the website is opened and operate on the DB.
> 
> Transaction is an ensemble of request on DB, to alter it, gather datas. A transaction is atomic, meaning that only one can be executed, and cannot be
> interrupted.
> 
> IndexedDB is [not fully compatible](https://caniuse.com/indexeddb) with the park of mobile browsers out there, even if it's a
> minor partof customers.

## Cache API
> Cache API is the most recent API of the three. While the two others are meant to store data, which are not explecitely related
> to a Request, Cache API is quite similar to the Web Storage API (localStorage), but instead of storing string key-value pairs,
> it rather stores Request-Response pairs.
> 
> In other words, Cache API is really meant to store the result of a fetch on a distant ressource provider, to provide it from
> cache later on, where the two others are here to store data not directly related to a target URL.
> All mobile web browsers support the API, from 2018.

## Which API for what?
> Graphs, resources as JS or CSS files, are meant to be fetched throught an URL, contacting the server side.<br />
> All of them will be stored in cache with Cache API, as it's meant for that, and have more storage (and a seperate one)
> than the LocalStorage.
> 
> On the other hand, groceries list are not meant to be fetched from URL. Even if it's possible to store directly in cache
> the url targetted and the list, before any contact on server side, using [put](https://developer.mozilla.org/fr/docs/Web/API/Cache/put),
> it's more logical that the groceries list are in the local storage, with an easier API than the IndexedDB.